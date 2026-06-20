import { portfolioData } from "@/data/portfolio"
import type { CardItem, Profile, ProfileKey, Row } from "./netflix-app.types"
import {
  PuzzleIcon, EarthIcon, BotIcon, LandmarkIcon, Bitcoin, BookOpenIcon,
  TrendingUpIcon, RocketIcon, Building2Icon,
  CloudIcon, LockIcon, ShieldIcon, EyeIcon,
} from "lucide-react"

const PROJECT_LOGO_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  "custom-wordle": PuzzleIcon,
  "old-portfolio": EarthIcon,
  "azure-telegram-bot": BotIcon,
  "loksabha-analysis": LandmarkIcon,
  "top-crypto": Bitcoin,
  "time-for-quiz": BookOpenIcon,
}

const ARTICLE_LOGOS: React.ComponentType<{ size?: number }>[] = [
  CloudIcon, LockIcon, ShieldIcon, EyeIcon, LandmarkIcon, BotIcon,
]

// ─── Profile Config ────────────────────────────────────────────────────────────

export const PROFILES: Profile[] = [
  { key: "recruiter", label: "Recruiter", primary: "#3B82F6", tagline: "Open to work · Mumbai, India" },
  { key: "developer", label: "Developer", primary: "#9CA3AF", tagline: "4+ years shipping at scale" },
  { key: "collaborator", label: "Collaborator", primary: "#EF4444", tagline: "Building the future together" },
  { key: "explorer", label: "Explorer", primary: "#F59E0B", tagline: "A developer, a creator, a human" },
]

// ─── Content Data ──────────────────────────────────────────────────────────────

const PROJECT_GRADIENTS = [
  "linear-gradient(135deg, #064E3B 0%, #10B981 100%)",
  "linear-gradient(135deg, #434343 0%, #000000 100%)",
  "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #78350F 0%, #D97706 100%)",
  "linear-gradient(135deg, #7F1D1D 0%, #E50914 100%)",
  "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
]

const PROJECT_PROGRESS = [85, 60, 72, 90, 55, 78]

export const PROJECTS: CardItem[] = portfolioData.projects.map((p, i) => ({
  id: p.id,
  title: p.title,
  subtitle: `${p.category} · ${p.tags[0]}`,
  body: p.description,
  tags: p.tags,
  progress: PROJECT_PROGRESS[i] ?? 60,
  gradient: PROJECT_GRADIENTS[i % PROJECT_GRADIENTS.length],
  ctaLabel: "View Project",
  ctaUrl: p.url,
  logo: PROJECT_LOGO_MAP[p.id],
}))

export const EXPERIENCE: CardItem[] = [
  {
    id: "kotak",
    title: "Kotak Securities",
    subtitle: "Senior Software Engineer · October 2024 - Present",
    body: portfolioData.experience[0].description,
    gradient: "linear-gradient(135deg, #A20A22 0%, #E31837 100%)",
    ctaLabel: "View on LinkedIn",
    ctaUrl: `https://${portfolioData.social.linkedin}`,
    logo: TrendingUpIcon,
  },
  {
    id: "startup",
    title: "DemandHelm",
    subtitle: "Full Stack Developer · March 2021 - September 2024",
    body: portfolioData.experience[1].description,
    gradient: "linear-gradient(135deg, #1f4037 0%, #2d6a4f 100%)",
    ctaLabel: "View on LinkedIn",
    ctaUrl: `https://${portfolioData.social.linkedin}`,
    logo: RocketIcon,
  },
  {
    id: "infy",
    title: "Infosys",
    subtitle: "Systems Engineer · June 2018 - February 2020",
    body: portfolioData.experience[2].description,
    gradient: "linear-gradient(135deg, #0078D4 0%, #005a9e 100%)",
    ctaLabel: "View on LinkedIn",
    ctaUrl: `https://${portfolioData.social.linkedin}`,
    logo: Building2Icon,
  },
]

export const SKILLS: CardItem[] = [
  {
    id: "frontend",
    title: "Frontend",
    subtitle: "React · Next.js · TypeScript",
    body: "Pixel-perfect UIs with React, Next.js, and Tailwind. From component libraries to animated experiences.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    gradient: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
  },
  {
    id: "backend",
    title: "Backend",
    subtitle: "Node.js · Go · Python",
    body: "Scalable APIs and microservices. Node.js for JS ecosystems, Go for performance, Python for data pipelines.",
    tags: ["Node.js", "Go", "Python", "REST"],
    gradient: "linear-gradient(135deg, #064E3B 0%, #059669 100%)",
  },
  {
    id: "tool",
    title: "Tools & Devops",
    subtitle: "Git · Redis · AWS  · CI/CD",
    body: "From relational schemas to vector embeddings. Built ML pipelines processing millions of events daily.",
    tags: ["Git", "AWS", "Vercel", "Figma", "VS Code", "CI/CD"],
    gradient: "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
  },
]

const ARTICLE_GRADIENTS = [
  "linear-gradient(135deg, #FF9900 0%, #232F3E 100%)",
  "linear-gradient(135deg, #1E3A8A 0%, #7C3AED 100%)",
  "linear-gradient(135deg, #7F1D1D 0%, #B91C1C 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #FF9933 0%, #138808 100%)",
  "linear-gradient(135deg, #0078D4 0%, #005a9e 100%)",
]

export const ARTICLES: CardItem[] = portfolioData.articles.map((a, i) => ({
  id: `article-${i}`,
  title: a.title,
  subtitle: `${a.readTime} · ${a.date}`,
  body: `Published in ${a.in}`,
  tags: a.tags,
  gradient: ARTICLE_GRADIENTS[i % ARTICLE_GRADIENTS.length],
  ctaLabel: "Read Article",
  ctaUrl: a.url,
  logo: ARTICLE_LOGOS[i],
}))

export const ABOUT_CARD: CardItem = {
  id: "about",
  title: "About Nihir",
  subtitle: "Mumbai, India · Available",
  body: portfolioData.personal.about,
  gradient: "linear-gradient(135deg, #1E1B4B 0%, #4338CA 100%)",
  ctaLabel: "Get in Touch",
  ctaUrl: `mailto:${portfolioData.personal.email}`,
}

export const CONTACT_CARD: CardItem = {
  id: "contact",
  title: "Hire Nihir",
  subtitle: portfolioData.personal.email,
  body: "Available for full-time roles and high-impact contracts. Building scalable systems at speed is what I do best.",
  gradient: "linear-gradient(135deg, #E50914 0%, #7F1D1D 100%)",
  ctaLabel: "Send Email",
  ctaUrl: `mailto:${portfolioData.personal.email}`,
}

// ─── Rows per Profile ──────────────────────────────────────────────────────────

export function getRows(profile: ProfileKey): Row[] {
  const label = profile.charAt(0).toUpperCase() + profile.slice(1)
  switch (profile) {
    case "recruiter":
      return [
        { id: "cw", label: `Featured Projects`, items: PROJECTS, variant: "continue" },
        { id: "why", label: "Why Hire Nihir", items: [ABOUT_CARD, CONTACT_CARD, ...EXPERIENCE], variant: "wide" },
        { id: "exp", label: "Work Experience", items: EXPERIENCE, variant: "wide" },
        { id: "skills", label: "Technical Skills", items: SKILLS, variant: "tall" },
        { id: "writing", label: "Engineering Articles", items: ARTICLES, variant: "wide" },
      ]
    case "developer":
      return [
        { id: "stack", label: "The Tech Stack", items: SKILLS, variant: "tall" },
        { id: "projects", label: "Projects Shipped", items: PROJECTS, variant: "continue" },
        { id: "writing", label: "Engineering Deep Dives", items: ARTICLES, variant: "wide" },
        { id: "exp", label: "Where I've Shipped", items: EXPERIENCE, variant: "wide" },
      ]
    case "collaborator":
      return [
        { id: "cw", label: "Let's Build Together", items: PROJECTS, variant: "continue" },
        { id: "about", label: "Who Is Nihir?", items: [ABOUT_CARD, ...EXPERIENCE], variant: "wide" },
        { id: "writing", label: "Latest Thoughts", items: ARTICLES, variant: "wide" },
        { id: "contact", label: "Get in Touch", items: [CONTACT_CARD], variant: "wide" },
      ]
    default: // explorer
      return [
        { id: "cw", label: `Continue Watching for ${label}`, items: PROJECTS, variant: "continue" },
        { id: "feat", label: "About & Experience", items: [ABOUT_CARD, ...EXPERIENCE], variant: "wide" },
        { id: "skills", label: "Skills & Technologies", items: SKILLS, variant: "tall" },
        { id: "writing", label: "Articles & Writing", items: ARTICLES, variant: "wide" },
        { id: "contact", label: "Say Hello", items: [CONTACT_CARD], variant: "wide" },
      ]
  }
}

// ─── Hero Taglines ─────────────────────────────────────────────────────────────

export const HERO_TAGLINES: Record<ProfileKey, string> = {
  recruiter: "Open to work · Available immediately",
  developer: "4+ years shipping products at scale",
  collaborator: "Building the future, one PR at a time",
  explorer: "A developer, a creator, a human",
}
