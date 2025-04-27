import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00cbdd",
          foreground: "#00031b",
        },
        secondary: {
          DEFAULT: "#00031b",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "rgba(0, 203, 221, 0.1)",
          foreground: "#00cbdd",
        },
        accent: {
          DEFAULT: "rgba(0, 203, 221, 0.2)",
          foreground: "#00cbdd",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        cyber: {
          cyan: "#00cbdd",
          dark: "#00031b",
          glow: "#00cbdd80",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 8px 2px rgba(0, 203, 221, 0.3)" },
          "50%": { boxShadow: "0 0 15px 5px rgba(0, 203, 221, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        scanning: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2s infinite",
        float: "float 3s ease-in-out infinite",
        scanning: "scanning 8s linear infinite",
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(rgba(0, 203, 221, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 203, 221, 0.1) 1px, transparent 1px)",
        "cyber-gradient": "linear-gradient(135deg, #00031b 0%, #000a2e 100%)",
        "cyber-glow": "radial-gradient(circle, rgba(0, 203, 221, 0.15) 0%, rgba(0, 3, 27, 0) 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config

