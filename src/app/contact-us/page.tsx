import { Metadata } from 'next';
import ContactPage from '@/components/contact/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us | Muthoot Gold Point',
  description:
    'Get in touch with Muthoot Gold Point. Find our registered office details, write to us directly, or look up the address, phone, and email for any of our branches.',
  openGraph: {
    title: 'Contact Us | Muthoot Gold Point',
    description:
      'Find our registered office details, write to us directly, or look up any Muthoot Gold Point branch by city.',
    type: 'website',
  },
};

export default ContactPage;
