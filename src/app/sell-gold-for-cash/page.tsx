import SellGoldForCashPage from '@/components/sell-gold-for-cash/page';
import Footer from '@/components/layout/Footer';
import { getProcessSteps } from '@/lib/strapi';
import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/images/gp-logo.png';

export const metadata = {
  title: 'Sell Gold for Cash | Muthoot Gold Point',
  description: 'Sell your old gold and get cash instantly with 100% fair and precise gold buying. Free purity testing, 100% transparent process, and free ultrasonic cleaning.',
};

export default async function Page() {
  const processSteps = await getProcessSteps();

  return (
    <>
      <header style={{ 
        backgroundColor: '#ffffff', 
        padding: '1.2rem 0', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        transform: 'translateZ(0)',
        willChange: 'transform',
        borderBottom: '1px solid #eaeaea',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <Link href="/">
          <Image src={logoImg} alt="GOLDPOINT - We Buy Gold" width={220} height={60} priority style={{ display: 'block' }} />
        </Link>
      </header>
      <SellGoldForCashPage processSteps={processSteps} />
      <Footer />
    </>
  );
}
