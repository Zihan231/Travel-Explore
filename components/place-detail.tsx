"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Heart, Share2, Clock, Wallet, Users, Target, Route, Lightbulb, Check, Camera, Pencil, BookMarked, Video } from "lucide-react";
import { toast } from "sonner";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import type { Place } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { RarityTag } from "@/components/rarity-tag";
import { formatCount, cn } from "@/lib/utils";

const budgetLabel = {
  budget: { en: "Budget", bn: "সাশ্রয়ী" },
  mid: { en: "Mid-range", bn: "মাঝারি" },
  premium: { en: "Premium", bn: "প্রিমিয়াম" },
};

export function PlaceDetail({ place }: { place: Place }) {
  const { lang, tr, t } = useI18n();
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [img, setImg] = useState(0);

  return (
    <div className="-mx-4 -mt-5 lg:-mx-8 lg:-mt-8">
      <div className="relative h-72 sm:h-[26rem]">
        <Image src={place.gallery[img]} alt={pick(place.name, lang)} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/30" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <button onClick={() => router.back()} aria-label={t("back")} className="grid h-10 w-10 place-items-center rounded-lg bg-white text-ink shadow-card">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {!isAdmin && (
              <button onClick={() => { setSaved((v) => !v); toast.success(saved ? tr("Removed from wishlist", "উইশলিস্ট থেকে সরানো হয়েছে") : tr("Saved to wishlist", "উইশলিস্টে সংরক্ষিত")); }} aria-label="Save" className="grid h-10 w-10 place-items-center rounded-lg bg-white text-ink shadow-card">
                <Heart className={cn("h-5 w-5", saved && "fill-ruchi-600 text-ruchi-600")} />
              </button>
            )}
            <button onClick={() => toast.success(tr("Link copied", "লিংক কপি হয়েছে"))} aria-label="Share" className="grid h-10 w-10 place-items-center rounded-lg bg-white text-ink shadow-card">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="mb-2 flex items-center gap-2">
            <RarityTag rarity={place.rarity} />
            {!isAdmin && place.collected && (
              <span className="inline-flex items-center gap-1 rounded-md bg-leaf-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide">
                <Check className="h-3 w-3" strokeWidth={3} /> {tr("Stamped", "স্ট্যাম্পড")}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-extrabold drop-shadow">{pick(place.name, lang)}</h1>
          <p className="mt-1 flex items-center gap-1.5 text-white/90">
            <MapPin className="h-4 w-4" /> {pick(place.location, lang)}
          </p>
        </div>
      </div>

      {place.gallery.length > 1 && (
        <div className="flex gap-2 bg-white px-4 py-3 lg:px-8">
          {place.gallery.map((g, i) => (
            <button key={i} onClick={() => setImg(i)} aria-label={`Photo ${i + 1}`} className={cn("relative h-14 w-14 overflow-hidden rounded-lg ring-2 transition", img === i ? "ring-ruchi-600" : "opacity-60 ring-transparent")}>
              <Image src={g} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      <div className="space-y-7 px-4 py-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Clock, label: t("bestTime"), value: pick(place.bestTime, lang) },
            { icon: Wallet, label: t("budget"), value: pick(budgetLabel[place.budget], lang) },
            { icon: Users, label: tr("Visitors", "ভ্রমণকারী"), value: formatCount(place.visitors) },
          ].map((f) => (
            <div key={f.label} className="rounded-xl border border-paper-200 bg-white p-3 text-center shadow-card">
              <f.icon className="mx-auto h-5 w-5 text-ruchi-600" />
              <p className="mt-1.5 text-[11px] font-medium text-ink-500">{f.label}</p>
              <p className="text-sm font-bold">{f.value}</p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="mb-2 text-xl font-extrabold">{t("whyVisit")}</h2>
          <p className="leading-relaxed text-ink-700">{pick(place.why, lang)}</p>
        </section>

        <section className="rounded-2xl border border-leaf-200 bg-leaf-50 p-5">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-leaf-800">
            <Target className="h-5 w-5" /> {t("mission")}
          </h2>
          <ul className="space-y-2.5">
            {place.mission.map((m, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm font-medium text-leaf-900">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded border-2 border-leaf-500 bg-white text-leaf-600">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {pick(m, lang)}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 text-xl font-extrabold">
            <Route className="h-5 w-5 text-ruchi-600" /> {t("howToReach")}
          </h2>
          <ol className="space-y-2.5">
            {place.howToReach.map((s, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl border border-paper-200 bg-white p-3.5 shadow-card">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ruchi-600 font-bold text-white">{i + 1}</span>
                <div>
                  <p className="font-bold">{pick(s.from, lang)} <span className="font-normal text-ink-500">→</span> {pick(s.mode, lang)}</p>
                  <p className="text-xs text-ink-500">{pick(s.cost, lang)} · {pick(s.duration, lang)}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {place.tips.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-extrabold">
              <Lightbulb className="h-5 w-5 text-gold-500" /> {t("localTips")}
            </h2>
            <ul className="space-y-2">
              {place.tips.map((tip, i) => (
                <li key={i} className="rounded-xl border-l-4 border-gold-400 bg-gold-100/60 p-3.5 text-sm text-ink-700">
                  {pick(tip, lang)}
                </li>
              ))}
            </ul>
          </section>
        )}

        {isAdmin && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-extrabold">
              <Camera className="h-5 w-5 text-ruchi-600" /> {tr("Recent tourist check-ins", "সাম্প্রতিক চেক-ইন")}
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {place.gallery.concat(place.gallery).slice(0, 6).map((g, i) => (
                <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-paper-100">
                  <Image src={g} alt="" fill sizes="160px" className="object-cover" />
                  <span className="absolute bottom-1 left-1 inline-flex items-center gap-1 rounded bg-white/90 px-1 py-0.5 text-[10px] font-bold">
                    <Video className="h-3 w-3 text-ruchi-600" /> 0:0{6 + (i % 3)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="safe-bottom sticky bottom-[68px] z-30 border-t border-paper-200 bg-white/95 px-4 py-3 backdrop-blur lg:bottom-0 lg:px-8">
        {isAdmin ? (
          <Button size="lg" variant="dark" className="w-full" onClick={() => toast.info(tr("Edit form opens here", "এডিট ফর্ম এখানে খুলবে"))}>
            <Pencil className="h-5 w-5" /> {tr("Edit destination", "গন্তব্য এডিট করুন")}
          </Button>
        ) : place.collected ? (
          <Link href="/passport">
            <Button size="lg" variant="outline" className="w-full">
              <BookMarked className="h-5 w-5" /> {tr("View in passport", "পাসপোর্টে দেখুন")}
            </Button>
          </Link>
        ) : (
          <Link href={`/checkin/${place.slug}`}>
            <Button size="lg" className="w-full">
              <MapPin className="h-5 w-5" /> {t("checkinCollect")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
