import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Baloo_Da_2, Hind_Siliguri } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "@/components/providers";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Baloo_Da_2({
  subsets: ["latin", "bengali"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const bangla = Hind_Siliguri({
  subsets: ["bengali"],
  variable: "--font-bangla",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tourstory.app"),
  title: {
    default: "Ruchi Explore Limitless — Collect Bangladesh, one stamp at a time",
    template: "%s · Ruchi Explore Limitless",
  },
  description:
    "A Ruchi initiative by Square Food & Beverage. Check in at Bangladesh's best destinations, collect stamps, share your journey and climb the leaderboard.",
  keywords: ["Ruchi", "Square", "Bangladesh travel", "Cox's Bazar", "Sylhet", "Sajek", "Sundarbans", "tourism"],
  openGraph: {
    title: "Ruchi Explore Limitless",
    description: "Check in, collect stamps and share your journey across Bangladesh.",
    type: "website",
    locale: "en_BD",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#d1181f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${display.variable} ${bangla.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
