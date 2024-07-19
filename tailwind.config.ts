import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      transitionTimingFunction: {
        tamisitée: "cubic-bezier(0.6, 0.01, 0.05, 0.95)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
          // "100%": { transform: "translateX(calc(-100% + 6rem))" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      colors: {
        "white-primary": "#F7F7F7",
        "black-primary": "#121212",
        "pink-arch": "#FC5F8C",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
