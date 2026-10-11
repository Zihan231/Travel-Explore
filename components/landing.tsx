"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import {
  ArrowRight,
  Navigation,
  Camera,
  Stamp as StampIcon,
  ShieldCheck,
  Sparkles,
  Trophy,
  Clapperboard,
  MapPin,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Play,
  Heart,
  CircleCheck,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { useI18n, pick } from "@/lib/i18n";
import { places, leaderboard, reels } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Logo, SquareMark } from "@/components/brand";
import { LangToggle } from "@/components/lang-toggle";
import { Stamp } from "@/components/stamp";

function RarityDot({ r }: { r: string }) {
  return <span className={`h-2 w-2 rounded-full ${r === "legendary" ? "bg-gold-400" : r === "rare" ? "bg-leaf-400" : "bg-white"}`} />;
}

function Phone({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto h-[372px] w-[196px] origin-top scale-[0.9] rounded-[32px] border-[5px] border-ink bg-ink shadow-lift ${className ?? ""}`}>
      <div className="absolute left-1/2 top-2 z-30 h-[14px] w-16 -translate-x-1/2 rounded-full bg-ink" />
      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-white">{children}</div>
    </div>
  );
}

function StatusBar({ light }: { light?: boolean }) {
  return (
    <div className={`absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-2 text-[9px] font-bold ${light ? "text-white" : "text-ink"}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-current" /><span className="h-1.5 w-1.5 rounded-full bg-current" /></span>
    </div>
  );
}

function MapScene() {
  const { tr } = useI18n();
  return (
    <Phone>
      <StatusBar />
      <svg viewBox="0 0 186 362" className="absolute inset-0 h-full w-full" aria-hidden>
        <rect width="186" height="362" fill="#eef2e6" />
        <path d="M-10 250 C 40 220, 70 270, 120 240 S 190 230, 200 210 L 200 290 C 150 300, 110 280, 70 310 S -10 300, -10 300 Z" fill="#cfe6f3" />
        <rect x="14" y="60" width="52" height="38" rx="5" fill="#d3e8cc" />
        <rect x="126" y="96" width="46" height="52" rx="5" fill="#d3e8cc" />
        <rect x="18" y="150" width="34" height="30" rx="5" fill="#e4e0d3" />
        <rect x="130" y="170" width="36" height="26" rx="5" fill="#e4e0d3" />
        <g stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none">
          <path d="M-5 120 L 200 135" /><path d="M78 30 L 96 330" /><path d="M-5 200 C 50 190, 100 210, 200 190" />
        </g>
        <g stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none"><path d="M30 20 L 60 110" /><path d="M150 40 L 140 230" /></g>
        <path d="M30 330 C 60 300, 70 250, 92 196" stroke="#d1181f" strokeWidth="3" strokeDasharray="1 7" strokeLinecap="round" fill="none" />
      </svg>

      <div className="absolute left-1/2 top-[172px] -translate-x-1/2 -translate-y-1/2">
        <motion.span animate={{ scale: [1, 1.9], opacity: [0.35, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-ruchi-600" />
        <span className="absolute inset-0 m-auto h-24 w-24 rounded-full border-2 border-dashed border-ruchi-600 bg-ruchi-600/10" />
        <span className="relative grid h-24 w-24 place-items-center">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ruchi-600 text-white shadow-lift ring-4 ring-white"><MapPin className="h-5 w-5" /></span>
        </span>
      </div>

      <div className="absolute inset-x-3 bottom-4 rounded-2xl bg-white p-3 shadow-lift">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-leaf-600 text-white"><CircleCheck className="h-4 w-4" /></span>
          <div className="min-w-0 text-left">
            <p className="text-[11px] font-extrabold leading-tight">{tr("You are here", "আপনি এখানে")}</p>
            <p className="truncate text-[9px] text-ink-500">{tr("18 m from Cox's Bazar", "কক্সবাজার থেকে ১৮ মি")}</p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-ruchi-600 px-3 py-1.5 text-[10px] font-bold text-white"><span>{tr("Continue", "এগিয়ে যান")}</span><ArrowRight className="h-3 w-3" /></div>
      </div>
    </Phone>
  );
}

function SelfieScene() {
  const { tr } = useI18n();
  return (
    <Phone>
      <Image src="https://i.pravatar.cc/400?img=12" alt="" fill sizes="200px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      <StatusBar light />
      <span className="absolute left-3 top-8 z-20 inline-flex items-center gap-1 rounded bg-ruchi-600 px-1.5 py-0.5 text-[9px] font-extrabold text-white">
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-white" />REC
      </span>
      <span className="absolute right-3 top-8 z-20 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-bold text-white backdrop-blur">0:08</span>

      <div className="absolute inset-x-5 top-[88px] bottom-[110px]">
        {["left-0 top-0 border-l-2 border-t-2 rounded-tl-lg", "right-0 top-0 border-r-2 border-t-2 rounded-tr-lg", "left-0 bottom-0 border-l-2 border-b-2 rounded-bl-lg", "right-0 bottom-0 border-r-2 border-b-2 rounded-br-lg"].map((c) => (
          <span key={c} className={`absolute h-5 w-5 border-white ${c}`} />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-3 z-20 flex flex-col items-center text-white">
        <p className="mb-2 text-[10px] font-semibold drop-shadow">{tr("Show us the view!", "চারপাশের দৃশ্য দেখান!")}</p>
        <span className="relative grid h-14 w-14 place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56"><circle cx="28" cy="28" r="25" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="3" /><motion.circle cx="28" cy="28" r="25" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeDasharray="157" animate={{ strokeDashoffset: [157, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} /></svg>
          <span className="h-9 w-9 rounded-md bg-ruchi-600" />
        </span>
      </div>
    </Phone>
  );
}

function StampScene() {
  const { tr } = useI18n();
  const dots = ["#d1181f", "#2c8236", "#c99a2e", "#d1181f", "#2c8236", "#c99a2e", "#d1181f", "#2c8236"];
  return (
    <Phone>
      <StatusBar />
      <div className="dots-dark absolute inset-0 bg-paper" />
      {dots.map((c, i) => (
        <motion.span
          key={i}
          className="absolute top-0 h-2 w-2 rounded-sm"
          style={{ left: `${10 + i * 11}%`, backgroundColor: c }}
          animate={{ y: [-10, 360], rotate: [0, 360], opacity: [1, 1, 0] }}
          transition={{ duration: 3 + (i % 3) * 0.6, repeat: Infinity, delay: i * 0.35, ease: "easeIn" }}
        />
      ))}
      <div className="relative z-10 flex h-full flex-col items-center px-4 pt-12 text-center">
        <p className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-leaf-700"><CircleCheck className="h-3.5 w-3.5" />{tr("Stamp collected", "স্ট্যাম্প সংগৃহীত")}</p>
        <motion.div initial={{ rotate: 8, scale: 1.2 }} whileInView={{ rotate: -4, scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 160, damping: 12 }} className="mt-3 w-32">
          <Stamp place={places[0]} collected day="12 MAR" year="2026" />
        </motion.div>
        <p className="mt-3 font-display text-base font-extrabold leading-none">{pick(places[0].name, "en")}</p>
        <span className="mt-1.5 rounded-full bg-ruchi-600 px-2.5 py-0.5 text-[10px] font-bold text-white">+250 XP</span>
      </div>
    </Phone>
  );
}

function HowItWorks() {
  const { tr } = useI18n();
  const steps = [
    { n: 1, icon: Navigation, tint: "bg-leaf-100", title: tr("Reach the spot", "স্থানে পৌঁছান"), desc: tr("Turn on location. We confirm you are really there.", "লোকেশন চালু করুন। আপনি সত্যিই সেখানে আছেন কিনা আমরা যাচাই করব।"), scene: <MapScene /> },
    { n: 2, icon: Camera, tint: "bg-ruchi-100", title: tr("Record a selfie", "সেলফি রেকর্ড করুন"), desc: tr("A short live video from the front camera. No gallery uploads.", "ফ্রন্ট ক্যামেরায় ছোট লাইভ ভিডিও। গ্যালারি থেকে আপলোড নয়।"), scene: <SelfieScene /> },
    { n: 3, icon: StampIcon, tint: "bg-gold-100", title: tr("Collect your stamp", "স্ট্যাম্প সংগ্রহ করুন"), desc: tr("A postmarked stamp lands in your digital passport.", "পোস্টমার্কসহ স্ট্যাম্প আপনার ডিজিটাল পাসপোর্টে যোগ হবে।"), scene: <StampScene /> },
  ];

  return (
    <section className="border-y border-paper-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ruchi-600">{tr("Check-in", "চেক-ইন")}</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{tr("Three steps to a stamp", "তিন ধাপে একটি স্ট্যাম্প")}</h2>
          <p className="mt-2 text-ink-500">{tr("Every stamp is earned on location. No shortcuts.", "প্রতিটি স্ট্যাম্প সরাসরি স্থানে গিয়ে অর্জিত। কোনো শর্টকাট নয়।")}</p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((st, i) => (
            <motion.li
              key={st.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-paper-200 bg-paper"
            >
              <div className={`relative h-[384px] overflow-hidden px-6 pt-6 ${st.tint}`}>
                <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/50" />
                <div aria-hidden className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-white/40" />
                <span className="absolute left-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-ruchi-600 font-display text-lg font-extrabold text-white shadow-card">{st.n}</span>
                <div className="relative">{st.scene}</div>
              </div>
              <div className="p-6 text-center">
                <h3 className="flex items-center justify-center gap-2 text-xl font-extrabold"><st.icon className="h-5 w-5 text-ruchi-600" />{st.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[18rem] text-sm leading-relaxed text-ink-500">{st.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Destinations() {
  const { lang, tr, t } = useI18n();
  const [sw, setSw] = useState<SwiperType | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ruchi-600">{tr("Destinations", "গন্তব্য")}</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{tr("Where will you go first?", "প্রথমে কোথায় যাবেন?")}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/explore" className="mr-2 hidden items-center gap-1 text-sm font-bold text-ruchi-700 sm:inline-flex">{t("seeAll")} <ArrowRight className="h-4 w-4" /></Link>
          <button onClick={() => sw?.slidePrev()} disabled={edge.start} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-paper-300 bg-white transition hover:border-ink disabled:opacity-35"><ChevronLeft className="h-5 w-5" /></button>
          <button onClick={() => sw?.slideNext()} disabled={edge.end} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-ruchi-600 text-white shadow-card transition hover:bg-ruchi-700 disabled:opacity-35"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>

      <div className="-mx-4 mt-8 overflow-hidden px-4 sm:mx-0 sm:px-0">
      <Swiper
        modules={[Autoplay]}
        onSwiper={setSw}
        onSlideChange={(s) => setEdge({ start: s.isBeginning, end: s.isEnd })}
        autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
        spaceBetween={16}
        slidesPerView={1.35}
        breakpoints={{ 560: { slidesPerView: 2.2 }, 900: { slidesPerView: 3.1 }, 1100: { slidesPerView: 3.6 } }}
        className="!overflow-visible"
      >
        {places.map((p) => (
          <SwiperSlide key={p.id}>
            <Link href={`/places/${p.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-ink shadow-card">
              <Image src={p.image} alt={pick(p.name, lang)} fill sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/45 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
                <RarityDot r={p.rarity} />
                {p.rarity === "legendary" ? tr("Legendary", "কিংবদন্তি") : p.rarity === "rare" ? tr("Rare", "দুর্লভ") : tr("Common", "সাধারণ")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="font-display text-2xl font-extrabold leading-tight">{pick(p.name, lang)}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-white/85"><MapPin className="h-3.5 w-3.5" />{pick(p.location, lang)}</p>
                <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />{pick(p.bestTime, lang)}</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-ruchi-700 transition-transform group-hover:translate-x-0.5"><ArrowRight className="h-4 w-4" /></span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  );
}

function Highlights() {
  const { lang, tr } = useI18n();
  const top = leaderboard.slice(0, 3);
  const reel = reels[1];
  const spot = places[5];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ruchi-600">{tr("Community", "কমিউনিটি")}</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{tr("More than a checklist", "শুধু তালিকা নয়")}</h2>
          <p className="mt-2 text-ink-500">{tr("Discover secret places, watch trips and race your friends.", "গোপন স্থান খুঁজুন, ভ্রমণ দেখুন, বন্ধুদের সাথে প্রতিযোগিতা করুন।")}</p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          {/* Hidden spots */}
          <Link href="/spots" className="group relative min-h-[280px] overflow-hidden rounded-2xl bg-ink md:col-span-2">
            <Image src={spot.gallery[2] ?? spot.image} alt="" fill sizes="700px" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-ruchi-600 px-2.5 py-1 text-xs font-bold uppercase tracking-wider"><Sparkles className="h-3.5 w-3.5" />{tr("Hidden spots", "গোপন স্থান")}</span>
              <h3 className="mt-3 max-w-md text-2xl font-extrabold leading-tight sm:text-3xl">{tr("Places few people know", "যে জায়গা খুব কম মানুষ চেনে")}</h3>
              <p className="mt-1.5 max-w-md text-white/85">{tr("Travellers share secret spots with routes. Admins review each one before it goes live.", "ভ্রমণকারীরা রুটসহ গোপন স্থান শেয়ার করেন। প্রকাশের আগে অ্যাডমিন যাচাই করেন।")}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold">{tr("Discover", "খুঁজে দেখুন")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
          </Link>

          {/* Reels */}
          <Link href="/reels" className="group relative min-h-[320px] overflow-hidden rounded-2xl bg-ink md:row-span-2">
            <Image src={reel.poster} alt="" fill sizes="400px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25" />
            <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ruchi-600 shadow-lift"><Play className="h-7 w-7 fill-current" /></span>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-ink"><Clapperboard className="h-3.5 w-3.5 text-ruchi-600" />{tr("Reels & posts", "রিলস ও পোস্ট")}</span>
              <h3 className="mt-3 text-2xl font-extrabold leading-tight">{tr("Trips, told in motion", "ভ্রমণের গল্প, চলমান ছবিতে")}</h3>
              <div className="mt-3 flex items-center gap-3 text-sm font-semibold text-white/90">
                <Image src={reel.author.avatar} alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
                <span className="truncate">@{reel.author.username}</span>
                <span className="ml-auto inline-flex items-center gap-1"><Heart className="h-4 w-4 fill-ruchi-500 text-ruchi-500" />{Math.round(reel.likes / 1000)}K</span>
              </div>
            </div>
          </Link>

          {/* Leaderboard */}
          <Link href="/leaderboard" className="group rounded-2xl border border-paper-200 bg-paper p-6 transition-shadow hover:shadow-lift md:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-ink px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white"><Trophy className="h-3.5 w-3.5 text-gold-400" />{tr("Leaderboard", "লিডারবোর্ড")}</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-ruchi-700">{tr("See ranking", "র‍্যাংকিং দেখুন")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </div>
            <h3 className="mt-3 text-2xl font-extrabold leading-tight">{tr("Race your friends to the top", "বন্ধুদের হারিয়ে শীর্ষে উঠুন")}</h3>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {top.map((u, i) => (
                <li key={u.username} className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-card">
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-extrabold text-white ${["bg-gold-500", "bg-ink-400", "bg-orange-400"][i]}`}>{i + 1}</span>
                  <Image src={u.avatar} alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{u.name.split(" ")[0]}</span>
                    <span className="text-xs text-ink-500">{u.stamps} {tr("stamps", "স্ট্যাম্প")}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Landing() {
  const { lang, tr, t } = useI18n();
  const hero = places.filter((p) => p.collected).slice(0, 3);

  return (
    <div className="bg-paper">

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="inline-flex items-center gap-2 rounded-md border border-paper-200 bg-white px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-ink-700">
            <SquareMark className="h-3.5 w-3.5" />
            {tr("A Ruchi initiative by Square", "স্কয়ার-এর রুচি উদ্যোগ")}
          </span>
          <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] text-ink text-balance sm:text-6xl">
            {lang === "bn" ? (
              <>
                এক স্ট্যাম্পে
                <br />
                <span className="text-ruchi-600">বাংলাদেশ</span> জয়
              </>
            ) : (
              <>
                Collect <span className="text-ruchi-600">Bangladesh</span>,
                <br />
                one stamp at a time.
              </>
            )}
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-700">
            {tr(
              "Visit real destinations, check in with a live selfie, earn postmarked stamps and share your route with other travellers.",
              "বাস্তব গন্তব্যে যান, লাইভ সেলফিতে চেক-ইন করুন, পোস্টমার্কসহ স্ট্যাম্প জিতুন এবং আপনার রুট অন্যদের সাথে শেয়ার করুন।"
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/register">
              <Button size="lg" className="group">
                {tr("Join free", "বিনামূল্যে যোগ দিন")}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline">
                {tr("Browse destinations", "গন্তব্য দেখুন")}
              </Button>
            </Link>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-paper-200 pt-6">
            {[
              ["20+", tr("Destinations", "গন্তব্য")],
              ["50K+", tr("Explorers", "ভ্রমণকারী")],
              ["120K", tr("Check-ins", "চেক-ইন")],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-extrabold text-ink">{n}</dt>
                <dd className="text-sm text-ink-500">{l}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="dots relative isolate overflow-hidden rounded-3xl bg-ruchi-600 p-6 pb-10 sm:p-10"
        >
          <span aria-hidden className="absolute -right-8 -top-8 -z-10 h-40 w-40 rounded-full bg-gold-500 opacity-95" />
          <span aria-hidden className="absolute -right-2 top-2 -z-10 h-28 w-28 rounded-full bg-gold-400/70" />
          <svg aria-hidden viewBox="0 0 400 90" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full">
            <path d="M0 90 L0 55 L60 20 L110 52 L170 12 L240 60 L300 28 L360 58 L400 40 L400 90 Z" fill="#2c8236" />
            <path d="M0 90 L0 72 L80 50 L140 72 L210 46 L280 74 L350 54 L400 68 L400 90 Z" fill="#1e5025" />
          </svg>
          <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/80">
            {tr("Your passport", "আপনার পাসপোর্ট")}
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-5">
            {hero.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24, rotate: 0 }}
                animate={{ opacity: 1, y: i === 1 ? 14 : 0, rotate: [-4, 2, -2][i] }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              >
                <Stamp place={p} collected compact />
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-white">
            <span className="grid h-6 w-6 place-items-center rounded bg-white text-ruchi-600">
              <StampIcon className="h-3.5 w-3.5" />
            </span>
            {tr("3 of 20 stamps collected", "২০টির মধ্যে ৩টি স্ট্যাম্প সংগৃহীত")}
          </div>
        </motion.div>
      </section>

      <HowItWorks />
      <Destinations />
      <Highlights />

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="dots relative overflow-hidden rounded-3xl bg-ruchi-600 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{tr("Your first stamp is waiting.", "আপনার প্রথম স্ট্যাম্প অপেক্ষা করছে।")}</h2>
          <p className="mx-auto mt-3 max-w-md text-white/85">{tr("Create a free account and start exploring.", "বিনামূল্যে অ্যাকাউন্ট খুলে এক্সপ্লোর শুরু করুন।")}</p>
          <Link href="/register" className="mt-7 inline-block">
            <Button size="lg" variant="dark">
              {t("register")} <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-leaf-900 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-white/80 sm:flex-row sm:px-6">
          <Logo className="[&_img]:h-16" />
          <p className="flex items-center gap-2">
            <SquareMark className="h-4 w-4" />
            {tr("A Ruchi microsite · Square Food & Beverage Ltd.", "রুচি মাইক্রোসাইট · স্কয়ার ফুড অ্যান্ড বেভারেজ লিমিটেড")}
          </p>
        </div>
      </footer>
    </div>
  );
}
