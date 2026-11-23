import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { ChatProvider } from "@/lib/ChatContext";
import { SITE_BRAND } from "@/data/siteContent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "light",
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://arvioncreative.com"),
  title: {
    default: `${SITE_BRAND.name} — ${SITE_BRAND.tagline}`,
    template: `%s | ${SITE_BRAND.name}`,
  },
  description: SITE_BRAND.description,
  keywords: [
    "Arvion Creative",
    "Digital Creative Studio",
    "UI/UX Design",
    "Web Development",
    "Mobile App Design",
    "Branding & Identity",
    "Creative Agency Indonesia",
  ],
  authors: [{ name: SITE_BRAND.name }],
  creator: SITE_BRAND.name,
  icons: {
    icon: "/images/arvion-logo.png",
    apple: "/images/arvion-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://arvioncreative.com",
    title: `${SITE_BRAND.name} — ${SITE_BRAND.tagline}`,
    description: SITE_BRAND.description,
    siteName: SITE_BRAND.name,
    images: [
      {
        url: "/images/arvion-logo.png",
        width: 1200,
        height: 630,
        alt: SITE_BRAND.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_BRAND.name} — ${SITE_BRAND.tagline}`,
    description: SITE_BRAND.description,
    images: ["/images/arvion-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Manrope:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-[#171A22] antialiased selection:bg-[#F47721] selection:text-white">
        <LanguageProvider>
          <ChatProvider>
            {children}
          </ChatProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
