'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './GoldRateCTA.css';
import handHoldingGoldImg from '@/assets/images/gold_rate_component_photos/05-cta-hand-holding-gold.png';

interface GoldRateCTAProps {
  onSellGoldClick: () => void;
}

export default function GoldRateCTA({ onSellGoldClick }: GoldRateCTAProps) {
  return (
    <section className="grc-section">
      <div className="container grc-inner">
        <div className="grc-content">
          <h2 className="grc-title">Ready to Know What Your Gold Is Worth?</h2>
          <p className="grc-subtext">
            Get a transparent valuation for your gold from our experts.
          </p>
          <div className="grc-cta-row">
            <button type="button" className="grc-btn grc-btn-dark" onClick={onSellGoldClick}>
              Sell Your Gold
            </button>
            <Link href="/#branches" className="grc-btn grc-btn-outline">
              Find a Branch
            </Link>
          </div>
        </div>

        <div className="grc-image-wrap">
          <Image
            src={handHoldingGoldImg}
            alt="Elegant hand holding gold jewellery in warm golden lighting"
            className="grc-image"
            sizes="(max-width: 767px) 90vw, 420px"
          />
        </div>
      </div>
    </section>
  );
}
