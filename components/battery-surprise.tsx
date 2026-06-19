"use client"

import { toast } from "sonner"
import { useBattery } from "@/hooks/use-battery"
import { useDevice } from "@/hooks/use-device"
import { SOCIAL_URLS } from "@/lib/site"
import { portfolioData } from "@/data/portfolio"
import { haptic } from "@/lib/haptics"

const [GITHUB_URL, LINKEDIN_URL, INSTAGRAM_URL] = SOCIAL_URLS

const MAILTO_URL = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(
  "Your portfolio just made my day ⚡",
)}&body=${encodeURIComponent(
  `Hi ${portfolioData.personal.firstName},\n\nI was exploring your portfolio and had to send some appreciation. ` +
  `Here's a little charge for your battery!\n\n`,
)}`

interface ChargeOption {
  label: string
  sublabel: string
  icon: React.ReactNode
  url: string
  toast: string
}

const CHARGE_OPTIONS: ChargeOption[] = [
  {
    label: "Star on GitHub",
    sublabel: "+40% — fuels late-night commits",
    url: `${GITHUB_URL}/mobile-portfolio`,
    toast: "⚡ Thanks for the star — battery topped up!",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Connect on LinkedIn",
    sublabel: "+30% — professional power cells",
    url: LINKEDIN_URL,
    toast: "⚡ Charged up — thanks for connecting!",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    label: "Follow on Instagram",
    sublabel: "+20% — a little aesthetic juice",
    url: INSTAGRAM_URL,
    toast: "⚡ Battery boosted — thanks for the follow!",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.4-10.4a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    label: "Send an appreciation mail",
    sublabel: "+50% — the purest energy source",
    url: MAILTO_URL,
    toast: "⚡ Fully charged — your kind words mean a lot!",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 6.5l8.5 6 8.5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function BatterySurprise() {
  const { phase, charge, triggerCrash } = useBattery()
  const { device, theme } = useDevice()
  const isDark = theme === "dark"
  const isIphone = device === "iphone"

  if (phase === "idle" || phase === "draining" || phase === "charging") {
    return null
  }

  // ── The low-battery prompt ────────────────────────────────────────────────
  if (phase === "low") {
    return (
      <div
        className="absolute inset-0 z-60 flex items-center justify-center px-6"
        style={{ animation: "battery-fade-in 0.3s ease both" }}
        role="dialog"
        aria-modal="true"
        aria-label="Low Battery"
      >
        {/* Dimmed, blurred backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

        {/* iOS-style alert card */}
        <div
          className="relative w-full max-w-[300px] overflow-hidden rounded-[26px] shadow-2xl"
          style={{
            background: isDark ? "rgba(40,40,44,0.92)" : "rgba(250,250,252,0.94)",
            backdropFilter: "blur(20px)",
            animation: "battery-pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
        >
          <div className="px-5 pt-6 pb-4 text-center">
            {/* Battery glyph */}
            <div className="mx-auto mb-3 flex items-center justify-center">
              <div className="relative" style={{ width: "44px", height: "22px" }}>
                <div
                  className="absolute inset-0 rounded-[5px]"
                  style={{ border: `2px solid ${isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}` }}
                />
                <div
                  className="absolute left-[3px] top-[3px] bottom-[3px] rounded-[2px]"
                  style={{ width: "7px", background: "#ff3b30" }}
                />
                <div
                  className="absolute top-1/2 right-[-3px] -translate-y-1/2 rounded-r-[1px]"
                  style={{ width: "3px", height: "9px", background: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}
                />
              </div>
            </div>

            <h2
              className="text-[17px] font-semibold"
              style={{ color: isDark ? "#fff" : "#000" }}
            >
              Low Battery
            </h2>
            <p
              className="mt-1 text-[13px] leading-snug"
              style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)" }}
            >
              20% remaining. This portfolio runs on good vibes — how would you
              like to charge me up?
            </p>
          </div>

          {/* Charge options */}
          <div className="px-3 pb-2 space-y-1.5">
            {CHARGE_OPTIONS.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  haptic(10)
                  charge(opt.url)
                  toast.success(opt.toast)
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors active:scale-[0.98]"
                style={{ background: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "#34c759",
                    color: "#fff",
                  }}
                >
                  {opt.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-[14px] font-medium"
                    style={{ color: isDark ? "#fff" : "#000" }}
                  >
                    {opt.label}
                  </span>
                  <span
                    className="block text-[11px]"
                    style={{ color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}
                  >
                    {opt.sublabel}
                  </span>
                </span>
                <span style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)" }}>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" aria-hidden="true">
                    <path d="M1 1l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            ))}
          </div>

          {/* Ignore */}
          <button
            onClick={() => {
              haptic(8)
              triggerCrash()
            }}
            className="w-full border-t py-3 text-[14px] font-normal transition-colors active:opacity-60"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
              color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
            }}
          >
            Ignore this stupid message
          </button>
        </div>
      </div>
    )
  }

  // ── The crash gag: glitch → black → boot ──────────────────────────────────
  if (phase === "crash-glitch") {
    return (
      <div className="absolute inset-0 z-60 overflow-hidden bg-black">
        <div className="battery-glitch absolute inset-0">
          <div className="battery-glitch-layer battery-glitch-r" />
          <div className="battery-glitch-layer battery-glitch-g" />
          <div className="battery-glitch-layer battery-glitch-b" />
        </div>
        <div className="battery-scanlines absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="battery-glitch-text text-[15px] font-semibold tracking-widest text-white/80">
            LOW POWER
          </span>
        </div>
      </div>
    )
  }

  if (phase === "crash-off") {
    return <div className="absolute inset-0 z-60 bg-black" />
  }

  if (phase === "crash-boot") {
    return (
      <div
        className="absolute inset-0 z-60 flex flex-col items-center justify-center bg-black"
        style={{ animation: "battery-fade-in 0.5s ease both" }}
      >
        {isIphone ? (
          /* Apple logo */
          <svg width="56" height="56" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M17.05 12.74c-.03-2.86 2.34-4.24 2.45-4.3-1.34-1.96-3.42-2.23-4.16-2.26-1.77-.18-3.46 1.04-4.36 1.04-.9 0-2.29-1.02-3.76-.99-1.93.03-3.71 1.12-4.7 2.85-2.01 3.48-.51 8.63 1.44 11.45.95 1.38 2.08 2.93 3.57 2.87 1.43-.06 1.97-.93 3.7-.93 1.73 0 2.22.93 3.74.9 1.54-.03 2.52-1.41 3.46-2.79 1.09-1.6 1.54-3.15 1.57-3.23-.03-.02-3.02-1.16-3.05-4.61zM14.2 4.38c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.72-.73.85-1.37 2.2-1.2 3.5 1.27.1 2.57-.65 3.36-1.6z" />
          </svg>
        ) : (
          /* Android-style boot: logo + spinner */
          <>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="#3ddc84" aria-hidden="true">
              <path d="M6 9v7a1 1 0 0 0 1 1h1v3a1 1 0 0 0 2 0v-3h4v3a1 1 0 0 0 2 0v-3h1a1 1 0 0 0 1-1V9H6zM3.5 9A1.5 1.5 0 0 0 2 10.5v4a1.5 1.5 0 0 0 3 0v-4A1.5 1.5 0 0 0 3.5 9zm17 0a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 0 0 3 0v-4A1.5 1.5 0 0 0 20.5 9zM15.6 2.8l1.1-1.9a.3.3 0 0 0-.5-.3l-1.1 1.95A6.6 6.6 0 0 0 12 2c-.95 0-1.85.18-2.65.55L8.25.6a.3.3 0 0 0-.52.3l1.1 1.9A6.06 6.06 0 0 0 6 8h12a6.06 6.06 0 0 0-2.4-5.2zM9.5 5.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
            </svg>
            <div className="mt-10 h-7 w-7 animate-spin rounded-full border-2 border-white/20 border-t-[#3ddc84]" />
          </>
        )}
      </div>
    )
  }

  return null
}
