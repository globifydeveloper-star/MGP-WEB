import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export function proxy(request: NextRequest) {
  const nonce = crypto.randomBytes(16).toString('base64');

  const publicStrapiUrl = process.env.STRAPI_PUBLIC_URL || process.env.NEXT_PUBLIC_STRAPI_URL || '';

  const csp = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data: https:;
    connect-src 'self' https:;
    frame-src 'self' https://maps.google.com https://www.google.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self' ${publicStrapiUrl};
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
