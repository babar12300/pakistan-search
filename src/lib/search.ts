import { STATIC_CATEGORIES, STATIC_SITES, hostOf, type Category, type Site } from "@/lib/catalog";

const STOPWORDS = new Set([
  "the", "of", "in", "and", "a", "an", "for", "to", "on", "at", "pakistan", "pakistani", "pk",
  "پاکستان", "پاکستانی", "کا", "کی", "کے", "میں", "اور", "سے", "کو",
]);

/** Lowercase, strip Arabic diacritics/tatweel and unify Arabic vs Urdu letter forms. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "")
    .replace(/ي/g, "ی")
    .replace(/ى/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ه/g, "ہ")
    .replace(/ة/g, "ہ")
    .replace(/[“”"'’,،؟?!.\-–—()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(query: string): string[] {
  const all = normalize(query).split(" ").filter(Boolean);
  const meaningful = all.filter((t) => !STOPWORDS.has(t));
  return meaningful.length ? meaningful : all;
}

type Indexed = {
  entry: Site;
  title: string;
  domain: string;
  tags: string;
  place: string;
  description: string;
};

function buildIndex(sites: Site[], categories: Category[]): Indexed[] {
  const byId = new Map(categories.map((c) => [c.id, c]));
  return sites.map((entry) => {
    const category = byId.get(entry.category);
    const host = hostOf(entry.url);
    return {
      entry,
      title: normalize(`${entry.title.en} ${entry.title.ur}`),
      domain: normalize(host.replace(/\./g, " ") + " " + host),
      tags: normalize(entry.tags.join(" ")),
      place: normalize(
        `${entry.city.en} ${entry.city.ur} ${category?.label.en ?? ""} ${category?.label.ur ?? ""}`,
      ),
      description: normalize(`${entry.description.en} ${entry.description.ur}`),
    };
  });
}

const indexCache = new WeakMap<Site[], Indexed[]>();
function indexFor(sites: Site[], categories: Category[]): Indexed[] {
  let idx = indexCache.get(sites);
  if (!idx) {
    idx = buildIndex(sites, categories);
    indexCache.set(sites, idx);
  }
  return idx;
}

export type SearchResult = { entry: Site; score: number };

export function search(
  query: string,
  category?: string,
  sites: Site[] = STATIC_SITES,
  categories: Category[] = STATIC_CATEGORIES,
): SearchResult[] {
  const all = indexFor(sites, categories);
  const pool = category ? all.filter((i) => i.entry.category === category) : all;
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return pool.map((i) => ({ entry: i.entry, score: 0 }));
  }

  const phrase = normalize(query);
  const results: (SearchResult & { matched: number })[] = [];
  for (const item of pool) {
    let score = 0;
    let matched = 0;
    for (const t of tokens) {
      let s = 0;
      if (item.title.includes(t)) s += item.title.startsWith(t) ? 9 : 6;
      if (item.domain.includes(t)) s += 5;
      if (item.tags.includes(t)) s += 4;
      if (item.place.includes(t)) s += 3;
      if (item.description.includes(t)) s += 1;
      if (s > 0) matched++;
      score += s;
    }
    // Exact phrase in the title outranks scattered word matches.
    if (phrase.length > 2 && item.title.includes(phrase)) score += 10;
    // Hand-picked entries edge out automatically found ones on ties.
    if (!item.entry.discovered) score += 0.5;
    if (matched > 0) results.push({ entry: item.entry, score, matched });
  }

  return results
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .map(({ entry, score }) => ({ entry, score }));
}

export function displayDomain(url: string): string {
  return hostOf(url);
}

/** Category ids are short lowercase slugs (built-in or created by discovery). */
export function isCategorySlug(value: unknown): value is string {
  return typeof value === "string" && /^[a-z0-9-]{2,40}$/.test(value);
}
