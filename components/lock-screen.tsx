"use client"

import { useState, useEffect, useRef } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import DeviceWallpaper from "./device-wallpaper"
import { haptic } from "@/lib/haptics"

export default function LockScreen() {
  const { unlockPhone } = useAppNavigation()
  const { theme, device } = useDevice()
  const isDark = theme === "dark"

  const [time, setTime] = useState<Date | null>(null)
  const [startY, setStartY] = useState<number | null>(null)
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isFirstVisit, setIsFirstVisit] = useState(false)

  const screenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Show a stronger onboarding coachmark only on the visitor's first ever load.
  useEffect(() => {
    setIsFirstVisit(localStorage.getItem("os-portfolio-onboarded") !== "1")
  }, [])

  const markOnboarded = () => {
    localStorage.setItem("os-portfolio-onboarded", "1")
    setIsFirstVisit(false)
  }

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const y = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    setStartY(y)
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (startY === null) return
    const y = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const diff = startY - y
    if (diff > 0) { // Only allow swiping up
      setSwipeOffset(diff)
    }
  }

  const handleTouchEnd = () => {
    if (swipeOffset > 100) {
      // Swipe threshold met, unlock phone
      haptic(12)
      markOnboarded()
      unlockPhone()
    } else {
      // Snap back
      setSwipeOffset(0)
    }
    setStartY(null)
  }

  // Keyboard accessibility: unlock with Enter / Space / ArrowUp.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
      e.preventDefault()
      markOnboarded()
      unlockPhone()
    }
  }

  if (!time) return null

  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  // iOS 18 style large clock and Android distinct styles
  return (
    <div
      ref={screenRef}
      className="absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden touch-none select-none transition-transform outline-hidden"
      style={{
        transform: `translateY(-${swipeOffset}px)`,
        transition: startY ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
      role="button"
      tabIndex={0}
      aria-label="Locked screen. Press Enter or swipe up to unlock."
      onKeyDown={handleKeyDown}
      onPointerDown={handleTouchStart}
      onPointerMove={handleTouchMove}
      onPointerUp={handleTouchEnd}
      onPointerLeave={handleTouchEnd}
    >
      {/* Background with subtle parallax based on swipe (device-specific wallpaper) */}
      <DeviceWallpaper scale={1 + swipeOffset * 0.0005} />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-16 pb-10">

        {/* Lock Icon */}
        <div className="mt-8 mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="2.5" className="opacity-90">
            <rect x="5" y="11" width="14" height="10" rx="2" strokeLinejoin="round" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>

        {/* Clock & Date Area */}
        {device === "iphone" ? (
          <div className="flex flex-col items-center select-none text-center px-4">
            <span className="text-[20px] font-medium tracking-wide mb-1 opacity-90" style={{ color: isDark ? "white" : "black" }}>
              {dateStr}
            </span>
            <span className="text-[96px] font-bold tracking-tighter leading-[0.9] opacity-95"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: isDark ? "white" : "black",
                textShadow: isDark ? "0px 4px 24px rgba(0,0,0,0.4)" : "0px 4px 24px rgba(255,255,255,0.4)"
              }}>
              {hours}:{minutes}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-start w-full px-8 mt-4 select-none">
            <span className="text-[96px] font-thin tracking-tighter leading-[0.9]" style={{ color: isDark ? "white" : "black" }}>
              {hours}<br />{minutes}
            </span>
            <span className="text-[18px] font-medium tracking-wide mt-4 opacity-80" style={{ color: isDark ? "white" : "black" }}>
              {dateStr}
            </span>
          </div>
        )}

        <div className="flex-1" />

        {/* Quick action buttons (Flashlight / Camera) */}
        {device === "iphone" && (
          <div className="w-full flex justify-between px-10 mb-8 z-20">
            <button className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
              style={{ background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="2">
                <path d="M14 14.5l6 6M10 10.5l-6-6m16 6l-6-6m-6 16l6-6" />
              </svg>
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
              style={{ background: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={isDark ? "white" : "black"} strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
              </svg>
            </button>
          </div>
        )}

        {/* Swipe up prompt */}
        <div className="flex flex-col items-center gap-2 cursor-pointer z-20">
          {/* First-visit coachmark: an animated chevron that bounces upward */}
          {isFirstVisit && (
            <div className="motion-safe:animate-bounce" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke={isDark ? "white" : "black"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </div>
          )}
          <span
            className={`text-[16px] font-medium tracking-wide ${isFirstVisit ? "opacity-100" : "opacity-80 motion-safe:animate-pulse"}`}
            style={{ color: isDark ? "white" : "black" }}
          >
            {isFirstVisit ? "Welcome — swipe up to explore" : "Swipe up to unlock"}
          </span>
          <div className={`w-[130px] h-[5px] rounded-full motion-safe:animate-pulse ${isDark ? "bg-white" : "bg-black"}`} />
        </div>
      </div>
    </div>
  )
}
