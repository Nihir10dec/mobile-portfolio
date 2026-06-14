/**
 * Fire a lightweight custom analytics event to any provider that is loaded.
 * No-ops on the server or when no analytics tooling is present.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return

  const w = window as typeof window & {
    gtag?: (...args: unknown[]) => void
    clarity?: (...args: unknown[]) => void
  }

  w.gtag?.("event", name, params)
  w.clarity?.("event", name)
}
