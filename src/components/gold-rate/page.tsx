'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SellGoldModal from '@/components/layout/SellGoldModal';
import GoldRateHero from './hero/GoldRateHero';
import CalculatorRatesSection from './calculator-rates/CalculatorRatesSection';
import WhyRatesChange from './why-rates-change/WhyRatesChange';
import ValuationProcess from './valuation-process/ValuationProcess';
import GoldRateCTA from './cta/GoldRateCTA';
import GoldRateFAQ from './faq/GoldRateFAQ';
import TrustStrip from './trust-strip/TrustStrip';

export default function GoldRatePage() {
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        <GoldRateHero onSellGoldClick={() => setIsSellGoldOpen(true)} />

        <CalculatorRatesSection />

        <WhyRatesChange />

        <ValuationProcess />

        <GoldRateCTA onSellGoldClick={() => setIsSellGoldOpen(true)} />

        <GoldRateFAQ />

        <TrustStrip />
      </main>

      <Footer />

      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </>
  );
}
