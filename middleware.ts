import { NextRequest, NextResponse } from "next/server";

// Supported locales
const locales = ["en", "es"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") ?? "";
  // Simple locale detection — prefer es if browser sends es
  const preferred = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();
  if (preferred && locales.includes(preferred)) return preferred;
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Generate CSP nonce using Web Crypto (Edge Runtime compatible)
  const nonceBytes = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...nonceBytes));

  // Skip static files and API routes for locale logic
  const isStaticFile =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/img") ||
    pathname.includes(".") ||
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    pathname === "/sitemap.xml";

  // Build CSP header
  const csp = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' https://js.stripe.com https://challenges.cloudflare.com`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https: http:`,
    `font-src 'self' https://fonts.gstatic.com`,
    `connect-src 'self' https://api.stripe.com https://challenges.cloudflare.com https://api.resend.com`,
    `frame-src https://js.stripe.com https://challenges.cloudflare.com`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-pathname", pathname);

  if (isStaticFile) {
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  // Check if path already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Don't redirect the default locale (en) — it serves at root path
  // Only redirect non-default locale if missing
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    // Only add prefix for non-default locale
    if (locale !== defaultLocale) {
      const newUrl = request.nextUrl.clone();
      newUrl.pathname = `/${locale}${pathname}`;
      const response = NextResponse.redirect(newUrl);
      response.headers.set("Content-Security-Policy", csp);
      return response;
    }
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
