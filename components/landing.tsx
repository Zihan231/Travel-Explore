"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
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
} from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { places } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Logo, SquareMark } from "@/components/brand";
import { LangToggle } from "@/components/lang-toggle";
import { Stamp } from "@/components/stamp";

const steps = [
  { icon: Navigation, en: ["Reach the spot", "Turn on location. We confirm you are really there."], bn: ["স্থানে পৌঁছান", "লোকেশন চালু করুন। আপনি সত্যিই সেখানে আছেন কিনা আমরা যাচাই করব।"] },
  { icon: Camera, en: ["Record a selfie", "A short live video from the front camera. No gallery uploads."], bn: ["সেলফি রেকর্ড করুন", "ফ্রন্ট ক্যামেরায় ছোট লাইভ ভিডিও। গ্যালারি থেকে আপলোড নয়।"] },
  { icon: StampIcon, en: ["Collect your stamp", "A postmarked stamp lands in your digital passport."], bn: ["স্ট্যাম্প সংগ্রহ করুন", "পোস্টমার্কসহ স্ট্যাম্প আপনার ডিজিটাল পাসপোর্টে যোগ হবে।"] },
];

const features = [
  { icon: Sparkles, en: ["Hidden spots", "Share places few people know. Admins review before publishing."], bn: ["গোপন স্থান", "কম পরিচিত জায়গা শেয়ার করুন। প্রকাশের আগে অ্যাডমিন যাচাই করবেন।"] },
  { icon: Clapperboard, en: ["Reels & posts", "Photos, videos and routes from fellow travellers, with reactions."], bn: ["রিলস ও পোস্ট", "সহযাত্রীদের ছবি, ভিডিও ও রুট, সাথে রিয়্যাকশন।"] },
  { icon: Trophy, en: ["Leaderboard", "Visit more places than your friends and climb the weekly ranking."], bn: ["লিডারবোর্ড", "বন্ধুদের চেয়ে বেশি স্থান ঘুরুন এবং সাপ্তাহিক র‍্যাংকে উঠুন।"] },
];

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
          className="dots relative overflow-hidden rounded-3xl bg-ruchi-600 p-6 pb-10 sm:p-10"
        >
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

      {/* How it works */}
      <section className="border-y border-paper-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{tr("How a check-in works", "চেক-ইন যেভাবে কাজ করে")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => {
              const [title, desc] = lang === "bn" ? s.bn : s.en;
              return (
                <div key={i} className="relative rounded-2xl border border-paper-200 bg-paper p-6">
                  <span className="absolute right-5 top-4 font-display text-6xl font-extrabold text-paper-200">{i + 1}</span>
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-ruchi-600 text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Destinations carousel */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-extrabold sm:text-4xl">{tr("Where will you go first?", "প্রথমে কোথায় যাবেন?")}</h2>
          <Link href="/explore" className="hidden items-center gap-1 text-sm font-bold text-ruchi-700 sm:flex">
            {t("seeAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Swiper
          modules={[Autoplay, FreeMode]}
          freeMode
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          spaceBetween={16}
          slidesPerView={1.25}
          breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
          className="!mt-8"
        >
          {places.map((p) => (
            <SwiperSlide key={p.id}>
              <Link href={`/places/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={p.image} alt={pick(p.name, lang)} fill sizes="400px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-display text-lg font-bold">{pick(p.name, lang)}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-ink-500">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{pick(p.location, lang)}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{pick(p.bestTime, lang)}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Features */}
      <section className="bg-leaf-700">
        <div className="mx-auto grid max-w-6xl gap-px px-4 py-14 sm:px-6 md:grid-cols-3 md:gap-8">
          {features.map((f, i) => {
            const [title, desc] = lang === "bn" ? f.bn : f.en;
            return (
              <div key={i} className="py-4 text-white">
                <f.icon className="h-7 w-7 text-white/90" />
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/80">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

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

      <footer className="border-t border-paper-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-ink-500 sm:flex-row sm:px-6">
          <Logo />
          <p className="flex items-center gap-2">
            <SquareMark className="h-4 w-4" />
            {tr("A Ruchi microsite · Square Food & Beverage Ltd.", "রুচি মাইক্রোসাইট · স্কয়ার ফুড অ্যান্ড বেভারেজ লিমিটেড")}
          </p>
        </div>
      </footer>
    </div>
  );
}
