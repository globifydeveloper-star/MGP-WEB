import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero/Hero';
import SellMethods from '@/components/home/SellMethods';
import Process from '@/components/home/Process';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <main>
      {/* 1. Navbar Navigation */}
      <Navbar />

      {/* 2. Hero Area Section */}
      <Hero />

      {/* 3. Selling Methods Section */}
      <SellMethods />

      {/* 4. Transparent Process Section */}
      <Process />

      {/* 5. Customer Testimonials Section */}
      <Testimonials />

      {/* 6. FAQs Accordion Section */}
      <FAQ />

      {/* 7. Footer Section */}
      <Footer />
    </main>
  );
}
