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
  const title = homepageData?.seoTitle ?? 'Sell Gold For Cash | Online Gold Valuation | Gold Point';
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

  const recentPosts = posts.slice(0, 3);

  return (
    <main>
      {/* Navbar Navigation */}
      {!homepageData?.hideNavbar && <Navbar />}

      {/* 1. Hero Section */}
      <HeroSlider slides={heroSlides} firstSlideImage={homepageData?.heroFirstSlideImage} globalStats={globalStats} showStats={false} />

      {/* 2. Gold Selling Process Section */}
      <GoldSellProcess steps={processSteps} sectionImage={homepageData?.processSectionImage} />

      {/* 3. Video Section || form */}
      <VideoSection videos={homepageData?.homeVideos} />

      {/* 4. Comparison Table */}
      <GoldSellComparison rows={comparisonRows} />

      {/* 5. The MGP Difference */}
      <TheGpDiff cards={differenceBoxes} />

      {/* 6. Mobile Van Banner */}
      <MobileVan
        headingLight={homepageData?.vanHeadingLight}
        headingBold={homepageData?.vanHeadingBold}
        description={homepageData?.vanDescription}
        buttonLabel={homepageData?.vanButtonLabel}
        vanImage={homepageData?.vanImage}
      />

      {/* 7. Hero Slide (Promo Slides) */}
      <NewSection slides={promoSlides} />

      {/* 8. Hero Stats */}
      <HeroStats globalStats={globalStats} />

      {/* 9. Testimonials */}
      <Feedback reviews={testimonials} />

      {/* 10. Branch Locator */}
      <BranchLocator />

      {/* 11. FAQ */}
      <FAQ faqs={faqs} />

      {/* 12. Blog Post */}
      <RecentPost posts={recentPosts} />

      {/* 13. Footer Section */}
      { !homepageData?.hideFooter && <Footer /> }
    </main>
  );
}


