"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, CircleCheck, Target, UserPlus, Award, Bell } from "lucide-react";
import { useI18n, pick } from "@/lib/i18n";
import { notifications } from "@/lib/data";
import { timeAgo, cn } from "@/lib/utils";
import type { AppNotification } from "@/lib/types";

const iconFor: Record<AppNotification["type"], { icon: typeof Heart; cls: string }> = {
  reaction: { icon: Heart, cls: "bg-ruchi-600" },
  comment: { icon: MessageCircle, cls: "bg-ink" },
  approval: { icon: CircleCheck, cls: "bg-leaf-600" },
  mission: { icon: Target, cls: "bg-leaf-600" },
  follow: { icon: UserPlus, cls: "bg-ink" },
  badge: { icon: Award, cls: "bg-gold-500" },
};

export default function NotificationsPage() {
  const { lang, tr, t } = useI18n();
  const [readAll, setReadAll] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-3xl font-extrabold"><Bell className="h-7 w-7 text-ruchi-600" />{t("notifications")}</h1>
        <button onClick={() => setReadAll(true)} className="text-sm font-bold text-ruchi-700">{tr("Mark all read", "সব পড়া হয়েছে")}</button>
      </div>
      <div className="divide-y divide-paper-100 overflow-hidden rounded-2xl border border-paper-200 bg-white shadow-card">
        {notifications.map((n) => {
          const { icon: Icon, cls } = iconFor[n.type];
          const unread = !n.read && !readAll;
          return (
            <div key={n.id} className={cn("flex items-center gap-3 p-4", unread && "bg-ruchi-50/60")}>
              <div className="relative shrink-0">
                {n.avatar ? <Image src={n.avatar} alt="" width={44} height={44} className="h-11 w-11 rounded-full object-cover" /> : (
                  <span className={cn("grid h-11 w-11 place-items-center rounded-full text-white", cls)}><Icon className="h-5 w-5" /></span>
                )}
                {n.avatar && <span className={cn("absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full text-white ring-2 ring-white", cls)}><Icon className="h-3 w-3" /></span>}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug">{n.actor && <b>{n.actor} </b>}{pick(n.text, lang)}</p>
                <p className="mt-0.5 text-xs text-ink-500">{timeAgo(n.time, lang)}</p>
              </div>
              {unread && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-ruchi-600" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
