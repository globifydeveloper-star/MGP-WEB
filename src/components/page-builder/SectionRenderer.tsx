import React from 'react';
import Hero from '@/components/home/Hero/Hero';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import TheGpDiff from '@/components/home/TheGpDiff/TheGpDiff';
import NewSection from '@/components/home/NewSection/NewSection';
import Feedback from '@/components/home/Feedback/Feedback';
import FAQ from '@/components/home/FAQ/FAQ';
import OTPEnquiryForm from '@/components/common/OTPEnquiryForm/OTPEnquiryForm';
import { DynamicPageSection } from '@/lib/strapi';

interface SectionRendererProps {
  sections?: DynamicPageSection[];
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <div className="dynamic-page-sections">
      {sections.map((section, idx) => {
        const key = `${section.__component}-${section.id || idx}`;

        switch (section.__component) {
          case 'sections.hero-section': {
            const isHalf = section.layout === 'half';
            const heroContent = (
              <Hero
                slide={{
                  heroText: section.heroText,
                  heroSubtext: section.heroSubtext,
                  button1: section.button1,
                  button2: section.button2,
                }}
                imageSrc={section.heroImage?.url}
              />
            );

            if (isHalf) {
              return (
                <div key={key} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
                  {heroContent}
                </div>
              );
            }
            return <React.Fragment key={key}>{heroContent}</React.Fragment>;
          }

          case 'sections.gold-sell-process-section':
            return (
              <GoldSellProcess
                key={key}
                steps={section.process_steps}
              />
            );

          case 'sections.gp-difference-section':
            return (
              <TheGpDiff
                key={key}
                cards={section.difference_boxes}
              />
            );

          case 'sections.promo-slider-section':
            return (
              <NewSection
                key={key}
                slides={section.promo_slides}
              />
            );

          case 'sections.feedback-section':
            return (
              <Feedback
                key={key}
                reviews={section.testimonials}
              />
            );

          case 'sections.faq-section':
            return (
              <FAQ
                key={key}
                faqs={section.faqs}
              />
            );

          case 'sections.otp-enquiry-section':
            return (
              <section key={key} className="container" style={{ padding: '60px 20px' }}>
                <OTPEnquiryForm
                  sourceForm={section.sourceForm}
                  enquiryType={section.enquiryType}
                />
              </section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
