"use client"

import { useState, useRef, useEffect } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { haptic } from "@/lib/haptics"
import { trackEvent } from "@/lib/analytics"
import { messagesIntro, draftTemplates, type DraftTemplate } from "./messages-app.data"

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Phone: optional +, then at least 7 digits (separators allowed).
const isValidPhone = (v: string) => (v.match(/\d/g)?.length ?? 0) >= 7 && /^[+\d\s().-]+$/.test(v)

interface Bubble {
  id: number
  from: "them" | "me"
  text: string
}

/**
 * The Messages app is a guided contact form disguised as a chat:
 *   browsing → pick a starter; nothing drafted yet
 *   drafting → a templated message appears with inline blanks (___) to fill,
 *              plus required contact details. Send is BLOCKED until the draft
 *              is complete (name + every blank + a valid email or phone).
 *   sending/sent → exactly ONE honeypot-guarded Web3Forms submission.
 *
 * One email per conversation keeps the free-tier quota intact and the honeypot
 * blocks automated/bot spam.
 */
type Phase = "browsing" | "drafting" | "sending" | "sent"

export default function MessagesApp() {
  const { closeApp } = useAppNavigation()
  const { theme, device } = useDevice()
  const isDark = theme === "dark"
  const isAndroid = device === "android"

  const bg = isDark ? "#000000" : "#ffffff"
  const headerBg = isDark ? "#1c1c1e" : "#f7f7f8"
  const cardBg = isDark ? "#1c1c1e" : "#f2f2f7"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)"
  const border = isDark ? "#2a2a2a" : "#e5e5ea"
  const themBubble = isDark ? "#26262a" : "#e9e9eb"
  // iMessage blue vs Android (Material) accent
  const meBubble = isAndroid ? "#1a73e8" : "#007AFF"

  const [bubbles, setBubbles] = useState<Bubble[]>(
    messagesIntro.map((t, i) => ({ id: i, from: "them", text: t })),
  )
  const [phase, setPhase] = useState<Phase>("browsing")
  const [template, setTemplate] = useState<DraftTemplate | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [botcheck, setBotcheck] = useState("")
  const idRef = useRef(messagesIntro.length)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = scrollRef.current
      if (el) el.scrollTop = el.scrollHeight
    })
  }, [bubbles, template, phase])

  const addThem = (t: string) =>
    setBubbles((b) => [...b, { id: idRef.current++, from: "them", text: t }])

  const pickTemplate = (t: DraftTemplate) => {
    haptic(8)
    setTemplate(t)
    setValues({})
    setPhase("drafting")
  }

  const cancelDraft = () => {
    setTemplate(null)
    setValues({})
    setPhase("browsing")
  }

  const setField = (key: string, v: string) =>
    setValues((prev) => ({ ...prev, [key]: v }))

  // What's still missing before the message can be sent.
  const missing: string[] = []
  if (template) {
    for (const f of template.fields) {
      if (!values[f.key]?.trim()) missing.push(f.placeholder)
    }
  }
  const emailOk = email.trim() !== "" && EMAIL_RE.test(email.trim())
  const phoneOk = phone.trim() !== "" && isValidPhone(phone.trim())
  if (email.trim() && !emailOk) missing.push("a valid email")
  if (phone.trim() && !phoneOk) missing.push("a valid phone number")
  if (!emailOk && !phoneOk) missing.push("a valid email or phone number")
  const canSend = template !== null && missing.length === 0

  // Render the drafted message as plain text (for the sent bubble + email body).
  const buildMessage = (): string => {
    if (!template) return ""
    const body = template.segments
      .map((seg) => (typeof seg === "string" ? seg : values[seg.field]?.trim() ?? ""))
      .join("")
    const contact = [emailOk ? email.trim() : "", phoneOk ? phone.trim() : ""]
      .filter(Boolean)
      .join(" or ")
    return `${body} You can reach me at ${contact}.`
  }

  // The ONLY network request — one honeypot-guarded submission per conversation.
  const submit = async () => {
    if (!canSend || phase === "sending") return
    if (botcheck) return // honeypot tripped → silently drop bots
    haptic(12)

    const message = buildMessage()
    const name = values.name?.trim() || "Someone"

    if (!WEB3FORMS_KEY) {
      setBubbles((b) => [...b, { id: idRef.current++, from: "me", text: message }])
      setPhase("sent")
      setTemplate(null)
      addThem("⚠️ The email service isn't configured, but your draft is noted here.")
      return
    }

    setPhase("sending")
    trackEvent("messages_send", { template: template?.id })
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New ${template?.id} message from Mobile Portfolio`,
          email: emailOk ? email.trim() : undefined,
          from_name: `${name} (Mobile Portfolio Messages)`,
          message: `${message}\n\n— Name: ${name}\n— Email: ${emailOk ? email.trim() : "—"}\n— Phone: ${phoneOk ? phone.trim() : "—"}`,
          botcheck,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setBubbles((b) => [...b, { id: idRef.current++, from: "me", text: message }])
        setPhase("sent")
        setTemplate(null)
        setValues({})
        setEmail("")
        setPhone("")
        addThem(`Sent! Thanks ${name.split(" ")[0]} — ${portfolioData.personal.firstName} will reply soon. 🚀`)
      } else {
        setPhase("drafting")
        addThem("Hmm, that didn't go through. Tap Send to try again.")
      }
    } catch {
      setPhase("drafting")
      addThem("Couldn't send — check your connection and tap Send to retry.")
    }
  }

  return (
    <div className="w-full h-full flex flex-col" style={{ background: bg }}>
      {/* Header */}
      <div
        className="flex items-center px-3 py-2.5 border-b shrink-0"
        style={{ borderColor: border, background: headerBg }}
      >
        <button onClick={closeApp} aria-label="Back" className="mr-1" style={{ color: meBubble }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex flex-col items-center flex-1">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[14px] font-semibold text-white mb-0.5"
            style={{ background: "linear-gradient(135deg,#6a5acd,#9370db)" }}
          >
            {portfolioData.personal.initial}
          </div>
          <span className="text-[13px] font-medium" style={{ color: text }}>
            {portfolioData.personal.firstName}
          </span>
        </div>
        <div className="w-7" />
      </div>

      {/* Thread */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
        {bubbles.map((b) => (
          <div key={b.id} className={`flex ${b.from === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[78%] px-3.5 py-2 text-[14px] leading-snug whitespace-pre-line"
              style={{
                background: b.from === "me" ? meBubble : themBubble,
                color: b.from === "me" ? "#ffffff" : text,
                borderRadius: isAndroid ? 18 : 20,
              }}
            >
              {b.text}
            </div>
          </div>
        ))}

        {/* Draft card — fill-in-the-blanks message */}
        {phase !== "browsing" && template && (
          <div className="pt-2">
            <div
              className="rounded-2xl p-3.5"
              style={{ background: cardBg, border: `1px solid ${border}` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold uppercase tracking-wide" style={{ color: textMuted }}>
                  Draft to {portfolioData.personal.firstName}
                </span>
                <button onClick={cancelDraft} aria-label="Discard draft" style={{ color: textMuted }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Message body with inline blanks */}
              <p className="text-[14px] leading-7" style={{ color: text }}>
                {template.segments.map((seg, i) =>
                  typeof seg === "string" ? (
                    <span key={i}>{seg}</span>
                  ) : (
                    <FillInput
                      key={i}
                      value={values[seg.field] ?? ""}
                      placeholder={fieldPlaceholder(template, seg.field)}
                      onChange={(v) => setField(seg.field, v)}
                      accent={meBubble}
                      text={text}
                      muted={textMuted}
                    />
                  ),
                )}
              </p>

              {/* Contact details (at least one required) */}
              <div className="mt-3 pt-3 space-y-2" style={{ borderTop: `1px solid ${border}` }}>
                <p className="text-[11px]" style={{ color: textMuted }}>
                  How should {portfolioData.personal.firstName} reach you? (email or phone — at least one)
                </p>
                <input
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  aria-label="Your email"
                  className="w-full text-[14px] px-3 py-2 rounded-lg bg-transparent border outline-hidden"
                  style={{ borderColor: email && !emailOk ? "#ff3b30" : border, color: text }}
                />
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="phone number"
                  aria-label="Your phone number"
                  className="w-full text-[14px] px-3 py-2 rounded-lg bg-transparent border outline-hidden"
                  style={{ borderColor: phone && !phoneOk ? "#ff3b30" : border, color: text }}
                />
              </div>

              {/* What's still needed + Send */}
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-[11px] flex-1" style={{ color: canSend ? "#34C759" : textMuted }}>
                  {canSend
                    ? "Ready to send ✓"
                    : `Add ${missing.slice(0, 2).join(", ")}${missing.length > 2 ? "…" : ""}`}
                </span>
                <button
                  onClick={submit}
                  disabled={!canSend || phase === "sending"}
                  className="text-[14px] font-semibold px-5 py-2 rounded-full text-white shrink-0 transition-opacity"
                  style={{ background: meBubble, opacity: canSend && phase !== "sending" ? 1 : 0.4 }}
                >
                  {phase === "sending" ? "Sending…" : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Starter chips (browsing or after a successful send) */}
      {(phase === "browsing" || phase === "sent") && (
        <div className="px-3 pb-2 pt-1 flex gap-2 overflow-x-auto shrink-0">
          {draftTemplates.map((t) => (
            <button
              key={t.id}
              onClick={() => pickTemplate(t)}
              className="whitespace-nowrap text-[13px] px-3.5 py-2 rounded-full border shrink-0"
              style={{ borderColor: border, color: text }}
            >
              {t.chip}
            </button>
          ))}
        </div>
      )}

      {/* Honeypot — hidden from humans, blocks bot submissions */}
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

      {/* Footer note */}
      <div className="px-3 py-2 border-t shrink-0" style={{ borderColor: border, background: headerBg }}>
        <p className="text-[10px] text-center" style={{ color: textMuted }}>
          {phase === "drafting"
            ? "Fill in the blanks — nothing sends until the draft is complete."
            : "Pick a starter, fill in the blanks, and send. One email per conversation."}
        </p>
      </div>
    </div>
  )
}

/** Inline auto-sizing blank used inside a drafted message. */
function FillInput({
  value,
  placeholder,
  onChange,
  accent,
  text,
  muted,
}: {
  value: string
  placeholder: string
  onChange: (v: string) => void
  accent: string
  text: string
  muted: string
}) {
  const width = `${Math.max(value.length, placeholder.length) + 1}ch`
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      style={{
        width,
        color: value ? text : muted,
        borderBottom: `1.5px ${value ? "solid" : "dashed"} ${value ? accent : muted}`,
      }}
      className="inline bg-transparent outline-hidden text-[14px] px-0.5 mx-0.5 align-baseline"
    />
  )
}

/** Find a field's placeholder within a template by key. */
function fieldPlaceholder(template: DraftTemplate, key: string): string {
  return template.fields.find((f) => f.key === key)?.placeholder ?? key
}
