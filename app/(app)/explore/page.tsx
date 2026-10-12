"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Shuffle, SearchX, Plus } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { places, categories } from "@/lib/data";
import { PlaceCard } from "@/components/place-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ExplorePage() {
  const { lang, tr, t } = useI18n();
  const { isAdmin } = useAuth();
  const router = useRouter();
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = places.filter((p) => {
    const q = query.toLowerCase().trim();
    const matchQ = !q || p.name.en.toLowerCase().includes(q) || p.name.bn.includes(query) || p.location.en.toLowerCase().includes(q);
    return (cat === "all" || p.category === cat) && matchQ;
  });

  const surprise = () => {
    const pool = places.filter((p) => !p.collected);
    const choice = pool[Math.floor(Math.random() * pool.length)] ?? places[0];
    router.push(`/places/${choice.slug}`);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-extrabold">{isAdmin ? tr("Destinations", "গন্তব্য") : t("explore")}</h1>
          <p className="mt-1 text-ink-500">
            {isAdmin ? tr("Manage check-in locations tourists can visit.", "পর্যটকদের চেক-ইন করার লোকেশন পরিচালনা করুন।") : tr("Find your next stamp.", "আপনার পরবর্তী স্ট্যাম্প খুঁজুন।")}
          </p>
        </div>
        {isAdmin && (
          <Link href="/create" className="hidden sm:block lg:hidden">
            <Button size="sm"><Plus className="h-4 w-4" />{tr("Add", "যোগ")}</Button>
          </Link>
        )}
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="h-12 w-full rounded-xl border border-paper-300 bg-white pl-11 pr-4 text-[15px] outline-none transition-colors placeholder:text-ink-400 focus:border-leaf-600 focus:ring-2 focus:ring-leaf-600/15"
          />
        </div>
        {!isAdmin && (
          <Button variant="dark" size="icon" className="h-12 w-12 shrink-0 rounded-xl" onClick={surprise} aria-label={tr("Surprise me", "চমকে দাও")} title={tr("Surprise me", "চমকে দাও")}>
            <Shuffle className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors",
              cat === c.id ? "border-leaf-600 bg-leaf-600 text-white" : "border-paper-300 bg-white text-ink-700 hover:border-ink"
            )}
          >
            {pick(c.label, lang)}
          </button>
        ))}
      </div>

      <p className="text-sm font-semibold text-ink-500">
        {filtered.length} {tr("destinations", "টি গন্তব্য")}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((p, i) => (
          <PlaceCard key={p.id} place={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-paper-300 bg-white py-14 text-center text-ink-500">
          <SearchX className="mx-auto mb-3 h-9 w-9" />
          {tr("Nothing matches your search.", "আপনার সার্চের সাথে কিছু মেলেনি।")}
        </div>
      )}
    </div>
  );
}
