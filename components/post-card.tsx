"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, BadgeCheck, Sparkles, Route, Play, Trash2, Flag } from "lucide-react";
import { toast } from "sonner";
import type { Post } from "@/lib/types";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { timeAgo } from "@/lib/utils";
import { ReactionBar } from "./reaction-bar";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const { lang, tr } = useI18n();
  const { isAdmin, requireAuth } = useAuth();
  const isSpot = post.type === "spot";

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card"
    >
      <div className="flex items-center gap-3 px-4 pt-4">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={42}
          height={42}
          className="h-[42px] w-[42px] rounded-full object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate font-bold">{post.author.name}</span>
            {post.author.verified && <BadgeCheck className="h-4 w-4 shrink-0 text-leaf-600" />}
          </div>
          <p className="text-xs text-ink-500">
            {pick(post.author.level, lang)} · {timeAgo(post.createdAt, lang)}
          </p>
        </div>
        {isAdmin ? (
          <button
            onClick={() => toast.error(tr("Post removed (demo)", "পোস্ট সরানো হয়েছে (ডেমো)"))}
            aria-label="Remove post"
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-ruchi-50 hover:text-ruchi-600"
          >
            <Trash2 className="h-[18px] w-[18px]" />
          </button>
        ) : (
          <button
            onClick={() => requireAuth({ en: "Log in to report a post", bn: "পোস্ট রিপোর্ট করতে লগ ইন করুন" }) && toast.success(tr("Reported. Thank you.", "রিপোর্ট করা হয়েছে। ধন্যবাদ।"))}
            aria-label="Report"
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-400 hover:bg-paper-100"
          >
            <Flag className="h-4 w-4" />
          </button>
        )}
      </div>

      {post.place && (
        <div className="px-4 pt-3">
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-bold ${
              isSpot ? "bg-gold-100 text-gold-700" : "bg-leaf-50 text-leaf-700"
            }`}
          >
            {isSpot ? <Sparkles className="h-3.5 w-3.5" /> : <MapPin className="h-3.5 w-3.5" />}
            {pick(post.place, lang)}
          </span>
        </div>
      )}

      <p className="whitespace-pre-line px-4 py-3 text-[15px] leading-relaxed text-ink-700">
        {pick(post.text, lang)}
      </p>

      {post.media.length > 0 && (
        <div className={`grid gap-0.5 ${post.media.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {post.media.map((m, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden bg-paper-100">
              <Image src={m.url} alt="" fill sizes="(max-width: 768px) 100vw, 600px" className="object-cover" />
              {m.type === "video" && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-leaf-700 shadow-lift">
                    <Play className="h-5 w-5 fill-current" />
                  </span>
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {post.route && (
        <div className="mx-4 mt-3 rounded-xl border border-paper-200 bg-paper p-3.5">
          <p className="mb-2.5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf-700">
            <Route className="h-3.5 w-3.5" />
            {tr("How to reach", "কীভাবে যাবেন")}
          </p>
          <ol className="space-y-2.5">
            {post.route.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded bg-leaf-600 text-[11px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <b>{pick(step.from, lang)}</b> · {pick(step.mode, lang)}
                  <span className="block text-xs text-ink-500">
                    {pick(step.cost, lang)} · {pick(step.duration, lang)}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <ReactionBar
        reactions={post.reactions}
        myReaction={post.myReaction}
        comments={post.comments}
        shares={post.shares}
      />
    </motion.article>
  );
}
