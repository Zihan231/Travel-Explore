"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";

export function SquareMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden>
      <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#2c8236" />
      <rect x="13" y="1" width="10" height="10" rx="1.5" fill="#2c8236" />
      <rect x="1" y="13" width="10" height="10" rx="1.5" fill="#2c8236" />
      <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#d1181f" />
    </svg>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  const { t } = useI18n();
  return (
    <Link href={href} className={cn("inline-flex items-center gap-2.5", className)} aria-label="Ruchi Tour Story">
      <span className="wordmark text-[34px] leading-none">রুচি</span>
      <span className="h-7 w-px bg-paper-300" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold text-ink">{t("appName")}</span>
        <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
          <SquareMark className="h-2.5 w-2.5" /> Square
        </span>
      </span>
    </Link>
  );
}
