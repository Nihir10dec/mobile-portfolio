"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { keyboardRows } from "./mail-app.data"

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

export default function MailApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#000000" : "#ffffff"
  const panelBg = isDark ? "#1c1c1e" : "#f2f2f7"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
  const blue = "#007AFF"

  const [replyEmail, setReplyEmail] = useState("")
  const [subject, setSubject] = useState("Let's connect regarding...")
  const [body, setBody] = useState(
    `Hi ${portfolioData.personal.firstName},\n\nI saw your OS.portfolio and wanted to reach out regarding a potential collaboration/opportunity.\n\nBest,\n[Your Name]`,
  )
  const [botcheck, setBotcheck] = useState("")
  const [sending, setSending] = useState(false)

  const canSend = body.trim().length > 0 && !sending

  const handleSend = async () => {
    if (botcheck) return // honeypot tripped
    if (!body.trim()) {
      toast.error("Please write a message before sending.")
      return
    }
    if (!WEB3FORMS_KEY) {
      toast.error("Email service is not configured.")
      return
    }

    setSending(true)
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: subject.trim() || "New message from OS.portfolio",
          email: replyEmail.trim() || undefined,
          from_name: `${portfolioData.personal.firstName} Mobile OS.portfolio Contact`,
          message: body,
          botcheck,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        toast.success(`Message sent! ${portfolioData.personal.firstName} will get back to you soon.`)
        setReplyEmail("")
        setSubject("Let's connect regarding...")
        setBody("")
        closeApp()
      } else {
        toast.error(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      toast.error("Couldn't send your message. Check your connection and try again.")
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: bg }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: isDark ? "#333" : "#e5e5ea", background: panelBg }}>
        <button onClick={closeApp} className="text-[16px]" style={{ color: text }}>Cancel</button>
        <span className="text-[16px] font-semibold" style={{ color: text }}>New Message</span>
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`text-[16px] font-semibold transition-opacity ${canSend ? "opacity-100" : "opacity-50"}`}
          style={{ color: blue }}
        >
          {sending ? "Sending…" : "Send"}
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex border-b pl-4" style={{ borderColor: isDark ? "#333" : "#e5e5ea" }}>
          <label className="py-3 w-16 text-[15px]" style={{ color: textMuted }}>To:</label>
          <div className="py-3 flex-1">
            <span className="bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-md text-[15px] font-medium">{portfolioData.personal.email}</span>
          </div>
        </div>

        <div className="flex border-b pl-4" style={{ borderColor: isDark ? "#333" : "#e5e5ea" }}>
          <label htmlFor="mail-from" className="py-3 w-16 text-[15px]" style={{ color: textMuted }}>From:</label>
          <input
            id="mail-from"
            type="email"
            value={replyEmail}
            onChange={(e) => setReplyEmail(e.target.value)}
            placeholder="your@email.com"
            className="py-3 flex-1 bg-transparent border-none outline-none text-[15px]"
            style={{ color: text }}
          />
        </div>

        <div className="flex border-b pl-4" style={{ borderColor: isDark ? "#333" : "#e5e5ea" }}>
          <label htmlFor="mail-subject" className="py-3 w-16 text-[15px]" style={{ color: textMuted }}>Subject:</label>
          <input
            id="mail-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="py-3 flex-1 bg-transparent border-none outline-none text-[15px]"
            style={{ color: text }}
            placeholder="Let's connect regarding..."
          />
        </div>

        <div className="p-4 h-full">
          {/* Honeypot field — hidden from humans, catches bots */}
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={botcheck}
            onChange={(e) => setBotcheck(e.target.value)}
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
          />
          <textarea
            className="w-full h-[300px] bg-transparent border-none outline-none text-[16px] resize-none"
            style={{ color: text }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>

      {/* Keyboard */}
      <div className="border-t flex flex-col" style={{ borderColor: isDark ? "#333" : "#e5e5ea", background: panelBg }}>
        {/* Toolbar */}
        <div className="flex justify-between items-center px-3 py-1.5 border-b" style={{ borderColor: isDark ? "#2a2a2a" : "#e5e5ea" }}>
          <span className="text-[15px] font-medium" style={{ color: textMuted }}>Aa</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={blue}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
        </div>
        {/* Key rows */}
        <div className="px-1.5 py-1.5 flex flex-col gap-[5px]">
          {keyboardRows.map((row, rowIdx) => (
            <div key={rowIdx} className={`flex gap-[5px] ${rowIdx === 1 ? 'px-4' : ''}`}>
              {rowIdx === 2 && (
                <div className="w-9 h-9 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background: isDark ? '#505050' : '#adb5bd' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isDark ? 'white' : '#333'}>
                    <path d="M12 4L4 12h5v7h6v-7h5L12 4z" />
                  </svg>
                </div>
              )}
              {row.map(k => (
                <div key={k} className="flex-1 h-9 rounded-[7px] flex items-center justify-center text-[13px] font-medium select-none"
                  style={{ background: isDark ? '#3d3d3d' : '#fff', color: text, boxShadow: isDark ? '0 1px 0 #1a1a1a' : '0 1px 0 rgba(0,0,0,0.25)' }}>
                  {k}
                </div>
              ))}
              {rowIdx === 2 && (
                <div className="w-9 h-9 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background: isDark ? '#505050' : '#adb5bd' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill={isDark ? 'white' : '#333'}>
                    <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          {/* Bottom row */}
          <div className="flex gap-[5px]">
            <div className="w-14 h-9 rounded-[7px] flex items-center justify-center text-[13px]"
              style={{ background: isDark ? '#505050' : '#adb5bd', color: text }}>123</div>
            <div className="flex-1 h-9 rounded-[7px] flex items-center justify-center text-[13px]"
              style={{ background: isDark ? '#3d3d3d' : '#fff', color: textMuted, boxShadow: isDark ? '0 1px 0 #1a1a1a' : '0 1px 0 rgba(0,0,0,0.25)' }}>space</div>
            <div className="w-16 h-9 rounded-[7px] flex items-center justify-center text-[13px] font-medium"
              style={{ background: isDark ? '#505050' : '#adb5bd', color: blue }}>return</div>
          </div>
        </div>
      </div>
    </div>
  )
}
