"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useBattery } from "@/hooks/use-battery"
import { useSystemPanel } from "@/hooks/use-system-panel"
import { haptic } from "@/lib/haptics"

const HOLD_MS = 1100

/**
 * Press-and-hold reboot control. Holding for ~1.1s fills the ring and then
 * fires the existing "crash → glitch → boot → lock" sequence from useBattery.
 * Releasing early cancels with no side effects, so it can't be triggered by an
 * accidental tap. Used by both the iOS Control Center and the Android shade.
 */
export default function RebootButton({
  variant = "ios",
  isDark = true,
  bg,
}: {
  variant?: "ios" | "android" | "ios-tile"
  isDark?: boolean
  bg?: string
}) {
  const { triggerCrash } = useBattery()
  const { closePanel } = useSystemPanel()

  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(0)
  const firedRef = useRef(false)

  const stop = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
    setHolding(false)
    setProgress(0)
  }, [])

  useEffect(() => () => stop(), [stop])

  const tick = useCallback(() => {
    const elapsed = performance.now() - startRef.current
    const p = Math.min(1, elapsed / HOLD_MS)
    setProgress(p)
    if (p >= 1) {
      if (!firedRef.current) {
        firedRef.current = true
        haptic([30, 60, 120])
        closePanel()
        triggerCrash()
      }
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [closePanel, triggerCrash])

  const begin = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    firedRef.current = false
    startRef.current = performance.now()
    setHolding(true)
    haptic(6)
    rafRef.current = requestAnimationFrame(tick)
  }

  if (variant === "ios-tile") {
    return (
      <button
        type="button"
        aria-label="Hold to restart"
        onPointerDown={begin}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        className="relative flex items-center gap-3 rounded-[18px] px-3 select-none transition-transform active:scale-95"
        style={{
          flex: 2,
          background: holding ? "rgba(239,68,68,0.25)" : (bg ?? "rgba(255,255,255,0.12)"),
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(239,68,68,0.85)" }}>
          <PowerGlyph size={18} />
          {holding && <ProgressRing progress={progress} size={32} stroke={2.5} color="#fff" />}
        </span>
        <div className="text-left">
          <div className={`text-[12px] font-semibold ${isDark ? "text-white" : "text-black/80"}`}>Restart</div>
          <div className={`text-[10px] ${isDark ? "text-white/55" : "text-black/40"}`}>
            {holding ? "Keep holding…" : "Hold to restart"}
          </div>
        </div>
      </button>
    )
  }

  if (variant === "android") {
    return (
      <button
        type="button"
        aria-label="Hold to restart"
        onPointerDown={begin}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        className="relative flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors"
        style={{ background: holding ? "rgba(239,68,68,0.22)" : "rgba(255,255,255,0.08)" }}
      >
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "rgba(239,68,68,0.9)" }}>
          <PowerGlyph size={20} />
          {holding && <ProgressRing progress={progress} size={36} stroke={3} color="#fff" />}
        </span>
        <span className="flex flex-col">
          <span className="text-[13px] font-medium text-white">Restart</span>
          <span className="text-[11px] text-white/55">{holding ? "Keep holding…" : "Hold to restart"}</span>
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      aria-label="Hold to restart"
      onPointerDown={begin}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
      className="flex flex-col items-center gap-1.5 select-none"
    >
      <span
        className="relative flex h-13 w-13 items-center justify-center rounded-full transition-transform active:scale-95"
        style={{ background: holding ? "rgba(239,68,68,0.95)" : "rgba(239,68,68,0.85)" }}
      >
        <PowerGlyph size={22} />
        {holding && <ProgressRing progress={progress} size={52} stroke={3.5} color="#fff" />}
      </span>
      <span className={`text-[11px] font-medium ${isDark ? "text-white/80" : "text-black/65"}`}>{holding ? "Hold…" : "Restart"}</span>
    </button>
  )
}

function PowerGlyph({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 3v9" />
      <path d="M6.4 7.3a8 8 0 1011.2 0" />
    </svg>
  )
}

function ProgressRing({
  progress,
  size,
  stroke,
  color,
}: {
  progress: number
  size: number
  stroke: number
  color: string
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - progress)}
      />
    </svg>
  )
}
