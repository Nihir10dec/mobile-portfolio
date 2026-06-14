"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { experience, skills } from "./linkedin-app.data"

export default function LinkedInApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"
  const bg = isDark ? "#000" : "#f4f2ee"
  const cardBg = isDark ? "#1b1f23" : "#fff"
  const text = isDark ? "#fff" : "#000"
  const textMuted = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"
  const linkedinBlue = "#0A66C2"

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar" style={{ background: bg }}>
      {/* Header */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-4 py-2.5"
        style={{ background: cardBg, borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-3">
          <button onClick={closeApp} className="p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke={text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={linkedinBlue}>
            <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </div>
        <div className="flex items-center gap-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke={text} strokeWidth="2" strokeLinecap="round" />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={text} strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Banner + Profile */}
      <div className="relative" style={{ background: cardBg }}>
        {/* Banner */}
        <div
          className="h-[100px] w-full"
          style={{ background: `linear-gradient(135deg, ${linkedinBlue}, #004182)` }}
        />
        {/* Profile pic */}
        <div className="absolute left-4" style={{ top: "60px" }}>
          <div
            className="w-[80px] h-[80px] rounded-full flex items-center justify-center text-3xl border-4 bg-cover bg-center"
            style={{
              borderColor: cardBg,
              background: isDark ? "#333" : "#e0e0e0",
              backgroundImage: "url('/images/profile_avatar.png')"
            }}
          >
          </div>
        </div>
        {/* Connect button */}
        <div className="flex justify-end px-4 pt-2">
          <button
            className="px-5 py-1.5 rounded-full text-[13px] font-semibold text-white"
            style={{ background: linkedinBlue }}
          >
            Connect
          </button>
        </div>

        {/* Profile info */}
        <div className="px-4 pt-6 pb-4">
          <h1 style={{ color: text }} className="text-[20px] font-bold">{portfolioData.personal.name}</h1>
          <p style={{ color: text }} className="text-[14px] mt-0.5">
            Software Engineer | Full-Stack Developer | Building Digital Experiences
          </p>
          <p style={{ color: textMuted }} className="text-[13px] mt-1">
            Mumbai, Maharashtra, India · <span style={{ color: linkedinBlue }} className="font-medium">500+ connections</span>
          </p>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <button
              className="flex-1 py-1.5 rounded-full text-white text-[13px] font-semibold"
              style={{ background: linkedinBlue }}
            >
              Open to
            </button>
            <button
              className="flex-1 py-1.5 rounded-full text-[13px] font-semibold"
              style={{ border: `1.5px solid ${linkedinBlue}`, color: linkedinBlue }}
            >
              Add Section
            </button>
            <button
              className="px-3 py-1.5 rounded-full text-[13px] font-semibold"
              style={{ border: `1.5px solid ${isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}`, color: text }}
            >
              More
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="mt-2 px-4 py-4" style={{ background: cardBg }}>
        <h2 style={{ color: text }} className="text-[16px] font-bold mb-2">About</h2>
        <p style={{ color: textMuted }} className="text-[13px] leading-relaxed">
          Passionate software engineer with a knack for building elegant solutions to complex problems.
          I specialize in full-stack development with React, Node.js, and Python. Currently working on
          next-gen financial technology platforms at Kotak Securities.
        </p>
        <p style={{ color: textMuted }} className="text-[13px] leading-relaxed mt-2">
          When I'm not coding, you'll find me exploring new technologies, contributing to open source,
          or writing about software engineering best practices.
        </p>
      </div>

      {/* Experience */}
      <div className="mt-2 px-4 py-4" style={{ background: cardBg }}>
        <h2 style={{ color: text }} className="text-[16px] font-bold mb-3">Experience</h2>
        {experience.map((exp, i) => (
          <div key={i} className={`flex gap-3 ${i > 0 ? "mt-4 pt-4" : ""}`} style={i > 0 ? { borderTop: `1px solid ${border}` } : {}}>
            <div className="w-[48px] h-[48px] rounded-lg flex items-center justify-center text-2xl shrink-0"
              style={{ background: isDark ? "#1a1a1a" : "#f0f0f0" }}
            >
              {exp.logo}
            </div>
            <div>
              <p style={{ color: text }} className="text-[14px] font-semibold">{exp.role}</p>
              <p style={{ color: text }} className="text-[13px]">{exp.company}</p>
              <p style={{ color: textMuted }} className="text-[12px] mt-0.5">{exp.duration}</p>
              <p style={{ color: textMuted }} className="text-[12px] mt-1">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mt-2 px-4 py-4" style={{ background: cardBg }}>
        <h2 style={{ color: text }} className="text-[16px] font-bold mb-3">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-full text-[12px] font-medium"
              style={{
                background: isDark ? "rgba(10,102,194,0.15)" : "rgba(10,102,194,0.08)",
                color: linkedinBlue,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="h-20" />
    </div>
  )
}
