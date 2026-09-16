const fs = require('fs');
const tsFile = 'd:/MGP/MGP-WEB/src/lib/strapi.ts';
let content = fs.readFileSync(tsFile, 'utf8');

// Add seoKeywords to all seoDescription interfaces
content = content.replaceAll('seoDescription?: string;', 'seoDescription?: string;\n  seoKeywords?: string;');

// Add seoKeywords mapping to all seoDescription mappings
content = content.replaceAll('seoDescription: flat.seoDescription,', 'seoDescription: flat.seoDescription,\n      seoKeywords: flat.seoKeywords,');

// Specifically add ogImage to MobileVanPageData interface
content = content.replace('seoKeywords?: string;\n  heroImage?: string;', 'seoKeywords?: string;\n  ogImage?: string;\n  heroImage?: string;');

// Specifically add ogImage mapping to getMobileVanPageSettings
content = content.replace('...(flat as MobileVanPageData),\n      heroImage: getMediaUrl(flat.heroImage),', '...(flat as MobileVanPageData),\n      ogImage: getMediaUrl(flat.ogImage),\n      heroImage: getMediaUrl(flat.heroImage),');

const appendCode = `

export interface SellGoldPageSettings {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
}

export const getSellGoldPageSettings = cache(async function getSellGoldPageSettings(): Promise<SellGoldPageSettings | null> {
  try {
    const res = await fetch(\`\${STRAPI_URL}/api/sell-gold-page-setting?populate=*\`, {
      next: { revalidate: REVALIDATE_INTERVAL },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.data) return null;
    const flat = unwrap<Record<string, any>>(json.data);
    return {
      seoTitle: flat.seoTitle,
      seoDescription: flat.seoDescription,
      seoKeywords: flat.seoKeywords,
      ogImage: getMediaUrl(flat.ogImage),
    };
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getSellGoldPageSettings: failed to fetch', err);
    return null;
  }
});
`;

content += appendCode;

fs.writeFileSync(tsFile, content);
console.log('Fixed safely via JS script!');
