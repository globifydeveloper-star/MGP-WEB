'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AboutHero from './abouthero/abouthero';
import GoldRecycling from './goldrecycling/goldrecycling';
import MuthootBlue from './muthootblue/muthootblue';
import History from './history/history';
import StandToday from './standtoday/standtoday';
import Philanthropy from './philanthropy/philanthropy';

export default function AboutUsPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* 1. Navigation Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <AboutHero
          onExploreClick={() => scrollToSection('what-we-do')}
        />

        {/* 3. Gold Recycling & transparent processes */}
        <GoldRecycling />
        {/* 5. Historical Milestones Timeline */}
        <History />

        {/* 4. Parent Group (Muthoot Pappachan Group / Muthoot Blue) */}
        <MuthootBlue />

        {/* 6. Present day financial supermarket status */}
        <StandToday />



        {/* 7. Philanthropy & HEEL program details */}
        <Philanthropy />
      </main>

      {/* 8. Footer Section */}
      <Footer />
    </>
  );
}
