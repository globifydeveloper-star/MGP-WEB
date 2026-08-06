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

export interface BlogPageSettings {
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: {
    url: string;
    mime: string;
  };
  seoTitle?: string;
  seoDescription?: string;
  noPostsMessage?: string;
  noPostsInCategoryMessage?: string;
  allCategoryLabel?: string;
  readMoreLabel?: string;
  backToBlogLabel?: string;
  relatedArticlesHeading?: string;
  sortNewestLabel?: string;
  sortOldestLabel?: string;
}

export async function getBlogPageSettings(): Promise<BlogPageSettings | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/blog-page-setting?populate=*`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getBlogPageSettings: Strapi responded with ${res.status} (using default fallbacks)`);
      return null;
    }
    const json = await res.json();
    if (!json?.data) return null;
    const flat = unwrap<Record<string, unknown>>(json.data);
    const heroImageRaw = flat.heroImage ? unwrap<{ url: string; mime: string }>(flat.heroImage) : undefined;
    return {
      heroHeading: flat.heroHeading as string | undefined,
      heroSubheading: flat.heroSubheading as string | undefined,
      heroImage: heroImageRaw
        ? { url: resolveMediaUrl(heroImageRaw.url) ?? heroImageRaw.url, mime: heroImageRaw.mime }
        : undefined,
      seoTitle: flat.seoTitle as string | undefined,
      seoDescription: flat.seoDescription as string | undefined,
      noPostsMessage: flat.noPostsMessage as string | undefined,
      noPostsInCategoryMessage: flat.noPostsInCategoryMessage as string | undefined,
      allCategoryLabel: flat.allCategoryLabel as string | undefined,
      readMoreLabel: flat.readMoreLabel as string | undefined,
      backToBlogLabel: flat.backToBlogLabel as string | undefined,
      relatedArticlesHeading: flat.relatedArticlesHeading as string | undefined,
      sortNewestLabel: flat.sortNewestLabel as string | undefined,
      sortOldestLabel: flat.sortOldestLabel as string | undefined,
    };
  } catch (err) {
    if (isDynamicServerError(err)) {
      throw err;
    }
    console.error('getBlogPageSettings: failed to fetch settings', err);
    return null;
  }
}

// --- CAREER MODULE ACCESSORS ---

export interface JobDepartment {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
}

export interface JobPosition {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  department?: JobDepartment;
  location?: string;
  employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experienceLevel?: string;
  summary?: string;
  description?: string;
  responsibilities?: string;
  requirements?: string;
  isOpen?: boolean;
  deadline?: string;
  postedDate?: string;
}

export interface CareerPageSettingsData {
  heroHeading?: string;
  heroSubheading?: string;
  heroImage?: string;
  cultureHeading?: string;
  cultureDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export async function getCareerPageSettings(): Promise<CareerPageSettingsData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/career-page-setting?populate=*`, { cache: 'no-store' });
    if (!res.ok) return null;
    const json = await res.json();
    if (!json?.data) return null;
    const flat = unwrap<Record<string, any>>(json.data);
    return {
      heroHeading: flat.heroHeading,
      heroSubheading: flat.heroSubheading,
      heroImage: getMediaUrl(flat.heroImage),
      cultureHeading: flat.cultureHeading,
      cultureDescription: flat.cultureDescription,
      seoTitle: flat.seoTitle,
      seoDescription: flat.seoDescription,
    };
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getCareerPageSettings error:', err);
    return null;
  }
}

export async function getJobDepartments(): Promise<JobDepartment[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/job-departments`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => unwrap<JobDepartment>(entry));
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getJobDepartments error:', err);
    return [];
  }
}

export async function getJobPositions(): Promise<JobPosition[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/job-positions?populate=*&filters[isOpen][$eq]=true`, { cache: 'no-store' });
    if (!res.ok) return [];
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      const department = flat.department ? unwrap<JobDepartment>(flat.department) : undefined;
      return {
        id: flat.id,
        documentId: flat.documentId ?? String(flat.id),
        title: flat.title,
        slug: flat.slug,
        department,
        location: flat.location,
        employmentType: flat.employmentType,
        experienceLevel: flat.experienceLevel,
        summary: flat.summary,
        description: flat.description,
        responsibilities: flat.responsibilities,
        requirements: flat.requirements,
        isOpen: flat.isOpen ?? true,
        deadline: flat.deadline,
        postedDate: flat.postedDate,
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getJobPositions error:', err);
    return [];
  }
}

export async function submitJobApplication(payload: {
  fullName: string;
  email: string;
  phone: string;
  experienceYears?: string;
  currentCity?: string;
  coverNote?: string;
  jobPosition?: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/job-applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return { success: false, error: errJson?.error?.message ?? `Server responded with ${res.status}` };
    }
    return { success: true };
  } catch (err) {
    console.error('submitJobApplication error:', err);
    return { success: false, error: 'Network error submitting application.' };
  }
}

// --- HOMEPAGE CONTENT CONTROL TYPES & ACCESSORS ---

export interface HomepageData {
  heroFirstSlideImage?: string;
  processSectionImage?: string;
  estimateGoldImage?: string;
  estimateGoldHeading?: string;
  estimateGoldHeadingHighlight?: string;
  estimateGoldNote?: string;
  vanHeadingLight?: string;
  vanHeadingBold?: string;
  vanDescription?: string;
  vanButtonLabel?: string;
  vanImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface HeroSlide {
  id: number;
  heroText?: string;
  heroImage?: string;
  slideLink?: string;
  button1?: CTA;
  button2?: CTA;
}

export interface ProcessStep {
  id: number;
  order: number;
  stepTitle?: string;
  stepDescription?: string;
  leftDescription?: string;
  stepImage?: string;
}

export interface DifferenceBox {
  id: number;
  boxTitle?: string;
  boxDescription?: string;
  boxImage?: string;
  order: number;
  iconType: 'flask' | 'scale' | 'rupee' | 'default';
}

export interface PromoSlide {
  id: number;
  creativeImage?: string;
  heading?: string;
  highlight?: string;
  description?: string;
  button?: CTA;
}

export interface Testimonial {
  id: number;
  customerName: string;
  location?: string;
  profilePicture?: string;
  rating: number;
  testimonialText: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  section: 'home' | 'gold-rate';
  order: number;
}

export interface State {
  id: number;
  name: string;
  branches: Branch[];
}

export interface Branch {
  id: number;
  name: string;
  address: string;
  city: string;
  pincode: string;
  timing: string;
  lat: number;
  lng: number;
  viewDirectionsLink: string;
  contactInfo?: string;
  state?: { id: number; name: string };
}

function getMediaUrl(media: any): string | undefined {
  if (!media) return undefined;
  const flat = unwrap<{ url: string }>(media);
  return flat?.url ? (resolveMediaUrl(flat.url) ?? flat.url) : undefined;
}

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/homepage?populate=*`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getHomepageData: Strapi responded with ${res.status}`);
      return null;
    }
    const json = await res.json();
    if (!json?.data) return null;
    const flat = unwrap<Record<string, any>>(json.data);
    return {
      heroFirstSlideImage: getMediaUrl(flat.heroFirstSlideImage),
      processSectionImage: getMediaUrl(flat.processSectionImage),
      estimateGoldImage: getMediaUrl(flat.estimateGoldImage),
      estimateGoldHeading: flat.estimateGoldHeading,
      estimateGoldHeadingHighlight: flat.estimateGoldHeadingHighlight,
      estimateGoldNote: flat.estimateGoldNote,
      vanHeadingLight: flat.vanHeadingLight,
      vanHeadingBold: flat.vanHeadingBold,
      vanDescription: flat.vanDescription,
      vanButtonLabel: flat.vanButtonLabel,
      vanImage: getMediaUrl(flat.vanImage),
      seoTitle: flat.seoTitle,
      seoDescription: flat.seoDescription,
      ogImage: getMediaUrl(flat.ogImage),
    };
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getHomepageData: failed to fetch homepage settings', err);
    return null;
  }
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/hero-slides?populate=*`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getHeroSlides: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      return {
        id: flat.id,
        heroText: flat.heroText,
        heroImage: getMediaUrl(flat.heroImage),
        slideLink: flat.slideLink,
        button1: flat.button1,
        button2: flat.button2,
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getHeroSlides: failed to fetch hero slides', err);
    return [];
  }
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/process-steps?populate=*&sort=order:asc`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getProcessSteps: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      return {
        id: flat.id,
        order: flat.order ?? 0,
        stepTitle: flat.stepTitle,
        stepDescription: flat.stepDescription,
        leftDescription: flat.leftDescription,
        stepImage: getMediaUrl(flat.stepImage),
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getProcessSteps: failed to fetch process steps', err);
    return [];
  }
}

export async function getDifferenceBoxes(): Promise<DifferenceBox[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/difference-boxes?populate=*&sort=order:asc`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getDifferenceBoxes: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      return {
        id: flat.id,
        boxTitle: flat.boxTitle,
        boxDescription: flat.boxDescription,
        boxImage: getMediaUrl(flat.boxImage),
        order: flat.order ?? 0,
        iconType: flat.iconType ?? 'default',
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getDifferenceBoxes: failed to fetch difference boxes', err);
    return [];
  }
}

export async function getPromoSlides(): Promise<PromoSlide[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/promo-slides?populate=*`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getPromoSlides: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      return {
        id: flat.id,
        creativeImage: getMediaUrl(flat.creativeImage),
        heading: flat.heading,
        highlight: flat.highlight,
        description: flat.description,
        button: flat.button,
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getPromoSlides: failed to fetch promo slides', err);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/testimonials?populate=*`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getTestimonials: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      return {
        id: flat.id,
        customerName: flat.customerName,
        location: flat.location,
        profilePicture: getMediaUrl(flat.profilePicture),
        rating: flat.rating ?? 5,
        testimonialText: flat.testimonialText,
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getTestimonials: failed to fetch testimonials', err);
    return [];
  }
}

export async function getFaqs(section: 'home' | 'gold-rate' = 'home'): Promise<FAQ[]> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/faqs?filters[section][$eq]=${section}&populate=*&sort=order:asc`,
      { cache: 'no-store' }
    );
    if (!res.ok) {
      console.warn(`getFaqs: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      return {
        id: flat.id,
        question: flat.question,
        answer: flat.answer,
        section: flat.section ?? 'home',
        order: flat.order ?? 0,
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getFaqs: failed to fetch FAQs', err);
    return [];
  }
}

export async function getStatesAndBranches(): Promise<State[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/states?populate[branches][populate]=*`, { cache: 'no-store' });
    if (!res.ok) {
      console.warn(`getStatesAndBranches: Strapi responded with ${res.status}`);
      return [];
    }
    const json = await res.json();
    const data = Array.isArray(json?.data) ? json.data : [];
    return data.map((entry: any) => {
      const flat = unwrap<any>(entry);
      const rawBranches = Array.isArray(flat.branches) ? flat.branches : [];
      const branches = rawBranches.map((b: any) => {
        const flatB = unwrap<any>(b);
        return {
          id: flatB.id,
          name: flatB.name,
          address: flatB.address,
          city: flatB.city,
          pincode: flatB.pincode,
          timing: flatB.timing,
          lat: Number(flatB.lat),
          lng: Number(flatB.lng),
          viewDirectionsLink: flatB.viewDirectionsLink,
          contactInfo: flatB.contactInfo,
        };
      });
      return {
        id: flat.id,
        name: flat.name,
        branches,
      };
    });
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getStatesAndBranches: failed to fetch states/branches', err);
    return [];
  }
}
