import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero/Hero';
import GoldSellProcess from '@/components/home/gold_sell/gold_sell_process';
import MobileVan from '@/components/home/MobileVan/mobilevan';
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

      {/* 2. Mobile Van Banner */}
      <MobileVan />
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
