import type { Metadata, Viewport } from "next"
import "./globals.css"
import { DeviceProvider } from "@/hooks/use-device"
import { Inter } from "next/font/google"
import { AppNavigationProvider } from "@/hooks/use-app-navigation"
import { NowPlayingProvider } from "@/hooks/use-now-playing"
import { BatteryProvider } from "@/hooks/use-battery"
import { Toaster } from "@/components/ui/sonner"
import { portfolioData } from "@/data/portfolio"
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SOCIAL_URLS } from "@/lib/site"
import Analytics from "@/components/analytics"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  authors: [{ name: portfolioData.personal.name, url: SITE_URL }],
  keywords: [
    "Nihir Shah",
    "Portfolio",
    "Senior Software Engineer",
    "Senior Frontend Developer",
    "Full Stack Developer",
    "React.js",
    "Next.js",
    "Node.js",
    "JavaScript",
    "TypeScript",
    "Mobile Portfolio",
  ],
  creator: portfolioData.personal.name,
  publisher: portfolioData.personal.name,
  openGraph: {
    title: SITE_TITLE,
    description: "What if your portfolio wasn't a website — it was a device?",
    url: SITE_URL,
    siteName: "Nihir Mobile Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "What if your portfolio wasn't a website — it was a device?",
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
}

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolioData.personal.name,
  jobTitle: portfolioData.personal.title,
  url: SITE_URL,
  email: `mailto:${portfolioData.personal.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: portfolioData.personal.location,
  },
  knowsAbout: portfolioData.skills,
  sameAs: SOCIAL_URLS,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <DeviceProvider>
          <AppNavigationProvider>
            <NowPlayingProvider>
              <BatteryProvider>
                <main>{children}</main>
              </BatteryProvider>
            </NowPlayingProvider>
          </AppNavigationProvider>
        </DeviceProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
