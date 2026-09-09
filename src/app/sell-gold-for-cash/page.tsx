import SellGoldForCashPage from '@/components/sell-gold-for-cash/page';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProcessSteps } from '@/lib/strapi';

export const metadata = {
  title: 'Sell Gold for Cash | Muthoot Gold Point',
  description: 'Sell your old gold and get cash instantly with 100% fair and precise gold buying. Free purity testing, 100% transparent process, and free ultrasonic cleaning.',
};

export default async function Page() {
  const processSteps = await getProcessSteps();

  return (
    <>
      <div style={{ position: "relative", zIndex: 9999 }}><Navbar /></div>
      <SellGoldForCashPage processSteps={processSteps} />
      <Footer />
    </>
  );
}
