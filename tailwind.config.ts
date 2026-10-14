import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f3f1ff",
          100: "#ebe5ff",
          200: "#d9ceff",
          300: "#bea6ff",
          400: "#9f75ff",
          500: "#843dff",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        ink: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d5dae3",
          300: "#b1bac9",
          400: "#8794ab",
          500: "#68778f",
          600: "#535f76",
          700: "#444e61",
          800: "#2b3342",
          900: "#161b26",
          950: "#0b0e15",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-tajawal)", "system-ui", "sans-serif"],
        display: ["var(--font-sora)", "var(--font-tajawal)", "system-ui", "sans-serif"],
        arabic: ["var(--font-tajawal)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgb(11 14 21 / 0.18)",
        lift: "0 18px 50px -18px rgb(11 14 21 / 0.28)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
