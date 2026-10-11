"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Plus, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { posts, pendingSpots } from "@/lib/data";
import { PostCard } from "@/components/post-card";
import { SpotReviewList } from "@/components/admin-parts";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SpotsPage() {
  const { tr } = useI18n();
  const { isAdmin, isGuest } = useAuth();
  const [tab, setTab] = useState<"pending" | "published">("pending");
  const approved = posts.filter((p) => p.type === "spot" && p.status === "approved");

  if (isAdmin) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-3xl font-extrabold">{tr("Spot reviews", "স্পট রিভিউ")}</h1>
          <p className="mt-1 text-ink-500">{tr("Approve or reject hidden spots submitted by tourists.", "পর্যটকদের জমা দেওয়া গোপন স্থান অনুমোদন বা বাতিল করুন।")}</p>
        </div>
        <div className="grid grid-cols-2 rounded-xl border border-paper-200 bg-white p-1">
          {(["pending", "published"] as const).map((k) => (
            <button key={k} onClick={() => setTab(k)} className={cn("rounded-lg py-2.5 text-sm font-bold transition-colors", tab === k ? "bg-ink text-white" : "text-ink-500")}>
              {k === "pending" ? `${tr("Pending", "অপেক্ষমাণ")} (${pendingSpots.length})` : `${tr("Published", "প্রকাশিত")} (${approved.length})`}
            </button>
          ))}
        </div>
        {tab === "pending" ? (
          <SpotReviewList />
        ) : (
          <div className="space-y-4">
            {approved.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-extrabold">
          <Sparkles className="h-7 w-7 text-ruchi-600" />
          {tr("Hidden spots", "গোপন স্থান")}
        </h1>
        <p className="mt-1 text-ink-500">{tr("Places locals know, reviewed by our team.", "স্থানীয়দের জানা জায়গা, আমাদের টিমের যাচাইকৃত।")}</p>
      </div>

      <Link href={isGuest ? "/login" : "/create?type=spot"} className="flex items-center gap-4 rounded-2xl bg-leaf-700 p-4 text-white shadow-card">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-white/15"><Plus className="h-6 w-6" /></span>
        <div className="flex-1">
          <p className="font-display text-lg font-bold">{tr("Know a hidden spot?", "কোনো গোপন স্থান জানেন?")}</p>
          <p className="text-sm text-white/80">{tr("Submit it with photos, video and the route.", "ছবি, ভিডিও ও রুটসহ জমা দিন।")}</p>
        </div>
        <Button variant="outline" size="sm" className="border-0 text-ink">{isGuest ? tr("Log in", "লগ ইন") : tr("Submit", "জমা দিন")}</Button>
      </Link>

      {!isGuest && <div className="flex items-center gap-3 rounded-xl border border-gold-400/50 bg-gold-100/60 p-3.5 text-sm">
        <Clock className="h-5 w-5 shrink-0 text-gold-600" />
        <p className="text-ink-700">{tr("Your submission “Amiakhum Waterfall” is awaiting admin approval.", "আপনার জমা “আমিয়াখুম জলপ্রপাত” অ্যাডমিন অনুমোদনের অপেক্ষায়।")}</p>
      </div>}

      <div className="space-y-4">
        {approved.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
      </div>
    </div>
  );
}
