"use client"

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { trackEvent } from "@/lib/analytics"

export type AppId =
  | "home"
  | "netflix"
  | "instagram"
  | "linkedin"
  | "github"
  | "notes"
  | "whatsapp"
  | "maps"
  | "mail"
  | "calendar"
  | "spotify"
  | "phone"
  | "medium"
  | "settings"
  | "messages"
  | "browser"
  | "chatgpt"
  | null

// Apps that can be opened directly via a shareable `?app=<id>` deep link.
const DEEP_LINK_APPS = [
  "netflix", "instagram", "linkedin", "github", "notes", "whatsapp",
  "maps", "mail", "calendar", "spotify", "phone", "medium", "settings",
  "messages", "browser", "chatgpt",
] as const

function isDeepLinkApp(value: string | null): value is AppId {
  return value !== null && (DEEP_LINK_APPS as readonly string[]).includes(value)
}

/** Reflect the open app in the address bar without a full navigation. */
function syncUrl(id: AppId) {
  if (typeof window === "undefined") return
  const url = new URL(window.location.href)
  if (id && id !== "home") {
    url.searchParams.set("app", id)
  } else {
    url.searchParams.delete("app")
  }
  window.history.replaceState(window.history.state, "", url.toString())
}

interface AppNavigationContextType {
  currentApp: AppId
  previousApp: AppId
  isTransitioning: boolean
  isLocked: boolean
  openApp: (id: AppId) => void
  closeApp: () => void
  goHome: () => void
  unlockPhone: () => void
  lockPhone: () => void
}

const AppNavigationContext = createContext<AppNavigationContextType | null>(null)

export function AppNavigationProvider({ children }: { children: ReactNode }) {
  const [currentApp, setCurrentApp] = useState<AppId>("home")
  const [previousApp, setPreviousApp] = useState<AppId>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLocked, setIsLocked] = useState(true)

  // On first load, honour a `?app=<id>` deep link: unlock and open that app.
  useEffect(() => {
    const app = new URLSearchParams(window.location.search).get("app")
    if (isDeepLinkApp(app)) {
      setIsLocked(false)
      setCurrentApp(app)
      trackEvent("deep_link_open", { app })
    }
  }, [])

  const openApp = useCallback((id: AppId) => {
    if (isTransitioning || isLocked) return
    setIsTransitioning(true)
    setPreviousApp(currentApp)
    setCurrentApp(id)
    syncUrl(id)
    if (id) trackEvent("open_app", { app: id })
    setTimeout(() => setIsTransitioning(false), 450)
  }, [currentApp, isTransitioning, isLocked])

  const closeApp = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setPreviousApp(currentApp)
    setCurrentApp("home")
    syncUrl("home")
    setTimeout(() => setIsTransitioning(false), 350)
  }, [currentApp, isTransitioning])

  const goHome = useCallback(() => {
    if (currentApp === "home" || isLocked) return
    closeApp()
  }, [currentApp, closeApp, isLocked])

  const unlockPhone = useCallback(() => {
    setIsLocked(false)
  }, [])

  const lockPhone = useCallback(() => {
    setIsLocked(true)
    setCurrentApp("home") // optional: always return home when locking
    syncUrl("home")
  }, [])

  return (
    <AppNavigationContext.Provider value={{ currentApp, previousApp, isTransitioning, isLocked, openApp, closeApp, goHome, unlockPhone, lockPhone }}>
      {children}
    </AppNavigationContext.Provider>
  )
}

export function useAppNavigation() {
  const ctx = useContext(AppNavigationContext)
  if (!ctx) throw new Error("useAppNavigation must be used within AppNavigationProvider")
  return ctx
}
