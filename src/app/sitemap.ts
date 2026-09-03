import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
import { routing } from "@/i18n/routing";
import { fetchPracticeAreas, fetchTeamMembers } from "@/sanity/lib/queries";

// Rebuild the sitemap every hour so newly-published practice areas
// and team members appear within an ISR window instead of at the next
// full build.
export const revalidate = 3600;

// Canonical (TR) → EN alternate.
const PATH_ALTERNATES: Record<string, string> = {
  "/": "/",
  "/hakkimizda": "/about",
  "/calisma-alanlari": "/practice-areas",
  "/team": "/team",
  "/iletisim": "/contact",
};

function localised(base: string, locale: string, canonical: string): string {
  const en = PATH_ALTERNATES[canonical] ?? canonical;
  const path = locale === "en" ? en : canonical;
  const clean = path === "/" ? "" : path;
  return `${base}/${locale}${clean}`;
}

function localisedArea(base: string, locale: string, slug: string): string {
  const segment =
    locale === "en" ? "practice-areas" : "calisma-alanlari";
  return `${base}/${locale}/${segment}/${slug}`;
}

function localisedMember(base: string, locale: string, slug: string): string {
  return `${base}/${locale}/team/${slug}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const [areas, members] = await Promise.all([
    fetchPracticeAreas().catch(() => []),
    fetchTeamMembers().catch(() => []),
  ]);

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      Object.keys(PATH_ALTERNATES).map((canonical) => ({
        url: localised(base, locale, canonical),
        lastModified: now,
        changeFrequency: canonical === "/" ? "weekly" : "monthly",
        priority: canonical === "/" ? 1.0 : 0.8,
      })),
  );

  const areaEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    areas.map((a) => ({
      url: localisedArea(base, locale, a.slug),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const memberEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      members.map((m) => ({
        url: localisedMember(base, locale, m.slug),
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
  );

  return [...staticEntries, ...areaEntries, ...memberEntries];
}
