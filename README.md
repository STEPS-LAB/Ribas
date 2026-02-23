# Ribas Karpaty

**Premium demo landing page** for Ribas Karpaty — a hotel and wellness concept in Bukovel (Ivano-Frankivsk region, Ukraine). Designed by [STEPS LAB](https://github.com/STEPS-LAB) × Ribas Concept.

Single-page marketing site with bilingual support (UA/EN), room showcase, amenities, booking flow UI, and an AI concierge widget. Built for static export and ready for deployment to any static host.

---

## Features

- **Bilingual (UA / EN)** — Client-side locale switching with full content in Ukrainian and English; `lang` and copy update without reload.
- **Hero** — Headline, subtitle, and search block (dates, guests) with primary CTA.
- **Rooms** — Three room types (Standard, Deluxe, Luxe) with pricing, details, and imagery.
- **Amenities** — Restaurant, SPA, and Pool sections with descriptions and images.
- **Why us** — Value propositions: location, panorama, SPA complex, service standard.
- **Booking modal** — Check-in/check-out, guests, “Pick a room” flow (UI only; no backend).
- **AI assistant widget** — Floating chat-style CTA (“Ask anything about Ribas”) for demo/concept.
- **Mobile sticky bar** — “Book now” bar that appears on scroll for small screens.
- **Footer** — Newsletter, contact info, address, social links, credits.
- **Animations** — Scroll-triggered reveals (Framer Motion) with consistent timing and low CLS.
- **Static export** — `output: "export"` in Next.js; build produces static HTML/CSS/JS in `out/`.

---

## Tech stack

| Layer        | Technology |
|-------------|------------|
| Framework   | [Next.js 16](https://nextjs.org/) (App Router) |
| UI          | [React 19](https://react.dev/) |
| Language    | [TypeScript](https://www.typescriptlang.org/) |
| Styling     | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animation   | [Framer Motion](https://www.framer.com/motion/) |
| Icons       | [Lucide React](https://lucide.dev/) |
| Utilities   | [clsx](https://github.com/lukeed/clsx) |

- **Font:** Inter (Google Fonts), loaded in `app/layout.tsx` with `display: swap`.
- **Image sources:** Local assets in `public/`; remote allowed for `ribaskarpaty.com` and YouTube thumbnails (see `next.config.ts`).

---

## Project structure

```
ribas-karpaty/
├── app/
│   ├── layout.tsx       # Root layout, metadata, Inter font
│   ├── page.tsx         # Home route → <HomePage />
│   └── globals.css      # Tailwind entry, CSS variables, theme
├── components/
│   ├── HomePage.tsx     # Page composition, locale state, modals
│   ├── sections/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Rooms.tsx
│   │   ├── Amenities.tsx
│   │   ├── WhyUs.tsx
│   │   └── Footer.tsx
│   ├── features/
│   │   ├── BookingModal.tsx
│   │   ├── AIAssistantWidget.tsx
│   │   └── MobileStickyBookingBar.tsx
│   └── ui/
│       ├── MotionReveal.tsx
│       └── MotionImageReveal.tsx
├── lib/
│   ├── content.ts       # Localized copy, rooms, amenities, why-us
│   └── motion.ts        # Shared Framer Motion config (reveal)
├── public/
│   └── media/           # SVGs, hero poster, room/amenity assets
├── next.config.ts       # output: "export", images, allowedDevOrigins
├── tsconfig.json
├── package.json
└── README.md
```

- **`lib/content.ts`** — Single source of truth for all copy and structured data (rooms, amenities, why-us). Typed per locale (`ua` | `en`).
- **Sections** receive `locale` and render from `localized[locale]` and related data.
- **UI components** — Reusable motion wrappers and shared layout primitives.

---

## Content and i18n

- **Locales:** `ua` (Ukrainian), `en` (English). Stored in `lib/content.ts` as `localized` and typed with `Locale`.
- **Room and amenity data** are keyed by locale; image URLs can be shared or per-locale.
- **`document.documentElement.lang`** is set from `HomePage` when locale changes (`uk` for UA, `en` for EN) for accessibility and SEO.

Adding a new locale would require extending `Locale`, `LocalizedContent`, and the corresponding records in `lib/content.ts`, plus a language switcher in `Header`.

---

## Scripts

| Command       | Description |
|---------------|-------------|
| `npm run dev` | Start dev server at `http://0.0.0.0:3000` (reachable on LAN). |
| `npm run build` | Production build; outputs static site to `out/`. |
| `npm run start` | Serve production build (after `npm run build`) at `http://0.0.0.0:3000`. |
| `npm run lint` | Run ESLint. |

Dev server is bound to `0.0.0.0` so you can test from other devices; `next.config.ts` sets `allowedDevOrigins` for local network hosts.

---

## Getting started

```bash
# Clone and install
git clone git@github.com:STEPS-LAB/Ribas.git
cd Ribas
npm install

# Development
npm run dev
# Open http://localhost:3000

# Production build and static export
npm run build
# Output in ./out/

# Serve production build locally
npm run start
```

No environment variables are required for the current demo. If you add analytics or booking API later, use `.env.local` and prefix with `NEXT_PUBLIC_` for client-side usage.

---

## Build and deployment

- The project uses **static export** (`output: "export"` in `next.config.ts`). There are no server routes; the app is a single page.
- After `npm run build`, deploy the `out/` directory to any static host (e.g. GitHub Pages, Netlify, Vercel static, S3 + CloudFront, or any CDN).
- **Images:** `images.unoptimized: true` is set; for production you may want to enable Next.js image optimization and adjust config if you move to a Node/server deployment.

---

## Design and UX notes

- **Theme:** Light background, dark text, gold accent (`--gold: #c5a059`) for CTAs and selection.
- **Motion:** Reveal animations use a shared config in `lib/motion.ts` (opacity, slight Y, scale) to keep layout stable and avoid CLS.
- **Mobile:** Sticky booking bar and responsive layout; touch targets and spacing tuned for small screens.

---

## License and credits

- **Concept & design:** STEPS LAB × Ribas Concept  
- **Repository:** [STEPS-LAB/Ribas](https://github.com/STEPS-LAB/Ribas)  
- **License:** Private. All rights reserved.
