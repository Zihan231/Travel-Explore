"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X, Navigation, Camera, CircleCheck, Loader2, ShieldCheck, Share2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useI18n, pick } from "@/lib/i18n";
import type { Place } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Stamp } from "@/components/stamp";

type Step = "location" | "verifying" | "camera" | "recording" | "success";

const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

export function CheckinFlow({ place }: { place: Place }) {
  const { lang, tr, t } = useI18n();
  const router = useRouter();
  const [step, setStep] = useState<Step>("location");
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [camError, setCamError] = useState(false);

  useEffect(() => () => streamRef.current?.getTracks().forEach((tr) => tr.stop()), []);

  const startCamera = async () => {
    setStep("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch {
      setCamError(true);
    }
  };

  const verify = () => {
    setStep("verifying");
    let p = 0;
    const iv = setInterval(() => {
      p += 8 + Math.random() * 12;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(startCamera, 400);
      }
    }, 170);
  };

  const record = () => {
    setStep("recording");
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => {
      p += 4;
      setProgress(p);
      if (p >= 100) {
        clearInterval(iv);
        streamRef.current?.getTracks().forEach((track) => track.stop());
        setStep("success");
        toast.success(tr("Check-in uploaded", "চেক-ইন আপলোড হয়েছে"));
      }
    }, 120);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink text-white">
      {step !== "success" && (
        <button onClick={() => router.back()} aria-label="Close" className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-lg bg-white/15">
          <X className="h-5 w-5" />
        </button>
      )}

      <AnimatePresence mode="wait">
        {step === "location" && (
          <motion.div key="loc" {...fade} className="flex h-full flex-col items-center justify-center px-8 text-center">
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-ruchi-600 shadow-lift">
              <Navigation className="h-9 w-9" />
            </span>
            <h1 className="mt-7 text-3xl font-extrabold">{t("enableLocation")}</h1>
            <p className="mt-2 max-w-xs text-white/70">{t("locationNeeded")}</p>
            <div className="mt-5 flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-ruchi-300" />
              {pick(place.name, lang)}, {pick(place.location, lang)}
            </div>
            <Button size="lg" className="mt-8 w-full max-w-xs" onClick={verify}>
              <Navigation className="h-5 w-5" /> {t("enableLocation")}
            </Button>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-white/55">
              <Lock className="h-3.5 w-3.5" />
              {tr("Your location is only used to verify this check-in", "আপনার লোকেশন শুধু এই চেক-ইন যাচাইয়ে ব্যবহৃত হয়")}
            </p>
          </motion.div>
        )}

        {step === "verifying" && (
          <motion.div key="ver" {...fade} className="flex h-full flex-col items-center justify-center px-8 text-center">
            <div className="relative h-32 w-32">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#d1181f" strokeWidth="8" strokeLinecap="round" strokeDasharray={2 * Math.PI * 56} strokeDashoffset={2 * Math.PI * 56 * (1 - progress / 100)} style={{ transition: "stroke-dashoffset 0.2s" }} />
              </svg>
              <span className="absolute inset-0 grid place-items-center font-display text-3xl font-extrabold">{Math.round(progress)}%</span>
            </div>
            <h1 className="mt-7 text-2xl font-extrabold">{tr("Verifying your location", "লোকেশন যাচাই হচ্ছে")}</h1>
            <p className="mt-2 text-white/70">{tr("Making sure you are really here.", "আপনি সত্যিই এখানে আছেন কিনা নিশ্চিত করা হচ্ছে।")}</p>
          </motion.div>
        )}

        {(step === "camera" || step === "recording") && (
          <motion.div key="cam" {...fade} className="relative flex h-full flex-col">
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-center gap-2 bg-leaf-700 py-2.5 pr-14 text-sm font-semibold">
              <CircleCheck className="h-4 w-4" />
              {t("youreHere")} {pick(place.name, lang)}
            </div>

            <div className="relative flex-1 overflow-hidden bg-black">
              {!camError ? (
                <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" style={{ transform: "scaleX(-1)" }} />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 px-10 text-center text-white/55">
                  <Camera className="h-14 w-14" />
                  <p className="text-sm">{tr("Camera preview (demo). The live app opens your front camera.", "ক্যামেরা প্রিভিউ (ডেমো)। আসল অ্যাপে ফ্রন্ট ক্যামেরা চালু হবে।")}</p>
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 grid place-items-center">
                <div className="h-56 w-44 rounded-[50%] border-2 border-dashed border-white/50" />
              </div>
              <span className="absolute right-4 top-16 rounded-md bg-black/50 px-2.5 py-1 text-xs font-semibold">{tr("Front camera", "ফ্রন্ট ক্যামেরা")}</span>
              {step === "recording" && (
                <>
                  <span className="absolute left-4 top-16 flex items-center gap-1.5 rounded-md bg-ruchi-600 px-2.5 py-1 text-xs font-bold">
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity }} className="h-2 w-2 rounded-full bg-white" />
                    REC
                  </span>
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                    <div className="h-full bg-ruchi-600" style={{ width: `${progress}%`, transition: "width 0.12s linear" }} />
                  </div>
                </>
              )}
            </div>

            <div className="safe-bottom bg-ink px-6 pb-8 pt-5 text-center">
              <p className="text-lg font-bold">{t("recordSelfie")}</p>
              <p className="mt-1 text-sm text-white/65">{t("selfieHint")}</p>
              <div className="mt-5 flex justify-center">
                {step === "camera" ? (
                  <button onClick={record} aria-label="Record" className="group grid h-[72px] w-[72px] place-items-center rounded-full border-4 border-white">
                    <span className="h-14 w-14 rounded-full bg-ruchi-600 transition-transform group-active:scale-90" />
                  </button>
                ) : (
                  <span className="grid h-[72px] w-[72px] place-items-center rounded-full border-4 border-ruchi-600">
                    <Loader2 className="h-7 w-7 animate-spin text-ruchi-500" />
                  </span>
                )}
              </div>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/50">
                <ShieldCheck className="h-3.5 w-3.5" />
                {tr("Live recording only. Gallery uploads are disabled.", "শুধু লাইভ রেকর্ডিং। গ্যালারি আপলোড বন্ধ।")}
              </p>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div key="ok" {...fade} className="flex h-full flex-col items-center justify-center overflow-y-auto bg-paper px-8 py-10 text-center text-ink">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-leaf-700">
              <CircleCheck className="h-5 w-5" /> {t("stampCollected")}
            </p>
            <motion.div initial={{ scale: 1.5, rotate: -12, opacity: 0 }} animate={{ scale: 1, rotate: -3, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }} className="my-7 w-48">
              <Stamp place={place} collected />
            </motion.div>
            <h1 className="text-3xl font-extrabold">{pick(place.name, lang)}</h1>
            <p className="mt-1 text-ink-500">{tr("Added to your passport. +250 XP", "আপনার পাসপোর্টে যোগ হয়েছে। +২৫০ XP")}</p>
            <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
              <Button size="lg" onClick={() => router.push("/passport")}>{tr("View passport", "পাসপোর্ট দেখুন")}</Button>
              <Button size="lg" variant="outline" onClick={() => toast.success(tr("Trip card ready to share", "ট্রিপ কার্ড শেয়ারের জন্য প্রস্তুত"))}>
                <Share2 className="h-5 w-5" /> {tr("Share trip card", "ট্রিপ কার্ড শেয়ার")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
