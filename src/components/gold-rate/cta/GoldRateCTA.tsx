'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './GoldRateCTA.css';
import handHoldingGoldImg from '@/assets/images/gold_rate_component_photos/05-cta-hand-holding-gold.png';

interface GoldRateCTAProps {
  onSellGoldClick: () => void;
  title?: string;
  subtext?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;
}

export default function GoldRateCTA({
  onSellGoldClick,
  title,
  subtext,
  primaryButtonLabel,
  secondaryButtonLabel,
  secondaryButtonLink,
}: GoldRateCTAProps) {
  return (
    <section className="grc-section">
      <div className="container grc-inner">
        <div className="grc-content">
          <h2 className="grc-title">{title || 'Ready to Know What Your Gold Is Worth?'}</h2>
          <p className="grc-subtext">
            {subtext || 'Get a transparent valuation for your gold from our experts.'}
          </p>
          <div className="grc-cta-row">
            <button type="button" className="grc-btn grc-btn-dark" onClick={onSellGoldClick}>
              {primaryButtonLabel || 'Sell Your Gold'}
            </button>
            <a href={secondaryButtonLink || '/#branches'} className="grc-btn grc-btn-outline">
              {secondaryButtonLabel || 'Find a Branch'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
