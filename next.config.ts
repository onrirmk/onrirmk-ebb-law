import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // TR locale temporarily disabled — redirect legacy TR URLs to EN equivalents.
  // Remove or comment out this redirects() block when TR is reactivated.
  async redirects() {
    return [
      { source: "/tr", destination: "/en", permanent: false },
      { source: "/tr/hakkimizda", destination: "/en/about", permanent: false },
      {
        source: "/tr/calisma-alanlari",
        destination: "/en/practice-areas",
        permanent: false,
      },
      {
        source: "/tr/calisma-alanlari/:slug",
        destination: "/en/practice-areas/:slug",
        permanent: false,
      },
      { source: "/tr/iletisim", destination: "/en/contact", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
