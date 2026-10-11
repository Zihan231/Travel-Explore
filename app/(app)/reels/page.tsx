"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Music2, Play, BadgeCheck, MapPin, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { reels } from "@/lib/data";
import type { Reel } from "@/lib/types";
import { formatCount, cn } from "@/lib/utils";

export default function ReelsPage() {
  return (
    <div className="-mx-4 -mt-5 lg:-mx-8 lg:-mt-8">
      <div className="mx-auto h-[calc(100dvh-8.5rem)] max-w-[440px] snap-y snap-mandatory overflow-y-scroll no-scrollbar lg:h-[calc(100dvh-4rem)]">
        {reels.map((r) => (
          <ReelItem key={r.id} reel={r} />
        ))}
      </div>
    </div>
  );
}

function ReelItem({ reel }: { reel: Reel }) {
  const { lang, tr } = useI18n();
  const { isAdmin, requireAuth } = useAuth();
  const [liked, setLiked] = useState(false);
  const [burst, setBurst] = useState(false);

  const like = () => {
    if (!requireAuth({ en: "Log in to like reels", bn: "রিল লাইক করতে লগ ইন করুন" })) return;
    setLiked(true);
    setBurst(true);
    setTimeout(() => setBurst(false), 650);
  };

  return (
    <section className="relative flex h-full snap-start items-center justify-center overflow-hidden bg-ink">
      <Image src={reel.poster} alt={pick(reel.caption, lang)} fill sizes="440px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <button onDoubleClick={like} className="absolute inset-0 grid place-items-center" aria-label="Play">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-white/25 text-white backdrop-blur">
          <Play className="h-7 w-7 fill-white" />
        </span>
        <AnimatePresence>
          {burst && (
            <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.15, 1], opacity: [0, 1, 0] }} transition={{ duration: 0.65 }} className="absolute">
              <Heart className="h-24 w-24 fill-ruchi-600 text-ruchi-600" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <div className="absolute bottom-6 right-3 flex flex-col items-center gap-4 text-white">
        {[
          { icon: Heart, n: reel.likes + (liked ? 1 : 0), on: liked, click: () => requireAuth({ en: "Log in to like reels", bn: "রিল লাইক করতে লগ ইন করুন" }) && setLiked((v) => !v), label: "Like" },
          { icon: MessageCircle, n: reel.comments, label: "Comment", click: () => { requireAuth({ en: "Log in to comment", bn: "মন্তব্য করতে লগ ইন করুন" }); } },
          { icon: Share2, n: reel.shares, label: "Share", click: () => toast.success(tr("Link copied", "লিংক কপি হয়েছে")) },
        ].map((a) => (
          <button key={a.label} onClick={a.click} aria-label={a.label} className="flex flex-col items-center gap-1">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-black/35 backdrop-blur transition-transform active:scale-90">
              <a.icon className={cn("h-6 w-6", a.on && "fill-ruchi-500 text-ruchi-500")} />
            </span>
            <span className="text-xs font-bold">{formatCount(a.n)}</span>
          </button>
        ))}
        {isAdmin && (
          <button onClick={() => toast.error(tr("Reel removed (demo)", "রিল সরানো হয়েছে (ডেমো)"))} aria-label="Remove reel" className="grid h-11 w-11 place-items-center rounded-full bg-ruchi-600">
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 pr-20 text-white">
        <div className="flex items-center gap-2.5">
          <Image src={reel.author.avatar} alt={reel.author.name} width={38} height={38} className="h-[38px] w-[38px] rounded-full object-cover ring-2 ring-white" />
          <span className="flex items-center gap-1 font-bold">
            @{reel.author.username}
            {reel.author.verified && <BadgeCheck className="h-4 w-4 text-white" />}
          </span>
          {!isAdmin && <button onClick={() => requireAuth({ en: "Log in to follow creators", bn: "ফলো করতে লগ ইন করুন" })} className="rounded-md border border-white/70 px-2.5 py-1 text-xs font-bold">{tr("Follow", "ফলো")}</button>}
        </div>
        <span className="mt-3 inline-flex items-center gap-1 rounded-md bg-ruchi-600 px-2 py-1 text-xs font-bold">
          <MapPin className="h-3.5 w-3.5" /> {pick(reel.place, lang)}
        </span>
        <p className="mt-2 text-sm leading-relaxed">{pick(reel.caption, lang)}</p>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-white/80">
          <Music2 className="h-3.5 w-3.5" /> <span className="truncate">{reel.music}</span>
        </p>
      </div>
    </section>
  );
}
