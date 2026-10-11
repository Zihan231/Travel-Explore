"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Check, CalendarDays, Users, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Place } from "@/lib/types";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { formatCount } from "@/lib/utils";
import { RarityTag } from "./rarity-tag";

export function PlaceCard({ place, index = 0 }: { place: Place; index?: number }) {
  const { lang, tr } = useI18n();
  const { isAdmin } = useAuth();

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="group overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card transition-shadow hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Link href={`/places/${place.slug}`} aria-label={pick(place.name, lang)}>
          <Image
            src={place.image}
            alt={pick(place.name, lang)}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3">
          <RarityTag rarity={place.rarity} />
        </div>
        {isAdmin ? (
          <div className="absolute right-3 top-3 flex gap-1.5">
            <button
              onClick={() => toast.info(tr("Edit form opens here", "এডিট ফর্ম এখানে খুলবে"))}
              aria-label="Edit"
              className="grid h-8 w-8 place-items-center rounded-lg bg-white text-ink shadow-card hover:bg-paper-100"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => toast.error(tr("Destination archived (demo)", "গন্তব্য আর্কাইভ হয়েছে (ডেমো)"))}
              aria-label="Delete"
              className="grid h-8 w-8 place-items-center rounded-lg bg-white text-ruchi-600 shadow-card hover:bg-ruchi-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ) : (
          place.collected && (
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-leaf-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
              {tr("Stamped", "স্ট্যাম্পড")}
            </span>
          )
        )}
      </div>

      <Link href={`/places/${place.slug}`} className="block p-4">
        <h3 className="font-display text-xl font-bold">{pick(place.name, lang)}</h3>
        <p className="mt-0.5 flex items-center gap-1 text-sm text-ink-500">
          <MapPin className="h-3.5 w-3.5" />
          {pick(place.location, lang)}
        </p>
        <div className="mt-3 flex items-center gap-4 border-t border-paper-100 pt-3 text-xs font-semibold text-ink-700">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-leaf-600" />
            {pick(place.bestTime, lang)}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-ruchi-600" />
            {formatCount(place.visitors)} {tr("explorers", "ভ্রমণকারী")}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
