import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/assets/images/gp-logo.png';
import './SellGoldHeader.css';

interface SellGoldHeaderProps {
  phone?: string;
}

export default function SellGoldHeader({ phone }: SellGoldHeaderProps) {
  const displayPhone = phone || '1800 102 1616';
  const telHref = `tel:${displayPhone.replace(/[^\d+]/g, '')}`;

  return (
    <header className="sgh-root">
      <div className="container sgh-inner">
        <div className="sgh-brand">
          <Link href="/" className="sgh-logo-link" aria-label="Muthoot Gold Point home">
            <Image src={logoImg} alt="GOLDPOINT - We Buy Gold" width={200} height={55} priority className="sgh-logo" />
          </Link>
        </div>

        <a href={telHref} className="sgh-phone">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="sgh-phone-icon">
            <path
              fill="currentColor"
              d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"
            />
          </svg>
          <span>{displayPhone}</span>
        </a>
      </div>
    </header>
  );
}
