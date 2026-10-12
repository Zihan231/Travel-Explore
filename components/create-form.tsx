"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ImagePlus, Video, MapPin, Sparkles, Route, X, Plus, Crosshair } from "lucide-react";
import { toast } from "sonner";
import { useI18n, pick } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { currentUser, places, categories } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Rarity } from "@/lib/types";

const input =
  "h-12 w-full rounded-xl border border-paper-300 bg-white px-4 text-[15px] outline-none transition-colors placeholder:text-ink-400 focus:border-ruchi-600 focus:ring-2 focus:ring-ruchi-600/15";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-bold text-ink-700">{children}</label>;
}

function MediaPicker({ media, setMedia }: { media: number[]; setMedia: (m: number[]) => void }) {
  const { tr } = useI18n();
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {media.map((m) => (
        <div key={m} className="relative aspect-square overflow-hidden rounded-xl bg-paper-100">
          <Image src={places[m % places.length].image} alt="" fill sizes="120px" className="object-cover" />
          <button onClick={() => setMedia(media.filter((x) => x !== m))} aria-label="Remove" className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-md bg-white text-ink shadow-card">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button onClick={() => setMedia([...media, media.length])} className="grid aspect-square place-content-center justify-items-center gap-1 rounded-xl border-2 border-dashed border-paper-300 text-ink-500 transition-colors hover:border-ruchi-600 hover:text-ruchi-600">
        <ImagePlus className="h-6 w-6" />
        <span className="text-xs font-semibold">{tr("Add", "যোগ")}</span>
      </button>
    </div>
  );
}

function DestinationForm() {
  const { tr } = useI18n();
  const router = useRouter();
  const [rarity, setRarity] = useState<Rarity>("common");
  const [media, setMedia] = useState<number[]>([]);
  const [missions, setMissions] = useState([""]);

  const publish = () => {
    toast.success(tr("Destination published. Tourists can now check in.", "গন্তব্য প্রকাশিত। পর্যটকরা এখন চেক-ইন করতে পারবেন।"));
    setTimeout(() => router.push("/explore"), 700);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-extrabold">{tr("Add destination", "গন্তব্য যোগ করুন")}</h1>
        <p className="mt-1 text-ink-500">{tr("Create a new check-in location and stamp.", "নতুন চেক-ইন লোকেশন ও স্ট্যাম্প তৈরি করুন।")}</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-paper-200 bg-white p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>{tr("Name (English)", "নাম (ইংরেজি)")}</Label><input className={input} placeholder="Sajek Valley" /></div>
          <div><Label>{tr("Name (Bangla)", "নাম (বাংলা)")}</Label><input className={input} placeholder="সাজেক ভ্যালি" /></div>
        </div>
        <div><Label>{tr("Area / division", "এলাকা / বিভাগ")}</Label><input className={input} placeholder="Rangamati, Chattogram" /></div>
        <div>
          <Label>{tr("Check-in coordinates", "চেক-ইন কোঅর্ডিনেট")}</Label>
          <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input className={input} placeholder="Latitude" defaultValue="23.3819" />
            <input className={input} placeholder="Longitude" defaultValue="92.2938" />
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl" onClick={() => toast.info(tr("Using current location (demo)", "বর্তমান লোকেশন ব্যবহার হচ্ছে (ডেমো)"))} aria-label="Use my location">
              <Crosshair className="h-5 w-5" />
            </Button>
          </div>
          <p className="mt-1.5 text-xs text-ink-500">{tr("Tourists must be within 1 km of this point to check in.", "চেক-ইনের জন্য পর্যটককে এই পয়েন্ট থেকে ১ কিমির মধ্যে থাকতে হবে।")}</p>
        </div>
        <div>
          <Label>{tr("Stamp rarity", "স্ট্যাম্পের দুর্লভতা")}</Label>
          <div className="grid grid-cols-3 gap-2">
            {(["common", "rare", "legendary"] as Rarity[]).map((r) => (
              <button key={r} onClick={() => setRarity(r)} className={cn("rounded-xl border py-2.5 text-sm font-bold capitalize transition-colors", rarity === r ? "border-leaf-600 bg-leaf-50 text-leaf-700" : "border-paper-300 bg-white text-ink-700")}>{r}</button>
            ))}
          </div>
        </div>
        <div>
          <Label>{tr("Category", "ক্যাটাগরি")}</Label>
          <select className={input} defaultValue="beach">
            {categories.filter((c) => c.id !== "all").map((c) => <option key={c.id} value={c.id}>{c.label.en}</option>)}
          </select>
        </div>
        <div>
          <Label>{tr("Missions", "মিশন")}</Label>
          <div className="space-y-2">
            {missions.map((m, i) => (
              <div key={i} className="flex gap-2">
                <input className={input} value={m} onChange={(e) => setMissions(missions.map((x, j) => (j === i ? e.target.value : x)))} placeholder={tr("e.g. Watch the sunrise", "যেমন: সূর্যোদয় দেখুন")} />
                {missions.length > 1 && <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setMissions(missions.filter((_, j) => j !== i))} aria-label="Remove"><X className="h-4 w-4" /></Button>}
              </div>
            ))}
          </div>
          <button onClick={() => setMissions([...missions, ""])} className="mt-2 flex items-center gap-1 text-sm font-bold text-leaf-700"><Plus className="h-4 w-4" />{tr("Add mission", "মিশন যোগ")}</button>
        </div>
        <div><Label>{tr("Cover photos", "কভার ছবি")}</Label><MediaPicker media={media} setMedia={setMedia} /></div>
      </div>
      <Button size="lg" className="w-full" onClick={publish}>{tr("Publish destination", "গন্তব্য প্রকাশ করুন")}</Button>
    </div>
  );
}

function TouristForm({ initial }: { initial: "post" | "spot" }) {
  const { lang, tr, t } = useI18n();
  const router = useRouter();
  const [mode, setMode] = useState<"post" | "spot">(initial);
  const [media, setMedia] = useState<number[]>([]);
  const [steps, setSteps] = useState([0]);

  const submit = () => {
    if (mode === "spot") toast.success(tr("Submitted. An admin will review it before it goes live.", "জমা হয়েছে। প্রকাশের আগে অ্যাডমিন যাচাই করবেন।"));
    else toast.success(tr("Posted to the feed", "ফিডে পোস্ট হয়েছে"));
    setTimeout(() => router.push(mode === "spot" ? "/spots" : "/feed"), 700);
  };

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-extrabold">{t("create")}</h1>

      <div className="grid grid-cols-2 rounded-xl border border-paper-200 bg-white p-1">
        {(["post", "spot"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={cn("flex items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-bold transition-colors", mode === m ? "bg-ink text-white" : "text-ink-500")}>
            {m === "post" ? <MapPin className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {m === "post" ? tr("Trip post", "ভ্রমণ পোস্ট") : tr("Hidden spot", "গোপন স্থান")}
          </button>
        ))}
      </div>

      {mode === "spot" && (
        <p className="rounded-xl border border-gold-400/50 bg-gold-100/60 p-3.5 text-sm text-ink-700">
          {tr("Hidden spots are reviewed by an admin. You will get a notification once it is approved or rejected.", "গোপন স্থান অ্যাডমিন যাচাই করেন। অনুমোদন বা বাতিল হলে আপনি নোটিফিকেশন পাবেন।")}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Image src={currentUser.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" />
        <div>
          <p className="font-bold">{currentUser.name}</p>
          <p className="text-xs text-ink-500">{pick(currentUser.level, lang)}</p>
        </div>
      </div>

      {mode === "post" ? (
        <select className={input} defaultValue="">
          <option value="">{tr("Select a place", "স্থান নির্বাচন করুন")}</option>
          {places.map((p) => <option key={p.id} value={p.id}>{pick(p.name, lang)}</option>)}
        </select>
      ) : (
        <input className={input} placeholder={tr("Spot name (e.g. Debotakhum)", "স্থানের নাম (যেমন: দেবতাখুম)")} />
      )}

      <textarea rows={4} placeholder={mode === "spot" ? tr("What makes this place special?", "জায়গাটি কেন বিশেষ?") : t("writePost")} className="w-full resize-none rounded-xl border border-paper-300 bg-white p-4 text-[15px] leading-relaxed outline-none transition-colors placeholder:text-ink-400 focus:border-leaf-600 focus:ring-2 focus:ring-leaf-600/15" />

      <div>
        <Label>{t("addPhotos")}</Label>
        <MediaPicker media={media} setMedia={setMedia} />
        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500"><Video className="h-3.5 w-3.5" />{tr("Photos and videos are supported.", "ছবি ও ভিডিও সমর্থিত।")}</p>
      </div>

      {mode === "spot" && (
        <div>
          <Label>{t("howToReach")}</Label>
          <div className="space-y-2">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-leaf-600 text-sm font-bold text-white">{i + 1}</span>
                <input className={cn(input, "h-11 w-28 shrink-0 px-3 text-sm")} placeholder={tr("From", "কোথা থেকে")} />
                <input className={cn(input, "h-11 px-3 text-sm")} placeholder={tr("How (bus, boat…)", "যেভাবে (বাস, নৌকা…)")} />
                {steps.length > 1 && <button onClick={() => setSteps(steps.filter((x) => x !== s))} aria-label="Remove step" className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-500 hover:bg-ruchi-50 hover:text-ruchi-600"><X className="h-4 w-4" /></button>}
              </div>
            ))}
          </div>
          <button onClick={() => setSteps([...steps, Math.max(...steps) + 1])} className="mt-2 flex items-center gap-1 text-sm font-bold text-leaf-700"><Route className="h-4 w-4" />{tr("Add step", "ধাপ যোগ")}</button>
        </div>
      )}

      <Button size="lg" className="w-full" onClick={submit}>{mode === "spot" ? t("submitSpot") : t("post")}</Button>
    </div>
  );
}

export function CreateForm({ initial }: { initial: "post" | "spot" }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <DestinationForm /> : <TouristForm initial={initial} />;
}
