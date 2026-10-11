"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LogIn, UserPlus, X, Lock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export type Role = "guest" | "tourist" | "admin";

type Ctx = {
  role: Role;
  ready: boolean;
  isAdmin: boolean;
  isAuthed: boolean;
  isGuest: boolean;
  signIn: (role: "tourist" | "admin") => void;
  signOut: () => void;
  /** Returns true if the user may proceed; otherwise opens the login prompt. */
  requireAuth: (reason?: { en: string; bn: string }) => boolean;
};

const AuthContext = createContext<Ctx | null>(null);
const KEY = "ruchi-tour-role";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { tr } = useI18n();
  const [role, setRole] = useState<Role>("guest");
  const [ready, setReady] = useState(false);
  const [prompt, setPrompt] = useState<{ en: string; bn: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "admin" || saved === "tourist") setRole(saved);
    } catch {}
    setReady(true);
  }, []);

  const signIn = (r: "tourist" | "admin") => {
    setRole(r);
    try {
      localStorage.setItem(KEY, r);
    } catch {}
  };

  const signOut = () => {
    setRole("guest");
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };

  const requireAuth = useCallback(
    (reason?: { en: string; bn: string }) => {
      if (role !== "guest") return true;
      setPrompt(reason ?? { en: "Log in to continue", bn: "চালিয়ে যেতে লগ ইন করুন" });
      return false;
    },
    [role]
  );

  return (
    <AuthContext.Provider
      value={{ role, ready, isAdmin: role === "admin", isAuthed: role !== "guest", isGuest: role === "guest", signIn, signOut, requireAuth }}
    >
      {children}
      <AnimatePresence>
        {prompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/50 p-4 sm:items-center"
            onClick={() => setPrompt(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lift"
            >
              <button onClick={() => setPrompt(null)} aria-label="Close" className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-lg text-ink-500 hover:bg-paper-100">
                <X className="h-4 w-4" />
              </button>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-ruchi-50 text-ruchi-600">
                <Lock className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-2xl font-extrabold">{tr(prompt.en, prompt.bn)}</h2>
              <p className="mt-1.5 text-sm text-ink-500">
                {tr("You can browse freely. Join Ruchi Tour Story to react, post, check in and collect stamps.", "আপনি স্বাধীনভাবে ঘুরে দেখতে পারেন। রিয়্যাক্ট, পোস্ট, চেক-ইন ও স্ট্যাম্প সংগ্রহ করতে রুচি ট্যুর স্টোরিতে যোগ দিন।")}
              </p>
              <div className="mt-5 grid gap-2.5">
                <Link href="/login" onClick={() => setPrompt(null)} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-ruchi-600 font-semibold text-white shadow-card hover:bg-ruchi-700">
                  <LogIn className="h-4 w-4" /> {tr("Log in", "লগ ইন")}
                </Link>
                <Link href="/register" onClick={() => setPrompt(null)} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-paper-300 font-semibold hover:bg-paper">
                  <UserPlus className="h-4 w-4" /> {tr("Create free account", "বিনামূল্যে অ্যাকাউন্ট খুলুন")}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
