"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaHeart, FaFire, FaHandsClapping, FaFaceSurprise, FaFaceSadTear, FaRegThumbsUp } from "react-icons/fa6";
import { MessageCircle, Share2 } from "lucide-react";
import type { IconType } from "react-icons";
import { toast } from "sonner";
import type { ReactionType } from "@/lib/types";
import { useI18n } from "@/lib/i18n";
import { formatCount, cn } from "@/lib/utils";

const REACTIONS: { type: ReactionType; Icon: IconType; en: string; bn: string; color: string }[] = [
  { type: "love", Icon: FaHeart, en: "Love", bn: "ভালোবাসা", color: "text-ruchi-600" },
  { type: "wow", Icon: FaFaceSurprise, en: "Wow", bn: "ওয়াও", color: "text-gold-500" },
  { type: "fire", Icon: FaFire, en: "Fire", bn: "আগুন", color: "text-orange-500" },
  { type: "clap", Icon: FaHandsClapping, en: "Clap", bn: "করতালি", color: "text-leaf-600" },
  { type: "sad", Icon: FaFaceSadTear, en: "Sad", bn: "দুঃখ", color: "text-sky-600" },
];

export function ReactionBar({
  reactions,
  myReaction,
  comments,
  shares,
}: {
  reactions: Record<ReactionType, number>;
  myReaction?: ReactionType | null;
  comments: number;
  shares: number;
}) {
  const { tr } = useI18n();
  const [picker, setPicker] = useState(false);
  const [current, setCurrent] = useState<ReactionType | null>(myReaction ?? null);

  const total =
    Object.values(reactions).reduce((a, b) => a + b, 0) + (current && !myReaction ? 1 : 0);
  const active = current ? REACTIONS.find((r) => r.type === current) : null;
  const top = REACTIONS.filter((r) => reactions[r.type] > 0).slice(0, 3);

  const choose = (type: ReactionType) => {
    setCurrent((p) => (p === type ? null : type));
    setPicker(false);
  };

  return (
    <div className="px-4 pb-2 pt-1">
      <div className="flex items-center justify-between py-2 text-xs font-medium text-ink-500">
        <div className="flex items-center gap-1.5">
          <span className="flex -space-x-1.5">
            {top.map((r) => (
              <span key={r.type} className="grid h-5 w-5 place-items-center rounded-full bg-white ring-1 ring-paper-200">
                <r.Icon className={cn("h-2.5 w-2.5", r.color)} />
              </span>
            ))}
          </span>
          <span>{formatCount(total)}</span>
        </div>
        <div className="flex gap-3">
          <span>{formatCount(comments)} {tr("comments", "মন্তব্য")}</span>
          <span>{formatCount(shares)} {tr("shares", "শেয়ার")}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-paper-100 pt-1">
        <div className="relative" onMouseEnter={() => setPicker(true)} onMouseLeave={() => setPicker(false)}>
          <AnimatePresence>
            {picker && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute bottom-full left-0 z-10 flex gap-0.5 rounded-xl border border-paper-200 bg-white p-1.5 shadow-lift"
              >
                {REACTIONS.map((r) => (
                  <motion.button
                    key={r.type}
                    whileHover={{ y: -4, scale: 1.15 }}
                    onClick={() => choose(r.type)}
                    aria-label={tr(r.en, r.bn)}
                    title={tr(r.en, r.bn)}
                    className="grid h-10 w-10 place-items-center rounded-lg hover:bg-paper-100"
                  >
                    <r.Icon className={cn("h-5 w-5", r.color)} />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <button
            onClick={() => (current ? choose(current) : setPicker((v) => !v))}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-colors hover:bg-paper-100",
              active ? active.color : "text-ink-700"
            )}
          >
            {active ? <active.Icon className="h-[17px] w-[17px]" /> : <FaRegThumbsUp className="h-[17px] w-[17px]" />}
            {active ? tr(active.en, active.bn) : tr("React", "রিয়্যাক্ট")}
          </button>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-paper-100">
          <MessageCircle className="h-[17px] w-[17px]" />
          {tr("Comment", "মন্তব্য")}
        </button>
        <button
          onClick={() => toast.success(tr("Link copied", "লিংক কপি হয়েছে"))}
          className="flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:bg-paper-100"
        >
          <Share2 className="h-[17px] w-[17px]" />
          {tr("Share", "শেয়ার")}
        </button>
      </div>
    </div>
  );
}
