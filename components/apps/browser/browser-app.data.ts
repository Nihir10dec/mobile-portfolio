import { portfolioData } from "@/data/portfolio"

export interface Bookmark {
  label: string
  url: string
  color: string
  initial: string
}

const ensureHttps = (u: string) => (u.startsWith("http") ? u : `https://${u}`)

export const bookmarks: Bookmark[] = [
  {
    label: "GitHub",
    url: ensureHttps(portfolioData.social.github),
    color: "#24292e",
    initial: "GH",
  },
  {
    label: "LinkedIn",
    url: ensureHttps(portfolioData.social.linkedin),
    color: "#0077B5",
    initial: "in",
  },
  {
    label: "Instagram",
    url: "https://instagram.com/nihir_shah_",
    color: "#E1306C",
    initial: "Ig",
  },
  {
    label: "Email",
    url: `mailto:${portfolioData.personal.email}`,
    color: "#007AFF",
    initial: "@",
  },
  {
    label: "Resume",
    url: "/Nihir%20Shah%20Resume.pdf",
    color: "#34C759",
    initial: "CV",
  },
  {
    label: "Medium",
    url: "https://medium.com/@nihir_shah",
    color: "#000000",
    initial: "M",
  },
]
