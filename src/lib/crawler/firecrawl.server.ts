const GATEWAY = "https://connector-gateway.lovable.dev/firecrawl/v2";

export class FirecrawlError extends Error {
  constructor(
    public status: number,
    body: string,
  ) {
    super(`Firecrawl request failed [${status}]: ${body.slice(0, 300)}`);
  }
}

async function call<T>(path: string, body: unknown, timeoutMs: number): Promise<T> {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const fcKey = process.env["FIRECRAWL_API_KEY"];
  if (!lovableKey || !fcKey) throw new Error("Firecrawl is not configured");
  const res = await fetch(`${GATEWAY}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": fcKey,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeoutMs),
  });
  if (!res.ok) throw new FirecrawlError(res.status, await res.text());
  return (await res.json()) as T;
}

export type SearchHit = { url: string; title?: string; description?: string };

export async function searchWeb(query: string, limit: number): Promise<SearchHit[]> {
  const r = await call<{ data?: { web?: SearchHit[] } }>(
    "/search",
    { query, limit, country: "PK", location: "Pakistan" },
    15000,
  );
  return r.data?.web ?? [];
}

export type ScrapedPage = {
  markdown?: string;
  links?: string[];
  metadata?: { title?: string; description?: string; language?: string };
};

export async function scrapePage(
  url: string,
  formats: ("markdown" | "links")[],
  timeoutMs = 12000,
): Promise<ScrapedPage> {
  const r = await call<{ data?: ScrapedPage }>(
    "/scrape",
    { url, formats, onlyMainContent: formats.includes("markdown"), timeout: timeoutMs - 1000 },
    timeoutMs,
  );
  return r.data ?? {};
}
