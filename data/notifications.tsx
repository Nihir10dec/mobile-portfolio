import type { ReactNode } from "react"
import type { AppId } from "@/hooks/use-app-navigation"

export interface AppNotification {
  id: string
  /** App opened when the notification is tapped. */
  appId: Exclude<AppId, "home" | null>
  /** Display name shown in the notification header. */
  app: string
  /** Brand colour (solid or gradient) used for the rounded app glyph. */
  accent: string
  /** Small monochrome glyph rendered inside the brand-coloured tile. */
  icon: ReactNode
  title: string
  message: string
  time: string
  unread?: boolean
}

/* Compact, recognisable brand glyphs (white, drawn on the brand-coloured tile). */
const glyphs = {
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.16c-.25.69-1.45 1.32-1.99 1.36-.53.04-.53.42-3.34-.7-2.81-1.12-4.6-3.95-4.74-4.13-.14-.18-1.14-1.51-1.14-2.88s.72-2.05.97-2.33c.25-.28.55-.35.74-.35.18 0 .37 0 .53.01.17.01.4-.06.62.48.25.6.85 2.07.92 2.22.07.14.12.31.02.49-.09.18-.14.3-.28.46-.14.16-.29.36-.42.49-.14.14-.28.28-.12.55.16.27.71 1.17 1.53 1.9 1.05.93 1.94 1.23 2.2 1.37.27.14.42.12.58-.07.16-.18.67-.78.85-1.05.18-.27.36-.22.6-.13.25.09 1.57.74 1.84.87.27.14.45.21.52.32.07.11.07.62-.18 1.31z" />
    </svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  github: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.16.58.67.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
    </svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v13a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 15H5V9h14v10z" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="white" stroke="none" />
    </svg>
  ),
  spotify: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.59 14.43a.62.62 0 01-.86.21c-2.35-1.44-5.3-1.76-8.79-.96a.62.62 0 11-.28-1.21c3.81-.87 7.08-.5 9.72 1.11.3.18.39.57.21.85zm1.22-2.72a.78.78 0 01-1.07.26c-2.69-1.65-6.79-2.13-9.97-1.17a.78.78 0 11-.45-1.49c3.63-1.1 8.15-.56 11.24 1.33.36.22.48.7.25 1.07zm.11-2.84C14.8 8.96 9.5 8.78 6.43 9.71a.94.94 0 11-.54-1.8c3.52-1.07 9.37-.86 13.07 1.34a.94.94 0 01-.96 1.62z" />
    </svg>
  ),
  medium: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M4.37 7.3c.02-.2-.05-.4-.2-.53L2.6 4.86V4.6h5.17l4 8.76 3.5-8.76H20v.26l-1.34 1.28c-.12.09-.18.24-.15.38v9.65c-.03.15.03.3.15.38l1.31 1.28v.26h-6.58v-.26l1.36-1.31c.13-.13.13-.17.13-.38V8.1l-3.78 9.59h-.51L5.86 8.1v6.43c-.04.28.06.56.25.76l1.77 2.15v.26H2.86v-.26l1.77-2.15c.19-.2.27-.48.23-.76V7.3z" />
    </svg>
  ),
}

/**
 * Portfolio-flavoured notifications shown in the Notification Center (iOS) and
 * the combined shade (Android). Tapping a card opens the related app.
 */
export const notifications: AppNotification[] = [
  {
    id: "n1",
    appId: "whatsapp",
    app: "WhatsApp",
    accent: "#25D366",
    icon: glyphs.whatsapp,
    title: "Recruiter",
    message: "Hi Nihir! Loved your new Mobile Portfolio — are you open to a Senior Frontend role?",
    time: "now",
    unread: true,
  },
  {
    id: "n2",
    appId: "mail",
    app: "Mail",
    accent: "#007AFF",
    icon: glyphs.mail,
    title: "Interview Invitation",
    message: "Stripe Talent: We'd love to schedule a chat about the Frontend Engineer role.",
    time: "9:41 AM",
    unread: true,
  },
  {
    id: "n3",
    appId: "linkedin",
    app: "LinkedIn",
    accent: "#0A66C2",
    icon: glyphs.linkedin,
    title: "LinkedIn",
    message: "You appeared in 12 searches this week. See who's looking.",
    time: "8:30 AM",
    unread: true,
  },
  {
    id: "n4",
    appId: "github",
    app: "GitHub",
    accent: "#24292e",
    icon: glyphs.github,
    title: "New star ⭐",
    message: "vercel starred your repository nihir10dec/mobile-portfolio.",
    time: "Yesterday",
  },
  {
    id: "n5",
    appId: "calendar",
    app: "Calendar",
    accent: "#FF3B30",
    icon: glyphs.calendar,
    title: "Portfolio review",
    message: "Design sync with the team today at 4:00 PM.",
    time: "Yesterday",
  },
  {
    id: "n6",
    appId: "instagram",
    app: "Instagram",
    accent: "linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F77737 80%, #FCAF45 100%)",
    icon: glyphs.instagram,
    title: "Instagram",
    message: "build_with_nihir and 24 others liked your latest reel.",
    time: "Mon",
  },
  {
    id: "n7",
    appId: "spotify",
    app: "Spotify",
    accent: "#1DB954",
    icon: glyphs.spotify,
    title: "Made for you",
    message: "Your 2026 deep-focus coding playlist is ready.",
    time: "Mon",
  },
  {
    id: "n8",
    appId: "medium",
    app: "Medium",
    accent: "#000000",
    icon: glyphs.medium,
    title: "Medium",
    message: "Your article \"Building a phone in the browser\" reached 1.2k reads.",
    time: "Sun",
  },
]
