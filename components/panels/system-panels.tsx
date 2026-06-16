"use client"

import { useEffect, useRef, useState } from "react"
import { useDevice } from "@/hooks/use-device"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useSystemPanel } from "@/hooks/use-system-panel"
import { haptic } from "@/lib/haptics"
import IosNotificationCenter from "./ios-notification-center"
import IosControlCenter from "./ios-control-center"
import AndroidShade from "./android-shade"

type Kind = "notifications" | "control"

/** Pull distance (px) that maps to a fully-open panel. */
const TRAVEL = 480
/** Progress needed to commit an open (pulling down) or stay open (pulling up). */
const OPEN_AT = 0.35
const CLOSE_BELOW = 0.6
/** iOS-style easing for the spring-to-rest after release. */
const EASE = "transform 0.42s cubic-bezier(0.32,0.72,0,1)"

/**
 * Mounts the pull-down notification / control surfaces and handles their
 * gestures. iOS exposes two panels (top-left = Notifications, top-right =
 * Control Center); Android exposes a single combined shade from either origin.
 * Only available while unlocked.
 *
 * Gestures use explicit pointer capture on the element that received the
 * pointerdown so both mouse and touch route every move/up to the same handler,
 * and that element stays mounted for the whole drag.
 */
export default function SystemPanels() {
  const { device, theme } = useDevice()
  const { isLocked, isTransitioning } = useAppNavigation()
  const { panel, openPanel, closePanel } = useSystemPanel()

  const isDark = theme === "dark"
  const isIphone = device === "iphone"

  // Live drag state. `which` is the panel being dragged; `progress` 0→1.
  const [drag, setDrag] = useState<{ which: Kind; progress: number } | null>(null)
  const startRef = useRef(0)

  // Close whenever the phone locks (e.g. after the reboot gag).
  useEffect(() => {
    if (isLocked && panel !== "none") closePanel()
  }, [isLocked, panel, closePanel])

  const open = panel !== "none"
  const visible: Kind | null = drag?.which ?? (open ? (panel as Kind) : null)
  const progress = drag ? drag.progress : open ? 1 : 0
  const dragging = drag !== null

  const capture = (e: React.PointerEvent) => {
    try {
      ; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {
      /* ignore unsupported */
    }
  }

  const beginOpen = (which: Kind) => (e: React.PointerEvent) => {
    if (isLocked || isTransitioning || open) return
    e.stopPropagation()
    capture(e)
    startRef.current = e.clientY
    setDrag({ which: isIphone ? which : "notifications", progress: 0 })
  }

  const beginClose = (e: React.PointerEvent) => {
    if (!open) return
    e.stopPropagation()
    capture(e)
    startRef.current = e.clientY
    setDrag({ which: panel as Kind, progress: 1 })
  }

  const onMove = (e: React.PointerEvent) => {
    if (!drag) return
    const delta = e.clientY - startRef.current
    const p = open
      ? Math.max(0, Math.min(1, 1 + delta / TRAVEL)) // closing: drag up (delta < 0)
      : Math.max(0, Math.min(1, delta / TRAVEL)) // opening: drag down
    setDrag({ which: drag.which, progress: p })
  }

  const onEnd = () => {
    if (!drag) return
    if (open) {
      if (drag.progress < CLOSE_BELOW) {
        haptic(8)
        closePanel()
      }
      setDrag(null)
    } else {
      if (drag.progress > OPEN_AT) {
        haptic(10)
        openPanel(drag.which)
      }
      setDrag(null)
    }
  }

  const dismiss = () => {
    setDrag(null)
    closePanel()
  }

  if (isLocked) return null

  const scrimOpacity = progress * (isDark ? 0.55 : 0.35)

  return (
    <>
      {/* Top-edge trigger zones — stay mounted through the opening drag so the
          captured pointer keeps reporting to them. */}
      {!open &&
        (isIphone ? (
          <>
            <div
              aria-hidden
              onPointerDown={beginOpen("notifications")}
              onPointerMove={onMove}
              onPointerUp={onEnd}
              onPointerCancel={onEnd}
              onLostPointerCapture={onEnd}
              className="absolute left-0 top-0 z-44 h-7 w-1/2 touch-none"
            />
            <div
              aria-hidden
              onPointerDown={beginOpen("control")}
              onPointerMove={onMove}
              onPointerUp={onEnd}
              onPointerCancel={onEnd}
              onLostPointerCapture={onEnd}
              className="absolute right-0 top-0 z-44 h-7 w-1/2 touch-none"
            />
          </>
        ) : (
          <div
            aria-hidden
            onPointerDown={beginOpen("notifications")}
            onPointerMove={onMove}
            onPointerUp={onEnd}
            onPointerCancel={onEnd}
            onLostPointerCapture={onEnd}
            className="absolute left-0 top-0 z-44 h-7 w-full touch-none"
          />
        ))}

      {/* Active panel + scrim. Only mount once it is at least partly on-screen
          so a settled/zero-progress state never leaves an invisible scrim
          intercepting the trigger zones. */}
      {visible && (open || progress > 0) && (
        <div className="absolute inset-0 z-45">
          {/* Scrim */}
          <div
            className="absolute inset-0"
            onClick={dismiss}
            style={{
              background: "#000",
              opacity: scrimOpacity,
              transition: dragging ? "none" : "opacity 0.42s ease",
            }}
          />

          {/* Panel surface */}
          <div
            role="dialog"
            aria-modal="false"
            aria-label={visible === "control" ? "Control Center" : "Notifications"}
            className="absolute inset-0 touch-none"
            style={{
              transform: `translateY(${-(1 - progress) * 100}%)`,
              transition: dragging ? "none" : EASE,
              background: isIphone
                ? isDark
                  ? "rgba(8,8,10,0.55)"
                  : "rgba(245,245,247,0.5)"
                : isDark
                  ? "rgba(14,14,14,0.96)"
                  : "rgba(248,248,248,0.98)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
          >
            {isIphone ? (
              visible === "control" ? (
                <IosControlCenter isDark={isDark} />
              ) : (
                <IosNotificationCenter isDark={isDark} />
              )
            ) : (
              <AndroidShade isDark={isDark} />
            )}

            {/* Bottom grabber — drag up here to close. */}
            <div
              onPointerDown={beginClose}
              onPointerMove={onMove}
              onPointerUp={onEnd}
              onPointerCancel={onEnd}
              onLostPointerCapture={onEnd}
              className="absolute inset-x-0 bottom-0 z-10 flex h-9 cursor-grab items-center justify-center touch-none active:cursor-grabbing"
            >
              <div
                className="h-1.5 w-32 rounded-full"
                style={{ background: isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.25)" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
