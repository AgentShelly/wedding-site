import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cenote Luxe palette — maps to CSS variables
        limestone: {
          50: "var(--color-limestone-50)",
          100: "var(--color-limestone-100)",
          200: "var(--color-limestone-200)",
          900: "var(--color-limestone-900)",
        },
        emerald: {
          50: "var(--color-emerald-50)",
          500: "var(--color-emerald-500)",
          700: "var(--color-emerald-700)",
        },
        gold: {
          400: "var(--color-gold-400)",
          500: "var(--color-gold-500)",
          600: "var(--color-gold-600)",
        },
        ink: {
          300: "var(--color-ink-300)",
          600: "var(--color-ink-600)",
          900: "var(--color-ink-900)",
        },
        line: "var(--color-line)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
