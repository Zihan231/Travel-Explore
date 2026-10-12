"use client";

import Link from "next/link";
import Image from "next/image";
import { Bell, Plus, ChevronRight, Trophy, TrendingUp, Clock, Flame, LogIn, UserPlus } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { currentUser, leaderboard, places, pendingSpots, missions } from "@/lib/data";
import { formatCount, cn } from "@/lib/utils";

function Card({ title, href, children }: { title: string; href?: string; children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <section className="rounded-2xl border border-paper-200 bg-white p-4 shadow-card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display text-base font-bold">{title}</h3>
        {href && (
          <Link href={href} className="flex items-center text-xs font-bold text-leaf-700">
            {t("seeAll")} <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export function RightRail({ hideTop = false }: { hideTop?: boolean }) {
  const { lang, tr } = useI18n();
  const { isAdmin, isGuest } = useAuth();
  const collected = places.filter((p) => p.collected).length;
  const trending = [...places].sort((a, b) => b.visitors - a.visitors).slice(0, 4);
  const mission = missions[1];

  return (
    <div
      className={cn(
        "sticky space-y-4 overflow-y-auto pb-4 no-scrollbar transition-[top,max-height] duration-300",
        hideTop
          ? "top-4 max-h-[calc(100dvh-2rem)]"
          : "top-[92px] max-h-[calc(100dvh-6.5rem)]"
      )}
    >
      {isGuest ? (
        <section className="dots overflow-hidden rounded-2xl bg-leaf-700 p-5 text-white shadow-lift">
          <h3 className="font-display text-xl font-extrabold leading-tight">{tr("Collect Bangladesh, one stamp at a time", "এক স্ট্যাম্পে বাংলাদেশ জয় করুন")}</h3>
          <p className="mt-1.5 text-sm text-white/85">{tr("Join free to check in, react, post and join the leaderboard.", "চেক-ইন, রিয়্যাক্ট, পোস্ট ও লিডারবোর্ডে যোগ দিতে বিনামূল্যে জয়েন করুন।")}</p>
          <Link href="/register" className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-white px-4 text-sm font-bold text-leaf-800 shadow hover:bg-paper">
            <UserPlus className="h-4 w-4" /> {tr("Create free account", "বিনামূল্যে অ্যাকাউন্ট খুলুন")}
          </Link>
        </section>
      ) : isAdmin ? (
        <Card title={tr("Review queue", "রিভিউ কিউ")} href="/spots">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-100 text-gold-600"><Clock className="h-5 w-5" /></span>
            <div>
              <p className="font-display text-2xl font-extrabold leading-none">{pendingSpots.length}</p>
              <p className="text-xs text-ink-500">{tr("hidden spots waiting for approval", "গোপন স্থান অনুমোদনের অপেক্ষায়")}</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card title={tr("Your progress", "আপনার অগ্রগতি")} href="/passport">
          <div className="flex items-end justify-between">
            <p className="font-display text-3xl font-extrabold leading-none">{collected}<span className="text-lg text-ink-400"> / 10</span></p>
            <span className="inline-flex items-center gap-1 rounded-md bg-gold-100 px-2 py-1 text-xs font-bold text-gold-700"><Flame className="h-3.5 w-3.5 text-ruchi-600" />{currentUser.streak} {tr("day streak", "দিনের ধারা")}</span>
          </div>
          <div className="mt-3 grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }).map((_, i) => <span key={i} className={`h-2 rounded-sm ${i < collected ? "bg-leaf-600" : "bg-paper-200"}`} />)}
          </div>
          <p className="mt-3 text-xs text-ink-500">{pick(mission.title, lang)}: {mission.progress}/{mission.target}</p>
        </Card>
      )}

      <Card title={tr("Top explorers", "সেরা এক্সপ্লোরার")} href="/leaderboard">
        <ul className="space-y-3">
          {leaderboard.slice(0, 4).map((u) => (
            <li key={u.username} className="flex items-center gap-3">
              <span className="w-4 text-center font-display text-sm font-extrabold text-ink-400">{u.rank}</span>
              <Image src={u.avatar} alt={u.name} width={34} height={34} className="h-[34px] w-[34px] rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{u.name}</p>
                <p className="text-xs text-ink-500">{u.stamps} {tr("stamps", "স্ট্যাম্প")}</p>
              </div>
              {u.rank === 1 && <Trophy className="h-4 w-4 text-gold-500" />}
            </li>
          ))}
        </ul>
      </Card>

      <Card title={tr("Trending places", "ট্রেন্ডিং স্থান")} href="/explore">
        <ul className="space-y-3">
          {trending.map((p) => (
            <li key={p.id}>
              <Link href={`/places/${p.slug}`} className="flex items-center gap-3">
                <Image src={p.image} alt="" width={44} height={44} className="h-11 w-11 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{pick(p.name, lang)}</p>
                  <p className="truncate text-xs text-ink-500">{pick(p.location, lang)}</p>
                </div>
                <span className="flex items-center gap-0.5 text-xs font-bold text-leaf-600"><TrendingUp className="h-3.5 w-3.5" />{formatCount(p.visitors)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Card>

      <p className="px-1 text-[11px] leading-relaxed text-ink-400">
        {tr("A Ruchi microsite by Square Food & Beverage Ltd.", "স্কয়ার ফুড অ্যান্ড বেভারেজ লিমিটেডের রুচি মাইক্রোসাইট")}
      </p>
    </div>
  );
}
