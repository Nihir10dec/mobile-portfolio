"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { quickActionChips } from "./maps-app.data"

export default function MapsApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#242f3e" : "#e5e3df"
  const panelBg = isDark ? "#1c1c1e" : "#ffffff"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"

  return (
    <div className="w-full h-full relative overflow-hidden" style={{ background: bg }}>
      {/* Map visual background (CSS generated map look) */}
      <div className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(#3a4a5a 1px, transparent 1px), radial-gradient(#3a4a5a 1px, transparent 1px)"
            : "radial-gradient(#cbd5e1 1px, transparent 1px), radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          backgroundPosition: "0 0, 20px 20px"
        }}
      />

      {/* City roads abstract lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 800" fill="none">
          <path d="M0,300 Q150,200 200,400 T400,300" stroke={isDark ? "#38414e" : "#ffffff"} strokeWidth="8" />
          <path d="M100,0 L150,800" stroke={isDark ? "#38414e" : "#ffffff"} strokeWidth="6" />
          <path d="M250,0 L200,800" stroke={isDark ? "#38414e" : "#ffffff"} strokeWidth="12" />
          <path d="M0,500 L400,450" stroke={isDark ? "#f28b82" : "#fbbc04"} strokeWidth="4" />
        </svg>
      </div>

      {/* Pin Location */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60px] flex flex-col items-center">
        <div className="animate-bounce mb-1">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="#EA4335">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
          </svg>
        </div>
        <div className="px-3 py-1.5 rounded-full shadow-lg" style={{ background: panelBg, border: `1px solid ${isDark ? '#333' : '#eee'}` }}>
          <span className="text-[13px] font-bold" style={{ color: text }}>{portfolioData.personal.location}</span>
        </div>
        {/* Drop shadow for pin */}
        <div className="w-6 h-2 rounded-full absolute bottom-[-5px] opacity-30" style={{ background: "black", filter: "blur(2px)" }} />
      </div>

      {/* Controls Container */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-4 z-20 pointer-events-none">
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg pointer-events-auto" style={{ background: panelBg }}>
          <button onClick={closeApp} className="p-1 -ml-2" style={{ color: textMuted }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search here"
            defaultValue="Mumbai, Maharashtra"
            className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium"
            style={{ color: text }}
          />
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
            N
          </div>
        </div>

        {/* Quick action chips */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pointer-events-auto pb-2">
          {quickActionChips.map((lbl, i) => (
            <button key={i} className="px-4 py-1.5 rounded-full shadow-md whitespace-nowrap text-[13px] font-medium"
              style={{ background: panelBg, color: text }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 rounded-t-[24px] shadow-2xl transition-transform"
        style={{ background: panelBg, borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}` }}>
        <div className="w-full flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full" style={{ background: isDark ? "#444" : "#ccc" }} />
        </div>

        <div className="px-5 pb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-[22px] font-bold" style={{ color: text }}>Mumbai</h2>
              <p className="text-[14px] mt-1" style={{ color: textMuted }}>Maharashtra, India</p>
            </div>
            <button className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md bg-blue-500">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
              </svg>
            </button>
          </div>

          <div className="flex gap-4 border-b pb-4 mb-4" style={{ borderColor: isDark ? "#333" : "#eee" }}>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <span className="text-[11px] font-medium" style={{ color: blue_app }}>Directions</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: `1px solid ${isDark ? "#444" : "#ccc"}` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#fff" : "#000"} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
              </div>
              <span className="text-[11px] font-medium" style={{ color: text }}>Save</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ border: `1px solid ${isDark ? "#444" : "#ccc"}` }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#fff" : "#000"} strokeWidth="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
              </div>
              <span className="text-[11px] font-medium" style={{ color: text }}>Share</span>
            </button>
          </div>

          <div>
            <h3 className="text-[15px] font-semibold mb-2" style={{ color: text }}>Latest updates</h3>
            <p className="text-[13px] leading-relaxed" style={{ color: textMuted }}>
              Explore the Gateway of India, Marine Drive, and the bustling tech hubs where modern software is being built.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const blue_app = "#007AFF"
