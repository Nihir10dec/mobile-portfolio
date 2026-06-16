"use client"

import { useState } from "react"
import { useDevice } from "@/hooks/use-device"
import { useNowPlaying } from "@/hooks/use-now-playing"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useSystemPanel } from "@/hooks/use-system-panel"
import { haptic } from "@/lib/haptics"
import RebootButton from "./reboot-button"

export default function IosControlCenter({ isDark }: { isDark: boolean }) {
  const { theme, device, setAppearance, toggleDevice } = useDevice()
  const { nowPlaying } = useNowPlaying()
  const { openApp } = useAppNavigation()
  const { closePanel } = useSystemPanel()

  const [airplane, setAirplane] = useState(false)
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(true)
  const [cellular, setCellular] = useState(true)
  const [flashlight, setFlashlight] = useState(false)
  const [brightness, setBrightness] = useState(78)
  const [volume, setVolume] = useState(60)

  const toggleTheme = () => {
    haptic(8)
    setAppearance(theme === "dark" ? "light" : "dark")
  }

  const openSpotify = () => {
    haptic(10)
    closePanel()
    openApp("spotify")
  }

  const tileBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.22)"
  const tileBorder = isDark
    ? "1px solid rgba(255,255,255,0.07)"
    : "1px solid rgba(255,255,255,0.65)"
  const iconColor = isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.72)"

  return (
    <div className="flex h-3/5 flex-col gap-3 px-4 pt-14 pb-8 text-white">
      {/* Row 1: Connectivity + Now Playing */}
      <div className="flex gap-3">
        <div
          className="grid flex-1 grid-cols-2 gap-3 rounded-[26px] p-4"
          style={{ background: tileBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: tileBorder }}
        >
          <RoundToggle label="Airplane" onClick={() => { haptic(6); setAirplane((v) => !v) }} activeColor="#FF9500" forceActive={airplane}>
            <PlaneGlyph />
          </RoundToggle>
          <RoundToggle label="Cellular" onClick={() => { haptic(6); setCellular((v) => !v) }} forceActive={cellular} activeColor="#34C759">
            <CellularGlyph />
          </RoundToggle>
          <RoundToggle label="Wi-Fi" onClick={() => { haptic(6); setWifi((v) => !v) }} forceActive={wifi} activeColor="#007AFF">
            <WifiGlyph />
          </RoundToggle>
          <RoundToggle label="Bluetooth" onClick={() => { haptic(6); setBluetooth((v) => !v) }} forceActive={bluetooth} activeColor="#007AFF">
            <BluetoothGlyph />
          </RoundToggle>
        </div>

        {/* Now Playing */}
        <button
          type="button"
          onClick={openSpotify}
          className="flex w-[44%] flex-col gap-3 rounded-[26px] p-4 text-left"
          style={{ background: tileBg, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: tileBorder }}
        >
          <div className="flex items-start justify-between" style={{ color: iconColor }}>
            <span
              className="h-10 w-10 shrink-0 rounded-xl"
              style={{ background: nowPlaying?.artwork ?? "linear-gradient(135deg,#1DB954,#0a7d32)" }}
            />
            <MusicNote />
          </div>
          <div className="min-w-0">
            <div className={`truncate text-[13px] font-semibold ${isDark ? "text-white" : "text-black/80"}`}>
              {nowPlaying?.track ?? "Not Playing"}
            </div>
            <div className={`truncate text-[11px] ${isDark ? "text-white/55" : "text-black/45"}`}>
              {nowPlaying?.artist ?? "Spotify"}
            </div>
          </div>
        </button>
      </div>

      {/* Row 2+: 3-row button grid (left) + 2 narrow sliders (right) */}
      <div className="flex flex-1 gap-3">

        {/* Left: 3 rows of tile buttons */}
        <div className="flex flex-1 flex-col gap-2">

          {/* Row 1: 4 functional buttons */}
          <div className="flex flex-1 gap-2">
            <TileButton
              label={theme === "dark" ? "Dark" : "Light"}
              onClick={toggleTheme}
              bg={theme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(255,200,0,0.9)"}
              isDark={isDark}
            >
              {theme === "dark" ? <MoonGlyph /> : <SunGlyph />}
            </TileButton>
            <TileButton
              label={device === "iphone" ? "iPhone" : "Android"}
              onClick={() => { haptic(8); toggleDevice() }}
              bg="rgba(0,122,255,0.9)"
              isDark={isDark}
            >
              <DeviceGlyph />
            </TileButton>
            <TileButton
              label="Flashlight"
              onClick={() => { haptic(6); setFlashlight((v) => !v) }}
              bg={flashlight ? "rgba(255,255,255,0.95)" : tileBg}
              dark={flashlight}
              isDark={isDark}
              border={flashlight ? "none" : tileBorder}
            >
              <FlashGlyph />
            </TileButton>
            <TileButton label="Silent" onClick={() => { }} bg={tileBg} isDark={isDark} border={tileBorder}>
              <BellSlashGlyph />
            </TileButton>
          </div>

          {/* Row 3: 2 dummy tiles + Restart (wide, spans 2 cols) */}
          <div className="flex flex-1 gap-2">
            <TileButton label="Focus" onClick={() => { }} bg={tileBg} isDark={isDark} border={tileBorder}>
              <FocusGlyph />
            </TileButton>
            <TileButton label="Record" onClick={() => { }} bg={tileBg} isDark={isDark} border={tileBorder}>
              <RecordGlyph />
            </TileButton>
            <RebootButton variant="ios-tile" isDark={isDark} bg={tileBg} />
          </div>

        </div>

        {/* Right: 2 narrow vertical sliders */}
        <VerticalSlider
          value={brightness}
          onChange={setBrightness}
          icon={<SunGlyph />}
          label="Brightness"
          bg={tileBg}
          className="w-12 flex-shrink-0"
          isDark={isDark}
        />
        <VerticalSlider
          value={volume}
          onChange={setVolume}
          icon={<SpeakerGlyph />}
          label="Volume"
          bg={tileBg}
          className="w-12 flex-shrink-0"
          isDark={isDark}
        />
      </div>
    </div>
  )
}

/* ── Building blocks ─────────────────────────────────────────────────── */

function RoundToggle({
  children,
  label,
  onClick,
  forceActive,
  activeColor = "#007AFF",
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  activeColor?: string
  forceActive?: boolean
}) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex items-center justify-center">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full transition-colors"
        style={{ background: forceActive ? activeColor : "rgba(120,120,128,0.5)" }}
      >
        {children}
      </span>
    </button>
  )
}

function TileButton({
  children,
  label,
  onClick,
  bg,
  dark,
  isDark,
  border,
}: {
  children: React.ReactNode
  label: string
  onClick: () => void
  bg: string
  dark?: boolean
  isDark?: boolean
  border?: string
}) {
  const iconColor = dark
    ? "#000"
    : (isDark ? "rgba(255,255,255,0.92)" : "rgba(0,0,0,0.72)")

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-1 flex-col items-center justify-center gap-1 rounded-[18px] select-none transition-transform active:scale-95"
      style={{
        background: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: border ?? "none",
        color: iconColor,
      }}
    >
      {children}
      <span className={`text-[10px] font-medium ${isDark ? "text-white/75" : "text-black/60"}`}>{label}</span>
    </button>
  )
}

function VerticalSlider({
  value,
  onChange,
  icon,
  label,
  bg,
  className,
  isDark,
}: {
  value: number
  onChange: (v: number) => void
  icon: React.ReactNode
  label: string
  bg: string
  className?: string
  isDark?: boolean
}) {
  const [dragging, setDragging] = useState(false)

  const setFromEvent = (clientY: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const pct = 1 - (clientY - rect.top) / rect.height
    onChange(Math.max(2, Math.min(100, Math.round(pct * 100))))
  }

  return (
    <div
      role="slider"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      tabIndex={0}
      onPointerDown={(e) => {
        e.stopPropagation()
        setDragging(true)
          ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
        setFromEvent(e.clientY, e.currentTarget as HTMLElement)
        haptic(4)
      }}
      onPointerMove={(e) => {
        if (!dragging) return
        e.stopPropagation()
        setFromEvent(e.clientY, e.currentTarget as HTMLElement)
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      className={`relative cursor-pointer overflow-hidden rounded-[26px] touch-none ${className ?? "flex-1"}`}
      style={{
        background: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isDark ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0.65)",
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 transition-[height]"
        style={{
          height: `${value}%`,
          background: isDark ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.15)",
        }}
      />
      <div
        className="absolute inset-x-0 top-4 flex justify-center"
        style={{ color: isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.65)" }}
      >
        {icon}
      </div>
    </div>
  )
}

/* ── Glyphs ──────────────────────────────────────────────────────────── */

function PlaneGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0011.5 2 1.5 1.5 0 0010 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16z" />
    </svg>
  )
}
function CellularGlyph() {
  return (
    <svg width="20" height="18" viewBox="0 0 24 24" fill="white">
      <rect x="2" y="14" width="3" height="6" rx="1" /><rect x="7" y="10" width="3" height="10" rx="1" /><rect x="12" y="6" width="3" height="14" rx="1" /><rect x="17" y="2" width="3" height="18" rx="1" />
    </svg>
  )
}
function WifiGlyph() {
  return (
    <svg width="22" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12 18l2.5-2.5a3.5 3.5 0 00-5 0L12 18zm0-7a8 8 0 015.6 2.3l1.8-1.8a10.5 10.5 0 00-14.8 0l1.8 1.8A8 8 0 0112 11zm0-5a13 13 0 019.2 3.8l1.8-1.8a15.5 15.5 0 00-22 0l1.8 1.8A13 13 0 0112 6z" />
    </svg>
  )
}
function BluetoothGlyph() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M12 2l5 4-4 4 4 4-5 4v-7l-3 3-1.5-1.5L11 9 7.5 5.5 9 4l3 3V2zm1 4.8V9l1.3-1.1L13 6.8zm0 7.4v2.2l1.3-1.1L13 14.2z" />
    </svg>
  )
}
function SunGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4.5" />
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.5 4.5l1.5 1.5M18 18l1.5 1.5M19.5 4.5L18 6M6 18l-1.5 1.5" />
      </g>
    </svg>
  )
}
function MoonGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A8.5 8.5 0 1111.2 3a6.5 6.5 0 009.8 9.8z" />
    </svg>
  )
}
function DeviceGlyph() {
  return (
    <svg width="18" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" />
    </svg>
  )
}
function FlashGlyph() {
  return (
    <svg width="16" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10l-1 7h3l-9 13 2-9H7l2-11z" />
    </svg>
  )
}
function SpeakerGlyph() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 9v6h4l5 5V4L8 9H4zm12 3a3 3 0 00-2-2.8v5.6A3 3 0 0016 12z" />
    </svg>
  )
}
function MusicNote() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
      <path d="M9 17V5l10-2v12" /><circle cx="6" cy="17" r="3" /><circle cx="16" cy="15" r="3" />
    </svg>
  )
}
function BellSlashGlyph() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.73 21a2 2 0 01-3.46 0M18.63 13A17.9 17.9 0 0118 8" />
      <path d="M6.26 6.26A5.86 5.86 0 006 8c0 7-3 9-3 9h14" />
      <path d="M18 8a6 6 0 00-9.33-5" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  )
}
function RotateGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0110 10" />
      <path d="M22 12a10 10 0 01-10 10" />
      <path d="M2 12a10 10 0 0110-10" />
      <rect x="9" y="9" width="6" height="8" rx="1.5" />
      <path d="M12 9V7" />
    </svg>
  )
}
function TimerGlyph() {
  return (
    <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="13" r="7" />
      <path d="M12 10v3l2 2M10 3h4M12 3v2" />
    </svg>
  )
}
function CameraGlyph() {
  return (
    <svg width="20" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="2" y="7" width="20" height="14" rx="3" />
      <circle cx="12" cy="14" r="3.5" />
      <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  )
}
function CalcGlyph() {
  return (
    <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <rect x="4" y="2" width="16" height="20" rx="3" />
      <path d="M8 7h8M8 12h2M12 12h2M16 12v0M8 16h2M12 16h2M16 16v0" />
    </svg>
  )
}
function FocusGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M3 9V5a2 2 0 012-2h4M15 3h4a2 2 0 012 2v4M21 15v4a2 2 0 01-2 2h-4M9 21H5a2 2 0 01-2-2v-4" />
    </svg>
  )
}
function RecordGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="5.5" />
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
