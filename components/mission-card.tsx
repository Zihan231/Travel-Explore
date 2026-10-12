"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Compass,
  CloudRain,
  Waves,
  Mountain,
  Award,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { Mission } from "@/lib/types";
import { cn } from "@/lib/utils";

interface MissionCardProps {
  mission: Mission;
  isGuest?: boolean;
}

const missionIcons: Record<string, { icon: typeof Compass; color: string; border: string; bg: string }> = {
  m1: { icon: Compass, color: "text-leaf-700", border: "border-leaf-200", bg: "bg-leaf-50" },
  m2: { icon: CloudRain, color: "text-gold-700", border: "border-gold-300", bg: "bg-gold-50" },
  m3: { icon: Waves, color: "text-sky-700", border: "border-sky-200", bg: "bg-sky-50" },
  m4: { icon: Mountain, color: "text-emerald-700", border: "border-emerald-200", bg: "bg-emerald-50" },
};

export function MissionCard({ mission, isGuest = false }: MissionCardProps) {
  const { lang, tr } = useI18n();
  const theme = missionIcons[mission.id] || missionIcons.m1;
  const Icon = theme.icon;

  const percent = Math.min(100, Math.round((mission.progress / mission.target) * 100));
  const isDone = mission.progress >= mission.target;

  const exploreHref = mission.category && mission.category !== "all" 
    ? `/explore?cat=${mission.category}` 
    : "/explore";

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-paper-200 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-leaf-300 hover:shadow-lift"
      )}
    >
      {/* Subtle background glow for seasonal missions */}
      {mission.season && (
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gold-200/40 blur-2xl transition-opacity group-hover:opacity-75" />
      )}

      <div>
        {/* Header row: Icon + Tags */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-transform duration-200 group-hover:scale-105",
                theme.bg,
                theme.border,
                theme.color
              )}
            >
              <Icon className="h-6 w-6" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <h3 className="font-display text-base font-bold text-ink sm:text-lg">
                  {pick(mission.title, lang)}
                </h3>
              </div>
              <p className="mt-0.5 text-xs text-ink-500 sm:text-[13px] leading-relaxed">
                {pick(mission.desc, lang)}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1.5">
            {mission.season && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold-300 bg-gold-50 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide text-gold-800 shadow-sm">
                <Sparkles className="h-3 w-3 text-gold-600" />
                {tr("Seasonal", "মৌসুমি")}
              </span>
            )}
            {mission.xp && (
              <span className="inline-flex items-center gap-1 rounded-full bg-paper-100 px-2 py-0.5 text-[11px] font-bold text-ink-600">
                <Zap className="h-3 w-3 text-gold-600" />
                +{mission.xp} XP
              </span>
            )}
          </div>
        </div>

        {/* Progress section */}
        <div className="mt-4 rounded-xl bg-paper/60 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold text-ink-700">
              {isDone ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-leaf-600" />
                  <span className="text-leaf-700">{tr("Completed", "সম্পন্ন")}</span>
                </>
              ) : (
                <span className="text-ink-600">{tr("Mission Progress", "মিশনের অগ্রগতি")}</span>
              )}
            </span>
            <span className="font-extrabold text-ink">
              {mission.progress}
              <span className="text-ink-400"> / {mission.target}</span>
              <span className="ml-1.5 font-medium text-ink-500">({percent}%)</span>
            </span>
          </div>

          <div className="relative mt-2 h-2.5 w-full overflow-hidden rounded-full bg-paper-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={cn(
                "h-full rounded-full transition-all",
                isDone
                  ? "bg-leaf-600"
                  : mission.season
                  ? "bg-gradient-to-r from-gold-500 to-amber-500"
                  : "bg-gradient-to-r from-leaf-600 to-leaf-500"
              )}
            />
          </div>
        </div>
      </div>

      {/* Footer / Reward Strip & Explore Action */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2.5 border-t border-paper-100 pt-3">
        <div className="flex items-center gap-2 rounded-lg bg-leaf-50/80 px-2.5 py-1 text-xs font-semibold text-leaf-800 ring-1 ring-leaf-600/10">
          <Award className="h-4 w-4 text-leaf-700 shrink-0" />
          <span className="text-ink-500 font-medium">{tr("Reward", "পুরস্কার")}:</span>
          <span className="font-bold text-leaf-900">{pick(mission.reward, lang)}</span>
        </div>

        <Link
          href={isGuest ? "/login" : exploreHref}
          className="inline-flex items-center gap-1 text-xs font-bold text-leaf-700 transition-colors hover:text-leaf-800 group-hover:translate-x-0.5"
        >
          {isGuest ? (
            <>
              <Lock className="h-3.5 w-3.5" />
              <span>{tr("Join to track", "ট্র্যাক করতে যোগ দিন")}</span>
            </>
          ) : (
            <>
              <span>{tr("Explore spots", "স্পটগুলো দেখুন")}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
