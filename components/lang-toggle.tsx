"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();
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
