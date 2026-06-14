"use client"

import { useState } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { haptic } from "@/lib/haptics"
import { trackEvent } from "@/lib/analytics"
import { bookmarks, type Bookmark } from "./browser-app.data"

export default function BrowserApp() {
  const { closeApp } = useAppNavigation()
  const { theme, device } = useDevice()
  const isDark = theme === "dark"
  const isAndroid = device === "android"

  const bg = isDark ? "#0d0d0d" : "#ffffff"
  const chromeBg = isDark ? "#1c1c1e" : isAndroid ? "#f1f3f4" : "#f7f7f8"
  const text = isDark ? "#ffffff" : "#202124"
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
  const border = isDark ? "#2a2a2a" : "#e3e3e3"
  const pill = isDark ? "#2c2c2e" : "#ffffff"

  const [query] = useState("nihir.dev")
  const browserName = isAndroid ? "Chrome" : "Safari"

  const openLink = (bm: Bookmark) => {
    haptic(8)
    trackEvent("browser_open_link", { label: bm.label })
    window.open(bm.url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: bg }}>
      {/* Top chrome */}
      {isAndroid ? (
        /* Chrome (Android): address bar on top with menu */
        <div className="flex-shrink-0" style={{ background: chromeBg }}>
          <div className="flex items-center gap-2 px-3 py-2.5">
            <button onClick={closeApp} aria-label="Back" style={{ color: text }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              className="flex-1 flex items-center gap-2 rounded-full px-3 py-2"
              style={{ background: pill, border: `1px solid ${border}` }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill={textMuted}>
                <path d="M12 1a4 4 0 00-4 4v4H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2h-1V5a4 4 0 00-4-4zm-2 8V5a2 2 0 114 0v4h-4z" />
              </svg>
              <span className="text-[13px] truncate" style={{ color: text }}>
                {query}
              </span>
            </div>
            <div className="w-6 h-6 flex items-center justify-center" style={{ color: text }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </div>
          </div>
        </div>
      ) : null}

      {/* Start page */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="text-center mb-6">
          <div className="text-[22px] font-semibold" style={{ color: text }}>
            {browserName}
          </div>
          <p className="text-[13px] mt-1" style={{ color: textMuted }}>
            Favorites
          </p>
        </div>

        <div className="grid grid-cols-3 gap-y-5 gap-x-3 place-items-center">
          {bookmarks.map((bm) => (
            <button
              key={bm.label}
              onClick={() => openLink(bm)}
              className="flex flex-col items-center gap-1.5 group"
              aria-label={`Open ${bm.label} in a new tab`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-semibold text-[16px] shadow-sm transition-transform group-active:scale-90"
                style={{ background: bm.color }}
              >
                {bm.initial}
              </div>
              <span className="text-[12px]" style={{ color: text }}>
                {bm.label}
              </span>
            </button>
          ))}
        </div>

        <p className="text-[11px] text-center mt-8" style={{ color: textMuted }}>
          Links open in a new tab.
        </p>
      </div>

      {/* Bottom chrome */}
      {isAndroid ? null : (
        /* Safari (iPhone): address bar + toolbar at the bottom */
        <div className="flex-shrink-0 border-t" style={{ borderColor: border, background: chromeBg }}>
          <div className="px-4 py-2">
            <div
              className="flex items-center justify-center gap-2 rounded-xl px-3 py-2"
              style={{ background: pill }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={textMuted}>
                <path d="M12 1a4 4 0 00-4 4v4H7a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2v-9a2 2 0 00-2-2h-1V5a4 4 0 00-4-4zm-2 8V5a2 2 0 114 0v4h-4z" />
              </svg>
              <span className="text-[14px]" style={{ color: text }}>
                {query}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-7 pb-2" style={{ color: "#007AFF" }}>
            <span className="opacity-40">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="opacity-40">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <button onClick={closeApp} aria-label="Done" className="font-semibold text-[15px]">
              Done
            </button>
            <span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v7a1 1 0 001 1h14a1 1 0 001-1v-7" strokeLinecap="round" />
                <path d="M12 3v13M7 8l5-5 5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="8" y="8" width="12" height="12" rx="2" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
