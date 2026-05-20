import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ChatProvider } from "@/lib/ChatContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // only used for code, not critical
});

const BASE_URL = "https://digisign.vercel.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050816",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  verification: {
    google: "gMKOqq5s2pMSRsfnK_WPIIhayEpTbHOXETG9MOum-FY",
  },
  title: {
    default: "DiGiSign — Creative Digital Agency",
    template: "%s | DiGiSign",
  },
  description:
    "DiGiSign adalah creative digital agency yang menghadirkan jasa desain grafis premium dan pembuatan website berkualitas tinggi. Branding, poster, landing page, e-commerce, dan lebih banyak lagi.",
  keywords: [
    "digital agency",
    "desain grafis",
    "website",
    "branding",
    "landing page",
    "e-commerce",
    "UI/UX",
    "company profile",
    "jasa desain",
    "jasa website",
    "DiGiSign",
  ],
  authors: [{ name: "DiGiSign", url: BASE_URL }],
  creator: "DiGiSign",
  publisher: "DiGiSign",

  // Canonical URL
  alternates: {
    canonical: BASE_URL,
  },

  // Favicon
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
  },

  // Open Graph
  openGraph: {
    title: "DiGiSign — Creative Digital Agency",
    description:
      "We Design Digital Experiences That Feel Premium. Jasa desain grafis dan pembuatan website berkualitas tinggi.",
    url: BASE_URL,
    siteName: "DiGiSign",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DiGiSign — Creative Digital Agency",
        type: "image/png",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "DiGiSign — Creative Digital Agency",
    description: "We Design Digital Experiences That Feel Premium.",
    images: ["/og-image.png"],
    creator: "@digisign",
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

  // Verification (fill in after deploying)
  // verification: {
  //   google: "your-google-verification-code",
  // },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "DiGiSign",
  description:
    "Creative digital agency yang menghadirkan jasa desain grafis premium dan pembuatan website berkualitas tinggi.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.png`,
  telephone: "+6285924361892",
  email: "digitalidsign@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  sameAs: [
    "https://instagram.com/digisign",
    "https://linkedin.com/company/digisign",
  ],
  serviceType: [
    "Branding Design",
    "Poster Design",
    "Banner Design",
    "Landing Page",
    "Company Profile Website",
    "E-Commerce Website",
    "Portfolio Website",
    "Dynamic Website",
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: "ID",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} ${geistMono.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for WhatsApp */}
        <link rel="dns-prefetch" href="https://wa.me" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          <ChatProvider>{children}</ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
