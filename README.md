# Ribas Karpaty

**Premium demo landing page** for Ribas Karpaty — a hotel and wellness concept in Bukovel (Ivano-Frankivsk region, Ukraine). Designed by [STEPS LAB](https://github.com/STEPS-LAB) × Ribas Concept.

Single-page marketing site with bilingual support (UA/EN), room showcase, amenities, booking flow UI, and an AI concierge widget. Built for static export and ready for deployment to any static host.

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
