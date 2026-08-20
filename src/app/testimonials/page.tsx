import { Metadata } from 'next';
import TestimonialsPage from '@/components/testimonials/page';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Customer Testimonials | Muthoot Gold Point',
  description:
    "Read real customer testimonials and reviews about Muthoot Gold Point's transparent gold valuation, fair pricing, and trusted service.",
  openGraph: {
    title: 'Customer Testimonials | Muthoot Gold Point',
    description:
      "Read real customer testimonials and reviews about Muthoot Gold Point's transparent gold valuation and trusted service.",
    type: 'website',
  },
};

export default function TestimonialsRoute() {
  return (
    <>
      <Navbar />
      <TestimonialsPage />
      <Footer />
    </>
  );
}
