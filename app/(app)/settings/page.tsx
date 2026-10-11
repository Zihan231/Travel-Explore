"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User, Lock, Bell, Shield, CircleHelp, LogOut, ChevronRight, Languages, Info, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { currentUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { LangToggle } from "@/components/lang-toggle";
import { cn } from "@/lib/utils";

const field = "h-11 w-full rounded-lg border border-paper-300 bg-white px-3.5 text-sm outline-none focus:border-ruchi-600 focus:ring-2 focus:ring-ruchi-600/15";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-ink-500">{title}</p>
      <div className="divide-y divide-paper-100 overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card">{children}</div>
    </div>
  );
}

function Row({ icon: Icon, label, onClick, right }: { icon: typeof User; label: string; onClick?: () => void; right?: React.ReactNode }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-paper">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper-100 text-ink-700"><Icon className="h-[18px] w-[18px]" /></span>
      <span className="flex-1 font-semibold">{label}</span>
      {right ?? <ChevronRight className="h-5 w-5 text-ink-400" />}
    </button>
  );
}

export default function SettingsPage() {
  const { tr, t } = useI18n();
  const { isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [push, setPush] = useState(true);
  const [pw, setPw] = useState(false);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-extrabold">{t("settings")}</h1>

      <Link href={isAdmin ? "/home" : "/profile"} className="flex items-center gap-3 rounded-2xl border border-paper-200 bg-white p-4 shadow-card">
        <Image src={currentUser.avatar} alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-xl object-cover" />
        <div className="flex-1">
          <p className="font-bold">{isAdmin ? "Square Admin" : currentUser.name}</p>
          <p className="text-sm text-ink-500">{isAdmin ? tr("Administrator", "অ্যাডমিনিস্ট্রেটর") : `@${currentUser.username}`}</p>
        </div>
        <ChevronRight className="h-5 w-5 text-ink-400" />
      </Link>

      <Group title={t("account")}>
        <Row icon={User} label={tr("Edit profile", "প্রোফাইল এডিট")} onClick={() => toast.info(tr("Opens profile editor", "প্রোফাইল এডিটর খুলবে"))} />
        <Row icon={Lock} label={t("changePassword")} onClick={() => setPw((v) => !v)} right={<ChevronDown className={cn("h-5 w-5 text-ink-400 transition-transform", pw && "rotate-180")} />} />
        {pw && (
          <form className="space-y-2.5 bg-paper p-4" onSubmit={(e) => { e.preventDefault(); setPw(false); toast.success(tr("Password updated", "পাসওয়ার্ড আপডেট হয়েছে")); }}>
            <input type="password" required placeholder={tr("Current password", "বর্তমান পাসওয়ার্ড")} className={field} />
            <input type="password" required placeholder={tr("New password", "নতুন পাসওয়ার্ড")} className={field} />
            <input type="password" required placeholder={tr("Confirm new password", "নতুন পাসওয়ার্ড নিশ্চিত করুন")} className={field} />
            <Button type="submit" className="w-full">{tr("Update password", "পাসওয়ার্ড আপডেট")}</Button>
          </form>
        )}
        <Row icon={Shield} label={t("privacy")} />
      </Group>

      <Group title={tr("Preferences", "পছন্দসমূহ")}>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper-100 text-ink-700"><Languages className="h-[18px] w-[18px]" /></span>
          <span className="flex-1 font-semibold">{t("language")}</span>
          <LangToggle />
        </div>
        <div className="flex items-center gap-3 px-4 py-3.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-paper-100 text-ink-700"><Bell className="h-[18px] w-[18px]" /></span>
          <span className="flex-1 font-semibold">{t("pushNotifications")}</span>
          <button onClick={() => setPush((v) => !v)} role="switch" aria-checked={push} aria-label={t("pushNotifications")} className={cn("relative h-7 w-12 rounded-full transition-colors", push ? "bg-leaf-600" : "bg-paper-300")}>
            <span className={cn("absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all", push ? "left-6" : "left-1")} />
          </button>
        </div>
      </Group>

      <Group title={tr("Support", "সহায়তা")}>
        <Row icon={CircleHelp} label={t("help")} />
        <Row icon={Info} label={tr("About Ruchi Tour Story", "রুচি ট্যুর স্টোরি সম্পর্কে")} />
      </Group>

      <Button variant="danger" size="lg" className="w-full" onClick={() => { signOut(); router.push("/"); }}>
        <LogOut className="h-5 w-5" /> {t("logout")}
      </Button>
      <p className="pb-4 text-center text-xs text-ink-500">Ruchi Tour Story v1.0 · Square Food &amp; Beverage Ltd.</p>
    </div>
  );
}
