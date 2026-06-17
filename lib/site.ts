import { portfolioData } from "@/data/portfolio"

/**
 * Canonical, absolute base URL of the deployed site.
 * Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. on Vercel/Netlify).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nihir-mobile-portfolio.vercel.app/"
).replace(/\/$/, "")

export const SITE_NAME = "Nihir Mobile Portfolio"

export const SITE_TITLE = `${SITE_NAME} — ${portfolioData.personal.name}`

export const SITE_DESCRIPTION =
  "A browser-based smartphone simulation portfolio by " +
  `${portfolioData.personal.name}. Every app is a window into professional identity.`

/** Absolute social profile URLs derived from the centralised portfolio data. */
export const SOCIAL_URLS = [
  `https://${portfolioData.social.github.replace(/^https?:\/\//, "")}`,
  `https://${portfolioData.social.linkedin.replace(/^https?:\/\//, "")}`,
  `https://instagram.com/${portfolioData.social.instagram.replace(/^@/, "")}`,
]
