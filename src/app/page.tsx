import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero/Hero';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldValueForm from '@/components/home/GoldValueForm/GoldValueForm';
import VideoSection from '@/components/home/VideoSection/VideoSection';
import MobileVan from '@/components/home/MobileVan/MobileVan';
import NewSection from '@/components/home/NewSection/NewSection';
import TheGpDiff from '@/components/home/TheGpDiff/TheGpDiff';
import SellMethods from '@/components/home/SellMethods/SellMethods';
import Process from '@/components/home/Process/Process';
import Testimonials from '@/components/home/Testimonials/Testimonials';
import FAQ from '@/components/home/FAQ/FAQ';
import RecentPost from '@/components/home/RecentPost/RecentPost';
import Feedback from '@/components/home/Feedback/Feedback';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      {/* 1. Navbar Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Gold Selling Process Section */}
      <GoldSellProcess />

      {/* Estimate The Value Of Your Gold Section */}
      <GoldValueForm />

      {/* Video Section */}
      <VideoSection />

      {/* 2. Mobile Van Banner */}
      <MobileVan />

      {/* New Section */}
      <NewSection />
      {/* 3. The Gold Point Difference */}
      <TheGpDiff />

      {/* 4. Selling Methods Section */}
      <SellMethods />

      {/* 5. Transparent Process Section */}
      <Process />

      {/* 6. Customer Testimonials Section */}
      <Testimonials />

      {/* 7. Feedback Testimonial Slider */}
      <Feedback />

      {/* 8. FAQs Accordion Section */}
      <FAQ />

      {/* 9. Recent Posts Section */}
      <RecentPost />

      {/* 10. Footer Section */}
      <Footer />
    </main>
  )
}
