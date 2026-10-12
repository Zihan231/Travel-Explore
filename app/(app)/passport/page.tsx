"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookMarked, Target, Award, Lock, Mountain, Waves, TreePine, Landmark, Flame, Gem, Crown, Compass,
  MapPin, X, Check, Gift, CalendarDays, ArrowRight, type LucideIcon,
} from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { places, missions, currentUser } from "@/lib/data";
import type { Place } from "@/lib/types";
import { Stamp } from "@/components/stamp";
import { SquareMark } from "@/components/brand";
import { RarityTag } from "@/components/rarity-tag";
import { CheckinsReview } from "@/components/admin-parts";
import { Button } from "@/components/ui/button";
import { MissionCard } from "@/components/mission-card";
import { cn } from "@/lib/utils";

type Tab = "stamps" | "missions" | "badges";
type Filter = "all" | "collected" | "todo";

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

const visitDates: Record<string, { day: string; year: string; full: string }> = {
  p1: { day: "12 MAR", year: "2026", full: "12 March 2026" },
  p2: { day: "28 APR", year: "2026", full: "28 April 2026" },
  p4: { day: "05 JUN", year: "2026", full: "5 June 2026" },
  p7: { day: "19 AUG", year: "2026", full: "19 August 2026" },
};

const milestones = [
  { at: 3, en: "Explorer badge", bn: "এক্সপ্লোরার ব্যাজ" },
  { at: 5, en: "Pathfinder badge", bn: "পথপ্রদর্শক ব্যাজ" },
  { at: 8, en: "Gold passport cover", bn: "গোল্ড পাসপোর্ট কভার" },
];

function IdentityPage({ collected }: { collected: number }) {
  const { tr, t } = useI18n();
  return (
    <section className="relative overflow-hidden rounded-2xl border border-leaf-800/40 bg-leaf-800 text-white shadow-lift">
      <div className="dots absolute inset-0" />
      <div className="relative flex">
        <div className="hidden w-14 shrink-0 flex-col items-center justify-between bg-leaf-900 py-5 sm:flex">
          <SquareMark className="h-6 w-6" />
          <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">Ruchi Explore Limitless</span>
          <span className="font-display text-xl font-extrabold leading-none">রুচি</span>
        </div>

        <div className="flex-1 p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/75">{tr("Digital passport", "ডিজিটাল পাসপোর্ট")}</p>
              <p className="mt-0.5 hidden text-[11px] font-semibold text-white/60 sm:block">People&apos;s Republic of Bangladesh · Explorer Edition</p>
            </div>
            <span className="shrink-0 whitespace-nowrap rounded-md bg-gold-500 px-2.5 py-1 font-display text-sm font-extrabold text-ink shadow">№ BD-0004</span>
          </div>

          <div className="mt-5 flex gap-4">
            <Image src={currentUser.avatar} alt={currentUser.name} width={112} height={140} className="h-[132px] w-[104px] shrink-0 rounded-lg border-2 border-white/80 object-cover shadow-card" />
            <dl className="grid min-w-0 flex-1 grid-cols-2 content-start gap-x-4 gap-y-3 text-sm">
              <div className="col-span-2">
                <dt className="text-[10px] font-bold uppercase tracking-widest text-white/60">{tr("Holder", "ধারক")}</dt>
                <dd className="truncate font-display text-2xl font-extrabold leading-tight">{currentUser.name}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-white/60">{tr("Level", "লেভেল")}</dt>
                <dd className="font-semibold">{t("level")} {currentUser.levelNum}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-white/60">{tr("Issued", "ইস্যু")}</dt>
                <dd className="font-semibold">02 Mar 2026</dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-white/60">{tr("Stamps", "স্ট্যাম্প")}</dt>
                <dd className="font-display text-xl font-extrabold leading-none">{collected}<span className="text-sm text-white/65"> / {places.length}</span></dd>
              </div>
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-white/60">XP</dt>
                <dd className="font-display text-xl font-extrabold leading-none">{currentUser.xp}</dd>
              </div>
            </dl>
          </div>

          <p aria-hidden className="mt-5 overflow-hidden whitespace-nowrap rounded-md bg-black/20 px-3 py-2 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-white/70 sm:text-xs">
            P&lt;BGD&lt;AHMED&lt;&lt;RAFIQ&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;<br />
            RTS0004&lt;&lt;7BGD2603&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;04
          </p>
        </div>
      </div>
    </section>
  );
}

function Milestones({ collected }: { collected: number }) {
  const { tr } = useI18n();
  const max = places.length;
  const next = milestones.find((m) => m.at > collected);
  return (
    <section className="rounded-2xl border border-paper-200 bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold"><Gift className="h-5 w-5 text-gold-500" />{tr("Rewards", "পুরস্কার")}</h2>
        {next && <p className="text-xs font-semibold text-ink-500">{tr(`${next.at - collected} more to unlock`, `আনলক করতে আরও ${next.at - collected}টি`)} <b className="text-ink">{tr(next.en, next.bn)}</b></p>}
      </div>
      <div className="relative mb-3 mt-6 h-2 rounded-full bg-paper-100 sm:mb-9">
        <motion.div initial={{ width: 0 }} animate={{ width: `${(collected / max) * 100}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-leaf-600" />
        {milestones.map((m) => {
          const done = collected >= m.at;
          return (
            <div key={m.at} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(m.at / max) * 100}%` }}>
              <span className={cn("grid h-7 w-7 place-items-center rounded-full border-2 bg-white text-xs font-extrabold", done ? "border-leaf-600 bg-leaf-600 text-white" : "border-paper-300 text-ink-500")}>
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : m.at}
              </span>
              <span className="absolute left-1/2 top-9 hidden w-24 -translate-x-1/2 text-center text-[10px] font-semibold leading-tight text-ink-500 sm:block">{tr(m.en, m.bn)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function EmptySlot({ place }: { place: Place }) {
  const { lang, tr } = useI18n();
  return (
    <div className="relative grid aspect-[4/5] w-full place-items-center rounded-lg border-2 border-dashed border-paper-300 bg-paper-100/60 p-3 text-center">
      <div>
        <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-white text-ink-400 shadow-card"><Lock className="h-4 w-4" /></span>
        <p className="mt-3 font-display text-sm font-bold leading-tight text-ink-700">{pick(place.name, lang)}</p>
        <p className="mt-0.5 text-[11px] text-ink-500">{tr("Not visited yet", "এখনও যাওয়া হয়নি")}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-leaf-700">{tr("Unlock", "আনলক করুন")} <ArrowRight className="h-3 w-3" /></span>
      </div>
    </div>
  );
}

function StampModal({ place, onClose }: { place: Place; onClose: () => void }) {
  const { lang, tr } = useI18n();
  const d = visitDates[place.id];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-4 sm:items-center" onClick={onClose}>
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-paper shadow-lift"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-lg bg-white text-ink shadow-card"><X className="h-4 w-4" /></button>
        <div className="dots-dark flex justify-center bg-paper-100 px-6 pb-6 pt-8">
          <motion.div initial={{ rotate: 0, scale: 0.9 }} animate={{ rotate: -3, scale: 1 }} className="w-48">
            <Stamp place={place} collected={place.collected} day={d?.day} year={d?.year} />
          </motion.div>
        </div>
        <div className="space-y-4 p-5">
          <div>
            <div className="flex items-center gap-2"><RarityTag rarity={place.rarity} /></div>
            <h2 className="mt-2 text-2xl font-extrabold">{pick(place.name, lang)}</h2>
            <p className="flex items-center gap-1 text-sm text-ink-500"><MapPin className="h-3.5 w-3.5" />{pick(place.location, lang)}</p>
          </div>
          {place.collected ? (
            <p className="flex items-center gap-2 rounded-lg bg-leaf-50 px-3 py-2.5 text-sm font-semibold text-leaf-800">
              <CalendarDays className="h-4 w-4" /> {tr("Collected on", "সংগ্রহের তারিখ")} {d?.full}
            </p>
          ) : (
            <p className="flex items-center gap-2 rounded-lg bg-paper-100 px-3 py-2.5 text-sm font-semibold text-ink-700">
              <Lock className="h-4 w-4" /> {tr("Check in at this place to collect the stamp.", "স্ট্যাম্প পেতে এই স্থানে চেক-ইন করুন।")}
            </p>
          )}
          <ul className="space-y-1.5">
            {place.mission.map((m, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-ink-700">
                <span className={cn("grid h-4 w-4 place-items-center rounded border", place.collected ? "border-leaf-500 bg-leaf-500 text-white" : "border-paper-300 bg-white")}>
                  {place.collected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {pick(m, lang)}
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2.5">
            <Link href={`/places/${place.slug}`}><Button variant="outline" className="w-full">{tr("View place", "স্থান দেখুন")}</Button></Link>
            {!place.collected && <Link href={`/checkin/${place.slug}`}><Button className="w-full"><MapPin className="h-4 w-4" />{tr("Check in", "চেক-ইন")}</Button></Link>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Passport() {
  const { lang, tr, t } = useI18n();
  const [tab, setTab] = useState<Tab>("stamps");
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<Place | null>(null);
  const collected = places.filter((p) => p.collected).length;

  const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
    { id: "stamps", label: t("stamps"), icon: BookMarked },
    { id: "missions", label: t("missions"), icon: Target },
    { id: "badges", label: t("badges"), icon: Award },
  ];

  const shown = places.filter((p) => (filter === "all" ? true : filter === "collected" ? p.collected : !p.collected));
  const pages = Object.entries(
    shown.reduce<Record<string, Place[]>>((acc, p) => {
      (acc[p.division] ||= []).push(p);
      return acc;
    }, {})
  );
  const rot = [-1.6, 1.2, -0.8, 1.8, -1.2, 0.9];

  return (
    <div className="space-y-5">
      <IdentityPage collected={collected} />
      <Milestones collected={collected} />

      <div className="grid grid-cols-3 rounded-xl border border-paper-200 bg-white p-1">
        {tabs.map((tb) => (
          <button key={tb.id} onClick={() => setTab(tb.id)} className={cn("relative flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold transition-colors", tab === tb.id ? "text-white" : "text-ink-500")}>
            {tab === tb.id && <motion.span layoutId="pp-tab" className="absolute inset-0 rounded-lg bg-ink" transition={{ type: "spring", stiffness: 420, damping: 32 }} />}
            <span className="relative flex items-center gap-1.5"><tb.icon className="h-4 w-4" />{tb.label}</span>
          </button>
        ))}
      </div>

      {tab === "stamps" && (
        <div className="space-y-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {([["all", "All", "সব"], ["collected", "Collected", "সংগৃহীত"], ["todo", "To visit", "যেতে বাকি"]] as const).map(([k, en, bn]) => (
              <button key={k} onClick={() => setFilter(k)} className={cn("shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors", filter === k ? "border-leaf-600 bg-leaf-600 text-white" : "border-paper-300 bg-white text-ink-700 hover:border-ink")}>
                {tr(en, bn)}
              </button>
            ))}
          </div>

          {pages.map(([division, list], pageIdx) => {
            const got = list.filter((p) => p.collected).length;
            return (
              <section key={division} className="rounded-2xl border border-paper-200 bg-white p-4 shadow-card sm:p-5">
                <div className="mb-4 flex items-center justify-between border-b border-dashed border-paper-300 pb-3">
                  <h3 className="flex items-center gap-2 font-display text-lg font-bold">
                    <span className="grid h-7 w-7 place-items-center rounded-md bg-leaf-600 text-xs font-extrabold text-white">{pageIdx + 1}</span>
                    {division}
                  </h3>
                  <span className="text-xs font-bold text-ink-500">{got} / {list.length} {tr("stamps", "স্ট্যাম্প")}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3">
                  {list.map((p, i) => (
                    <motion.button
                      key={p.id}
                      onClick={() => setOpen(p)}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.05, 0.3) }}
                      whileHover={{ y: -4, rotate: 0 }}
                      style={{ rotate: p.collected ? rot[(pageIdx + i) % rot.length] : 0 }}
                      className="block text-left"
                      aria-label={pick(p.name, lang)}
                    >
                      {p.collected ? <Stamp place={p} day={visitDates[p.id]?.day} year={visitDates[p.id]?.year} /> : <EmptySlot place={p} />}
                    </motion.button>
                  ))}
                </div>
              </section>
            );
          })}
          {pages.length === 0 && <p className="rounded-2xl border border-dashed border-paper-300 bg-white py-12 text-center text-ink-500">{tr("Nothing here yet.", "এখানে এখনও কিছু নেই।")}</p>}
        </div>
      )}

      {tab === "missions" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} />
          ))}
        </div>
      )}

      {tab === "badges" && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {badges.map((b) => (
            <div key={b.id} className={cn("relative flex flex-col items-center rounded-2xl border p-4 text-center", b.earned ? "border-paper-200 bg-white shadow-card" : "border-dashed border-paper-300 bg-transparent")}>
              <span className={cn("grid h-14 w-14 place-items-center rounded-xl", b.earned ? "bg-gold-100 text-gold-600" : "bg-paper-100 text-ink-400")}>
                <b.icon className="h-7 w-7" />
              </span>
              <p className={cn("mt-2.5 text-xs font-bold leading-tight", !b.earned && "text-ink-500")}>{tr(b.en, b.bn)}</p>
              {!b.earned && <Lock className="absolute right-2.5 top-2.5 h-3.5 w-3.5 text-ink-400" />}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>{open && <StampModal place={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </div>
  );
}

function GuestPassport() {
  const { lang, tr, t } = useI18n();
  return (
    <div className="space-y-6">
      <section className="dots relative overflow-hidden rounded-2xl bg-leaf-700 p-6 text-white shadow-lift">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">{tr("Digital passport", "ডিজিটাল পাসপোর্ট")}</p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{tr("Every place has its own stamp.", "প্রতিটি স্থানের নিজস্ব স্ট্যাম্প আছে।")}</h1>
        <p className="mt-2 max-w-md text-white/85">{tr("Visit a destination, check in with a live selfie and the stamp is yours. Log in to start your collection.", "গন্তব্যে গিয়ে লাইভ সেলফিতে চেক-ইন করলেই স্ট্যাম্প আপনার। সংগ্রহ শুরু করতে লগ ইন করুন।")}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link href="/register"><Button variant="red">{tr("Start collecting", "সংগ্রহ শুরু করুন")}</Button></Link>
          <Link href="/login"><Button variant="outline">{tr("Log in", "লগ ইন")}</Button></Link>
        </div>
      </section>

      <div>
        <p className="mb-4 text-sm font-semibold text-ink-500">{tr("Stamps you can collect", "যে স্ট্যাম্পগুলো সংগ্রহ করা যাবে")}: <span className="text-ink">{places.length}</span></p>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {places.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              style={{ rotate: [-1.4, 1.1, -0.7, 1.5][i % 4] }}
              whileHover={{ y: -6, rotate: 0 }}
            >
              <Link href={`/places/${p.slug}`} className="block" aria-label={pick(p.name, lang)}>
                <Stamp place={p} collected={false} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold sm:text-2xl text-ink">
            <Target className="h-6 w-6 text-leaf-600" />
            {t("missions")}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-ink-500">
            {tr(
              "Complete travel quests across Bangladesh to unlock exclusive badges and stamps.",
              "বাংলাদেশজুড়ে ট্রাভেল কোয়েস্ট সম্পন্ন করে এক্সক্লুসিভ ব্যাজ ও স্ট্যাম্প অর্জন করুন।"
            )}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {missions.map((m) => (
            <MissionCard key={m.id} mission={m} isGuest={true} />
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
