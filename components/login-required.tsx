"use client";

import Link from "next/link";
import { Lock, LogIn, UserPlus } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function LoginRequired() {
  const { tr } = useI18n();
  return (
    <div className="mx-auto flex max-w-sm flex-col items-center rounded-2xl border border-paper-200 bg-white px-6 py-12 text-center shadow-card">
      <span className="grid h-14 w-14 place-items-center rounded-xl bg-ruchi-50 text-ruchi-600">
        <Lock className="h-7 w-7" />
      </span>
      <h1 className="mt-5 text-2xl font-extrabold">{tr("Log in to continue", "চালিয়ে যেতে লগ ইন করুন")}</h1>
      <p className="mt-2 text-sm text-ink-500">
        {tr("This part of Ruchi Explore Limitless is only for members. Browsing places, posts, reels and hidden spots stays open to everyone.", "রুচি এক্সপ্লোর লিমিটলেসের এই অংশ শুধু সদস্যদের জন্য। স্থান, পোস্ট, রিলস ও গোপন স্থান সবার জন্য উন্মুক্ত।")}
      </p>
      <div className="mt-6 grid w-full gap-2.5">
        <Link href="/login" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ruchi-600 font-semibold text-white shadow-card hover:bg-ruchi-700">
          <LogIn className="h-4 w-4" /> {tr("Log in", "লগ ইন")}
        </Link>
        <Link href="/register" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-paper-300 font-semibold hover:bg-paper">
          <UserPlus className="h-4 w-4" /> {tr("Create free account", "বিনামূল্যে অ্যাকাউন্ট খুলুন")}
        </Link>
      </div>
    </div>
  );
}
