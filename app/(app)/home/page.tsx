"use client";

import Link from "next/link";
import { ChevronRight, Flame, Target, Trophy, Plus, Inbox } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { currentUser, places, missions } from "@/lib/data";
import { PlaceCard } from "@/components/place-card";
import { Stamp } from "@/components/stamp";
import { AdminStats, SpotReviewList } from "@/components/admin-parts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SectionTitle({ title, href }: { title: string; href?: string }) {
  const { t } = useI18n();
  return (
    <div className="flex items-end justify-between">
      <h2 className="text-xl font-extrabold">{title}</h2>
      {href && (
        <Link href={href} className="flex items-center text-sm font-bold text-ruchi-700">
          {t("seeAll")} <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function AdminHome() {
  const { tr } = useI18n();
  return (
    <div className="space-y-7">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-500">{tr("Admin console", "অ্যাডমিন কনসোল")}</p>
          <h1 className="text-3xl font-extrabold">{tr("Dashboard", "ড্যাশবোর্ড")}</h1>
        </div>
        <Link href="/create" className="lg:hidden">
          <Button size="sm"><Plus className="h-4 w-4" />{tr("Add", "যোগ")}</Button>
        </Link>
      </div>
      <AdminStats />
      <section className="space-y-3">
        <SectionTitle title={tr("Waiting for review", "যাচাইয়ের অপেক্ষায়")} href="/spots" />
        <SpotReviewList limit={1} />
      </section>
      <section className="space-y-3">
        <SectionTitle title={tr("Top destinations", "শীর্ষ গন্তব্য")} href="/explore" />
        <div className="overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card">
          {[...places].sort((a, b) => b.visitors - a.visitors).slice(0, 5).map((p, i, arr) => (
            <Link key={p.id} href={`/places/${p.slug}`} className={cn("flex items-center gap-3 px-4 py-3 hover:bg-paper", i < arr.length - 1 && "border-b border-paper-100")}>
              <span className="w-5 text-center font-display text-lg font-extrabold text-ink-400">{i + 1}</span>
              <PlaceName id={p.id} />
              <span className="font-display text-lg font-extrabold">{(p.visitors / 1000).toFixed(1)}K</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function PlaceName({ id }: { id: string }) {
  const { lang } = useI18n();
  const p = places.find((x) => x.id === id)!;
  return (
    <span className="flex-1">
      <span className="block font-bold">{pick(p.name, lang)}</span>
      <span className="text-xs text-ink-500">{pick(p.location, lang)}</span>
    </span>
  );
}

function TouristHome() {
  const { lang, tr, t } = useI18n();
  const collected = places.filter((p) => p.collected);
  const next = places.filter((p) => !p.collected);
  const goal = 10;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-ink-500">{tr("Your journey is just beginning", "আপনার যাত্রা সবে শুরু")}</p>
        <h1 className="text-3xl font-extrabold">
          {t("greeting")}, {currentUser.name.split(" ")[0]}
        </h1>
      </div>

      <section className="dots relative overflow-hidden rounded-2xl bg-ruchi-600 p-5 text-white shadow-lift">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">{tr("Bangladesh Discoveries", "বাংলাদেশ আবিষ্কার")}</p>
            <p className="mt-1 font-display text-5xl font-extrabold leading-none">
              {collected.length}
              <span className="text-2xl text-white/70"> / {goal}</span>
            </p>
            <p className="mt-1 text-sm text-white/85">{tr("stamps collected", "স্ট্যাম্প সংগৃহীত")}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-white px-2 py-1 text-xs font-bold text-ruchi-700">
              <Flame className="h-3.5 w-3.5" /> {currentUser.streak} {t("streak")}
            </span>
            <span className="rounded-md bg-black/20 px-2 py-1 text-xs font-bold">
              {t("level")} {currentUser.levelNum}
            </span>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-10 gap-1.5" aria-label="progress">
          {Array.from({ length: goal }).map((_, i) => (
            <span key={i} className={cn("h-2.5 rounded-sm", i < collected.length ? "bg-white" : "bg-white/25")} />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold text-white/85">
          <span>{pick(currentUser.level, lang)}</span>
          <span>{currentUser.xp} / {currentUser.xpToNext} XP</span>
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle title={tr("Your stamps", "আপনার স্ট্যাম্প")} href="/passport" />
        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 pt-1 no-scrollbar">
          {collected.map((p) => (
            <Link key={p.id} href={`/places/${p.slug}`} className="w-28 shrink-0">
              <Stamp place={p} compact />
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle title={t("missions")} href="/passport" />
        <div className="divide-y divide-paper-100 overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card">
          {missions.map((m) => (
            <div key={m.id} className="flex items-center gap-3 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-leaf-50 text-leaf-700">
                <Target className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{pick(m.title, lang)}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-100">
                    <div className="h-full rounded-full bg-leaf-600" style={{ width: `${(m.progress / m.target) * 100}%` }} />
                  </div>
                  <span className="text-xs font-bold text-ink-500">{m.progress}/{m.target}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <SectionTitle title={t("nextStops")} href="/explore" />
        <div className="grid gap-4 sm:grid-cols-2">
          {next.slice(0, 4).map((p, i) => (
            <PlaceCard key={p.id} place={p} index={i} />
          ))}
        </div>
      </section>

      <Link href="/leaderboard" className="flex items-center gap-4 rounded-2xl bg-leaf-700 p-5 text-white shadow-card">
        <Trophy className="h-9 w-9 shrink-0" />
        <div className="flex-1">
          <p className="font-display text-lg font-bold">{tr("You are ranked #6", "আপনি #৬ স্থানে")}</p>
          <p className="text-sm text-white/80">{tr("One more stamp to enter the top 5.", "টপ ৫-এ ঢুকতে আরও ১টি স্ট্যাম্প দরকার।")}</p>
        </div>
        <ChevronRight className="h-5 w-5" />
      </Link>
    </div>
  );
}

export default function HomePage() {
  const { isAdmin } = useAuth();
  return isAdmin ? <AdminHome /> : <TouristHome />;
}
