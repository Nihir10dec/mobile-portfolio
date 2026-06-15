"use client"

import { useEffect, useRef, useState } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useDevice } from "@/hooks/use-device"
import DeviceFrame from "@/components/device-frame"
import DeviceControls from "@/components/device-controls"
import DragScroll from "@/components/drag-scroll"
import HomeScreen from "@/components/home-screen"
import AmbientBackground from "@/components/ambient-background"
import NetflixApp from "@/components/apps/netflix/netflix-app"
import InstagramApp from "@/components/apps/instagram/instagram-app"
import LinkedInApp from "@/components/apps/linkedin/linkedin-app"
import GitHubApp from "@/components/apps/github/github-app"
import NotesApp from "@/components/apps/notes/notes-app"
import WhatsAppApp from "@/components/apps/whatsapp/whatsapp-app"
import MapsApp from "@/components/apps/maps/maps-app"
import MailApp from "@/components/apps/mail/mail-app"
import CalendarApp from "@/components/apps/calendar/calendar-app"
import SpotifyApp from "@/components/apps/spotify/spotify-app"
import MediumApp from "@/components/apps/medium/medium-app"
import PhoneApp from "@/components/apps/phone/phone-app"
import SettingsApp from "@/components/apps/settings/settings-app"
import MessagesApp from "@/components/apps/messages/messages-app"
import BrowserApp from "@/components/apps/browser/browser-app"
import ChatGptApp from "@/components/apps/chatgpt/chatgpt-app"
import LockScreen from "@/components/lock-screen"
export default function Home() {
  const { currentApp, previousApp, isTransitioning, isLocked } = useAppNavigation()
  const { theme } = useDevice()
  const isDark = theme === "dark"

  const { goHome } = useAppNavigation()
  const appOverlayRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [deviceScale, setDeviceScale] = useState(1)

  // Global keyboard: Escape returns to the home screen from any open app.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLocked && currentApp !== "home" && currentApp !== null) {
        goHome()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [goHome, isLocked, currentApp])

  // Move focus into an app when it opens so keyboard users land in context.
  useEffect(() => {
    if (currentApp && currentApp !== "home") {
      appOverlayRef.current?.focus()
    }
  }, [currentApp])

  // Scale the fixed-size device (375×812) down to fit the available stage area so
  // it never overlaps the controls — critical on real phones shorter than 812px.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const DEVICE_W = 375
    const DEVICE_H = 812
    const update = () => {
      const { width, height } = stage.getBoundingClientRect()
      if (!width || !height) return
      setDeviceScale(Math.min(width / DEVICE_W, height / DEVICE_H, 1))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(stage)
    window.addEventListener("resize", update)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", update)
    }
  }, [])

  const renderApp = (id: typeof currentApp) => {
    switch (id) {
      case "netflix":
        return <NetflixApp />
      case "instagram":
        return <InstagramApp />
      case "linkedin":
        return <LinkedInApp />
      case "github":
        return <GitHubApp />
      case "notes":
        return <NotesApp />
      case "whatsapp":
        return <WhatsAppApp />
      case "maps":
        return <MapsApp />
      case "mail":
        return <MailApp />
      case "calendar":
        return <CalendarApp />
      case "spotify":
        return <SpotifyApp />
      case "medium":
        return <MediumApp />
      case "phone":
        return <PhoneApp />
      case "settings":
        return <SettingsApp />
      case "messages":
        return <MessagesApp />
      case "browser":
        return <BrowserApp />
      case "chatgpt":
        return <ChatGptApp />
      default:
        return null
    }
  }

  const isExiting = isTransitioning && (currentApp === "home" || currentApp === null) && previousApp !== null && previousApp !== "home"
  const isEntering = isTransitioning && currentApp !== "home" && currentApp !== null
  const appIdToShow = isExiting ? previousApp : currentApp
  const appContent = renderApp(appIdToShow)
  const showOverlay = Boolean(appContent) && (
    (currentApp !== "home" && currentApp !== null) || isExiting
  )

  return (
    <div className="relative w-full h-dvh overflow-hidden flex flex-col items-center justify-center gap-[2.5dvh] py-[2.5dvh] lg:flex-row lg:gap-8 lg:h-auto lg:min-h-screen lg:py-0">
      <AmbientBackground />

      {/* Device stage — scales the fixed-size device to fit the available height (esp. on mobile) */}
      <div
        ref={stageRef}
        className="relative z-10 w-full flex-1 min-h-0 lg:h-device-h lg:w-device-w lg:flex-none"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div style={{ width: 375, height: 812, transform: `scale(${deviceScale})`, transformOrigin: "center" }}>
            <DragScroll disabled={isLocked}>
              <DeviceFrame>
                <div className="relative w-full h-full">
                  {/* Home screen (always rendered underneath) */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${currentApp !== "home" && currentApp !== null ? "opacity-0 pointer-events-none" : "opacity-100"
                      }`}
                  >
                    <HomeScreen />
                  </div>

                  {/* Active app overlay */}
                  {showOverlay && (
                    <div
                      ref={appOverlayRef}
                      tabIndex={-1}
                      role="dialog"
                      aria-modal="true"
                      aria-label={`${appIdToShow ?? "app"} app`}
                      className={`absolute inset-0 z-30 outline-hidden ${isEntering ? "app-enter" : isExiting ? "app-exit" : ""
                        }`}
                      style={{
                        background: isDark ? "#000" : "#fff",
                      }}
                    >
                      {appContent}
                    </div>
                  )}

                  {/* Lock Screen (rendered on top) */}
                  <div
                    className={`absolute inset-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isLocked ? "translate-y-0" : "-translate-y-full pointer-events-none"
                      }`}
                  >
                    <LockScreen />
                  </div>

                </div>
              </DeviceFrame>
            </DragScroll>
          </div>
        </div>
      </div>

      {/* Controls — beside the device on desktop, below it on mobile (no overlap) */}
      <div className="relative z-50 shrink-0">
        {/* Mobile: horizontal pill */}
        <div className="lg:hidden">
          <div
            className={`flex items-center rounded-full px-3 py-2 shadow-lg backdrop-blur-xl border ${isDark
              ? "bg-black/60 border-white/10"
              : "bg-white/70 border-black/10"
              }`}
          >
            <DeviceControls orientation="horizontal" />
          </div>
        </div>
        {/* Desktop: vertical stack */}
        <div className="hidden lg:flex flex-col items-center">
          <DeviceControls />
        </div>
      </div>
    </div>
  )
}
