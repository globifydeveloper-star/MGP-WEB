import { Metadata } from 'next';
import CommunityPage from '@/components/community/CommunityPage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Community | Muthoot Gold Point',
  description: 'Discover the CSR initiatives of the Muthoot Pappachan Foundation across Health, Education, Environment and Livelihood (HEEL) — touching thousands of lives across India.',
  keywords: ['Muthoot Pappachan Foundation', 'CSR', 'Community', 'HEEL', 'Smile Mission', 'Muthoot Football Academy', 'Muthoot Gold Point'],
  authors: [{ name: 'Muthoot Gold Point' }],
  alternates: {
    canonical: '/community',
  },
  openGraph: {
    title: 'Community | Muthoot Gold Point',
    description: 'CSR initiatives of the Muthoot Pappachan Foundation across Health, Education, Environment and Livelihood.',
    url: '/community',
    siteName: 'Muthoot Gold Point',
    type: 'website',
    images: [
      {
        url: '/default-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Muthoot Gold Point Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community | Muthoot Gold Point',
    description: 'CSR initiatives of the Muthoot Pappachan Foundation across Health, Education, Environment and Livelihood.',
    images: ['/default-og-image.jpg'],
  },
};

export default function CommunityRoute() {
  return (
    <>
      <Navbar />
      <CommunityPage />
      <Footer />
    </>
  );
}
