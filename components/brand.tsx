"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function SquareMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden>
      <rect x="1" y="1" width="10" height="10" rx="1.5" fill="#006535" />
      <rect x="13" y="1" width="10" height="10" rx="1.5" fill="#006535" />
      <rect x="1" y="13" width="10" height="10" rx="1.5" fill="#006535" />
      <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#e91f27" />
    </svg>
  );
}

export function Logo({ href = "/", className }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={cn("inline-flex shrink-0 items-center", className)} aria-label="Ruchi Explore Limitless">
      <Image src="/images/logo.png" alt="Ruchi Explore Limitless" width={200} height={164} priority className="h-12 w-auto" />
    </Link>
  );
}
