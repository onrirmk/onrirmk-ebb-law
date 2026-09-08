import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Legacy Wix / classic-ASPX URLs that Google is still crawling from
// the old site. Returning 410 Gone (permanent removal) tells Google
// to drop them from the index faster than a plain 404 would.
const LEGACY_PATTERNS: RegExp[] = [
  /^\/Content\//i,
  /^\/WebServices\//i,
  /^\/default\/?$/i,
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (LEGACY_PATTERNS.some((re) => re.test(pathname))) {
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
