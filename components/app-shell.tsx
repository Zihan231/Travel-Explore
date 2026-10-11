"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Compass,
  BookMarked,
  Newspaper,
  Sparkles,
  Clapperboard,
  Trophy,
  User,
  Settings,
  Bell,
  Plus,
  LogOut,
  LogIn,
  LayoutDashboard,
  MapPinned,
  ClipboardCheck,
  Camera,
  ShieldCheck,
  ChevronDown,
  Ellipsis,
  X,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand";
import { LangToggle } from "@/components/lang-toggle";
import { RightRail } from "@/components/right-rail";
import { LoginRequired } from "@/components/login-required";

type Item = { href: string; icon: LucideIcon; en: string; bn: string };

const publicNav: Item[] = [
  { href: "/", icon: Home, en: "Home", bn: "হোম" },
  { href: "/explore", icon: Compass, en: "Explore", bn: "এক্সপ্লোর" },
  { href: "/passport", icon: BookMarked, en: "Passport", bn: "পাসপোর্ট" },
  { href: "/feed", icon: Newspaper, en: "Feed", bn: "ফিড" },
  { href: "/spots", icon: Sparkles, en: "Hidden spots", bn: "গোপন স্থান" },
  { href: "/reels", icon: Clapperboard, en: "Reels", bn: "রিলস" },
  { href: "/leaderboard", icon: Trophy, en: "Leaderboard", bn: "লিডারবোর্ড" },
];

const adminNav: Item[] = [
  { href: "/", icon: LayoutDashboard, en: "Dashboard", bn: "ড্যাশবোর্ড" },
  { href: "/explore", icon: MapPinned, en: "Destinations", bn: "গন্তব্য" },
  { href: "/spots", icon: ClipboardCheck, en: "Spot reviews", bn: "স্পট রিভিউ" },
  { href: "/passport", icon: Camera, en: "Check-ins", bn: "চেক-ইন" },
  { href: "/feed", icon: Newspaper, en: "Feed", bn: "ফিড" },
  { href: "/reels", icon: Clapperboard, en: "Reels", bn: "রিলস" },
  { href: "/leaderboard", icon: Trophy, en: "Leaderboard", bn: "লিডারবোর্ড" },
];

const extra: Item[] = [
  { href: "/profile", icon: User, en: "Profile", bn: "প্রোফাইল" },
  { href: "/settings", icon: Settings, en: "Settings", bn: "সেটিংস" },
];

const protectedPaths = ["/profile", "/notifications", "/settings", "/create", "/checkin"];
const tabsByRole = {
  guest: ["/", "/explore", "/passport", "/feed"],
  tourist: ["/", "/explore", "/passport", "/feed"],
  admin: ["/", "/explore", "/spots", "/passport"],
};

function UserMenu({ onLogout }: { onLogout: () => void }) {
  const { tr } = useI18n();
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-lg border border-paper-200 bg-white pl-1 pr-2 shadow-card hover:bg-paper"
      >
        <Image src={currentUser.avatar} alt="" width={32} height={32} className="h-8 w-8 rounded-md object-cover" />
        <ChevronDown className={cn("h-4 w-4 text-ink-500 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-paper-200 bg-white shadow-lift">
          <div className="border-b border-paper-100 px-4 py-3">
            <p className="truncate text-sm font-bold">{isAdmin ? "Square Admin" : currentUser.name}</p>
            <p className="truncate text-xs text-ink-500">{isAdmin ? "admin@squaregroup" : `@${currentUser.username}`}</p>
          </div>
          {extra
            .filter((i) => !isAdmin || i.href === "/settings")
            .map(({ href, icon: Icon, en, bn }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} role="menuitem" className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold hover:bg-paper">
                <Icon className="h-4 w-4 text-ink-500" /> {tr(en, bn)}
              </Link>
            ))}
          <button onClick={onLogout} role="menuitem" className="flex w-full items-center gap-2.5 border-t border-paper-100 px-4 py-2.5 text-sm font-semibold text-ruchi-700 hover:bg-ruchi-50">
            <LogOut className="h-4 w-4" /> {tr("Log out", "লগ আউট")}
          </button>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { tr } = useI18n();
  const { isAdmin, isGuest, role, ready, signOut } = useAuth();

  const nav = isAdmin ? adminNav : publicNav;
  const tabs = tabsByRole[role].map((h) => nav.find((i) => i.href === h)!);
  const moreItems = [...nav.filter((i) => !tabsByRole[role].includes(i.href)), ...(isGuest ? [] : isAdmin ? extra.filter((i) => i.href === "/settings") : extra)];
  const [moreOpen, setMoreOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [short, setShort] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      setShort(document.documentElement.scrollHeight <= window.innerHeight + 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  useEffect(() => setMoreOpen(false), [pathname]);

  const isReels = pathname.startsWith("/reels");
  const immersive = pathname.startsWith("/places/");
  const showBottom = !immersive && (scrolled || short || isReels);
  const hideTop = scrolled || isReels;

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
  const isProtected = protectedPaths.some((x) => pathname.startsWith(x));
  const wide = isGuest && pathname === "/";

  const logout = () => {
    signOut();
    router.push("/");
  };

  const createLabel = isAdmin ? tr("Add destination", "গন্তব্য যোগ") : tr("Create", "পোস্ট");

  return (
    <div className="min-h-dvh bg-paper">
      {/* Desktop top navigation (all roles) */}
      <header className="sticky top-0 z-40 hidden border-b border-paper-200 bg-white/95 backdrop-blur lg:block">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-4 px-4 xl:px-6 2xl:gap-8">
          <Logo href="/" className="shrink-0" />
          <nav className="no-scrollbar flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto" aria-label="Main">
            {nav.map(({ href, icon: Icon, en, bn }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-semibold transition-colors xl:px-3 xl:text-sm",
                  active(href) ? "text-ruchi-700" : "text-ink-700 hover:bg-paper-100"
                )}
              >
                <Icon className="hidden h-4 w-4 2xl:block" />
                {tr(en, bn)}
                {active(href) && <span className="absolute inset-x-2 -bottom-[13px] h-[3px] rounded-t bg-ruchi-600 xl:inset-x-3" />}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <LangToggle />
            {isGuest ? (
              <>
                <Link href="/login?role=admin" title={tr("Admin login", "অ্যাডমিন লগইন")} aria-label={tr("Admin login", "অ্যাডমিন লগইন")} className="hidden h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-ink-700 hover:bg-paper-100 xl:inline-flex">
                  <ShieldCheck className="h-4 w-4" /> <span className="hidden 2xl:inline">{tr("Admin login", "অ্যাডমিন লগইন")}</span>
                </Link>
                <Link href="/login" className="inline-flex h-10 items-center rounded-lg border border-paper-300 px-4 text-sm font-semibold hover:bg-paper">
                  {tr("Log in", "লগ ইন")}
                </Link>
                <Link href="/register" className="inline-flex h-10 items-center rounded-lg bg-ruchi-600 px-4 text-sm font-semibold text-white shadow-card hover:bg-ruchi-700">
                  {tr("Sign up", "সাইন আপ")}
                </Link>
              </>
            ) : (
              <>
                {isAdmin && (
                  <span className="hidden items-center gap-1.5 rounded-md bg-ink px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white xl:inline-flex">
                    <ShieldCheck className="h-3.5 w-3.5" /> Admin
                  </span>
                )}
                <Link href="/notifications" aria-label={tr("Notifications", "নোটিফিকেশন")} className="relative grid h-10 w-10 place-items-center rounded-lg border border-paper-200 bg-white shadow-card hover:bg-paper">
                  <Bell className="h-[18px] w-[18px]" />
                  <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-ruchi-600 ring-2 ring-white" />
                </Link>
                <Link href="/create" aria-label={createLabel} className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ruchi-600 px-3 text-sm font-semibold text-white shadow-card hover:bg-ruchi-700 xl:px-4">
                  <Plus className="h-4 w-4" />
                  <span className="hidden xl:inline">{createLabel}</span>
                </Link>
                <UserMenu onLogout={logout} />
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile top bar */}
      <header className={cn("sticky top-0 z-40 border-b border-paper-200 bg-white transition-transform duration-300 lg:hidden", hideTop && "-translate-y-full")}>
        <div className="flex items-center justify-between px-4 py-2.5">
          <Logo href="/" />
          <div className="flex items-center gap-1.5">
            <LangToggle />
            {isGuest ? (
              <Link href="/login" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ruchi-600 px-3 text-sm font-semibold text-white">
                <LogIn className="h-4 w-4" /> {tr("Log in", "লগ ইন")}
              </Link>
            ) : (
              <Link href="/notifications" aria-label={tr("Notifications", "নোটিফিকেশন")} className="relative grid h-9 w-9 place-items-center rounded-lg border border-paper-200 bg-white">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-ruchi-600 ring-2 ring-white" />
              </Link>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-1.5 bg-ink px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
            {tr("Admin console", "অ্যাডমিন কনসোল")}
          </div>
        )}
      </header>

      <main>
        <div className={cn("mx-auto w-full", wide ? "max-w-none" : "max-w-[1320px] xl:flex xl:gap-2 xl:px-6")}>
          <div
            className={cn(
              "min-w-0",
              wide
                ? "w-full pb-24 lg:pb-0"
                : "mx-auto w-full max-w-2xl px-4 pb-28 pt-5 lg:max-w-[820px] lg:px-8 lg:pb-12 lg:pt-8 xl:mx-0 xl:flex-1"
            )}
          >
            {isProtected && !ready ? null : isProtected && isGuest ? <LoginRequired /> : children}
          </div>
          {!wide && !isReels && (
            <aside className="hidden w-[22rem] shrink-0 pt-8 xl:block">
              <RightRail />
            </aside>
          )}
        </div>
      </main>

      {/* Mobile create button */}
      {!isGuest && !immersive && (
        <Link
          href="/create"
          aria-label={createLabel}
          className={cn(
            "fixed right-4 z-40 grid h-12 w-12 place-items-center rounded-xl bg-ruchi-600 text-white shadow-lift transition-all duration-300 active:scale-95 lg:hidden",
            showBottom ? "bottom-[76px]" : "bottom-5"
          )}
        >
          <Plus className="h-6 w-6" />
        </Link>
      )}

      {/* Mobile bottom tabs */}
      <nav className={cn("safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-paper-200 bg-white transition-transform duration-300 lg:hidden", !showBottom && "translate-y-full")}>
        <div className="mx-auto grid max-w-2xl grid-cols-5">
          {tabs.map(({ href, icon: Icon, en, bn }) => {
            const on = active(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 pb-2 pt-2.5 text-[11px] font-semibold transition-colors",
                  on ? "text-ruchi-700" : "text-ink-500"
                )}
              >
                {on && <span className="absolute inset-x-5 top-0 h-[3px] rounded-b bg-ruchi-600" />}
                <Icon className="h-[22px] w-[22px]" strokeWidth={on ? 2.4 : 1.9} />
                {tr(en, bn)}
              </Link>
            );
          })}
          {(() => {
            const onMore = moreItems.some((i) => active(i.href));
            return (
              <button
                onClick={() => setMoreOpen(true)}
                aria-haspopup="dialog"
                className={cn("relative flex flex-col items-center gap-0.5 pb-2 pt-2.5 text-[11px] font-semibold transition-colors", onMore ? "text-ruchi-700" : "text-ink-500")}
              >
                {onMore && <span className="absolute inset-x-5 top-0 h-[3px] rounded-b bg-ruchi-600" />}
                <Ellipsis className="h-[22px] w-[22px]" strokeWidth={onMore ? 2.4 : 1.9} />
                {tr("More", "আরও")}
              </button>
            );
          })()}
        </div>
      </nav>

      {/* Mobile "More" sheet */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end bg-ink/50 lg:hidden"
            onClick={() => setMoreOpen(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={tr("More", "আরও")}
              className="safe-bottom w-full rounded-t-2xl bg-white p-4 shadow-lift"
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <h2 className="text-lg font-extrabold">{tr("More", "আরও")}</h2>
                <button onClick={() => setMoreOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-paper-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {moreItems.map(({ href, icon: Icon, en, bn }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl border p-3.5 text-center text-xs font-semibold",
                      active(href) ? "border-ruchi-600 bg-ruchi-50 text-ruchi-700" : "border-paper-200 bg-paper text-ink-700"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                    {tr(en, bn)}
                  </Link>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                {isGuest ? (
                  <>
                    <Link href="/register" className="inline-flex h-12 items-center justify-center rounded-xl bg-ruchi-600 font-semibold text-white shadow-card">
                      {tr("Sign up free", "বিনামূল্যে সাইন আপ")}
                    </Link>
                    <Link href="/login?role=admin" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-paper-300 text-sm font-semibold">
                      <ShieldCheck className="h-4 w-4" /> {tr("Admin login", "অ্যাডমিন লগইন")}
                    </Link>
                  </>
                ) : (
                  <button onClick={() => { setMoreOpen(false); logout(); }} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-ruchi-200 bg-ruchi-50 font-semibold text-ruchi-700">
                    <LogOut className="h-4 w-4" /> {tr("Log out", "লগ আউট")}
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
