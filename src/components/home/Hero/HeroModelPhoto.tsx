import hm6Img01 from '@/assets/images/hm6-img01.png';
import Image from 'next/image';

export default function HeroModelPhoto() {
  return (
    <div className="hero-model-photo-wrapper">
      <Image
        src={hm6Img01}
        alt="Muthoot Goldpoint Premium Customer Service"
        className="hero-model-img"
        fill
        priority
        sizes="(max-width: 1024px) 320px, 521px"
      />
    </div>
  );
}
