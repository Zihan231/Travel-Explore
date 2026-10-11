"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Clock, Users, MapPinned, Camera, TrendingUp, CircleCheckBig, Video, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useI18n, pick } from "@/lib/i18n";
import { pendingSpots, places } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn, timeAgo } from "@/lib/utils";

export function AdminStats() {
  const { tr } = useI18n();
  const stats: { icon: LucideIcon; value: string; label: string; delta?: string }[] = [
    { icon: Users, value: "12.4K", label: tr("Tourists", "পর্যটক"), delta: "+8%" },
    { icon: Camera, value: "48.2K", label: tr("Check-ins", "চেক-ইন"), delta: "+18%" },
    { icon: MapPinned, value: String(places.length), label: tr("Destinations", "গন্তব্য") },
    { icon: Clock, value: String(pendingSpots.length), label: tr("Awaiting review", "যাচাইয়ের অপেক্ষায়") },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-paper-200 bg-white p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-ruchi-50 text-ruchi-600">
              <s.icon className="h-[18px] w-[18px]" />
            </span>
            {s.delta && (
              <span className="flex items-center gap-0.5 text-xs font-bold text-leaf-600">
                <TrendingUp className="h-3.5 w-3.5" />
                {s.delta}
              </span>
            )}
          </div>
          <p className="mt-3 font-display text-3xl font-extrabold">{s.value}</p>
          <p className="text-xs font-medium text-ink-500">{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export function SpotReviewList({ limit }: { limit?: number }) {
  const { lang, tr } = useI18n();
  const [items, setItems] = useState(pendingSpots);
  const [done, setDone] = useState<Record<string, "approved" | "rejected">>({});

  const act = (id: string, verdict: "approved" | "rejected") => {
    setDone((d) => ({ ...d, [id]: verdict }));
    if (verdict === "approved") toast.success(tr("Spot approved and published", "স্পট অনুমোদিত ও প্রকাশিত"));
    else toast.error(tr("Spot rejected", "স্পট বাতিল হয়েছে"));
    setTimeout(() => setItems((arr) => arr.filter((x) => x.id !== id)), 700);
  };

  const shown = limit ? items.slice(0, limit) : items;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-paper-300 bg-white py-14 text-center">
        <CircleCheckBig className="mx-auto h-10 w-10 text-leaf-600" />
        <p className="mt-3 font-bold">{tr("All caught up", "সব যাচাই সম্পন্ন")}</p>
        <p className="text-sm text-ink-500">{tr("No spots are waiting for review.", "কোনো স্পট যাচাইয়ের অপেক্ষায় নেই।")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {shown.map((spot) => (
          <motion.div
            key={spot.id}
            layout
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.25 } }}
            className="overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card"
          >
            <div className="flex items-center gap-3 p-4">
              <Image src={spot.author.avatar} alt={spot.author.name} width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">{spot.author.name}</p>
                <p className="flex items-center gap-1 text-xs text-ink-500">
                  <Clock className="h-3 w-3" /> {timeAgo(spot.createdAt, lang)}
                </p>
              </div>
              <span className="rounded-md bg-gold-100 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-gold-600">
                {tr("Pending", "অপেক্ষমাণ")}
              </span>
            </div>
            {spot.place && <p className="px-4 font-display text-lg font-bold">{pick(spot.place, lang)}</p>}
            <p className="px-4 pb-3 pt-1 text-sm leading-relaxed text-ink-700">{pick(spot.text, lang)}</p>
            {spot.media[0] && (
              <div className="relative mx-4 mb-4 aspect-video overflow-hidden rounded-xl">
                <Image src={spot.media[0].url} alt="" fill sizes="600px" className="object-cover" />
              </div>
            )}
            {done[spot.id] ? (
              <div className={cn("flex items-center justify-center gap-2 border-t border-paper-100 py-3.5 text-sm font-bold", done[spot.id] === "approved" ? "text-leaf-700" : "text-ruchi-700")}>
                {done[spot.id] === "approved" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                {done[spot.id] === "approved" ? tr("Approved", "অনুমোদিত") : tr("Rejected", "বাতিল")}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 border-t border-paper-100 p-3">
                <Button variant="danger" onClick={() => act(spot.id, "rejected")}>
                  <X className="h-4 w-4" /> {tr("Reject", "বাতিল")}
                </Button>
                <Button variant="green" onClick={() => act(spot.id, "approved")}>
                  <Check className="h-4 w-4" /> {tr("Approve", "অনুমোদন")}
                </Button>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function CheckinsReview() {
  const { lang, tr } = useI18n();
  const users = ["rafiq", "nusrat", "tanvir", "mim", "sakib", "sadia"];
  const items = places
    .filter((p) => p.collected)
    .flatMap((p) => p.gallery.slice(0, 2).map((g, i) => ({ id: p.id + i, place: p.name, img: g, user: users[(+p.id.slice(1) + i) % users.length] })));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold">{tr("Check-ins", "চেক-ইন")}</h1>
        <p className="mt-1 text-ink-500">{tr("Live selfie videos submitted by tourists at each location.", "প্রতিটি লোকেশনে পর্যটকদের জমা দেওয়া লাইভ সেলফি ভিডিও।")}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-paper-100">
            <Image src={c.img} alt="" fill sizes="220px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-bold text-ink">
              <Video className="h-3 w-3 text-ruchi-600" /> 0:08
            </span>
            <div className="absolute inset-x-0 bottom-0 p-2.5 text-white">
              <p className="truncate text-sm font-bold">{pick(c.place, lang)}</p>
              <p className="truncate text-xs text-white/80">@{c.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
