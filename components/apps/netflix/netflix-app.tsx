"use client"

import { useState, useEffect, useCallback } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { playNetflixTaDum } from "@/lib/audio"
import { portfolioData } from "@/data/portfolio"
import type { CardItem, Profile, ProfileKey } from "./netflix-app.types"
import { ABOUT_CARD, getRows, HERO_TAGLINES, PROFILES } from "./netflix-app.data"

// ─── Avatar Illustrations ─────────────────────────────────────────────────────

function AvatarSVG({ k, size = 72 }: { k: ProfileKey; size?: number }) {
  const s = size
  if (k === "recruiter") return (
    <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
      <defs>
        <radialGradient id="grad-rec" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1E40AF" />
        </radialGradient>
      </defs>
      <rect width="72" height="72" rx="10" fill="url(#grad-rec)" />
      {/* Head */}
      <circle cx="36" cy="28" r="14" fill="#BFDBFE" />
      {/* Eyes */}
      <circle cx="30" cy="25" r="2.8" fill="#1E3A8A" />
      <circle cx="42" cy="25" r="2.8" fill="#1E3A8A" />
      <circle cx="30.8" cy="24.2" r="1" fill="white" />
      <circle cx="42.8" cy="24.2" r="1" fill="white" />
      {/* Smile */}
      <path d="M29 31.5 Q36 37 43 31.5" stroke="#1E3A8A" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Shoulder */}
      <path d="M18 62 Q22 47 36 45 Q50 47 54 62 Z" fill="#BFDBFE" />
      {/* Tie */}
      <path d="M33.5 45 L36 49 L38.5 45" fill="#93C5FD" />
      <path d="M35 49 L33.2 59 L36 56 L38.8 59 L37 49 Z" fill="#E50914" />
      <line x1="33.2" y1="51" x2="38.8" y2="51" stroke="#B91C1C" strokeWidth="0.8" />
    </svg>
  )

  if (k === "developer") return (
    <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
      <defs>
        <radialGradient id="grad-dev" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#6B7280" />
          <stop offset="100%" stopColor="#111827" />
        </radialGradient>
      </defs>
      <rect width="72" height="72" rx="10" fill="url(#grad-dev)" />
      {/* Head */}
      <circle cx="36" cy="28" r="14" fill="#D1D5DB" />
      {/* Glasses */}
      <rect x="25.5" y="21" width="8.5" height="6.5" rx="3" stroke="#374151" strokeWidth="1.5" fill="rgba(55,65,81,0.25)" />
      <rect x="38" y="21" width="8.5" height="6.5" rx="3" stroke="#374151" strokeWidth="1.5" fill="rgba(55,65,81,0.25)" />
      <line x1="34" y1="24.2" x2="38" y2="24.2" stroke="#374151" strokeWidth="1.5" />
      <line x1="18" y1="24.2" x2="25.5" y2="24.2" stroke="#374151" strokeWidth="1.2" />
      <line x1="46.5" y1="24.2" x2="54" y2="24.2" stroke="#374151" strokeWidth="1.2" />
      {/* Eyes */}
      <circle cx="29.7" cy="24.2" r="1.8" fill="#1F2937" />
      <circle cx="42.3" cy="24.2" r="1.8" fill="#1F2937" />
      {/* Smile */}
      <path d="M30 32 Q36 36.5 42 32" stroke="#374151" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* Hoodie */}
      <path d="M18 62 Q22 47 36 45 Q50 47 54 62 Z" fill="#D1D5DB" />
      <path d="M36 45 L33.5 49 Q36 52.5 38.5 49 Z" fill="#9CA3AF" />
      {/* Code on chest */}
      <text x="26.5" y="57" fontSize="8.5" fill="#374151" fontFamily="monospace" fontWeight="700">{"</>"}</text>
    </svg>
  )

  if (k === "collaborator") return (
    <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
      <defs>
        <radialGradient id="grad-col" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#991B1B" />
        </radialGradient>
      </defs>
      <rect width="72" height="72" rx="10" fill="url(#grad-col)" />
      {/* Head */}
      <circle cx="36" cy="28" r="14" fill="#FECACA" />
      {/* Eyes */}
      <circle cx="30" cy="25" r="3.5" fill="#7F1D1D" />
      <circle cx="42" cy="25" r="3.5" fill="#7F1D1D" />
      <circle cx="31" cy="24" r="1.3" fill="white" />
      <circle cx="43" cy="24" r="1.3" fill="white" />
      {/* Blush */}
      <ellipse cx="24" cy="30.5" rx="4.5" ry="2.5" fill="#FDA4AF" opacity="0.7" />
      <ellipse cx="48" cy="30.5" rx="4.5" ry="2.5" fill="#FDA4AF" opacity="0.7" />
      {/* Big smile */}
      <path d="M27 32 Q36 40 45 32" stroke="#7F1D1D" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Shoulders */}
      <path d="M19 62 Q23 47 36 45 Q49 47 53 62 Z" fill="#FECACA" />
      {/* Star */}
      <path d="M36 50 L37.4 53.8 L41.4 53.8 L38.3 56.1 L39.6 59.9 L36 57.6 L32.4 59.9 L33.7 56.1 L30.6 53.8 L34.6 53.8 Z" fill="#F87171" />
    </svg>
  )

  // explorer
  return (
    <svg width={s} height={s} viewBox="0 0 72 72" fill="none">
      <defs>
        <radialGradient id="grad-exp" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
      </defs>
      <rect width="72" height="72" rx="10" fill="url(#grad-exp)" />
      {/* Hat */}
      <path d="M16 20 Q36 10 56 20 L54 24 Q36 16 18 24 Z" fill="#92400E" />
      <rect x="23" y="17" width="26" height="9" rx="3" fill="#B45309" />
      <rect x="21" y="23.5" width="30" height="3" rx="1.5" fill="#78350F" />
      {/* Head */}
      <circle cx="36" cy="34" r="13" fill="#FEF3C7" />
      {/* Wide curious eyes */}
      <circle cx="30" cy="31" r="4" fill="#78350F" />
      <circle cx="42" cy="31" r="4" fill="#78350F" />
      <circle cx="31" cy="30" r="1.5" fill="white" />
      <circle cx="43" cy="30" r="1.5" fill="white" />
      {/* Raised brows */}
      <path d="M26 25.5 Q30 23.5 34 25.5" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M38 25.5 Q42 23.5 46 25.5" stroke="#78350F" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Smile */}
      <path d="M29 37.5 Q36 44 43 37.5" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Vest/body */}
      <path d="M20 62 Q24 48 36 46 Q48 48 52 62 Z" fill="#FEF3C7" />
      {/* Compass */}
      <circle cx="36" cy="55.5" r="4.5" stroke="#B45309" strokeWidth="1.2" fill="none" />
      <path d="M36 51 L36.6 55.5 L36 60" stroke="#E50914" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M31.5 55.5 L36 56.2 L40.5 55.5" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

// ─── Skill Card Logos ─────────────────────────────────────────────────────────
// White/semi-transparent so they read on any gradient background (the Netflix
// UI is always dark, so these never need to adapt to a light system theme).

function ReactAtomLogo() {
  return (
    <svg viewBox="-12 -10.5 24 21" width="54" height="54" fill="none">
      <circle r="2.2" fill="rgba(255,255,255,0.95)" />
      <g stroke="rgba(255,255,255,0.88)" strokeWidth="1.1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  )
}

function TypeScriptBadgeLogo() {
  return (
    <svg viewBox="0 0 56 56" width="54" height="54">
      <rect width="56" height="56" rx="6" fill="rgba(255,255,255,0.18)" />
      <text
        x="28" y="41"
        fontFamily='"Arial Black", Arial, sans-serif'
        fontWeight="900"
        fontSize="28"
        fill="rgba(255,255,255,0.95)"
        textAnchor="middle"
      >TS</text>
    </svg>
  )
}

function GitBranchLogo() {
  return (
    <svg viewBox="0 0 64 72" width="48" height="54" fill="none">
      {/* Three commit nodes */}
      <circle cx="16" cy="12" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
      <circle cx="16" cy="60" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
      <circle cx="48" cy="24" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="4" />
      {/* Main vertical line */}
      <line x1="16" y1="19" x2="16" y2="53" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" />
      {/* Branch curve — quarter-circle arc from main line to feature node */}
      <path d="M 16 30 Q 16 24 41 24" stroke="rgba(255,255,255,0.9)" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  )
}

const SKILL_LOGOS: Record<string, React.ReactNode> = {
  frontend: <ReactAtomLogo />,
  backend: <TypeScriptBadgeLogo />,
  tool: <GitBranchLogo />,
}

// ─── Profile Selection Screen ──────────────────────────────────────────────────

function ProfilesScreen({
  onSelect,
  closeApp,
}: {
  onSelect: (p: Profile) => void
  closeApp: () => void
}) {
  const [pressing, setPressing] = useState<ProfileKey | null>(null)

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={closeApp} className="p-1">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* Netflix wordmark */}
        <span
          className="text-[#E50914] font-black tracking-tight select-none"
          style={{ fontSize: "22px", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.04em" }}
        >
          NETFLIX
        </span>
        <div className="w-6" />
      </div>

      {/* Main content — vertically centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-6">
        <h1 className="text-white text-[26px] font-bold tracking-tight mb-1">Who's Watching?</h1>
        <p className="text-white/35 text-[12px] mb-9 text-center">Pick your experience — content personalises to you</p>

        {/* 2 × 2 grid */}
        <div className="grid grid-cols-2 gap-5 w-full max-w-[260px]">
          {PROFILES.map((profile) => {
            const isPressed = pressing === profile.key
            return (
              <button
                key={profile.key}
                onPointerDown={() => setPressing(profile.key)}
                onPointerUp={() => { setPressing(null); onSelect(profile) }}
                onPointerLeave={() => setPressing(null)}
                className="flex flex-col items-center gap-2.5"
                style={{
                  transform: isPressed ? "scale(0.90)" : "scale(1)",
                  transition: "transform 150ms cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    outline: isPressed ? `3px solid ${profile.primary}` : "3px solid transparent",
                    transition: "outline-solid 150ms",
                    width: 80,
                    height: 80,
                  }}
                >
                  <AvatarSVG k={profile.key} size={80} />
                </div>
                <div className="text-center">
                  <p className="text-white text-[13px] font-semibold leading-none">{profile.label}</p>
                  <p className="text-white/35 text-[10px] mt-0.5 leading-tight">{profile.tagline}</p>
                </div>
              </button>
            )
          })}
        </div>

        <button className="mt-10 text-white/30 text-[11px] border border-white/15 px-5 py-1.5 rounded-sm tracking-wide">
          MANAGE PROFILES
        </button>
      </div>
    </div>
  )
}

// ─── Row Components ────────────────────────────────────────────────────────────

function ContinueWatchingRow({ items, onSelect }: { items: CardItem[]; onSelect: (i: CardItem) => void }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pl-4 pr-2">
      {items.map((item) => (
        <button key={item.id} className="shrink-0 w-[132px] text-left" onClick={() => onSelect(item)}>
          {/* Thumbnail */}
          <div
            className="h-[78px] rounded overflow-hidden mb-1 relative"
            style={{
              background: item.gradient,
              ...(item.bgImage && { backgroundImage: `url('${item.bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" }),
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/75 to-transparent" />
            {item.logo && (
              <div className="absolute inset-0 flex items-center justify-center pb-5 text-white/50">
                <item.logo size={26} />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white text-[10px] font-semibold leading-tight drop-shadow-sm">{item.title}</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-[3px] bg-[#2a2a2a] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[#E50914]" style={{ width: `${item.progress ?? 0}%` }} />
          </div>
          <p className="text-white/35 text-[9px] mt-1 leading-tight">{item.subtitle}</p>
        </button>
      ))}
    </div>
  )
}

function TallCardsRow({ items, onSelect }: { items: CardItem[]; onSelect: (i: CardItem) => void }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pl-4 pr-2">
      {items.map((item) => {
        const logo = SKILL_LOGOS[item.id]
        return (
          <button
            key={item.id}
            className="shrink-0 rounded-lg overflow-hidden text-left"
            style={{ width: 102, height: 136, background: item.gradient, flexShrink: 0 }}
            onClick={() => onSelect(item)}
          >
            <div className="h-full p-3 flex flex-col bg-linear-to-t from-black/50 to-transparent">
              {/* Logo — centred in the upper portion of the card */}
              <div className="flex-1 flex items-center justify-center">
                {logo ?? null}
              </div>
              {/* Title + category at the bottom */}
              <div>
                <p className="text-white text-[11px] font-bold leading-tight">{item.title}</p>
                <p className="text-white/50 text-[9px] mt-0.5 leading-tight">{item.subtitle.split(" · ")[0]}</p>
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}

function WideCardsRow({ items, onSelect }: { items: CardItem[]; onSelect: (i: CardItem) => void }) {
  return (
    <div className="flex gap-2.5 overflow-x-auto no-scrollbar pl-4 pr-2">
      {items.map((item) => (
        <button
          key={item.id}
          className="shrink-0 rounded-lg overflow-hidden text-left"
          style={{
            width: 218,
            height: 90,
            background: item.gradient,
            ...(item.bgImage && { backgroundImage: `url('${item.bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" }),
            flexShrink: 0,
          }}
          onClick={() => onSelect(item)}
        >
          <div className="h-full p-3 flex flex-col justify-between bg-linear-to-r from-black/70 via-black/30 to-transparent">
            <div className="flex items-start justify-between">
              <p className="text-white/50 text-[8.5px] font-semibold uppercase tracking-wider">{item.subtitle}</p>
              {item.logo && <div className="text-white/45 shrink-0"><item.logo size={16} /></div>}
            </div>
            <div>
              <p className="text-white text-[13px] font-bold leading-tight">{item.title}</p>
              <p className="text-white/40 text-[9px] mt-0.5 line-clamp-1">{item.body}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

// ─── Bottom Navigation ─────────────────────────────────────────────────────────

const BOTTOM_TABS = [
  {
    id: "home",
    label: "Home",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={a ? "white" : "rgba(255,255,255,0.35)"} />
      </svg>
    ),
  },
  {
    id: "search",
    label: "Search",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="2.2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={a ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "new",
    label: "New & Hot",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? "white" : "rgba(255,255,255,0.35)"}>
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
  },
  {
    id: "downloads",
    label: "Downloads",
    icon: (a: boolean) => (
      <svg width="21" height="21" viewBox="0 0 24 24" fill={a ? "white" : "rgba(255,255,255,0.35)"}>
        <path d="M12 16.5 7 11h3.5V4h3v7H17l-5 5.5zm-8 3.5v-2h16v2H4z" />
      </svg>
    ),
  },
]

function BottomNav() {
  const [active, setActive] = useState("home")
  return (
    <div className="flex justify-around items-center py-2 bg-[#0a0a0a] border-t border-white/6">
      {BOTTOM_TABS.map((tab) => (
        <button key={tab.id} onClick={() => setActive(tab.id)} className="flex flex-col items-center gap-0.5 px-1">
          {tab.icon(active === tab.id)}
          <span className={`text-[8.5px] ${active === tab.id ? "text-white font-bold" : "text-white/35"}`}>
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// ─── Detail Modal ──────────────────────────────────────────────────────────────

function DetailModal({
  item,
  onClose,
}: {
  item: CardItem
  onClose: () => void
}) {
  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={onClose}
    >
      <div
        className="rounded-t-2xl overflow-hidden"
        style={{ background: "#141414", animation: "slide-up 0.28s cubic-bezier(0.32, 0.72, 0, 1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero thumbnail */}
        <div
          className="h-[140px] relative"
          style={{
            background: item.gradient,
            ...(item.bgImage && { backgroundImage: `url('${item.bgImage}')`, backgroundSize: "cover", backgroundPosition: "center" }),
          }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(20,20,20,0.9) 100%)" }} />
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/55 flex items-center justify-center"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </button>
          {/* Title over image */}
          <div className="absolute bottom-3 left-4 right-12">
            <p className="text-white/50 text-[9px] font-semibold uppercase tracking-widest mb-0.5">
              {item.subtitle.split(" · ")[0]}
            </p>
            <h3 className="text-white text-[19px] font-black tracking-tight leading-none">{item.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-5">
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#4CAF50] text-[11px] font-bold">98% Match</span>
            <span className="text-white/40 text-[10px] border border-white/20 px-1.5 py-px rounded-sm">
              {item.subtitle.includes("·") ? item.subtitle.split(" · ")[1] ?? "Portfolio" : "Portfolio"}
            </span>
          </div>

          {/* Body text */}
          <p className="text-white/75 text-[12px] leading-[1.65] mb-3">{item.body}</p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {item.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/55 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Action row */}
          <div className="flex gap-2.5">
            {/* Primary CTA */}
            {item.ctaUrl ? (
              <a
                href={item.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded font-bold text-[13px]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M5 3l14 9-14 9V3z" /></svg>
                {item.ctaLabel ?? "Play"}
              </a>
            ) : (
              <button className="flex-1 flex items-center justify-center gap-2 bg-white text-black py-2.5 rounded font-bold text-[13px]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M5 3l14 9-14 9V3z" /></svg>
                {item.ctaLabel ?? "Play"}
              </button>
            )}
            {/* Bookmark */}
            <button className="w-11 flex items-center justify-center bg-[#2a2a2a] rounded border border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z" />
              </svg>
            </button>
            {/* Like */}
            <button className="w-11 flex items-center justify-center bg-[#2a2a2a] rounded border border-white/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Browse Screen ─────────────────────────────────────────────────────────────


function BrowseScreen({
  profile,
  onBack,
  closeApp,
}: {
  profile: Profile
  onBack: () => void
  closeApp: () => void
}) {
  const [selectedItem, setSelectedItem] = useState<CardItem | null>(null)
  const rows = getRows(profile.key)

  return (
    <div className="w-full h-full bg-black flex flex-col relative">
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Sticky transparent header */}
        <div
          className="sticky top-0 z-30 flex items-center justify-between px-3 py-2.5"
          style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.96) 60%, transparent 100%)" }}
        >
          <div className="flex items-center gap-2.5">
            <button onClick={closeApp} className="p-1">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span
              className="text-[#E50914] font-black tracking-tight select-none"
              style={{ fontSize: "20px", fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: "-0.04em" }}
            >
              NETFLIX
            </span>
          </div>
          <div className="flex items-center gap-3.5">
            {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" />
            </svg> */}
            {/* Profile avatar — tap to change profile */}
            <button onClick={onBack} className="rounded-lg overflow-hidden" style={{ width: 28, height: 28 }}>
              <AvatarSVG k={profile.key} size={28} />
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="relative -mt-11" style={{ height: 370 }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/project_os_portfolio.png')" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.88) 72%, #000 100%)" }}
          />
          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 z-10">
            {/* N SERIES badge */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[#E50914] text-[10px] font-black tracking-[0.15em]">N</span>
              <span className="text-white/45 text-[9px] font-semibold tracking-[0.25em]">S E R I E S</span>
            </div>

            <h2 className="text-white font-black leading-none mb-1.5 tracking-tight" style={{ fontSize: 28 }}>
              {portfolioData.personal.name}
            </h2>
            <p className="text-white/55 text-[12px] mb-0.5">{portfolioData.personal.title}</p>
            <p className="text-white/35 text-[11px] mb-4">{HERO_TAGLINES[profile.key]}</p>

            {/* Genre pills */}
            <div className="flex items-center gap-1.5 mb-4">
              {["Full Stack", "React", "Node.js", "AWS"].map((g) => (
                <span key={g} className="text-white/50 text-[9px] font-medium">
                  {g}
                  <span className="text-white/20 ml-1.5">·</span>
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-2.5">
              <a
                href={`/Nihir%20Shah%20Resume.pdf`}
                className="flex-1 flex items-center justify-center gap-1.5 bg-white text-black py-2.5 rounded font-bold text-[13px]"
                target="_blank"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M5 3l14 9-14 9V3z" /></svg>
                Resume
              </a>
              <button
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded font-semibold text-[13px] text-white"
                style={{ background: "rgba(109,109,110,0.7)" }}
                onClick={() => setSelectedItem(ABOUT_CARD)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
                More Info
              </button>
            </div>
          </div>
        </div>

        {/* Content rows */}
        <div className="mt-4 space-y-5 pb-3">
          {rows.map((row) => (
            <div key={row.id}>
              <h3 className="text-white text-[14px] font-bold mb-2.5 px-4">{row.label}</h3>
              {row.variant === "continue" && <ContinueWatchingRow items={row.items} onSelect={setSelectedItem} />}
              {row.variant === "tall" && <TallCardsRow items={row.items} onSelect={setSelectedItem} />}
              {row.variant === "wide" && <WideCardsRow items={row.items} onSelect={setSelectedItem} />}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <BottomNav />

      {/* Detail modal */}
      {selectedItem && <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  )
}

// ─── Netflix Intro Splash ─────────────────────────────────────────────────────
//
// Three-phase CSS transition animation that mimics the Netflix app launch:
//   phase 0 → invisible, scaled down  (initial render, no transition)
//   phase 1 → full size + red glow    (enter: spring easing, ~550ms)
//   phase 2 → fades out, scales up    (exit: ease-in, ~350ms)
//
// Total wall-clock time: ~1 550ms before onDone fires.

function NetflixIntro({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0)
  const done = useCallback(onDone, [onDone])

  useEffect(() => {
    // One rAF to let the browser paint phase-0 styles before we trigger the transition
    const raf = requestAnimationFrame(() => {
      setPhase(1)
      playNetflixTaDum()
      const tExit = setTimeout(() => setPhase(2), 1080)
      const tDone = setTimeout(done, 1480)
      return () => { clearTimeout(tExit); clearTimeout(tDone) }
    })
    return () => cancelAnimationFrame(raf)
  }, [done])

  // Per-phase style snapshot
  const phaseStyle: React.CSSProperties =
    phase === 0 ? { transform: "scale(0.48)", opacity: 0, filter: "drop-shadow(0 0 0px  rgba(229,9,20,0))" } :
      phase === 1 ? { transform: "scale(1)", opacity: 1, filter: "drop-shadow(0 0 28px rgba(229,9,20,0.6))" } :
        { transform: "scale(1.14)", opacity: 0, filter: "drop-shadow(0 0 0px  rgba(229,9,20,0))" }

  const transitionStyle: React.CSSProperties =
    phase === 0 ? { transition: "none" } :
      phase === 1 ? { transition: "transform 560ms cubic-bezier(0.16,1,0.3,1), opacity 420ms ease-out, filter 640ms ease-out" } :
        { transition: "transform 380ms ease-in, opacity 320ms ease-in, filter 320ms ease-in" }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      {/* Red scan-line that sweeps down during the hold phase */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(229,9,20,0.04) 50%, transparent 100%)",
          opacity: phase === 1 ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      />

      {/* Stacked name — "NIHIR / SHAH" as display type, Netflix red with glow */}
      <div style={{ ...phaseStyle, ...transitionStyle, textAlign: "center" }}>
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.88,
            color: "#E50914",
            fontSize: "68px",
            userSelect: "none",
          }}
        >
          <div>NIHIR</div>
          <div>SHAH</div>
        </div>
      </div>
    </div>
  )
}

// ─── Root Component ────────────────────────────────────────────────────────────

export default function NetflixApp() {
  const { closeApp } = useAppNavigation()
  const [screen, setScreen] = useState<"intro" | "profiles" | "browse">("intro")
  const [profile, setProfile] = useState<Profile | null>(null)

  if (screen === "intro") {
    return <NetflixIntro onDone={() => setScreen("profiles")} />
  }

  if (screen === "profiles" || !profile) {
    return (
      <ProfilesScreen
        onSelect={(p) => { setProfile(p); setScreen("browse") }}
        closeApp={closeApp}
      />
    )
  }

  return (
    <BrowseScreen
      profile={profile}
      onBack={() => setScreen("profiles")}
      closeApp={closeApp}
    />
  )
}
