import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ChatProvider } from "@/lib/ChatContext";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const BASE_URL = "https://arviotiv.com";
const SITE_NAME = "Arvion";
const BRAND_DESCRIPTION =
  "Arvion adalah creative digital agency Indonesia untuk jasa desain grafis, branding, landing page, company profile, e-commerce, dan website custom berkualitas tinggi.";
const OG_IMAGE = "/og-image.png";
const LOGO_IMAGE = "/arvion.png";
const CONTACT_EMAIL = "digitalidsign@gmail.com";
const CONTACT_PHONE = "+6285924361892";
const INSTAGRAM_URL = "https://www.instagram.com/arvion_id/";
const WHATSAPP_URL = "https://wa.me/6285924361892";
const SERVICE_TYPES = [
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
];

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#050816" },
  ],
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
    default: "Arvion — Jasa Desain Grafis & Pembuatan Website Indonesia",
    template: "%s | Arvion",
  },
  description: BRAND_DESCRIPTION,
  keywords: [
    "Arvion",
    "Arvion Indonesia",
    "DigiSign ID",
    "digitalidsign",
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
    title: "Arvion — Jasa Desain Grafis & Pembuatan Website Indonesia",
    description: BRAND_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Arvion - Creative Digital Agency Indonesia",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Arvion — Jasa Desain Grafis & Pembuatan Website Indonesia",
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
      alternateName: ["DigiSign ID", "digitalidsign"],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}${LOGO_IMAGE}`,
      },
      image: `${BASE_URL}${OG_IMAGE}`,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      foundingDate: "2024",
      slogan: "We Design Digital Experiences That Feel Premium",
      knowsAbout: SERVICE_TYPES,
      sameAs: [INSTAGRAM_URL],
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
      alternateName: ["DigiSign ID", "digitalidsign"],
      url: BASE_URL,
      inLanguage: "id-ID",
      publisher: {
        "@id": `${BASE_URL}/#organization`,
      },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${BASE_URL}/#professional-service`,
      name: SITE_NAME,
      description: BRAND_DESCRIPTION,
      url: BASE_URL,
      image: `${BASE_URL}${OG_IMAGE}`,
      logo: `${BASE_URL}${LOGO_IMAGE}`,
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      priceRange: "$$",
      openingHours: "Mo-Fr 09:00-18:00",
      areaServed: {
        "@type": "Country",
        name: "Indonesia",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "ID",
      },
      serviceType: SERVICE_TYPES,
      provider: {
        "@id": `${BASE_URL}/#organization`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "80",
        bestRating: "5",
        worstRating: "1",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Layanan Arvion",
        itemListElement: SERVICE_TYPES.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service },
        })),
      },
      sameAs: [INSTAGRAM_URL],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <head>
        {/* Preconnect to font origins (critical) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for deferred third-party origins */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />
        <link rel="dns-prefetch" href="https://docs.google.com" />
        <link rel="dns-prefetch" href="https://generativelanguage.googleapis.com" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
