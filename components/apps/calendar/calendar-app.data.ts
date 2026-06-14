import type { CalendarEvent, EventDots } from "./calendar-app.types"

export const today = new Date()
export const todayDate = today.getDate()
export const monthName = today.toLocaleString("en-US", { month: "long", year: "numeric" })
export const dayName = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
export const shortDay = today.toLocaleDateString("en-US", { weekday: "short" })

export const events: CalendarEvent[] = [
  { time: "09:00", title: "Daily Standup", location: "Zoom", duration: 30, color: "#007AFF" },
  { time: "11:30", title: "Product Review Sync", location: "Google Meet", duration: 60, color: "#BF5AF2" },
  { time: "14:00", title: "System Architecture Planning", location: "Whiteboard Room", duration: 90, color: "#32D74B" },
  { time: "16:45", title: "Interview passing notes", location: "Desk", duration: 30, color: "#FF9500" },
]

export const monthDays = Array.from({ length: 31 }, (_, i) => i + 1)

// dates that have events (relative to today)
export const eventDots: EventDots = {
  [todayDate]: ["#007AFF", "#BF5AF2", "#32D74B", "#FF9500"],
  [todayDate + 2]: ["#007AFF", "#32D74B"],
  [todayDate + 5]: ["#FF9500"],
  [todayDate - 3]: ["#BF5AF2"],
}
