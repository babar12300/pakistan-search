import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { catalogQuery } from "@/lib/catalog.queries";
import { POPULAR, useLang } from "@/lib/i18n";
import { Logo } from "@/components/search/Logo";
import { LangToggle } from "@/components/search/LangToggle";
import { SearchBox } from "@/components/search/SearchBox";
import { CategoryIcon } from "@/components/search/CategoryIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pakistan.com — Search Pakistan in English & Urdu" },
      {
        name: "description",
        content:
          "Search a hand-picked directory of Pakistani websites, government services, news, universities and places — in English and Urdu.",
      },
      { property: "og:title", content: "Pakistan.com — Search Pakistan" },
      {
        property: "og:description",
        content: "Find Pakistani websites, services, news and places in English and Urdu.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  component: Home,
});

function Home() {
  const { lang, t } = useLang();
  const { sites, categories } = useSuspenseQuery(catalogQuery).data;

  return (
    <div className="flex min-h-screen flex-col bg-hero">
      <div className="flag-strip h-1.5 w-full" />
      <header className="flex justify-end px-4 py-4 sm:px-8">
        <LangToggle />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-4 pt-10 sm:pt-20">
        <h1 className="animate-rise">
          <Logo />
        </h1>
        <p className="mt-4 text-center text-base text-muted-foreground animate-rise [animation-delay:80ms] sm:text-lg">
          {t("tagline")}
        </p>

        <div className="mt-8 w-full animate-rise [animation-delay:160ms]">
          <SearchBox autoFocus />
        </div>

        <section className="mt-6 w-full animate-rise [animation-delay:240ms]">
          <h2 className="sr-only">{t("popular")}</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR[lang].map((q) => (
              <Link
                key={q}
                to="/search"
                search={{ q }}
                className="rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {q}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 w-full pb-16">
          <h2 className="mb-4 text-center font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground rtl:font-urdu rtl:normal-case rtl:tracking-normal">
            {t("browse")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {categories.map((c) => {
              const count = sites.filter((e) => e.category === c.id).length;
              if (count === 0) return null;
              return (
                <Link
                  key={c.id}
                  to="/search"
                  search={{ cat: c.id }}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <CategoryIcon icon={c.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold leading-tight text-foreground">
                      {c.label[lang]}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {t("sites", { n: count })}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card/60 px-4 py-5 text-center text-sm text-muted-foreground">
        {t("footer")}
      </footer>
    </div>
  );
}
