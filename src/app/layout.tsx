import type { Metadata } from "next";
import { EB_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getSiteUrl } from "@/lib/site-url";
import { fetchSiteSettings } from "@/sanity/lib/queries";
import { imageSrc } from "@/sanity/lib/image";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = getSiteUrl();
const SITE_NAME = "Erçin Bilgin Bektaşoğlu Law Firm";
const SITE_DESCRIPTION =
  "Erçin Bilgin Bektaşoğlu is a leading Turkish law firm in the core areas of transport, insurance and international trade.";

export async function generateMetadata(): Promise<Metadata> {
  // Editors can drop a custom favicon in Studio → Site Settings →
  // Branding → Favicon. If they haven't, fall back to /favicon.ico.
  const settings = await fetchSiteSettings().catch(() => null);
  const faviconUrl = imageSrc(settings?.favicon, 512);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    icons: faviconUrl
      ? {
          icon: [
            { url: faviconUrl, sizes: "any" },
            { url: `${faviconUrl}&w=32&h=32`, sizes: "32x32", type: "image/png" },
            { url: `${faviconUrl}&w=16&h=16`, sizes: "16x16", type: "image/png" },
          ],
          apple: `${faviconUrl}&w=180&h=180`,
          shortcut: faviconUrl,
        }
      : undefined,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        en: `${SITE_URL}/en`,
      },
    },
    verification: {
      google: "97IVjyfgL9OLxjCMn0qKhD3-XPM0Fl-IvXgsFA-MTJM",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
