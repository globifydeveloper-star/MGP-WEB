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


export default function Home() {
  return (
    <main>
      {/* 1. Navbar Navigation */}
      <Navbar />

      {/* Hero Section - crossfades between the Hero and a second promo slide */}
      <HeroSlider />

      {/* Gold Selling Process Section */}
      <GoldSellProcess />

      {/* Estimate The Value Of Your Gold Section */}
      <GoldValueForm />

      {/* Video Section */}
      <VideoSection />

      {/* 3. The Gold Point Difference */}
      <TheGpDiff />

      {/* 2. Mobile Van Banner */}
      <MobileVan />

      {/* New Section */}
      <NewSection />



      {/* 7. Feedback Testimonial Slider */}
      <Feedback />

      {/* 8. FAQs Accordion Section */}
      <FAQ />

      {/* 9. Recent Posts Section */}
      <RecentPost />

      {/* Branch Locator Section */}
      <BranchLocator />

      {/* 10. Footer Section */}
      <Footer />
    </main>
  )
}
