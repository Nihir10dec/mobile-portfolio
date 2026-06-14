"use client"

import type { ReactElement } from "react"
import { useDevice } from "@/hooks/use-device"

export default function DeviceControls({
  orientation = "vertical",
}: {
  orientation?: "vertical" | "horizontal"
}) {
  const { device, theme, appearance, setDevice, setAppearance } = useDevice()
  const isDark = theme === "dark"
  const isHorizontal = orientation === "horizontal"

  const appearanceOptions: { value: "light" | "dark" | "auto"; label: string; icon: ReactElement }[] = [
    {
      value: "light",
      label: "Light",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
        </svg>
      ),
    },
    {
      value: "dark",
      label: "Dark",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      ),
    },
    {
      value: "auto",
      label: "Auto",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 3a9 9 0 010 18z" fill="currentColor" />
        </svg>
      ),
    },
  ]

  return (
    <div
      className={`flex items-center ${isHorizontal ? "flex-row gap-3" : "flex-col gap-6"
        }`}
    >
      {/* OS Toggle */}
      <div
        className="flex items-center rounded-full p-[3px] transition-colors duration-300"
        style={{
          background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        <button
          onClick={() => setDevice("android")}
          className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${device === "android"
            ? "bg-[#007AFF] text-white shadow-lg"
            : isDark
              ? "text-white/50 hover:text-white/70"
              : "text-black/50 hover:text-black/70"
            }`}
        >
          Android
        </button>
        <button
          onClick={() => setDevice("iphone")}
          className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${device === "iphone"
            ? "bg-[#007AFF] text-white shadow-lg"
            : isDark
              ? "text-white/50 hover:text-white/70"
              : "text-black/50 hover:text-black/70"
            }`}
        >
          iPhone
        </button>
      </div>

      {/* Appearance: Light / Dark / Auto */}
      <div
        className="flex items-center rounded-full p-[3px] transition-colors duration-300"
        style={{
          background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        }}
      >
        {appearanceOptions.map((opt) => {
          const active = appearance === opt.value
          return (
            <button
              key={opt.value}
              onClick={() => setAppearance(opt.value)}
              aria-label={`${opt.label} appearance`}
              aria-pressed={active}
              title={opt.label}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${active
                ? "bg-[#007AFF] text-white shadow-lg"
                : isDark
                  ? "text-white/50 hover:text-white/70"
                  : "text-black/50 hover:text-black/70"
                }`}
            >
              {opt.icon}
            </button>
          )
        })}
      </div>

      {/* Edition label */}
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors duration-300 ${isHorizontal ? "hidden sm:flex" : ""
          } ${isDark ? "bg-white/5" : "bg-black/5"}`}
      >
        <div
          className="w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "#007AFF" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
        <div className="text-center">
          <p className={`text-[10px] font-medium leading-tight ${isDark ? "text-white/60" : "text-black/60"}`}>
            {device === "iphone" ? "iOS 26 Obsidian" : "Android Obsidian"}
          </p>
          <p className={`text-[9px] leading-tight ${isDark ? "text-white/30" : "text-black/30"}`}>
            Edition
          </p>
        </div>
      </div>
    </div>
  )
}
