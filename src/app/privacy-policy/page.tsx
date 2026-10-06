import { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/privacy-policy/PrivacyPolicyPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Muthoot Gold Point',
  description: 'Read the Privacy Policy at Muthoot Gold Point for understanding how we collect, protect, and handle your information.',
  keywords: ['Privacy Policy', 'Muthoot Gold Point Privacy', 'Customer Data Protection', 'Terms and Policies'],
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Muthoot Gold Point',
    description: 'Understand how Muthoot Gold Point collects, uses, and safeguards your personal information.',
    url: '/privacy-policy',
    siteName: 'Muthoot Gold Point',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Muthoot Gold Point',
    description: 'Understand how Muthoot Gold Point collects, uses, and safeguards your personal information.',
  },
};

export default function PrivacyPolicyRoute() {
  return (
    <>
      <Navbar />
      <main>
        <PrivacyPolicyPage />
      </main>
      <Footer />
    </>
  );
}
