import { createFileRoute, Link } from "@tanstack/react-router";
import { SearchX } from "lucide-react";
import { CATEGORIES, type CategoryId } from "@/data/directory";
import { isCategoryId, search } from "@/lib/search";
import { useLang } from "@/lib/i18n";
import { Logo } from "@/components/search/Logo";
import { LangToggle } from "@/components/search/LangToggle";
import { SearchBox } from "@/components/search/SearchBox";
import { ResultCard } from "@/components/search/ResultCard";
import { cn } from "@/lib/utils";

type SearchParams = { q?: string; cat?: CategoryId };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" && s.q.trim() ? s.q : undefined,
    cat: isCategoryId(s.cat) ? s.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search results — Pakistan.com" },
      {
        name: "description",
        content: "Results from Pakistan.com's directory of Pakistani websites, services and places.",
      },
      { property: "og:title", content: "Search results — Pakistan.com" },
      {
        property: "og:description",
        content: "Pakistani websites, services, news and places — in English and Urdu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q = "", cat } = Route.useSearch();
  const { lang, t } = useLang();
  const results = search(q, cat);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flag-strip h-1.5 w-full" />
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:flex-nowrap sm:px-6">
          <Link to="/" aria-label={t("home")} className="order-1">
            <Logo size="sm" />
          </Link>
          <div className="order-3 w-full sm:order-2 sm:max-w-xl sm:flex-1">
            <SearchBox defaultValue={q} category={cat} size="sm" />
          </div>
          <div className="order-2 ms-auto sm:order-3">
            <LangToggle />
          </div>
        </div>
        <nav className="mx-auto max-w-5xl overflow-x-auto px-4 sm:px-6">
          <div className="flex gap-1 pb-2">
            <CategoryTab q={q} active={!cat} label={t("all")} />
            {CATEGORIES.map((c) => (
              <CategoryTab key={c.id} q={q} cat={c.id} active={cat === c.id} label={c.label[lang]} />
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-2 py-4 sm:px-4">
        <p className="px-4 pb-2 text-sm text-muted-foreground">
          {q ? t("results", { n: results.length }) : t("showingAll", { n: results.length })}
        </p>

        {results.length === 0 ? (
          <div className="mx-auto mt-10 max-w-md px-4 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
              <SearchX className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              {t("noResults", { q })}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("noResultsHint")}</p>
          </div>
        ) : (
          <div className="max-w-3xl space-y-1">
            {results.map(({ entry }) => (
              <ResultCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card/60 px-4 py-5 text-center text-sm text-muted-foreground">
        {t("footer")}
      </footer>
    </div>
  );
}

function CategoryTab({
  q,
  cat,
  active,
  label,
}: {
  q: string;
  cat?: CategoryId;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      to="/search"
      search={{ q: q || undefined, cat }}
      className={cn(
        "whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      {label}
    </Link>
  );
}
