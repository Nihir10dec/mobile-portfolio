import type { Contact, DialPadKey, Recent } from "./phone-app.types"
import { portfolioData } from "@/data/portfolio"

export const contacts: Contact[] = [
  {
    id: "me",
    name: portfolioData.personal.name,
    initial: portfolioData.personal.initial,
    gradient: "linear-gradient(135deg, #007AFF 0%, #5856D6 100%)",
    subtitle: `${portfolioData.personal.location} · Tap to email me`,
    isMe: true,
    callLines: [],
  },
  {
    id: "mom",
    name: "Mom ❤️",
    initial: "M",
    gradient: "linear-gradient(135deg, #f953c6 0%, #b91d73 100%)",
    subtitle: "Favorites",
    callLines: [
      "Beta, have you eaten anything today?",
      "When are you coming home?",
      "Did you drink enough water?",
      "Why is your phone always busy?",
    ],
  },
  {
    id: "production",
    name: "Production 🚨",
    initial: "P",
    gradient: "linear-gradient(135deg, #E31837 0%, #A20A22 100%)",
    subtitle: "Do not answer after midnight",
    callLines: [
      "The server is on fire. Again.",
      "Who pushed to main on a Friday?",
      "It works on my machine, I promise.",
      "Rolling back... rolling back...",
    ],
  },
  {
    id: "imposter",
    name: "Imposter Syndrome",
    initial: "I",
    gradient: "linear-gradient(135deg, #434343 0%, #000000 100%)",
    subtitle: "Calls every night around 3 AM",
    callLines: [
      "Are you even a real engineer?",
      "They'll figure you out eventually...",
      "Everyone codes better than you.",
      "You just got lucky on that one.",
    ],
  },
  {
    id: "recruiter",
    name: "Recruiter (call back!!)",
    initial: "R",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    subtitle: "Missed · 4 times",
    callLines: [
      "We absolutely loved your portfolio!",
      "Are you open to new opportunities?",
      "Quick 15 minute chat this week?",
      "The salary is... competitive 😉",
    ],
  },
  {
    id: "support",
    name: "Tech Support",
    initial: "T",
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    subtitle: "Also known as Google",
    callLines: [
      "Have you tried turning it off and on?",
      "Did you check Stack Overflow first?",
      "Clear your cache and try again.",
      "It's a DNS issue. It's always DNS.",
    ],
  },
  {
    id: "future",
    name: "Future Me",
    initial: "F",
    gradient: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
    subtitle: "Number not yet assigned",
    callLines: [
      "I'd tell you the stack but... spoilers.",
      "Buy Bitcoin in—nevermind, can't say.",
      "You ship it eventually. Relax.",
      "Stop debugging at 4 AM. Trust me.",
    ],
  },
  {
    id: "coffee",
    name: "Coffee Machine ☕",
    initial: "C",
    gradient: "linear-gradient(135deg, #6f4e37 0%, #2c1608 100%)",
    subtitle: "Office · Floor 3",
    callLines: [
      "Out of beans. No deploys today.",
      "I am the real backend here.",
      "Refill me or face the consequences.",
      "Brewing... please hold for genius.",
    ],
  },
  {
    id: "spam",
    name: "Unknown",
    initial: "?",
    gradient: "linear-gradient(135deg, #8e9eab 0%, #4b5563 100%)",
    subtitle: "Likely Spam",
    callLines: [
      "Hello, this is about your car's warranty.",
      "Congratulations! You've won a free cruise.",
      "I'm calling regarding your student loan.",
      "Press 1 to speak with a representative.",
    ],
  },
]

export const recents: Recent[] = [
  { contactId: "production", type: "missed", time: "3:04 AM", count: 3 },
  { contactId: "recruiter", type: "incoming", time: "9:41 AM" },
  { contactId: "imposter", type: "missed", time: "3:00 AM" },
  { contactId: "spam", type: "missed", time: "11:32 AM", count: 2 },
  { contactId: "mom", type: "outgoing", time: "Yesterday" },
  { contactId: "coffee", type: "outgoing", time: "Yesterday" },
  { contactId: "me", type: "outgoing", time: "Mon" },
]

export const dialPad: DialPadKey[] = [
  { num: "1", alpha: "" },
  { num: "2", alpha: "A B C" },
  { num: "3", alpha: "D E F" },
  { num: "4", alpha: "G H I" },
  { num: "5", alpha: "J K L" },
  { num: "6", alpha: "M N O" },
  { num: "7", alpha: "P Q R S" },
  { num: "8", alpha: "T U V" },
  { num: "9", alpha: "W X Y Z" },
  { num: "*", alpha: "" },
  { num: "0", alpha: "+" },
  { num: "#", alpha: "" },
]
