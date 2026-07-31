const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface CTA {
  enabled: boolean;
  label?: string;
  link?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  coverMedia?: {
    url: string;
    mime: string;
  };
  category: Category;
  excerpt?: string;
  body: string;
  metaTitle?: string;
  metaDescription?: string;
  publishedAt: string;
  cta?: CTA;
}

// Strapi v4 nests fields under `.attributes`; v5 returns them flat on the entry.
// Normalize both shapes to a flat object so the rest of the app doesn't care which version is live.
function unwrap<T>(entry: unknown): T {
  if (entry && typeof entry === 'object' && 'attributes' in entry) {
    const { id, attributes } = entry as { id: number; attributes: object };
    return { id, ...attributes } as T;
  }
  return entry as T;
}

function resolveMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

function normalizeBlogPost(raw: unknown): BlogPost {
  const flat = unwrap<Record<string, unknown>>(raw);
  const category = flat.category ? unwrap<Category>(flat.category) : undefined;
  const coverMediaRaw = flat.coverMedia ? unwrap<{ url: string; mime: string }>(flat.coverMedia) : undefined;

  return {
    id: flat.id as number,
    title: flat.title as string,
    slug: flat.slug as string,
    coverMedia: coverMediaRaw
      ? { url: resolveMediaUrl(coverMediaRaw.url) ?? coverMediaRaw.url, mime: coverMediaRaw.mime }
      : undefined,
    category: category as Category,
    excerpt: flat.excerpt as string | undefined,
    body: flat.body as string,
    metaTitle: flat.metaTitle as string | undefined,
    metaDescription: flat.metaDescription as string | undefined,
    publishedAt: flat.publishedAt as string,
    cta: flat.cta as CTA | undefined,
  };
}

function isDynamicServerError(err: any): boolean {
  return (
    err &&
    typeof err === 'object' &&
    (err.digest === 'DYNAMIC_SERVER_USAGE' || err.message?.includes('Dynamic server usage'))
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*&sort=publishedAt:desc`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error(`getBlogPosts: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map(normalizeBlogPost);
  } catch (err) {
    if (isDynamicServerError(err)) {
      throw err;
    }
    console.error('getBlogPosts: failed to fetch blog posts', err);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/categories`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`getCategories: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: unknown) => unwrap<Category>(entry));
  } catch (err) {
    if (isDynamicServerError(err)) {
      throw err;
    }
    console.error('getCategories: failed to fetch categories', err);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      console.error(`getBlogPostBySlug: Strapi responded with ${res.status}`);
      return null;
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    if (data.length === 0) return null;
    return normalizeBlogPost(data[0]);
  } catch (err) {
    if (isDynamicServerError(err)) {
      throw err;
    }
    console.error('getBlogPostBySlug: failed to fetch blog post', err);
    return null;
  }
}

