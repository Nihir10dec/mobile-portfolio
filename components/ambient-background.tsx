"use client"

import { useEffect, useState } from "react"
import { useDevice } from "@/hooks/use-device"

// Four calm phases driven purely by the local clock — no weather, no canvas.
type SceneType = "dawn" | "day" | "golden" | "night"

function getScene(hour: number): SceneType {
  if (hour >= 5 && hour < 7) return "dawn"
  if (hour >= 7 && hour < 16) return "day"
  if (hour >= 16 && hour < 19) return "golden"
  return "night"
}

interface AmbientBackgroundProps {
  /** Reserved for callers; the sky scene is intentionally clock-driven, not theme-driven. */
  isDarkMode?: boolean
}

export default function AmbientBackground(_props: AmbientBackgroundProps) {
  // Kept mounted within the device context; sky stays time-driven by design.
  useDevice()

  const [activeScene, setActiveScene] = useState<SceneType | null>(null)
  const [prevScene, setPrevScene] = useState<SceneType | null>(null)

  useEffect(() => {
    setActiveScene(getScene(new Date().getHours()))

    // Poll once every 10 minutes for a phase change and crossfade when it happens.
    const interval = setInterval(() => {
      const next = getScene(new Date().getHours())
      setActiveScene((current) => {
        if (current && current !== next) {
          setPrevScene(current)
          window.setTimeout(() => setPrevScene(null), 900)
        }
        return next
      })
    }, 600000)

    return () => clearInterval(interval)
  }, [])

  if (!activeScene) return null

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0, opacity: 0.6 }}
      aria-hidden="true"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (prefers-reduced-motion: no-preference) {
          .env-glow { animation: env-glow-pulse 24s infinite alternate ease-in-out; will-change: opacity, transform; }
        }
        @keyframes env-glow-pulse {
          0%   { opacity: 0.75; transform: scale(1); }
          100% { opacity: 1;    transform: scale(1.06); }
        }
      `,
        }}
      />

      {prevScene && <SceneRenderer scene={prevScene} isExiting />}
      <SceneRenderer scene={activeScene} isExiting={false} />
    </div>
  )
}

const SCENES: Record<
  SceneType,
  { sky: string; glow: string; glowPos: [string, string]; glowSize: number }
> = {
  dawn: {
    sky: "linear-gradient(to bottom, #2a2350 0%, #6d5a8c 55%, #e8a07a 100%)",
    glow: "rgba(255, 196, 140, 0.45)",
    glowPos: ["78%", "82%"],
    glowSize: 140,
  },
  day: {
    sky: "linear-gradient(to bottom, #bcd9f0 0%, #dcecfa 55%, #e8f4fd 100%)",
    glow: "rgba(255, 224, 130, 0.4)",
    glowPos: ["82%", "14%"],
    glowSize: 150,
  },
  golden: {
    sky: "linear-gradient(to bottom, #5a3a52 0%, #c8763c 60%, #f0b46e 100%)",
    glow: "rgba(255, 170, 90, 0.5)",
    glowPos: ["80%", "80%"],
    glowSize: 150,
  },
  night: {
    sky: "linear-gradient(to bottom, #0a0f1e 0%, #0f1422 55%, #131929 100%)",
    glow: "rgba(200, 215, 245, 0.22)",
    glowPos: ["80%", "16%"],
    glowSize: 90,
  },
}

function SceneRenderer({ scene, isExiting }: { scene: SceneType; isExiting: boolean }) {
  const { sky, glow, glowPos, glowSize } = SCENES[scene]
  const [gx, gy] = glowPos

  return (
    <div
      className="absolute inset-0"
      style={{
        background: sky,
        opacity: isExiting ? 0 : 1,
        transition: "opacity 900ms ease-in-out",
      }}
    >
      {/* Soft sun/moon glow — single CSS-animated highlight, no render loop */}
      <div
        className="env-glow absolute rounded-full"
        style={{
          left: `calc(${gx} - ${glowSize / 2}px)`,
          top: `calc(${gy} - ${glowSize / 2}px)`,
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
    </div>
  )
}
