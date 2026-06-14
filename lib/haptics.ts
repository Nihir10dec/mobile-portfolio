/**
 * Trigger device haptic feedback via the Vibration API.
 * Safely no-ops on unsupported platforms (desktop, iOS Safari) and when the
 * user prefers reduced motion.
 */
export function haptic(pattern: number | number[] = 8) {
  if (typeof window === "undefined") return
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return

  try {
    navigator.vibrate(pattern)
  } catch {
    /* ignore */
  }
}
