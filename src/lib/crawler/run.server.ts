import { PaymentRequiredError, PermissionDeniedError, RateLimitError } from "@lovable.dev/ai-gateway";
import { STATIC_CATEGORIES, STATIC_SITES, hostOf, type Category } from "@/lib/catalog";
import { classify, type Candidate, type Verdict } from "./classify.server";
import { FirecrawlError, scrapePage, searchWeb } from "./firecrawl.server";
import { DISCOVERY_QUERIES, candidateHostsFromLinks, normalizeHost, isCandidateHost, slugify } from "./hosts";

/** Per-run bounds: one search topic, one site's links, a small review batch. */
const SEARCH_RESULTS = 10;
const LINKS_PER_SOURCE = 15;
const REVIEW_WITH_SNIPPET = 12;
const REVIEW_NEEDS_SCRAPE = 6;
const AI_CHUNK = 4;
const MAX_NEW_CATEGORIES = 3;
const MAX_ATTEMPTS = 3;

export type RunSummary = {
  status: "ok" | "probe" | "locked" | "paused";
  query?: string;
  linkSource?: string | null;
  queued: number;
  reviewed: number;
  added: string[];
  rejected: number;
  newCategories: string[];
  errors: string[];
  pausedReason?: string | null;
};

type FrontierRow = {
  host: string;
  url: string;
  source: string;
  found_via: string | null;
  snippet_title: string | null;
  snippet_description: string | null;
  attempts: number;
};

const clip = (s: string | undefined | null, n: number) => (s ?? "").trim().slice(0, n);

function pauseReasonFor(err: unknown): string | null {
  if (err instanceof PaymentRequiredError) return "AI credits ran out";
  if (err instanceof PermissionDeniedError) return "AI access was denied";
  if (err instanceof FirecrawlError && err.status === 402) return "Firecrawl credits ran out";
  if (err instanceof FirecrawlError && err.status === 403 && /credit/i.test(err.message))
    return "Firecrawl credit limit reached";
  return null;
}

export async function runDiscovery(): Promise<RunSummary> {
  const { supabaseAdmin: db } = await import("@/integrations/supabase/client.server");

  const lock = await db.rpc("acquire_crawl_lock", { lease_seconds: 180 });
  if (lock.error) throw new Error(`Could not lock discovery job: ${lock.error.message}`);
  const summary: RunSummary = { status: "ok", queued: 0, reviewed: 0, added: [], rejected: 0, newCategories: [], errors: [] };
  if (lock.data === "locked") return { ...summary, status: "locked" };
  const probe = lock.data === "ok-paused";
  if (probe) summary.status = "probe";

  let pausedReason: string | null | undefined; // undefined = leave unchanged
  let rateLimited = false;
  const notePause = (err: unknown) => {
    const reason = pauseReasonFor(err);
    if (reason) pausedReason = reason;
    if (err instanceof RateLimitError || (err instanceof FirecrawlError && err.status === 429)) rateLimited = true;
    summary.errors.push(err instanceof Error ? err.message.slice(0, 300) : String(err));
  };

  const stateRes = await db.from("crawl_state").select("*").eq("id", 1).single();
  const cursor = stateRes.data?.search_cursor ?? 0;

  try {
    // Known hand-picked sites seed the link-following and are never re-reviewed.
    await db.from("crawl_frontier").upsert(
      STATIC_SITES.map((s) => ({ host: hostOf(s.url), url: s.url, source: "seed", status: "known" })),
      { onConflict: "host", ignoreDuplicates: true },
    );

    // ---- 1. Discover new candidate sites (web search + links on a known site) ----
    const query = DISCOVERY_QUERIES[cursor % DISCOVERY_QUERIES.length] ?? DISCOVERY_QUERIES[0]!;
    summary.query = query;

    const sourceRes = probe
      ? { data: null }
      : await db
          .from("crawl_frontier")
          .select("host, url")
          .in("status", ["known", "accepted"])
          .order("links_crawled_at", { ascending: true, nullsFirst: true })
          .limit(1)
          .maybeSingle();
    const source = sourceRes.data;
    summary.linkSource = source?.host ?? null;

    const [searchOut, linkOut] = await Promise.allSettled([
      searchWeb(query, probe ? 3 : SEARCH_RESULTS),
      source ? scrapePage(source.url, ["links"], 15000) : Promise.resolve(null),
    ]);

    const newRows: Record<string, unknown>[] = [];
    const seen = new Set<string>();
    if (searchOut.status === "fulfilled") {
      for (const hit of searchOut.value) {
        const host = normalizeHost(hit.url);
        if (!host || seen.has(host) || !isCandidateHost(host)) continue;
        seen.add(host);
        newRows.push({
          host,
          url: `https://${host}`,
          source: "search",
          found_via: query,
          snippet_title: clip(hit.title, 300) || null,
          snippet_description: clip(hit.description, 600) || null,
        });
      }
    } else notePause(searchOut.reason);

    if (source) {
      if (linkOut.status === "fulfilled" && linkOut.value) {
        for (const c of candidateHostsFromLinks(linkOut.value.links ?? [], new Set([source.host, ...seen]), LINKS_PER_SOURCE)) {
          newRows.push({ host: c.host, url: c.url, source: "link", found_via: source.host });
        }
      } else if (linkOut.status === "rejected") notePause(linkOut.reason);
      await db.from("crawl_frontier").update({ links_crawled_at: new Date().toISOString() }).eq("host", source.host);
    }

    if (newRows.length) {
      const ins = await db
        .from("crawl_frontier")
        .upsert(newRows as never, { onConflict: "host", ignoreDuplicates: true })
        .select("host");
      summary.queued = ins.data?.length ?? 0;
    }

    if (pausedReason) return summary;

    // ---- 2. Review a bounded batch of waiting sites ----
    const cols = "host, url, source, found_via, snippet_title, snippet_description, attempts";
    const withSnippet = await db
      .from("crawl_frontier")
      .select(cols)
      .eq("status", "pending")
      .not("snippet_title", "is", null)
      .order("created_at")
      .limit(probe ? 1 : REVIEW_WITH_SNIPPET);
    const needScrape = probe
      ? { data: [] as FrontierRow[] }
      : await db
          .from("crawl_frontier")
          .select(cols)
          .eq("status", "pending")
          .is("snippet_title", null)
          .order("created_at")
          .limit(REVIEW_NEEDS_SCRAPE);

    const batch: FrontierRow[] = [...(withSnippet.data ?? []), ...(needScrape.data ?? [])];
    if (probe && batch.length === 0 && needScrape.data) {
      const any = await db.from("crawl_frontier").select(cols).eq("status", "pending").limit(1);
      batch.push(...(any.data ?? []));
    }

    const bumpAttempt = async (row: FrontierRow, reason: string) => {
      const attempts = row.attempts + 1;
      await db
        .from("crawl_frontier")
        .update({ attempts, reason: reason.slice(0, 300), status: attempts >= MAX_ATTEMPTS ? "error" : "pending", processed_at: new Date().toISOString() })
        .eq("host", row.host);
    };

    // Fetch homepage text for every candidate (search snippets describe one page, not the whole site).
    const pages = await Promise.allSettled(batch.map((row) => scrapePage(row.url, ["markdown"], 12000)));
    const candidates: { row: FrontierRow; cand: Candidate }[] = [];
    for (const [i, row] of batch.entries()) {
      const page = pages[i];
      if (page?.status === "fulfilled") {
        candidates.push({
          row,
          cand: {
            host: row.host,
            url: row.url,
            title: page.value.metadata?.title || row.snippet_title || "",
            description: page.value.metadata?.description || row.snippet_description || "",
            excerpt: clip(page.value.markdown, 1500),
          },
        });
      } else if (row.snippet_title) {
        candidates.push({
          row,
          cand: { host: row.host, url: row.url, title: row.snippet_title, description: row.snippet_description ?? "", excerpt: "" },
        });
      } else {
        if (page?.status === "rejected" && pauseReasonFor(page.reason)) notePause(page.reason);
        await bumpAttempt(row, "Could not open the site");
      }
    }
    if (pausedReason) return summary;

    const catRes = await db.from("site_categories").select("id, label_en, label_ur, icon");
    const categories: Category[] = [
      ...STATIC_CATEGORIES,
      ...(catRes.data ?? []).map((c) => ({ id: c.id, label: { en: c.label_en, ur: c.label_ur }, icon: c.icon })),
    ];
    const knownIds = new Set(categories.map((c) => c.id));

    const chunks: (typeof candidates)[] = [];
    for (let i = 0; i < candidates.length; i += AI_CHUNK) chunks.push(candidates.slice(i, i + AI_CHUNK));
    const reviews = await Promise.allSettled(chunks.map((ch) => classify(ch.map((c) => c.cand), categories)));

    for (const [ci, chunk] of chunks.entries()) {
      const review = reviews[ci];
      if (review?.status !== "fulfilled") {
        notePause(review?.reason);
        if (!pauseReasonFor(review?.reason) && !rateLimited) for (const c of chunk) await bumpAttempt(c.row, "Review failed");
        continue;
      }
      const verdicts = new Map<string, Verdict>(review.value.map((v) => [v.host.toLowerCase(), v]));
      for (const { row } of chunk) {
        const v = verdicts.get(row.host);
        if (!v) {
          await bumpAttempt(row, "No review returned");
          continue;
        }
        summary.reviewed++;
        const now = new Date().toISOString();
        if (!v.is_pakistani || !clip(v.title_en, 1) || !clip(v.description_en, 1)) {
          summary.rejected++;
          await db.from("crawl_frontier").update({ status: "rejected", reason: clip(v.reason, 300), processed_at: now }).eq("host", row.host);
          continue;
        }

        let categoryId = knownIds.has(v.category_id) ? v.category_id : "";
        if (!categoryId) {
          const slug = slugify(v.category_id) || slugify(v.new_category?.label_en ?? "");
          if (slug && knownIds.has(slug)) categoryId = slug;
          else if (slug.length >= 2 && v.new_category && summary.newCategories.length < MAX_NEW_CATEGORIES) {
            const created = await db.from("site_categories").upsert(
              { id: slug, label_en: clip(v.new_category.label_en, 60), label_ur: clip(v.new_category.label_ur, 60), icon: v.new_category.icon },
              { onConflict: "id", ignoreDuplicates: true },
            );
            if (!created.error) {
              knownIds.add(slug);
              categories.push({ id: slug, label: { en: v.new_category.label_en, ur: v.new_category.label_ur }, icon: v.new_category.icon });
              summary.newCategories.push(slug);
              categoryId = slug;
            }
          }
        }
        if (!categoryId) continue; // leave waiting; it gets a category on a later run

        const added = await db.from("discovered_sites").upsert(
          {
            host: row.host,
            url: row.url,
            category_id: categoryId,
            title_en: clip(v.title_en, 120),
            title_ur: clip(v.title_ur, 120) || clip(v.title_en, 120),
            description_en: clip(v.description_en, 300),
            description_ur: clip(v.description_ur, 300) || clip(v.description_en, 300),
            city_en: clip(v.city_en, 60) || "Nationwide",
            city_ur: clip(v.city_ur, 60) || "ملک بھر",
            tags: (v.tags ?? []).map((t) => clip(t, 40)).filter(Boolean).slice(0, 8),
            source: row.source,
            found_via: row.found_via,
          },
          { onConflict: "host", ignoreDuplicates: true },
        );
        if (added.error) {
          summary.errors.push(`Save failed for ${row.host}: ${added.error.message}`);
          continue;
        }
        summary.added.push(row.host);
        await db.from("crawl_frontier").update({ status: "accepted", reason: clip(v.reason, 300), processed_at: now }).eq("host", row.host);
      }
    }

    // A successful probe clears an earlier pause.
    if (probe && pausedReason === undefined && summary.errors.length === 0) pausedReason = null;
    return summary;
  } catch (err) {
    notePause(err);
    throw err;
  } finally {
    summary.pausedReason = pausedReason === undefined ? (stateRes.data?.paused_reason ?? null) : pausedReason;
    if (summary.pausedReason && !probe) summary.status = "paused";
    await db
      .from("crawl_state")
      .update({
        locked_until: null,
        last_run_at: new Date().toISOString(),
        search_cursor: cursor + 1,
        last_summary: summary as never,
        ...(pausedReason !== undefined ? { paused_reason: pausedReason } : {}),
      })
      .eq("id", 1);
  }
}
