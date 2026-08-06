/**
 * Single source of truth for site-wide SEO / brand constants.
 *
 * Everything that appears in metadata, JSON-LD, sitemap, robots, manifest,
 * the footer, and the AI system prompt should read from here so the brand's
 * identity signals (domain, social profiles, contact) never drift out of sync
 * across files — inconsistent signals weaken how search engines resolve the
 * business entity.
 */

/**
 * Canonical origin — includes the `www` host the site is actually served from.
 *
 * This MUST match the domain marked "Production" in the Vercel dashboard. Vercel
 * 308s the apex to `www` at the edge, so pointing this at the apex would make
 * every canonical tag, sitemap entry, and JSON-LD `@id` advertise a URL that
 * immediately redirects elsewhere. Flip both together or neither.
 */
export const SITE_URL = "https://www.arviotiv.com";

export const SITE_NAME = "Arvion";

/**
 * The page title, shared by `<title>`, Open Graph, Twitter, and the WebPage
 * node. These four have to agree — a search engine that sees a different title
 * in the tag than in the structured data trusts neither.
 */
export const SITE_TITLE =
  "Jasa Pembuatan Website & Desain Grafis Bogor | Arvion";

/**
 * Alternate names the brand is known by (used in Organization schema).
 *
 * `Arviotiv` is here because the domain reads differently from the brand name —
 * without it, a search for "arviotiv" has no text on the site to match against.
 */
export const SITE_ALTERNATE_NAMES = [
  "Arviotiv",
  "arviotiv.com",
  "DigiSign ID",
  "digitalidsign",
] as const;

/** Kept at ~160 characters so search engines show it without truncating. */
export const SITE_DESCRIPTION =
  "Arvion — creative digital agency Bogor. Jasa desain grafis, branding, landing page, company profile, e-commerce, dan website custom. Melayani seluruh Indonesia.";

export const SITE_SLOGAN = "We Design Digital Experiences That Feel Premium";

// Location
//
// City-level only, which is what's actually known. `streetAddress`, `postalCode`,
// and `geo` are deliberately absent rather than approximated — a made-up street or
// a city-centre coordinate pinned to a business that isn't there is worse than an
// incomplete address, and Google cross-checks these against a Business Profile.
// Fill them in for real if a public office address gets published.
export const BUSINESS_LOCALITY = "Bogor";
export const BUSINESS_REGION = "Jawa Barat";
export const BUSINESS_COUNTRY = "ID";

// Contact
export const CONTACT_EMAIL = "digitalidsign@gmail.com";
export const CONTACT_PHONE = "+6285924361892";
export const WHATSAPP_URL = "https://wa.me/6285924361892";

/** Canonical social profiles (feed `sameAs`). Keep only accounts that exist. */
export const INSTAGRAM_URL = "https://www.instagram.com/arvioncreative_/";
export const SOCIAL_PROFILES = [INSTAGRAM_URL] as const;

// Brand-owned image assets (paths are resolved against SITE_URL where absolute
// URLs are required, e.g. JSON-LD).
export const OG_IMAGE = "/og-image.png";
export const LOGO_IMAGE = "/arvion.png";

/** Human-facing service catalog names (feed schema knowsAbout / serviceType). */
export const SERVICE_TYPES = [
  "Branding Design",
  "Logo Design",
  "Poster Design",
  "Banner Design",
  "Landing Page",
  "Company Profile Website",
  "E-Commerce Website",
  "Portfolio Website",
  "Dynamic Website",
  "UI/UX Design",
] as const;

/** Absolute-URL helper for schema/OG fields that require a full URL. */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
