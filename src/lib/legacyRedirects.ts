// Old URL → new URL map for the WordPress → Next.js migration.
// Applied in src/proxy.ts so every old URL lands on its final page in ONE redirect hop
// (old WordPress URLs end in "/", so next.config redirects would chain: /faqs/ → /faqs → /faq).
//
// Keys are old paths WITHOUT a trailing slash. Only map pages with a clear new equivalent;
// never map a path that a Strapi CMS page ([slug]) may serve, or the redirect will hide it.
export const LEGACY_REDIRECTS: Record<string, string> = {
  // Homepage aliases
  '/home': '/',
  '/index.php': '/',
  '/index.html': '/',

  // FAQ
  '/faqs': '/faq',
  '/faq.php': '/faq',
  '/faq.html': '/faq',

  // About / contact
  '/about-us.php': '/about-us',
  '/about-us.html': '/about-us',
  '/contact-us.php': '/contact-us',
  '/contact-us.html': '/contact-us',

  // Sell gold
  '/sell-gold': '/sell-gold-for-cash',
  '/sell-gold.php': '/sell-gold-for-cash',
  '/sell-gold.html': '/sell-gold-for-cash',

  // Branches live on the homepage
  '/branches': '/#branches',
  '/branch-locator': '/#branches',

  // Renamed pages
  '/mobile-van': '/mobilevantab',
  '/gold-rate-price-calculator': '/gold-rate',
  '/online-gold-rate-price-jewellery-ornament': '/gold-rate',

  // Blog slugs that changed on import. The old WordPress slug used Cyrillic "е" (U+0435).
  '/blog/unlocking-thе-valuе-of-your-gold-jеwеlry-sеlling-gold-in-thane':
    '/blog/unlocking-th-valu-of-your-gold-j-w-lry-s-lling-gold-in-thane',
};

// Prefix rules for whole sections that no longer exist as separate pages.
const LEGACY_PREFIX_REDIRECTS: Array<[prefix: string, destination: string]> = [
  ['/blog/tag/', '/blog'], // WordPress tag archives
  ['/blog/testimonials/', '/testimonials'], // individual testimonial posts
];

/** Returns the new path for an old path (trailing slash already stripped), or null. */
export function resolveLegacyRedirect(pathname: string): string | null {
  // Keys are decoded; incoming paths arrive percent-encoded (e.g. %D0%B5).
  let decoded = pathname;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    // Malformed encoding: fall back to the raw path.
  }
  const exact = LEGACY_REDIRECTS[decoded] ?? LEGACY_REDIRECTS[pathname];
  if (exact) return exact;

  for (const [prefix, destination] of LEGACY_PREFIX_REDIRECTS) {
    if (pathname.startsWith(prefix)) return destination;
  }
  return null;
}
