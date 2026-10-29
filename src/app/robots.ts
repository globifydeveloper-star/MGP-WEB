import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

const PRODUCTION_HOST = /^(www\.)?muthootgoldpoint\.com$/i;

// Resolved per request so each host (production vs UAT/staging) gets its own robots.txt.
export const dynamic = 'force-dynamic';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = ((await headers()).get('host') || '').split(':')[0];

  // Non-production hosts are kept out of search via the X-Robots-Tag noindex header (next.config.ts).
  // Crawling stays allowed so Google can see that header; just don't advertise a sitemap.
  if (!PRODUCTION_HOST.test(host)) {
    return {
      rules: { userAgent: '*', allow: '/' },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://www.muthootgoldpoint.com/sitemap.xml',
  };
}
