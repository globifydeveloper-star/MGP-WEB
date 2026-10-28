'use client';

import React, { useState } from 'react';
import SellGoldModal from '@/components/layout/SellGoldModal';
import TestimonialsHero from './testimonialshero/testimonialshero';
import StatsStrip from './statsstrip/statsstrip';
import TestimonialsGrid from './testimonialsgrid/testimonialsgrid';
import TestimonialsCTA from './cta/TestimonialsCTA';

import type { TestimonialsPageData } from '@/lib/strapi';

export default function TestimonialsPage({ data }: { data?: TestimonialsPageData | null }) {
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);

  return (
    <>
      <main>
        <TestimonialsHero
          title={data?.heroTitle}
          subtitle={data?.heroSubtitle}
          description={data?.heroDescription}
        />

        <StatsStrip />

        <TestimonialsGrid />

        <TestimonialsCTA
          onSellGoldClick={() => setIsSellGoldOpen(true)}
          title={data?.ctaTitle}
          subtitle={data?.ctaSubtitle}
          buttonText={data?.ctaButtonText}
          buttonLink={data?.ctaButtonLink}
        />
      </main>

      
      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </>
  );
}
