"use client"

import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import { articles, tabs } from "./medium-app.data"

export default function MediumApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const bg = isDark ? "#000000" : "#ffffff"
  const text = isDark ? "#ffffff" : "#000000"
  const textMuted = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"
  const border = isDark ? "#292929" : "#f2f2f2"

  return (
    <div className="w-full h-full flex flex-col font-serif overflow-hidden" style={{ background: bg }}>
      {/* Dynamic Header */}
      <div className="flex items-center justify-between px-4 py-3 z-20 border-b" style={{ background: bg, borderColor: border }}>
        <button onClick={closeApp} className="p-1 -ml-1" style={{ color: text }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          {/* Medium logo minimal */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill={text}>
            <path d="M12 12c0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6 6 2.69 6 6zm7 0c0 3.15-1.57 5.7-3.5 5.7S12 15.15 12 12s1.57-5.7 3.5-5.7 3.5 2.55 3.5 5.7zm5 0c0 2.82-.67 5.1-1.5 5.1s-1.5-2.28-1.5-5.1.67-5.1 1.5-5.1 1.5 2.28 1.5 5.1z" />
          </svg>
        </div>
        <div className="flex gap-3 text-lg items-center">
          {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={text} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg> */}
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-sans font-bold text-white text-[12px]">
            NS
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 px-4 py-2 overflow-x-auto no-scrollbar border-b font-sans" style={{ borderColor: border }}>
        {tabs.map((tab, i) => (
          <button key={i} className="whitespace-nowrap text-[14px] pb-2 font-medium relative" style={{ color: i === 1 ? text : textMuted }}>
            {tab}
            {i === 1 && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black dark:bg-white" />}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto w-full">
        <div className="divide-y divide-[#292929] dark:divide-[#f2f2f2]" style={{ borderColor: border }}>
          {articles.map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-6 transition-colors hover:bg-black/2 dark:hover:bg-white/3 active:opacity-70"
            >
              {/* Author Context */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded-full bg-gray-300" style={{ background: article.image }} />
                <p className="text-[13px] font-sans" style={{ color: text }}>
                  <span className="font-semibold">{article.author}</span>
                  {article.in && <span style={{ color: textMuted }}> in <span className="font-semibold">{article.in}</span></span>}
                </p>
              </div>

              {/* Content block */}
              <div className="flex gap-4 mb-3">
                <div className="flex-1">
                  <h2 className="text-[20px] font-bold leading-tight mb-2 tracking-tight" style={{ color: text, fontFamily: "Georgia, serif" }}>
                    {article.title}
                  </h2>
                  <p className="text-[15px] leading-snug line-clamp-3" style={{ color: textMuted, fontFamily: "Georgia, serif" }}>
                    {article.desc}
                  </p>
                </div>
                <div className="w-[80px] h-[80px] shrink-0 mt-1 relative flex items-center justify-center text-white/70" style={{ background: article.image }}>
                  {article.logo && <article.logo size={30} />}
                </div>
              </div>

              {/* Footer metadata */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 font-sans">
                  <span className="px-2 py-1 rounded-full text-[11px] font-medium" style={{ background: isDark ? "#292929" : "#f2f2f2", color: text }}>
                    {article.tags[0]}
                  </span>
                  <span className="text-[12px]" style={{ color: textMuted }}>{article.readTime}</span>
                  <span className="text-[12px]" style={{ color: textMuted }}>•</span>
                  <span className="text-[12px]" style={{ color: textMuted }}>{article.date}</span>
                </div>
                <div className="flex gap-3 font-sans text-gray-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" /></svg>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="h-16" />
      </div>

      {/* Medium Bottom Nav */}
      <div className="absolute bottom-0 left-0 right-0 h-14 border-t flex items-center justify-around z-10" style={{ background: isDark ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,0.9)", borderColor: border, backdropFilter: "blur(10px)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={text}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
      </div>
    </div>
  )
}
