export const messagesIntro = [
  "👋 Hey! This is Nihir's inbox.",
  "Pick a starter below — I'll draft the message, you just fill in the blanks. ✍️",
]

export type FieldType = "text" | "email" | "tel"

export interface DraftField {
  key: string
  placeholder: string
  type: FieldType
}

/** A message segment is either fixed copy (string) or a fillable blank. */
export type Segment = string | { field: string }

export interface DraftTemplate {
  id: string
  chip: string
  /** Narrative blanks that appear inline in the drafted message. */
  fields: DraftField[]
  segments: Segment[]
}

export const draftTemplates: DraftTemplate[] = [
  {
    id: "hire",
    chip: "I'd like to hire you 👔",
    fields: [
      { key: "name", placeholder: "your name", type: "text" },
      { key: "company", placeholder: "company", type: "text" },
      { key: "about", placeholder: "what your team does", type: "text" },
      { key: "role", placeholder: "the role / opportunity", type: "text" },
    ],
    segments: [
      "Hi Nihir, I'm ",
      { field: "name" },
      " from ",
      { field: "company" },
      ". We work on ",
      { field: "about" },
      ". I came across your OS.portfolio and really liked it 👏 — I'd love to talk about a ",
      { field: "role" },
      " opportunity.",
    ],
  },
  {
    id: "collab",
    chip: "Let's collaborate 🤝",
    fields: [
      { key: "name", placeholder: "your name", type: "text" },
      { key: "project", placeholder: "what you're building", type: "text" },
      { key: "idea", placeholder: "how we could team up", type: "text" },
    ],
    segments: [
      "Hi Nihir, I'm ",
      { field: "name" },
      ". I'm building ",
      { field: "project" },
      " and I think we could team up on ",
      { field: "idea" },
      ". Your portfolio really caught my eye!",
    ],
  },
  {
    id: "hi",
    chip: "Just saying hi 👋",
    fields: [
      { key: "name", placeholder: "your name", type: "text" },
      { key: "liked", placeholder: "what you liked", type: "text" },
    ],
    segments: [
      "Hi Nihir, I'm ",
      { field: "name" },
      ". Just wanted to say I loved your OS.portfolio — especially ",
      { field: "liked" },
      ".",
    ],
  },
  {
    id: "custom",
    chip: "Write my own ✏️",
    fields: [
      { key: "name", placeholder: "your name", type: "text" },
      { key: "message", placeholder: "your message", type: "text" },
    ],
    segments: [
      "Hi Nihir, I'm ",
      { field: "name" },
      ". ",
      { field: "message" },
      ".",
    ],
  },
]
