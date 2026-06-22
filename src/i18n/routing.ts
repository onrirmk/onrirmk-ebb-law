import { defineRouting } from "next-intl/routing";

export const PRACTICE_AREA_SLUGS = [
  "insurance-and-reinsurance",
  "shipping",
  "aviation",
  "logistics-and-transport",
  "trade-and-commodities",
  "dispute-resolution",
  "corporate-and-commercial",
] as const;

export type PracticeAreaSlug = (typeof PRACTICE_AREA_SLUGS)[number];

// ⚠️ TR locale temporarily disabled — to be reactivated after Monday presentation.
// Original config:
//   locales: ["tr", "en"]
//   defaultLocale: "tr"
//   Each pathname had { tr: "...", en: "..." } shape.
// Files preserved: messages/tr.json, src/components/layout/LanguageSwitcher.tsx
// To restore: re-add "tr" to locales, set defaultLocale: "tr", uncomment tr: keys below,
// re-import LanguageSwitcher in src/components/layout/Navbar.tsx.

export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/hakkimizda": {
      // tr: "/hakkimizda",
      en: "/about",
    },
    "/calisma-alanlari": {
      // tr: "/calisma-alanlari",
      en: "/practice-areas",
    },
    "/calisma-alanlari/[slug]": {
      // tr: "/calisma-alanlari/[slug]",
      en: "/practice-areas/[slug]",
    },
    "/iletisim": {
      // tr: "/iletisim",
      en: "/contact",
    },
    "/team": {
      // tr: "/ekibimiz",
      en: "/team",
    },
    "/team/[slug]": {
      // tr: "/ekibimiz/[slug]",
      en: "/team/[slug]",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
