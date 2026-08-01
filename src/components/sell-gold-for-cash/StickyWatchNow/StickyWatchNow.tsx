'use client';

import React, { useState } from 'react';
import VideoModal from '@/components/common/VideoModal/VideoModal';
import './StickyWatchNow.css';

export default function StickyWatchNow() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      {/* Sticky 3D Flipping Watch Now Tab (Button Flips, Content Never Flips) */}
      <button
        type="button"
        className="sg-sticky-watch-btn"
        onClick={() => setIsVideoOpen(true)}
        aria-label="Watch video demo"
      >
        <div className="sg-sticky-watch-inner">
          <div className="sg-sticky-watch-content">
            <span className="sg-sticky-watch-text">Watch Now</span>
            <div className="sg-sticky-play-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" className="sg-play-svg">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Multilingual Video Popup Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title="Muthoot Gold Point — Gold Valuation Demo"
      />
    </>
  );
}

