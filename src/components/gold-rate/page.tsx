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

export default function GoldRatePage({
  data,
  goldValueFormImage,
  showCalculator = false,
}: {
  data?: any;
  goldValueFormImage?: string;
  showCalculator?: boolean;
}) {
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);

  return (
    <>
      <main>
        <GoldRateHero
          onSellGoldClick={() => setIsSellGoldOpen(true)}
          heroTitle={data?.heroTitle}
          heroDescription={data?.heroDescription}
          heroImage={data?.heroImage}
          showCalculator={showCalculator}
        />

        {showCalculator && <GoldValueForm sectionImage={goldValueFormImage} />}

        <WhyRatesChange
          sectionImage={data?.whyGoldRateChangesImage}
          title={data?.whyTitle}
          titleHighlight={data?.whyTitleHighlight}
          titleSuffix={data?.whyTitleSuffix}
          reasons={data?.whyReasons}
        />

        <ValuationProcess
          sectionImage={data?.valuationProcessImage}
          title={data?.valuationTitle}
          titleHighlight={data?.valuationTitleHighlight}
          titleSuffix={data?.valuationTitleSuffix}
          steps={data?.valuationSteps}
        />

        <GoldRateCTA
          onSellGoldClick={() => setIsSellGoldOpen(true)}
          title={data?.ctaTitle}
          subtext={data?.ctaSubtext}
          primaryButtonLabel={data?.ctaPrimaryLabel}
          secondaryButtonLabel={data?.ctaSecondaryLabel}
          secondaryButtonLink={data?.ctaSecondaryLink}
        />

        <GoldRateFAQ faqs={data?.faqs} />

        <TrustStrip items={data?.trustItems} />
      </main>

      <SellGoldModal isOpen={isSellGoldOpen} onClose={() => setIsSellGoldOpen(false)} />
    </>
  );
}
