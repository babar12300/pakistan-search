import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Category, Site } from "@/lib/catalog";

const PAGE = 1000;

/** Public read of automatically discovered sites and categories (safe columns only). */
export const getDiscoveredCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<{ sites: Site[]; categories: Category[] }> => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) return { sites: [], categories: [] };

    const db = createClient<Database>(url, key, {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: cats, error: catErr } = await db
      .from("site_categories")
      .select("id, label_en, label_ur, icon")
      .order("created_at");
    if (catErr) {
      console.error("site_categories read failed", catErr);
      return { sites: [], categories: [] };
    }

    const rows: Database["public"]["Tables"]["discovered_sites"]["Row"][] = [];
    for (let from = 0; from < 20 * PAGE; from += PAGE) {
      const { data, error } = await db
        .from("discovered_sites")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, from + PAGE - 1);
      if (error) {
        console.error("discovered_sites read failed", error);
        break;
      }
      rows.push(...data);
      if (data.length < PAGE) break;
    }

    return {
      categories: (cats ?? []).map((c) => ({
        id: c.id,
        label: { en: c.label_en, ur: c.label_ur },
        icon: c.icon,
      })),
      sites: rows.map((r) => ({
        id: `d-${r.id}`,
        url: r.url,
        category: r.category_id,
        city: { en: r.city_en, ur: r.city_ur },
        title: { en: r.title_en, ur: r.title_ur },
        description: { en: r.description_en, ur: r.description_ur },
        tags: r.tags,
        discovered: true,
      })),
    };
  },
);
