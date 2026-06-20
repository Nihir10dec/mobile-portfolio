"use client"

import { useState, useRef, useEffect } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Briefcase,
  GraduationCap,
  FolderOpen,
  BookOpen,
  Code2,
  User,
  LayoutList,
} from "lucide-react"
import type { Tab, CareerTab, CategoryConfig, SelectedPost } from "./instagram-app.types"
import {
  feedPosts,
  profileData,
  workExperience,
  education,
  projects,
  blogs,
  skills,
  CAREER_TABS,
} from "./instagram-app.data"

// ─── Config ────────────────────────────────────────────────────────────────

const categoryConfig: Record<CareerTab, CategoryConfig> = {
  work: {
    label: "Companies",
    gridFrom: "from-blue-900",
    gridTo: "to-indigo-950",
    heroFrom: "from-slate-950",
    heroVia: "via-blue-950",
    heroTo: "to-indigo-950",
    accentBg: "bg-blue-600",
    textAccent: "text-blue-400",
    storyFrom: "from-blue-500",
    storyTo: "to-indigo-500",
    Icon: Briefcase,
  },
  education: {
    label: "Colleges",
    gridFrom: "from-violet-900",
    gridTo: "to-purple-950",
    heroFrom: "from-slate-950",
    heroVia: "via-violet-950",
    heroTo: "to-purple-950",
    accentBg: "bg-violet-600",
    textAccent: "text-violet-400",
    storyFrom: "from-violet-500",
    storyTo: "to-purple-500",
    Icon: GraduationCap,
  },
  projects: {
    label: "Projects",
    gridFrom: "from-emerald-900",
    gridTo: "to-teal-950",
    heroFrom: "from-slate-950",
    heroVia: "via-emerald-950",
    heroTo: "to-teal-950",
    accentBg: "bg-emerald-600",
    textAccent: "text-emerald-400",
    storyFrom: "from-emerald-500",
    storyTo: "to-teal-500",
    Icon: FolderOpen,
  },
  blogs: {
    label: "Blogs",
    gridFrom: "from-orange-900",
    gridTo: "to-amber-950",
    heroFrom: "from-slate-950",
    heroVia: "via-orange-950",
    heroTo: "to-amber-950",
    accentBg: "bg-orange-600",
    textAccent: "text-amber-400",
    storyFrom: "from-orange-500",
    storyTo: "to-amber-500",
    Icon: BookOpen,
  },
  skills: {
    label: "Skills",
    gridFrom: "from-rose-900",
    gridTo: "to-pink-950",
    heroFrom: "from-slate-950",
    heroVia: "via-rose-950",
    heroTo: "to-pink-950",
    accentBg: "bg-rose-600",
    textAccent: "text-rose-400",
    storyFrom: "from-rose-500",
    storyTo: "to-pink-500",
    Icon: Code2,
  },
}

// ─── Component ─────────────────────────────────────────────────────────────

export default function InstagramApp() {
  const { closeApp } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  // Theme-aware color tokens (matching real Instagram light/dark palette)
  const bg = isDark ? "#000000" : "#ffffff"
  const headerBg = isDark ? "#000000" : "#ffffff"
  const borderColor = isDark ? "#262626" : "#dbdbdb"
  const textPrimary = isDark ? "#ffffff" : "#262626"
  const textMuted = isDark ? "#a8a8a8" : "#737373"
  const avatarBg = isDark ? "#1a1a1a" : "#efefef"
  const messageBtnBg = isDark ? "#262626" : "#efefef"
  const imagePlaceholderBg = isDark ? "#1a1a1a" : "#f0f0f0"
  const storyInnerBg = isDark ? "#000000" : "#ffffff"
  const captionBg = isDark ? "#0a0a0a" : "#ffffff"
  const gridGapColor = isDark ? "#000000" : "#ffffff"
  const iconColor = isDark ? "#ffffff" : "#262626"
  const cardBg = isDark ? "#1b1f23" : "#fff"

  const [activeTab, setActiveTab] = useState<Tab>("feed")
  const [selectedPost, setSelectedPost] = useState<SelectedPost>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set())
  const [feedLikes, setFeedLikes] = useState<Set<number>>(new Set())

  const highlightButtonRefs = useRef<Partial<Record<Tab, HTMLButtonElement | null>>>({})

  useEffect(() => {
    highlightButtonRefs.current[activeTab]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    })
  }, [activeTab])

  const toggleLike = (key: string) =>
    setLikedPosts((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  const toggleSave = (key: string) =>
    setSavedPosts((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  const toggleFeedLike = (id: number) =>
    setFeedLikes((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const getCareerContent = (): any[] => {
    switch (activeTab) {
      case "work": return workExperience
      case "education": return education
      case "projects": return projects
      case "blogs": return blogs
      case "skills": return skills
      default: return []
    }
  }

  // ── Feed tab ──────────────────────────────────────────────────────────────

  const renderFeedTab = () => (
    <>
      {feedPosts.map((post) => {
        const liked = feedLikes.has(post.id)
        return (
          <div key={post.id} className="border-b" style={{ borderColor }}>
            {/* Post header */}
            <div className="flex items-center justify-between px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full p-[2.5px] bg-linear-to-tr from-blue-500 via-violet-500 to-rose-500 shrink-0">
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{
                    backgroundColor: cardBg,
                    backgroundImage: "url('/images/avatar-profile.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}>
                  </div>
                </div>
                <span className="text-[13px] font-semibold" style={{ color: textPrimary }}>{profileData.username}</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={iconColor}>
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </svg>
            </div>

            {/* Post image */}
            <div
              className="w-full aspect-square bg-cover bg-center"
              style={{ backgroundImage: `url('${post.image}')`, backgroundColor: imagePlaceholderBg }}
            />

            {/* Actions */}
            <div className="px-3 pt-2.5 pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-4 items-center">
                  <button onClick={() => toggleFeedLike(post.id)}>
                    <Heart
                      size={24}
                      className={liked ? "text-red-500" : ""}
                      style={{ color: liked ? undefined : iconColor }}
                      fill={liked ? "currentColor" : "none"}
                    />
                  </button>
                  <MessageCircle size={24} style={{ color: iconColor }} />
                  <Send size={24} style={{ color: iconColor }} />
                </div>
                <Bookmark size={24} style={{ color: iconColor }} />
              </div>
              <p className="text-[13px] font-semibold" style={{ color: textPrimary }}>
                {post.likes + (liked ? 1 : 0)} likes
              </p>
              <p className="text-[13px] mt-0.5 leading-snug" style={{ color: textPrimary }}>
                <span className="font-semibold">{profileData.username} </span>
                {post.caption}
              </p>
              <p className="text-[12px] mt-0.5" style={{ color: textMuted }}>
                View all {post.comments} comments
              </p>
              <p className="text-[10px] mt-0.5 uppercase" style={{ color: textMuted }}>{post.time} ago</p>
            </div>
          </div>
        )
      })}
    </>
  )

  // ── Career grid ───────────────────────────────────────────────────────────

  const renderCareerGrid = () => {
    const cfg = categoryConfig[activeTab as CareerTab]
    const content = getCareerContent()
    return (
      <div className="grid grid-cols-3 gap-px" style={{ background: gridGapColor }}>
        {content.map((item) => {
          const Logo = item.logo;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedPost({ post: item, tab: activeTab as CareerTab })}
              className={`aspect-square bg-linear-to-br ${cfg.gridFrom} ${cfg.gridTo} flex flex-col items-center justify-center gap-2 p-2 active:opacity-75 transition-opacity`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${cfg.accentBg} flex items-center justify-center shadow-lg text-white`}
              >
                {Logo ? <Logo />
                  : <span className="text-white text-sm font-bold">{item.initials}</span>}
              </div>
              <span className="text-white text-[9px] font-medium text-center leading-tight line-clamp-2 opacity-80">
                {item.title ?? item.company ?? item.institution ?? item.category}
              </span>
            </button>
          );
        })}
      </div>
    )
  }

  // ── Post modal ────────────────────────────────────────────────────────────

  const renderModal = () => {
    if (!selectedPost) return null
    const { post, tab } = selectedPost
    const cfg = categoryConfig[tab]
    const postKey = `${tab}-${post.id}`
    const isLiked = likedPosts.has(postKey)
    const isSaved = savedPosts.has(postKey)

    let title = ""
    let subtitle = ""
    let description = ""
    let pills: string[] | null = null
    const Logo = post.logo

    if (tab === "work") {
      title = post.company
      subtitle = `${post.position} · ${post.duration}`
      description = post.description
    } else if (tab === "education") {
      title = post.institution
      subtitle = `${post.degree} · ${post.duration}`
      description = post.description
    } else if (tab === "projects") {
      title = post.title
      subtitle = post.tags?.join(" · ") ?? ""
      description = post.description
      pills = post.tags
    } else if (tab === "blogs") {
      title = post.title
      subtitle = post.readTime ?? ""
      description = post.description
    } else if (tab === "skills") {
      title = post.category
      subtitle = `${post.items.length} skills`
      pills = post.items
    }

    return (
      <div className="absolute inset-0 z-20 flex flex-col overflow-y-auto no-scrollbar" style={{ background: bg }}>
        {/* Post header strip */}
        <div className="flex items-center justify-between px-3 py-2.5 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full ${cfg.accentBg} flex items-center justify-center shrink-0`}>
              <span className="text-white text-[10px] font-bold">{post.initials}</span>
            </div>
            <span className="text-[13px] font-semibold" style={{ color: textPrimary }}>{profileData.username}</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={iconColor}>
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </div>

        {/* Hero */}
        <div
          className={`w-full aspect-square bg-linear-to-br ${cfg.heroFrom} ${cfg.heroVia} ${cfg.heroTo} relative flex items-center justify-center shrink-0`}
        >
          <div className={`absolute top-0 right-0 w-40 h-40 rounded-full ${cfg.accentBg} opacity-10 blur-3xl`} />
          <div className={`absolute bottom-0 left-0 w-28 h-28 rounded-full ${cfg.accentBg} opacity-10 blur-2xl`} />
          <div className="relative flex flex-col items-center gap-4 px-8 text-center">
            <div className={`w-24 h-24 rounded-2xl ${cfg.accentBg} flex items-center justify-center shadow-2xl text-white`}>
              {Logo ? <Logo size={40} />
                : <span className="text-white text-3xl font-bold tracking-tight">{post.initials}</span>}
            </div>
            <div>
              <h2 className="text-white text-xl font-bold leading-tight">{title}</h2>
              {subtitle ? (
                <p className={`text-sm mt-1 ${cfg.textAccent}`}>{subtitle}</p>
              ) : null}
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="px-4 pt-3 pb-2 border-b shrink-0" style={{ borderColor }}>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <button onClick={() => toggleLike(postKey)} className="active:scale-90 transition-transform">
                <Heart
                  size={26}
                  className={isLiked ? "text-red-500" : ""}
                  style={{ color: isLiked ? undefined : iconColor }}
                  fill={isLiked ? "currentColor" : "none"}
                />
              </button>
              <button><MessageCircle size={26} style={{ color: iconColor }} /></button>
              <button><Send size={26} style={{ color: iconColor }} /></button>
            </div>
            <button onClick={() => toggleSave(postKey)} className="active:scale-90 transition-transform">
              <Bookmark
                size={26}
                style={{ color: iconColor }}
                fill={isSaved ? iconColor : "none"}
              />
            </button>
          </div>
        </div>

        {/* Caption */}
        <div className="px-4 py-3 flex-1" style={{ background: captionBg }}>
          <p className="text-sm font-semibold mb-1" style={{ color: textPrimary }}>{profileData.username}</p>
          {description ? (
            <p className="text-sm leading-relaxed" style={{ color: isDark ? "#e0e0e0" : "#4a4a4a" }}>{description}</p>
          ) : null}
          {pills ? (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {pills.map((item, i) => (
                <span
                  key={i}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border border-current/20 bg-current/10 ${cfg.textAccent}`}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
          {post.url && <a href={post.url} target="_blank" className={`text-xs mt-3 font-semibold ${cfg.textAccent}`}>Read More →</a>}
        </div>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ background: bg, color: textPrimary }}>

      {/* ── Header ── */}
      <div
        className="shrink-0 flex justify-between items-center px-4 py-2.5 border-b z-30"
        style={{ background: headerBg, borderColor }}
      >
        <button
          onClick={selectedPost ? () => setSelectedPost(null) : closeApp}
          className="w-9 h-9 flex items-center justify-center"
        >
          <ArrowLeft size={22} style={{ color: iconColor }} />
        </button>
        {selectedPost ? (
          <span className="text-base font-bold tracking-tight" style={{ color: textPrimary }}>Posts</span>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold tracking-tight" style={{ color: textPrimary }}>{profileData.username}</span>
            <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7l-4.5-4.5 1.4-1.4 3.1 3.1 6.5-6.5 1.4 1.4-7.9 7.9z" />
            </svg>
          </div>
        )}
        <div className="w-9" />
      </div>

      {/* ── Content area ── */}
      <div className="flex-1 relative overflow-hidden">

        {/* Main scroll */}
        <div className="absolute inset-0 overflow-y-auto no-scrollbar">

          {/* Profile */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex items-center gap-4">
              <div className="w-[78px] h-[78px] rounded-full p-[2.5px] bg-linear-to-tr from-blue-500 via-violet-500 to-rose-500 shrink-0">
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{
                  backgroundColor: cardBg,
                  // border: `1px solid ${border}`,
                  backgroundImage: "url('/images/avatar-profile.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  {/* <User size={30} style={{ color: textMuted }} /> */}
                </div>
              </div>
              <div className="flex-1 flex justify-around">
                {[
                  { value: profileData.companies, label: "Companies" },
                  { value: profileData.education, label: "Degrees" },
                  { value: profileData.projects, label: "Projects" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="text-[17px] font-bold" style={{ color: textPrimary }}>{value}</span>
                    <span className="text-[11px]" style={{ color: textMuted }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-3 space-y-0.5">
              <p className="text-sm font-semibold" style={{ color: textPrimary }}>{profileData.fullName}</p>
              <p className="text-xs" style={{ color: textMuted }}>{profileData.position} @ {profileData.company}</p>
              <p className="text-sm whitespace-pre-line leading-snug mt-1" style={{ color: textPrimary }}>{profileData.bio}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <a
                href={profileData.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 rounded-lg py-1.5 text-center text-sm font-semibold text-white"
              >
                Follow
              </a>
              <a
                href={`mailto:${profileData.email}`}
                className="flex-1 rounded-lg py-1.5 text-center text-sm font-semibold"
                style={{ background: messageBtnBg, color: textPrimary }}
              >
                Message
              </a>
            </div>
          </div>

          {/* Story Highlights */}
          <div className="flex gap-5 px-4 py-3 overflow-x-auto no-scrollbar border-b" style={{ borderColor }}>
            {/* Timeline highlight */}
            <button
              ref={(el) => { highlightButtonRefs.current["feed"] = el }}
              onClick={() => setActiveTab("feed")}
              className="flex flex-col items-center gap-1.5 shrink-0"
            >
              <div
                className={`w-[58px] h-[58px] rounded-full p-[2px] bg-linear-to-tr from-pink-500 via-yellow-400 to-orange-500 transition-opacity ${activeTab === "feed" ? "opacity-100" : "opacity-35"}`}
              >
                <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: storyInnerBg }}>
                  <LayoutList size={22} className={activeTab === "feed" ? "text-orange-400" : ""} style={{ color: activeTab === "feed" ? undefined : textMuted }} />
                </div>
              </div>
              <span className="text-[10px] font-medium" style={{ color: activeTab === "feed" ? textPrimary : textMuted }}>
                Timeline
              </span>
            </button>

            {/* Career category highlights */}
            {CAREER_TABS.map((tab) => {
              const cfg = categoryConfig[tab]
              const StoryIcon = cfg.Icon
              const isActive = activeTab === tab
              return (
                <button
                  key={tab}
                  ref={(el) => { highlightButtonRefs.current[tab] = el }}
                  onClick={() => setActiveTab(tab)}
                  className="flex flex-col items-center gap-1.5 shrink-0"
                >
                  <div
                    className={`w-[58px] h-[58px] rounded-full p-[2px] bg-linear-to-tr ${cfg.storyFrom} ${cfg.storyTo} transition-opacity ${isActive ? "opacity-100" : "opacity-35"}`}
                  >
                    <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: storyInnerBg }}>
                      <StoryIcon size={22} className={isActive ? cfg.textAccent : ""} style={{ color: isActive ? undefined : textMuted }} />
                    </div>
                  </div>
                  <span className="text-[10px] font-medium" style={{ color: isActive ? textPrimary : textMuted }}>
                    {cfg.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Tab bar */}
          <div className="flex border-b" style={{ borderColor }}>
            {/* Feed tab */}
            <button
              onClick={() => setActiveTab("feed")}
              className="flex-1 py-2 flex flex-col items-center gap-0.5 transition-colors"
              style={{
                color: activeTab === "feed" ? textPrimary : textMuted,
                borderBottom: activeTab === "feed" ? `1.5px solid ${textPrimary}` : "1.5px solid transparent",
              }}
            >
              <LayoutList size={16} />
              <span className="text-[9px] font-medium">Feed</span>
            </button>

            {/* Career tabs */}
            {CAREER_TABS.map((tab) => {
              const cfg = categoryConfig[tab]
              const TabIcon = cfg.Icon
              const isActive = activeTab === tab
              const shortLabel: Record<CareerTab, string> = {
                work: "Work",
                education: "Edu",
                projects: "Projects",
                blogs: "Blogs",
                skills: "Skills",
              }
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 flex flex-col items-center gap-0.5 transition-colors ${isActive ? cfg.textAccent : ""
                    }`}
                  style={
                    isActive
                      ? { borderBottom: "1.5px solid currentColor" }
                      : { borderBottom: "1.5px solid transparent", color: textMuted }
                  }
                >
                  <TabIcon size={16} />
                  <span className="text-[9px] font-medium">{shortLabel[tab]}</span>
                </button>
              )
            })}
          </div>

          {/* Tab content */}
          {activeTab === "feed" ? renderFeedTab() : renderCareerGrid()}
        </div>

        {/* Post modal */}
        {selectedPost && renderModal()}
      </div>
    </div>
  )
}
