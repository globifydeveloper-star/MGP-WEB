'use client';

import React from 'react';
import SellGoldHero from './SellGoldHero/SellGoldHero';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import GoldSellComparison from './GoldSellComparison/GoldSellComparison';
import GoldSellOverview from './GoldSellOverview/GoldSellOverview';
import AboutHero from '@/components/about-us/abouthero/abouthero';
import GoldSellContact from './GoldSellContact/GoldSellContact';
import StickyWatchNow from './StickyWatchNow/StickyWatchNow';

interface SellGoldForCashPageProps {
  processSteps?: any[];
  comparisonRows?: { title?: string; mgpText?: string; tradText?: string }[];
  pageSettings?: any;
}

export default function SellGoldForCashPage({ processSteps, comparisonRows, pageSettings }: SellGoldForCashPageProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Sticky 3D Flipping Watch Now Button & Multilingual Video Modal */}
      <StickyWatchNow />

      <main style={{ backgroundColor: '#0c1835' }}>
        <SellGoldHero
          heroImage={pageSettings?.heroImage}
          trustBadgePrefix={pageSettings?.trustBadgePrefix}
          trustBadgeHighlight={pageSettings?.trustBadgeHighlight}
          trustBadgeSuffix={pageSettings?.trustBadgeSuffix}
          heroTitle={pageSettings?.heroTitle}
          heroTitleHighlight={pageSettings?.heroTitleHighlight}
          heroSubtitle={pageSettings?.heroSubtitle}
          heroBullets={pageSettings?.heroBullets}
          heroFormTitle={pageSettings?.heroFormTitle}
          heroFormSubtitle={pageSettings?.heroFormSubtitle}
          heroFormSuccessText={pageSettings?.heroFormSuccessText}
          heroFormResetLabel={pageSettings?.heroFormResetLabel}
        />

        {/* Gold Selling Process Section */}
        <GoldSellProcess steps={processSteps} />

        {/* How We're Different From Unorganised Sector */}
        <GoldSellComparison rows={comparisonRows} ctaHref="#sell-gold-contact" />

        {/* Sell Your Gold, Get Cash Instantly Overview */}
        <GoldSellOverview
          overviewEyebrow={pageSettings?.overviewEyebrow}
          overviewTitle={pageSettings?.overviewTitle}
          overviewTitleHighlight={pageSettings?.overviewTitleHighlight}
          overviewSubtitle={pageSettings?.overviewSubtitle}
          overviewDescription={pageSettings?.overviewDescription}
          overviewButtonLabel={pageSettings?.overviewButtonLabel}
          overviewButtonLink={pageSettings?.overviewButtonLink}
          overviewTile1Text={pageSettings?.overviewTile1Text}
          overviewTile2Text={pageSettings?.overviewTile2Text}
          overviewTile3Text={pageSettings?.overviewTile3Text}
          overviewTile4Text={pageSettings?.overviewTile4Text}
          overviewImage1={pageSettings?.overviewImage1}
          overviewImage2={pageSettings?.overviewImage2}
        />

        {/* About Muthoot Gold Point */}
        <AboutHero onExploreClick={() => scrollToSection('sell-gold-form')} headingLevel="h2" />

        {/* Get in Touch */}
        <GoldSellContact
          contactTitle={pageSettings?.contactTitle}
          contactTitleHighlight={pageSettings?.contactTitleHighlight}
          contactDescription={pageSettings?.contactDescription}
          contactPhone={pageSettings?.contactPhone}
          contactEmail={pageSettings?.contactEmail}
          contactSuccessText={pageSettings?.contactSuccessText}
        />

      </main>

          </>
  );
}
