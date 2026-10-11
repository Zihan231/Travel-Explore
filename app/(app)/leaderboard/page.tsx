"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Crown, TrendingUp, TrendingDown, Minus, Star, Timer, Users, BookMarked, LogIn, ChevronUp, Flame } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { leaderboard, currentUser } from "@/lib/data";
import { cn, formatCount } from "@/lib/utils";
import type { LeaderUser } from "@/lib/types";

type Range = "week" | "all";
type Row = LeaderUser & { shown: number };

// Mock stamps collected this week
const weekStamps: Record<string, number> = {
  "mim.wanders": 3, "nusrat.explores": 5, "arif.onroad": 2, "tanvir.trails": 4, "sadia.journeys": 1,
  rafiq: 2, "imran.treks": 3, "farhana.far": 2, "jahid.hikes": 1, "tasnim.ara": 1,
};

const TOTAL = 20;

function Trend({ trend }: { trend: LeaderUser["trend"] }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-leaf-600" aria-label="up" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-ruchi-600" aria-label="down" />;
  return <Minus className="h-4 w-4 text-ink-400" aria-label="same" />;
}

function PodiumPlace({ row, place, range }: { row: Row; place: 1 | 2 | 3; range: Range }) {
  const { tr } = useI18n();
  const cfg = {
    1: { pedestal: "h-28 sm:h-32", ring: "ring-gold-400", size: "h-20 w-20 sm:h-24 sm:w-24", badge: "bg-gold-500" },
    2: { pedestal: "h-20 sm:h-24", ring: "ring-white/80", size: "h-16 w-16 sm:h-20 sm:w-20", badge: "bg-ink-400" },
    3: { pedestal: "h-14 sm:h-20", ring: "ring-orange-300", size: "h-16 w-16 sm:h-20 sm:w-20", badge: "bg-orange-400" },
  }[place];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: place === 1 ? 0.05 : 0.15, type: "spring", stiffness: 220, damping: 22 }}
      className="flex flex-1 flex-col items-center"
    >
      <div className="relative">
        {place === 1 && <Crown className="absolute -top-7 left-1/2 h-7 w-7 -translate-x-1/2 fill-gold-400 text-gold-400 drop-shadow" />}
        <Image src={row.avatar} alt={row.name} width={96} height={96} className={cn("rounded-full object-cover ring-4", cfg.size, cfg.ring)} />
        <span className={cn("absolute -bottom-2 left-1/2 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full text-sm font-extrabold text-white ring-2 ring-ruchi-600", cfg.badge)}>
          {place}
        </span>
      </div>
      <p className="mt-4 w-full truncate text-center text-sm font-bold text-white sm:text-base">{row.name.split(" ")[0]}</p>
      <p className="text-xs text-white/80">{row.shown} {range === "week" ? tr("this week", "এই সপ্তাহে") : tr("stamps", "স্ট্যাম্প")}</p>
      <div className={cn("mt-3 flex w-full items-start justify-center rounded-t-xl bg-white/15 pt-2 backdrop-blur-sm", cfg.pedestal)}>
        <span className="font-display text-3xl font-extrabold text-white/90 sm:text-4xl">{place}</span>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const { lang, tr, t } = useI18n();
  const { role } = useAuth();
  const [range, setRange] = useState<Range>("all");

  const rows: Row[] = useMemo(() => {
    const base = leaderboard.map((u) => ({ ...u, shown: range === "week" ? weekStamps[u.username] ?? 0 : u.stamps }));
    const sorted = [...base].sort((a, b) => b.shown - a.shown || b.points - a.points);
    return sorted.map((u, i) => ({ ...u, rank: i + 1 }));
  }, [range]);

  const top = rows.slice(0, 3);
  const rest = rows.slice(3);
  const leaderCount = rows[0].shown || 1;
  const me = rows.find((r) => r.username === currentUser.username);
  const ahead = me ? rows[me.rank - 2] : undefined;

  return (
    <div className="space-y-6">
      {/* Hero + podium */}
      <section className="dots relative overflow-hidden rounded-2xl bg-ruchi-600 px-4 pb-0 pt-6 text-white shadow-lift sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{tr("Ruchi Tour Story", "রুচি ট্যুর স্টোরি")}</p>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{t("leaderboard")}</h1>
          </div>
          <div className="grid grid-cols-2 rounded-xl bg-black/20 p-1" role="tablist">
            {(["week", "all"] as const).map((r) => (
              <button
                key={r}
                role="tab"
                aria-selected={range === r}
                onClick={() => setRange(r)}
                className={cn("relative rounded-lg px-4 py-2 text-sm font-bold transition-colors", range === r ? "text-ruchi-700" : "text-white/85 hover:text-white")}
              >
                {range === r && <motion.span layoutId="lb-range" className="absolute inset-0 rounded-lg bg-white" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{r === "week" ? t("thisWeek") : t("allTime")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/20 px-2.5 py-1"><Users className="h-3.5 w-3.5" />12.4K {tr("explorers", "ভ্রমণকারী")}</span>
          {range === "week" && <span className="inline-flex items-center gap-1.5 rounded-md bg-black/20 px-2.5 py-1"><Timer className="h-3.5 w-3.5" />{tr("Resets in 3 days", "৩ দিনে রিসেট")}</span>}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={range} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="mt-10 flex items-end gap-2 sm:gap-4">
            <PodiumPlace row={top[1]} place={2} range={range} />
            <PodiumPlace row={top[0]} place={1} range={range} />
            <PodiumPlace row={top[2]} place={3} range={range} />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* My rank / CTA */}
      {role === "tourist" && me && (
        <section className="flex items-center gap-4 rounded-2xl border-2 border-ruchi-600 bg-white p-4 shadow-card">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-ruchi-600 text-white">
            <span className="font-display text-2xl font-extrabold">#{me.rank}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold">{tr("Your position", "আপনার অবস্থান")}</p>
            <p className="text-sm text-ink-500">
              {ahead && ahead.shown - me.shown >= 0
                ? tr(`${ahead.shown - me.shown + 1} more stamp${ahead.shown - me.shown + 1 > 1 ? "s" : ""} to pass ${ahead.name.split(" ")[0]}`, `${ahead.name.split(" ")[0]}-কে ছাড়াতে আরও ${ahead.shown - me.shown + 1}টি স্ট্যাম্প`)
                : tr("You are leading. Keep exploring!", "আপনি এগিয়ে। চালিয়ে যান!")}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper-100">
              <div className="h-full rounded-full bg-ruchi-600" style={{ width: `${Math.min(100, (me.shown / leaderCount) * 100)}%` }} />
            </div>
          </div>
          <Link href="/explore" className="hidden shrink-0 items-center gap-1 rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-white sm:inline-flex">
            <ChevronUp className="h-4 w-4" /> {tr("Climb", "এগিয়ে যান")}
          </Link>
        </section>
      )}
      {role === "guest" && (
        <section className="flex items-center gap-4 rounded-2xl border border-dashed border-paper-300 bg-white p-4 shadow-card">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-ruchi-50 text-ruchi-600"><Flame className="h-6 w-6" /></span>
          <div className="min-w-0 flex-1">
            <p className="font-bold">{tr("Where would you rank?", "আপনি কোথায় থাকতেন?")}</p>
            <p className="text-sm text-ink-500">{tr("Log in and collect stamps to join the race.", "লগ ইন করে স্ট্যাম্প সংগ্রহ করুন ও প্রতিযোগিতায় যোগ দিন।")}</p>
          </div>
          <Link href="/login" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-ruchi-600 px-4 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-ruchi-700">
            <LogIn className="h-4 w-4" /> {tr("Log in", "লগ ইন")}
          </Link>
        </section>
      )}

      {/* Ranking table */}
      <section>
        <h2 className="mb-3 text-xl font-extrabold">{tr("Rankings", "র‍্যাংকিং")}</h2>
        <div className="overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card">
          <AnimatePresence mode="popLayout" initial={false}>
            {rest.map((u, i) => {
              const mine = role === "tourist" && u.username === currentUser.username;
              return (
                <motion.div
                  key={u.username}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 30 }}
                  className={cn("flex items-center gap-3 px-4 py-3.5", i > 0 && "border-t border-paper-100", mine && "bg-ruchi-50")}
                >
                  <span className="w-7 text-center font-display text-xl font-extrabold text-ink-400">{u.rank}</span>
                  <Image src={u.avatar} alt={u.name} width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate font-bold">
                      {u.name}
                      {mine && <span className="rounded bg-ruchi-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{tr("You", "আপনি")}</span>}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1.5 w-full max-w-[160px] overflow-hidden rounded-full bg-paper-100">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(4, (u.shown / TOTAL) * 100 * (range === "week" ? 3 : 1))}%` }} transition={{ duration: 0.6 }} className="h-full rounded-full bg-ruchi-600" />
                      </div>
                      <span className="hidden truncate text-xs text-ink-500 sm:inline">{pick(u.level, lang)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="flex items-center justify-end gap-1 font-bold"><BookMarked className="h-3.5 w-3.5 text-ruchi-600" />{u.shown}</p>
                    <p className="flex items-center justify-end gap-0.5 text-xs text-ink-500"><Star className="h-3 w-3 text-gold-500" />{formatCount(range === "week" ? u.shown * 250 : u.points)}</p>
                  </div>
                  <Trend trend={u.trend} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
