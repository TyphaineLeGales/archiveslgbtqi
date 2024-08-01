import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./app/**/*.{ts,tsx}", "./sanity/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        tanker: ["var(--font-tanker)"],
        cityburn: ["var(--font-cityburn)"],
        jetbrains: ["var(--font-jetbrains)"],
      },
      transitionTimingFunction: {
        tamisitée: "cubic-bezier(0.6, 0.01, 0.05, 0.95)",
      },
      animation: {
        marquee: "marquee 10s linear infinite",
        "slow-pulse": "slow-pulse 3s ease-in-out infinite",
        "translate-squeezed":
          "translate-squeezed 0.5s 5s infinite running slidein",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "slow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "translate-squeezed": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-10%) " },
        },
      },
      colors: {
        "white-primary": "#F7F7F7",
        "black-primary": "#121212",
        "pink-arch": "#FC5F8C",
      },
      fontSize: {
        headerMobile: "1.5rem",
        headerDesktop: "1.1875rem",
      },
      height: {
        headerMobile: "1.5rem",
        headerDesktop: "1.1875rem",
      },
      lineHeight: {
        headerMobile: "1.8rem",
        headerDesktop: "1.5rem",
      },
      margin: {
        arch: "19.25rem",
      },

      padding: {
        bottomPage: "7rem",
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config;
