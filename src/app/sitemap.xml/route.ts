import { getSitemapContent } from '@/lib/strapi';

// Render on request so new Strapi blog posts / pages show up without a redeploy
// (Strapi isn't reachable at build time). Strapi responses are still cached via fetch revalidate.
// This is a route handler rather than app/sitemap.ts so the XML can reference /sitemap.xsl,
// which styles the sitemap when opened in a browser. Search engines ignore the stylesheet.
export const dynamic = 'force-dynamic';

// Hard-coded app routes. Add new folders under src/app here.
const STATIC_ROUTES = [
  '',
  '/about-us',
  '/career',
  '/contact-us',
  '/faq',
  '/gold-rate',
  '/sell-gold-for-cash',
  '/testimonials',
  '/blog',
  '/mobilevantab',
  '/privacy-policy',
  '/community',
];

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq: 'weekly' | 'monthly';
  priority: number;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toXml(urls: SitemapUrl[]): string {
  const body = urls
    .map((u) =>
      [
        '  <url>',
        `    <loc>${escapeXml(u.loc)}</loc>`,
        u.lastmod ? `    <lastmod>${escapeXml(u.lastmod)}</lastmod>` : null,
        `    <changefreq>${u.changefreq}</changefreq>`,
        `    <priority>${u.priority}</priority>`,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.muthootgoldpoint.com';
  const { blogPosts, pages } = await getSitemapContent();

  const staticUrls: SitemapUrl[] = STATIC_ROUTES.map((route) => ({
    loc: `${baseUrl}${route}`,
    changefreq: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  const blogUrls: SitemapUrl[] = blogPosts.map((post) => ({
    loc: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
    lastmod: post.updatedAt,
    changefreq: 'monthly',
    priority: 0.7,
  }));

  // CMS pages whose slug clashes with an app route are never served by [slug], so skip them.
  const pageUrls: SitemapUrl[] = pages
    .filter((page) => !STATIC_ROUTES.includes(`/${page.slug}`))
    .map((page) => ({
      loc: `${baseUrl}/${encodeURIComponent(page.slug)}`,
      lastmod: page.updatedAt,
      changefreq: 'weekly',
      priority: 0.7,
    }));

  return new Response(toXml([...staticUrls, ...blogUrls, ...pageUrls]), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
