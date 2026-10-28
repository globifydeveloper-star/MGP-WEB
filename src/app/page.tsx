import Navbar from '@/components/layout/Navbar';
import HeroSlider from '@/components/home/HeroSlider/HeroSlider';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldValueForm from '@/components/home/GoldValueForm/GoldValueForm';
import VideoSection from '@/components/home/VideoSection/VideoSection';
import MobileVan from '@/components/home/MobileVan/MobileVan';
import NewSection from '@/components/home/NewSection/NewSection';
import HeroStats from '@/components/home/HeroSlider/HeroStats';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import GoldSellComparison from '@/components/sell-gold-for-cash/GoldSellComparison/GoldSellComparison';
import RecentPost from '@/components/home/RecentPost/RecentPost';
import Feedback from '@/components/home/Feedback/Feedback';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/home/FAQ/FAQ';
import TheGpDiff from '@/components/home/TheGpDiff/TheGpDiff';
import {
  getBlogPosts,
  getHomepageData,
  getSharedMedia,
  getHeroSlides,
  getProcessSteps,
  getDifferenceBoxes,
  getPromoSlides,
  getTestimonials,
  getFaqs,
  getGlobalStats,
  getComparisonRows,
} from '@/lib/strapi';

export async function generateMetadata() {
  const homepageData = await getHomepageData();
  const title = homepageData?.seoTitle ?? "India's Most Trusted Gold Buyer | Muthoot Gold Point";
  const description = homepageData?.seoDescription ?? 'Get the True Market Value Old, Unused or pledged gold through a transparent process conducted entirely in front of you';
  const ogImage = homepageData?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: homepageData?.seoKeywords ? homepageData.seoKeywords.split(',').map((k: string) => k.trim()) : ['Muthoot Gold Point', 'Sell Gold', 'Gold Buyers', 'Cash for Gold', 'Gold Valuation', 'Gold Recycling'],
    authors: [{ name: 'Muthoot Gold Point' }],
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: '/',
      siteName: 'Muthoot Gold Point',
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Home() {
  const [
    posts,
    homepageData,
    sharedMedia,
    heroSlides,
    processSteps,
    differenceBoxes,
    promoSlides,
    testimonials,
    faqs,
    globalStats,
    comparisonRows,
  ] = await Promise.all([
    getBlogPosts(),
    getHomepageData(),
    getSharedMedia(),
    getHeroSlides(),
    getProcessSteps(),
    getDifferenceBoxes(),
    getPromoSlides(),
    getTestimonials(),
    getFaqs('home'),
    getGlobalStats(),
    getComparisonRows(),
  ]);

  return (
    <main>
      {/* Navbar Navigation */}
      {!homepageData?.hideNavbar && <Navbar />}

      {/* 1. Hero Section */}
      <HeroSlider
        slides={heroSlides}
        globalStats={globalStats}
        showStats={true}
        trustBadgePrefix={homepageData?.trustBadgePrefix}
        trustBadgeHighlight={homepageData?.trustBadgeHighlight}
        trustBadgeSuffix={homepageData?.trustBadgeSuffix}
        heroArcLabel1={homepageData?.heroArcLabel1}
        heroArcLabel2={homepageData?.heroArcLabel2}
        heroArcLabel3={homepageData?.heroArcLabel3}
      />

      {/* 2. Gold Selling Process Section */}
      <GoldSellProcess
        steps={processSteps}
        sectionImage={homepageData?.processSectionImage}
        heading={homepageData?.processHeading}
        headingHighlight={homepageData?.processHeadingHighlight}
        stepLabel={homepageData?.processStepLabel}
      />

      {/* 3. Video Section with Contact Enquiry Form */}
      <VideoSection videos={homepageData?.homeVideos} />

      {/* 4. Comparison Table */}
      <GoldSellComparison rows={comparisonRows} />

      {/* 5. Why Choose Muthoot Gold Point */}
      <TheGpDiff
        cards={differenceBoxes}
        heading={homepageData?.diffHeading}
        headingHighlight={homepageData?.diffHeadingHighlight}
        subtitle={homepageData?.diffSubtitle}
      />

      {/* 9. Testimonials */}
      <Feedback
        reviews={testimonials}
        heading={homepageData?.feedbackHeading}
      />

      {/* 10. Branch Locator */}
      <BranchLocator
        heading={homepageData?.locatorHeading}
        highlight={homepageData?.locatorHighlight}
        subtitle={homepageData?.locatorSubtitle}
      />

      {/* Mobile Van Banner */}
      <MobileVan
        headingLight={homepageData?.vanHeadingLight}
        headingBold={homepageData?.vanHeadingBold}
        description={homepageData?.vanDescription}
        buttonLabel={homepageData?.vanButtonLabel}
        features={homepageData?.vanFeatures}
      />

      {/* 11. FAQ */}
      <FAQ
        faqs={faqs}
        heading={homepageData?.faqHeading}
        headingHighlight={homepageData?.faqHeadingHighlight}
        readMoreLabel={homepageData?.faqReadMoreLabel}
        viewLessLabel={homepageData?.faqViewLessLabel}
      />

      {/* 12. Blog Post */}
      <RecentPost
        posts={posts}
        heading={homepageData?.recentPostsHeading}
        headingHighlight={homepageData?.recentPostsHeadingHighlight}
        headingSuffix={homepageData?.recentPostsHeadingSuffix}
        emptyText={homepageData?.recentPostsEmptyText}
        readMoreLabel={homepageData?.recentPostsReadMoreLabel}
      />

      {/* 13. Footer Section */}
      { !homepageData?.hideFooter && <Footer /> }
    </main>
  );
}


