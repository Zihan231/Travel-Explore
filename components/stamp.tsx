"use client";

import Image from "next/image";
import { Lock, Crown, Gem } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Place, Rarity } from "@/lib/types";

const xpByRarity: Record<Rarity, number> = { common: 250, rare: 400, legendary: 600 };

const paper: Record<Rarity, string> = {
  common: "#d1181f",
  rare: "#2c8236",
  legendary: "#c99a2e",
};

const plate: Record<Rarity, string> = {
  common: "text-ink",
  rare: "text-leaf-800",
  legendary: "text-gold-600",
};

function Postmark({ id, text, day, year }: { id: string; text: string; day?: string; year?: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-12" aria-hidden>
      <defs>
        <path id={`pm-${id}`} d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="#d1181f" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#d1181f" strokeWidth="1" />
      <circle cx="50" cy="50" r="22" fill="none" stroke="#d1181f" strokeWidth="1.2" />
      <text fontSize="8.5" fontWeight="800" fill="#d1181f" letterSpacing="2.2">
        <textPath href={`#pm-${id}`} startOffset="0">
          {text}
        </textPath>
      </text>
      <text x="50" y="48" textAnchor="middle" fontSize={day ? 10 : 11} fontWeight="800" fill="#d1181f">
        {day ?? "VISITED"}
      </text>
      <text x="50" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#d1181f">
        {year ?? "2026"}
      </text>
    </svg>
  );
}

export function Stamp({
  place,
  collected,
  className,
  compact,
  day,
  year,
}: {
  place: Place;
  collected?: boolean;
  className?: string;
  compact?: boolean;
  day?: string;
  year?: string;
}) {
  const { lang, tr } = useI18n();
  const on = collected ?? place.collected;
  const legendary = place.rarity === "legendary";
  const rare = place.rarity === "rare";

  return (
    <div className={cn("perf relative aspect-[4/5] w-full p-2 shadow-card sm:p-2.5", className)} style={{ "--paper": paper[place.rarity] } as React.CSSProperties}>
      <div className="relative flex h-full w-full flex-col overflow-hidden border-2 border-white bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
        {/* artwork */}
        <div className="relative min-h-0 flex-1 overflow-hidden bg-paper-100">
          <Image
            src={place.image}
            alt={pick(place.name, lang)}
            fill
            sizes="240px"
            className={cn("object-cover transition-transform duration-500", !on && "saturate-[.45] brightness-95")}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/10" />
          {legendary && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />}

          {!compact && (
            <span
              className={cn(
                "absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-white shadow",
                legendary ? "bg-gold-500" : rare ? "bg-leaf-600" : "bg-ink/70 backdrop-blur"
              )}
            >
              {legendary ? <Crown className="h-2.5 w-2.5" /> : rare ? <Gem className="h-2.5 w-2.5" /> : null}
              {legendary ? tr("Legendary", "কিংবদন্তি") : rare ? tr("Rare", "দুর্লভ") : tr("Common", "সাধারণ")}
            </span>
          )}

          {/* denomination, like a real stamp */}
          <span className="absolute right-1.5 top-1.5 rounded bg-white/90 px-1.5 py-0.5 font-display text-[10px] font-extrabold leading-none text-ruchi-700 shadow">
            {xpByRarity[place.rarity]}
            <span className="ml-0.5 text-[7px] font-bold text-ink-500">XP</span>
          </span>

          {on ? (
            <div className="absolute -right-1 bottom-1 h-14 w-14 opacity-80 mix-blend-multiply">
              <Postmark id={place.id} text="RUCHI TOUR STORY • COLLECTED • " day={day} year={year} />
            </div>
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-white/85 bg-black/25 text-white backdrop-blur-[2px]">
                <Lock className="h-5 w-5" />
              </span>
            </div>
          )}
        </div>

        {/* name plate */}
        <div className="border-t border-paper-200 bg-white px-2 py-1.5 text-center">
          <p className={cn("truncate font-display font-extrabold leading-tight", compact ? "text-[11px]" : "text-sm", plate[place.rarity])}>
            {pick(place.name, lang)}
          </p>
          {!compact && (
            <p className="truncate text-[9px] font-bold uppercase tracking-[0.14em] text-ink-500">
              {pick(place.location, lang)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
