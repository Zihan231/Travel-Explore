"use client";

import Image from "next/image";
import { Lock } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Place } from "@/lib/types";
import { RarityTag } from "@/components/rarity-tag";

function Postmark({ id, text }: { id: string; text: string }) {
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
      <text x="50" y="48" textAnchor="middle" fontSize="11" fontWeight="800" fill="#d1181f">
        VISITED
      </text>
      <text x="50" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill="#d1181f">
        2026
      </text>
    </svg>
  );
}

export function Stamp({
  place,
  collected,
  className,
  compact,
}: {
  place: Place;
  collected?: boolean;
  className?: string;
  compact?: boolean;
}) {
  const { lang } = useI18n();
  const on = collected ?? place.collected;

  return (
    <div className={cn("perf relative aspect-[4/5] w-full p-2.5 shadow-card", className)}>
      <div className="relative h-full w-full overflow-hidden bg-paper-100">
        <Image
          src={place.image}
          alt={pick(place.name, lang)}
          fill
          sizes="200px"
          className={cn("object-cover", !on && "grayscale opacity-60")}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        {!compact && (
          <div className="absolute left-1.5 top-1.5">
            <RarityTag rarity={place.rarity} className="!px-1.5 !py-0.5 !text-[9px]" />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-2 text-white">
          <p className={cn("font-display font-bold leading-tight", compact ? "text-xs" : "text-sm")}>
            {pick(place.name, lang)}
          </p>
          {!compact && <p className="text-[10px] text-white/80">{pick(place.location, lang)}</p>}
        </div>

        {on ? (
          <div className="absolute -right-1 bottom-7 h-14 w-14 opacity-75 mix-blend-multiply">
            <Postmark id={place.id} text="RUCHI TOUR STORY • COLLECTED • " />
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink-500 shadow-card">
              <Lock className="h-4 w-4" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
