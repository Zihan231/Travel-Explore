"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangToggle({ className, compact }: { className?: string; compact?: boolean }) {
  const { lang, setLang } = useI18n();
  if (compact) {
    return (
      <button
        onClick={() => setLang(lang === "en" ? "bn" : "en")}
        aria-label={lang === "en" ? "বাংলায় দেখুন" : "Switch to English"}
        className={cn("inline-flex h-9 shrink-0 items-center rounded-lg border border-paper-200 bg-white px-2.5 text-xs font-bold whitespace-nowrap", className)}
      >
        {lang === "en" ? "বাংলা" : "EN"}
      </button>
    );
  }
  const base = "rounded-md px-2.5 py-1 text-xs font-bold transition-colors";
  return (
    <div className={cn("inline-flex items-center rounded-lg border border-paper-200 bg-white p-0.5", className)}>
      <button
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={cn(base, lang === "en" ? "bg-ink text-white" : "text-ink-500")}
      >
        EN
      </button>
      <button
        onClick={() => setLang("bn")}
        aria-pressed={lang === "bn"}
        className={cn(base, lang === "bn" ? "bg-ink text-white" : "text-ink-500")}
      >
        বাংলা
      </button>
    </div>
  );
}
