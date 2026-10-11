"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  LayoutDashboard,
  MapPinned,
  ClipboardCheck,
  Camera,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { currentUser } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand";
import { LangToggle } from "@/components/lang-toggle";
import { RightRail } from "@/components/right-rail";

type Item = { href: string; icon: LucideIcon; en: string; bn: string };

const touristNav: Item[] = [
  { href: "/home", icon: Home, en: "Home", bn: "হোম" },
  { href: "/explore", icon: Compass, en: "Explore", bn: "এক্সপ্লোর" },
  { href: "/passport", icon: BookMarked, en: "Passport", bn: "পাসপোর্ট" },
  { href: "/feed", icon: Newspaper, en: "Feed", bn: "ফিড" },
  { href: "/spots", icon: Sparkles, en: "Hidden spots", bn: "গোপন স্থান" },
  { href: "/reels", icon: Clapperboard, en: "Reels", bn: "রিলস" },
  { href: "/leaderboard", icon: Trophy, en: "Leaderboard", bn: "লিডারবোর্ড" },
  { href: "/profile", icon: User, en: "Profile", bn: "প্রোফাইল" },
  { href: "/settings", icon: Settings, en: "Settings", bn: "সেটিংস" },
];

const adminNav: Item[] = [
  { href: "/home", icon: LayoutDashboard, en: "Dashboard", bn: "ড্যাশবোর্ড" },
  { href: "/explore", icon: MapPinned, en: "Destinations", bn: "গন্তব্য" },
  { href: "/spots", icon: ClipboardCheck, en: "Spot reviews", bn: "স্পট রিভিউ" },
  { href: "/passport", icon: Camera, en: "Check-ins", bn: "চেক-ইন" },
  { href: "/feed", icon: Newspaper, en: "Feed", bn: "ফিড" },
  { href: "/reels", icon: Clapperboard, en: "Reels", bn: "রিলস" },
  { href: "/leaderboard", icon: Trophy, en: "Leaderboard", bn: "লিডারবোর্ড" },
  { href: "/settings", icon: Settings, en: "Settings", bn: "সেটিংস" },
];

const touristTabs = ["/home", "/explore", "/passport", "/reels", "/profile"];
const adminTabs = ["/home", "/explore", "/spots", "/passport", "/settings"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { tr } = useI18n();
  const { isAdmin, signOut } = useAuth();

  const nav = isAdmin ? adminNav : touristNav;
  const tabHrefs = isAdmin ? adminTabs : touristTabs;
  const allItems = isAdmin ? adminNav : touristNav;
  const tabs = tabHrefs
    .map((h) => allItems.find((i) => i.href === h) ?? { href: h, icon: User, en: "Profile", bn: "প্রোফাইল" })
    .map((i) => i);

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

  const showBottom = scrolled || short || pathname.startsWith("/reels");
  const hideTop = scrolled || pathname.startsWith("/reels");

  const active = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <div className="min-h-dvh bg-paper">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-paper-200 bg-white lg:flex">
        <div className="px-5 pb-5 pt-6">
          <Logo href="/home" />
          {isAdmin && (
            <span className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
              <ShieldCheck className="h-3.5 w-3.5" />
              {tr("Admin console", "অ্যাডমিন কনসোল")}
            </span>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3">
          {nav.map(({ href, icon: Icon, en, bn }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                active(href)
                  ? "bg-ruchi-50 text-ruchi-700"
                  : "text-ink-700 hover:bg-paper-100"
              )}
            >
              <Icon className={cn("h-[18px] w-[18px]", active(href) ? "text-ruchi-600" : "text-ink-500 group-hover:text-ink")} />
              {tr(en, bn)}
              {active(href) && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-ruchi-600" />}
            </Link>
          ))}
        </nav>

        <div className="space-y-3 border-t border-paper-200 p-4">
          <LangToggle className="w-full justify-center" />
          <div className="flex items-center gap-2.5">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{isAdmin ? "Square Admin" : currentUser.name}</p>
              <p className="truncate text-xs text-ink-500">
                {isAdmin ? "admin@squaregroup" : `@${currentUser.username}`}
              </p>
            </div>
            <button
              onClick={logout}
              aria-label={tr("Log out", "লগ আউট")}
              className="grid h-9 w-9 place-items-center rounded-lg text-ink-500 hover:bg-paper-100 hover:text-ruchi-700"
            >
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className={cn("sticky top-0 z-40 border-b border-paper-200 bg-white transition-transform duration-300 lg:hidden", hideTop && "-translate-y-full")}>
        <div className="flex items-center justify-between px-4 py-2.5">
          <Logo href="/home" />
          <div className="flex items-center gap-1.5">
            <LangToggle />
            <Link
              href="/notifications"
              aria-label={tr("Notifications", "নোটিফিকেশন")}
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-paper-200 bg-white"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-ruchi-600 ring-2 ring-white" />
            </Link>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center gap-1.5 bg-ink px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white">
            <ShieldCheck className="h-3.5 w-3.5" />
            {tr("Admin console", "অ্যাডমিন কনসোল")}
          </div>
        )}
      </header>

      {/* Desktop top actions */}
      <div className="fixed right-6 top-5 z-30 hidden items-center gap-2 lg:flex xl:hidden">
        <Link
          href="/notifications"
          aria-label={tr("Notifications", "নোটিফিকেশন")}
          className="relative grid h-10 w-10 place-items-center rounded-lg border border-paper-200 bg-white shadow-card"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-ruchi-600 ring-2 ring-white" />
        </Link>
        <Link
          href="/create"
          className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-ruchi-600 px-4 text-sm font-semibold text-white shadow-card hover:bg-ruchi-700"
        >
          <Plus className="h-4 w-4" />
          {isAdmin ? tr("Add destination", "গন্তব্য যোগ") : tr("Create", "পোস্ট")}
        </Link>
      </div>

      <main className="lg:pl-64">
        <div className="mx-auto w-full max-w-[1320px] xl:flex xl:items-start xl:gap-2 xl:px-6">
          <div className={cn("mx-auto w-full min-w-0 max-w-2xl px-4 pb-28 pt-5 lg:max-w-[820px] lg:px-8 lg:pb-12 lg:pt-8 xl:mx-0 xl:flex-1", pathname.startsWith("/reels") && "xl:max-w-[820px]")}>
            {children}
          </div>
          {!pathname.startsWith("/reels") && (
            <aside className="hidden w-[22rem] shrink-0 pt-8 xl:block">
              <RightRail />
            </aside>
          )}
        </div>
      </main>

      {/* Mobile create button */}
      <Link
        href="/create"
        aria-label={isAdmin ? tr("Add destination", "গন্তব্য যোগ") : tr("Create", "পোস্ট")}
        className={cn("fixed right-4 z-40 grid h-12 w-12 place-items-center rounded-xl bg-ruchi-600 text-white shadow-lift transition-all duration-300 active:scale-95 lg:hidden", showBottom ? "bottom-[76px]" : "bottom-5")}
      >
        <Plus className="h-6 w-6" />
      </Link>

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
        </div>
      </nav>
    </div>
  );
}
