import type { ComponentType } from 'react';
import type { StaticImageData } from 'next/image';
import HeroSlideOne from './HeroSlideOne';
import placeholderImg from '@/assets/images/hm6-img01.png';

export interface HeroSlideCta {
  label: string;
  targetId: string;
}

/**
 * A "custom" slide renders its own hand-built component (used for the
 * original Figma-pixel-pinned Slide 1). A "content" slide is fully
 * data-driven and rendered through the shared <HeroSlide /> layout.
 */
export type HeroSlideData =
  | {
      id: string;
      kind: 'custom';
      Component: ComponentType;
    }
  | {
      id: string;
      kind: 'content';
      eyebrow?: string;
      headingLine1: string;
      headingLine2: string;
      subtitle: string;
      primaryCta: HeroSlideCta;
      secondaryCta: HeroSlideCta;
      image: { src: StaticImageData; alt: string };
    };

export const heroSlides: HeroSlideData[] = [
  {
    id: 'slide-sell-gold',
    kind: 'custom',
    Component: HeroSlideOne,
  },
  {
    id: 'slide-transparency',
    kind: 'content',
    eyebrow: 'Coming soon',
    headingLine1: 'Sell Your Gold with',
    headingLine2: 'Complete Transparency',
    subtitle: 'Experience scientific gold valuation and instant payment.',
    primaryCta: { label: 'Learn More', targetId: 'process' },
    secondaryCta: { label: 'Locate Branch', targetId: 'branches' },
    image: { src: placeholderImg, alt: 'Placeholder preview for upcoming Hero slide' },
  },
];
