import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ruchi red
        ruchi: {
          50: "#fef3f2",
          100: "#fde4e2",
          200: "#fbcdc9",
          300: "#f7a8a2",
          400: "#ef6f68",
          500: "#e2392f",
          600: "#d1181f",
          700: "#ae1219",
          800: "#8d1317",
          900: "#5f0c10",
        },
        // Square green
        leaf: {
          50: "#f2f9f1",
          100: "#e0f1de",
          200: "#c2e3be",
          300: "#96cd91",
          400: "#62b25c",
          500: "#3d9a3f",
          600: "#2c8236",
          700: "#24672c",
          800: "#1e5025",
          900: "#173f1e",
        },
        gold: {
          100: "#fff1c7",
          400: "#ffc61a",
          500: "#f28c00",
          600: "#b86900",
        },
        paper: {
          DEFAULT: "#faf7f2",
          100: "#f3eee5",
          200: "#e7e0d2",
          300: "#d4cbb8",
        },
        ink: {
          DEFAULT: "#1c1917",
          700: "#44403c",
          500: "#78716c",
          400: "#a8a29e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "var(--font-bangla)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-bangla)", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,25,23,0.04), 0 4px 16px -4px rgba(28,25,23,0.08)",
        lift: "0 2px 4px rgba(28,25,23,0.06), 0 12px 28px -8px rgba(28,25,23,0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
