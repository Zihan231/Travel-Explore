"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Crown, TrendingUp, TrendingDown, Minus, BookMarked, Star } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { leaderboard, currentUser } from "@/lib/data";
import { cn, formatCount } from "@/lib/utils";

function Trend({ trend }: { trend: "up" | "down" | "same" }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-leaf-600" />;
  if (trend === "down") return <TrendingDown className="h-4 w-4 text-ruchi-600" />;
  return <Minus className="h-4 w-4 text-ink-400" />;
}

export default function LeaderboardPage() {
  const { tr, t, lang } = useI18n();
  const { isAdmin } = useAuth();
  const [range, setRange] = useState<"week" | "all">("all");
  const [first, second, third] = leaderboard;
  const rest = leaderboard.slice(3);
  const podium = [
    { u: second, h: "h-20", bg: "bg-ink-700", n: 2 },
    { u: first, h: "h-28", bg: "bg-ruchi-600", n: 1 },
    { u: third, h: "h-16", bg: "bg-leaf-700", n: 3 },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-extrabold">
          <Trophy className="h-7 w-7 text-ruchi-600" /> {t("leaderboard")}
        </h1>
        <p className="mt-1 text-ink-500">{tr("Ranked by stamps collected.", "সংগৃহীত স্ট্যাম্প অনুযায়ী র‍্যাংক।")}</p>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border border-gold-400/50 bg-gold-100/60 p-4">
        <Image src={first.avatar} alt={first.name} width={52} height={52} className="h-[52px] w-[52px] rounded-xl object-cover" />
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gold-600"><Crown className="h-3.5 w-3.5" />{t("explorerOfMonth")}</p>
          <p className="font-display text-xl font-bold">{first.name}</p>
          <p className="text-sm text-ink-700">{first.stamps} {tr("stamps", "স্ট্যাম্প")} · {formatCount(first.points)} pts</p>
        </div>
      </div>

      <div className="grid grid-cols-2 rounded-xl border border-paper-200 bg-white p-1">
        {(["week", "all"] as const).map((r) => (
          <button key={r} onClick={() => setRange(r)} className={cn("rounded-lg py-2.5 text-sm font-bold transition-colors", range === r ? "bg-ink text-white" : "text-ink-500")}>
            {r === "week" ? t("thisWeek") : t("allTime")}
          </button>
        ))}
      </div>

      <div className="flex items-end justify-center gap-3 pt-2">
        {podium.map(({ u, h, bg, n }, i) => (
          <motion.div key={u.username} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="flex flex-1 flex-col items-center">
            <Image src={u.avatar} alt={u.name} width={n === 1 ? 64 : 52} height={n === 1 ? 64 : 52} className={cn("rounded-xl object-cover", n === 1 ? "h-16 w-16" : "h-[52px] w-[52px]")} />
            <p className="mt-2 w-full truncate text-center text-sm font-bold">{u.name.split(" ")[0]}</p>
            <p className="mb-2 text-xs text-ink-500">{u.stamps} {tr("stamps", "স্ট্যাম্প")}</p>
            <div className={cn("grid w-full place-items-start justify-center rounded-t-xl pt-2 text-white", bg, h)}>
              <span className="font-display text-3xl font-extrabold">{n}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        {rest.map((u, i) => {
          const me = !isAdmin && u.username === currentUser.username;
          return (
            <motion.div key={u.username} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className={cn("flex items-center gap-3 rounded-xl border p-3 shadow-card", me ? "border-ruchi-300 bg-ruchi-50" : "border-paper-200 bg-white")}>
              <span className="w-6 text-center font-display text-lg font-extrabold text-ink-400">{u.rank}</span>
              <Image src={u.avatar} alt={u.name} width={42} height={42} className="h-[42px] w-[42px] rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate font-bold">
                  {u.name}
                  {me && <span className="rounded bg-ruchi-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{tr("You", "আপনি")}</span>}
                </p>
                <p className="truncate text-xs text-ink-500">{pick(u.level, lang)}</p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1 font-bold"><BookMarked className="h-3.5 w-3.5 text-ruchi-600" />{u.stamps}</p>
                <p className="flex items-center justify-end gap-0.5 text-xs text-ink-500"><Star className="h-3 w-3 text-gold-500" />{formatCount(u.points)}</p>
              </div>
              <Trend trend={u.trend} />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
