'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SellGoldHero from './SellGoldHero/SellGoldHero';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldSellComparison from './GoldSellComparison/GoldSellComparison';
import GoldSellOverview from './GoldSellOverview/GoldSellOverview';
import AboutHero from '@/components/about-us/abouthero/abouthero';
import GoldSellContact from './GoldSellContact/GoldSellContact';

export default function SellGoldForCashPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)', backgroundColor: '#0c1835' }}>
        <SellGoldHero />

        {/* Gold Selling Process Section */}
        <GoldSellProcess />

        {/* How We're Different From Traditional Jewellers */}
        <GoldSellComparison />

        {/* Sell Your Gold, Get Cash Instantly Overview */}
        <GoldSellOverview />

        {/* About Muthoot Gold Point */}
        <AboutHero onExploreClick={() => scrollToSection('sell-gold-form')} />

        {/* Get in Touch */}
        <GoldSellContact />

      </main>

      <Footer />
    </>
  );
}
