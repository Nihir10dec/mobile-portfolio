# 📱 Mobile Portfolio

> **What if your portfolio wasn't a website — it was a device?**

Mobile Portfolio is a personal developer portfolio disguised as a fully interactive **smartphone simulation** running in the browser. Instead of a conventional scroll-through site, visitors land on a realistic phone lock screen, swipe to unlock, and explore a developer's identity through familiar app interfaces — Netflix for projects, Instagram for visual storytelling, LinkedIn for experience, GitHub for code, and more.

Built by **[Nihir Shah](https://github.com/nihir10dec)**.

🔗 **Live demo:** [nihir-mobile-portfolio.vercel.app](https://nihir-mobile-portfolio.vercel.app/)

---

## ✨ Features

- 🔒 **Lock screen** with swipe-to-unlock and a live clock
- 📲 **iPhone & Android frames** — toggle between hardware styles (Dynamic Island, status bars, nav bar)
- 🌗 **Dark / light themes** with preferences persisted in `localStorage`
- 🌦️ **Weather-aware ambient background** rendered on `<canvas>`
- 🧩 **16 interactive apps**, each reframing portfolio content through a familiar UI:

| App | What it shows |
|---|---|
| 🎬 **Netflix** | Projects as streaming "shows" |
| 📸 **Instagram** | Visual portfolio, experience & education feed |
| 💼 **LinkedIn** | Professional history |
| 🐙 **GitHub** | Repos, contributions & pinned projects |
| 📝 **Notes** | Personal philosophy / about me |
| 💬 **WhatsApp** | Interactive chat simulation |
| 💌 **Messages** | Guided "reach out" message drafts |
| 📧 **Mail** | Contact form as an email compose screen |
| 📅 **Calendar** | Booking interface |
| 🎵 **Spotify** | Personality & taste showcase |
| ✍️ **Medium** | Published articles |
| 🗺️ **Maps** | Location (Mumbai) |
| 📞 **Phone** | Dialer / contacts |
| 🌐 **Browser** | Quick links & resume |
| 🤖 **ChatGPT** | AI assistant that answers questions about me |
| ⚙️ **Settings** | Device & profile info |

- 🎯 **Single source of truth** — all personal content lives in [`data/portfolio.ts`](data/portfolio.ts)
- ⚡ **Zero animation libraries** — pure CSS `@keyframes` + `requestAnimationFrame`
- 🎨 **Hand-coded inline SVG icons** — no icon font dependency

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) (strict) |
| UI | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) + custom design tokens |
| Primitives | [Radix UI](https://www.radix-ui.com/) |
| Forms | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) |
| Package manager | [pnpm](https://pnpm.io/) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
# Clone the repo
git clone https://github.com/nihir10dec/mobile-portfolio.git
cd mobile-portfolio

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

### Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Run the production build |
| `pnpm lint` | Run the linter |

---

## 🔧 Configuration

Create a `.env.local` file in the project root to enable optional integrations. All variables are optional — the site runs fine without them.

```bash
# Canonical site URL (used for SEO metadata & sitemap)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Contact form (Mail & Messages apps) — https://web3forms.com
NEXT_PUBLIC_WEB3FORMS_KEY=your-web3forms-access-key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_CLARITY_ID=your-microsoft-clarity-id
```

---

## 🎨 Make It Yours

Most of your content lives in one place:

1. **`data/portfolio.ts`** — edit your name, title, skills, experience, education, projects, and articles.
2. **`public/images/`** — replace the avatar and project images.
3. **`public/`** — drop in your own resume PDF and update the link in [`components/apps/browser/browser-app.data.ts`](components/apps/browser/browser-app.data.ts).
4. **Each app's `*.data.ts`** — tweak app-specific flavor content (chats, playlists, calendar events, etc.).

---

## 📄 License & Credit

This project is licensed under the **[MIT License](LICENSE)** — you are free to use, copy, modify, and replicate it for **personal use**.

> ⭐ **One ask:** if you use this project or build on top of it, please **give credit to Nihir Shah** somewhere visible (e.g. a footer note, an "About" page, or a link back to this repository). It's not legally required beyond the MIT notice, but it's the kind thing to do and genuinely appreciated. 🙏

---

## 🙌 Acknowledgements

Designed and built with care by **[Nihir Shah](https://github.com/nihir10dec)**.

If this inspired you, a ⭐ on the repo goes a long way!
