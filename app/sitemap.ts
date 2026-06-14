import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

// Apps that are reachable via shareable `?app=<id>` deep links.
const DEEP_LINK_APPS = [
  "netflix", "instagram", "linkedin", "github", "notes", "whatsapp",
  "maps", "mail", "calendar", "spotify", "phone", "medium", "settings",
  "messages", "browser", "chatgpt",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...DEEP_LINK_APPS.map((app) => ({
      url: `${SITE_URL}/?app=${app}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
