"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

type DeviceType = "iphone" | "android"
type ThemeMode = "dark" | "light"
type Appearance = "light" | "dark" | "auto"

// Clock-driven theme used when appearance is "auto".
// Light during dawn/day (05:00–15:59), dark during golden/night — mirrors the
// ambient background's phase boundaries so the two feel coherent.
function clockTheme(hour: number): ThemeMode {
  return hour >= 5 && hour < 16 ? "light" : "dark"
}

interface DeviceContextType {
  device: DeviceType
  /** Effective theme actually rendered (resolves "auto" against the clock). */
  theme: ThemeMode
  appearance: Appearance
  setDevice: (d: DeviceType) => void
  setAppearance: (a: Appearance) => void
  toggleDevice: () => void
}

const DeviceContext = createContext<DeviceContextType | null>(null)

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDeviceState] = useState<DeviceType>("iphone")
  const [appearance, setAppearanceState] = useState<Appearance>("auto")
  // Effective theme; for "auto" this is recomputed from the clock.
  const [theme, setThemeState] = useState<ThemeMode>("dark")

  // Load persisted preferences
  useEffect(() => {
    const savedDevice = localStorage.getItem("os-portfolio-device") as DeviceType
    if (savedDevice) setDeviceState(savedDevice)

    const savedAppearance = localStorage.getItem("os-portfolio-appearance") as Appearance | null
    // Fall back to the legacy theme key on first load after the upgrade.
    const legacyTheme = localStorage.getItem("os-portfolio-theme") as ThemeMode | null
    const initial: Appearance = savedAppearance ?? legacyTheme ?? "auto"
    setAppearanceState(initial)
  }, [])

  // Resolve the effective theme from appearance; re-resolve on a timer while "auto".
  useEffect(() => {
    const resolve = () =>
      setThemeState(appearance === "auto" ? clockTheme(new Date().getHours()) : appearance)

    resolve()
    if (appearance !== "auto") return

    const interval = setInterval(resolve, 60000)
    return () => clearInterval(interval)
  }, [appearance])

  // Apply theme class to html
  useEffect(() => {
    const root = document.documentElement
    if (theme === "light") {
      root.classList.add("light")
    } else {
      root.classList.remove("light")
    }
  }, [theme])

  const setDevice = useCallback((d: DeviceType) => {
    setDeviceState(d)
    localStorage.setItem("os-portfolio-device", d)
  }, [])

  const setAppearance = useCallback((a: Appearance) => {
    setAppearanceState(a)
    localStorage.setItem("os-portfolio-appearance", a)
  }, [])

  const toggleDevice = useCallback(() => {
    setDevice(device === "iphone" ? "android" : "iphone")
  }, [device, setDevice])

  return (
    <DeviceContext.Provider value={{ device, theme, appearance, setDevice, setAppearance, toggleDevice }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  const ctx = useContext(DeviceContext)
  if (!ctx) throw new Error("useDevice must be used within DeviceProvider")
  return ctx
}
