// Node.js-only startup checks, imported from instrumentation.ts register().
// Fail fast at boot instead of on the first Strapi call. Mirrors getStrapiUrl() in
// src/lib/strapiUrl.ts, which is 'server-only' and can't be imported here.
if (
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PHASE !== 'phase-production-build' &&
  !process.env.STRAPI_INTERNAL_URL &&
  !process.env.STRAPI_URL
) {
  console.error('[startup] STRAPI_INTERNAL_URL is not set (and no STRAPI_URL fallback). Refusing to start.');
  process.exit(1);
}

export {};
