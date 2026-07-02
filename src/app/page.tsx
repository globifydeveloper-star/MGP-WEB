import HeroSection from '@/components/home/Hero/HeroSection';
import SellMethods from '@/components/home/SellMethods';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      {/* 1. Hero Area (includes background, Navbar, Hero Grid, BranchSelector, StatsBar) */}
      <HeroSection />

      {/* 2. Selling Methods Section */}
      <SellMethods />

      {/* 3. Transparent Process Section */}
      <Process />

      {/* 4. Customer Testimonials Section */}
      <Testimonials />

      {/* 5. FAQs Accordion Section */}
      <FAQ />

      {/* 6. Footer Section */}
      <Footer />
    </main>
  );
}
