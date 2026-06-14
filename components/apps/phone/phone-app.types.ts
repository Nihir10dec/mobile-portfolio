export type Contact = {
  id: string
  name: string
  initial: string
  gradient: string
  subtitle: string
  isMe?: boolean
  callLines: string[]
}

export type Recent = {
  contactId: string
  type: "missed" | "incoming" | "outgoing"
  time: string
  count?: number
}

export type DialPadKey = {
  num: string
  alpha: string
}
