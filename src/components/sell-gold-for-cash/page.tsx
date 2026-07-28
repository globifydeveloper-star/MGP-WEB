'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SellGoldHero from './SellGoldHero/SellGoldHero';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldSellComparison from './GoldSellComparison/GoldSellComparison';
import GoldSellOverview from './GoldSellOverview/GoldSellOverview';

export default function SellGoldForCashPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <SellGoldHero />

        {/* Gold Selling Process Section */}
        <GoldSellProcess />

        {/* How We're Different From Traditional Jewellers */}
        <GoldSellComparison />

        {/* Sell Your Gold, Get Cash Instantly Overview */}
        <GoldSellOverview />

      </main>

      <Footer />
    </>
  );
}
