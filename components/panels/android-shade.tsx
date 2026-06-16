"use client"

import { useEffect, useState } from "react"
import { useDevice } from "@/hooks/use-device"
import { useNowPlaying } from "@/hooks/use-now-playing"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useSystemPanel } from "@/hooks/use-system-panel"
import { notifications as seed, type AppNotification } from "@/data/notifications"
import { haptic } from "@/lib/haptics"
import RebootButton from "./reboot-button"

/**
 * Android combined shade — a single pull-down sheet holding quick-setting tiles,
 * a brightness slider, a media card and the notification list (with Clear all).
 * Opened from either swipe origin since Android merges both surfaces.
 */
export default function AndroidShade({ isDark }: { isDark: boolean }) {
  const { theme, device, setAppearance, toggleDevice } = useDevice()
  const { nowPlaying } = useNowPlaying()
  const { openApp } = useAppNavigation()
  const { closePanel } = useSystemPanel()

  const [items, setItems] = useState<AppNotification[]>(seed)
  const [time, setTime] = useState<Date | null>(null)
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [airplane, setAirplane] = useState(false)
  const [flashlight, setFlashlight] = useState(false)
  const [brightness, setBrightness] = useState(78)

  useEffect(() => {
    setTime(new Date())
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const open = (n: AppNotification) => {
    haptic(10)
    closePanel()
    openApp(n.appId)
  }

  const surface = isDark ? "#201f1f" : "#ffffff"
  const text = isDark ? "text-white" : "text-black"
  const sub = isDark ? "text-white/55" : "text-black/50"

  const hh = time ? time.getHours().toString().padStart(2, "0") : "--"
  const mm = time ? time.getMinutes().toString().padStart(2, "0") : "--"
  const dateStr = time
    ? time.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
    : ""

  return (
    <div className="no-scrollbar flex h-full flex-col gap-3 overflow-y-auto overscroll-contain px-3 pt-12 pb-8">
      {/* Header */}
      <div className={`flex items-end justify-between px-1 ${text}`}>
        <div className="text-[34px] font-normal leading-none tabular-nums">
          {hh}:{mm}
        </div>
        <div className={`text-[13px] ${sub}`}>{dateStr}</div>
      </div>

      {/* Quick tiles */}
      <div className="grid grid-cols-2 gap-2.5">
        <Tile label={wifi ? "Wi-Fi" : "Off"} sub="Wi-Fi" active={wifi} onClick={() => { haptic(6); setWifi((v) => !v) }} isDark={isDark}>
          <WifiGlyph />
        </Tile>
        <Tile label={bluetooth ? "On" : "Off"} sub="Bluetooth" active={bluetooth} onClick={() => { haptic(6); setBluetooth((v) => !v) }} isDark={isDark}>
          <BtGlyph />
        </Tile>
        <Tile label={theme === "dark" ? "Dark" : "Light"} sub="Theme" active={theme === "dark"} onClick={() => { haptic(8); setAppearance(theme === "dark" ? "light" : "dark") }} isDark={isDark}>
          {theme === "dark" ? <MoonGlyph /> : <SunGlyph />}
        </Tile>
        <Tile label={device === "iphone" ? "iPhone" : "Android"} sub="Device" active onClick={() => { haptic(8); toggleDevice() }} isDark={isDark}>
          <DeviceGlyph />
        </Tile>
        <Tile label={airplane ? "On" : "Off"} sub="Airplane" active={airplane} onClick={() => { haptic(6); setAirplane((v) => !v) }} isDark={isDark}>
          <PlaneGlyph />
        </Tile>
        <Tile label={flashlight ? "On" : "Off"} sub="Flashlight" active={flashlight} onClick={() => { haptic(6); setFlashlight((v) => !v) }} isDark={isDark}>
          <FlashGlyph />
        </Tile>
      </div>

      {/* Brightness */}
      <Brightness value={brightness} onChange={setBrightness} isDark={isDark} surface={surface} />

      {/* Media card */}
      <button
        type="button"
        onClick={() => { haptic(10); closePanel(); openApp("spotify") }}
        className="flex items-center gap-3 rounded-2xl p-3 text-left"
        style={{ background: surface, boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.06)" }}
      >
        <span className="h-12 w-12 shrink-0 rounded-xl" style={{ background: nowPlaying?.artwork ?? "linear-gradient(135deg,#1DB954,#0a7d32)" }} />
        <span className="min-w-0 flex-1">
          <span className={`block truncate text-[14px] font-medium ${text}`}>{nowPlaying?.track ?? "Not Playing"}</span>
          <span className={`block truncate text-[12px] ${sub}`}>{nowPlaying?.artist ?? "Spotify"}</span>
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#1DB954" }}>
          <PlayGlyph />
        </span>
      </button>

      {/* Notifications */}
      <div className="flex items-center justify-between px-1 pt-1">
        <span className={`text-[12px] font-medium ${sub}`}>Notifications</span>
        {items.length > 0 && (
          <button type="button" onClick={() => { haptic(6); setItems([]) }} className="text-[12px] font-medium text-[#8ab4f8]">
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-2">
        {items.length === 0 ? (
          <div className={`py-6 text-center text-[13px] ${sub}`}>No notifications</div>
        ) : (
          items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => open(n)}
              className="flex w-full items-start gap-3 rounded-2xl p-3 text-left"
              style={{ background: surface, boxShadow: isDark ? "none" : "0 2px 10px rgba(0,0,0,0.06)" }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: n.accent }}>
                {n.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`truncate text-[13px] font-medium ${text}`}>{n.app}</span>
                  <span className={`shrink-0 text-[11px] ${sub}`}>{n.time}</span>
                </span>
                <span className={`mt-0.5 block text-[13px] font-semibold ${text}`}>{n.title}</span>
                <span className={`mt-0.5 line-clamp-2 block text-[12px] leading-snug ${sub}`}>{n.message}</span>
              </span>
            </button>
          ))
        )}
      </div>

      {/* Restart */}
      <div className="pt-1">
        <RebootButton variant="android" />
      </div>
    </div>
  )
}

/* ── Building blocks ────────────────────────────────────────────────── */

function Tile({
  children,
  label,
  sub,
  active,
  onClick,
  isDark,
}: {
  children: React.ReactNode
  label: string
  sub: string
  active?: boolean
  onClick: () => void
  isDark: boolean
}) {
  const onColor = "#8ab4f8"
  const offBg = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)"
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-3 rounded-3xl px-4 py-3 text-left transition-colors"
      style={{ background: active ? onColor : offBg }}
    >
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{ background: active ? "rgba(255,255,255,0.25)" : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)", color: active ? "#0b1b3a" : isDark ? "#fff" : "#000" }}
      >
        {children}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[13px] font-medium" style={{ color: active ? "#0b1b3a" : isDark ? "#fff" : "#000" }}>
          {sub}
        </span>
        <span className="truncate text-[11px]" style={{ color: active ? "rgba(11,27,58,0.7)" : isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>
          {label}
        </span>
      </span>
    </button>
  )
}

function Brightness({
  value,
  onChange,
  isDark,
  surface,
}: {
  value: number
  onChange: (v: number) => void
  isDark: boolean
  surface: string
}) {
  const [dragging, setDragging] = useState(false)
  const setFromEvent = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const pct = (clientX - rect.left) / rect.width
    onChange(Math.max(2, Math.min(100, Math.round(pct * 100))))
  }
  return (
    <div
      role="slider"
      aria-label="Brightness"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onPointerDown={(e) => {
        e.stopPropagation()
        setDragging(true)
          ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        setFromEvent(e.clientX, e.currentTarget as HTMLElement)
        haptic(4)
      }}
      onPointerMove={(e) => {
        if (!dragging) return
        e.stopPropagation()
        setFromEvent(e.clientX, e.currentTarget as HTMLElement)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className="relative h-12 cursor-pointer touch-none overflow-hidden rounded-full"
      style={{ background: surface }}
    >
      <div className="absolute inset-y-0 left-0 rounded-full bg-[#8ab4f8]" style={{ width: `${value}%` }} />
      <div className="absolute inset-y-0 left-4 flex items-center" style={{ color: value > 12 ? "#0b1b3a" : isDark ? "#fff" : "#000" }}>
        <SunGlyph />
      </div>
    </div>
  )
}

/* ── Glyphs ─────────────────────────────────────────────────────────── */

function WifiGlyph() {
  return (
    <svg width="18" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 18l2.5-2.5a3.5 3.5 0 00-5 0L12 18zm0-7a8 8 0 015.6 2.3l1.8-1.8a10.5 10.5 0 00-14.8 0l1.8 1.8A8 8 0 0112 11zm0-5a13 13 0 019.2 3.8l1.8-1.8a15.5 15.5 0 00-22 0l1.8 1.8A13 13 0 0112 6z" />
    </svg>
  )
}
function BtGlyph() {
  return (
    <svg width="14" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l5 4-4 4 4 4-5 4v-7l-3 3-1.5-1.5L11 9 7.5 5.5 9 4l3 3V2zm1 4.8V9l1.3-1.1L13 6.8zm0 7.4v2.2l1.3-1.1L13 14.2z" />
    </svg>
  )
}
function MoonGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 009.8 9.8z" />
    </svg>
  )
}
function SunGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4.5" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.5 4.5l1.5 1.5M18 18l1.5 1.5M19.5 4.5L18 6M6 18l-1.5 1.5" />
      </g>
    </svg>
  )
}
function DeviceGlyph() {
  return (
    <svg width="14" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" />
    </svg>
  )
}
function PlaneGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
    </svg>
  )
}
function FlashGlyph() {
  return (
    <svg width="13" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10l-1 7h3l-9 13 2-9H7l2-11z" />
    </svg>
  )
}
function PlayGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
