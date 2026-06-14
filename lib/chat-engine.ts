import { portfolioData } from "@/data/portfolio"

/**
 * A tiny, dependency-free "assistant" that answers questions about the
 * portfolio. It does NOT call an external LLM. Instead it:
 *   1. Classifies the user's message into an intent (keyword scoring).
 *   2. Builds an answer from real portfolio data.
 *   3. Runs the answer through a variation engine (synonym pools, randomized
 *      templates, active/passive voice) so repeated questions feel dynamic.
 *
 * This is intentionally a showcase of backend logic that can run on the
 * server (Node runtime) rather than a wrapper around a third-party API.
 */

const { personal, social, skills, experience, projects, articles } = portfolioData

/* ------------------------------------------------------------------ */
/* Variation helpers                                                   */
/* ------------------------------------------------------------------ */

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)]
}

/** Small seeded PRNG (mulberry32) so a given seed is reproducible. */
function makeRng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(str: string): number {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function list(items: string[]): string {
  if (items.length === 0) return ""
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`
}

/* ------------------------------------------------------------------ */
/* Intent classification                                               */
/* ------------------------------------------------------------------ */

type Intent =
  | "greeting"
  | "identity"
  | "skills"
  | "experience"
  | "projects"
  | "articles"
  | "contact"
  | "location"
  | "hire"
  | "thanks"
  | "fallback"

const INTENT_KEYWORDS: Record<Exclude<Intent, "fallback">, string[]> = {
  greeting: ["hi", "hello", "hey", "yo", "sup", "greetings", "howdy"],
  identity: ["who", "about", "yourself", "bio", "intro", "tell me about", "what do you do"],
  skills: ["skill", "stack", "tech", "technology", "language", "tools", "framework", "know", "expert"],
  experience: ["experience", "work", "job", "career", "company", "companies", "role", "employer", "background"],
  projects: ["project", "build", "built", "portfolio", "app", "product", "made", "ship", "shipped"],
  articles: ["article", "blog", "write", "writing", "post", "medium", "read"],
  contact: ["contact", "email", "reach", "connect", "linkedin", "github", "social", "message", "dm"],
  location: ["where", "location", "based", "live", "city", "country", "remote"],
  hire: ["hire", "available", "availability", "open to", "freelance", "opportunity", "recruit", "join"],
  thanks: ["thanks", "thank you", "thx", "appreciate", "cheers"],
}

function classify(message: string): Intent {
  const text = message.toLowerCase()
  let best: Intent = "fallback"
  let bestScore = 0
  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS) as [
    Exclude<Intent, "fallback">,
    string[],
  ][]) {
    let score = 0
    for (const kw of keywords) {
      if (text.includes(kw)) score += kw.includes(" ") ? 2 : 1
    }
    if (score > bestScore) {
      bestScore = score
      best = intent
    }
  }
  return best
}

/* ------------------------------------------------------------------ */
/* Response builders (each returns several phrasings; one is picked)   */
/* ------------------------------------------------------------------ */

function buildResponse(intent: Intent, rng: () => number): string {
  const name = personal.firstName
  const skillList = list(skills)
  const topSkills = list(skills.slice(0, 4))

  switch (intent) {
    case "greeting":
      return pick(
        [
          `Hey! I'm ${name}'s assistant. Ask me about ${name}'s skills, projects, experience, or how to get in touch.`,
          `Hi there 👋 Want to know about ${name}'s work, tech stack, or background? Just ask.`,
          `Hello! Curious about ${name}? I can talk through projects, experience, and skills.`,
        ],
        rng,
      )

    case "identity":
      return pick(
        [
          `${personal.name} is a ${personal.title} based in ${personal.location}. ${personal.about}`,
          `${name} works as a ${personal.title} out of ${personal.location}. In his words: "${personal.about}"`,
          `You're asking about ${personal.name} — a ${personal.title} from ${personal.location}. ${personal.about}`,
        ],
        rng,
      )

    case "skills": {
      const active = `${name} works across the stack with ${skillList}.`
      const passive = `A broad stack is used by ${name}, including ${skillList}.`
      const focused = `Day to day, ${name} leans on ${topSkills} — with ${skills.length} technologies in the toolkit overall.`
      return pick([active, passive, focused], rng)
    }

    case "experience": {
      const cur = experience[0]
      const lines = experience
        .map((e) => `• ${e.role} at ${e.company} (${e.duration}) — ${e.description}`)
        .join("\n")
      return pick(
        [
          `Currently, ${name} is a ${cur.role} at ${cur.company}. Full history:\n${lines}`,
          `Here's the track record:\n${lines}`,
          `${name}'s experience spans ${experience.length} roles. Most recently a ${cur.role} at ${cur.company}:\n${lines}`,
        ],
        rng,
      )
    }

    case "projects": {
      const lines = projects
        .map((p) => `• ${p.title} (${p.category}) — ${p.description}`)
        .join("\n")
      return pick(
        [
          `A few things ${name} has built:\n${lines}`,
          `These projects were shipped by ${name}:\n${lines}`,
          `${name} has ${projects.length} highlighted projects:\n${lines}`,
        ],
        rng,
      )
    }

    case "articles": {
      const lines = articles.map((a) => `• "${a.title}" in ${a.in} (${a.readTime})`).join("\n")
      return pick(
        [
          `${name} writes too. Recent pieces:\n${lines}`,
          `Some writing by ${name}:\n${lines}`,
          `You can read articles ${name} published:\n${lines}`,
        ],
        rng,
      )
    }

    case "contact":
      return pick(
        [
          `You can email ${name} at ${personal.email}, or find him on ${social.linkedin} and ${social.github}.`,
          `Reach out via ${personal.email}. He's also on LinkedIn (${social.linkedin}) and GitHub (${social.github}).`,
          `The fastest way is email: ${personal.email}. Socials: ${social.linkedin}, ${social.github}.`,
        ],
        rng,
      )

    case "location":
      return pick(
        [
          `${name} is based in ${personal.location}.`,
          `Home base is ${personal.location} for ${name}.`,
          `${name} works out of ${personal.location}.`,
        ],
        rng,
      )

    case "hire":
      return pick(
        [
          `${name} is always open to interesting opportunities. Drop a note at ${personal.email}.`,
          `Want to work with ${name}? The best move is to email ${personal.email} — he reads every message.`,
          `For roles or collaborations, reach ${name} at ${personal.email}.`,
        ],
        rng,
      )

    case "thanks":
      return pick(
        [`Anytime! 🙌`, `Happy to help — ask away if you have more questions.`, `You're welcome!`],
        rng,
      )

    case "fallback":
    default:
      return pick(
        [
          `I'm tuned to talk about ${name} specifically. Try asking about skills, projects, experience, writing, or contact info.`,
          `Not sure about that one — but I can tell you about ${name}'s ${topSkills} work, projects, or how to get in touch.`,
          `Hmm, let's keep it about ${name}. Ask me about his experience, projects, or stack.`,
        ],
        rng,
      )
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface ChatReply {
  intent: Intent
  reply: string
}

export function generateReply(message: string, seed?: number): ChatReply {
  const intent = classify(message ?? "")
  // Seed from the message + a time bucket so the same question varies over time
  // but stays stable within a short window (nice for demos).
  const s = seed ?? hashString(message) ^ Math.floor(Date.now() / 1000)
  const rng = makeRng(s)
  return { intent, reply: buildResponse(intent, rng) }
}
