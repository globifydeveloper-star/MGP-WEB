import React from 'react';
import HeroSlider from '@/components/home/HeroSlider/HeroSlider';
import GoldSellProcess from '@/components/home/GoldSellProcess/GoldSellProcess';
import TheGpDiff from '@/components/home/TheGpDiff/TheGpDiff';
import NewSection from '@/components/home/NewSection/NewSection';
import Feedback from '@/components/home/Feedback/Feedback';
import FAQ from '@/components/home/FAQ/FAQ';
import OTPEnquiryForm from '@/components/common/OTPEnquiryForm/OTPEnquiryForm';
import ReactMarkdown from 'react-markdown';
import { getTestimonials, getFaqsByPage, DynamicPageSection } from '@/lib/strapi';

interface SectionRendererProps {
  sections?: DynamicPageSection[];
  pageId?: number;
}

export default async function SectionRenderer({ sections, pageId }: SectionRendererProps) {
  if (!sections || sections.length === 0) return null;

  // Pre-fetch global data if the corresponding sections are present
  const hasTestimonials = sections.some(s => s.__component === 'page-section.testimonials' || s.__component === 'sections.feedback-section');
  const hasFaqs = sections.some(s => s.__component === 'page-section.faq' || s.__component === 'sections.faq-section');

  const testimonialsData = hasTestimonials ? await getTestimonials() : [];
  const faqsData = hasFaqs && pageId ? await getFaqsByPage(pageId) : [];

  const sectionRegistry: Record<string, React.ComponentType<any>> = {
    'page-section.hero-banner': ({ section }) => (
      <HeroSlider layout={section.layout} slides={section.slides} />
    ),
    'page-section.gold-process': ({ section }) => (
      <GoldSellProcess steps={section.steps} />
    ),
    'page-section.difference-grid': ({ section }) => (
      <TheGpDiff cards={section.boxes} />
    ),
    'page-section.promo-slider': ({ section }) => (
      <NewSection slides={section.slides} />
    ),
    'page-section.testimonials': () => (
      <Feedback reviews={testimonialsData} />
    ),
    'page-section.faq': () => (
      <FAQ faqs={faqsData} />
    ),
    'page-section.contact-form': () => (
      <section className="container" style={{ padding: '60px 20px' }}>
        <OTPEnquiryForm />
      </section>
    ),
    // Fallback for older sections
    'sections.hero-section': ({ section }) => (
      <HeroSlider layout={section.layout} slides={[{
        heroText: section.heroText,
        heroSubtext: section.heroSubtext,
        button1: section.button1,
        button2: section.button2,
        media: section.heroImage
      }]} />
    ),
    'sections.gold-sell-process-section': ({ section }) => (
      <GoldSellProcess steps={section.process_steps} />
    ),
    'sections.gp-difference-section': ({ section }) => (
      <TheGpDiff cards={section.difference_boxes} />
    ),
    'sections.promo-slider-section': ({ section }) => (
      <NewSection slides={section.promo_slides} />
    ),
    'sections.feedback-section': () => (
      <Feedback reviews={testimonialsData} />
    ),
    'sections.faq-section': () => (
      <FAQ faqs={faqsData} />
    ),
    'sections.otp-enquiry-section': ({ section }) => (
      <section className="container" style={{ padding: '60px 20px' }}>
        <OTPEnquiryForm sourceForm={section.sourceForm} enquiryType={section.enquiryType} />
      </section>
    ),
    'sections.rich-text': ({ section }) => (
      <section className="container" style={{ padding: '40px 20px' }}>
        <div className="prose" style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
          <ReactMarkdown>{section.content}</ReactMarkdown>
        </div>
      </section>
    ),
  };

  return (
    <div className="dynamic-page-sections">
      {sections.map((section, idx) => {
        const key = `${section.__component}-${section.id || idx}`;
        const Component = sectionRegistry[section.__component];

        if (!Component) {
          return null;
        }

        return <Component key={key} section={section} />;
      })}
    </div>
  );
}
