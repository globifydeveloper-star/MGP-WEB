import { cache } from 'react';

// Server: call Strapi directly (STRAPI_INTERNAL_URL). Browser: use the same-origin
// '/strapi' proxy route unless NEXT_PUBLIC_STRAPI_URL is set at build time.
const STRAPI_URL = (() => {
  const isServer = typeof window === 'undefined';
  const url =
    (isServer && process.env.STRAPI_INTERNAL_URL) ||
    process.env.NEXT_PUBLIC_STRAPI_URL ||
    (isServer ? 'http://localhost:1337' : '/strapi');
  return url.replace(/\/+$/, '');
})();
const PUBLIC_STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || '/strapi').replace(/\/+$/, '');
const REVALIDATE_INTERVAL = 60; // 60s ISR background refresh

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
  return url.startsWith('http') ? url : `${PUBLIC_STRAPI_URL}${url}`;
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

async function fetchStrapi<T>(
  endpoint: string,
  options?: RequestInit,
  errorMessage: string = 'fetch error'
): Promise<T | null> {
  if (process.env.NEXT_PHASE === 'phase-production-build') return null;
  try {
    const res = await fetch(`${STRAPI_URL}${endpoint}`, options);
    if (!res.ok) {
      console.warn(`${errorMessage}: Strapi responded with ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json?.data ?? null;
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error(errorMessage, err);
    return null;
  }
}

export const getBlogPosts = cache(async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchStrapi<any[]>('/api/blog-posts?populate=*&sort=publishedAt:desc', { cache: 'no-store' }, 'getBlogPosts');
  const arr = Array.isArray(data) ? data : [];
  return arr.map(normalizeBlogPost);
});

export const getCategories = cache(async function getCategories(): Promise<Category[]> {
  const data = await fetchStrapi<any[]>('/api/categories', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getCategories');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: unknown) => unwrap<Category>(entry));
});

export const getBlogPostBySlug = cache(async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await fetchStrapi<any[]>(`/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getBlogPostBySlug');
  const arr = Array.isArray(data) ? data : [];
  if (arr.length === 0) return null;
  return normalizeBlogPost(arr[0]);
});

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

export const getBlogPageSettings = cache(async function getBlogPageSettings(): Promise<BlogPageSettings | null> {
  const data = await fetchStrapi<any>('/api/blog-page-setting?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getBlogPageSettings');
  if (!data) return null;
  const flat = unwrap<Record<string, unknown>>(data);
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
});

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
  careerBenefits?: { id: number; title: string; desc?: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export const getCareerPageSettings = cache(async function getCareerPageSettings(): Promise<CareerPageSettingsData | null> {
  const data = await fetchStrapi<any>('/api/career-page-setting?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getCareerPageSettings');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    heroHeading: flat.heroHeading,
    heroSubheading: flat.heroSubheading,
    heroImage: getMediaUrl(flat.heroImage),
    cultureHeading: flat.cultureHeading,
    cultureDescription: flat.cultureDescription,
    careerBenefits: flat.careerBenefits,
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
  };
});

export const getJobDepartments = cache(async function getJobDepartments(): Promise<JobDepartment[]> {
  const data = await fetchStrapi<any[]>('/api/job-departments', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getJobDepartments');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => unwrap<JobDepartment>(entry));
});

export const getJobPositions = cache(async function getJobPositions(): Promise<JobPosition[]> {
  const data = await fetchStrapi<any[]>('/api/job-positions?populate=*&filters[isOpen][$eq]=true', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getJobPositions');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
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
});

export async function submitJobApplication(payload: {
  fullName: string;
  email: string;
  phone: string;
  experienceYears?: string;
  currentCity?: string;
  coverNote?: string;
  jobPosition?: string;
  resumeFile?: File | null;
}): Promise<{ success: boolean; error?: string }> {
  try {
    let res: Response;

    if (payload.resumeFile) {
      const formData = new FormData();
      const data = {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        experienceYears: payload.experienceYears,
        currentCity: payload.currentCity,
        coverNote: payload.coverNote,
        jobPosition: payload.jobPosition,
      };
      
      formData.append('data', JSON.stringify(data));
      formData.append('files.resume', payload.resumeFile, payload.resumeFile.name);

      res = await fetch(`${STRAPI_URL}/api/job-applications`, {
        method: 'POST',
        body: formData,
      });
    } else {
      res = await fetch(`${STRAPI_URL}/api/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }

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

export async function submitFormSubmission(payload: {
  name: string;
  phone: string;
  email?: string;
  branch?: string;
  branchCode?: string;
  enquiryType?: string;
  sourceForm?: string;
  purity?: string;
  weight?: string;
  details?: Record<string, any>;
}): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Submit to Gold Valuation Submissions
    const valuationRes = await fetch(`${STRAPI_URL}/api/gold-valuation-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          purity: payload.purity,
          weight: payload.weight,
          branch: payload.branch,
          sourceForm: payload.sourceForm,
          details: payload.details,
        }
      }),
    });

    if (!valuationRes.ok) {
      const errJson = await valuationRes.json().catch(() => ({}));
      return { success: false, error: errJson?.error?.message ?? `Server responded with ${valuationRes.status}` };
    }

    // 2. Mirror to All Leads
    const leadRes = await fetch(`${STRAPI_URL}/api/all-leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: {
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          formSource: 'Gold Rate Check',
          sourceFormDetail: payload.sourceForm,
          branch: payload.branch,
          branchCode: payload.branchCode,
          extraData: payload.details,
        }
      }),
    });

    // We don't fail the primary submission if mirroring fails, but we can log it
    if (!leadRes.ok) {
      console.error('Failed to mirror to all-leads:', await leadRes.text());
    }

    return { success: true };
  } catch (err) {
    console.error('submitFormSubmission error:', err);
    return { success: false, error: 'Network error submitting form.' };
  }
}

// --- HOMEPAGE CONTENT CONTROL TYPES & ACCESSORS ---

export interface HomeVideoItem {
  id?: number;
  code: string;
  label: string;
  poster?: string | null;
  video?: string | null;
  videoUrl?: string | null;
}

export interface HomepageData {
  heroFirstSlideImage?: string;
  processSectionImage?: string;
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
  seoKeywords?: string;
  ogImage?: string;
  hideFooter?: boolean;
  hideNavbar?: boolean;
  homeVideos?: HomeVideoItem[];
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

export const getHomepageData = cache(async function getHomepageData(): Promise<HomepageData | null> {
  const data = await fetchStrapi<any>(
    '/api/homepage?populate[heroFirstSlideImage]=true&populate[processSectionImage]=true&populate[vanImage]=true&populate[ogImage]=true&populate[homeVideos][populate]=*',
    { cache: 'no-store' },
    'getHomepageData'
  );
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    heroFirstSlideImage: getMediaUrl(flat.heroFirstSlideImage),
    processSectionImage: getMediaUrl(flat.processSectionImage),
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
    hideFooter: flat.hideFooter ?? false,
    homeVideos: Array.isArray(flat.homeVideos)
      ? flat.homeVideos.map((item: any) => ({
        id: item.id,
        code: item.code,
        label: item.label,
        poster: getMediaUrl(item.poster),
        video: getMediaUrl(item.video) ?? item.videoUrl ?? null,
        videoUrl: item.videoUrl,
      }))
      : undefined,
  };
});

export interface SharedMediaData {
  goldValueFormImage?: string;
}

export const getSharedMedia = cache(async function getSharedMedia(): Promise<SharedMediaData | null> {
  const data = await fetchStrapi<any>('/api/shared-media?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getSharedMedia');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    goldValueFormImage: getMediaUrl(flat.goldValueFormImage),
  };
});

export interface GlobalStatsData {
  branchesValue: string;
  branchesLabel: string;
  legacyValue: string;
  legacyLabel: string;
  employeesValue: string;
  employeesLabel: string;
  customersValue: string;
  customersLabel: string;
}

export const getGlobalStats = cache(async function getGlobalStats(): Promise<GlobalStatsData | null> {
  const data = await fetchStrapi<any>('/api/global-stat', { cache: 'no-store' }, 'getGlobalStats');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    branchesValue: flat.branchesValue,
    branchesLabel: flat.branchesLabel,
    legacyValue: flat.legacyValue,
    legacyLabel: flat.legacyLabel,
    employeesValue: flat.employeesValue,
    employeesLabel: flat.employeesLabel,
    customersValue: flat.customersValue,
    customersLabel: flat.customersLabel,
  };
});

export const getHeroSlides = cache(async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await fetchStrapi<any[]>('/api/hero-slides?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getHeroSlides');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
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
});

export const getProcessSteps = cache(async function getProcessSteps(): Promise<ProcessStep[]> {
  const data = await fetchStrapi<any[]>('/api/process-steps?populate=*&sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getProcessSteps');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
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
});

export const getDifferenceBoxes = cache(async function getDifferenceBoxes(): Promise<DifferenceBox[]> {
  const data = await fetchStrapi<any[]>('/api/difference-boxes?populate=*&sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getDifferenceBoxes');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
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
});

export interface ComparisonRow {
  id: number;
  order: number;
  title?: string;
  mgpText?: string;
  tradText?: string;
}

export const getComparisonRows = cache(async function getComparisonRows(): Promise<ComparisonRow[]> {
  const data = await fetchStrapi<any[]>('/api/comparison-rows?sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getComparisonRows');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
    const flat = unwrap<any>(entry);
    return {
      id: flat.id,
      order: flat.order ?? 0,
      title: flat.title,
      mgpText: flat.mgpText,
      tradText: flat.tradText,
    };
  });
});

export const getPromoSlides =cache(async function getPromoSlides(): Promise<PromoSlide[]> {
  const data = await fetchStrapi<any[]>('/api/promo-slides?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getPromoSlides');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
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
});

export const getTestimonials = cache(async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchStrapi<any[]>('/api/testimonials?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getTestimonials');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
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
});

export const getFaqs = cache(async function getFaqs(section: 'home' | 'gold-rate' = 'home'): Promise<FAQ[]> {
  const data = await fetchStrapi<any[]>(`/api/faqs?filters[section][$eq]=${section}&populate=*&sort=order:asc`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFaqs');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
    const flat = unwrap<any>(entry);
    return {
      id: flat.id,
      question: flat.question,
      answer: flat.answer,
      section: flat.section ?? 'home',
      order: flat.order ?? 0,
    };
  });
});

export interface DynamicPageSection {
  id: number;
  __component: string;
  [key: string]: any;
}

export interface DynamicPage {
  id: number;
  title: string;
  slug: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: { url: string };
  sections: DynamicPageSection[];
  hideFooter?: boolean;
  hideNavbar?: boolean;
}

export const getPageBySlug = cache(async function getPageBySlug(slug: string): Promise<DynamicPage | null> {
  const data = await fetchStrapi<any[]>(`/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[sections][populate]=*`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getPageBySlug');
  const arr = Array.isArray(data) ? data : [];
  if (arr.length === 0) return null;
  const flat = unwrap<any>(arr[0]);
  const rawSections = Array.isArray(flat.sections) ? flat.sections : [];
  const sections = rawSections.map((sec: any) => unwrap<DynamicPageSection>(sec));
  return {
    id: flat.id,
    title: flat.title,
    slug: flat.slug,
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    ogImage: flat.ogImage ? { url: resolveMediaUrl(flat.ogImage.url) ?? flat.ogImage.url } : undefined,
    sections,
    hideFooter: flat.hideFooter ?? false,
  };
});


export const getFaqsByPage = cache(async function getFaqsByPage(pageId: number): Promise<FAQ[]> {
  const data = await fetchStrapi<any[]>(`/api/faqs?filters[page][id][$eq]=${pageId}&populate=*&sort=order:asc`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFaqsByPage');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: any) => {
    const flat = unwrap<any>(entry);
    return {
      id: flat.id,
      question: flat.question,
      answer: flat.answer,
      section: flat.section ?? 'home',
      order: flat.order ?? 0,
    };
  });
});

export interface AboutUsPageData {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroChecklist?: { id: number; text: string }[];
  heroStats?: { id: number; label: string; number: string }[];
  heroImages?: string[];
  recyclingSubtitle?: string;
  recyclingTitle?: string;
  recyclingDescription?: string;
  recyclingSteps?: { id: number; title: string; desc?: string; iconSvg?: string }[];
  historySubtitle?: string;
  historyTitle?: string;
  historyDescription?: string;
  historyMilestones?: { id: number; year?: string; title: string; desc?: string }[];
  parentEyebrow?: string;
  parentTitle?: string;
  parentDescription?: string;
  parentChecklist?: { id: number; text: string }[];
  parentCompareHeading?: string;
  parentStats?: { id: number; label: string; number: string }[];
  parentPortraitImage?: string;
  philanthropySubtitle?: string;
  philanthropyTitle?: string;
  philanthropyDescription?: string;
  philanthropyInitiativeTitle?: string;
  philanthropyInitiativeDesc?: string;
  philanthropyPillars?: { id: number; letter?: string; title: string; desc?: string; iconSvg?: string }[];
  philanthropyConclusion?: string;
  presentSubtitle?: string;
  presentTitle?: string;
  presentDescription?: string;
  presentSubDescription?: string;
  presentCardTag?: string;
  presentCardTitle?: string;
  presentCardDesc?: string;
  presentServicesTitle?: string;
  presentServices?: { id: number; title: string; icon?: string }[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideFooter?: boolean;
  hideNavbar?: boolean;
}

export const getAboutUsPage = cache(async function getAboutUsPage(): Promise<AboutUsPageData | null> {
  const data = await fetchStrapi<any>('/api/about-us-page?populate=*', { cache: 'no-store' }, 'getAboutUsPage');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    heroEyebrow: flat.heroEyebrow,
    heroTitle: flat.heroTitle,
    heroDescription: flat.heroDescription,
    heroButtonText: flat.heroButtonText,
    heroButtonLink: flat.heroButtonLink,
    heroChecklist: flat.heroChecklist,
    heroStats: flat.heroStats,
    heroImages: Array.isArray(flat.heroImages) ? flat.heroImages.map(getMediaUrl).filter(Boolean) as string[] : undefined,
    recyclingSubtitle: flat.recyclingSubtitle,
    recyclingTitle: flat.recyclingTitle,
    recyclingDescription: flat.recyclingDescription,
    recyclingSteps: flat.recyclingSteps,
    historySubtitle: flat.historySubtitle,
    historyTitle: flat.historyTitle,
    historyDescription: flat.historyDescription,
    historyMilestones: flat.historyMilestones,
    parentEyebrow: flat.parentEyebrow,
    parentTitle: flat.parentTitle,
    parentDescription: flat.parentDescription,
    parentChecklist: flat.parentChecklist,
    parentCompareHeading: flat.parentCompareHeading,
    parentStats: flat.parentStats,
    parentPortraitImage: getMediaUrl(flat.parentPortraitImage),
    philanthropySubtitle: flat.philanthropySubtitle,
    philanthropyTitle: flat.philanthropyTitle,
    philanthropyDescription: flat.philanthropyDescription,
    philanthropyInitiativeTitle: flat.philanthropyInitiativeTitle,
    philanthropyInitiativeDesc: flat.philanthropyInitiativeDesc,
    philanthropyPillars: flat.philanthropyPillars,
    philanthropyConclusion: flat.philanthropyConclusion,
    presentSubtitle: flat.presentSubtitle,
    presentTitle: flat.presentTitle,
    presentDescription: flat.presentDescription,
    presentSubDescription: flat.presentSubDescription,
    presentCardTag: flat.presentCardTag,
    presentCardTitle: flat.presentCardTitle,
    presentCardDesc: flat.presentCardDesc,
    presentServicesTitle: flat.presentServicesTitle,
    presentServices: flat.presentServices,
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    ogImage: getMediaUrl(flat.ogImage),
    hideFooter: flat.hideFooter ?? false,
  };
});

export interface ContactUsPageData {
  heroHeading?: string;
  heroLead?: string;
  heroImage?: string;
  formTitle?: string;
  formServices?: { id: number; text: string }[];
  officeName?: string;
  officeAddress?: string;
  officePhone1?: string;
  officePhone2?: string;
  officeEmail?: string;
  officeMapUrl?: string;
  officeMapPopupTitle?: string;
  officeMapPopupText?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideFooter?: boolean;
  hideNavbar?: boolean;
}

export const getContactUsPage = cache(async function getContactUsPage(): Promise<ContactUsPageData | null> {
  const data = await fetchStrapi<any>('/api/contact-us-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getContactUsPage');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    heroHeading: flat.heroHeading,
    heroLead: flat.heroLead,
    heroImage: getMediaUrl(flat.heroImage),
    formTitle: flat.formTitle,
    formServices: flat.formServices,
    officeName: flat.officeName,
    officeAddress: flat.officeAddress,
    officePhone1: flat.officePhone1,
    officePhone2: flat.officePhone2,
    officeEmail: flat.officeEmail,
    officeMapUrl: flat.officeMapUrl,
    officeMapPopupTitle: flat.officeMapPopupTitle,
    officeMapPopupText: flat.officeMapPopupText,
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    ogImage: getMediaUrl(flat.ogImage),
    hideFooter: flat.hideFooter ?? false,
  };
});

export interface NavItem {
  id?: number;
  label: string;
  url: string;
  isExternal?: boolean;
  isButton?: boolean;
  page?: { slug: string };
}


export interface FooterSetting {
  quickLinks: NavItem[];
  legalLinks: NavItem[];
  footerDescription?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  officeAddress?: string;
  officeHours?: string;
  tollFreeNumber?: string;
  copyrightText?: string;
}

export const getFooterSetting = cache(async function getFooterSetting(): Promise<FooterSetting | null> {
  const data = await fetchStrapi<any>('/api/footer-setting?populate[quickLinks][populate]=*&populate[legalLinks][populate]=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFooterSetting');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    quickLinks: Array.isArray(flat.quickLinks) ? flat.quickLinks : [],
    legalLinks: Array.isArray(flat.legalLinks) ? flat.legalLinks : [],
    footerDescription: flat.footerDescription,
    facebookUrl: flat.facebookUrl,
    instagramUrl: flat.instagramUrl,
    youtubeUrl: flat.youtubeUrl,
    linkedinUrl: flat.linkedinUrl,
    twitterUrl: flat.twitterUrl,
    officeAddress: flat.officeAddress,
    officeHours: flat.officeHours,
    tollFreeNumber: flat.tollFreeNumber,
    copyrightText: flat.copyrightText,
  };
});

export interface NavbarSetting {
  navLinks: NavItem[];
  phoneNumber?: string;
  phoneRaw?: string;
  ctaLabel?: string;
}

export async function getNavbarSetting(): Promise<NavbarSetting | null> {
  const data = await fetchStrapi<any>('/api/navbar-setting?populate[navLinks][populate]=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getNavbarSetting');
  if (!data) return null;
  const flat = unwrap<any>(data);
  const rawLinks = Array.isArray(flat.navLinks) ? flat.navLinks : [];
  const navLinks = rawLinks.map((item: any) => {
    const flatItem = unwrap<any>(item);
    const page = flatItem.page ? unwrap<any>(flatItem.page) : undefined;
    return {
      id: flatItem.id,
      label: flatItem.label,
      url: flatItem.url,
      isExternal: Boolean(flatItem.isExternal),
      isButton: Boolean(flatItem.isButton),
      page: page ? { slug: page.slug } : undefined,
    };
  });
  return {
    navLinks,
    phoneNumber: flat.phoneNumber,
    phoneRaw: flat.phoneRaw,
    ctaLabel: flat.ctaLabel,
  };
}


export interface GoldRatePageData {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideFooter?: boolean;
  hideNavbar?: boolean;
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
  whyGoldRateChangesImage?: string;
  faqs?: FAQ[];
}

export const getGoldRatePage = cache(async function getGoldRatePage(): Promise<GoldRatePageData | null> {
  const data = await fetchStrapi<any>('/api/gold-rate-page?populate=ogImage,faqs,heroImage,whyGoldRateChangesImage', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getGoldRatePage');
  if (!data) return null;
  const flat = unwrap<any>(data);
  const ogImageRaw = flat.ogImage ? unwrap<any>(flat.ogImage) : undefined;
  return {
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    ogImage: ogImageRaw?.url ? (resolveMediaUrl(ogImageRaw.url) ?? ogImageRaw.url) : undefined,
    hideFooter: Boolean(flat.hideFooter),
    hideNavbar: Boolean(flat.hideNavbar),
    heroTitle: flat.heroTitle,
    heroDescription: flat.heroDescription,
    heroImage: getMediaUrl(flat.heroImage),
    whyGoldRateChangesImage: getMediaUrl(flat.whyGoldRateChangesImage),
    faqs: Array.isArray(flat.faqs) ? flat.faqs.map(unwrap) : [],
  };
});

export interface MobileVanPageData {
  heroHeadingLight1?: string;
  heroHeadingLight2?: string;
  heroHeadingBold?: string;
  heroDescription?: string;
  howItWorksSubtitle?: string;
  howItWorksTitle?: string;
  howItWorksSteps?: { id: number; title: string; desc?: string; iconSvg?: string }[];
  testingMethodsTitle?: string;
  testingMethods?: { id: number; title: string; desc?: string }[];
  locationsTitle?: string;
  locationsDescription?: string;
  appointmentTitle?: string;
  appointmentDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  heroImage?: string;
  testingMethodsImage?: string;
  bookVanFormImage?: string;
  ogImage?: string;
}

export const getMobileVanPageSettings = cache(async function getMobileVanPageSettings(): Promise<MobileVanPageData | null> {
  const data = await fetchStrapi<any>('/api/mobile-van-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    ...(flat as MobileVanPageData),
    heroImage: getMediaUrl(flat.heroImage),
    testingMethodsImage: getMediaUrl(flat.testingMethodsImage),
    bookVanFormImage: getMediaUrl(flat.bookVanFormImage),
  };
});

export interface SellGoldPageSettings {
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  heroImage?: string;
  overviewImage1?: string;
  overviewImage2?: string;
}

export const getSellGoldPageSettings = cache(async function getSellGoldPageSettings(): Promise<SellGoldPageSettings | null> {
  const data = await fetchStrapi<any>('/api/sell-gold-page-setting?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getSellGoldPageSettings');
  if (!data) return null;
  const flat = unwrap<Record<string, any>>(data);
  return {
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    seoKeywords: flat.seoKeywords,
    ogImage: getMediaUrl(flat.ogImage),
    heroImage: getMediaUrl(flat.heroImage),
    overviewImage1: getMediaUrl(flat.overviewImage1),
    overviewImage2: getMediaUrl(flat.overviewImage2),
  };
});

