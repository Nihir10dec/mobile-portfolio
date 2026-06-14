export interface CalendarEvent {
  time: string
  title: string
  location: string
  duration: number
  color: string
}

export type EventDots = Record<number, string[]>
