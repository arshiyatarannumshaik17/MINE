import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinematic: ["Cinzel", "serif"],
        dialogue: ["Plus Jakarta Sans", "sans-serif"],
        telugu: ["Noto Sans Telugu", "sans-serif"],
        script: ["Playfair Display", "serif"],
      },
      colors: {
        cosmos: {
          dark: "#05070f",
          deep: "#0a0d1d",
          card: "rgba(18, 24, 48, 0.7)",
          border: "rgba(255, 255, 255, 0.1)",
        },
      },
      aspectRatio: {
        cinema: "21 / 9",
        standard: "16 / 9",
        portrait: "9 / 16",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
