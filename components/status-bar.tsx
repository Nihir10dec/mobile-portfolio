"use client"

import { useState, useEffect } from "react"
import { useDevice } from "@/hooks/use-device"
import { useBattery } from "@/hooks/use-battery"

export default function StatusBar() {
  const { device, theme } = useDevice()
  const { level, isCharging } = useBattery()
  const [time, setTime] = useState(new Date())
  const isDark = theme === "dark"
  const textColor = isDark ? "text-white" : "text-black"

  const isLow = level <= 20 && !isCharging
  const fillColor = isCharging ? "#34c759" : isLow ? "#ff3b30" : isDark ? "#fff" : "#000"

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const timeStr = `${hours}:${minutes}`

  if (device === "iphone") {
    return (
      <div className={`relative z-40 flex justify-between items-center px-8 pt-[16px] pb-[4px] ${textColor}`}>
        {/* Time - left side */}
        <span className="text-[15px] font-semibold tracking-tight w-12">{timeStr}</span>

        {/* Spacer for Dynamic Island */}
        <div className="w-[126px]" />

        {/* Right icons */}
        <div className="flex items-center gap-[5px]">
          {/* Cellular */}
          <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
            <rect x="0" y="9" width="3" height="3" rx="0.5" opacity="1" />
            <rect x="4.5" y="6" width="3" height="6" rx="0.5" opacity="1" />
            <rect x="9" y="3" width="3" height="9" rx="0.5" opacity="1" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="1" />
          </svg>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
            <path d="M4.93 7.78a4.4 4.4 0 016.14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M2.1 5a7.5 7.5 0 0111.8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[2px]">
            <div className="relative" style={{ width: "25px", height: "12px" }}>
              <div
                className="absolute inset-0 rounded-[3px]"
                style={{
                  border: `1.5px solid ${isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"}`,
                }}
              />
              <div
                className="absolute top-[2.5px] left-[2.5px] bottom-[2.5px] rounded-[1.5px]"
                style={{
                  width: `${(18.5 * level) / 100}px`,
                  background: fillColor,
                  transition: "width 0.4s ease, background 0.4s ease",
                }}
              />
              {isCharging && (
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  width="7"
                  height="9"
                  viewBox="0 0 7 9"
                  fill={isDark ? "#000" : "#fff"}
                  aria-hidden="true"
                >
                  <path d="M4 0L0 5h2.5L2 9 7 3.5H4.2L4 0z" />
                </svg>
              )}
              <div
                className="absolute top-1/2 -translate-y-1/2 -right-[3px] rounded-r-[1px]"
                style={{
                  width: "2px",
                  height: "5px",
                  background: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Android status bar
  return (
    <div className={`relative z-40 flex justify-between items-center px-6 pt-[10px] pb-[4px] ${textColor}`}>
      {/* Time */}
      <span className="text-[14px] font-medium">{timeStr}</span>

      {/* Right icons */}
      <div className="flex items-center gap-[6px]">
        {/* WiFi */}
        <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 11.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
          <path d="M4.93 7.78a4.4 4.4 0 016.14 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M2.1 5a7.5 7.5 0 0111.8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
        {/* Signal */}
        <svg width="14" height="11" viewBox="0 0 17 12" fill="currentColor">
          <rect x="0" y="9" width="3" height="3" rx="0.5" />
          <rect x="4.5" y="6" width="3" height="6" rx="0.5" />
          <rect x="9" y="3" width="3" height="9" rx="0.5" />
          <rect x="13.5" y="0" width="3" height="12" rx="0.5" />
        </svg>
        {/* Battery */}
        <div className="relative" style={{ width: "22px", height: "11px" }}>
          <div
            className="absolute inset-0 rounded-[2px]"
            style={{ border: `1.5px solid ${isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}` }}
          />
          <div
            className="absolute top-[2px] left-[2px] bottom-[2px] rounded-[1px]"
            style={{
              width: `${(16 * level) / 100}px`,
              background: fillColor,
              transition: "width 0.4s ease, background 0.4s ease",
            }}
          />
          {isCharging && (
            <svg
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              width="6"
              height="8"
              viewBox="0 0 7 9"
              fill={isDark ? "#000" : "#fff"}
              aria-hidden="true"
            >
              <path d="M4 0L0 5h2.5L2 9 7 3.5H4.2L4 0z" />
            </svg>
          )}
          <div
            className="absolute top-1/2 -translate-y-1/2 -right-[2px] rounded-r-[1px]"
            style={{ width: "2px", height: "4px", background: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}
          />
        </div>
      </div>
    </div>
  )
}