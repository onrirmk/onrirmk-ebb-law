/**
 * Absolute site URL used by robots.ts, sitemap.ts and metadata.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this on Vercel to the canonical
 *      production domain (e.g. https://www.ebb-law.com) so search
 *      engines and OG scrapers see one stable URL.
 *   2. VERCEL_URL — Vercel injects this on preview/production
 *      deployments (without scheme).
 *   3. https://ebb-law.vercel.app fallback for local dev.
 *
 * Always returns a URL without a trailing slash.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://ebb-law.vercel.app";
  return raw.replace(/\/$/, "");
}
