'use client';

import React, { useState } from 'react';
import AboutHero from './abouthero/abouthero';
import MuthootBlue from './muthootblue/muthootblue';
import History from './history/history';
import StandToday from './standtoday/standtoday';
import Philanthropy from './philanthropy/philanthropy';
import FAQ from '@/components/home/FAQ/FAQ';
import SellGoldModal from '@/components/layout/SellGoldModal';
import { AboutUsPageData } from '@/lib/strapi';

interface AboutUsPageProps {
  data: AboutUsPageData;
  faqs?: any[];
}

export default function AboutUsPage({ data, faqs }: AboutUsPageProps) {
  const [isSellGoldOpen, setIsSellGoldOpen] = useState(false);

  return (
    <>
      <main>
        <AboutHero
          data={data}
          onExploreClick={() => setIsSellGoldOpen(true)}
        />

        <MuthootBlue data={data} />
        <History data={data} />
        <StandToday data={data} />
        <Philanthropy data={data} />
        <FAQ faqs={faqs} />
      </main>

      <SellGoldModal
        isOpen={isSellGoldOpen}
        onClose={() => setIsSellGoldOpen(false)}
      />
    </>
  );
}
