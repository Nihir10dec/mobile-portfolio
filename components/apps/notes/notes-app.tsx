"use client"

import { useState } from "react"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { notes } from "./notes-app.data"

export default function NotesApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"
  const bg = isDark ? "#000" : "#f2f2f7"
  const cardBg = isDark ? "#1c1c1e" : "#fff"
  const text = isDark ? "#fff" : "#000"
  const textMuted = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"
  const accent = "#FFCC00"

  const [selectedNote, setSelectedNote] = useState<number | null>(null)

  if (selectedNote !== null) {
    const note = notes[selectedNote]
    return (
      <div className="w-full h-full overflow-y-auto no-scrollbar" style={{ background: bg }}>
        {/* Note detail header */}
        <div
          className="sticky top-0 z-20 flex items-center justify-between px-3 py-2"
          style={{ background: bg }}
        >
          <button
            onClick={() => setSelectedNote(null)}
            className="flex items-center gap-1 px-2 py-1"
            style={{ color: accent }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[15px]">Notes</span>
          </button>
          <div className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
              <circle cx="12" cy="12" r="1"/>
              <circle cx="19" cy="12" r="1"/>
              <circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
        </div>

        {/* Note content */}
        <div className="px-5 pb-20">
          <p style={{ color: textMuted }} className="text-[12px] text-center mb-4">{note.date}</p>
          <h1 style={{ color: text }} className="text-[26px] font-bold mb-4">{note.title}</h1>

          {note.title === "About Me" && (
            <div style={{ color: text }} className="text-[16px] leading-relaxed space-y-4">
              <p>
                I'm Nihir Shah — a software engineer who believes the best code is the code that feels invisible to its users.
              </p>
              <p>
                Based in <strong>Mumbai, India</strong>, I currently work as a Software Engineer, where I build
                digital products that sit at the intersection of engineering excellence and human-centered design.
              </p>
              <p>
                My toolkit spans the full stack: <strong>React</strong>, <strong>TypeScript</strong>, and{" "}
                <strong>Next.js</strong> on the frontend; <strong>Node.js</strong>, <strong>Python</strong>, and{" "}
                <strong>Go</strong> on the backend; and <strong>PostgreSQL</strong>, <strong>Redis</strong>, and{" "}
                <strong>AWS</strong> for infrastructure.
              </p>
              <p>
                But tools are just tools. What matters to me is the{" "}
                <em>craft</em> — writing code that's not just functional, but elegant.
                Building systems that are not just scalable, but maintainable.
                Creating interfaces that are not just usable, but <em>delightful</em>.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new music, reading about system design,
                or sketching out the next project idea in my notebook.
              </p>
              <div className="mt-6 pt-4" style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}` }}>
                <p style={{ color: textMuted }} className="text-[14px] italic">
                  "The details are not the details. They make the design." — Charles Eames
                </p>
              </div>
            </div>
          )}

          {note.title === "Design Philosophy" && (
            <div style={{ color: text }} className="text-[16px] leading-relaxed space-y-4">
              <p>
                Good design is invisible. It doesn't call attention to itself — it just works.
                The best interfaces feel like they were always meant to exist.
              </p>
              <h2 className="text-[20px] font-bold mt-6">Principles I Follow</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Consistency over novelty.</strong> Users shouldn't have to learn a new interaction pattern on every screen.</li>
                <li><strong>Performance is a feature.</strong> A beautiful UI that takes 5 seconds to load is a bad UI.</li>
                <li><strong>Accessibility is not optional.</strong> If it's not accessible, it's not finished.</li>
                <li><strong>Delight in the details.</strong> Micro-interactions, smooth transitions, thoughtful empty states — these are what separate good from great.</li>
              </ul>
            </div>
          )}

          {note.title !== "About Me" && note.title !== "Design Philosophy" && (
            <div style={{ color: text }} className="text-[16px] leading-relaxed whitespace-pre-line">
              {note.preview}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar" style={{ background: bg }}>
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 pt-2 pb-1" style={{ background: bg }}>
        <div className="flex items-center justify-between mb-2">
          <button onClick={closeApp} className="flex items-center gap-1" style={{ color: accent }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[15px]">Folders</span>
          </button>
          <div className="flex items-center gap-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2">
              <path d="M12 5v14m-7-7h14" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <h1 style={{ color: text }} className="text-[32px] font-bold">Notes</h1>

        {/* Search */}
        <div className="mt-2 mb-1">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: isDark ? "#1c1c1e" : "#e5e5ea" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={textMuted}>
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={textMuted} strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <span style={{ color: textMuted }} className="text-[15px]">Search</span>
          </div>
        </div>
      </div>

      {/* Pinned */}
      {notes.some(n => n.pinned) && (
        <div className="px-4 mt-2">
          <p style={{ color: textMuted }} className="text-[12px] font-semibold uppercase tracking-wider mb-1.5 px-1">
            Pinned
          </p>
          <div className="rounded-xl overflow-hidden" style={{ background: cardBg }}>
            {notes.filter(n => n.pinned).map((note, i, arr) => (
              <button
                key={i}
                onClick={() => setSelectedNote(notes.indexOf(note))}
                className="w-full text-left px-4 py-3 active:opacity-70 transition-opacity"
                style={i < arr.length - 1 ? { borderBottom: `0.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` } : {}}
              >
                <p style={{ color: text }} className="text-[15px] font-semibold">{note.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span style={{ color: textMuted }} className="text-[13px]">{note.date}</span>
                  <span style={{ color: textMuted }} className="text-[13px] truncate">{note.preview.slice(0, 50)}...</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* All notes */}
      <div className="px-4 mt-4">
        <p style={{ color: textMuted }} className="text-[12px] font-semibold uppercase tracking-wider mb-1.5 px-1">
          All Notes
        </p>
        <div className="rounded-xl overflow-hidden" style={{ background: cardBg }}>
          {notes.filter(n => !n.pinned).map((note, i, arr) => (
            <button
              key={i}
              onClick={() => setSelectedNote(notes.indexOf(note))}
              className="w-full text-left px-4 py-3 active:opacity-70 transition-opacity"
              style={i < arr.length - 1 ? { borderBottom: `0.5px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` } : {}}
            >
              <p style={{ color: text }} className="text-[15px] font-semibold">{note.title}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span style={{ color: textMuted }} className="text-[13px]">{note.date}</span>
                <span style={{ color: textMuted }} className="text-[13px] truncate">{note.preview.slice(0, 50)}...</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Note count */}
      <p style={{ color: textMuted }} className="text-center text-[12px] mt-4 pb-20">
        {notes.length} Notes
      </p>
    </div>
  )
}

