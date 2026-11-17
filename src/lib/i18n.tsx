import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "@/data/directory";

const STRINGS = {
  en: {
    tagline: "Search Pakistan — websites, services, news and places.",
    placeholder: "Search Pakistani sites, places, services…",
    search: "Search",
    clear: "Clear search",
    browse: "Browse by category",
    popular: "Popular searches",
    all: "All",
    results: "{n} results",
    showingAll: "Showing all {n} sites",
    noResults: "Nothing found for “{q}”",
    noResultsHint: "Try another word, check the spelling, or browse a category.",
    sites: "{n} sites",
    footer: "Hand-picked and automatically discovered Pakistani websites, in English and Urdu.",
    switchTo: "اردو",
    switchLabel: "Switch to Urdu",
    home: "Pakistan.com home",
  },
  ur: {
    tagline: "پاکستان تلاش کریں — ویب سائٹس، خدمات، خبریں اور مقامات۔",
    placeholder: "پاکستانی ویب سائٹس، مقامات، خدمات تلاش کریں…",
    search: "تلاش",
    clear: "تلاش صاف کریں",
    browse: "زمرے دیکھیں",
    popular: "مقبول تلاشیں",
    all: "سب",
    results: "{n} نتائج",
    showingAll: "تمام {n} ویب سائٹس",
    noResults: "“{q}” کے لیے کچھ نہیں ملا",
    noResultsHint: "کوئی اور لفظ آزمائیں، ہجے دیکھیں یا کوئی زمرہ منتخب کریں۔",
    sites: "{n} ویب سائٹس",
    footer: "منتخب اور خودکار طور پر دریافت شدہ پاکستانی ویب سائٹس، انگریزی اور اردو میں۔",
    switchTo: "English",
    switchLabel: "انگریزی میں دیکھیں",
    home: "پاکستان ڈاٹ کام",
  },
} as const;

export type StringKey = keyof (typeof STRINGS)["en"];

export const POPULAR: Record<Lang, string[]> = {
  en: ["Cricket", "NADRA", "Lahore", "University", "Bank", "Hunza", "Passport", "Biryani"],
  ur: ["کرکٹ", "نادرا", "لاہور", "یونیورسٹی", "بینک", "ہنزہ", "پاسپورٹ", "بریانی"],
};

type LangContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<LangContextValue | null>(null);
const STORAGE_KEY = "pakistan-com-lang";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ur") setLangState(saved);
  }, []);

  const dir = lang === "ur" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  const t: LangContextValue["t"] = (key, vars) => {
    let s: string = STRINGS[lang][key];
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
    return s;
  };

  return <LangContext.Provider value={{ lang, dir, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
