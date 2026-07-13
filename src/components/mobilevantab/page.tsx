import Navbar from '@/components/layout/Navbar';
import MobileVanHero from '@/components/mobilevantab/mobilevanhero/mobilevanhero';
import FourStep from '@/components/mobilevantab/fourstep/fourstep';
import TestingCards from '@/components/mobilevantab/testingcards/testingcards';
import LocationService from '@/components/mobilevantab/locationservice/locationservice';
import Appoinment from '@/components/mobilevantab/appoinment/appoinment';
import Footer from '@/components/layout/Footer';

export default function MobileVanTab() {
  return (
    <main>
      {/* 1. Navbar Navigation */}
      <Navbar />

      {/* Mobile Van Hero Section */}
      <MobileVanHero />

      {/* A Seamless 4-Step Journey */}
      <FourStep />

      {/* Testing Cards Section */}
      <TestingCards />

      {/* Available Location Services */}
      <LocationService />

      {/* Book Your Van Appointment */}
      <Appoinment />

      {/* 2. Footer Section */}
      <Footer />
    </main>
  )
}
