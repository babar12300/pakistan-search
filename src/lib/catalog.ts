import { CATEGORIES, CITIES, DIRECTORY, type Localized } from "@/data/directory";

/** A category shown in search — either a built-in one or one created by automatic discovery. */
export type Category = { id: string; label: Localized; icon: string };

/** A searchable website — hand-picked or found automatically. */
export type Site = {
  id: string;
  url: string;
  category: string;
  city: Localized;
  title: Localized;
  description: Localized;
  tags: string[];
  discovered: boolean;
};

export const STATIC_CATEGORIES: Category[] = CATEGORIES.map((c) => ({
  id: c.id,
  label: c.label,
  icon: c.id,
}));

export const STATIC_SITES: Site[] = DIRECTORY.map((e) => ({
  id: e.id,
  url: e.url,
  category: e.category,
  city: CITIES[e.city],
  title: e.title,
  description: e.description,
  tags: e.tags,
  discovered: false,
}));

/** Lower-case host without "www." — the key used to avoid listing a site twice. */
export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0]?.toLowerCase() ?? "";
  }
}

/** Built-in entries win over discovered ones for the same host; categories are merged by id. */
export function mergeCatalog(
  discoveredSites: Site[],
  discoveredCategories: Category[],
): { sites: Site[]; categories: Category[] } {
  const known = new Set(STATIC_SITES.map((s) => hostOf(s.url)));
  const sites = [...STATIC_SITES, ...discoveredSites.filter((s) => !known.has(hostOf(s.url)))];
  const ids = new Set(STATIC_CATEGORIES.map((c) => c.id));
  const categories = [...STATIC_CATEGORIES, ...discoveredCategories.filter((c) => !ids.has(c.id))];
  return { sites, categories };
}
