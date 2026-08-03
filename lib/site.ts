/**
 * Single source of truth for site-wide SEO / brand constants.
 *
 * Everything that appears in metadata, JSON-LD, sitemap, robots, manifest,
 * the footer, and the AI system prompt should read from here so the brand's
 * identity signals (domain, social profiles, contact) never drift out of sync
 * across files — inconsistent signals weaken how search engines resolve the
 * business entity.
 */

/** Canonical origin — includes the `www` host the site is actually served from. */
export const SITE_URL = "https://arviotiv.com";

export const SITE_NAME = "Arvion";

/** Alternate names the brand is known by (used in Organization schema). */
export const SITE_ALTERNATE_NAMES = ["DigiSign ID", "digitalidsign"] as const;

export const SITE_DESCRIPTION =
  "Arvion adalah creative digital agency Indonesia untuk jasa desain grafis, branding, landing page, company profile, e-commerce, dan website custom berkualitas tinggi.";

export const SITE_SLOGAN = "We Design Digital Experiences That Feel Premium";

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
