'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroLeft from './HeroLeft';
import Timeline from './Timeline';
import HeroImage from './HeroImage';
import BranchSelector from '../BranchSelector';
import StatsBar from '../StatsBar';

export default function HeroSection() {
  return (
    <section className="hero-section-root">
      {/* Background radial gradient overlay and SVG pattern */}
      <div className="bg-overlay"></div>
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main Hero Content Area */}
      <div className="container hero-main-container">
        <div className="hero-grid">
          
          {/* Column 1: Left Text & CTAs */}
          <HeroLeft />

          {/* Column 2: Middle Arc Curve */}
          <div className="hero-middle-col">
            <Timeline />
          </div>

          {/* Column 3: Right Woman & Rate Overlay */}
          <HeroImage />

        </div>

        {/* Floating Branch Selector */}
        <div className="branch-selector-container">
          <BranchSelector />
        </div>
      </div>

      {/* Bottom Stats Ribbon */}
      <StatsBar />
    </section>
  );
}
