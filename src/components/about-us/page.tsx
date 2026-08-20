'use client';

import React from 'react';
import AboutHero from './abouthero/abouthero';
import GoldRecycling from './goldrecycling/goldrecycling';
import MuthootBlue from './muthootblue/muthootblue';
import History from './history/history';
import StandToday from './standtoday/standtoday';
import Philanthropy from './philanthropy/philanthropy';
import FAQ from '@/components/home/FAQ/FAQ';
import { AboutUsPageData } from '@/lib/strapi';

interface AboutUsPageProps {
  data: AboutUsPageData;
}

export default function AboutUsPage({ data }: AboutUsPageProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      
      <main>
        <AboutHero
          data={data}
          onExploreClick={() => scrollToSection('what-we-do')}
        />

        <GoldRecycling data={data} />
        <History data={data} />
        <MuthootBlue data={data} />
        <StandToday data={data} />
        <Philanthropy data={data} />
        <FAQ />
      </main>


    </>
  );
}
