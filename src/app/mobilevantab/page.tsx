import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileVanTab from '@/components/mobilevantab/page';

export default function MobileVanRoute() {
  return (
    <>
      <Navbar />
      <MobileVanTab />
      <Footer />
    </>
  );
}
