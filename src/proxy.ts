import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { resolveLegacyRedirect } from '@/lib/legacyRedirects';

export function proxy(request: NextRequest) {
  // Trailing slashes and legacy URLs are resolved here in a single hop
  // (next.config sets skipTrailingSlashRedirect so Next doesn't add its own hop first).
  const { pathname } = request.nextUrl;
  const stripped = pathname.length > 1 ? pathname.replace(/\/+$/, '') || '/' : pathname;
  const legacyTarget = resolveLegacyRedirect(stripped);
  if (legacyTarget || stripped !== pathname) {
    // Plain URL, not nextUrl.clone(): NextURL re-adds the original trailing slash when
    // serialized, which would loop. Query string is kept; a '#hash' in the target is kept.
    const url = new URL(legacyTarget ?? stripped, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  }

  const nonce = crypto.randomBytes(16).toString('base64');

  // Origin editors open Strapi Admin on; its content preview iframes this site.
  const strapiAdminUrl =
    process.env.STRAPI_ADMIN_URL || process.env.STRAPI_PUBLIC_URL || process.env.NEXT_PUBLIC_STRAPI_URL || '';

  // React needs eval in development only (debug stacks); without it the client never hydrates in dev.
  const isDev = process.env.NODE_ENV === 'development';

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    connect-src 'self' https:;
    frame-src 'self' https://maps.google.com https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' ${strapiAdminUrl};
  `.replace(/\s{2,}/g, ' ').trim();

  // Set on the REQUEST headers (not just the response) so Next's own app-render nonce
  // detection (which reads content-security-policy[-report-only] off the incoming request
  // headers, see parseRequestHeaders/getScriptNonceFromHeader in next/dist/server/app-render)
  // picks up this nonce and applies it to Next's own inline/hydration scripts.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('content-security-policy', csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response.headers.set('Content-Security-Policy', csp);

  return response;
}

export const config = {
  // sitemap.xml/.xsl are skipped: Chrome treats the XSL stylesheet as a script, and
  // 'strict-dynamic' would block it, leaving the browser view of the sitemap blank.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|sitemap.xsl).*)'],
};
