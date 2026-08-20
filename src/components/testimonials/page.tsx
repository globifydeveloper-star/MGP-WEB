'use client';

import React, { useState } from 'react';
import SellGoldModal from '@/components/layout/SellGoldModal';
import TestimonialsHero from './testimonialshero/testimonialshero';
import StatsStrip from './statsstrip/statsstrip';
import TestimonialsGrid from './testimonialsgrid/testimonialsgrid';
import TestimonialsCTA from './cta/TestimonialsCTA';

export default function TestimonialsPage() {
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);

  return (
    <>
      
      <main>
        <TestimonialsHero />

        <StatsStrip />

        <TestimonialsGrid />

        <TestimonialsCTA onSellGoldClick={() => setIsSellGoldOpen(true)} />
      </main>

      
      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </>
  );
}
