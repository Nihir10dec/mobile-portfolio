export type Message = {
  text: string
  time: string
  isOut: boolean
}

export type Contact = {
  id: string
  name: string
  initial: string
  gradient: string
  lastTime: string
  unread?: number
  unreadFrom?: number
  previewIndex?: number
  messages: Message[]
}
