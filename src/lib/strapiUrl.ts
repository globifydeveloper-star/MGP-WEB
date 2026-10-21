import 'server-only';

// Single source of truth for where the Next server reaches Strapi. Read at runtime
// (never NEXT_PUBLIC_*), so the same image works against the public CMS URL today and
// the internal ALB / Service Connect address after the infra cutover.
let logged = false;

export function getStrapiUrl(): string {
  const internal = process.env.STRAPI_INTERNAL_URL;
  const legacy = process.env.STRAPI_URL;
  const source = internal ? 'STRAPI_INTERNAL_URL' : legacy ? 'STRAPI_URL' : null;
  const raw = internal || legacy;

  let url: string;
  if (raw) {
    url = raw.replace(/\/+$/, '');
  } else if (process.env.NODE_ENV === 'production') {
    throw new Error('STRAPI_INTERNAL_URL is not set');
  } else {
    url = 'http://localhost:1337';
  }

  if (!logged) {
    logged = true;
    let host = 'invalid URL';
    try {
      host = new URL(url).host;
    } catch {}
    console.info(`[strapi] server-side Strapi host: ${host} (from ${source ?? 'dev default'})`);
  }
  return url;
}
