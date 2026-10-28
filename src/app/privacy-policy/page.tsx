import { Metadata } from 'next';
import PrivacyPolicyPage from '@/components/privacy-policy/PrivacyPolicyPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPrivacyPolicyPage } from '@/lib/strapi';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPrivacyPolicyPage();
  const title = data?.seoTitle || 'Privacy Policy | Muthoot Gold Point';
  const description = data?.seoDescription || 'Read the Privacy Policy at Muthoot Gold Point for understanding how we collect, protect, and handle your information.';
  const ogImage = data?.ogImage || '/default-og-image.jpg';

  return {
    title,
    description,
    keywords: data?.seoKeywords ? data.seoKeywords.split(',').map((k: string) => k.trim()) : ['Privacy Policy', 'Muthoot Gold Point Privacy', 'Customer Data Protection', 'Terms and Policies'],
    alternates: {
      canonical: '/privacy-policy',
    },
    openGraph: {
      title,
      description,
      url: '/privacy-policy',
      siteName: 'Muthoot Gold Point',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PrivacyPolicyRoute() {
  const data = await getPrivacyPolicyPage();
  return (
    <>
      <Navbar />
      <main>
        <PrivacyPolicyPage data={data} />
      </main>
      <Footer />
    </>
  );
}
