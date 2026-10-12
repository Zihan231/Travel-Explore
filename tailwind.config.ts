import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ruchi red (calibrated to exact logo red #e91f27)
        ruchi: {
          50: "#fff1f2",
          100: "#ffe1e3",
          200: "#ffc8ca",
          300: "#ffa3a6",
          400: "#f86d73",
          500: "#f03c43",
          600: "#e91f27",
          700: "#b71f25",
          800: "#8f1b20",
          900: "#5a0e13",
        },
        // Forest green (calibrated to exact logo mountain green #006535)
        leaf: {
          50: "#edf8f2",
          100: "#d6f0e2",
          200: "#b0e1c7",
          300: "#7dcba7",
          400: "#3fa879",
          500: "#1e9363",
          600: "#006535",
          700: "#0b4b25",
          800: "#073821",
          900: "#0a2216",
        },
        // Warm sunset amber (calibrated to exact logo sunrise #ec9523)
        gold: {
          50: "#fef8ee",
          100: "#fdefd9",
          200: "#fbdcb3",
          300: "#f7c282",
          400: "#f2ab50",
          500: "#ec9523",
          600: "#d38029",
          700: "#a85f1c",
          800: "#7d4416",
          900: "#4f2a0b",
        },
        paper: {
          DEFAULT: "#faf7f2",
          100: "#f3eee5",
          200: "#e5dfd9",
          300: "#d4cbbe",
        },
        ink: {
          DEFAULT: "#221f1f",
          700: "#353330",
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
