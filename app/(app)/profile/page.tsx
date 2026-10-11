"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Settings, Flame, Grid3x3, BookMarked, Clapperboard, Play, Share2, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useI18n, pick } from "@/lib/i18n";
import { currentUser, places, posts, reels } from "@/lib/data";
import { Stamp } from "@/components/stamp";
import { Button } from "@/components/ui/button";
import { cn, formatCount } from "@/lib/utils";

type Tab = "stamps" | "posts" | "reels";

export default function ProfilePage() {
  const { lang, tr, t } = useI18n();
  const [tab, setTab] = useState<Tab>("stamps");
  const collected = places.filter((p) => p.collected);
  const myPosts = posts.filter((p) => p.type === "post");
  const tabs: { id: Tab; icon: typeof Grid3x3; label: string }[] = [
    { id: "stamps", icon: BookMarked, label: t("stamps") },
    { id: "posts", icon: Grid3x3, label: tr("Posts", "পোস্ট") },
    { id: "reels", icon: Clapperboard, label: t("reels") },
  ];

  return (
    <div className="-mx-4 -mt-5 lg:-mx-8 lg:-mt-8">
      <div className="relative h-36 sm:h-44">
        <Image src="https://images.unsplash.com/photo-1587222318667-31212ce2828d?auto=format&fit=crop&w=1200&q=80" alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
        <Link href="/settings" aria-label={t("settings")} className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-lg bg-white text-ink shadow-card">
          <Settings className="h-5 w-5" />
        </Link>
      </div>

      <div className="px-4 lg:px-8">
        <div className="relative z-10 -mt-11 flex items-end justify-between">
          <Image src={currentUser.avatar} alt={currentUser.name} width={88} height={88} className="h-[88px] w-[88px] rounded-2xl object-cover ring-4 ring-paper" />
          <div className="mb-1 flex gap-2">
            <Button variant="outline" size="icon" aria-label="Share" onClick={() => toast.success(tr("Profile link copied", "প্রোফাইল লিংক কপি হয়েছে"))}><Share2 className="h-4 w-4" /></Button>
            <Button size="md"><Pencil className="h-4 w-4" />{tr("Edit", "এডিট")}</Button>
          </div>
        </div>

        <h1 className="mt-3 text-2xl font-extrabold">{currentUser.name}</h1>
        <p className="text-ink-500">@{currentUser.username}</p>
        <p className="mt-2 text-[15px] text-ink-700">{pick(currentUser.bio, lang)}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-ruchi-50 px-2.5 py-1 text-xs font-bold text-ruchi-700"><Flame className="h-3.5 w-3.5" />{currentUser.streak} {t("streak")}</span>
          <span className="rounded-md bg-leaf-50 px-2.5 py-1 text-xs font-bold text-leaf-700">{pick(currentUser.level, lang)}</span>
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-paper-200 rounded-2xl border border-paper-200 bg-white py-4 text-center shadow-card">
          {[[collected.length, t("stamps")], [formatCount(1240), tr("Followers", "ফলোয়ার")], [formatCount(312), tr("Following", "ফলোয়িং")]].map(([v, l]) => (
            <div key={String(l)}><p className="font-display text-2xl font-extrabold">{v}</p><p className="text-xs text-ink-500">{l}</p></div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-3 border-b border-paper-200">
          {tabs.map((tb) => (
            <button key={tb.id} onClick={() => setTab(tb.id)} className={cn("relative flex items-center justify-center gap-1.5 py-3 text-sm font-bold", tab === tb.id ? "text-ruchi-700" : "text-ink-500")}>
              <tb.icon className="h-4 w-4" /> {tb.label}
              {tab === tb.id && <motion.span layoutId="prof-tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-ruchi-600" />}
            </button>
          ))}
        </div>

        <div className="py-5">
          {tab === "stamps" && (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {collected.map((p) => <Link key={p.id} href={`/places/${p.slug}`}><Stamp place={p} /></Link>)}
            </div>
          )}
          {tab === "posts" && (
            <div className="grid grid-cols-3 gap-1">
              {myPosts.flatMap((post) => post.media.map((m, i) => (
                <div key={post.id + i} className="relative aspect-square overflow-hidden rounded-lg bg-paper-100"><Image src={m.url} alt="" fill sizes="150px" className="object-cover" /></div>
              )))}
            </div>
          )}
          {tab === "reels" && (
            <div className="grid grid-cols-3 gap-1">
              {reels.map((r) => (
                <div key={r.id} className="relative aspect-[9/16] overflow-hidden rounded-lg bg-paper-100">
                  <Image src={r.poster} alt="" fill sizes="150px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 text-[11px] font-bold text-white"><Play className="h-3 w-3 fill-white" />{formatCount(r.likes)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
