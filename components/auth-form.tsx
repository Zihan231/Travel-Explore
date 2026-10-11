"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth, type Role } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand";
import { LangToggle } from "@/components/lang-toggle";
import { cn } from "@/lib/utils";

export function AuthForm({ mode, role }: { mode: "login" | "register"; role: "tourist" | "admin" }) {
  const { tr, t } = useI18n();
  const { signIn } = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const admin = role === "admin";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signIn(role);
      toast.success(
        admin ? tr("Signed in as admin", "অ্যাডমিন হিসেবে লগইন হয়েছে") : tr("Welcome to Ruchi Explore Limitless", "রুচি এক্সপ্লোর লিমিটলেসে স্বাগতম")
      );
      router.push("/");
    }, 700);
  };

  const heading = admin
    ? tr("Admin sign in", "অ্যাডমিন লগইন")
    : mode === "login"
      ? tr("Welcome back", "আবার স্বাগতম")
      : tr("Create your account", "অ্যাকাউন্ট খুলুন");

  return (
    <div className="grid min-h-dvh lg:grid-cols-[1fr_1.1fr]">
      <div className="flex flex-col bg-white px-5 py-6 sm:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-ink-500 hover:text-ink">
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
          <LangToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-10"
        >
          <Logo className="[&_img]:h-20" />

          {admin && (
            <span className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-md bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
              {tr("Restricted area", "সংরক্ষিত এলাকা")}
            </span>
          )}
          <h1 className={cn("text-3xl font-extrabold", admin ? "mt-3" : "mt-8")}>{heading}</h1>
          <p className="mt-1.5 text-ink-500">
            {admin
              ? tr("For Square Group staff who manage destinations and review submissions.", "যেসব স্কয়ার গ্রুপ কর্মী গন্তব্য ও জমা পর্যালোচনা করেন তাদের জন্য।")
              : mode === "login"
                ? tr("Log in to continue your journey.", "আপনার যাত্রা চালিয়ে যেতে লগ ইন করুন।")
                : tr("Join free and collect your first stamp.", "বিনামূল্যে যোগ দিন এবং প্রথম স্ট্যাম্প সংগ্রহ করুন।")}
          </p>

          <form onSubmit={submit} className="mt-7 space-y-3">
            {mode === "register" && !admin && (
              <Field icon={User} type="text" placeholder={t("fullName")} autoComplete="name" defaultValue="Rafiq Ahmed" required />
            )}
            <Field
              icon={Mail}
              type="email"
              placeholder={t("email")}
              autoComplete="email"
              defaultValue={admin ? "admin@ruchitour.com" : "rafiq@example.com"}
              required
            />
            <div className="relative">
              <Field
                icon={Lock}
                type={show ? "text" : "password"}
                placeholder={t("password")}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                defaultValue="demo-password"
                required
              />
              <button
                type="button"
                onClick={() => setShow((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500"
                aria-label="Toggle password visibility"
              >
                {show ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
              </button>
            </div>

            <Button type="submit" size="lg" variant={admin ? "dark" : "primary"} className="w-full" disabled={loading}>
              {loading ? tr("Please wait…", "অপেক্ষা করুন…") : admin ? tr("Sign in to console", "কনসোলে প্রবেশ করুন") : mode === "login" ? t("login") : t("register")}
            </Button>
          </form>

          {!admin && (
            <>
              <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase text-ink-400">
                <span className="h-px flex-1 bg-paper-200" />
                {tr("or", "অথবা")}
                <span className="h-px flex-1 bg-paper-200" />
              </div>
              <Button variant="outline" size="lg" className="w-full" onClick={() => toast.info(tr("Google sign-in is a demo", "গুগল সাইন-ইন ডেমো"))}>
                <FcGoogle className="h-5 w-5" />
                {t("continueGoogle")}
              </Button>
            </>
          )}

          <div className="mt-6 space-y-2 text-center text-sm text-ink-500">
            {!admin && (
              <p>
                {mode === "login" ? t("noAccount") : t("haveAccount")}{" "}
                <Link href={mode === "login" ? "/register" : "/login"} className="font-bold text-ruchi-700">
                  {mode === "login" ? t("register") : t("login")}
                </Link>
              </p>
            )}
            <p>
              <Link href={admin ? "/login" : "/login?role=admin"} className="inline-flex items-center gap-1.5 font-semibold text-ink-700 hover:text-ink">
                <ShieldCheck className="h-4 w-4" />
                {admin ? tr("Back to tourist login", "পর্যটক লগইনে ফিরুন") : tr("Admin login", "অ্যাডমিন লগইন")}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <Image
          src="/images/login-boats.jpg"
          alt="Fishing boats on the beach at Cox's Bazar"
          fill
          sizes="55vw"
          className="object-cover object-[50%_85%]"
          priority
        />
        <div className="absolute inset-x-0 top-0 h-3/5 bg-gradient-to-b from-black/60 via-black/25 to-transparent" />

        <div className="absolute inset-x-0 top-0 p-12 text-white">
          <span className="mb-5 block h-1.5 w-14 rounded-full bg-ruchi-600" />
          <p className="max-w-md font-display text-4xl font-extrabold leading-tight text-balance drop-shadow-md">
            {admin ? tr("Curate Bangladesh for every explorer.", "প্রতিটি ভ্রমণকারীর জন্য বাংলাদেশ সাজান।") : tr("Every journey has a story.", "প্রতিটি যাত্রার একটি গল্প আছে।")}
          </p>
          <p className="mt-2 max-w-md text-white/90 drop-shadow">
            {admin ? tr("Publish check-in locations, review hidden spots and see who is exploring.", "চেক-ইন লোকেশন প্রকাশ করুন, গোপন স্থান যাচাই করুন এবং দেখুন কারা ঘুরছে।") : tr("Check in, collect stamps and share your route.", "চেক-ইন করুন, স্ট্যাম্প সংগ্রহ করুন, আপনার রুট শেয়ার করুন।")}
          </p>
        </div>

        <span className="absolute bottom-6 right-6 rounded-md bg-black/45 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
          {tr("Cox's Bazar", "কক্সবাজার")}
        </span>
      </div>
    </div>
  );
}

function Field({ icon: Icon, className, ...props }: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-ink-400" />
      <input
        {...props}
        className={cn(
          "h-12 w-full rounded-xl border border-paper-300 bg-white pl-11 pr-11 text-[15px] outline-none transition-colors placeholder:text-ink-400 focus:border-ruchi-600 focus:ring-2 focus:ring-ruchi-600/15",
          className
        )}
      />
    </div>
  );
}
