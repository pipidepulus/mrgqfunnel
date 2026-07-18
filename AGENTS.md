# AGENTS.md: Source of Truth — RDV® Dynamic Vasoactive Reactor Funnel

This document defines the architecture, content, and technical standards for the **RDV® Dynamic Vasoactive Reactor** landing page. It is the single source of truth for development.

---

## 1. Stack & Constraints

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) — React Server Components |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 + `@theme` tokens in `globals.css` |
| Animations | Framer Motion (`motion.*`, `useInView`) |
| Voice AI | ElevenLabs Convai Widget (client script only, no SDK) |
| Fonts | Inter (body), Montserrat 700 (headings) — via `next/font/google` |
| Responsive | Mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px) |

**Hard constraints:**
- No CSS Modules. All styling via Tailwind utility classes.
- No path aliases (`@/`). Use relative imports: `"../components/HeroSection"`.
- No ElevenLabs npm package. Only the client script + custom element.
- All text content in **English**.
- Images use `.png` extension (not `.jpg`).
- No `remotePatterns` in `next.config.mjs` — all images are local (`/img/*`).
- Mobile-first responsive: all components start with mobile styles, then use `sm:`, `md:`, `lg:`, `xl:` breakpoints to enhance for larger screens.

---

## 2. Project Structure

```text
/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, globals.css
│   ├── page.tsx            # Funnel page: Hero → Problem → Solution → Action
│   └── globals.css         # Tailwind v4 + @theme tokens
├── components/
│   ├── HeroSection/
│   │   └── index.tsx
│   ├── ProblemSection/
│   │   └── index.tsx
│   ├── SolutionSection/
│   │   └── index.tsx
│   └── ActionSection/
│       └── index.tsx
├── public/
│   └── img/
│       ├── hero-well-tech.png
│       ├── molecular-shatter.png
│       ├── oil-flow-amber.png
│       └── MrGQ.png
├── openspec/               # SDD artifacts (auto-generated)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

**No `src/` directory. No `components/funnel/` subfolder.** All components live directly in `components/` at project root.

---

## 3. Design Tokens

### Colors (industrial palette)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0A192F` | Backgrounds, dark surfaces |
| `--color-accent` | `#00D1FF` | Highlights, links, data values |
| CTA (hardcoded) | `#F39C12` | Primary call-to-action buttons only |

**CTA is orange (`#F39C12`), NOT cyan.** Cyan is for accents/data. Orange is for conversion actions.

### Fonts & Theme

```css
@import "tailwindcss";

@theme {
  --color-primary: #0a192f;
  --color-accent: #00d1ff;
  --font-family-montserrat: 'Montserrat', sans-serif;
}
```

**Tailwind v4 rules:**
- `@import "tailwindcss"` MUST come first.
- `@theme` defines custom tokens accessible as `bg-primary`, `text-accent`, `font-montserrat`.
- If `@theme` causes PostCSS errors, use CSS custom properties directly in `:root`:
  ```css
  :root {
    --primary: #0a192f;
    --accent: #00d1ff;
  }
  ```
  Then reference via `var(--primary)` or define Tailwind config in `tailwind.config.js`.

---

## 4. Next.js Config Rules

### `next.config.mjs` — required settings

```mjs
const nextConfig = {
  images: {
    // No remotePatterns needed — all images are local (/img/*)
    qualities: [75, 85, 90],
  },
};
export default nextConfig;
```

**Rules:**
- `qualities` must be an array of numbers matching every `<Image quality={...}>` used.
- No `remotePatterns` — all images are local.
- Hero image uses `quality={90}`. Other images use `quality={85}`.

### Image rules

| Rule | Detail |
|------|--------|
| Hero background | `next/image` with `fill`, `priority`, `className="object-cover"` |
| Parent container | MUST have `position: relative` (or `absolute`/`fixed`) for `fill` to work |
| All other images | `fill` + `quality={85}` + `sizes` attribute |
| No text burned into images | All copy is HTML for SEO |
### Image Styling & UX — Visual Specifications

Images are the primary visual driver of this landing page. Their sizing, positioning, and responsive behavior define the user experience. These rules are **mandatory** — not optional guidelines.

#### Hero Section — Full-Screen Background Image

| Property | Value | Reason |
|----------|-------|--------|
| Sizing | `fill` + parent `absolute inset-0` | Covers entire viewport height (`min-h-[100dvh]`) on all screen sizes |
| Positioning | `object-cover` | Ensures the image fills the container without distortion; crops excess edges |
| Quality | `90` | Highest quality for the hero — it's the first thing users see (LCP element) |
| Loading | `priority` | Preload as LCP (Largest Contentful Paint) for Core Web Vitals |
| Sizes | `100vw` | Full viewport width on all devices |
| Overlay | Dark gradient (`from-primary/75 via-primary/50 to-primary/95`) | Ensures text readability over the image at all breakpoints |

**Responsive behavior:**
- Mobile: fills entire screen height, no scroll until content below hero
- Tablet/Desktop: same — full viewport coverage, image scales proportionally
- No aspect ratio constraints — `fill` handles proportional scaling automatically

#### Problem Section — Background Image

| Property | Value | Reason |
|----------|-------|--------|
| Sizing | `fill` + parent `absolute inset-0` | Covers the section container (not full viewport) |
| Positioning | `object-cover` | Fills section without distortion |
| Quality | `85` | Good quality for a background that has an overlay |
| Loading | Default (lazy) | Not above-the-fold — lazy load is appropriate |
| Sizes | `100vw` or section width | Matches the container width |
| Overlay | Gradient overlay per AGENTS.md §5.B | Reduces image opacity so text remains readable |

**Responsive behavior:**
- Mobile: full-width section background, crops top/bottom as needed
- Tablet/Desktop: same proportional scaling

#### Solution Section — Single Panel Image

| Property | Value | Reason |
|----------|-------|--------|
| Sizing | `fill` + parent `relative` container | Fills its designated panel area |
| Positioning | `object-cover` | Fills panel without distortion |
| Quality | `85` | Good quality for informational image |
| Loading | Default (lazy) | Below the fold — lazy load is appropriate |
| Sizes | `100vw` or panel width | Matches container |

**Responsive behavior:**
- Mobile: full-width panel, image fills container
- Tablet/Desktop: same proportional scaling within the panel

#### Action Section — Mr. GQ Avatar Image

| Property | Value | Reason |
|----------|-------|--------|
| Sizing | Fixed width/height (not `fill`) | Avatar is a small UI element, not a background |
| Recommended size | `w-16 h-16` (64px) on mobile, `w-20 h-20` (80px) on desktop | Standard avatar sizing — recognizable but not dominant |
| Positioning | `object-cover` + `rounded-full` | Circular crop for avatar appearance |
| Quality | `85` | Good quality for a small image |
| Loading | Default (lazy) | Below the fold — lazy load is appropriate |

**Responsive behavior:**
- Mobile: 64px avatar, proportional scaling
- Tablet/Desktop: 80px avatar, proportional scaling

#### General Rules

1. **No hardcoded pixel dimensions on `<Image>`** — use `fill` with parent container sizing, or Tailwind classes for avatars
2. **All images use `object-cover`** — never `object-contain` (would leave empty space)
3. **Hero is the only `priority` image** — all others lazy load
4. **Hero quality is 90, all others are 85** — matches AGENTS.md §4 rule
5. **All images have descriptive `alt` text** — for accessibility and SEO
6. **Images never contain text** — all copy is HTML for SEO (AGENTS.md rule)
---

## 5. Funnel AIDA — Section-by-Section Spec

### A. HERO (Attention)

**Purpose:** Stop the scroll with a devastating stat + disruptive promise.

**Content:**
- **Kicker:** "Next Generation EOR Technology"
- **Headline:** "886,435 Marginal Wells in the U.S. are stuck at less than 2.4 BPD"
- **Sub-headline:** "Multiply your production by 5× without CAPEX and without steam — using the RDV® Dynamic Vasoactive Reactor."
- **CTA button:** "Is This Your Well?" (orange `#F39C12`, no link — visual anchor to keep scrolling)
- **Bottom callout:** Compact card with RDV explanation + 4 negative bullets (No CAPEX, No diluents, No steam, No infrastructure)

**Visual:** `hero-well-tech.png` as full-screen background with dark gradient overlay (`from-primary/75 via-primary/50 to-primary/95`). Text on top.

---

### B. PROBLEM (Interest)

**Purpose:** Expose the false economy of conventional solvent treatments.

**Content:**
- **Kicker:** "The Diagnosis That Is Killing Your Profitability"
- **Headline:** "Two Lies That Have Cost You Millions"
- **Panel 1 — Lie #1: Wrong Diagnosis**
  - Title: "They Say It Is Sand. It Never Was."
  - Point 1: Conventional solvents only wash the surface. They never fragment organic deposits at the molecular level.
  - Point 2: Every flush costs thousands — yet production declines again within weeks because the root cause is untouched.
- **Panel 2 — Lie #2: False Economy**
  - Title: "Cheap Solvents Are the Most Expensive Mistake You Make"
  - Point 1: Average well spends $40K–$120K/year on repeated solvent cycles — a vicious spending loop.
  - Point 2: Meanwhile production declines 3–7% monthly because deposits keep regenerating.
- **Closing question:** "How many barrels have you lost this month by using the same old recipe over and over again?"

**Visual:** `oil-flow-amber.png` as background with gradient overlay. Two-panel layout (wrong diagnosis / false economy).

---

### C. SOLUTION (Desire)

**Purpose:** Present the proton-donor mechanism + field results as proof.

**Content:**
- **Kicker:** "The Solution — Dynamic Vasoactive Reactor"
- **Headline:** "Proton-Based Organic Deposit Fragmentation"
- **Mechanism explanation:** Our proton-donor mechanism breaks down organic deposits (C17+) into lighter hydrocarbons (C13-C16) through a targeted chemical reaction — even in shut-in wells.
- **Results table:**

| Location | Before | After | Result |
|----------|--------|-------|--------|
| Luling, Texas (Permian Basin) | 2.4 BPD | 14.2 BPD | +492% — Organic Deposition (Paraffin) — Problem Fixed |
| Poso Creek, CA (Heavy Oil) | 9.9 BPD | 14.2 BPD | +56% — Organic Deposition (Asphaltene) — Problem Fixed |

- **Tech note:** RDV functions as a proton-donor agent. The protonation process disrupts long carbon chain bonds (C17+), fragmenting them into lighter hydrocarbons (C13-C16). This irreversible molecular fragmentation eliminates the deposit — not just washing it, but breaking it apart at the source.
- **CTA links:** "Download Tech Paper" (secondary) + "Get RDV For Your Field" (primary, orange)

**Visual:** `molecular-shatter.png` as a single panel image (not duplicated). Results table with accent-colored headers.

---

### D. ACTION (Conversion)

**Purpose:** Convert desire into inquiry via Mr. GQ AI agent — the primary conversion mechanism.

**Content:**
- **Kicker:** "Get RDV® For Your Field"
- **Headline:** "Talk to Mr. GQ, your RDV® AI Specialist"
- **Mr. GQ badge:** Avatar + title "AI Oil Specialist — RDV® ROI & Dosing"
- **Single CTA button:** "Start Chat with Mr. GQ" (orange `#F39C12`, opens ElevenLabs widget programmatically)
- **Trust line:** "No commitment · Custom ROI analysis included · Response within 24 hours"
- **Use Cases section:** Two field report cards linking to PDF case studies (Luling Stepper Report, POSO CREEK Report)

**Layout:** Single-column, centered. No two-column split. One clear path: chat with Mr. GQ → download case studies.

**ElevenLabs Widget:**
```html
<elevenlabs-convai agent-id={process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID}></elevenlabs-convai>
<script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
```

**Important:** NO suggested questions / chips. The widget handles conversation naturally.
The agent ID MUST come from `process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID` — never hardcode it in source code.
The CTA button opens the widget via `document.querySelector('elevenlabs-convai').open()` — no form redirect.

**Visual:** Subtle radial glow background. Widget embedded as floating button (bottom-right). Use Cases section below CTA with card-style PDF download links.

---

## 6. Component Rules

### Composition

- Each section is a **pure, independent component**. No cross-section dependencies.
- Sections use `useInView` from Framer Motion for scroll-triggered animations.
- All animations: `initial → whileInView`, not page-load entry (performance).
- Animation timing: max 400ms entrance, staggered children max 0.12s delay.

### TypeScript

- Strict mode enabled. No `any` types.
- `"use client"` only for components using Framer Motion (`useInView`).
- All props must be typed interfaces.

### Naming

- Component files: `index.tsx` inside component folder.
- CSS classes: Tailwind utilities only (no BEM).
- Component folders: PascalCase directly in `components/` (e.g., `HeroSection/`, not `components/funnel/HeroSection/`).

---

## 7. ElevenLabs Integration

**Rules:**
- NO npm package installation.
- Only the client script + custom element.
- Load with `next/script` strategy `"lazyOnload"`.
- Widget appears as:
  1. Floating button (bottom-right corner) — toggle to open chat
  2. Inline card in ActionSection — embedded directly

**Implementation:**
```tsx
import dynamic from "next/dynamic";

const ElevenLabsWidget = dynamic(
  () => import("./ElevenLabsWidget"),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center gap-2 py-4 text-accent">
      <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
      <span className="text-sm">Loading AI specialist...</span>
    </div>
  ) }
);
```

The widget component renders the custom element + script. Shows a spinner while loading. No suggested questions/chips.

---

## 8. Content Language

- **All user-facing text in English.**
- No Spanish copy, labels, or UI strings.
- Mr. GQ greeting is in English: "Hello! I'm Mr. GQ, your oil AI specialist for RDV®..."

---

## 8. Environment Variables

All sensitive or deploy-time configuration uses environment variables — never hardcoded values.

### Required `.env.local` (local development)

```bash
# ElevenLabs Conversational AI Agent ID
NEXT_PUBLIC_ELEVENLABS_AGENT_ID="agent_XXXXXXXXXXXXXXXXXXXXXXXXXX"
```

**Rules:**
- All `NEXT_PUBLIC_*` env vars are client-accessible (available in browser bundle). The agent ID is exposed to the widget regardless, but using an env var allows per-environment configuration without code changes.
- Commit `.env.example` (with placeholder values) to version control. Never commit `.env.local`.
- For production deployment, set `NEXT_PUBLIC_ELEVENLABS_AGENT_ID` in your hosting platform's environment variables (Vercel, Docker, etc.).

### PostCSS Configuration

Tailwind CSS v4 requires a PostCSS plugin configuration. Create `postcss.config.mjs`:

```mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

**Rules:**
- Must use `.mjs` extension (ESM syntax) for Next.js compatibility.
- The `@tailwindcss/postcss` plugin is required — it handles CSS parsing, `@import "tailwindcss"` resolution, and `@theme` token generation.
- No `autoprefixer` needed — Tailwind v4 handles vendor prefixing internally.
- No `postcss-import` needed — handled by the plugin.

---

## 9. SDD Workflow

This project uses **Spec-Driven Development** (SDD) via the OpenSpec artifact store.

- All changes go through `openspec/changes/<change-name>/`
- Phases: proposal → spec → design → tasks → apply → verify → archive
- Status: `gentle-ai sdd-status <change> --cwd . --json --instructions`

---

*This document is the single source of truth for the RDV® funnel development.*
