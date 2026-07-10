import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        steel: {
          50: "#f5f7f8",
          100: "#e7ecef",
          200: "#cbd5da",
          300: "#a6b4bc",
          400: "#7a8c96",
          500: "#5f7079",
          600: "#4b5961",
          700: "#3d484f",
          800: "#222a30",
          900: "#141a1f",
          950: "#0a0e12"
        },
        graphite: {
          50: "#f6f7f7",
          100: "#e5e8e8",
          200: "#cdd2d4",
          300: "#aab3b7",
          400: "#808c92",
          500: "#657178",
          600: "#4f5960",
          700: "#41494f",
          800: "#363c42",
          900: "#171b1f",
          950: "#0d1013"
        },
        katyusha: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#e11d48",
          600: "#be123c",
          700: "#9f1239",
          800: "#881337",
          900: "#4c0519"
        },
        warm: {
          50: "#fff8ed",
          100: "#ffefd4",
          200: "#fedaa8",
          300: "#fdbf71",
          400: "#fb9b38",
          500: "#f58114",
          600: "#d6630a"
        },
        signal: {
          50: "#fff8e6",
          100: "#ffedb8",
          200: "#ffdc7a",
          300: "#ffc947",
          400: "#f5ac13",
          500: "#d98d05",
          600: "#b66b00"
        },
        concrete: {
          50: "#faf9f6",
          100: "#f0eee9",
          200: "#ded9cf",
          300: "#c6bfb2"
        }
      },
      boxShadow: {
        soft: "0 24px 70px rgba(10, 14, 18, 0.22)",
        card: "0 18px 46px rgba(10, 14, 18, 0.14)",
        "inner-line": "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.24)"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2rem"
      }
    }
  },
  plugins: []
};

export default config;
