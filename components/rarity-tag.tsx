"use client";

import { Crown, Gem, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { Rarity } from "@/lib/types";

const cfg: Record<Rarity, { en: string; bn: string; cls: string; Icon: typeof Gem }> = {
  common: { en: "Common", bn: "সাধারণ", cls: "bg-white text-ink-700 ring-paper-300", Icon: Circle },
  rare: { en: "Rare", bn: "দুর্লভ", cls: "bg-leaf-600 text-white ring-leaf-700", Icon: Gem },
  legendary: { en: "Legendary", bn: "কিংবদন্তি", cls: "bg-gold-500 text-white ring-gold-600", Icon: Crown },
};

export function RarityTag({ rarity, className }: { rarity: Rarity; className?: string }) {
  const { tr } = useI18n();
  const c = cfg[rarity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide ring-1 ring-inset",
        c.cls,
        className
      )}
    >
      <c.Icon className="h-3 w-3" />
      {tr(c.en, c.bn)}
    </span>
  );
}
