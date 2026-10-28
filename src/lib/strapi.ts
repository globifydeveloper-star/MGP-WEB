import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { assertVerifiedToken, VerificationError } from '@/lib/otpToken';
import { getStrapiUrl } from '@/lib/strapiUrl';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StrapiAny = any;

const PUBLIC_STRAPI_URL = (process.env.STRAPI_PUBLIC_URL || process.env.STRAPI_URL || '/strapi').replace(/\/+$/, '');
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
      ? (() => {
          const resolved = resolveMediaUrl(coverMediaRaw.url);
          return resolved ? { url: resolved, mime: coverMediaRaw.mime } : undefined;
        })()
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

function isDynamicServerError(err: StrapiAny): boolean {
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
    const res = await fetch(`${getStrapiUrl()}${endpoint}`, options);
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
  if (process.env.NEXT_PHASE === 'phase-production-build') return [];
  const pageSize = 100; // matches Strapi's config/api.ts maxLimit
  const all: StrapiAny[] = [];
  let page = 1;
  try {
    while (true) {
      const res = await fetch(
        `${getStrapiUrl()}/api/blog-posts?populate=*&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        { cache: 'no-store' }
      );
      if (!res.ok) {
        console.warn(`getBlogPosts: Strapi responded with ${res.status}`);
        break;
      }
      const json = await res.json();
      const batch = Array.isArray(json?.data) ? json.data : [];
      all.push(...batch);
      const pageCount = json?.meta?.pagination?.pageCount ?? 1;
      if (batch.length === 0 || page >= pageCount) break;
      page++;
    }
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error('getBlogPosts', err);
  }
  return all.map(normalizeBlogPost);
});

export const getCategories = cache(async function getCategories(): Promise<Category[]> {
  const data = await fetchStrapi<StrapiAny[]>('/api/categories', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getCategories');
  const arr = Array.isArray(data) ? data : [];
  const categories = arr.map((entry: unknown) => unwrap<Category>(entry));

  // Strapi can return the same category more than once (e.g. duplicate slugs
  // created from the admin UI); de-dupe so the filter pills don't repeat.
  const seen = new Set<string>();
  return categories.filter((category) => {
    const key = (category.slug || category.name || '').trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
});

export const getBlogPostBySlug = cache(async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await fetchStrapi<StrapiAny[]>(`/api/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getBlogPostBySlug');
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
  const data = await fetchStrapi<StrapiAny>('/api/blog-page-setting?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getBlogPageSettings');
  if (!data) return null;
  const flat = unwrap<Record<string, unknown>>(data);
  const heroImageRaw = flat.heroImage ? unwrap<{ url: string; mime: string }>(flat.heroImage) : undefined;
  return {
    heroHeading: flat.heroHeading as string | undefined,
    heroSubheading: flat.heroSubheading as string | undefined,
    heroImage: heroImageRaw
      ? (() => {
          const resolved = resolveMediaUrl(heroImageRaw.url);
          return resolved ? { url: resolved, mime: heroImageRaw.mime } : undefined;
        })()
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
  const data = await fetchStrapi<StrapiAny>('/api/career-page-setting?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getCareerPageSettings');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
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
  const data = await fetchStrapi<StrapiAny[]>('/api/job-departments', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getJobDepartments');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => unwrap<JobDepartment>(entry));
});

export const getJobPositions = cache(async function getJobPositions(): Promise<JobPosition[]> {
  const data = await fetchStrapi<StrapiAny[]>('/api/job-positions?populate=*&filters[isOpen][$eq]=true', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getJobPositions');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
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

async function assertPhoneVerified(phone: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('mgp_verified_phone')?.value;
  assertVerifiedToken(token, phone);
}

function getSubmissionHeaders() {
  const headers: Record<string, string> = {};
  if (process.env.INTERNAL_API_SECRET) {
    headers['x-internal-secret'] = process.env.INTERNAL_API_SECRET;
  }
  if (process.env.API_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.API_TOKEN}`;
  }
  return headers;
}

const GENERIC_APPLICATION_ERROR = 'We could not submit your application. Please try again.';
const GENERIC_FORM_ERROR = 'We could not submit your request. Please try again.';
// Strapi's requireVerifiedOtp rejects missing/expired/consumed OTPs with 403 and this message.
const OTP_REQUIRED_MESSAGE = 'Please verify your phone number again.';

// Strapi validation messages written for end users; anything else is replaced by a generic message.
const USER_FACING_STRAPI_ERRORS = new Set([
  OTP_REQUIRED_MESSAGE,
  'Please enter a valid 10-digit mobile number.',
  'Please upload a PDF, DOC, or DOCX file under 5 MB.',
  'Could not read the uploaded file. Please try again.',
  'Failed to upload resume file. Please try again.',
]);

// Logs Strapi's real error server-side and returns only a safe message for the browser.
async function toUserFacingError(res: Response, context: string, fallback: string): Promise<string> {
  const errJson = await res.json().catch(() => ({}));
  const message: unknown = errJson?.error?.message ?? errJson?.message;
  console.error(`${context}: Strapi responded with ${res.status}`, typeof message === 'string' ? message : '');
  return typeof message === 'string' && USER_FACING_STRAPI_ERRORS.has(message) ? message : fallback;
}

export async function submitJobApplication(payload: {
  fullName: string;
  email: string;
  phone: string;
  experienceYears?: string;
  currentCity?: string;
  noticePeriod?: string;
  coverNote?: string;
  jobPosition?: string;
  resumeFile?: File | null;
}): Promise<{ success: boolean; error?: string; code?: string }> {
  try {
    let res: Response;
    const baseHeaders = getSubmissionHeaders();

    if (payload.resumeFile) {
      const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'doc'];
      const ALLOWED_MIME_TYPES = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
      ];
      const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

      const fileName = payload.resumeFile.name || '';
      const lastDotIndex = fileName.lastIndexOf('.');
      const extension = lastDotIndex >= 0 ? fileName.slice(lastDotIndex + 1).toLowerCase() : '';

      const extensionOk = ALLOWED_EXTENSIONS.includes(extension);
      const mimeOk = ALLOWED_MIME_TYPES.includes(payload.resumeFile.type);
      const sizeOk = payload.resumeFile.size > 0 && payload.resumeFile.size <= MAX_SIZE_BYTES;

      if (!extensionOk || !mimeOk || !sizeOk) {
        return { success: false, error: 'Please upload a PDF, DOC, or DOCX file under 5 MB.' };
      }

      const formData = new FormData();
      const data = {
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        experienceYears: payload.experienceYears,
        currentCity: payload.currentCity,
        noticePeriod: payload.noticePeriod,
        coverNote: payload.coverNote,
        jobPosition: payload.jobPosition,
      };
      
      formData.append('data', JSON.stringify(data));
      formData.append('files.resume', payload.resumeFile, payload.resumeFile.name);

      res = await fetch(`${getStrapiUrl()}/api/job-applications`, {
        method: 'POST',
        headers: baseHeaders,
        body: formData,
      });
    } else {
      res = await fetch(`${getStrapiUrl()}/api/job-applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...baseHeaders,
        },
        body: JSON.stringify(payload),
      });
    }

    if (!res.ok) {
      return { success: false, error: await toUserFacingError(res, 'submitJobApplication', GENERIC_APPLICATION_ERROR) };
    }
    return { success: true };
  } catch (err) {
    console.error('submitJobApplication error:', err instanceof Error ? err.message : 'Unknown error');
    return { success: false, error: 'Network error submitting application.' };
  }
}

export async function submitFormSubmission(payload: {
  name: string;
  phone: string;
  email?: string;
  branch?: string;
  branchName?: string;
  branchCode?: string;
  branchValidated?: boolean;
  formType?: string;
  enquiryType?: string;
  sourceForm?: string;
  purity?: string;
  weight?: string;
  details?: StrapiAny;
}): Promise<{ success: boolean; error?: string; code?: string; leadRef?: string }> {
  try {
    await assertPhoneVerified(payload.phone);
    const baseHeaders = getSubmissionHeaders();
    // 1. Submit to Gold Valuation Submissions
    const valuationRes = await fetch(`${getStrapiUrl()}/api/gold-valuation-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...baseHeaders },
      body: JSON.stringify({
        data: {
          name: payload.name,
          phone: payload.phone,
          email: payload.email,
          purity: payload.purity,
          weight: payload.weight,
          branch: payload.branchName || payload.branch,
          branchName: payload.branchName,
          branchCode: payload.branchCode,
          branchValidated: payload.branchValidated,
          formType: payload.formType || 'gold-value',
          sourceForm: payload.sourceForm,
          details: payload.details,
        }
      }),
    });

    if (!valuationRes.ok) {
      const error = await toUserFacingError(valuationRes, 'submitFormSubmission', GENERIC_FORM_ERROR);
      if (valuationRes.status === 403 && error === OTP_REQUIRED_MESSAGE) {
        return { success: false, code: 'OTP_REQUIRED', error };
      }
      return { success: false, error };
    }

    const valData = await valuationRes.json().catch(() => ({}));
    return {
      success: true,
      ...(typeof valData?.leadRef === 'string' && valData.leadRef.trim() ? { leadRef: valData.leadRef.trim() } : {}),
    };
  } catch (err) {
    if (err instanceof VerificationError) {
      console.warn('[submit] verification failed:', err.code);
      return { success: false, code: 'OTP_REQUIRED', error: OTP_REQUIRED_MESSAGE };
    }
    console.error('submitFormSubmission error:', err instanceof Error ? err.message : 'Unknown error');
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
  trustBadgePrefix?: string;
  trustBadgeHighlight?: string;
  trustBadgeSuffix?: string;
  locatorHeading?: string;
  locatorHighlight?: string;
  locatorSubtitle?: string;
  heroArcLabel1?: string;
  heroArcLabel2?: string;
  heroArcLabel3?: string;
  processHeading?: string;
  processHeadingHighlight?: string;
  processSubtitle?: string;
  processStepLabel?: string;
  diffHeading?: string;
  diffHeadingHighlight?: string;
  diffSubtitle?: string;
  feedbackHeading?: string;
  vanFeatures?: { id?: number; text: string }[];
  faqHeading?: string;
  faqHeadingHighlight?: string;
  faqReadMoreLabel?: string;
  faqViewLessLabel?: string;
  recentPostsHeading?: string;
  recentPostsHeadingHighlight?: string;
  recentPostsHeadingSuffix?: string;
  recentPostsEmptyText?: string;
  recentPostsReadMoreLabel?: string;
}

export interface SlideFeature {
  id?: number;
  order?: number;
  title: string;
  desc?: string;
  tag?: string;
  iconType?: string;
  link?: string;
}

export interface HeroSlide {
  id: number;
  order?: number;
  variant?: 'standard' | 'scientific' | 'recycling';
  heroText?: string;
  heroSubtext?: string;
  heroImage?: string;
  mobileImage?: string;
  slideLink?: string;
  button1?: CTA;
  button2?: CTA;
  features?: SlideFeature[];
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
  iconType: 'flask' | 'scale' | 'rupee' | 'leaf' | 'default';
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
  section: 'home' | 'gold-rate' | 'about-us' | 'faq';
  order: number;
  category?: string;
}

export interface FAQPageSettings {
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroLead?: string;
  searchPlaceholder?: string;
  allCategoryLabel?: string;
  noResultsText?: string;
  resetButtonLabel?: string;
  ctaTitle?: string;
  ctaSubtitle?: string;
  ctaButtonLabel?: string;
  ctaButtonLink?: string;
  ctaPhoneLabel?: string;
  ctaPhoneNumber?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
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

function getMediaUrl(media: StrapiAny): string | undefined {
  if (!media) return undefined;
  const flat = unwrap<{ url: string }>(media);
  return flat?.url ? resolveMediaUrl(flat.url) : undefined;
}

export const getHomepageData = cache(async function getHomepageData(): Promise<HomepageData | null> {
  const data = await fetchStrapi<StrapiAny>(
    '/api/homepage?populate[heroFirstSlideImage]=true&populate[processSectionImage]=true&populate[vanImage]=true&populate[ogImage]=true&populate[homeVideos][populate]=*&populate[vanFeatures][populate]=*',
    { cache: 'no-store' },
    'getHomepageData'
  );
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
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
    trustBadgePrefix: flat.trustBadgePrefix,
    trustBadgeHighlight: flat.trustBadgeHighlight,
    trustBadgeSuffix: flat.trustBadgeSuffix,
    locatorHeading: flat.locatorHeading,
    locatorHighlight: flat.locatorHighlight,
    locatorSubtitle: flat.locatorSubtitle,
    heroArcLabel1: flat.heroArcLabel1,
    heroArcLabel2: flat.heroArcLabel2,
    heroArcLabel3: flat.heroArcLabel3,
    processHeading: flat.processHeading,
    processHeadingHighlight: flat.processHeadingHighlight,
    processSubtitle: flat.processSubtitle,
    processStepLabel: flat.processStepLabel,
    diffHeading: flat.diffHeading,
    diffHeadingHighlight: flat.diffHeadingHighlight,
    diffSubtitle: flat.diffSubtitle,
    feedbackHeading: flat.feedbackHeading,
    vanFeatures: Array.isArray(flat.vanFeatures) ? flat.vanFeatures.map(unwrap) : undefined,
    faqHeading: flat.faqHeading,
    faqHeadingHighlight: flat.faqHeadingHighlight,
    faqReadMoreLabel: flat.faqReadMoreLabel,
    faqViewLessLabel: flat.faqViewLessLabel,
    recentPostsHeading: flat.recentPostsHeading,
    recentPostsHeadingHighlight: flat.recentPostsHeadingHighlight,
    recentPostsHeadingSuffix: flat.recentPostsHeadingSuffix,
    recentPostsEmptyText: flat.recentPostsEmptyText,
    recentPostsReadMoreLabel: flat.recentPostsReadMoreLabel,
    homeVideos: Array.isArray(flat.homeVideos)
      ? flat.homeVideos.map((item: StrapiAny) => ({
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
  const data = await fetchStrapi<StrapiAny>('/api/shared-media?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getSharedMedia');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
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
  const data = await fetchStrapi<StrapiAny>('/api/global-stat', { cache: 'no-store' }, 'getGlobalStats');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
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
  const data = await fetchStrapi<StrapiAny[]>(
    '/api/hero-slides?populate=*&sort=order:asc',
    { cache: 'no-store' },
    'getHeroSlides'
  );
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
    return {
      id: flat.id,
      order: flat.order,
      variant: flat.variant,
      heroText: flat.heroText,
      heroSubtext: flat.heroSubtext,
      heroImage: getMediaUrl(flat.heroImage),
      mobileImage: getMediaUrl(flat.mobileImage),
      slideLink: flat.slideLink,
      button1: flat.button1,
      button2: flat.button2,
      features: Array.isArray(flat.features)
        ? flat.features.map((f: StrapiAny) => unwrap<SlideFeature>(f))
        : undefined,
    };
  });
});

export const getProcessSteps = cache(async function getProcessSteps(): Promise<ProcessStep[]> {
  const data = await fetchStrapi<StrapiAny[]>('/api/process-steps?populate=*&sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getProcessSteps');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
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
  const data = await fetchStrapi<StrapiAny[]>('/api/difference-boxes?populate=*&sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getDifferenceBoxes');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
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
  const data = await fetchStrapi<StrapiAny[]>('/api/comparison-rows?sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getComparisonRows');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
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
  const data = await fetchStrapi<StrapiAny[]>('/api/promo-slides?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getPromoSlides');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
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
  const data = await fetchStrapi<StrapiAny[]>('/api/testimonials?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getTestimonials');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
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

export const getFaqs = cache(async function getFaqs(section: FAQ['section'] = 'home'): Promise<FAQ[]> {
  const data = await fetchStrapi<StrapiAny[]>(`/api/faqs?filters[section][$eq]=${section}&populate=*&sort=order:asc`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFaqs');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
    return {
      id: flat.id,
      question: flat.question,
      answer: flat.answer,
      section: flat.section ?? 'home',
      order: flat.order ?? 0,
      category: flat.category,
    };
  });
});

export const getFAQPageSettings = cache(async function getFAQPageSettings(): Promise<FAQPageSettings | null> {
  const data = await fetchStrapi<StrapiAny>('/api/faq-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFAQPageSettings');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    heroTitle: flat.heroTitle,
    heroTitleHighlight: flat.heroTitleHighlight,
    heroLead: flat.heroLead,
    searchPlaceholder: flat.searchPlaceholder,
    allCategoryLabel: flat.allCategoryLabel,
    noResultsText: flat.noResultsText,
    resetButtonLabel: flat.resetButtonLabel,
    ctaTitle: flat.ctaTitle,
    ctaSubtitle: flat.ctaSubtitle,
    ctaButtonLabel: flat.ctaButtonLabel,
    ctaButtonLink: flat.ctaButtonLink,
    ctaPhoneLabel: flat.ctaPhoneLabel,
    ctaPhoneNumber: flat.ctaPhoneNumber,
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    seoKeywords: flat.seoKeywords,
    ogImage: getMediaUrl(flat.ogImage),
    hideNavbar: flat.hideNavbar,
    hideFooter: flat.hideFooter,
  };
});

export interface DynamicPageSection {
  id: number;
  __component: string;
  [key: string]: StrapiAny;
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
  const data = await fetchStrapi<StrapiAny[]>(`/api/pages?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[sections][populate]=*`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getPageBySlug');
  const arr = Array.isArray(data) ? data : [];
  if (arr.length === 0) return null;
  const flat = unwrap<StrapiAny>(arr[0]);
  const rawSections = Array.isArray(flat.sections) ? flat.sections : [];
  const sections = rawSections.map((sec: StrapiAny) => unwrap<DynamicPageSection>(sec));
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

export interface SitemapEntry {
  slug: string;
  updatedAt?: string;
}

// Lightweight paginated fetch of every published entry's slug + updatedAt, for the sitemap.
async function getAllSlugs(collection: string): Promise<SitemapEntry[]> {
  if (process.env.NEXT_PHASE === 'phase-production-build') return [];
  const pageSize = 100; // matches Strapi's config/api.ts maxLimit
  const all: SitemapEntry[] = [];
  let page = 1;
  try {
    while (true) {
      const res = await fetch(
        `${getStrapiUrl()}/api/${collection}?fields[0]=slug&fields[1]=updatedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
        { next: { revalidate: REVALIDATE_INTERVAL } }
      );
      if (!res.ok) {
        console.warn(`getAllSlugs(${collection}): Strapi responded with ${res.status}`);
        break;
      }
      const json = await res.json();
      const batch: StrapiAny[] = Array.isArray(json?.data) ? json.data : [];
      for (const entry of batch) {
        const flat = unwrap<StrapiAny>(entry);
        if (flat?.slug) all.push({ slug: flat.slug, updatedAt: flat.updatedAt });
      }
      const pageCount = json?.meta?.pagination?.pageCount ?? 1;
      if (batch.length === 0 || page >= pageCount) break;
      page++;
    }
  } catch (err) {
    if (isDynamicServerError(err)) throw err;
    console.error(`getAllSlugs(${collection})`, err);
  }
  return all;
}

export const getSitemapContent = cache(async function getSitemapContent(): Promise<{
  blogPosts: SitemapEntry[];
  pages: SitemapEntry[];
}> {
  const [blogPosts, pages] = await Promise.all([getAllSlugs('blog-posts'), getAllSlugs('pages')]);
  return { blogPosts, pages };
});

export const getFaqsByPage = cache(async function getFaqsByPage(pageId: number): Promise<FAQ[]> {
  const data = await fetchStrapi<StrapiAny[]>(`/api/faqs?filters[page][id][$eq]=${pageId}&populate=*&sort=order:asc`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFaqsByPage');
  const arr = Array.isArray(data) ? data : [];
  return arr.map((entry: StrapiAny) => {
    const flat = unwrap<StrapiAny>(entry);
    return {
      id: flat.id,
      question: flat.question,
      answer: flat.answer,
      section: flat.section ?? 'home',
      order: flat.order ?? 0,
      category: flat.category,
    };
  });
});

export interface TextSection {
  id: number;
  heading?: string;
  body?: string;
}

export interface AboutUsPageData {
  heroEyebrow?: string;
  heroTitle?: string;
  heroWhoWeAreHeading?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroChecklist?: { id: number; text: string }[];
  heroInfoCards?: TextSection[];
  heroStats?: { id: number; label: string; number: string }[];
  heroImages?: string[];
  recyclingSubtitle?: string;
  recyclingTitle?: string;
  recyclingDescription?: string;
  recyclingSteps?: { id: number; title: string; desc?: string; iconSvg?: string }[];
  historySubtitle?: string;
  historyTitle?: string;
  historyDescription?: string;
  historySections?: TextSection[];
  historyMilestones?: { id: number; year?: string; title: string; desc?: string }[];
  parentEyebrow?: string;
  parentTitle?: string;
  parentDescription?: string;
  parentChecklist?: { id: number; text: string }[];
  parentCompareHeading?: string;
  parentStats?: { id: number; label: string; number: string }[];
  parentTableHeaderLeft?: string;
  parentTableHeaderRight?: string;
  parentCtaText?: string;
  parentCtaLink?: string;
  parentPortraitImage?: string;
  philanthropySubtitle?: string;
  philanthropyTitle?: string;
  philanthropyDescription?: string;
  philanthropyInitiativeTitle?: string;
  philanthropyInitiativeDesc?: string;
  philanthropyImages?: string[];
  philanthropyLink?: string;
  philanthropyLinkText?: string;
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
  const data = await fetchStrapi<StrapiAny>('/api/about-us-page?populate=*', { cache: 'no-store' }, 'getAboutUsPage');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    heroEyebrow: flat.heroEyebrow,
    heroTitle: flat.heroTitle,
    heroWhoWeAreHeading: flat.heroWhoWeAreHeading,
    heroDescription: flat.heroDescription,
    heroButtonText: flat.heroButtonText,
    heroButtonLink: flat.heroButtonLink,
    heroChecklist: flat.heroChecklist,
    heroInfoCards: flat.heroInfoCards,
    heroStats: flat.heroStats,
    heroImages: Array.isArray(flat.heroImages) ? flat.heroImages.map(getMediaUrl).filter(Boolean) as string[] : undefined,
    recyclingSubtitle: flat.recyclingSubtitle,
    recyclingTitle: flat.recyclingTitle,
    recyclingDescription: flat.recyclingDescription,
    recyclingSteps: flat.recyclingSteps,
    historySubtitle: flat.historySubtitle,
    historyTitle: flat.historyTitle,
    historyDescription: flat.historyDescription,
    historySections: flat.historySections,
    historyMilestones: flat.historyMilestones,
    parentEyebrow: flat.parentEyebrow,
    parentTitle: flat.parentTitle,
    parentDescription: flat.parentDescription,
    parentChecklist: flat.parentChecklist,
    parentCompareHeading: flat.parentCompareHeading,
    parentStats: flat.parentStats,
    parentTableHeaderLeft: flat.parentTableHeaderLeft,
    parentTableHeaderRight: flat.parentTableHeaderRight,
    parentCtaText: flat.parentCtaText,
    parentCtaLink: flat.parentCtaLink,
    parentPortraitImage: getMediaUrl(flat.parentPortraitImage),
    philanthropySubtitle: flat.philanthropySubtitle,
    philanthropyTitle: flat.philanthropyTitle,
    philanthropyDescription: flat.philanthropyDescription,
    philanthropyInitiativeTitle: flat.philanthropyInitiativeTitle,
    philanthropyInitiativeDesc: flat.philanthropyInitiativeDesc,
    philanthropyImages: Array.isArray(flat.philanthropyImages) ? flat.philanthropyImages.map(getMediaUrl).filter(Boolean) as string[] : undefined,
    philanthropyLink: flat.philanthropyLink,
    philanthropyLinkText: flat.philanthropyLinkText,
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
    seoKeywords: flat.seoKeywords,
    ogImage: getMediaUrl(flat.ogImage),
    hideFooter: flat.hideFooter ?? false,
    hideNavbar: flat.hideNavbar ?? false,
  };
});

export interface ContactUsPageData {
  heroHeading?: string;
  heroLead?: string;
  heroImage?: string;
  formTitle?: string;
  officeTitle?: string;
  formServices?: { id?: number; text: string }[];
  formServicePlaceholder?: string;
  formMessagePlaceholder?: string;
  formSubmitLabel?: string;
  formSendingLabel?: string;
  formSuccessText?: string;
  formResetLabel?: string;
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
  const data = await fetchStrapi<StrapiAny>('/api/contact-us-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getContactUsPage');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    heroHeading: flat.heroHeading,
    heroLead: flat.heroLead,
    heroImage: getMediaUrl(flat.heroImage),
    formTitle: flat.formTitle,
    officeTitle: flat.officeTitle,
    formServices: Array.isArray(flat.formServices) ? flat.formServices.map(unwrap) : undefined,
    formServicePlaceholder: flat.formServicePlaceholder,
    formMessagePlaceholder: flat.formMessagePlaceholder,
    formSubmitLabel: flat.formSubmitLabel,
    formSendingLabel: flat.formSendingLabel,
    formSuccessText: flat.formSuccessText,
    formResetLabel: flat.formResetLabel,
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
    seoKeywords: flat.seoKeywords,
    ogImage: getMediaUrl(flat.ogImage),
    hideFooter: flat.hideFooter ?? false,
    hideNavbar: flat.hideNavbar ?? false,
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
  presenceHeading?: string;
  presenceStates?: NavItem[];
  footerDescription?: string;
  quickLinksHeading?: string;
  legalText?: string;
  legalEmail?: string;
  otherWebsitesLabel?: string;
  otherWebsites?: NavItem[];
  tollFreeHeading?: string;
  tollFreeDescription?: string;
  tollFreeNumber?: string;
  officeHeading?: string;
  officeAddress?: string;
  officeHours?: string;
  socialsHeading?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  copyrightText?: string;
}

export const getFooterSetting = cache(async function getFooterSetting(): Promise<FooterSetting | null> {
  const data = await fetchStrapi<StrapiAny>('/api/footer-setting?populate[quickLinks][populate]=*&populate[legalLinks][populate]=*&populate[presenceStates][populate]=*&populate[otherWebsites][populate]=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getFooterSetting');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    quickLinks: Array.isArray(flat.quickLinks) ? flat.quickLinks : [],
    legalLinks: Array.isArray(flat.legalLinks) ? flat.legalLinks : [],
    presenceHeading: flat.presenceHeading,
    presenceStates: Array.isArray(flat.presenceStates) ? flat.presenceStates : [],
    footerDescription: flat.footerDescription,
    quickLinksHeading: flat.quickLinksHeading,
    legalText: flat.legalText,
    legalEmail: flat.legalEmail,
    otherWebsitesLabel: flat.otherWebsitesLabel,
    otherWebsites: Array.isArray(flat.otherWebsites) ? flat.otherWebsites : [],
    tollFreeHeading: flat.tollFreeHeading,
    tollFreeDescription: flat.tollFreeDescription,
    tollFreeNumber: flat.tollFreeNumber,
    officeHeading: flat.officeHeading,
    officeAddress: flat.officeAddress,
    officeHours: flat.officeHours,
    socialsHeading: flat.socialsHeading,
    facebookUrl: flat.facebookUrl,
    instagramUrl: flat.instagramUrl,
    youtubeUrl: flat.youtubeUrl,
    linkedinUrl: flat.linkedinUrl,
    twitterUrl: flat.twitterUrl,
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
  const data = await fetchStrapi<StrapiAny>('/api/navbar-setting?populate[navLinks][populate]=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getNavbarSetting');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  const rawLinks = Array.isArray(flat.navLinks) ? flat.navLinks : [];
  const navLinks = rawLinks.map((item: StrapiAny) => {
    const flatItem = unwrap<StrapiAny>(item);
    const page = flatItem.page ? unwrap<StrapiAny>(flatItem.page) : undefined;
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
  whyTitle?: string;
  whyTitleHighlight?: string;
  whyTitleSuffix?: string;
  whyReasons?: { id?: number; title: string; desc?: string }[];
  valuationTitle?: string;
  valuationTitleHighlight?: string;
  valuationTitleSuffix?: string;
  valuationSteps?: { id?: number; title: string; desc?: string }[];
  valuationProcessImage?: string;
  ctaTitle?: string;
  ctaSubtext?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
  faqHeading?: string;
  trustItems?: { id?: number; text: string }[];
}

export const getGoldRatePage = cache(async function getGoldRatePage(): Promise<GoldRatePageData | null> {
  const data = await fetchStrapi<StrapiAny>(
    '/api/gold-rate-page?populate[ogImage]=*&populate[faqs]=*&populate[heroImage]=*&populate[whyGoldRateChangesImage]=*&populate[whyReasons]=*&populate[valuationSteps]=*&populate[trustItems]=*&populate[valuationProcessImage]=*',
    { next: { revalidate: REVALIDATE_INTERVAL } },
    'getGoldRatePage'
  );
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  const ogImageRaw = flat.ogImage ? unwrap<StrapiAny>(flat.ogImage) : undefined;
  return {
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    seoKeywords: flat.seoKeywords,
    ogImage: ogImageRaw?.url ? (resolveMediaUrl(ogImageRaw.url) ?? ogImageRaw.url) : undefined,
    hideFooter: Boolean(flat.hideFooter),
    hideNavbar: Boolean(flat.hideNavbar),
    heroTitle: flat.heroTitle,
    heroDescription: flat.heroDescription,
    heroImage: getMediaUrl(flat.heroImage),
    whyGoldRateChangesImage: getMediaUrl(flat.whyGoldRateChangesImage),
    faqs: Array.isArray(flat.faqs) ? flat.faqs.map(unwrap) : [],
    whyTitle: flat.whyTitle,
    whyTitleHighlight: flat.whyTitleHighlight,
    whyTitleSuffix: flat.whyTitleSuffix,
    whyReasons: Array.isArray(flat.whyReasons) ? flat.whyReasons.map(unwrap) : undefined,
    valuationTitle: flat.valuationTitle,
    valuationTitleHighlight: flat.valuationTitleHighlight,
    valuationTitleSuffix: flat.valuationTitleSuffix,
    valuationSteps: Array.isArray(flat.valuationSteps) ? flat.valuationSteps.map(unwrap) : undefined,
    valuationProcessImage: getMediaUrl(flat.valuationProcessImage),
    ctaTitle: flat.ctaTitle,
    ctaSubtext: flat.ctaSubtext,
    ctaPrimaryLabel: flat.ctaPrimaryLabel,
    ctaSecondaryLabel: flat.ctaSecondaryLabel,
    ctaSecondaryLink: flat.ctaSecondaryLink,
    faqHeading: flat.faqHeading,
    trustItems: Array.isArray(flat.trustItems) ? flat.trustItems.map(unwrap) : undefined,
  };
});

export interface MobileVanStepItem {
  id?: number | string;
  num?: string;
  title: string;
  desc?: string;
  iconSvg?: string;
  iconImage?: string;
}

export interface MobileVanPageData {
  heroHeadingLight1?: string;
  heroHeadingLight2?: string;
  heroHeadingBold?: string;
  heroDescription?: string;
  howItWorksSubtitle?: string;
  howItWorksTitle?: string;
  howItWorksSteps?: MobileVanStepItem[];
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
  const query = [
    'populate[howItWorksSteps][populate]=*',
    'populate[how_it_works_steps][populate]=*',
    'populate[fourSteps][populate]=*',
    'populate[four_steps][populate]=*',
    'populate[steps][populate]=*',
    'populate[processSteps][populate]=*',
    'populate[testingMethods][populate]=*',
    'populate[testing_methods][populate]=*',
    'populate[heroImage]=*',
    'populate[hero_image]=*',
    'populate[testingMethodsImage]=*',
    'populate[testing_methods_image]=*',
    'populate[bookVanFormImage]=*',
    'populate[book_van_form_image]=*',
    'populate[ogImage]=*',
    'populate[og_image]=*',
  ].join('&');

  let data = await fetchStrapi<StrapiAny>(`/api/mobile-van-page?${query}`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings');
  
  if (!data) {
    data = await fetchStrapi<StrapiAny>('/api/mobile-van-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings:shallow');
  }
  if (!data) {
    data = await fetchStrapi<StrapiAny>(`/api/mobile-van?${query}`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings:mobile-van');
  }
  if (!data) {
    data = await fetchStrapi<StrapiAny>(`/api/mobile-van-page-setting?${query}`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings:setting');
  }
  if (!data) {
    data = await fetchStrapi<StrapiAny>(`/api/mobile-van-tab?${query}`, { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings:tab');
  }

  const flat = data ? unwrap<StrapiAny>(data) : {};

  const rawSteps =
    flat.howItWorksSteps ||
    flat.how_it_works_steps ||
    flat.howitworks_steps ||
    flat.fourSteps ||
    flat.four_steps ||
    flat.fourStep ||
    flat.four_step ||
    flat.fourStepJourney ||
    flat.four_step_journey ||
    flat.journeySteps ||
    flat.steps ||
    flat.processSteps ||
    flat.process_steps ||
    flat.howItWorks ||
    flat.how_it_works ||
    [];

  let howItWorksSteps: MobileVanStepItem[] = Array.isArray(rawSteps)
    ? rawSteps.map((s: StrapiAny, idx: number) => {
        const item = unwrap<StrapiAny>(s);
        const rawNum = item.num || item.stepNumber || item.step_number || item.order || (idx + 1);
        const numStr = typeof rawNum === 'number' ? String(rawNum).padStart(2, '0') : String(rawNum);
        return {
          id: item.id || idx + 1,
          num: numStr,
          title: item.title || item.stepTitle || item.step_title || item.heading || item.name || item.stepName || item.step_name || item.label || '',
          desc: item.desc || item.description || item.stepDesc || item.step_desc || item.stepDescription || item.step_description || item.content || item.text || item.details || item.subtitle || '',
          iconSvg: item.iconSvg || item.icon_svg || item.svg || item.iconHtml || item.icon_html,
          iconImage: getMediaUrl(item.iconImage || item.icon_image || item.icon || item.image || item.stepImage || item.step_image),
        };
      }).filter((s) => s.title || s.desc)
    : [];

  if (howItWorksSteps.length === 0) {
    try {
      const processStepsData = await fetchStrapi<StrapiAny[]>('/api/process-steps?populate=*&sort=order:asc', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getMobileVanPageSettings:fallbackProcessSteps');
      if (Array.isArray(processStepsData) && processStepsData.length > 0) {
        howItWorksSteps = processStepsData.map((s: StrapiAny, idx: number) => {
          const item = unwrap<StrapiAny>(s);
          return {
            id: item.id || idx + 1,
            num: String(item.order || idx + 1).padStart(2, '0'),
            title: item.stepTitle || item.title || item.heading || '',
            desc: item.stepDescription || item.description || item.desc || item.leftDescription || '',
            iconImage: getMediaUrl(item.stepImage || item.image),
          };
        });
      }
    } catch {
      // fallback
    }
  }

  const rawMethods = flat.testingMethods || flat.testing_methods || [];
  const testingMethods = Array.isArray(rawMethods)
    ? rawMethods.map((m: StrapiAny, idx: number) => {
        const item = unwrap<StrapiAny>(m);
        return {
          id: item.id || idx + 1,
          title: item.title || item.heading || item.name || '',
          desc: item.desc || item.description || item.content || item.text || '',
        };
      })
    : [];

  return {
    heroHeadingLight1: flat.heroHeadingLight1 || flat.hero_heading_light_1 || flat.heroHeadingLight || flat.hero_heading_light,
    heroHeadingLight2: flat.heroHeadingLight2 || flat.hero_heading_light_2,
    heroHeadingBold: flat.heroHeadingBold || flat.hero_heading_bold,
    heroDescription: flat.heroDescription || flat.hero_description,
    howItWorksTitle: flat.howItWorksTitle || flat.how_it_works_title || flat.howitworks_title || flat.howItWorksHeading || flat.how_it_works_heading || flat.fourStepsTitle || flat.four_step_title || flat.stepsTitle,
    howItWorksSubtitle: flat.howItWorksSubtitle || flat.how_it_works_subtitle || flat.howitworks_subtitle || flat.howItWorksDesc || flat.how_it_works_description || flat.howItWorksDescription || flat.fourStepsSubtitle || flat.stepsSubtitle,
    howItWorksSteps: howItWorksSteps.length > 0 ? howItWorksSteps : undefined,
    testingMethodsTitle: flat.testingMethodsTitle || flat.testing_methods_title,
    testingMethods: testingMethods.length > 0 ? testingMethods : undefined,
    locationsTitle: flat.locationsTitle || flat.locations_title,
    locationsDescription: flat.locationsDescription || flat.locations_description,
    appointmentTitle: flat.appointmentTitle || flat.appointment_title || flat.bookingTitle || flat.booking_title,
    appointmentDescription: flat.appointmentDescription || flat.appointment_description || flat.bookingDescription || flat.booking_description,
    seoTitle: flat.seoTitle || flat.seo_title,
    seoDescription: flat.seoDescription || flat.seo_description,
    seoKeywords: flat.seoKeywords || flat.seo_keywords,
    heroImage: getMediaUrl(flat.heroImage || flat.hero_image),
    testingMethodsImage: getMediaUrl(flat.testingMethodsImage || flat.testing_methods_image),
    bookVanFormImage: getMediaUrl(flat.bookVanFormImage || flat.book_van_form_image),
    ogImage: getMediaUrl(flat.ogImage || flat.og_image),
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
  trustBadgePrefix?: string;
  trustBadgeHighlight?: string;
  trustBadgeSuffix?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  heroBullets?: { id?: number; text: string }[];
  heroFormTitle?: string;
  heroFormSubtitle?: string;
  heroFormSuccessText?: string;
  heroFormResetLabel?: string;
  overviewEyebrow?: string;
  overviewTitle?: string;
  overviewTitleHighlight?: string;
  overviewSubtitle?: string;
  overviewDescription?: string;
  overviewButtonLabel?: string;
  overviewButtonLink?: string;
  overviewTile1?: string;
  overviewTile2?: string;
  overviewTile3?: string;
  overviewTile4?: string;
  contactTitle?: string;
  contactTitleHighlight?: string;
  contactDescription?: string;
  contactPhone?: string;
  contactEmail?: string;
  contactSuccessText?: string;
}

export const getSellGoldPageSettings = cache(async function getSellGoldPageSettings(): Promise<SellGoldPageSettings | null> {
  const data = await fetchStrapi<StrapiAny>('/api/sell-gold-page-setting?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getSellGoldPageSettings');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    seoTitle: flat.seoTitle,
    seoDescription: flat.seoDescription,
    seoKeywords: flat.seoKeywords,
    ogImage: getMediaUrl(flat.ogImage),
    heroImage: getMediaUrl(flat.heroImage),
    overviewImage1: getMediaUrl(flat.overviewImage1),
    overviewImage2: getMediaUrl(flat.overviewImage2),
    trustBadgePrefix: flat.trustBadgePrefix,
    trustBadgeHighlight: flat.trustBadgeHighlight,
    trustBadgeSuffix: flat.trustBadgeSuffix,
    heroTitle: flat.heroTitle,
    heroTitleHighlight: flat.heroTitleHighlight,
    heroSubtitle: flat.heroSubtitle,
    heroBullets: Array.isArray(flat.heroBullets) ? flat.heroBullets.map(unwrap) : undefined,
    heroFormTitle: flat.heroFormTitle,
    heroFormSubtitle: flat.heroFormSubtitle,
    heroFormSuccessText: flat.heroFormSuccessText,
    heroFormResetLabel: flat.heroFormResetLabel,
    overviewEyebrow: flat.overviewEyebrow,
    overviewTitle: flat.overviewTitle,
    overviewTitleHighlight: flat.overviewTitleHighlight,
    overviewSubtitle: flat.overviewSubtitle,
    overviewDescription: flat.overviewDescription,
    overviewButtonLabel: flat.overviewButtonLabel,
    overviewButtonLink: flat.overviewButtonLink,
    overviewTile1: flat.overviewTile1,
    overviewTile2: flat.overviewTile2,
    overviewTile3: flat.overviewTile3,
    overviewTile4: flat.overviewTile4,
    contactTitle: flat.contactTitle,
    contactTitleHighlight: flat.contactTitleHighlight,
    contactDescription: flat.contactDescription,
    contactPhone: flat.contactPhone,
    contactEmail: flat.contactEmail,
    contactSuccessText: flat.contactSuccessText,
  };
});

// --- CONTENT PAGES (Community, Testimonials, Privacy Policy) ---

export interface CommunityPageData {
  heroEyebrow?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroBody?: string;
  heelItems?: { id?: number; text: string }[];
  heroLogo?: string;
  roleEyebrow?: string;
  roleTitle?: string;
  roleTitleHighlight?: string;
  roleBody?: string;
  stakeholdersHeading?: string;
  stakeholders?: { id?: number; text: string }[];
  objectivesHeading?: string;
  objectivesBody?: string;
  objectives?: { id?: number; text: string }[];
  sustainabilityEyebrow?: string;
  sustainabilityTitle?: string;
  sustainabilityTitleHighlight?: string;
  sustainabilityBody?: string;
  sustainabilityAimsHeading?: string;
  sustainabilityAims?: { id?: number; text: string }[];
  impactEyebrow?: string;
  impactTitle?: string;
  impactTitleHighlight?: string;
  impactBody?: string;
  smileBadge?: string;
  smileTitle?: string;
  smileBody?: string;
  smileStats?: { id?: number; number: string; label: string }[];
  initiativesEyebrow?: string;
  initiativesTitle?: string;
  initiativesTitleHighlight?: string;
  initiativesBody?: string;
  focusEyebrow?: string;
  focusTitle?: string;
  focusTitleHighlight?: string;
  focusCards?: { id?: number; title: string; desc?: string }[];
  footballTitle?: string;
  footballBody?: string;
  footballLogo?: string;
  touchingLivesTitle?: string;
  touchingLivesSubtitle?: string;
  touchingLivesStats?: { id?: number; number: string; label: string }[];
  ctaTitle?: string;
  jeevanEyebrow?: string;
  jeevanTitle?: string;
  jeevanTitleHighlight?: string;
  jeevanBody?: string;
  jeevanAimsHeading?: string;
  jeevanAims?: { id?: number; text: string }[];
  conclusion?: string;
  heroSubtitle?: string;
  heelTitle?: string;
  heelDescription?: string;
  smileDescription?: string;
  footballDescription?: string;
  volleyballTitle?: string;
  volleyballDescription?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export const getCommunityPage = cache(async function getCommunityPage(): Promise<CommunityPageData | null> {
  const data = await fetchStrapi<StrapiAny>('/api/community-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getCommunityPage');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    ...flat,
    ogImage: getMediaUrl(flat.ogImage),
    heroLogo: getMediaUrl(flat.heroLogo),
    footballLogo: getMediaUrl(flat.footballLogo),
  };
});

export interface TestimonialsPageData {
  heroEyebrow?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  stats?: { id?: number; number: string; label: string }[];
  gridTitle?: string;
  gridPretitle?: string;
  gridSubtitle?: string;
  readMoreLabel?: string;
  readLessLabel?: string;
  ctaTitle?: string;
  ctaSubtext?: string;
  ctaPrimaryLabel?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLink?: string;
  heroSubtitle?: string;
  ctaSubtitle?: string;
  ctaButtonText?: string;
  ctaButtonLink?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export const getTestimonialsPage = cache(async function getTestimonialsPage(): Promise<TestimonialsPageData | null> {
  const data = await fetchStrapi<StrapiAny>('/api/testimonials-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getTestimonialsPage');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    ...flat,
    ogImage: getMediaUrl(flat.ogImage),
  };
});

export interface PrivacyPolicyPageData {
  breadcrumbLabel?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  body?: string;
  contactHeading?: string;
  contactIntro?: string;
  contactName?: string;
  contactAddress?: string;
  contactEmail?: string;
  contactPhone?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

export const getPrivacyPolicyPage = cache(async function getPrivacyPolicyPage(): Promise<PrivacyPolicyPageData | null> {
  const data = await fetchStrapi<StrapiAny>('/api/privacy-policy-page?populate=*', { next: { revalidate: REVALIDATE_INTERVAL } }, 'getPrivacyPolicyPage');
  if (!data) return null;
  const flat = unwrap<StrapiAny>(data);
  return {
    ...flat,
    ogImage: getMediaUrl(flat.ogImage),
  };
});

