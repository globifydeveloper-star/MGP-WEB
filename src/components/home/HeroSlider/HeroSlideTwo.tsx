import Image from 'next/image';
import goldsImg from '@/assets/images/golds.png';
import HeroGoldRateCard from '@/components/home/Hero/HeroGoldRateCard';
import './heroSlider.css';

interface HeroSlideTwoProps {
  slide?: any;
  imageSrc?: string;
}

export default function HeroSlideTwo({ slide, imageSrc }: HeroSlideTwoProps) {
  const text = slide?.heroText || "Get 100% Value for Your Gold. Safe, Transparent & Scientific.";
  const parts = text.split('. ');
  const whiteText = parts[0] ? parts[0] + (parts[1] !== undefined ? '.' : '') : '';
  const goldText = parts[1] ? parts[1] : '';

  const subcopy = slide?.heroSubtext || "Sell your gold with complete peace of mind. We use advanced XRF machines for purity testing right in front of you, ensuring you get the exact market rate.";

  const btn1Enabled = slide?.button1 ? slide.button1.enabled : true;
  const btn1Label = slide?.button1?.label || "Locate Nearest Branch";
  const btn1Link = slide?.button1?.link || "#branches";

  const btn2Enabled = slide?.button2 ? slide.button2.enabled : true;
  const btn2Label = slide?.button2?.label || "Check Gold Purity";
  const btn2Link = slide?.button2?.link || "#gold-value-form";

  const handleCta = (link: string) => {
    if (!link) return;
    if (link.startsWith('#')) {
      const element = document.getElementById(link.substring(1));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <section className="hero-slide-two-section">
      <div className="hero-slide-two-bg" aria-hidden="true">
        <Image
          src={imageSrc || goldsImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-slide-two-bg-img"
        />
        <div className="hero-slide-two-overlay" />
      </div>

      <div className="hero-slide-two-container">
        <div className="hero-slide-two-content">
          <div className="hero-slide-two-badge">
            <span className="hero-slide-two-badge-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
                <path d="M15 8a4 4 0 0 1 0 8" />
                <path d="M18 5a8 8 0 0 1 0 14" />
              </svg>
            </span>
            <span className="hero-slide-two-badge-text">
              <span className="hero-slide-two-badge-highlight">Muthoot Goldpoint:</span> India&apos;s First National Level Organised Gold Buyer
            </span>
          </div>

          <h2 className="hero-slide-two-title">
            <span className="hero-slide-two-title-white">{whiteText}</span>
            {goldText && <span className="hero-slide-two-title-gold">{goldText}</span>}
          </h2>

          <p className="hero-slide-two-subcopy">
            {subcopy}
          </p>

          <div className="hero-slide-two-cta-group">
            {btn1Enabled && (
              <button className="hero-slide-two-btn-gold" onClick={() => handleCta(btn1Link)}>
                {btn1Label}
              </button>
            )}
            {btn2Enabled && (
              <button className="hero-slide-two-btn-outline" onClick={() => handleCta(btn2Link)}>
                {btn2Label}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Gold Rate Card */}
        <div className="hero-slide-two-mobile-rate-card">
          <div className="hero-mobile-rate-card-container">
            <HeroGoldRateCard />
          </div>
        </div>
      </div>

      {/* Desktop Gold Rate Card Canvas */}
      <div className="hero-scaled-host hero-figma-canvas-host hero-slide-two-desktop-rate-card">
        <div className="hero-figma-canvas">
          <HeroGoldRateCard />
        </div>
      </div>
    </section>
  );
}
