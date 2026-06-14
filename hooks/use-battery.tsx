"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { haptic } from "@/lib/haptics"

/**
 * The hidden "low battery" surprise. After the visitor has spent enough *active*
 * (unlocked) time exploring the device, the always-full battery begins to drain.
 * When it reaches the low threshold a playful "charge me up" prompt appears.
 *
 *   idle        → nothing happening, battery sits full
 *   draining    → unlocked long enough; battery ticking down toward the threshold
 *   low         → threshold hit; the Low Battery prompt is visible
 *   charging    → visitor picked a "charge" action; battery animating back to full
 *   crash-glitch→ visitor ignored the prompt; screen distorts
 *   crash-off   → black screen, the device has "died"
 *   crash-boot  → boot logo (Apple / Android) before returning to the lock screen
 */
export type BatteryPhase =
  | "idle"
  | "draining"
  | "low"
  | "charging"
  | "crash-glitch"
  | "crash-off"
  | "crash-boot"

interface BatteryContextType {
  level: number
  isCharging: boolean
  phase: BatteryPhase
  /** Open a "charge" link (or mailto) and animate the battery back to full. */
  charge: (url?: string) => void
  /** The visitor dismissed the prompt — run the glitch → reboot gag. */
  triggerCrash: () => void
}

const BatteryContext = createContext<BatteryContextType | null>(null)

/** Seconds of active (unlocked) time before the battery starts draining. */
const ACTIVE_TIME_BEFORE_DRAIN = 30
/** Battery percentage at which the prompt fires. */
const LOW_THRESHOLD = 20
/** Once-per-session guard so the gag never feels spammy. */
const SESSION_KEY = "battery-surprise-shown"

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false
}

export function BatteryProvider({ children }: { children: ReactNode }) {
  const { isLocked, lockPhone } = useAppNavigation()

  const [level, setLevel] = useState(100)
  const [isCharging, setIsCharging] = useState(false)
  const [phase, setPhase] = useState<BatteryPhase>("idle")

  // Accumulated active (unlocked) seconds and the live battery level, kept in
  // refs so the 1s heartbeat can read them without re-subscribing each tick.
  const activeSecondsRef = useRef(0)
  const levelRef = useRef(100)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const setBatteryLevel = useCallback((value: number) => {
    levelRef.current = value
    setLevel(value)
  }, [])

  const alreadyShownThisSession = useCallback(() => {
    if (typeof window === "undefined") return true
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1"
    } catch {
      return false
    }
  }, [])

  const markShown = useCallback(() => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      /* ignore */
    }
  }, [])

  // Clean up any pending timers on unmount.
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  // Drain engine: a single 1s heartbeat that only does work while the phone is
  // unlocked and the gag hasn't already played this session.
  useEffect(() => {
    if (alreadyShownThisSession()) return
    if (phase === "low" || phase === "charging" || phase.startsWith("crash")) return

    const heartbeat = setInterval(() => {
      // Pause accumulation while locked — only *active* time counts.
      if (isLocked) return

      activeSecondsRef.current += 1

      if (activeSecondsRef.current < ACTIVE_TIME_BEFORE_DRAIN) return

      setPhase((p) => (p === "idle" ? "draining" : p))

      const next = Math.max(LOW_THRESHOLD, levelRef.current - 1)
      setBatteryLevel(next)

      if (next <= LOW_THRESHOLD) {
        // Reached the threshold — surface the prompt.
        setPhase("low")
        haptic([20, 40, 20])
      }
    }, 1000)

    return () => clearInterval(heartbeat)
  }, [isLocked, phase, alreadyShownThisSession, setBatteryLevel])

  const charge = useCallback(
    (url?: string) => {
      if (url && typeof window !== "undefined") {
        if (url.startsWith("mailto:")) {
          window.location.href = url
        } else {
          window.open(url, "_blank", "noopener,noreferrer")
        }
      }

      markShown()
      haptic(12)
      setIsCharging(true)
      setPhase("charging")

      // Animate the battery back up to a full charge.
      const chargeInterval = setInterval(() => {
        const next = Math.min(100, levelRef.current + 4)
        setBatteryLevel(next)
        if (next >= 100) {
          clearInterval(chargeInterval)
          const done = setTimeout(() => {
            setIsCharging(false)
            setPhase("idle")
          }, 700)
          timersRef.current.push(done)
        }
      }, 60)
      timersRef.current.push(chargeInterval as unknown as ReturnType<typeof setTimeout>)
    },
    [markShown, setBatteryLevel],
  )

  const triggerCrash = useCallback(() => {
    markShown()
    haptic([30, 60, 120])

    const reduced = prefersReducedMotion()
    const glitchMs = reduced ? 300 : 900
    const offMs = 700
    const bootMs = 2000

    setPhase("crash-glitch")

    const t1 = setTimeout(() => setPhase("crash-off"), glitchMs)
    const t2 = setTimeout(() => setPhase("crash-boot"), glitchMs + offMs)
    const t3 = setTimeout(() => {
      // Recover: top the battery back up and drop the visitor on the lock screen.
      setBatteryLevel(80)
      setIsCharging(false)
      setPhase("idle")
      activeSecondsRef.current = 0
      lockPhone()
    }, glitchMs + offMs + bootMs)

    timersRef.current.push(t1, t2, t3)
  }, [lockPhone, markShown, setBatteryLevel])

  return (
    <BatteryContext.Provider value={{ level, isCharging, phase, charge, triggerCrash }}>
      {children}
    </BatteryContext.Provider>
  )
}

export function useBattery() {
  const ctx = useContext(BatteryContext)
  if (!ctx) {
    throw new Error("useBattery must be used within a BatteryProvider")
  }
  return ctx
}
