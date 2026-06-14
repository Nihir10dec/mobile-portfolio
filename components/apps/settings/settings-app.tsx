"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { haptic } from "@/lib/haptics"

export default function SettingsApp() {
  const { closeApp } = useAppNavigation()
  const { device, theme, appearance, setDevice, setAppearance } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#000000" : "#f2f2f7"
  const groupBg = isDark ? "#1c1c1e" : "#ffffff"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(235,235,245,0.6)" : "rgba(60,60,67,0.6)"
  const divider = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"

  const appearanceOptions: { value: "light" | "dark" | "auto"; label: string }[] = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "auto", label: "Auto" },
  ]

  const Segmented = ({
    options,
    value,
    onChange,
  }: {
    options: { value: string; label: string }[]
    value: string
    onChange: (v: string) => void
  }) => (
    <div
      className="flex items-center rounded-[9px] p-[2px]"
      style={{ background: isDark ? "rgba(255,255,255,0.10)" : "rgba(120,120,128,0.16)" }}
      role="radiogroup"
    >
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            role="radio"
            aria-checked={active}
            onClick={() => {
              haptic(6)
              onChange(opt.value)
            }}
            className="px-3 py-1 rounded-[7px] text-[13px] font-medium transition-all"
            style={{
              background: active ? (isDark ? "#636366" : "#ffffff") : "transparent",
              color: text,
              boxShadow: active ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )

  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: bg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-10 flex items-center gap-2 px-4 pt-12 pb-3 backdrop-blur-xl"
        style={{ background: isDark ? "rgba(0,0,0,0.7)" : "rgba(242,242,247,0.8)" }}
      >
        <button
          onClick={closeApp}
          aria-label="Back to home"
          className="flex items-center gap-1 -ml-1"
          style={{ color: "#007AFF" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[28px] font-bold" style={{ color: text }}>
          Settings
        </h1>
      </div>

      <div className="px-4 pb-10">
        {/* Profile card */}
        <div
          className="flex items-center gap-3 rounded-2xl p-4 mb-6"
          style={{ background: groupBg }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[22px] font-semibold"
            style={{ background: "linear-gradient(135deg,#007AFF,#0a5bd6)" }}
          >
            {portfolioData.personal.initial}
          </div>
          <div className="flex flex-col">
            <span className="text-[17px] font-semibold" style={{ color: text }}>
              {portfolioData.personal.name}
            </span>
            <span className="text-[13px]" style={{ color: textMuted }}>
              {portfolioData.personal.title}
            </span>
          </div>
        </div>

        {/* Display & Appearance */}
        <p className="text-[13px] uppercase tracking-wide mb-2 px-1" style={{ color: textMuted }}>
          Display &amp; Appearance
        </p>
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: groupBg }}>
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[15px]" style={{ color: text }}>
              Appearance
            </span>
            <Segmented
              options={appearanceOptions}
              value={appearance}
              onChange={(v) => setAppearance(v as "light" | "dark" | "auto")}
            />
          </div>
          <div className="h-px ml-4" style={{ background: divider }} />
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-[15px]" style={{ color: text }}>
              Device
            </span>
            <Segmented
              options={[
                { value: "iphone", label: "iPhone" },
                { value: "android", label: "Android" },
              ]}
              value={device}
              onChange={(v) => setDevice(v as "iphone" | "android")}
            />
          </div>
        </div>

        {/* About */}
        <p className="text-[13px] uppercase tracking-wide mb-2 px-1" style={{ color: textMuted }}>
          About
        </p>
        <div className="rounded-2xl overflow-hidden" style={{ background: groupBg }}>
          <Row label="Edition" value="OS.portfolio" text={text} muted={textMuted} divider={divider} />
          <Row label="Designer" value={portfolioData.personal.name} text={text} muted={textMuted} divider={divider} />
          <Row label="Location" value={portfolioData.personal.location} text={text} muted={textMuted} last />
        </div>

        <p className="text-center text-[12px] mt-6" style={{ color: textMuted }}>
          Appearance &amp; device preferences are saved on this browser.
        </p>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  text,
  muted,
  divider,
  last,
}: {
  label: string
  value: string
  text: string
  muted: string
  divider?: string
  last?: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-[15px]" style={{ color: text }}>
          {label}
        </span>
        <span className="text-[15px]" style={{ color: muted }}>
          {value}
        </span>
      </div>
      {!last && <div className="h-px ml-4" style={{ background: divider }} />}
    </>
  )
}
