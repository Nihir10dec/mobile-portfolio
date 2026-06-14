"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { useState } from "react"
import { today, todayDate, monthName, dayName, shortDay, events, monthDays, eventDots } from "./calendar-app.data"

// ─── iOS Apple Calendar ────────────────────────────────────────────────────

function IOSCalendar() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#000000" : "#ffffff"
  const panelBg = isDark ? "#1c1c1e" : "#f2f2f7"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
  const borderColor = isDark ? "#333" : "#e5e5ea"
  const red = "#FF3B30"
  const blue = "#007AFF"

  const days = ["S", "M", "T", "W", "T", "F", "S"]

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto no-scrollbar" style={{ background: bg }}>
      {/* Header */}
      <div className="pt-2 px-4 pb-2 flex items-center justify-between sticky top-0 z-20" style={{ background: bg }}>
        <button onClick={closeApp}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke={red} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="text-[20px] font-semibold" style={{ color: red }}>{monthName}</span>
        <div className="flex gap-4">
          <button>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={red} strokeWidth="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="text-[28px] font-light leading-none" style={{ color: red, marginTop: "-2px" }}>+</button>
        </div>
      </div>

      {/* Mini Calendar */}
      <div className="px-4 py-2 border-b" style={{ borderColor, background: panelBg }}>
        <div className="flex justify-between mb-2">
          {days.map((d, i) => (
            <span key={i} className="text-[10px] font-bold w-10 text-center"
              style={{ color: i === 0 || i === 6 ? textMuted : text }}>{d}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-1 place-items-center">
          <div /><div /><div />
          {monthDays.map((v) => (
            <div key={v} className="relative flex flex-col items-center">
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center text-[15px] font-medium"
                style={{
                  background: v === todayDate ? red : "transparent",
                  color: v === todayDate ? "#fff" : text,
                }}
              >
                {v}
              </button>
              {eventDots[v] && v !== todayDate && (
                <div className="flex gap-[2px] mt-[1px]">
                  {eventDots[v].slice(0, 3).map((c, i) => (
                    <div key={i} className="w-1 h-1 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Day Schedule */}
      <div className="flex-1 flex flex-col pt-2">
        <div className="px-4 py-2">
          <h2 className="text-[20px] font-bold" style={{ color: text }}>{dayName}</h2>
        </div>

        <div className="px-2 pb-20 relative">
          <div className="absolute left-14 top-0 bottom-0 border-l" style={{ borderColor }} />
          <div className="absolute left-12 right-2 border-t z-20 flex items-center" style={{ top: "80px", borderColor: red }}>
            <div className="w-2 h-2 rounded-full absolute -left-1" style={{ background: red }} />
          </div>

          {events.map((ev, i) => (
            <div key={i} className="flex" style={{ marginTop: i === 0 ? "16px" : "12px" }}>
              <div className="w-12 text-right pr-2 shrink-0">
                <span className="text-[12px] font-medium" style={{ color: textMuted }}>{ev.time}</span>
              </div>
              <div className="flex-1 ml-2">
                <div
                  className="rounded-lg pl-3 pr-2 py-2 shadow-sm"
                  style={{ background: `${ev.color}22`, borderLeft: `3px solid ${ev.color}` }}
                >
                  <h3 className="text-[13px] font-bold truncate" style={{ color: text }}>{ev.title}</h3>
                  <p className="text-[11px] mt-0.5 truncate" style={{ color: textMuted }}>{ev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="sticky bottom-0 border-t flex justify-between px-6 py-3 backdrop-blur-xl z-20"
        style={{ borderColor, background: `${panelBg}cc` }}>
        <button className="text-[15px] font-medium" style={{ color: red }}>Today</button>
        <button className="text-[15px] font-medium" style={{ color: red }}>Calendars</button>
        <button className="text-[15px] font-medium" style={{ color: red }}>Inbox</button>
      </div>
    </div>
  )
}

// ─── Android Google Calendar ───────────────────────────────────────────────

function AndroidCalendar() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"
  const [selectedDay, setSelectedDay] = useState(todayDate)

  const bg = isDark ? "#1c1c1e" : "#ffffff"
  const surfaceBg = isDark ? "#2c2c2e" : "#f8f9fa"
  const headerBg = isDark ? "#1c1c1e" : "#ffffff"
  const text = isDark ? "#e8eaed" : "#202124"
  const textMuted = isDark ? "rgba(232,234,237,0.55)" : "rgba(32,33,36,0.55)"
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
  const blue = "#1a73e8"
  const todayBg = isDark ? "#174ea6" : "#1a73e8"

  const days = ["S", "M", "T", "W", "T", "F", "S"]

  const selectedEvents = selectedDay === todayDate ? events : []

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: bg }}>

      {/* Top App Bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ background: headerBg, borderColor }}>
        <button onClick={closeApp} className="w-9 h-9 flex items-center justify-center rounded-full active:bg-black/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke={text} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <span className="flex-1 text-[20px] font-normal" style={{ color: text }}>
          {today.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button className="w-9 h-9 flex items-center justify-center rounded-full">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={text} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[13px] text-white"
          style={{ background: blue }}>
          N
        </div>
      </div>

      {/* Month Grid */}
      <div className="px-3 pt-3 pb-2" style={{ background: headerBg }}>
        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {days.map((d, i) => (
            <div key={i} className="text-center text-[11px] font-medium py-1"
              style={{ color: i === 0 ? "#d93025" : textMuted }}>{d}</div>
          ))}
        </div>
        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-[2px]">
          {/* 3-day offset for first of month */}
          <div /><div /><div />
          {monthDays.map((v) => {
            const isToday = v === todayDate
            const isSelected = v === selectedDay
            const dots = eventDots[v]
            return (
              <button
                key={v}
                onClick={() => setSelectedDay(v)}
                className="flex flex-col items-center py-[3px] rounded-lg"
                style={{ background: isSelected && !isToday ? `${blue}18` : "transparent" }}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-medium"
                  style={{
                    background: isToday ? todayBg : "transparent",
                    color: isToday ? "#fff" : isSelected ? blue : v < todayDate ? textMuted : text,
                  }}
                >
                  {v}
                </span>
                <div className="flex gap-[2px] h-[5px] mt-[1px]">
                  {dots?.slice(0, 3).map((c, i) => (
                    <div key={i} className="w-[4px] h-[4px] rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: borderColor }} />

      {/* Selected day label */}
      <div className="px-4 py-2 flex items-center gap-2">
        <span className="text-[13px] font-medium" style={{ color: textMuted }}>
          {selectedDay === todayDate
            ? today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
            : `${shortDay}, ${today.toLocaleString("en-US", { month: "short" })} ${selectedDay}`}
        </span>
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto px-3 pb-24 no-scrollbar">
        {selectedEvents.length > 0 ? (
          <div className="flex flex-col gap-2">
            {selectedEvents.map((ev, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl px-3 py-3"
                style={{ background: surfaceBg }}
              >
                <div className="flex flex-col items-center pt-0.5 gap-[3px]">
                  <div className="w-[10px] h-[10px] rounded-full mt-1" style={{ background: ev.color }} />
                  <div className="w-[1.5px] flex-1 rounded-full" style={{ background: ev.color, opacity: 0.3 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium truncate" style={{ color: text }}>{ev.title}</p>
                  <p className="text-[12px] mt-0.5" style={{ color: textMuted }}>{ev.time} · {ev.location}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="18" rx="2" stroke={textMuted} strokeWidth="1.5" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke={textMuted} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-[14px]" style={{ color: textMuted }}>No events</p>
          </div>
        )}
      </div>

      {/* FAB */}
      <div className="absolute bottom-20 right-4 z-30">
        <button
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ background: blue }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6v-2z" />
          </svg>
        </button>
      </div>

      {/* Android bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around py-2 border-t z-20"
        style={{ background: headerBg, borderColor }}>
        {[
          { label: "Schedule", active: true, icon: <><path d="M3 12h18M3 6h6m-6 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></> },
          { label: "Day", active: false, icon: <><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" /><path d="M3 10h18" stroke="currentColor" strokeWidth="2" /></> },
          { label: "Month", active: false, icon: <><rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" stroke="currentColor" /><path d="M8 2v4m8-4v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></> },
        ].map((item, i) => (
          <button key={i} className="flex flex-col items-center gap-1 px-4 py-1">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              style={{ color: item.active ? blue : textMuted }}>
              {item.icon}
            </svg>
            <span className="text-[10px] font-medium"
              style={{ color: item.active ? blue : textMuted }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Export ────────────────────────────────────────────────────────────────

export default function CalendarApp() {
  const { device } = useDevice()
  return device === "android" ? <AndroidCalendar /> : <IOSCalendar />
}
