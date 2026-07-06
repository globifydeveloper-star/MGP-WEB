import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero/Hero';
import GoldSellProcess from '@/components/home/gold_sell/gold_sell_process';
import GoldValueForm from '@/components/home/gold_value_form/gold_value_form';
import VideoSection from '@/components/home/video_section/video_section';
import MobileVan from '@/components/home/MobileVan/mobilevan';
import NewSection from '@/components/home/new_section/new_section';
import TheGpDiff from '@/components/home/The_gp_diff/the_gp_diff';
import SellMethods from '@/components/home/SellMethods';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import RecentPost from '@/components/home/recent_post/recent_post';
import Feedback from '@/components/home/feedback/feedback';
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
