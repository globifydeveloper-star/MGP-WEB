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
          title={
            data?.heroTitle
              ? data.heroTitleHighlight
                ? `${data.heroTitle} <span class="gold-text">${data.heroTitleHighlight}</span>`
                : data.heroTitle
              : undefined
          }
          subtitle={data?.heroEyebrow || data?.heroSubtitle}
          description={data?.heroDescription}
        />

        <StatsStrip stats={data?.stats} />

        <TestimonialsGrid
          title={data?.gridTitle}
          pretitle={data?.gridPretitle}
          subtitle={data?.gridSubtitle}
          readMoreLabel={data?.readMoreLabel}
          readLessLabel={data?.readLessLabel}
        />

        <TestimonialsCTA
          onSellGoldClick={() => setIsSellGoldOpen(true)}
          title={data?.ctaTitle}
          subtitle={data?.ctaSubtext || data?.ctaSubtitle}
          buttonText={data?.ctaPrimaryLabel || data?.ctaButtonText}
          buttonLink={data?.ctaSecondaryLink || data?.ctaButtonLink}
        />
      </main>

      
      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </>
  );
}
