'use client';

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 90,
      damping: 14
    }
  }
};

export default function HeroLeftColumn() {
  return (
    <motion.div
      className="hero-left-column-v2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Trust Badge */}
      <motion.div className="hero-trust-badge-v2" variants={itemVariants}>
        <span className="trust-badge-circle-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </span>
        <span className="trust-badge-text-v2">
          Trusted by <span className="gold-highlight">5 Lakh+ Customers</span> Across India
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 className="hero-main-title-v2" variants={itemVariants}>
        Sell Your Gold.<br />
        <span className="hero-gold-text">Get Cash Today.</span>
      </motion.h1>

      {/* Subcopy Paragraph */}
      <motion.div className="hero-subcopy-wrapper-v2" variants={itemVariants}>
        <p className="hero-subcopy-text-v2">
          Get the True Market Value Old, Unused or pledged gold through a transparent
          process conducted entirely in front of you
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div className="hero-cta-group-v2" variants={itemVariants}>
        <button
          className="btn-gold-gradient"
          onClick={() => {
            const element = document.getElementById('branches');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Find Nearest Branch
        </button>
        <button
          className="btn-white-outline-v2"
          onClick={() => {
            const element = document.getElementById('process');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          See how it works
        </button>
      </motion.div>
    </motion.div>
  );
}
