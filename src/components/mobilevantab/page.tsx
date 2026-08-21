import Navbar from '@/components/layout/Navbar';
import MobileVanHero from '@/components/mobilevantab/mobilevanhero/mobilevanhero';
import FourStep from '@/components/mobilevantab/fourstep/fourstep';
import TestingCards from '@/components/mobilevantab/testingcards/testingcards';
import LocationService from '@/components/mobilevantab/locationservice/locationservice';
import Appoinment from '@/components/mobilevantab/appoinment/appoinment';
import Footer from '@/components/layout/Footer';
import { MobileVanPageData } from '@/lib/strapi';

interface MobileVanTabProps {
  data?: MobileVanPageData | null;
}

export default function MobileVanTab({ data }: MobileVanTabProps) {
  return (
    <main>
      {/* 1. Navbar Navigation */}
      <Navbar />

      {/* Mobile Van Hero Section */}
      <MobileVanHero data={data} />

      {/* A Seamless 4-Step Journey */}
      <FourStep data={data} />

      {/* Testing Cards Section */}
      <TestingCards data={data} />

      {/* Available Location Services */}
      <LocationService data={data} />

      {/* Book Your Van Appointment */}
      <Appoinment data={data} />

      {/* 2. Footer Section */}
      <Footer />
    </main>
  )
}
