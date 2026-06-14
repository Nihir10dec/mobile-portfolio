"use client"

import { useState, useRef, useEffect } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { haptic } from "@/lib/haptics"
import { trackEvent } from "@/lib/analytics"
import { suggestedPrompts, greetingMessage } from "./chatgpt-app.data"

interface Message {
  id: number
  role: "user" | "assistant"
  text: string
}

export default function ChatGptApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#0d0d0d" : "#ffffff"
  const headerBg = isDark ? "#171717" : "#f7f7f8"
  const userBubble = isDark ? "#2f2f2f" : "#e9e9eb"
  const text = isDark ? "#ececec" : "#0d0d0d"
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"
  const border = isDark ? "#2a2a2a" : "#e5e5ea"
  const accent = "#10a37f"

  const [messages, setMessages] = useState<Message[]>([
    { id: 0, role: "assistant", text: greetingMessage },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [asked, setAsked] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(1)

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    })
  }

  useEffect(scrollToBottom, [messages, isTyping])

  // Suggestions the user hasn't asked yet — shown as follow-up chips.
  const followUps = suggestedPrompts.filter((p) => !asked.includes(p))

  const send = async (raw: string) => {
    const content = raw.trim()
    if (!content || isTyping) return
    haptic(8)
    trackEvent("chatgpt_message", { length: content.length })

    setAsked((a) => (a.includes(content) ? a : [...a, content]))
    const userMsg: Message = { id: idRef.current++, role: "user", text: content }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      })
      const data = await res.json()
      const reply: string = data?.reply ?? "Sorry, something went wrong. Try again."
      // Small delay to make the typing indicator feel natural.
      await new Promise((r) => setTimeout(r, 450))
      setMessages((m) => [...m, { id: idRef.current++, role: "assistant", text: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { id: idRef.current++, role: "assistant", text: "I couldn't reach the server. Please try again." },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: bg }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: border, background: headerBg }}
      >
        <button onClick={closeApp} aria-label="Close" style={{ color: accent }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: accent }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A5.98 5.98 0 0010.7.01 6.05 6.05 0 004.93 4.2a5.98 5.98 0 00-3.998 2.9 6.05 6.05 0 00.743 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.52 2.9A5.97 5.97 0 0013.3 24a6.05 6.05 0 005.77-4.2 5.98 5.98 0 004-2.9 6.05 6.05 0 00-.75-7.08h-.04zM13.3 22.43a4.48 4.48 0 01-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 00.4-.68v-6.74l2.02 1.17a.07.07 0 01.04.05v5.58a4.5 4.5 0 01-4.5 4.5l-.01.01z" />
            </svg>
          </div>
          <span className="text-[16px] font-semibold" style={{ color: text }}>
            ChatGPT
          </span>
        </div>
        <div className="w-6" />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            {m.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5"
                style={{ background: accent }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A5.98 5.98 0 0010.7.01 6.05 6.05 0 004.93 4.2a5.98 5.98 0 00-3.998 2.9 6.05 6.05 0 00.743 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.52 2.9A5.97 5.97 0 0013.3 24a6.05 6.05 0 005.77-4.2 5.98 5.98 0 004-2.9 6.05 6.05 0 00-.75-7.08h-.04z" />
                </svg>
              </div>
            )}
            <div
              className="max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[14px] leading-relaxed whitespace-pre-line"
              style={{
                background: m.role === "user" ? userBubble : "transparent",
                color: text,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mr-2"
              style={{ background: accent }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M22.28 9.82a5.98 5.98 0 00-.52-4.91 6.05 6.05 0 00-6.51-2.9A5.98 5.98 0 0010.7.01 6.05 6.05 0 004.93 4.2a5.98 5.98 0 00-3.998 2.9 6.05 6.05 0 00.743 7.1 5.98 5.98 0 00.51 4.91 6.05 6.05 0 006.52 2.9A5.97 5.97 0 0013.3 24a6.05 6.05 0 005.77-4.2 5.98 5.98 0 004-2.9 6.05 6.05 0 00-.75-7.08h-.04z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 px-3.5 py-3">
              <span className="w-2 h-2 rounded-full animate-eq-1" style={{ background: textMuted }} />
              <span className="w-2 h-2 rounded-full animate-eq-2" style={{ background: textMuted }} />
              <span className="w-2 h-2 rounded-full animate-eq-3" style={{ background: textMuted }} />
            </div>
          </div>
        )}
      </div>

      {/* Suggested prompts — persist as follow-up questions after each reply */}
      {followUps.length > 0 && !isTyping && (
        <div className="px-3 pb-2 flex gap-2 overflow-x-auto shrink-0">
          {followUps.map((p) => (
            <button
              key={p}
              onClick={() => send(p)}
              className="whitespace-nowrap text-[13px] px-3 py-1.5 rounded-full border shrink-0"
              style={{ borderColor: border, color: text }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Composer */}
      <div className="px-3 py-3 border-t shrink-0" style={{ borderColor: border, background: headerBg }}>
        <div className="flex items-end gap-2">
          <div
            className="flex-1 flex items-center rounded-3xl px-4 py-2"
            style={{ background: isDark ? "#2f2f2f" : "#ffffff", border: `1px solid ${border}` }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  send(input)
                }
              }}
              placeholder="Message ChatGPT…"
              className="flex-1 bg-transparent border-none outline-hidden text-[14px]"
              style={{ color: text }}
              aria-label="Message ChatGPT"
            />
          </div>
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || isTyping}
            aria-label="Send"
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-opacity"
            style={{ background: accent, opacity: input.trim() && !isTyping ? 1 : 0.4 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 4l8 8h-5v8h-6v-8H4l8-8z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
