import Navbar from '@/components/layout/Navbar';
import HeroSlider from '@/components/home/HeroSlider/HeroSlider';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldValueForm from '@/components/home/GoldValueForm/GoldValueForm';
import VideoSection from '@/components/home/VideoSection/VideoSection';
import MobileVan from '@/components/home/MobileVan/MobileVan';
import NewSection from '@/components/home/NewSection/NewSection';
import TheGpDiff from '@/components/home/TheGpDiff/TheGpDiff';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';
import RecentPost from '@/components/home/RecentPost/RecentPost';
import Feedback from '@/components/home/Feedback/Feedback';
import Footer from '@/components/layout/Footer';
import FAQ from '@/components/home/FAQ/FAQ';
import {
  getBlogPosts,
  getHomepageData,
  getHeroSlides,
  getProcessSteps,
  getDifferenceBoxes,
  getPromoSlides,
  getTestimonials,
  getFaqs,
  getStatesAndBranches,
} from '@/lib/strapi';

export async function generateMetadata() {
  const homepageData = await getHomepageData();
  return {
    title: homepageData?.seoTitle ?? 'Sell Gold For Cash | Online Gold Valuation | Gold Point',
    description:
      homepageData?.seoDescription ??
      'Get the True Market Value Old, Unused or pledged gold through a transparent process conducted entirely in front of you',
  };
}

export default async function Home() {
  const [
    posts,
    homepageData,
    heroSlides,
    processSteps,
    differenceBoxes,
    promoSlides,
    testimonials,
    faqs,
    states,
  ] = await Promise.all([
    getBlogPosts(),
    getHomepageData(),
    getHeroSlides(),
    getProcessSteps(),
    getDifferenceBoxes(),
    getPromoSlides(),
    getTestimonials(),
    getFaqs('home'),
    getStatesAndBranches(),
  ]);

  const recentPosts = posts.slice(0, 3);

  return (
    <main>
      {/* 1. Navbar Navigation */}
      <Navbar />

      {/* Hero Section - crossfades between the Hero and a second promo slide */}
      <HeroSlider slides={heroSlides} firstSlideImage={homepageData?.heroFirstSlideImage} />

      {/* Gold Selling Process Section */}
      <GoldSellProcess steps={processSteps} sectionImage={homepageData?.processSectionImage} />

      {/* Estimate The Value Of Your Gold Section */}
      <GoldValueForm
        sectionImage={homepageData?.estimateGoldImage}
        heading={homepageData?.estimateGoldHeading}
        headingHighlight={homepageData?.estimateGoldHeadingHighlight}
        note={homepageData?.estimateGoldNote}
      />

      {/* Video Section */}
      <VideoSection />

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

      {/* New Section */}
      <NewSection slides={promoSlides} />

      {/* 7. Feedback Testimonial Slider */}
      <Feedback reviews={testimonials} />

      {/* 8. FAQs Accordion Section */}
      <FAQ faqs={faqs} />

      {/* 9. Recent Posts Section */}
      <RecentPost posts={recentPosts} />

      {/* Branch Locator Section */}
      <BranchLocator states={states} />

      {/* 10. Footer Section */}
      { !homepage?.hideFooter && <Footer /> }
    </main>
  );
}


