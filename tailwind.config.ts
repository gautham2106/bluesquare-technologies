import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EEF2FD",
          100: "#DCE5FB",
          200: "#B3C4F5",
          300: "#8AA3EF",
          400: "#4C71E3",
          500: "#1E4DD8",
          600: "#1A3FB8",
          700: "#153192",
          800: "#10246C",
          900: "#0B1A4E",
        },
        accent: {
          50: "#FFF8EB",
          100: "#FFEEC8",
          200: "#FFDD91",
          300: "#FFCB5A",
          400: "#FDB92E",
          500: "#F59E0B",
          600: "#D6820A",
          700: "#AE6608",
          800: "#874F06",
          900: "#5F3804",
        },
        ink: {
          DEFAULT: "#0B1220",
          light: "#101B34",
          muted: "#4A5578",
        },
        surface: {
          DEFAULT: "#F7F8FC",
          dark: "#070B14",
          darkcard: "#0D1526",
          card: "#FFFFFF",
          muted: "#EAEFFB",
        },
        success: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-jakarta)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      borderRadius: {
        sq: "6px",
        sqsm: "4px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 18, 32, 0.06), 0 1px 1px rgba(11, 18, 32, 0.04)",
        "card-dark": "0 1px 2px rgba(0, 0, 0, 0.4)",
        glow: "0 0 0 1px rgba(30, 77, 216, 0.15), 0 8px 24px -4px rgba(30, 77, 216, 0.25)",
        "fh-soft": "0 2px 8px rgba(11, 18, 32, 0.06), 0 1px 2px rgba(11, 18, 32, 0.04)",
        "fh-card": "0 4px 20px -4px rgba(30, 77, 216, 0.12), 0 2px 6px rgba(11, 18, 32, 0.05)",
      },
      keyframes: {
        "square-pulse": {
          "0%, 100%": { opacity: "0.15" },
          "50%": { opacity: "0.5" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "tick-in": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "60%": { transform: "scale(1.15)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "square-pulse": "square-pulse 3.4s ease-in-out infinite",
        blink: "blink 1.2s ease-in-out infinite",
        "tick-in": "tick-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
