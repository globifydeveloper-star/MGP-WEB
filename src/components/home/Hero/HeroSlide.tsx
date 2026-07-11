import Image from 'next/image';
import type { HeroSlideData } from './heroData';

type ContentSlide = Extract<HeroSlideData, { kind: 'content' }>;

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Shared layout for data-driven Hero slides (everything except the
 * hand-built Slide 1). Reuses Slide 1's own classnames for the copy column
 * so typography/spacing stay in sync automatically.
 */
export default function HeroSlide({ slide }: { slide: ContentSlide }) {
  return (
    <div className="hero-container-v2">
      <div className="hero-left-column-v2">
        {slide.eyebrow && (
          <div className="hero-trust-badge-v2">
            <span className="trust-badge-text-v2">{slide.eyebrow}</span>
          </div>
        )}

        <h2 className="hero-main-title-v2">
          {slide.headingLine1}
          <br />
          <span className="hero-gold-text">{slide.headingLine2}</span>
        </h2>

        <div className="hero-subcopy-wrapper-v2">
          <p className="hero-subcopy-text-v2">{slide.subtitle}</p>
        </div>

        <div className="hero-cta-group-v2">
          <button
            className="btn-gold-gradient"
            onClick={() => scrollToId(slide.primaryCta.targetId)}
          >
            {slide.primaryCta.label}
          </button>
          <button
            className="btn-white-outline-v2"
            onClick={() => scrollToId(slide.secondaryCta.targetId)}
          >
            {slide.secondaryCta.label}
          </button>
        </div>
      </div>

      <div className="hero-right-column-v2 hero-slide-visual">
        <div className="hero-slide-visual-frame">
          <Image
            src={slide.image.src}
            alt={slide.image.alt}
            className="hero-slide-visual-img"
            fill
            sizes="(max-width: 1024px) 80vw, 480px"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
