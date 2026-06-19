"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { portfolioData } from "@/data/portfolio"
import { repos } from "./github-app.data"

export default function GitHubApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"
  const bg = isDark ? "#0d1117" : "#fff"
  const cardBg = isDark ? "#161b22" : "#f6f8fa"
  const text = isDark ? "#e6edf3" : "#1f2328"
  const textMuted = isDark ? "#8b949e" : "#656d76"
  const border = isDark ? "#30363d" : "#d0d7de"
  const green = "#3fb950"
  const blue = "#58a6ff"

  // Generate contribution graph data
  const contributionWeeks = Array.from({ length: 25 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 2.123))
  )

  const getLevelColor = (level: number) => {
    if (isDark) {
      const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]
      return colors[level] || colors[0]
    }
    const colors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"]
    return colors[level] || colors[0]
  }

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar" style={{ background: bg }}>
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-2.5"
        style={{ background: isDark ? "#010409" : "#fff", borderBottom: `1px solid ${border}` }}
      >
        <div className="flex items-center gap-3">
          <button onClick={closeApp} className="p-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 19l-7-7 7-7" stroke={text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <svg width="28" height="28" viewBox="0 0 24 24" fill={text}>
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </div>
        {/* <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div> */}
      </div>

      {/* Profile section */}
      <div className="px-4 py-4" style={{ borderBottom: `1px solid ${border}` }}>
        <div className="flex items-start gap-4">
          <div className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-3xl shrink-0 bg-cover bg-center"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${border}`,
              backgroundImage: "url('/images/avatar-profile.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
          </div>
          <div className="flex-1 min-w-0">
            <h1 style={{ color: text }} className="text-[20px] font-bold leading-tight">{portfolioData.personal.name}</h1>
            <p style={{ color: textMuted }} className="text-[15px]">nihir10dec</p>
            <p style={{ color: textMuted }} className="text-[13px] mt-1.5 leading-snug">
              Software Engineer building digital experiences. Full-stack dev passionate about clean code and great UX.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill={textMuted}>
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={textMuted} strokeWidth="2" fill="none" />
              <circle cx="9" cy="7" r="4" stroke={textMuted} strokeWidth="2" fill="none" />
              <path d="M23 21v-2a4 4 0 00-3-3.87" stroke={textMuted} strokeWidth="2" fill="none" />
              <path d="M16 3.13a4 4 0 010 7.75" stroke={textMuted} strokeWidth="2" fill="none" />
            </svg>
            <span style={{ color: text }} className="text-[13px] font-semibold">42</span>
            <span style={{ color: textMuted }} className="text-[13px]">followers</span>
            <span style={{ color: textMuted }} className="text-[13px] mx-1">·</span>
            <span style={{ color: text }} className="text-[13px] font-semibold">28</span>
            <span style={{ color: textMuted }} className="text-[13px]">following</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill={textMuted}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={textMuted} strokeWidth="2" fill="none" />
            <circle cx="12" cy="10" r="3" stroke={textMuted} strokeWidth="2" fill="none" />
          </svg>
          <span style={{ color: textMuted }} className="text-[13px]">Mumbai, India</span>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="px-4 py-4" style={{ borderBottom: `1px solid ${border}` }}>
        <h2 style={{ color: text }} className="text-[14px] font-semibold mb-3">247 contributions in the last year</h2>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-[3px]" style={{ width: "max-content" }}>
            {contributionWeeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((level, di) => (
                  <div
                    key={di}
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "2px",
                      background: getLevelColor(level),
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned Repos */}
      <div className="px-4 py-4">
        <h2 style={{ color: text }} className="text-[14px] font-semibold mb-3">
          Pinned repositories
        </h2>
        <div className="flex flex-col gap-3">
          {repos.slice(0, 4).map((repo, i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg"
              style={{ border: `1px solid ${border}`, background: bg }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
                </svg>
                <span style={{ color: blue }} className="text-[14px] font-semibold">{repo.name}</span>
              </div>
              <p style={{ color: textMuted }} className="text-[12px] leading-relaxed mb-3 line-clamp-2">
                {repo.description}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ background: repo.langColor }} />
                  <span style={{ color: textMuted }} className="text-[11px]">{repo.language}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={textMuted}>
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span style={{ color: textMuted }} className="text-[11px]">{repo.stars}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2">
                    <path d="M7 7V3m10 4V3M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
                  </svg>
                  <span style={{ color: textMuted }} className="text-[11px]">{repo.forks}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Repos */}
      <div className="px-4 pb-4">
        <h2 style={{ color: text }} className="text-[14px] font-semibold mb-3">All repositories</h2>
        {repos.map((repo, i) => (
          <div
            key={i}
            className="py-4"
            style={i > 0 ? { borderTop: `1px solid ${border}` } : {}}
          >
            <div className="flex items-center justify-between">
              <span style={{ color: blue }} className="text-[14px] font-semibold">{repo.name}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ border: `1px solid ${border}`, color: textMuted }}
              >
                Public
              </span>
            </div>
            <p style={{ color: textMuted }} className="text-[12px] mt-1 leading-relaxed">{repo.description}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ background: repo.langColor }} />
                <span style={{ color: textMuted }} className="text-[11px]">{repo.language}</span>
              </div>
              <span style={{ color: textMuted }} className="text-[11px]">Updated {repo.updated}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="h-16" />
    </div>
  )
}
