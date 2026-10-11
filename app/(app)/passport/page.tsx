"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookMarked, Target, Award, Lock, Mountain, Waves, TreePine, Landmark, Flame, Gem, Crown, Compass, type LucideIcon } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { places, missions, currentUser } from "@/lib/data";
import { Stamp } from "@/components/stamp";
import { CheckinsReview } from "@/components/admin-parts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Tab = "stamps" | "missions" | "badges";

const badges: { id: string; icon: LucideIcon; en: string; bn: string; earned: boolean }[] = [
  { id: "b1", icon: Mountain, en: "Hill Conqueror", bn: "পাহাড় জয়ী", earned: true },
  { id: "b2", icon: Waves, en: "Beach Lover", bn: "বিচ লাভার", earned: true },
  { id: "b3", icon: TreePine, en: "Forest Wanderer", bn: "বন পথিক", earned: false },
  { id: "b4", icon: Landmark, en: "Heritage Keeper", bn: "ঐতিহ্য রক্ষক", earned: true },
  { id: "b5", icon: Flame, en: "7-Day Streak", bn: "৭ দিনের ধারা", earned: true },
  { id: "b6", icon: Gem, en: "Rare Hunter", bn: "দুর্লভ শিকারি", earned: false },
  { id: "b7", icon: Crown, en: "Legend Collector", bn: "কিংবদন্তি সংগ্রাহক", earned: false },
  { id: "b8", icon: Compass, en: "Pathfinder", bn: "পথপ্রদর্শক", earned: false },
];

function Passport() {
  const { lang, tr, t } = useI18n();
  const [tab, setTab] = useState<Tab>("stamps");
  const collected = places.filter((p) => p.collected).length;

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "stamps", label: t("stamps"), icon: BookMarked },
    { id: "missions", label: t("missions"), icon: Target },
    { id: "badges", label: t("badges"), icon: Award },
  ];

  return (
    <div className="space-y-5">
      <section className="dots relative overflow-hidden rounded-2xl bg-ruchi-600 p-5 text-white shadow-lift">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{tr("Digital passport", "ডিজিটাল পাসপোর্ট")}</p>
        <h1 className="mt-1 text-3xl font-extrabold">{currentUser.name}</h1>
        <p className="text-white/80">@{currentUser.username}</p>
        <div className="mt-5 grid grid-cols-3 divide-x divide-white/25 rounded-xl bg-black/15 py-3 text-center">
          {[
            [collected, t("stamps")],
            [badges.filter((b) => b.earned).length, t("badges")],
            [currentUser.xp, "XP"],
          ].map(([v, l]) => (
            <div key={String(l)}>
              <p className="font-display text-2xl font-extrabold">{v}</p>
              <p className="text-xs text-white/80">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-3 rounded-xl border border-paper-200 bg-white p-1">
        {tabs.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)} className={cn("relative flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold transition-colors", tab === tb.id ? "text-white" : "text-ink-500")}>
            {tab === tb.id && <motion.span layoutId="pp-tab" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <span className="relative flex items-center gap-1.5"><tb.icon className="h-4 w-4" />{tb.label}</span>
          </button>
        ))}
      </div>

      {tab === "stamps" && (
        <div>
          <p className="mb-4 text-sm font-semibold text-ink-500">
            {t("collectedStamps")}: <span className="text-ink">{collected} / {places.length}</span>
          </p>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            {places.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.04, 0.3) }}>
                <Link href={`/places/${p.slug}`} className="block">
                  <Stamp place={p} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "missions" && (
        <div className="space-y-3">
          {missions.map((m) => (
            <div key={m.id} className="rounded-2xl border border-paper-200 bg-white p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-bold">{pick(m.title, lang)}</p>
                  <p className="text-sm text-ink-500">{pick(m.desc, lang)}</p>
                </div>
                {m.season && <span className="shrink-0 rounded-md bg-ruchi-50 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-ruchi-700">{tr("Seasonal", "মৌসুমি")}</span>}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper-100">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(m.progress / m.target) * 100}%` }} transition={{ duration: 0.7 }} className="h-full rounded-full bg-leaf-600" />
                </div>
                <span className="text-sm font-bold text-ink-700">{m.progress}/{m.target}</span>
              </div>
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-leaf-700"><Award className="h-3.5 w-3.5" />{tr("Reward", "পুরস্কার")}: {pick(m.reward, lang)}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "badges" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {badges.map((b) => (
            <div key={b.id} className={cn("relative flex flex-col items-center rounded-2xl border p-4 text-center", b.earned ? "border-paper-200 bg-white shadow-card" : "border-dashed border-paper-300 bg-transparent")}>
              <span className={cn("grid h-14 w-14 place-items-center rounded-xl", b.earned ? "bg-ruchi-50 text-ruchi-600" : "bg-paper-100 text-ink-400")}>
                <b.icon className="h-7 w-7" />
              </span>
              <p className={cn("mt-2.5 text-xs font-bold leading-tight", !b.earned && "text-ink-500")}>{tr(b.en, b.bn)}</p>
              {!b.earned && <Lock className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-ink-400" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GuestPassport() {
  const { lang, tr, t } = useI18n();
  return (
    <div className="space-y-6">
      <section className="dots relative overflow-hidden rounded-2xl bg-ruchi-600 p-6 text-white shadow-lift">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{tr("Digital passport", "ডিজিটাল পাসপোর্ট")}</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{tr("Every place has its own stamp.", "প্রতিটি স্থানের নিজস্ব স্ট্যাম্প আছে।")}</h1>
        <p className="mt-2 max-w-md text-white/85">{tr("Visit a destination, check in with a live selfie and the stamp is yours. Log in to start your collection.", "গন্তব্যে গিয়ে লাইভ সেলফিতে চেক-ইন করলেই স্ট্যাম্প আপনার। সংগ্রহ শুরু করতে লগ ইন করুন।")}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="/register"><Button variant="dark">{tr("Start collecting", "সংগ্রহ শুরু করুন")}</Button></Link>
          <Link href="/login"><Button variant="outline">{tr("Log in", "লগ ইন")}</Button></Link>
        </div>
      </section>

      <div>
        <p className="mb-4 text-sm font-semibold text-ink-500">{tr("Stamps you can collect", "যে স্ট্যাম্পগুলো সংগ্রহ করা যাবে")}: <span className="text-ink">{places.length}</span></p>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {places.map((p) => (
            <Link key={p.id} href={`/places/${p.slug}`} className="block">
              <Stamp place={p} collected={false} />
            </Link>
          ))}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-extrabold">{t("missions")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {missions.map((m) => (
            <div key={m.id} className="rounded-2xl border border-paper-200 bg-white p-4 shadow-card">
              <p className="font-display text-lg font-bold">{pick(m.title, lang)}</p>
              <p className="text-sm text-ink-500">{pick(m.desc, lang)}</p>
              <p className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-leaf-700"><Award className="h-3.5 w-3.5" />{tr("Reward", "পুরস্কার")}: {pick(m.reward, lang)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function PassportPage() {
  const { isAdmin, isGuest } = useAuth();
  if (isGuest) return <GuestPassport />;
  return isAdmin ? <CheckinsReview /> : <Passport />;
}
