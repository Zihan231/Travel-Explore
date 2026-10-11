"use client";

import Link from "next/link";
import Image from "next/image";
import { ImagePlus, Video } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { posts, currentUser, places } from "@/lib/data";
import { PostCard } from "@/components/post-card";

export default function FeedPage() {
  const { tr, t } = useI18n();
  const { isAdmin } = useAuth();

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold">{t("feed")}</h1>
        <p className="mt-1 text-ink-500">
          {isAdmin ? tr("Moderate posts from the community.", "কমিউনিটির পোস্ট মডারেট করুন।") : tr("Latest trips from the community.", "কমিউনিটির সাম্প্রতিক ভ্রমণ।")}
        </p>
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar">
        {places.slice(0, 7).map((p) => (
          <Link key={p.id} href={`/places/${p.slug}`} className="flex w-16 shrink-0 flex-col items-center gap-1.5">
            <span className="rounded-xl bg-ruchi-600 p-[2px]">
              <Image src={p.image} alt={p.name.en} width={56} height={56} className="h-14 w-14 rounded-[10px] object-cover ring-2 ring-white" />
            </span>
            <span className="w-full truncate text-center text-[11px] font-semibold text-ink-700">{p.name.en.split(" ")[0]}</span>
          </Link>
        ))}
      </div>

      {!isAdmin && (
        <Link href="/create" className="flex items-center gap-3 rounded-2xl border border-paper-200 bg-white p-3 shadow-card">
          <Image src={currentUser.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
          <span className="flex-1 rounded-lg bg-paper px-4 py-2.5 text-sm text-ink-500">{tr("Share your trip…", "আপনার ভ্রমণ শেয়ার করুন…")}</span>
          <ImagePlus className="h-5 w-5 text-leaf-600" />
          <Video className="h-5 w-5 text-ruchi-600" />
        </Link>
      )}

      <div className="space-y-4">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </div>
  );
}
