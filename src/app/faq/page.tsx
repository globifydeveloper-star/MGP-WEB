import { Metadata } from 'next';
import FAQPage from '@/components/faq/FAQPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'FAQs | Muthoot Gold Point',
  description:
    'Frequently Asked Questions about selling gold, gold valuation process, purity testing, live rates, and branch visits at Muthoot Gold Point.',
  openGraph: {
    title: 'Frequently Asked Questions | Muthoot Gold Point',
    description:
      'Find answers to all your questions regarding selling gold for cash, XRF scientific purity evaluation, instant payments, and document requirements.',
    type: 'website',
  },
};

export default function FAQRoute() {
  return (
    <>
      <Navbar />
      <FAQPage />
      <Footer />
    </>
  );
}
