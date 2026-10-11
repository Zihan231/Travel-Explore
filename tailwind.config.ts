import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bangladesh nature palette
        forest: {
          50: "#f0f7f1",
          100: "#dcebde",
          200: "#bbd7c0",
          300: "#8fbb98",
          400: "#5e986b",
          500: "#3f7c4d",
          600: "#2d623b",
          700: "#254f30",
          800: "#1f3f28",
          900: "#1a3422",
          950: "#0d1d12",
        },
        amber: {
          50: "#fff9ed",
          100: "#fff1d4",
          200: "#ffdfa8",
          300: "#ffc770",
          400: "#ffa436",
          500: "#ff880f",
          600: "#f06d05",
          700: "#c75107",
          800: "#9e400e",
          900: "#7f370f",
        },
        sand: {
          50: "#fdfcf8",
          100: "#faf6ec",
          200: "#f4ecd4",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
        bangla: ["var(--font-bangla)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px -4px rgba(31, 63, 40, 0.12)",
        card: "0 8px 30px -8px rgba(31, 63, 40, 0.18)",
        glow: "0 0 40px -8px rgba(255, 136, 15, 0.4)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
