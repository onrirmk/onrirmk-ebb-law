import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Old Wix URLs whose target still exists on the new site — 301 to
// the equivalent page so the old URL's SEO equity transfers, and
// Google eventually replaces the old URL with the new one in
// search results.
const LEGACY_REDIRECTS: Array<{ from: RegExp; to: string }> = [
  {
    from: /^\/Content\/110\/417\/sarp_aziz_celikkanat\.html\/?$/i,
    to: "/en/team/sarp-aziz-celikkanat",
  },
];

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
