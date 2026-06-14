"use client"

import { useState, useEffect } from "react"

import { useDevice } from "@/hooks/use-device"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import AppIcon from "./app-icon"
import DeviceWallpaper from "./device-wallpaper"

export default function HomeScreen() {
  const { device, theme } = useDevice()
  const { openApp } = useAppNavigation()
  const isDark = theme === "dark"

  // All app definitions (dock + grid are selected by id below)
  const allApps = [
    {
      id: "phone",
      label: "Phone",
      bgColor: "#34C759",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
    },
    {
      id: "mail",
      label: "Mail",
      bgColor: "#007AFF",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      badge: 123
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      bgColor: "#0077B5",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
    {
      id: "github",
      label: "GitHub",
      bgColor: isDark ? "#333" : "#24292e",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      id: "instagram",
      label: "Instagram",
      bgGradient: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 80%, #FCAF45 100%)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      ),
      badge: 2,
    },
    {
      id: "netflix",
      label: "Netflix",
      bgColor: "#000000",
      icon: (
        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
          <path d="M5 0h4l5.5 17V0H19v28h-3.5L10 11v17H5V0z" fill="#E50914" />
        </svg>
      ),
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      bgColor: "#25D366",
      badge: 3,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24">
          <path fill="white" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        </svg>
      ),
    },
    {
      id: "notes",
      label: "Notes",
      bgColor: "#FFCC00",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#8B6914">
          <path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z" />
        </svg>
      ),
    },
    {
      id: "maps",
      label: "Maps",
      bgGradient: "linear-gradient(135deg, #4285F4 0%, #34A853 100%)",
      icon: (
        <svg width="24" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
        </svg>
      ),
    },
    {
      id: "calendar",
      label: "Calendar",
      bgColor: isDark ? "#1C1C1E" : "#ffffff",
      icon: (
        <div className="flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-[#FF3B30] leading-none uppercase">
            {new Date().toLocaleDateString("en-US", { weekday: "short" })}
          </span>
          <span className={`text-[22px] font-light leading-none ${isDark ? "text-white" : "text-[#1a1a1a]"}`}>
            {new Date().getDate()}
          </span>
        </div>
      ),
      badge: 1,
    },
    {
      id: "medium",
      label: "Medium",
      bgColor: isDark ? "#1a1a1a" : "#ffffff",
      icon: (
        <svg width="26" height="26" viewBox="0 0 24 24" fill={isDark ? "white" : "black"}>
          <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
    {
      id: "spotify",
      label: "Spotify",
      bgColor: "#1DB954",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406a.75.75 0 01-1.03.253c-2.82-1.724-6.37-2.114-10.554-1.157a.75.75 0 11-.334-1.462c4.575-1.046 8.503-.596 11.665 1.336a.75.75 0 01.253 1.03zm1.084-2.417a.937.937 0 01-1.287.308c-3.225-1.983-8.142-2.557-11.958-1.399a.937.937 0 11-.543-1.794c4.36-1.322 9.776-.681 13.48 1.598a.937.937 0 01.308 1.287zm.094-2.516C13.971 9.463 8.348 9.26 5.15 10.212a1.125 1.125 0 11-.652-2.154C8.173 6.956 14.382 7.195 18.36 9.564a1.125 1.125 0 01-1.122 1.909z" />
        </svg>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      bgColor: isDark ? "#3a3a3c" : "#8e8e93",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm0 6a2 2 0 110-4 2 2 0 010 4z" />
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1a7.03 7.03 0 00-1.69-.98l-.38-2.65A.49.49 0 0014.1 2h-4a.49.49 0 00-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65a.5.5 0 00-.12.64l2 3.46c.14.24.42.34.68.22l2.49-1c.52.39 1.08.73 1.69.98l.38 2.65c.04.24.25.42.49.42h4c.24 0 .45-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.26.12.55.02.68-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65z" />
        </svg>
      ),
    },
    {
      id: "messages",
      label: "Messages",
      bgColor: "#34C759",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.04 2 11c0 2.61 1.28 4.96 3.34 6.59-.13 1.4-.62 2.66-1.27 3.62-.2.29.04.69.39.62 1.96-.42 3.6-1.2 4.84-2.16.86.2 1.76.33 2.7.33 5.52 0 10-4.04 10-9S17.52 2 12 2z" />
        </svg>
      ),
      badge: 1,
    },
    {
      id: "browser",
      label: device === "android" ? "Chrome" : "Safari",
      bgColor: device === "android" ? "#ffffff" : "#ffffff",
      icon:
        device === "android" ? (
          <svg width="32" height="32" viewBox="0 0 48 48">
            <g stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round">
              <path fill="#34A853" d="M24 24 L24 46 A22 22 0 0 1 4.95 13 Z" />
              <path fill="#EA4335" d="M24 24 L4.95 13 A22 22 0 0 1 43.05 13 Z" />
              <path fill="#FBBC05" d="M24 24 L43.05 13 A22 22 0 0 1 24 46 Z" />
            </g>
            <circle cx="24" cy="24" r="10" fill="#ffffff" />
            <circle cx="24" cy="24" r="8" fill="#4285F4" />
          </svg>
        ) : (
          <svg width="34" height="34" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="11" fill="#1E90FF" />
            <circle cx="12" cy="12" r="9.5" fill="#E8F2FF" />
            <path d="M12 12l5-5-3 8-7 4 3-8z" fill="#FF3B30" />
            <path d="M12 12l-5 5 3-8 7-4-3 8z" fill="#fff" />
          </svg>
        ),
    },
    {
      id: "chatgpt",
      label: "ChatGPT",
      bgColor: "#000000",
      icon: (
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A5.98 5.98 0 0010.7.01 6.05 6.05 0 004.93 4.2a5.98 5.98 0 00-3.998 2.9 6.05 6.05 0 00.743 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.52 2.9A5.97 5.97 0 0013.3 24a6.05 6.05 0 005.77-4.2 5.98 5.98 0 004-2.9 6.05 6.05 0 00-.75-7.08h-.04zM13.3 22.43a4.48 4.48 0 01-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 00.4-.68v-6.74l2.02 1.17a.07.07 0 01.04.05v5.58a4.5 4.5 0 01-4.5 4.5l-.01.01zM3.64 18.3a4.47 4.47 0 01-.54-3.01l.14.08 4.78 2.76a.78.78 0 00.78 0l5.84-3.37v2.33a.08.08 0 01-.03.06L9.78 19.95a4.5 4.5 0 01-6.14-1.65zM2.39 7.9a4.48 4.48 0 012.34-1.97V11.6a.78.78 0 00.39.68l5.84 3.37-2.02 1.17a.07.07 0 01-.07 0l-4.83-2.79A4.5 4.5 0 012.4 7.9h-.01zm16.6 3.86l-5.84-3.38 2.02-1.16a.07.07 0 01.07 0l4.83 2.78a4.5 4.5 0 01-.68 8.12v-5.68a.78.78 0 00-.4-.68h-.02zm2.01-3.03l-.14-.08-4.77-2.78a.78.78 0 00-.79 0L9.28 9.24V6.9a.07.07 0 01.03-.06l4.83-2.78a4.5 4.5 0 016.68 4.66l-.01.01zM8.18 12.86l-2.02-1.16a.08.08 0 01-.04-.06V6.07a4.5 4.5 0 017.38-3.45l-.14.08-4.78 2.76a.78.78 0 00-.4.68v6.72h.01l-.01.01zm1.1-2.36L12 8.94l2.6 1.56v3.12L12 15.18l-2.6-1.56v-3.12h-.01z" />
        </svg>
      ),
    },
  ]

  // Dock (bottom 4) and grid (3×4) selected by id, in display order.
  const pick = (ids: string[]) =>
    ids.map((id) => allApps.find((a) => a.id === id)!).filter(Boolean)

  const dockApps = pick(["phone", "messages", "browser", "settings"])
  const mainApps = pick([
    "mail", "instagram", "netflix", "whatsapp",
    "notes", "maps", "calendar", "medium",
    "spotify", "chatgpt", "linkedin", "github",
  ])

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden">
      {/* Wallpaper background (device-specific: iOS orb gradient vs Android Material You) */}
      <DeviceWallpaper />

      {/* Main content area */}
      <div className="relative flex-1 flex flex-col px-5 pt-2">
        {/* Android-style clock widget */}
        {device === "android" && (
          <div className="text-center mt-8 mb-6">
            <AndroidClock isDark={isDark} />
          </div>
        )}

        {/* App Grid - properly centered */}
        <div className={`flex-1 flex flex-col justify-center ${device === "android" ? "-mt-4" : "mt-6"}`}>
          <div className="grid grid-cols-4 gap-x-4 gap-y-6 place-items-center">
            {mainApps.map((app) => (
              <AppIcon
                key={app.id}
                id={app.id}
                label={app.label}
                bgColor={app.bgColor}
                bgGradient={app.bgGradient}
                icon={app.icon}
                badge={app.badge}
                onPress={() => openApp(app.id as any)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className={`relative z-30 mx-3 ${device === "android" ? "mb-3" : "mb-5"}`}>
        <div
          className={`rounded-[22px] px-4 py-2 ${isDark ? "glass-dock" : "glass-dock-light"}`}
        >
          <div className="flex justify-around items-center">
            {dockApps.map((app) => (
              <AppIcon
                key={app.id}
                id={app.id}
                label=""
                bgColor={app.bgColor}
                bgGradient={app.bgGradient}
                icon={app.icon}
                onPress={() => openApp(app.id as any)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* Android-style clock widget */
function AndroidClock({ isDark }: { isDark: boolean }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).toUpperCase()

  return (
    <div>
      <div
        className={`text-[72px] font-thin tracking-[-4px] leading-none ${isDark ? "text-white" : "text-black"}`}
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 200 }}
      >
        {hours}:{minutes}
      </div>
      <div className={`text-[13px] font-medium tracking-[1px] mt-2 ${isDark ? "text-white/60" : "text-black/60"}`}>
        {dateStr}
      </div>
    </div>
  )
}

