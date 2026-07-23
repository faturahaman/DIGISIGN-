# DigiSign / Arvion — Project Coding Conventions (Skill Memory)

Auto-loaded every session for this workspace. Follow these patterns by default —
do not ask the user to restate them. Derived from analysis of the existing codebase
(components/, lib/, app/) as of this snapshot. If a new pattern conflicts with an
existing file, follow the existing file (grep first, don't assume).

## Stack
- Next.js 16 (App Router) — **experimental/breaking-changes build**. Per AGENTS.md:
  read `node_modules/next/dist/docs/` before using any Next API you're unsure of.
  Do not assume older Next.js training-data behavior.
- React 19, TypeScript strict mode, Tailwind CSS v4 (CSS-first config, no `tailwind.config.*`).
- shadcn/ui (`style: "radix-vega"`, baseColor neutral, iconLibrary lucide) + `radix-ui` package.
- framer-motion for all animation, lucide-react for icons, class-variance-authority +
  tailwind-merge + clsx (via `cn()`) for class composition.
- Path alias `@/*` → project root. shadcn aliases: `@/components`, `@/components/ui`,
  `@/lib`, `@/hooks`.

## File & Folder Structure
- `app/` — routes, layout, metadata, sitemap.ts, robots.ts. No component logic here
  beyond composing sections.
- `components/sections/` — full page sections (Navbar, HeroSection, ServicesSection...),
  one per file, PascalCase filename = component name.
- `components/shared/` — reusable cross-section pieces (SectionHeader, ServiceModal,
  ChatWidget, WhatsAppButton).
- `components/effects/` — presentational/animation-only components (BlurFade, Spotlight,
  GridPattern, Meteors, BorderBeam, GlowCard).
- `components/ui/` — shadcn primitives (button.tsx etc.) — generated style, don't hand-edit
  structure, extend via cva variants.
- `lib/constants.ts` — ALL static content/data arrays (SERVICES, ADVANTAGES, PROCESS_STEPS,
  PORTFOLIO_ITEMS, TESTIMONIALS, WHATSAPP_NUMBER, SOCIAL_LINKS, NAV_LINKS). Never hardcode
  business content inline in a component — add/edit it here.
- `lib/animations.ts` — centralized framer-motion `Variants` (fadeInUp, fadeIn,
  staggerContainer, scaleIn, slideInLeft/Right, blurFadeIn) sharing one
  `EASING = [0.22, 1, 0.36, 1]` const. Reuse these; don't invent ad-hoc easing curves.
- `lib/utils.ts` — `cn()` = `twMerge(clsx(inputs))`. Always use this for conditional/merged
  className strings, never string concatenation.
- `lib/i18n/` — `translations.ts` (id/en dictionary) + `LanguageContext.tsx`
  (`useLanguage()` hook exposing `{ lang, t, toggleLanguage, setLanguage }`).

## Component Conventions
- `"use client"` at the very top of the file when using hooks/interactivity/framer-motion.
- Named exports only for components: `export function ComponentName() {}`. Default export
  reserved for Next.js special files (page.tsx, layout.tsx).
- Props typed via a local `interface ComponentNameProps { ... }` placed just above the
  component.
- Section components render a wrapping `<section id="...">` matching the anchor used in
  `NAV_LINKS` / `handleScroll` (`home`, `services`, `portfolio`, `testimonials`, `contact`).
- Derive item types from data arrays instead of redefining them:
  `type ServiceItem = (typeof SERVICES)[number];`
- Icons stored as component references in data (`icon: Palette`), rendered later as
  `<Icon className="..." />` — not JSX in the data file.

## Styling Conventions
- Tailwind utility classes directly in JSX. No CSS Modules, no styled-components.
- Brand gradient: orange → purple, written as `from-orange-500 to-purple-600` (buttons/CTAs)
  or `/500 /500` (subtle backgrounds/icons). Primary = `#F59E0B` (orange), Accent =
  `#8B5CF6` (purple) — defined as CSS vars in `app/globals.css` `:root` and wired through
  Tailwind v4 `@theme inline`.
- Neutral palette: `slate-900` (headings/body text), `slate-600` (secondary text),
  `slate-200` (borders), `slate-50`/`slate-100` (surfaces/backgrounds).
- Cards/panels: `rounded-xl` or `rounded-2xl`, `border border-slate-200`, `bg-white`,
  `shadow-sm` default → `shadow-md`/`shadow-lg` on hover.
- Buttons/pills: `rounded-full`.
- Section container pattern: `mx-auto max-w-7xl px-5 sm:px-6 lg:px-8`.
- Section vertical rhythm: `py-16 sm:py-20 lg:py-28`.
- Mobile-first responsive stacking: unprefixed → `sm:` → `md:` → `lg:` → `xl:`, always in
  that order.
- Use `cn()` for any conditional/dynamic className, even when it looks like a single class.

## Animation Conventions
- Reuse variants from `lib/animations.ts`; don't write new keyframe/easing values inline
  unless the effect is truly one-off (then define it in `app/globals.css` under a labeled
  `/* X animation */` comment block, following the existing marquee/meteor/float/shine/
  border-beam pattern).
- Standard reveal pattern: parent `variants={staggerContainer} initial="hidden"
  animate="visible"`, children `variants={fadeInUp}`.
- Scroll-triggered reveal: wrap content in `<BlurFade delay={i * 0.06}>` (staggered lists use
  index-based delay increments of ~0.06–0.1s). BlurFade auto-respects
  `prefers-reduced-motion`.
- Hover micro-interaction on interactive cards: `whileHover={{ scale: 1.015, y: -2 }}`,
  `transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}`.
- Floating/idle motion: `animate={{ y: [0, -10, 0] }}` with `repeat: Infinity`,
  `ease: "easeInOut"`, staggered `delay` per element.
- Modals: `AnimatePresence` + backdrop opacity fade + panel scale/translate, with
  Escape-key close, body-scroll lock (`document.body.style.overflow`), and outside-click
  close via a ref-compared overlay `onClick`. See `ServiceModal.tsx` as the reference
  implementation (also detects mobile via resize listener to shorten animation durations).

## i18n Conventions
- Every user-facing string goes through `t.<section>.<key>` from `useLanguage()` — never
  hardcode Indonesian/English text directly in a component (icons' `aria-label` and a few
  dev-only strings are the rare exception).
- Add new copy to **both** `id` and `en` blocks in `lib/i18n/translations.ts`, mirroring the
  existing nested key structure exactly.
- Default language is `"id"`.

## Data & Formatting Conventions
- Currency: `new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR",
  minimumFractionDigits: 0 }).format(amount)`.
- Use `as const` on literal-typed fields in data arrays (e.g. `size: "large" as const`,
  `category: "design" as const`).
- WhatsApp CTAs: build message via a `t.modal.*Message(...)` translator function, then
  `window.open(\`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}\`, "_blank")`.
  Number lives only in `lib/constants.ts` (`WHATSAPP_NUMBER`).

## Performance Conventions
- `app/page.tsx`: only `Navbar` and `HeroSection` are imported eagerly (above-the-fold).
  Every other section/widget is lazy-loaded via
  `dynamic(() => import("...").then((m) => m.ComponentName))`. Follow this exact pattern
  when adding a new below-the-fold section.
- Always use `next/image` (never raw `<img>`) for content images, with explicit
  `width`/`height` or `fill` + `sizes`; set `priority` only on true LCP images.
  (Exception already present: flag icons in Navbar use raw `<img>` — small external SVGs,
  don't "fix" this without being asked.)
- Fonts via `next/font/google` with `display: "swap"`; only the primary font gets
  `preload: true`.

## SEO Conventions
- All metadata centralized in `app/layout.tsx` (`metadata`, `viewport`, JSON-LD `@graph`
  with Organization/WebSite/ProfessionalService). Update this file, not per-page metadata,
  unless a new route is added.
- `app/sitemap.ts` / `app/robots.ts` use the typed `MetadataRoute.Sitemap` /
  `MetadataRoute.Robots` Next.js APIs.

## TypeScript Conventions
- `strict: true`. Always type component props via an interface, not inline object types,
  once there are 2+ props.
- Prefer deriving types from data (`(typeof CONST)[number]`) over hand-writing duplicate
  interfaces for static content.
- Mapped/utility types when needed (see `DeepMutable<T>` in `LanguageContext.tsx`) — keep
  them colocated with the module that needs them, not in a global types file.

## General Code Style
- Double quotes for strings/JSX attributes, semicolons on, 2-space indentation.
- `export function X()` for components; arrow functions for local handlers/callbacks.
- Section-marker JSX comments (`{/* Left: Text content */}`) to delineate major blocks in
  long components — keep using this, it matches the existing file style.
- ESLint: flat config, `eslint-config-next` core-web-vitals + typescript rulesets. Run
  `npm run lint` before considering a change done if it touches multiple components.

## Before Writing Code, Always
1. Check `lib/constants.ts` and `lib/i18n/translations.ts` first — most "new feature" work
   is adding data/copy there, not new logic.
2. Check `lib/animations.ts` for an existing variant before adding a new one.
3. Match the existing Tailwind class ordering/style of the nearest sibling component rather
   than introducing a new visual pattern.
4. For anything Next.js-API-related, verify against `node_modules/next/dist/docs/` first —
   this project pins a Next.js version newer/different than training data.
