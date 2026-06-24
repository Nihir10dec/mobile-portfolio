"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { playDTMF, startRingtone, stopRingtone, playHangup } from "@/lib/audio"
import { type ReactNode, useEffect, useState } from "react"
import type { Contact } from "./phone-app.types"
import { contacts, dialPad, recents } from "./phone-app.data"

type Tab = "recents" | "contacts" | "keypad"

export default function PhoneApp() {
  const { closeApp, openApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#000000" : "#ffffff"
  const panelBg = isDark ? "#1c1c1e" : "#f9f9f9"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)"
  const textActive = isDark ? "#f2f2f7" : "#1c1c1e"
  const btnBg = isDark ? "#333333" : "#e5e5ea"
  const border = isDark ? "#2c2c2e" : "#e5e5ea"

  const [tab, setTab] = useState<Tab>("contacts")
  const [number, setNumber] = useState("")
  const [callContact, setCallContact] = useState<Contact | null>(null)
  const [dialingNumber, setDialingNumber] = useState<string | null>(null)

  const getContact = (id: string) => contacts.find((c) => c.id === id)!

  const startCall = (contact: Contact) => {
    if (contact.isMe) {
      // Keep the number private — route to email instead.
      openApp("mail")
      return
    }
    setDialingNumber(null)
    setCallContact(contact)
  }

  const hapticPress = (digit: string) => {
    playDTMF(digit)
    if (number.length < 15) setNumber((prev) => prev + digit)
  }

  const dialCall = () => {
    if (!number) return
    setCallContact(null)
    setDialingNumber(number)
  }

  const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
    {
      id: "recents",
      label: "Recents",
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </>
      ),
    },
    {
      id: "contacts",
      label: "Contacts",
      icon: (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        </>
      ),
    },
    {
      id: "keypad",
      label: "Keypad",
      icon: (
        <>
          <rect x="3" y="3" width="6" height="6" />
          <rect x="15" y="3" width="6" height="6" />
          <rect x="3" y="15" width="6" height="6" />
          <rect x="15" y="15" width="6" height="6" />
        </>
      ),
    },
  ]

  const Avatar = ({ contact, size = 40 }: { contact: Contact; size?: number }) => (
    <div
      className="rounded-full flex items-center justify-center shrink-0 text-white font-semibold"
      style={{ width: size, height: size, background: contact.gradient, fontSize: size * 0.42 }}
    >
      {contact.initial}
    </div>
  )

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: bg }}>
      {/* Header */}
      <div className="w-full flex items-center justify-between px-4 pt-3 pb-1 shrink-0">
        <button onClick={closeApp} className="flex items-center gap-1 p-1 active:opacity-50 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[16px]" style={{ color: "#007AFF" }}>Home</span>
        </button>
        <h2 className="text-[17px] font-semibold capitalize" style={{ color: text }}>{tab}</h2>
        <div className="w-[60px]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {tab === "contacts" && (
          <div className="px-2 pb-2">
            {contacts.map((c) => (
              <button
                key={c.id}
                onClick={() => startCall(c)}
                className="w-full flex items-center gap-3 px-2 py-2.5 active:opacity-60 transition-opacity text-left"
                style={{ borderBottom: `0.5px solid ${border}` }}
              >
                <Avatar contact={c} />
                <div className="flex-1 min-w-0">
                  <div className="text-[16px] font-medium truncate" style={{ color: text }}>{c.name}</div>
                  <div className="text-[12px] truncate" style={{ color: textMuted }}>{c.subtitle}</div>
                </div>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#34C759">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {tab === "recents" && (
          <div className="px-2 pb-2">
            {recents.map((r, i) => {
              const c = getContact(r.contactId)
              const isMissed = r.type === "missed"
              return (
                <button
                  key={i}
                  onClick={() => startCall(c)}
                  className="w-full flex items-center gap-3 px-2 py-2.5 active:opacity-60 transition-opacity text-left"
                  style={{ borderBottom: `0.5px solid ${border}` }}
                >
                  <Avatar contact={c} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-[16px] font-medium truncate"
                        style={{ color: isMissed ? "#FF3B30" : text }}
                      >
                        {c.name}
                      </span>
                      {r.count ? <span className="text-[15px]" style={{ color: isMissed ? "#FF3B30" : textMuted }}>({r.count})</span> : null}
                    </div>
                    <div className="flex items-center gap-1 text-[12px]" style={{ color: textMuted }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        {r.type === "outgoing" ? (
                          <path d="M7 17L17 7M17 7H9M17 7v8" />
                        ) : (
                          <path d="M17 7L7 17M7 17h8M7 17V9" />
                        )}
                      </svg>
                      <span className="capitalize">{r.type === "missed" ? "Missed" : r.type}</span>
                    </div>
                  </div>
                  <span className="text-[13px]" style={{ color: textMuted }}>{r.time}</span>
                </button>
              )
            })}
          </div>
        )}

        {tab === "keypad" && (
          <div className="w-full h-full flex flex-col items-center">
            <div className="w-full flex flex-col justify-end items-center min-h-[64px] pt-2 pb-1">
              {number ? (
                <h1 className="text-[34px] font-light tracking-wide" style={{ color: text }}>
                  {number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                </h1>
              ) : (
                <span className="text-[13px] text-center px-6" style={{ color: textMuted }}>My number is private — try the Contacts tab 😉</span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-x-5 gap-y-2.5 px-8 mt-1">
              {dialPad.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => hapticPress(btn.num)}
                  className="w-[62px] h-[62px] rounded-full flex flex-col items-center justify-center active:opacity-60 transition-opacity"
                  style={{ background: btnBg }}
                >
                  <span className="text-[28px] font-medium leading-[28px]" style={{ color: textActive }}>{btn.num}</span>
                  {btn.alpha && (
                    <span className="text-[9px] tracking-widest font-bold mt-0.5" style={{ color: textMuted }}>{btn.alpha}</span>
                  )}
                </button>
              ))}
            </div>

            <div className="w-full flex justify-between items-center px-12 mt-4">
              <div className="w-12" />
              <button
                onClick={dialCall}
                className="w-[62px] h-[62px] rounded-full flex items-center justify-center bg-[#34C759] active:opacity-70 transition-opacity"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </button>
              <div className="w-12 flex justify-center">
                {number ? (
                  <button onClick={() => setNumber((prev) => prev.slice(0, -1))} className="w-12 h-12 flex items-center justify-center active:opacity-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2">
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 002-2V6a2 2 0 00-2-2zM18 9l-6 6M12 9l6 6" />
                    </svg>
                  </button>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom tab bar (part of layout, never overlaps content) */}
      <div
        className="w-full flex items-stretch justify-around shrink-0 border-t pt-1.5 pb-2"
        style={{ background: panelBg, borderColor: border }}
      >
        {tabs.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex flex-col items-center justify-center gap-1 px-4 active:opacity-60 transition-opacity"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#007AFF" : textMuted} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
                {t.icon}
              </svg>
              <span className="text-[10px] font-medium" style={{ color: active ? "#007AFF" : textMuted }}>{t.label}</span>
            </button>
          )
        })}
      </div>

      {/* Call overlay */}
      {(callContact || dialingNumber) && (
        <CallScreen
          contact={callContact}
          dialingNumber={dialingNumber}
          isDark={isDark}
          onEmail={() => {
            setCallContact(null)
            setDialingNumber(null)
            openApp("mail")
          }}
          onEnd={() => {
            setCallContact(null)
            setDialingNumber(null)
          }}
        />
      )}
    </div>
  )
}

function CallScreen({
  contact,
  dialingNumber,
  isDark,
  onEmail,
  onEnd,
}: {
  contact: Contact | null
  dialingNumber: string | null
  isDark: boolean
  onEmail: () => void
  onEnd: () => void
}) {
  const [seconds, setSeconds] = useState(0)
  const [connected, setConnected] = useState(false)
  const [lineIndex, setLineIndex] = useState(0)

  const lines = contact ? contact.callLines : []
  const name = contact ? contact.name : dialingNumber
  const initial = contact ? contact.initial : "#"
  const gradient = contact ? contact.gradient : "linear-gradient(135deg, #8e9eab 0%, #4b5563 100%)"

  useEffect(() => {
    startRingtone()
    const ring = setTimeout(() => {
      stopRingtone()
      setConnected(true)
    }, 1600)
    const tick = setInterval(() => {
      setConnected((c) => {
        if (c) setSeconds((s) => s + 1)
        return c
      })
    }, 1000)
    const cycle = setInterval(() => setLineIndex((i) => i + 1), 2600)
    return () => {
      stopRingtone()
      clearTimeout(ring)
      clearInterval(tick)
      clearInterval(cycle)
    }
  }, [])

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`

  // For a dialed (unknown) number, lean into the "not in service" joke.
  const dialedLines = [
    "This number prefers emails 📧",
    "Sorry, the developer is unavailable.",
    "Try the Mail app instead?",
  ]
  const activeLines = dialingNumber ? dialedLines : lines
  const status = activeLines.length ? activeLines[lineIndex % activeLines.length] : fmt(seconds)

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col items-center justify-between py-12 px-6"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #1c1c1e 0%, #000000 100%)"
          : "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 100%)",
      }}
    >
      <div className="flex flex-col items-center mt-6">
        <div
          className="rounded-full flex items-center justify-center text-white font-semibold mb-5 shadow-lg"
          style={{ width: 96, height: 96, background: gradient, fontSize: 40 }}
        >
          {initial}
        </div>
        <h1 className="text-[26px] font-semibold text-white text-center px-2">{name}</h1>
        <p className="text-[15px] text-white/70 mt-2 text-center min-h-[20px] px-4">
          {connected ? status : "calling…"}
          {connected && activeLines.length > 0 && (
            <span className="block text-white/40 text-[13px] mt-1">{fmt(seconds)}</span>
          )}
        </p>
      </div>

      <div className="flex items-center gap-10 mb-4">
        <button
          onClick={onEmail}
          className="flex flex-col items-center gap-1.5 active:opacity-60 transition-opacity"
        >
          <div className="w-[64px] h-[64px] rounded-full bg-white/15 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </div>
          <span className="text-[12px] text-white/80">Email me</span>
        </button>

        <button
          onClick={() => { playHangup(); onEnd() }}
          className="flex flex-col items-center gap-1.5 active:opacity-70 transition-opacity"
        >
          <div className="w-[64px] h-[64px] rounded-full bg-[#FF3B30] flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path
                d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                transform="rotate(135 12 12)"
              />
            </svg>
          </div>
          <span className="text-[12px] text-white/80">End</span>
        </button>
      </div>
    </div>
  )
}
