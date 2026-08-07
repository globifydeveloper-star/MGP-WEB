import { Metadata } from 'next';
import TermsOfServicePage from '@/components/terms-of-service/TermsOfServicePage';

export const metadata: Metadata = {
  title: 'Terms of Service - Muthoot Gold Point | Legal Terms & Conditions',
  description:
    'Read the Terms of Service for Muthoot Gold Point to understand the legal terms, gold valuation guidelines, eligibility requirements, and customer conditions.',
  openGraph: {
    title: 'Terms of Service - Muthoot Gold Point',
    description:
      'Official Terms of Service for Muthoot Gold Point (A unit of Muthoot Exim Private Limited). Understand our gold buying terms, valuation rules, and legal agreements.',
    type: 'website',
  },
};

export default TermsOfServicePage;
