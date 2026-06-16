"use client"

import { useEffect, useState } from "react"
import { useAppNavigation } from "@/hooks/use-app-navigation"
import { useSystemPanel } from "@/hooks/use-system-panel"
import { notifications as seed, type AppNotification } from "@/data/notifications"
import { haptic } from "@/lib/haptics"

/**
 * iOS Notification Center — opened by swiping down from the top-left.
 * Shows a large clock + date and a stack of glass notification cards. Tapping a
 * card closes the panel and opens the related app.
 */
export default function IosNotificationCenter({ isDark }: { isDark: boolean }) {
  const { openApp } = useAppNavigation()
  const { closePanel } = useSystemPanel()
  const [items, setItems] = useState<AppNotification[]>(seed)
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const open = (n: AppNotification) => {
    haptic(10)
    closePanel()
    openApp(n.appId)
  }

  const dismiss = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    haptic(6)
    setItems((prev) => prev.filter((n) => n.id !== id))
  }

  const text = isDark ? "text-white" : "text-black"
  const sub = isDark ? "text-white/55" : "text-black/50"

  const hh = time ? time.getHours().toString().padStart(2, "0") : "--"
  const mm = time ? time.getMinutes().toString().padStart(2, "0") : "--"
  const dateStr = time
    ? time.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : ""

  return (
    <div className="flex h-full flex-col px-4 pt-14 pb-8">
      {/* Clock + date */}
      <div className={`mb-5 text-center ${text}`}>
        <div className="text-[15px] font-medium opacity-90">{dateStr}</div>
        <div className="text-[68px] font-semibold leading-none tracking-tight tabular-nums">
          {hh}:{mm}
        </div>
      </div>

      {/* Notification stack */}
      <div className="no-scrollbar flex-1 space-y-2.5 overflow-y-auto overscroll-contain">
        {items.length === 0 ? (
          <div className={`pt-10 text-center text-[13px] ${sub}`}>No Notifications</div>
        ) : (
          items.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => open(n)}
              className={`group flex w-full items-start gap-3 rounded-[20px] p-3 text-left ${isDark ? "glass" : "glass-light"
                }`}
              style={{
                boxShadow: isDark ? "0 6px 20px rgba(0,0,0,0.25)" : "0 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
                style={{ background: n.accent }}
              >
                {n.icon}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className={`truncate text-[13px] font-semibold ${text}`}>{n.title}</span>
                  <span className={`shrink-0 text-[11px] ${sub}`}>{n.time}</span>
                </span>
                <span className={`mt-0.5 line-clamp-2 block text-[12px] leading-snug ${sub}`}>
                  {n.message}
                </span>
              </span>
              <span
                role="button"
                tabIndex={-1}
                aria-label="Clear notification"
                onClick={(e) => dismiss(n.id, e)}
                className={`hidden h-5 w-5 shrink-0 items-center justify-center rounded-full text-[12px] group-hover:flex ${isDark ? "bg-white/15 text-white" : "bg-black/10 text-black"
                  }`}
              >
                ×
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
