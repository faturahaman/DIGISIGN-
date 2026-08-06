import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ChatProvider } from "@/lib/ChatContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SERVICES } from "@/lib/constants";
import { faqJsonLd } from "@/lib/faqSchema";
import {
  SITE_URL as BASE_URL,
  SITE_NAME,
  SITE_TITLE,
  SITE_ALTERNATE_NAMES,
  SITE_DESCRIPTION as BRAND_DESCRIPTION,
  SITE_SLOGAN,
  OG_IMAGE,
  LOGO_IMAGE,
  BUSINESS_LOCALITY,
  BUSINESS_REGION,
  BUSINESS_COUNTRY,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  WHATSAPP_URL,
  SOCIAL_PROFILES,
  SERVICE_TYPES,
  absoluteUrl,
} from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

// Mono used for eyebrows, code/terminal-style bits, and tabular numerals.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Build a priced OfferCatalog from the real service data so search engines and
// AI assistants can surface accurate "mulai dari" pricing in rich results.
const offerCatalog = SERVICES.map((service) => ({
  "@type": "Offer",
  name: service.title,
  description: service.description,
  priceCurrency: "IDR",
  price: String(service.startingPrice),
  priceSpecification: {
    "@type": "PriceSpecification",
    priceCurrency: "IDR",
    minPrice: service.startingPrice,
    valueAddedTaxIncluded: false,
  },
  itemOffered: {
    "@type": "Service",
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: { "@id": `${BASE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Indonesia" },
  },
  url: `${BASE_URL}/#services`,
}));

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: "#F8FAFC",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  verification: {
    google: "gMKOqq5s2pMSRsfnK_WPIIhayEpTbHOXETG9MOum-FY",
  },
  title: {
    default: SITE_TITLE,
    template: "%s | Arvion",
  },
  description: BRAND_DESCRIPTION,
  keywords: [
    "Arvion",
    "Arvion Indonesia",
    "Arviotiv",
    "arviotiv.com",
    "DigiSign ID",
    "digitalidsign",
    // Local intent. These carry far less competition than their national
    // counterparts and are the realistic first page to win.
    "jasa pembuatan website Bogor",
    "jasa desain grafis Bogor",
    "jasa website Bogor",
    "web design Bogor",
    "digital agency Bogor",
    "creative digital agency Indonesia",
    "jasa desain grafis",
    "jasa pembuatan website",
    "jasa website Indonesia",
    "jasa branding",
    "desain logo",
    "desain poster",
    "desain banner",
    "landing page",
    "company profile website",
    "website company profile",
    "website e-commerce",
    "website portfolio",
    "website dinamis",
    "UI/UX design",
    "desain grafis",
    "branding",
  ],
  authors: [{ name: "Arvion", url: BASE_URL }],
  creator: "Arvion",
  publisher: "Arvion",
  category: "Creative Digital Agency",
  classification: "Digital Agency, Graphic Design, Web Design",

  // Canonical URL
  alternates: {
    canonical: "/",
  },

  // Icons are provided via the app/icon.png & app/apple-icon.png file conventions,
  // which Next.js auto-optimizes and wires into <head>.

  // Open Graph
  openGraph: {
    title: SITE_TITLE,
    description: BRAND_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        // These must be the real pixel dimensions of `public/og-image.png`.
        // Scrapers reserve the card's layout from these numbers before the file
        // finishes downloading, so the previous 1200x630 (a 1.91:1 claim about a
        // 3:2 file) produced a mis-cropped preview. Regenerating the asset at a
        // true 1200x630 would fill social cards edge-to-edge; until then this
        // describes what actually ships.
        width: 1346,
        height: 897,
        alt: "Arvion - Creative Digital Agency Indonesia",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    alternateLocale: ["en_US"],
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: BRAND_DESCRIPTION,
    images: [OG_IMAGE],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  other: {
    "brand": SITE_NAME,
    "contact:email": CONTACT_EMAIL,
    "contact:phone_number": CONTACT_PHONE,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(LOGO_IMAGE),
      },
      image: absoluteUrl(OG_IMAGE),
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      foundingDate: "2024",
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS_LOCALITY,
        addressRegion: BUSINESS_REGION,
        addressCountry: BUSINESS_COUNTRY,
      },
      slogan: SITE_SLOGAN,
      knowsAbout: [...SERVICE_TYPES],
      sameAs: [...SOCIAL_PROFILES],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        availableLanguage: ["id", "en"],
        url: WHATSAPP_URL,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: BASE_URL,
      inLanguage: "id-ID",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      // The graph described an organization and a website but never said what
      // *this URL* is about, leaving Google to infer the page/entity link from
      // body copy alone. This node states it outright and gives the other nodes
      // something to hang off.
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: `${BASE_URL}/`,
      name: SITE_TITLE,
      description: BRAND_DESCRIPTION,
      inLanguage: "id-ID",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      primaryImageOfPage: absoluteUrl(OG_IMAGE),
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#professional-service`,
      name: SITE_NAME,
      description: BRAND_DESCRIPTION,
      url: BASE_URL,
      image: absoluteUrl(OG_IMAGE),
      logo: absoluteUrl(LOGO_IMAGE),
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      // The real span of `startingPrice` across SERVICES. A bare currency symbol
      // is not a parseable priceRange, so the field was being dropped entirely.
      priceRange: "Rp105.000 - Rp5.000.000",
      currenciesAccepted: "IDR",
      openingHours: "Mo-Fr 09:00-18:00",
      // Both, in order of specificity: the city anchors local intent ("jasa
      // website Bogor"), the country keeps national queries in scope. A bare
      // country gave Google nothing to rank locally on.
      areaServed: [
        { "@type": "City", name: BUSINESS_LOCALITY },
        { "@type": "Country", name: "Indonesia" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: BUSINESS_LOCALITY,
        addressRegion: BUSINESS_REGION,
        addressCountry: BUSINESS_COUNTRY,
      },
      serviceType: [...SERVICE_TYPES],
      provider: {
        "@id": `${BASE_URL}/#organization`,
      },
      // NOTE: aggregateRating intentionally omitted until verified, on-page
      // customer reviews exist — Google requires ratings to be backed by
      // reviews visible on the page, and fabricated ratings risk a manual
      // action. Re-add a Review-backed AggregateRating once genuine reviews
      // are collected.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Arvion",
        itemListElement: offerCatalog,
      },
      sameAs: [...SOCIAL_PROFILES],
    },
    faqJsonLd,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* Fonts are self-hosted by next/font (Inter + IBM Plex Mono), so no
            preconnect to Google Fonts is needed — those were flagged as unused.
            DNS prefetch for genuinely deferred third-party origins only. */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        <link rel="dns-prefetch" href="https://docs.google.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        {/* JSON-LD Structured Data — `<` escaped to < to prevent XSS via
            any data-driven string (per Next.js JSON-LD guidance). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <LanguageProvider>
            <ChatProvider>{children}</ChatProvider>
          </LanguageProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
