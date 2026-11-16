import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function LangToggle() {
  const { lang, setLang, t } = useLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "en" ? "ur" : "en")}
      aria-label={t("switchLabel")}
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-soft transition-colors hover:border-primary hover:text-primary"
    >
      <Languages className="h-4 w-4" />
      <span className={lang === "en" ? "font-urdu" : "font-sans"}>{t("switchTo")}</span>
    </button>
  );
}
