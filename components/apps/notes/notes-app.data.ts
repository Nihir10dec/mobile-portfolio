import type { Note } from "./notes-app.types"

export const notes: Note[] = [
  {
    title: "About Me",
    preview: "I'm Nihir Shah — a software engineer who believes the best code is the code that feels invisible...",
    date: "Today",
    pinned: true,
  },
  {
    title: "Design Philosophy",
    preview: "Good design is invisible. It doesn't call attention to itself — it just works. The best interfaces...",
    date: "Yesterday",
    pinned: true,
  },
  {
    title: "What Drives Me",
    preview: "I'm driven by the intersection of technology and human experience. Building tools that...",
    date: "Mar 25",
    pinned: false,
  },
  {
    title: "Books I'm Reading",
    preview: "1. Designing Data-Intensive Applications\n2. The Pragmatic Programmer\n3. Clean Architecture...",
    date: "Mar 20",
    pinned: false,
  },
  {
    title: "Side Project Ideas",
    preview: "- AI-powered code reviewer\n- Real-time collaborative whiteboard\n- Music visualization engine...",
    date: "Mar 18",
    pinned: false,
  },
]
