import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.muthootgoldpoint.com';
  
  // Add core routes
  const routes = [
    '',
    '/about-us',
    '/career',
    '/contact-us',
    '/faq',
    '/gold-rate',
    '/sell-gold-for-cash',
    '/testimonials',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
