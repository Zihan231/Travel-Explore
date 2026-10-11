"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Lang = "en" | "bn";

type Dict = Record<string, { en: string; bn: string }>;

export const dict: Dict = {
  appName: { en: "Tour Story", bn: "ট্যুর স্টোরি" },
  tagline: {
    en: "Collect Bangladesh, one stamp at a time",
    bn: "এক স্ট্যাম্পে বাংলাদেশ জয় করুন",
  },
  // Nav
  home: { en: "Home", bn: "হোম" },
  explore: { en: "Explore", bn: "এক্সপ্লোর" },
  passport: { en: "Passport", bn: "পাসপোর্ট" },
  map: { en: "Map", bn: "ম্যাপ" },
  reels: { en: "Reels", bn: "রিলস" },
  feed: { en: "Feed", bn: "ফিড" },
  spots: { en: "Hidden Spots", bn: "গোপন স্থান" },
  leaderboard: { en: "Leaderboard", bn: "লিডারবোর্ড" },
  profile: { en: "Profile", bn: "প্রোফাইল" },
  settings: { en: "Settings", bn: "সেটিংস" },
  notifications: { en: "Notifications", bn: "নোটিফিকেশন" },
  admin: { en: "Admin", bn: "অ্যাডমিন" },
  create: { en: "Create", bn: "পোস্ট" },
  // Auth
  login: { en: "Log in", bn: "লগ ইন" },
  register: { en: "Sign up", bn: "রেজিস্টার" },
  logout: { en: "Log out", bn: "লগ আউট" },
  email: { en: "Email", bn: "ইমেইল" },
  password: { en: "Password", bn: "পাসওয়ার্ড" },
  fullName: { en: "Full name", bn: "পূর্ণ নাম" },
  continueGoogle: { en: "Continue with Google", bn: "গুগল দিয়ে চালিয়ে যান" },
  noAccount: { en: "Don't have an account?", bn: "অ্যাকাউন্ট নেই?" },
  haveAccount: { en: "Already have an account?", bn: "অ্যাকাউন্ট আছে?" },
  // Home
  greeting: { en: "Hello", bn: "হ্যালো" },
  journeyBegins: { en: "Your journey is just beginning", bn: "আপনার যাত্রা সবে শুরু" },
  destinations: { en: "Destinations", bn: "গন্তব্য" },
  explorerLevel: { en: "Explorer Level", bn: "এক্সপ্লোরার লেভেল" },
  completed: { en: "Completed", bn: "সম্পন্ন" },
  nextStops: { en: "Next stops", bn: "পরবর্তী গন্তব্য" },
  continueExploring: { en: "Continue exploring", bn: "এক্সপ্লোর চালিয়ে যান" },
  // Place
  checkin: { en: "Check in", bn: "চেক ইন" },
  checkinCollect: { en: "Check-in & collect stamp", bn: "চেক-ইন ও স্ট্যাম্প সংগ্রহ" },
  whyVisit: { en: "Why visit?", bn: "কেন যাবেন?" },
  howToReach: { en: "How to reach", bn: "কীভাবে যাবেন" },
  bestTime: { en: "Best time", bn: "সেরা সময়" },
  budget: { en: "Budget", bn: "বাজেট" },
  mission: { en: "Mission", bn: "মিশন" },
  viewDetails: { en: "View details", bn: "বিস্তারিত দেখুন" },
  localTips: { en: "Local tips", bn: "স্থানীয় টিপস" },
  // Check-in flow
  enableLocation: { en: "Enable location", bn: "লোকেশন চালু করুন" },
  locationNeeded: {
    en: "We need your location to verify you're really here",
    bn: "আপনি সত্যিই এখানে আছেন যাচাই করতে লোকেশন প্রয়োজন",
  },
  recordSelfie: { en: "Record a selfie video", bn: "সেলফি ভিডিও রেকর্ড করুন" },
  selfieHint: {
    en: "Turn around and show us the view! Front camera only.",
    bn: "চারপাশ ঘুরে দৃশ্য দেখান! শুধু ফ্রন্ট ক্যামেরা।",
  },
  youreHere: { en: "You're here!", bn: "আপনি এখানে!" },
  stampCollected: { en: "Stamp collected!", bn: "স্ট্যাম্প সংগ্রহ হয়েছে!" },
  // Stamps
  collectedStamps: { en: "Collected stamps", bn: "সংগৃহীত স্ট্যাম্প" },
  stamps: { en: "Stamps", bn: "স্ট্যাম্প" },
  missions: { en: "Missions", bn: "মিশন" },
  badges: { en: "Badges", bn: "ব্যাজ" },
  rare: { en: "Rare", bn: "দুর্লভ" },
  locked: { en: "Locked", bn: "লক করা" },
  // Posts
  react: { en: "React", bn: "রিয়্যাক্ট" },
  comment: { en: "Comment", bn: "মন্তব্য" },
  share: { en: "Share", bn: "শেয়ার" },
  writePost: { en: "Write a post…", bn: "কিছু লিখুন…" },
  addPhotos: { en: "Add photos / videos", bn: "ছবি / ভিডিও যোগ করুন" },
  post: { en: "Post", bn: "পোস্ট করুন" },
  submitSpot: { en: "Submit hidden spot", bn: "গোপন স্থান জমা দিন" },
  pendingReview: { en: "Pending review", bn: "পর্যালোচনাধীন" },
  // Leaderboard
  thisWeek: { en: "This week", bn: "এই সপ্তাহ" },
  allTime: { en: "All time", bn: "সর্বকালের" },
  explorerOfMonth: { en: "Explorer of the month", bn: "মাসের সেরা এক্সপ্লোরার" },
  // Map
  journeyMap: { en: "Journey Map", bn: "যাত্রা ম্যাপ" },
  download: { en: "Download", bn: "ডাউনলোড" },
  myJourney: { en: "My journey", bn: "আমার যাত্রা" },
  placesVisited: { en: "places visited", bn: "স্থান ভ্রমণ করা" },
  // Admin
  manageDestinations: { en: "Manage destinations", bn: "গন্তব্য পরিচালনা" },
  submissions: { en: "Submissions", bn: "জমাসমূহ" },
  checkins: { en: "Check-ins", bn: "চেক-ইন" },
  approve: { en: "Approve", bn: "অনুমোদন" },
  reject: { en: "Reject", bn: "বাতিল" },
  addDestination: { en: "Add destination", bn: "গন্তব্য যোগ করুন" },
  pending: { en: "Pending", bn: "অপেক্ষমাণ" },
  approved: { en: "Approved", bn: "অনুমোদিত" },
  rejected: { en: "Rejected", bn: "বাতিল" },
  // Settings
  account: { en: "Account", bn: "অ্যাকাউন্ট" },
  changePassword: { en: "Change password", bn: "পাসওয়ার্ড পরিবর্তন" },
  language: { en: "Language", bn: "ভাষা" },
  darkMode: { en: "Dark mode", bn: "ডার্ক মোড" },
  pushNotifications: { en: "Push notifications", bn: "পুশ নোটিফিকেশন" },
  privacy: { en: "Privacy", bn: "গোপনীয়তা" },
  help: { en: "Help & support", bn: "সাহায্য ও সহায়তা" },
  // Common
  seeAll: { en: "See all", bn: "সব দেখুন" },
  search: { en: "Search destinations…", bn: "গন্তব্য খুঁজুন…" },
  all: { en: "All", bn: "সব" },
  save: { en: "Save", bn: "সেভ" },
  cancel: { en: "Cancel", bn: "বাতিল" },
  back: { en: "Back", bn: "পিছনে" },
  getStarted: { en: "Get started", bn: "শুরু করুন" },
  viewMap: { en: "View map", bn: "ম্যাপ দেখুন" },
  streak: { en: "day streak", bn: "দিনের ধারা" },
  level: { en: "Level", bn: "লেভেল" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "bn") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
    document.documentElement.lang = l;
  };

  const t = (key: keyof typeof dict) => dict[key]?.[lang] ?? String(key);

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      <div className={lang === "bn" ? "font-bangla" : ""}>{children}</div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

/** Pick localized field from a {en, bn} pair */
export function pick<T>(obj: { en: T; bn: T }, lang: Lang): T {
  return obj[lang];
}
