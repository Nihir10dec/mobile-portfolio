"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { useState, useEffect } from "react"
import { playlists, recentTracks } from "./spotify-app.data"
import { useNowPlaying } from "@/hooks/use-now-playing"

type Time = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

function getTimeBasedGreeting(hour: number): Time {
  if (hour >= 6 && hour < 12) return "Morning"
  if (hour >= 12 && hour < 18) return "Afternoon"
  if (hour >= 18 && hour < 24) return "Evening"
  return "Night"
}

const Message = `Good ${getTimeBasedGreeting(new Date().getHours())}`

export default function SpotifyApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"
  const { setNowPlaying, clearNowPlaying } = useNowPlaying()

  const bg = isDark ? "#121212" : "#ffffff"
  const panelBg = isDark ? "#181818" : "#f0f0f0"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "#b3b3b3" : "#666666"
  const green = "#1DB954"

  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  // Publish playback state to the Dynamic Island live activity.
  useEffect(() => {
    if (isPlaying) {
      setNowPlaying({
        track: "Building the Engine",
        artist: portfolioData.personal.name,
        artwork: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)",
      })
    } else {
      clearNowPlaying()
    }
  }, [isPlaying, setNowPlaying, clearNowPlaying])

  // Stop the live activity when leaving the app.
  useEffect(() => () => clearNowPlaying(), [clearNowPlaying])

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" style={{ background: bg }}>
      {/* Background Gradient overlay based on current playlist */}
      <div
        className="absolute inset-x-0 top-0 h-[400px] opacity-20 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #1f4037 0%, transparent 100%)" }}
      />

      {/* Header */}
      <div className="z-10 px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={closeApp} className="w-8 h-8 rounded-full flex items-center justify-center bg-black/40 text-white backdrop-blur-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="text-[22px] font-bold" style={{ color: text }}>{Message}</h1>
        </div>
        <div className="flex gap-4 items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto z-10 no-scrollbar pb-24">
        {/* Quick Picks 2x2 Grid */}
        <div className="grid grid-cols-2 gap-2 px-4 mb-6">
          {playlists.map((pl, i) => (
            <div key={i} className="flex items-center rounded-sm overflow-hidden h-14" style={{ background: panelBg }}>
              <div className="w-14 h-14 shrink-0" style={{ background: pl.color }} />
              <span className="text-[12px] font-bold px-3 leading-tight truncate" style={{ color: text }}>{pl.title}</span>
            </div>
          ))}
        </div>

        {/* Play control area for active list */}
        <div className="px-4 mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-[24px] font-bold leading-none mb-2" style={{ color: text }}>Deep Focus Code</h2>
            <p className="text-[13px] font-medium" style={{ color: textMuted }}>Mixed by {portfolioData.personal.name} • 45 mins</p>
          </div>
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center transform hover:scale-105 transition shadow-lg"
            style={{ background: green }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="black"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="black" className="ml-1"><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
        </div>

        {/* Tracklist */}
        <div className="px-4 space-y-4 mb-8">
          {recentTracks.map((trk, i) => (
            <button key={i} className="w-full flex items-center justify-between text-left group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 overflow-hidden rounded-sm" style={{ background: isDark ? "#282828" : "#e0e0e0" }}>
                  {trk.image ? (
                    <img src={trk.image} alt={trk.album} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full opacity-50 flex items-center justify-center">🎵</div>
                  )}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold truncate" style={{ color: i === 0 && isPlaying ? green : text }}>{trk.title}</h3>
                  <p className="text-[13px] truncate" style={{ color: textMuted }}>{portfolioData.personal.name} • {trk.album}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
              </div>
            </button>
          ))}
        </div>

        {/* Made For You Section */}
        <div className="px-4 mb-4">
          <h2 className="text-[20px] font-bold mb-4" style={{ color: text }}>Made For You</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {playlists.slice().reverse().map((pl, i) => (
              <div key={i} className="shrink-0 w-[140px]">
                <div className="w-[140px] h-[140px] rounded-md mb-3 shadow-md" style={{ background: pl.color }} />
                <h3 className="text-[13px] font-bold truncate mb-1" style={{ color: text }}>{pl.title}</h3>
                <p className="text-[12px] truncate" style={{ color: textMuted }}>{pl.artist}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Player Bar (Bottom) */}
      <div className="absolute bottom-[54px] left-2 right-2 rounded-md px-3 py-2 flex items-center justify-between z-20 shadow-lg" style={{ background: panelBg }}>
        <div className="flex items-center gap-3 w-3/4">
          <div className="w-10 h-10 rounded shadow-sm shrink-0" style={{ background: "linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)" }} />
          <div className="min-w-0">
            <h3 className="text-[13px] font-bold truncate" style={{ color: text }}>Building the Engine</h3>
            <p className="text-[11px] truncate" style={{ color: textMuted }}>{portfolioData.personal.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill={text}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
          <button onClick={() => setIsPlaying(!isPlaying)}>
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill={text}><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            ) : (
              <svg width="26" height="26" viewBox="0 0 24 24" fill={text}><path d="M8 5v14l11-7z" /></svg>
            )}
          </button>
        </div>
        {/* Progress bar line */}
        <div className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full overflow-hidden" style={{ background: isDark ? "#333" : "#ddd" }}>
          <div className="h-full bg-white" style={{ width: "35%", background: isDark ? "#fff" : "#000" }} />
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-14 flex justify-around items-center z-20 border-t" style={{ background: bg, borderColor: isDark ? "#282828" : "#eee" }}>
        {[
          { label: "Home", fill: true },
          { label: "Search", fill: false },
          { label: "Library", fill: false },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center justify-center pt-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill={item.fill ? text : "none"} stroke={item.fill ? "none" : text} strokeWidth="2">
              {i === 0 ? <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /> : i === 1 ? <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
            <span className="text-[10px] mt-1 font-medium" style={{ color: item.fill ? text : textMuted }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
