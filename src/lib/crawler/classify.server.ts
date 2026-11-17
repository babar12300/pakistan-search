import { generateResponse } from "@lovable.dev/ai-gateway";
import type { Category } from "@/lib/catalog";
import { CATEGORY_ICON_NAMES } from "./icons";

export type Candidate = {
  host: string;
  url: string;
  title: string;
  description: string;
  excerpt: string;
};

export type Verdict = {
  host: string;
  is_pakistani: boolean;
  reason: string;
  category_id: string;
  new_category: { label_en: string; label_ur: string; icon: string } | null;
  title_en: string;
  title_ur: string;
  description_en: string;
  description_ur: string;
  city_en: string;
  city_ur: string;
  tags: string[];
};

const str = { type: "string" } as const;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["results"],
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "host", "is_pakistani", "reason", "category_id", "new_category", "title_en", "title_ur",
          "description_en", "description_ur", "city_en", "city_ur", "tags",
        ],
        properties: {
          host: str,
          is_pakistani: { type: "boolean" },
          reason: str,
          category_id: str,
          new_category: {
            anyOf: [
              {
                type: "object",
                additionalProperties: false,
                required: ["label_en", "label_ur", "icon"],
                properties: { label_en: str, label_ur: str, icon: { type: "string", enum: CATEGORY_ICON_NAMES } },
              },
              { type: "null" },
            ],
          },
          title_en: str,
          title_ur: str,
          description_en: str,
          description_ur: str,
          city_en: str,
          city_ur: str,
          tags: { type: "array", items: str },
        },
      },
    },
  },
} as const;

function instructions(categories: Category[]): string {
  const list = categories.map((c) => `- ${c.id}: ${c.label.en}`).join("\n");
  return `You review websites for Pakistan.com, a search engine that lists only Pakistan-based websites.

For each candidate decide is_pakistani:
- true only if the site is run by a person, business, school, government body or organisation based in Pakistan, or it mainly serves people in Pakistan. The domain can be anything (.com, .org, blogspot, wordpress, etc.), not just .pk.
- false for global/foreign companies (even with a Pakistan page), social networks, link shorteners, parked or for-sale domains, empty pages, adult, gambling, piracy or spam sites.

For accepted sites:
- category_id: pick the best existing category id from the list below. Only if none fits reasonably, invent a short new English slug (lowercase, hyphens) and fill new_category with an English label, an Urdu label and an icon. Otherwise new_category is null. Prefer existing categories.
- title_en: the site's real name. title_ur: the same name in Urdu script (transliterate brand names).
- description_en: one factual sentence (max 25 words) of what the site offers. description_ur: natural Urdu translation.
- city_en/city_ur: the Pakistani city it is based in, or "Nationwide"/"ملک بھر" if national or unknown.
- tags: 3-6 short search keywords, mixing English and Urdu.
For rejected sites fill text fields with empty strings, category_id "none", new_category null, tags [].
Always echo the candidate's host exactly. reason: a few words explaining the decision.

Existing categories:
${list}`;
}

export async function classify(candidates: Candidate[], categories: Category[]): Promise<Verdict[]> {
  if (candidates.length === 0) return [];
  const payload = candidates.map((c) => ({
    host: c.host,
    url: c.url,
    title: c.title.slice(0, 200),
    description: c.description.slice(0, 400),
    page_excerpt: c.excerpt.slice(0, 1200),
  }));

  const response = await generateResponse(
    {
      model: "openai/gpt-6-astra",
      reasoning: { effort: "low" },
      instructions: instructions(categories),
      input: [{ role: "user", content: `Candidates (JSON):\n${JSON.stringify(payload)}\n\nReturn JSON.` }],
      text: { format: { type: "json_schema", name: "site_reviews", strict: true, schema: SCHEMA } },
    },
    { maxRetries: 1 },
  );

  let text = "";
  for (const item of response.output ?? []) {
    if (item.type === "message") {
      for (const part of item.content) if (part.type === "output_text") text += part.text;
    }
  }
  if (!text) throw new Error("AI returned no review text");
  const parsed = JSON.parse(text) as { results: Verdict[] };
  return parsed.results;
}
