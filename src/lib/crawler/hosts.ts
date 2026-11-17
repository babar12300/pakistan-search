/** Pure helpers for automatic site discovery (kept free of server code so they are unit-testable). */

/** Global platforms that are never "Pakistan-based websites" — skipped along with their subdomains. */
const BLOCKED_FAMILIES = [
  "facebook.com", "fb.com", "fb.me", "messenger.com", "twitter.com", "x.com", "t.co", "instagram.com",
  "youtube.com", "youtu.be", "google.com", "google.com.pk", "goo.gl", "g.page", "googleapis.com",
  "gstatic.com", "googletagmanager.com", "google-analytics.com", "doubleclick.net", "googleusercontent.com",
  "wikipedia.org", "wikimedia.org", "wikidata.org", "linkedin.com", "lnkd.in", "tiktok.com", "whatsapp.com",
  "whatsapp.net", "wa.me", "t.me", "telegram.org", "telegram.me", "apple.com", "microsoft.com", "live.com",
  "office.com", "amazon.com", "amazonaws.com", "pinterest.com", "reddit.com", "snapchat.com", "threads.net",
  "bit.ly", "tinyurl.com", "w3.org", "schema.org", "cloudflare.com", "gravatar.com", "wordpress.org",
  "jquery.com", "bootstrapcdn.com", "jsdelivr.net", "fontawesome.com", "vimeo.com", "dailymotion.com",
  "soundcloud.com", "spotify.com", "medium.com", "quora.com", "github.com", "gitlab.com", "play.google.com",
  "yahoo.com", "bing.com", "duckduckgo.com", "archive.org", "addtoany.com", "sharethis.com", "disqus.com",
  "mailchimp.com", "paypal.com", "visa.com", "mastercard.com", "trustpilot.com", "tripadvisor.com",
  "booking.com", "imdb.com", "bbc.co.uk", "bbc.com", "cnn.com", "reuters.com", "apnews.com", "nytimes.com",
];

/**
 * Free hosting platforms: the platform's own homepage is skipped, but sites hosted on it
 * (e.g. someone.blogspot.com) are kept — that's how sites on other hosting platforms get found.
 */
const HOSTING_ROOTS = [
  "blogspot.com", "wordpress.com", "wixsite.com", "wix.com", "github.io", "netlify.app", "vercel.app",
  "weebly.com", "square.site", "webflow.io", "carrd.co", "pages.dev", "web.app", "firebaseapp.com",
  "herokuapp.com", "lovable.app", "framer.website", "godaddysites.com", "mystrikingly.com", "sites.google.com",
];

const FILE_EXT = /\.(pdf|jpe?g|png|gif|webp|svg|zip|rar|docx?|xlsx?|pptx?|mp[34]|apk|exe)(\?|#|$)/i;

export function normalizeHost(raw: string): string | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    const host = u.hostname.toLowerCase().replace(/^www\d?\./, "").replace(/\.$/, "");
    if (!host.includes(".") || /^\d+\.\d+\.\d+\.\d+$/.test(host)) return null;
    return host;
  } catch {
    return null;
  }
}

function inFamily(host: string, root: string): boolean {
  return host === root || host.endsWith(`.${root}`);
}

/** True when a host is worth checking as a possible Pakistani website. */
export function isCandidateHost(host: string): boolean {
  if (BLOCKED_FAMILIES.some((r) => inFamily(host, r))) return false;
  if (HOSTING_ROOTS.includes(host)) return false;
  return true;
}

/** Turn a list of page links into unique candidate sites (homepage URLs), excluding `exclude` hosts. */
export function candidateHostsFromLinks(
  links: string[],
  exclude: Set<string>,
  limit: number,
): { host: string; url: string }[] {
  const out = new Map<string, string>();
  for (const link of links) {
    if (out.size >= limit) break;
    if (typeof link !== "string" || FILE_EXT.test(link)) continue;
    const host = normalizeHost(link);
    if (!host || exclude.has(host) || out.has(host) || !isCandidateHost(host)) continue;
    out.set(host, `https://${host}`);
  }
  return [...out].map(([host, url]) => ({ host, url }));
}

/** Short lowercase slug for a new category id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/** Topics searched in rotation, one per daily run, to find Pakistani sites on any domain or host. */
export const DISCOVERY_QUERIES = [
  "Pakistani online store",
  "Karachi restaurant official website",
  "Lahore software house",
  "Islamabad school official website",
  "Pakistani clothing brand",
  "NGO in Pakistan",
  "Peshawar hospital",
  "Pakistani Urdu news blog",
  "Pakistani tech startup",
  "Multan university",
  "Faisalabad textile company",
  "Quetta Balochistan tourism",
  "Pakistani recipe blog",
  "Pakistan property portal",
  "jobs in Pakistan website",
  "Hyderabad Sindh college",
  "Pakistani travel agency",
  "online pharmacy Pakistan",
  "Pakistani car dealers",
  "Sialkot sports goods manufacturer",
  "Pakistani law firm",
  "Pakistani artist portfolio",
  "Gilgit Baltistan hotel",
  "Rawalpindi courier service",
  "Pakistani poetry Urdu website",
  "اردو خبریں ویب سائٹ",
  "پاکستانی آن لائن شاپنگ",
  "لاہور کے ریستوران",
  "پاکستانی تعلیمی ادارے",
  "Pakistani agriculture company",
];
