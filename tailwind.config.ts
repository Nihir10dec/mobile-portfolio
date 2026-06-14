import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["SF Mono", "Fira Code", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        obsidian: {
          surface: "var(--surface)",
          "surface-dim": "var(--surface-dim)",
          "surface-low": "var(--surface-container-low)",
          "surface-mid": "var(--surface-container)",
          "surface-high": "var(--surface-container-high)",
          "surface-highest": "var(--surface-container-highest)",
          "surface-bright": "var(--surface-bright)",
          "surface-variant": "var(--surface-variant)",
        },
        brand: {
          primary: "var(--primary)",
          "primary-container": "var(--primary-container)",
          "primary-dim": "var(--primary-dim)",
          tertiary: "var(--tertiary)",
          "tertiary-container": "var(--tertiary-container)",
        },
        text: {
          primary: "var(--on-surface)",
          secondary: "var(--on-surface-variant)",
          outline: "var(--outline)",
          "outline-variant": "var(--outline-variant)",
        },
        app: {
          netflix: "var(--netflix-red)",
          instagram: "var(--instagram-pink)",
          linkedin: "var(--linkedin-blue)",
          github: "var(--github-dark)",
          whatsapp: "var(--whatsapp-green)",
          spotify: "var(--spotify-green)",
          maps: "var(--maps-green)",
          notes: "var(--notes-yellow)",
          calendar: "var(--calendar-red)",
          mail: "var(--mail-blue)",
          phone: "var(--phone-green)",
          medium: "var(--medium-dark)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--ring))",
          foreground: "hsl(var(--foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        squircle: "22%",
        device: "2.75rem",
        "device-inner": "2.35rem",
      },
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
        "88": "22rem",
        "device-w": "375px",
        "device-h": "812px",
      },
      boxShadow: {
        device:
          "0 0 0 1px rgba(255,255,255,0.05), 0 25px 50px -12px rgba(0,0,0,0.7), 0 0 80px rgba(0,122,255,0.08)",
        "device-light":
          "0 0 0 1px rgba(0,0,0,0.1), 0 25px 50px -12px rgba(0,0,0,0.3), 0 0 80px rgba(0,122,255,0.05)",
        "icon-glow": "0 4px 20px rgba(0,0,0,0.4)",
        ambient: "0 0 120px 60px",
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
        "app-open": {
          "0%": {
            transform: "scale(0.3)",
            opacity: "0",
            borderRadius: "24px",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
            borderRadius: "0",
          },
        },
        "app-close": {
          "0%": {
            transform: "scale(1)",
            opacity: "1",
            borderRadius: "0",
          },
          "100%": {
            transform: "scale(0.3)",
            opacity: "0",
            borderRadius: "24px",
          },
        },
        "morph-device": {
          "0%": { borderRadius: "2.75rem" },
          "50%": { borderRadius: "1.5rem" },
          "100%": { borderRadius: "2.75rem" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "app-open": "app-open 0.45s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "app-close": "app-close 0.35s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        "morph-device": "morph-device 0.6s cubic-bezier(0.32, 0.72, 0, 1)",
      },
      backgroundImage: {
        "obsidian-gradient":
          "linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)",
        "obsidian-streak":
          "linear-gradient(-35deg, transparent 30%, rgba(180,120,140,0.08) 45%, rgba(80,160,170,0.06) 55%, transparent 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
