import SellGoldForCashPage from '@/components/sell-gold-for-cash/page';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Sell Gold for Cash | Muthoot Gold Point',
  description: 'Sell your old gold and get cash instantly with 100% fair and precise gold buying. Free purity testing, 100% transparent process, and free ultrasonic cleaning.',
};

export default function Page() {
  return (
    <>
      <Navbar />
      <SellGoldForCashPage />
      <Footer />
    </>
  );
}
