import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Old Wix team URLs follow /Content/110/<numeric-id>/<name>.html —
// convert the name slug from underscore to hyphen and 301 to the
// new team page. Lawyers still at the firm keep their SEO equity;
// retired lawyers' URLs land on a natural 404 on the new site,
// which Google eventually drops.
const LEGACY_TEAM_PATTERN =
  /^\/Content\/110\/\d+\/([a-z0-9_]+)\.html\/?$/i;

// One-off explicit redirects for URLs that don't fit a generic
// pattern (e.g. old homepage, misc landing pages).
const LEGACY_REDIRECTS: Array<{ from: RegExp; to: string }> = [];

// Legacy Wix / classic-ASPX URLs that Google is still crawling from
// the old site and whose target no longer exists. Returning 410 Gone
// (permanent removal) tells Google to drop them from the index
// faster than a plain 404 would.
const LEGACY_GONE_PATTERNS: RegExp[] = [
  /^\/Content\//i,
  /^\/WebServices\//i,
  /^\/default\/?$/i,
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const teamMatch = pathname.match(LEGACY_TEAM_PATTERN);
  if (teamMatch) {
    const slug = teamMatch[1].toLowerCase().replace(/_/g, "-");
    const target = new URL(`/en/team/${slug}`, request.url);
    return NextResponse.redirect(target, 301);
  }

  for (const { from, to } of LEGACY_REDIRECTS) {
    if (from.test(pathname)) {
      const target = new URL(to, request.url);
      return NextResponse.redirect(target, 301);
    }
  }

  if (LEGACY_GONE_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse(
      "<!doctype html><html><head><meta charset=\"utf-8\"><title>Gone</title></head><body><p>This page has been permanently removed.</p></body></html>",
      {
        status: 410,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "x-robots-tag": "noindex, nofollow",
          "cache-control": "public, max-age=3600",
        },
      },
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|studio|_next|_vercel|.*\\..*).*)"],
};
