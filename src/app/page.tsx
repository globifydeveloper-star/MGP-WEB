import Navbar from '@/components/layout/Navbar';
import HeroSlider from '@/components/home/HeroSlider/HeroSlider';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldValueForm from '@/components/home/GoldValueForm/GoldValueForm';
import VideoSection from '@/components/home/VideoSection/VideoSection';
import MobileVan from '@/components/home/MobileVan/MobileVan';
import NewSection from '@/components/home/NewSection/NewSection';
import HeroStats from '@/components/home/HeroSlider/HeroStats';
import TheGpDiff from '@/components/home/TheGpDiff/TheGpDiff';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import GoldSellComparison from '@/components/sell-gold-for-cash/GoldSellComparison/GoldSellComparison';
import RecentPost from '@/components/home/RecentPost/RecentPost';
import Feedback from '@/components/home/Feedback/Feedback';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/home/FAQ/FAQ';
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
      {/* 1. Navbar Navigation */}
      {!homepageData?.hideNavbar && <Navbar />}

      {/* Hero Section - crossfades between the Hero and a second promo slide */}
      <HeroSlider slides={heroSlides} firstSlideImage={homepageData?.heroFirstSlideImage} globalStats={globalStats} showStats={false} />

      {/* Gold Selling Process Section */}
      <GoldSellProcess steps={processSteps} sectionImage={homepageData?.processSectionImage} />

      {/* Video Section */}
      <VideoSection videos={homepageData?.homeVideos} />

      {/* How Muthoot Gold Point is different from traditional jewellers */}
      <GoldSellComparison rows={comparisonRows} />

      {/* 3. The Gold Point Difference */}
      <TheGpDiff cards={differenceBoxes} />

      {/* 2. Mobile Van Banner */}
      <MobileVan
        headingLight={homepageData?.vanHeadingLight}
        headingBold={homepageData?.vanHeadingBold}
        description={homepageData?.vanDescription}
        buttonLabel={homepageData?.vanButtonLabel}
        vanImage={homepageData?.vanImage}
      />

      {/* New Section - Group Company Details */}
      <NewSection slides={promoSlides} />

      {/* Stats ribbon */}
      <HeroStats globalStats={globalStats} />

      {/* 7. Feedback Testimonial Slider */}
      <Feedback reviews={testimonials} />

      {/* 8. FAQs Accordion Section */}
      <FAQ faqs={faqs} />

      {/* Estimate The Value Of Your Gold Section - Lead Form */}
      <GoldValueForm
        sectionImage={sharedMedia?.goldValueFormImage}
        heading={homepageData?.estimateGoldHeading}
        headingHighlight={homepageData?.estimateGoldHeadingHighlight}
        note={homepageData?.estimateGoldNote}
      />

      {/* 9. Recent Posts Section - Blog */}
      <RecentPost posts={recentPosts} />

      {/* Branch Locator Section */}
      <BranchLocator />

      {/* 10. Footer Section */}
      { !homepageData?.hideFooter && <Footer /> }
    </main>
  );
}


