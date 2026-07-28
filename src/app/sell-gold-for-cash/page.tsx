import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SellGoldHero from '@/components/sell-gold-for-cash/SellGoldHero';
import SellGoldProcess from '@/components/sell-gold-for-cash/SellGoldProcess';
import TheMgpDifference from '@/components/sell-gold-for-cash/TheMgpDifference';
import SellGoldFeatures from '@/components/sell-gold-for-cash/SellGoldFeatures';
import SellGoldTestimonials from '@/components/sell-gold-for-cash/SellGoldTestimonials';
import MuthootBlueLegacy from '@/components/sell-gold-for-cash/MuthootBlueLegacy';
import SellGoldCTA from '@/components/sell-gold-for-cash/SellGoldCTA';
import FAQ from '@/components/home/FAQ/FAQ';
import BranchLocator from '@/components/home/BranchLocator/BranchLocator';

export const metadata: Metadata = {
  title: 'Sell Gold for Cash Instantly | Muthoot Gold Point',
  description:
    'Sell your gold easily with Muthoot Gold Point. Enjoy free gold purity testing, ultrasonic cleaning, and instant cash or digital bank transfer at 11+ branches across India.',
  keywords: [
    'sell gold',
    'sell gold for cash',
    'cash for gold',
    'sell old gold online',
    'gold buyers near me',
    'Muthoot Gold Point',
    'XRF gold testing',
  ],
  openGraph: {
    title: 'Sell Gold for Cash Instantly | Muthoot Gold Point',
    description:
      'Sell your gold with 100% fair scientific evaluation, ultrasonic cleaning & instant payout.',
    type: 'website',
    url: 'https://www.muthootgoldpoint.com/sell-gold-for-cash/',
  },
};

export default function SellGoldForCashPage() {
  return (
    <main>
      {/* Global Navbar */}
      <Navbar />

      {/* 1. Hero & Lead Capture Section */}
      <SellGoldHero />

      {/* 2. 5-Step Transparent Process */}
      <SellGoldProcess />

      {/* 3. Muthoot Gold Point vs Traditional Jewellers */}
      <TheMgpDifference />

      {/* 4. Core Features & Mobile Van Offerings */}
      <SellGoldFeatures />

      {/* 5. Real Customer Success Stories */}
      <SellGoldTestimonials />

      {/* 6. Muthoot Pappachan Group (Muthoot Blue) Legacy */}
      <MuthootBlueLegacy />

      {/* 7. Branch Locator */}
      <BranchLocator />

      {/* 8. Frequently Asked Questions */}
      <FAQ />

      {/* 9. Bottom CTA Section */}
      <SellGoldCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
