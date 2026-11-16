import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { CategoryId } from "@/data/directory";
import { cn } from "@/lib/utils";

export function SearchBox({
  defaultValue = "",
  category,
  size = "lg",
  autoFocus,
}: {
  defaultValue?: string;
  category?: CategoryId | undefined;
  size?: "lg" | "sm";
  autoFocus?: boolean;
}) {
  const { t } = useLang();
  const navigate = useNavigate();
  const [value, setValue] = useState(defaultValue);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  const big = size === "lg";

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        navigate({ to: "/search", search: { q: q || undefined, cat: category } });
      }}
      className={cn(
        "group flex w-full items-center gap-2 rounded-full border border-border bg-card shadow-search transition-shadow focus-within:border-primary focus-within:shadow-search-focus",
        big ? "p-2 ps-5" : "p-1.5 ps-4",
      )}
    >
      <Search className={cn("shrink-0 text-muted-foreground", big ? "h-5 w-5" : "h-4 w-4")} />
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("search")}
        autoFocus={autoFocus}
        className={cn(
          "min-w-0 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden",
          big ? "py-2 text-base sm:text-lg" : "py-1 text-sm sm:text-base",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label={t("clear")}
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          "shrink-0 rounded-full bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary-hover",
          big ? "px-5 py-2.5 text-base sm:px-7" : "px-4 py-1.5 text-sm",
        )}
      >
        {t("search")}
      </button>
    </form>
  );
}
