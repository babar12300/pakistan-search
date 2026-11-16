import { CATEGORIES, CITIES, DIRECTORY, type CategoryId, type Entry } from "@/data/directory";

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

function domainOf(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
}

type Indexed = {
  entry: Entry;
  title: string;
  domain: string;
  tags: string;
  place: string;
  description: string;
};

const INDEX: Indexed[] = DIRECTORY.map((entry) => {
  const category = CATEGORIES.find((c) => c.id === entry.category)!;
  const city = CITIES[entry.city];
  return {
    entry,
    title: normalize(`${entry.title.en} ${entry.title.ur}`),
    domain: normalize(domainOf(entry.url).replace(/\./g, " ") + " " + domainOf(entry.url)),
    tags: normalize(entry.tags.join(" ")),
    place: normalize(`${city.en} ${city.ur} ${category.label.en} ${category.label.ur}`),
    description: normalize(`${entry.description.en} ${entry.description.ur}`),
  };
});

export type SearchResult = { entry: Entry; score: number };

export function search(query: string, category?: CategoryId): SearchResult[] {
  const pool = category ? INDEX.filter((i) => i.entry.category === category) : INDEX;
  const tokens = tokenize(query);

  if (tokens.length === 0) {
    return pool.map((i) => ({ entry: i.entry, score: 0 }));
  }

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
    if (matched > 0) results.push({ entry: item.entry, score, matched });
  }

  return results
    .sort((a, b) => b.matched - a.matched || b.score - a.score)
    .map(({ entry, score }) => ({ entry, score }));
}

export function displayDomain(url: string): string {
  return domainOf(url);
}

export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === "string" && CATEGORIES.some((c) => c.id === value);
}
