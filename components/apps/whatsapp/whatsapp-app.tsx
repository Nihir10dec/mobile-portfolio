"use client"

import { useState } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import type { Contact } from "./whatsapp-app.types"
import { contacts } from "./whatsapp-app.data"

export default function WhatsAppApp() {
  const { closeApp } = useAppNavigation()
  const { theme, device } = useDevice()
  const isDark = theme === "dark"
  const isAndroid = device === "android"

  const bg = isDark ? "#111b21" : "#ffffff"
  const headerBg = isAndroid
    ? isDark ? "#202c33" : "#008069"
    : isDark ? "#1c1c1e" : "#ffffff"
  const headerText = isAndroid
    ? "white"
    : isDark ? "#ffffff" : "#000000"
  const text = isDark ? "#e9edef" : "#111b21"
  const textMuted = isDark ? "#8696a0" : "#667781"
  const border = isDark ? "#222d34" : "#e9edef"
  const chatBg = isDark ? "#0b141a" : "#efeae2"
  const bubbleOut = isDark ? "#005c4b" : "#d9fdd3"
  const bubbleIn = isDark ? "#202c33" : "#ffffff"

  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  const activeContact = contacts.find((c) => c.id === activeChatId) ?? null

  // ─── Chat View ───────────────────────────────────────────────────────────
  if (activeContact) {
    const bubbleRadius = isAndroid ? "rounded-lg" : "rounded-2xl"

    return (
      <div className="w-full h-full flex flex-col" style={{ background: chatBg }}>
        <style>{`
          @keyframes msgPop {
            0%   { transform: scale(0.4) translateY(12px); opacity: 0; }
            65%  { transform: scale(1.08) translateY(-3px); opacity: 1; }
            100% { transform: scale(1)   translateY(0);    opacity: 1; }
          }
          .msg-pop { animation: msgPop 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Chat Header */}
        <div
          className="flex items-center gap-3 px-3 py-2 z-20"
          style={{
            background: headerBg,
            borderBottom: !isAndroid ? `1px solid ${isDark ? "#2c2c2e" : "#e5e5ea"}` : undefined,
          }}
        >
          <button onClick={() => setActiveChatId(null)} style={{ color: isAndroid ? "white" : "#007AFF" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: activeContact.gradient }}
          >
            <span className="text-white text-[15px] font-semibold">{activeContact.initial}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h2
              className="text-[16px] font-semibold truncate leading-tight"
              style={{ color: isAndroid ? "white" : isDark ? "#ffffff" : "#000000" }}
            >
              {activeContact.name}
            </h2>
            <p className="text-[12px]" style={{ color: isAndroid ? "rgba(255,255,255,0.8)" : isDark ? "rgba(255,255,255,0.5)" : "#8e8e93" }}>
              {activeContact.id === "stalker" ? "last seen recently" : "online"}
            </p>
          </div>

          <div className="flex items-center gap-4" style={{ color: isAndroid ? "white" : isDark ? "#ffffff" : "#007AFF" }}>
            {!isAndroid && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
              </svg>
            )}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 7a2 2 0 10-.001-4.001A2 2 0 0012 7zm0 2a2 2 0 10-.001 3.999A2 2 0 0012 9zm0 6a2 2 0 10-.001 3.999A2 2 0 0012 15z" />
            </svg>
          </div>
        </div>

        {/* Messages */}
        <div
          className="no-scrollbar flex-1 overflow-y-auto p-4 space-y-3 relative pb-24"
          style={{ background: chatBg, scrollbarWidth: "none" }}
        >
          <div className="flex justify-center mb-6 mt-2">
            <span
              className="text-[11px] px-3 py-1.5 rounded-lg"
              style={{ background: isDark ? "#182229" : "#ffffff", color: textMuted, boxShadow: "0 1px 1px rgba(0,0,0,0.05)" }}
            >
              TODAY
            </span>
          </div>

          {activeContact.messages.map((msg, i) => {
            const isLastStalker = activeContact.id === "stalker" && i === activeContact.messages.length - 1
            return (
              <div key={i}>
                {activeContact.unreadFrom !== undefined && i === activeContact.unreadFrom && (
                  <div className="flex justify-center my-3">
                    <span
                      className="text-[11px] px-3 py-1.5 rounded-lg"
                      style={{ background: isDark ? "#182229" : "#d9f7be", color: isDark ? "#00a884" : "#135200" }}
                    >
                      {activeContact.unread} unread {activeContact.unread === 1 ? "message" : "messages"}
                    </span>
                  </div>
                )}
                <div className={`flex ${msg.isOut ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] ${bubbleRadius} px-2.5 py-1.5 shadow-sm text-[14.5px] leading-relaxed relative
                      ${msg.isOut ? (isAndroid ? "rounded-tr-none" : "") : (isAndroid ? "rounded-tl-none" : "")}
                      ${isLastStalker ? "msg-pop" : ""}`}
                    style={{
                      background: msg.isOut ? bubbleOut : bubbleIn,
                      color: text,
                      ...(isLastStalker ? { opacity: 0, animationDelay: "0.55s" } : {}),
                    }}
                  >
                    <span>
                      {msg.text}
                      <span
                        aria-hidden
                        className="opacity-0 pointer-events-none select-none text-[10px] ml-1.5 inline-block align-bottom"
                        style={{ minWidth: msg.isOut ? "72px" : "44px" }}
                      >
                        {msg.time}
                      </span>
                    </span>
                    <span
                      className="absolute bottom-1.5 right-2 text-[10px] flex items-center gap-1"
                      style={{ color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)" }}
                    >
                      {msg.time}
                      {msg.isOut && (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="#53bdeb">
                          <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Input area */}
        <div
          className="absolute bottom-0 left-0 right-0 p-2 z-20"
          style={{
            background: bg,
            borderTop: !isAndroid ? `1px solid ${isDark ? "#2c2c2e" : "#e5e5ea"}` : undefined,
          }}
        >
          <div className="flex items-center gap-2">
            <div
              className="flex-1 rounded-full px-4 py-2.5 flex items-center gap-3"
              style={{ background: isDark ? "#2a3942" : "#ffffff", border: `1px solid ${border}` }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill={textMuted}>
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z" />
              </svg>
              <input
                type="text"
                placeholder="Message"
                className="flex-1 bg-transparent border-none outline-none text-[15px]"
                style={{ color: text }}
                disabled
              />
              {isAndroid ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill={textMuted}>
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill={textMuted}>
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
                </svg>
              )}
            </div>
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#00a884" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── Chat List ────────────────────────────────────────────────────────────
  if (isAndroid) {
    return (
      <div className="w-full h-full flex flex-col" style={{ background: bg }}>
        {/* Android Header */}
        <div className="px-4 py-3 flex items-center relative z-20" style={{ background: headerBg }}>
          <button onClick={closeApp} className="p-1 z-10 text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="absolute left-1/2 -translate-x-1/2 text-[20px] font-semibold text-white">WhatsApp</span>
          <div className="ml-auto text-white opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </div>
        </div>

        {/* Android Tabs */}
        <div className="flex pt-1 z-20" style={{ background: headerBg }}>
          <button className="px-3 pb-3 pt-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "rgba(255,255,255,0.7)" }}>
              <path d="M20 4h-3.17L15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h4.05l1.83-2h4.24l1.83 2H20v12zM12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
            </svg>
          </button>
          <button className="flex-1 pb-3 pt-2 font-medium text-[14px] text-white" style={{ borderBottom: "3px solid white" }}>CHATS</button>
          <button className="flex-1 pb-3 pt-2 font-medium text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>STATUS</button>
          <button className="flex-1 pb-3 pt-2 font-medium text-[14px]" style={{ color: "rgba(255,255,255,0.7)" }}>CALLS</button>
        </div>

        {/* Chat list */}
        <div className="flex-1 overflow-y-auto pb-20" style={{ scrollbarWidth: "none" }}>
          {contacts.map((contact) => <ChatRow key={contact.id} contact={contact} text={text} textMuted={textMuted} border={border} onOpen={setActiveChatId} />)}
        </div>

        {/* Android FAB */}
        <div
          className="absolute bottom-6 right-5 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-20"
          style={{ background: "#00a884" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z" />
          </svg>
        </div>
      </div>
    )
  }

  // ─── iOS Chat List ────────────────────────────────────────────────────────
  return (
    <div className="w-full h-full flex flex-col" style={{ background: isDark ? "#000000" : "#f2f2f7" }}>
      {/* iOS Header */}
      <div
        className="px-4 pt-3 pb-2 z-20"
        style={{
          background: isDark ? "#1c1c1e" : "#ffffff",
          borderBottom: `1px solid ${isDark ? "#2c2c2e" : "#e5e5ea"}`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <button onClick={closeApp} style={{ color: "#007AFF" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className="text-[28px] font-bold" style={{ color: isDark ? "#ffffff" : "#000000" }}>Chats</span>
          <button style={{ color: "#007AFF" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </button>
        </div>
        {/* Filter pills */}
        <div className="flex gap-2 pb-1">
          {["All", "Unread"].map((f, i) => (
            <span
              key={f}
              className="px-3 py-1 rounded-full text-[13px] font-medium"
              style={{
                background: i === 0 ? "#007AFF" : isDark ? "#2c2c2e" : "#e5e5ea",
                color: i === 0 ? "white" : isDark ? "#ffffff" : "#000000",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Chat list */}
      <div
        className="flex-1 overflow-y-auto pb-[56px]"
        style={{ background: isDark ? "#000000" : "#f2f2f7", scrollbarWidth: "none" }}
      >
        {contacts.map((contact) => (
          <ChatRow key={contact.id} contact={contact} text={text} textMuted={textMuted} border={isDark ? "#2c2c2e" : "#e5e5ea"} onOpen={setActiveChatId} isIOS />
        ))}
      </div>

      {/* iOS Bottom Tab Bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 pb-5 pt-2"
        style={{
          background: isDark ? "rgba(28,28,30,0.95)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderTop: `1px solid ${isDark ? "#2c2c2e" : "#e5e5ea"}`,
        }}
      >
        <div className="flex justify-around items-center">
          {[
            { label: "Updates", path: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" },
            { label: "Calls", path: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" },
            { label: "Community", path: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
            { label: "Chats", path: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z", active: true },
            { label: "Settings", path: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" },
          ].map((tab) => (
            <button key={tab.label} className="flex flex-col items-center gap-0.5">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ color: tab.active ? "#007AFF" : isDark ? "#636366" : "#8e8e93" }}>
                <path d={tab.path} />
              </svg>
              <span className="text-[9px] font-medium" style={{ color: tab.active ? "#007AFF" : isDark ? "#636366" : "#8e8e93" }}>
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Shared Chat Row ──────────────────────────────────────────────────────────
function ChatRow({
  contact, text, textMuted, border, onOpen, isIOS,
}: {
  contact: Contact
  text: string
  textMuted: string
  border: string
  onOpen: (id: string) => void
  isIOS?: boolean
}) {
  const previewMsg = contact.messages[contact.previewIndex ?? contact.messages.length - 1]
  const lastMsg = previewMsg
  return (
    <button
      onClick={() => onOpen(contact.id)}
      className="w-full flex items-center gap-3 px-4 py-2 active:bg-black/5"
    >
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: contact.gradient }}
      >
        <span className="text-white font-semibold text-lg">{contact.initial}</span>
      </div>
      <div className="flex-1 min-w-0 border-b py-2" style={{ borderColor: border }}>
        <div className="flex justify-between items-baseline mb-0.5">
          <span className="text-[16px] font-semibold truncate" style={{ color: text }}>{contact.name}</span>
          <span className="text-[12px] flex-shrink-0 ml-2" style={{ color: contact.unread ? "#007AFF" : textMuted }}>
            {contact.lastTime}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1 min-w-0">
            {lastMsg.isOut && (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#53bdeb" className="flex-shrink-0">
                <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
              </svg>
            )}
            <span className="text-[14px] truncate" style={{ color: textMuted, fontWeight: contact.unread ? 600 : 400 }}>
              {lastMsg.text}
            </span>
          </div>
          {contact.unread && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-1"
              style={{ background: isIOS ? "#007AFF" : "#00a884" }}
            >
              <span className="text-white text-[11px] font-bold leading-none">{contact.unread}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
