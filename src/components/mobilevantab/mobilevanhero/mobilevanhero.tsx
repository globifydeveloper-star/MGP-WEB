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
      <img src="/pattern2.png" alt="" className="mvh-swirl" aria-hidden="true" />

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
            <img src="/pattern4.png" alt="" className="mvh-pattern-tile" />
          </div>
        </div>

        <div className="mvh-content-col">
          <h1 className="mvh-heading">
            <span className="mvh-heading-light">{data?.heroHeadingLight1 || 'Premium Gold'}</span>
            <span className="mvh-heading-light">{data?.heroHeadingLight2 || 'Liquidation'}</span>
            <span className="mvh-heading-bold">{data?.heroHeadingBold || 'At Your Doorstep'}</span>
          </h1>
          <p className="mvh-desc">
            {data?.heroDescription || 'Experience the luxury of professional gold valuation without leaving your home. Our secure mobile vans bring high-tech XRF testing and instant bank transfers directly to you.'}
          </p>
        </div>
      </div>
    </section>
  );
}
