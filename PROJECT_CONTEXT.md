# OS.portfolio — Project Context Document

> **Last updated:** 2026-06-03
> **Author:** Nihir Shah
> **Purpose:** Complete context for any LLM agent or developer resuming work on this project.

---

## 1. What Is This Project?

**OS.portfolio** is a personal developer portfolio disguised as a fully interactive smartphone simulation running in the browser. Instead of a conventional portfolio website with sections and scroll, the visitor lands on a realistic phone lock screen, swipes to unlock, and explores the developer's identity through familiar app interfaces — Netflix for projects, Instagram for visual storytelling, LinkedIn for professional history, GitHub for code, and so on.

The core concept: **"What if your portfolio wasn't a website — it was a device?"**

### Motivation

- Stand out in a saturated market of template portfolios
- Demonstrate advanced frontend engineering through the portfolio itself (the medium is the message)
- Give recruiters and collaborators an experience that is memorable, interactive, and immediately communicates technical depth
- Show mastery of React, state management, animation, and pixel-perfect UI work in one cohesive artifact

### Target Audience

Recruiters, hiring managers, and fellow engineers visiting Nihir Shah's portfolio link.

---

## 2. Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| **Framework** | Next.js 15.2.4 (App Router) | Single-page client-side rendering; no SSR needed |
| **Language** | TypeScript 5 | Strict mode |
| **React** | React 19 | Latest stable |
| **Styling** | Tailwind CSS 3.4 | Custom design token layer in `globals.css` |
| **Typography** | Inter (Google Fonts via `next/font`) | Weights 100–900 loaded |
| **State Management** | React Context API | Two providers: `DeviceProvider` + `AppNavigationProvider` |
| **Persistence** | `localStorage` | Device type (iPhone/Android) and theme (dark/light) persist across sessions |
| **Package Manager** | pnpm | `pnpm-lock.yaml` present |
| **Component Library** | Radix UI primitives | Installed but largely unused; most UI is custom |
| **Icons** | Inline SVG only | No icon library; every icon is hand-coded SVG |
| **Images** | AI-generated PNGs in `public/images/` | Profile avatar, project visualisations, workspace photo |
| **Animations** | CSS `@keyframes` + `<canvas>` `requestAnimationFrame` | Zero external animation libraries |
| **Favicon** | Dynamic runtime-generated (`app/icon.tsx`) | Renders a smartphone vector on-the-fly |

### Key Dependencies (non-obvious)

- `tailwindcss-animate` — animation utilities
- `lucide-react` — installed but not used (can be removed)
- `date-fns`, `react-day-picker` — available for Calendar app
- `recharts` — available for data visualisation (unused currently)

---

## 3. Architecture Overview

```
app/
├── layout.tsx          ← Root layout: Inter font, DeviceProvider, AppNavigationProvider
├── page.tsx            ← Main orchestrator: renders AmbientBackground + DeviceFrame + app routing
├── globals.css         ← Full "Digital Obsidian" design system (dark + light tokens)
├── icon.tsx            ← Dynamic favicon generator
└── (unused routes)     ← about/, browser/, chatgpt/, instagram/, netflix/ — legacy, not active

components/
├── ambient-background.tsx  ← Weather-aware animated sky behind the phone
├── device-frame.tsx        ← iPhone/Android hardware frame (Dynamic Island, buttons, nav bar)
├── device-controls.tsx     ← Side panel: Android/iPhone toggle, theme toggle, edition badge
├── home-screen.tsx         ← App icon grid + dock + Android clock widget
├── lock-screen.tsx         ← Swipe-to-unlock with live clock
├── status-bar.tsx          ← iOS/Android status bars (time, signal, wifi, battery)
├── app-icon.tsx            ← Reusable icon button with press animation
├── apps/
│   ├── netflix-app.tsx     ← Projects as Netflix shows (hero banner, horizontal scrolls)
│   ├── instagram-app.tsx   ← Visual portfolio as Instagram feed
│   ├── linkedin-app.tsx    ← Professional profile in LinkedIn style
│   ├── github-app.tsx      ← Repos, contributions, pinned projects
│   ├── notes-app.tsx       ← Personal philosophy / about me
│   ├── whatsapp-app.tsx    ← Interactive chat simulation with auto-replies
│   ├── maps-app.tsx        ← Mumbai location with CSS map
│   ├── mail-app.tsx        ← Contact form as email compose
│   ├── calendar-app.tsx    ← Calendar booking interface
│   ├── spotify-app.tsx     ← Music/personality showcase
│   ├── medium-app.tsx      ← Article listing
│   └── phone-app.tsx       ← Dialer / contact

hooks/
├── use-device.tsx          ← Device type + theme state (Context + localStorage)
├── use-app-navigation.tsx  ← App stack, transitions, lock/unlock state
├── use-mobile.tsx          ← Viewport width detection
└── use-toast.ts            ← Toast notification hook (unused)

data/
└── portfolio.ts            ← Centralised content: personal info, skills, experience, projects, articles

public/images/
├── profile_avatar.png      ← AI-generated developer avatar
├── project_fintech.png     ← Trading dashboard project image
├── project_ml_search.png   ← ML search engine project image
├── project_os_portfolio.png ← This project's own preview image
└── workspace_setup.png     ← Developer workspace atmosphere image
```

### Data Flow

```
User lands → LockScreen (z-40, swipe-to-unlock)
                ↓ unlockPhone()
           HomeScreen (app grid)
                ↓ openApp(id)
           App Component (z-30, slide-up transition)
                ↓ closeApp() / goHome()
           HomeScreen (fade back in)
```

All navigation is **client-side state** via `useAppNavigation()`. No URL routing for apps — everything lives on a single Next.js page (`app/page.tsx`). This mimics real phone behaviour where the URL never changes.

### State Architecture

**`DeviceProvider` (use-device.tsx)**
- `device: "iphone" | "android"` — controls frame shape, status bar, navigation style
- `theme: "dark" | "light"` — controls colour palette across every component
- Both persist to `localStorage`

**`AppNavigationProvider` (use-app-navigation.tsx)**
- `currentApp: AppId | null` — which app is showing
- `previousApp: AppId | null` — for back navigation
- `isTransitioning: boolean` — blocks rapid taps during animation
- `isLocked: boolean` — starts `true`, set `false` on swipe unlock

---

## 4. Design System: "Digital Obsidian"

### Philosophy

Dark-first, premium, glass-like. Inspired by obsidian stone — deep blacks with subtle coloured refractions.

### Core Tokens (defined in `globals.css`)

- **Surface hierarchy:** `#000000` → `#0e0e0e` → `#131313` → `#1a1919` → `#201f1f` → `#262626` → `#2c2c2c`
- **Primary:** `#007AFF` (iOS system blue)
- **Tertiary:** `#32D74B` (green accent)
- **On-surface:** `#ffffff` (dark mode), `#1a1a1a` (light mode)
- **Outline:** `#777575` / `#494847`
- **App brand colours:** Each app has its own brand token (Netflix red, Instagram gradient, etc.)

### Light Mode

Full light mode palette exists. `html.light` class toggles all tokens. Background becomes `#f5f5f5`, text becomes dark, glass effects become translucent white.

### Typography

Inter at all weights. Hierarchy:
- Lock screen clock: 96px bold (iPhone) / 96px thin (Android)
- App headers: 20–24px bold
- Body: 13–14px regular
- Labels: 11px medium

---

## 5. Ambient Background System

A calm, time-of-day animated sky rendered **behind** the phone frame at `z-index: 0` and `opacity: 0.6`.

### How It Works

- **Time-of-day:** Derived from `new Date().getHours()`, polled once a minute
- **Scene derivation:** Four phases by hour — `dawn` (5–6), `day` (7–15), `golden` (16–18), `night` (19–4)
- **Crossfade:** When the phase changes, the previous scene fades out over 900ms
- **Independence:** Sky scene is driven by the clock, NOT by the dark/light mode toggle

### Supported Scenes

`dawn`, `day`, `golden`, `night`

### Rendering

- A full-screen gradient `<div>` per phase, with a single soft sun/moon radial glow
- One slow CSS "breathing" glow animation (no canvas, no `requestAnimationFrame` loop)
- All animations respect `prefers-reduced-motion`

---

## 6. Completion Status

### ✅ COMPLETED

| Item | Status | Notes |
|---|---|---|
| **Design system (globals.css)** | ✅ Done | Full dark + light token set, glassmorphism utilities, animation keyframes |
| **Tailwind config** | ✅ Done | Custom palette, fonts, animations |
| **Root layout** | ✅ Done | Inter font, providers, SEO metadata |
| **Device frame** | ✅ Done | iPhone (Dynamic Island, side buttons, home indicator) + Android (punch-hole, nav bar) |
| **Device controls** | ✅ Done | Android/iPhone toggle, theme toggle, edition badge |
| **Status bar** | ✅ Done | iOS + Android variants with live clock, signal, wifi, battery icons |
| **Home screen** | ✅ Done | 4-column grid, dock, Android clock widget, 12 app icons |
| **Lock screen** | ✅ Done | Swipe-to-unlock gesture, live clock, parallax background, quick action buttons |
| **App icon component** | ✅ Done | Press animation, badge support, brand colours |
| **Ambient background** | ✅ Done | Weather-driven, 12 scene variants, canvas particles, crossfade transitions |
| **App navigation system** | ✅ Done | Context-based, lock/unlock, transition guards |
| **Device state management** | ✅ Done | iPhone/Android + dark/light with localStorage persistence |
| **Netflix app** | ✅ Done | Hero banner, horizontal scroll rows, project cards with generated images |
| **Instagram app** | ✅ Done | Profile header, stories, feed posts with generated images |
| **LinkedIn app** | ✅ Done | Profile card, experience timeline, skills |
| **GitHub app** | ✅ Done | Profile, pinned repos, contribution graph, repository list |
| **Notes app** | ✅ Done | Apple Notes style, about/philosophy content |
| **WhatsApp app** | ✅ Done | Chat simulation with auto-reply system |
| **Maps app** | ✅ Done | CSS-rendered map with Mumbai location pin |
| **Mail app** | ✅ Done | Contact form styled as email compose |
| **Calendar app** | ✅ Done | Calendar grid with booking interface |
| **Spotify app** | ✅ Done | Music/personality showcase |
| **Medium app** | ✅ Done | Article listing with generated images |
| **Phone app** | ✅ Done | Dialer interface |
| **Dynamic favicon** | ✅ Done | Runtime-generated smartphone icon |
| **Generated image assets** | ✅ Done | 5 AI-generated PNGs (avatar, 3 projects, workspace) |
| **Centralised portfolio data** | ✅ Done | `data/portfolio.ts` — single source of truth for all content |
| **SEO metadata** | ✅ Done | Title, description, OpenGraph, keywords, author |

### 🔲 NOT YET DONE

| Item | Priority | Description |
|---|---|---|
| **Comprehensive bug fix pass** | 🔴 High | Full audit of all 12 apps for layout issues, interaction bugs, console errors, edge cases |
| **Production deployment** | 🔴 High | Deploy to Vercel or Netlify; verify `next build` succeeds cleanly |
| **Real content population** | 🟡 Medium | `data/portfolio.ts` has some placeholder data (phone number, second job entry); needs real values from Nihir |
| **Settings app** | 🟡 Medium | Was discussed but never built — a dedicated in-phone Settings app for theme/device switching |
| **Haptic feedback (Vibration API)** | 🟢 Low | Add `navigator.vibrate()` on icon taps, app launches, button presses for native feel on mobile |
| **Dynamic Island interactions** | 🟢 Low | Live status in Dynamic Island (e.g., Spotify "now playing" pill animation) |
| **Keyboard shortcuts** | 🟢 Low | Escape to go home / back is partially implemented; could expand |
| **Accessibility audit** | 🟡 Medium | ARIA labels exist on some elements but need a full pass; screen reader flow through apps |
| **Performance profiling** | 🟡 Medium | Ambient background canvas needs profiling on low-end devices; may need to disable on mobile |
| **Responsive behaviour on real phones** | 🟡 Medium | The phone frame is fixed at 375×812px; on actual mobile viewports, scaling/overflow needs testing |
| **PWA manifest** | 🟢 Low | Add `manifest.json` for "Add to Home Screen" support |
| **Analytics** | 🟢 Low | Track which apps visitors open, time spent, etc. |
| **Social image / OG image** | 🟡 Medium | Custom OpenGraph image showing the phone simulation for link previews |

---

## 7. How to Run

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev
# → http://localhost:3000

# Production build
pnpm build
pnpm start
```

### Environment Variables (optional)

| Variable | Purpose | Required? |
|---|---|---|
| `NEXT_PUBLIC_OWM_API_KEY` | OpenWeatherMap API key (currently unused — weather is hardcoded) | No |

---

## 8. Key Files to Modify

| What you want to change | File to edit |
|---|---|
| Personal info, skills, experience, projects | `data/portfolio.ts` |
| Time-of-day sky phases / palettes | `components/ambient-background.tsx` (`getScene` + `SCENES`) |
| Design tokens, colours, glassmorphism | `app/globals.css` |
| Add a new app | Create `components/apps/[name]-app.tsx`, add to `AppId` type in `hooks/use-app-navigation.tsx`, add `case` in `app/page.tsx`, add icon in `components/home-screen.tsx` |
| SEO / metadata | `app/layout.tsx` |
| Device frame dimensions | `components/device-frame.tsx` (375×812px hardcoded) |

---

## 9. Design Decisions Worth Noting

1. **Client-side routing, not URL routing.** Apps don't have URLs. This is intentional — phones don't change URLs when you open Instagram. All state lives in `useAppNavigation()`.

2. **No external image assets.** All images were AI-generated during development and committed to `public/images/`. No CDN, no Unsplash, no external requests.

3. **Weather is hardcoded.** The ambient background derives its scene from a manually-set constant, not an API. This avoids permission prompts, API keys, rate limits, and GDPR concerns. Update it once per season.

4. **Day/night is clock-driven, not theme-driven.** A user in light mode at midnight still sees a night sky. Mode controls the UI chrome palette. Time controls the ambient sky. They are independent.

5. **Device type is cosmetic only.** Switching iPhone ↔ Android changes the frame, status bar, navigation style, and lock screen layout. It does NOT change app content.

6. **The background is capped at 0.55 opacity.** This is a deliberate constraint to ensure the phone frame always dominates visual hierarchy. The sky should feel like looking out a window, not at a painting.
