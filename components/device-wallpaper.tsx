"use client"

import { useDevice } from "@/hooks/use-device"

/**
 * DeviceWallpaper
 *
 * Renders an instantly recognizable, OS-accurate wallpaper that fills its
 * relatively/absolutely positioned parent.
 *
 * - iPhone  -> the signature iOS blue → purple → pink "orb" flow gradient.
 * - Android -> the colorful Material You / Pixel multi-blob gradient.
 *
 * Both light and dark variants are tuned so on-screen content (white labels in
 * dark mode, dark text in light mode) stays clearly readable.
 */
export default function DeviceWallpaper({ scale = 1 }: { scale?: number }) {
  const { device, theme } = useDevice()
  const isDark = theme === "dark"

  // ----- iOS: blue/purple/pink orb gradient -----
  const iosDark = `
    radial-gradient(120% 90% at 50% -10%, #1f3fb0 0%, transparent 55%),
    radial-gradient(90% 70% at 88% 28%, #7b2ff7 0%, transparent 50%),
    radial-gradient(110% 80% at 12% 85%, #d6336c 0%, transparent 55%),
    linear-gradient(180deg, #0a0e27 0%, #0b1026 50%, #050714 100%)
  `
  const iosLight = `
    radial-gradient(120% 90% at 50% -10%, #a8caff 0%, transparent 55%),
    radial-gradient(90% 70% at 88% 25%, #cbb0ff 0%, transparent 50%),
    radial-gradient(110% 80% at 10% 88%, #ffc6da 0%, transparent 55%),
    linear-gradient(180deg, #eef3ff 0%, #f4f0ff 50%, #fff0f6 100%)
  `

  // ----- Android: Material You / Pixel colorful blobs -----
  const androidDark = `
    radial-gradient(70% 60% at 18% 18%, #00bfa5 0%, transparent 48%),
    radial-gradient(70% 60% at 86% 22%, #1a73e8 0%, transparent 48%),
    radial-gradient(75% 65% at 78% 86%, #ff7043 0%, transparent 48%),
    radial-gradient(70% 60% at 16% 90%, #ab47bc 0%, transparent 48%),
    linear-gradient(160deg, #0d1117 0%, #11151c 100%)
  `
  const androidLight = `
    radial-gradient(70% 60% at 18% 18%, #a7f3d0 0%, transparent 48%),
    radial-gradient(70% 60% at 86% 22%, #bfdbfe 0%, transparent 48%),
    radial-gradient(75% 65% at 78% 86%, #fed7aa 0%, transparent 48%),
    radial-gradient(70% 60% at 16% 90%, #e9d5ff 0%, transparent 48%),
    linear-gradient(160deg, #f8fafc 0%, #eef2f7 100%)
  `

  const background =
    device === "android"
      ? isDark
        ? androidDark
        : androidLight
      : isDark
        ? iosDark
        : iosLight

  return (
    <div
      className="absolute inset-0 transition-transform duration-300"
      style={{ background, transform: `scale(${scale})` }}
    >
      {/* Soft contrast layer so labels/text stay readable over the brighter blobs */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.25) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.3) 100%)",
        }}
      />
    </div>
  )
}
