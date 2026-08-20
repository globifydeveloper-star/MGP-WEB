'use client';

import React, { useState } from 'react';
import SellGoldModal from '@/components/layout/SellGoldModal';
import GoldRateHero from './hero/GoldRateHero';
import GoldValueForm from '@/components/home/GoldValueForm/GoldValueForm';
import WhyRatesChange from './why-rates-change/WhyRatesChange';
import ValuationProcess from './valuation-process/ValuationProcess';
import GoldRateCTA from './cta/GoldRateCTA';
import GoldRateFAQ from './faq/GoldRateFAQ';
import TrustStrip from './trust-strip/TrustStrip';

export default function GoldRatePage() {
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);

  return (
    <>
      
      <main>
        <GoldRateHero onSellGoldClick={() => setIsSellGoldOpen(true)} />

        <GoldValueForm />

        <WhyRatesChange />

        <ValuationProcess />

        <GoldRateCTA onSellGoldClick={() => setIsSellGoldOpen(true)} />

        <GoldRateFAQ />

        <TrustStrip />
      </main>

      
      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </>
  );
}
