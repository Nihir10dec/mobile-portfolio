"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

/**
 * Which pull-down system surface is currently open.
 *
 *   none          → nothing is showing
 *   notifications → iOS Notification Center (top-left swipe) / Android shade
 *   control       → iOS Control Center (top-right swipe)
 *
 * On Android both swipe origins open the single combined shade, which is
 * represented here by "notifications".
 */
export type SystemPanel = "none" | "notifications" | "control"

interface SystemPanelContextType {
  panel: SystemPanel
  openPanel: (p: Exclude<SystemPanel, "none">) => void
  closePanel: () => void
}

const SystemPanelContext = createContext<SystemPanelContextType | null>(null)

export function SystemPanelProvider({ children }: { children: ReactNode }) {
  const [panel, setPanel] = useState<SystemPanel>("none")

  const openPanel = useCallback((p: Exclude<SystemPanel, "none">) => setPanel(p), [])
  const closePanel = useCallback(() => setPanel("none"), [])

  return (
    <SystemPanelContext.Provider value={{ panel, openPanel, closePanel }}>
      {children}
    </SystemPanelContext.Provider>
  )
}

export function useSystemPanel() {
  const ctx = useContext(SystemPanelContext)
  if (!ctx) throw new Error("useSystemPanel must be used within SystemPanelProvider")
  return ctx
}
