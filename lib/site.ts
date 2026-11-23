/**
 * Single source of truth for site-wide SEO / brand constants.
 * Aligned with Arvion Creative PRD.
 */

export const SITE_URL = "https://www.arvioncreative.com";

export const SITE_NAME = "Arvion Creative";

export const SITE_TITLE = "Arvion Creative — Ideas into Impact | Creative Digital Studio";

export const SITE_ALTERNATE_NAMES = [
  "Arvion",
  "Arvion Creative Studio",
  "arvioncreative.com",
] as const;

export const SITE_DESCRIPTION =
  "Arvion Creative helps brands grow through strategic digital experiences, strong visuals, and creative solutions designed to deliver meaningful results.";

export const SITE_SLOGAN = "Ideas into Impact. WE DESIGN. WE BUILD. WE CREATE.";

// Location
export const BUSINESS_LOCALITY = "Jakarta & Bogor";
export const BUSINESS_REGION = "Indonesia";
export const BUSINESS_COUNTRY = "ID";

// Contact
export const CONTACT_EMAIL = "hello@arvioncreative.com";
export const CONTACT_PHONE = "+6285924361892";
export const WHATSAPP_URL = "https://wa.me/6285924361892";

/** Canonical social profiles */
export const INSTAGRAM_URL = "https://www.instagram.com/arvioncreative_/";
export const SOCIAL_PROFILES = [INSTAGRAM_URL] as const;

// Brand-owned image assets
export const OG_IMAGE = "/images/arvion-logo.png";
export const LOGO_IMAGE = "/images/arvion-logo.png";

/** Human-facing service catalog names */
export const SERVICE_TYPES = [
  "UI/UX Design",
  "Web Development",
  "Mobile App Design",
  "Branding & Identity",
  "Creative Strategy",
] as const;

/** Absolute-URL helper for schema/OG fields that require a full URL. */
export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${SITE_URL}${path}`;
}
