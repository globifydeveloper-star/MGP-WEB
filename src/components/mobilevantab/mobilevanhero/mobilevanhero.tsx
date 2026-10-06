'use client';

import React from 'react';
import './mobilevanhero.css';
import { MobileVanPageData } from '@/lib/strapi';
import vanImgDefault from '@/assets/images/vann.png';

interface MobileVanHeroProps {
  data?: MobileVanPageData | null;
}

export default function MobileVanHero({ data }: MobileVanHeroProps) {
  return (
    <section className="mvh-section">
      <div className="mvh-bg-pattern" aria-hidden="true" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/mobile-van/pattern2.png" alt="" className="mvh-swirl" aria-hidden="true" />

      <div className="mvh-container">
        <div className="mvh-image-col">
          <div className="mvh-van-container">
            <img
              src={data?.heroImage || vanImgDefault.src}
              alt="Muthoot Gold Point mobile van"
              className="mvh-van-img"
            />
          </div>
          <div className="mvh-glow" aria-hidden="true" />
          <div className="mvh-pattern-row" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/mobile-van/pattern4.png" alt="" className="mvh-pattern-tile" />
          </div>
        </div>

        <div className="mvh-content-col">
          <h1 className="mvh-heading">
            <span className="mvh-heading-light">{data?.heroHeadingLight1 || 'Premium Gold'}</span>
            <span className="mvh-heading-light">{data?.heroHeadingLight2 || 'Liquidation'}</span>
            <span className="mvh-heading-bold">{data?.heroHeadingBold || 'At Your Doorstep'}</span>
          </h1>
          <p className="mvh-desc">
            We bring our gold valuation process directly to your doorstep—safe, secure, and fully transparent. Our Doorstep Service is available in Mumbai, Kalyan, and Bengaluru.
          </p>
        </div>
      </div>
    </section>
  );
}
