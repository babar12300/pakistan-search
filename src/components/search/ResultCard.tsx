import { ArrowUpRight, MapPin } from "lucide-react";
import { CATEGORIES, CITIES, type Entry } from "@/data/directory";
import { displayDomain } from "@/lib/search";
import { useLang } from "@/lib/i18n";
import { CategoryIcon } from "./CategoryIcon";

export function ResultCard({ entry }: { entry: Entry }) {
  const { lang } = useLang();
  const domain = displayDomain(entry.url);
  const category = CATEGORIES.find((c) => c.id === entry.category)!;

  return (
    <article className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-border hover:bg-card sm:p-5">
      <a href={entry.url} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
              alt=""
              loading="lazy"
              className="h-5 w-5"
            />
          </span>
          <span dir="ltr" className="truncate font-sans text-sm text-muted-foreground">
            {domain}
          </span>
        </div>
        <h3 className="mt-2 flex items-start gap-1 text-lg font-semibold leading-snug text-link group-hover:underline sm:text-xl">
          {entry.title[lang]}
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 rtl:-scale-x-100" />
        </h3>
      </a>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {entry.description[lang]}
      </p>
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-medium text-secondary-foreground">
          <CategoryIcon id={entry.category} className="h-3.5 w-3.5" />
          {category.label[lang]}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {CITIES[entry.city][lang]}
        </span>
      </div>
    </article>
  );
}
