"use client"

import type React from "react"
import { useDevice } from "@/hooks/use-device"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useNowPlaying } from "@/hooks/use-now-playing"
import StatusBar from "./status-bar"
import BatterySurprise from "./battery-surprise"

interface DeviceFrameProps {
  children: React.ReactNode
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  const { device, theme } = useDevice()
  const { goHome, isLocked } = useAppNavigation()
  const { nowPlaying } = useNowPlaying()
  const isDark = theme === "dark"
  const isIphone = device === "iphone"

  // The Dynamic Island morphs into a "now playing" live activity while audio
  // is playing and the phone is unlocked.
  const showLiveActivity = isIphone && !isLocked && Boolean(nowPlaying)

  return (
    <div className="relative transition-all duration-500">
      {/* Device outer frame */}
      <div
        className={`relative mx-auto transition-all duration-500 ${isDark ? "shadow-device" : "shadow-device-light"
          }`}
        style={{
          width: "375px",
          height: "812px",
          borderRadius: isIphone ? "44px" : "36px",
          border: `3px solid ${isDark ? "#2a2a2a" : "#d0d0d0"}`,
          background: isDark ? "#1a1a1a" : "#e0e0e0",
          padding: "3px",
        }}
      >
        {/* Side buttons - iPhone */}
        {isIphone && (
          <>
            {/* Silent switch */}
            <div
              className="absolute left-[-5px] top-[100px] w-[4px] h-[28px] rounded-l-sm"
              style={{ background: isDark ? "#2a2a2a" : "#c0c0c0" }}
            />
            {/* Volume Up */}
            <div
              className="absolute left-[-5px] top-[148px] w-[4px] h-[44px] rounded-l-sm"
              style={{ background: isDark ? "#2a2a2a" : "#c0c0c0" }}
            />
            {/* Volume Down */}
            <div
              className="absolute left-[-5px] top-[200px] w-[4px] h-[44px] rounded-l-sm"
              style={{ background: isDark ? "#2a2a2a" : "#c0c0c0" }}
            />
            {/* Power */}
            <div
              className="absolute right-[-5px] top-[168px] w-[4px] h-[64px] rounded-r-sm"
              style={{ background: isDark ? "#2a2a2a" : "#c0c0c0" }}
            />
          </>
        )}

        {/* Side buttons - Android */}
        {!isIphone && (
          <>
            {/* Volume */}
            <div
              className="absolute right-[-5px] top-[148px] w-[4px] h-[64px] rounded-r-sm"
              style={{ background: isDark ? "#2a2a2a" : "#c0c0c0" }}
            />
            {/* Power */}
            <div
              className="absolute right-[-5px] top-[228px] w-[4px] h-[44px] rounded-r-sm"
              style={{ background: isDark ? "#2a2a2a" : "#c0c0c0" }}
            />
          </>
        )}

        {/* Screen area */}
        <div
          data-phone-screen
          className="relative w-full h-full overflow-hidden flex flex-col transition-all duration-500 lg:cursor-auto"
          style={{
            borderRadius: isIphone ? "41px" : "33px",
            background: isDark ? "#0a0a0c" : "#e8eaed",
          }}
        >
          {/* Dynamic Island (iPhone) — absolute overlay, floats above status bar */}
          {isIphone && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
              <div
                className="mt-[11px] flex items-center justify-center overflow-hidden"
                style={{
                  width: showLiveActivity ? "200px" : "126px",
                  height: "34px",
                  borderRadius: "20px",
                  background: "#000",
                  transition: "width 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {showLiveActivity && nowPlaying ? (
                  <div className="flex items-center justify-between w-full px-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-[22px] h-[22px] rounded-md shrink-0"
                        style={{ background: nowPlaying.artwork }}
                      />
                      <span className="text-white text-[11px] font-medium truncate max-w-[110px]">
                        {nowPlaying.track}
                      </span>
                    </div>
                    {/* Animated equalizer bars */}
                    <div className="flex items-end gap-[2px] h-[14px]" aria-hidden="true">
                      <span className="w-[2px] bg-[#1DB954] rounded-full animate-eq-1" />
                      <span className="w-[2px] bg-[#1DB954] rounded-full animate-eq-2" />
                      <span className="w-[2px] bg-[#1DB954] rounded-full animate-eq-3" />
                    </div>
                  </div>
                ) : (
                  /* Camera dot */
                  <div
                    className="absolute right-[18px]"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, #1a1a3a 30%, #0a0a1a 70%)",
                      boxShadow: "inset 0 0 2px rgba(60,60,120,0.5)",
                    }}
                  />
                )}
              </div>
            </div>
          )}

          {/* Punch-hole camera (Android) — absolute overlay */}
          {!isIphone && (
            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50">
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, #1a1a3a 30%, #0a0a1a 70%)",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.08)",
                }}
              />
            </div>
          )}

          {/* Status bar — persistent across home screen and all apps */}
          <StatusBar />

          {/* Screen content — fills remaining height above nav bar */}
          <div className="relative flex-1 overflow-hidden">
            {children}
          </div>

          {/* Home Indicator (iPhone) — absolute overlay, hidden while locked */}
          {isIphone && !isLocked && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
              <div
                style={{
                  width: "134px",
                  height: "5px",
                  borderRadius: "3px",
                  background: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)",
                }}
              />
            </div>
          )}

          {/* Android Navigation Bar — in-flow so app content never slides under it, hidden while locked */}
          {!isIphone && !isLocked && (
            <div
              className="shrink-0 flex justify-center items-center gap-12 py-2"
              style={{
                background: isDark ? "#0a0a0a" : "#f8f8f8",
              }}
            >
              {/* Back */}
              <button onClick={goHome} className="p-1 opacity-40 hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 19l-7-7 7-7" stroke={isDark ? "white" : "black"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Home pill */}
              <button
                onClick={goHome}
                className="opacity-40 hover:opacity-70 transition-opacity"
                style={{
                  width: "52px",
                  height: "5px",
                  borderRadius: "3px",
                  background: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)",
                }}
              />
              {/* Recents */}
              <button className="p-1 opacity-40 hover:opacity-70 transition-opacity">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="3" stroke={isDark ? "white" : "black"} strokeWidth="2.5" />
                </svg>
              </button>
            </div>
          )}

          {/* Hidden low-battery surprise — overlays everything, clipped to screen */}
          <BatterySurprise />
        </div>
      </div>
    </div>
  )
}
