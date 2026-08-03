import hm6Img01 from '@/assets/images/hm6-img01.png';
import Image from 'next/image';

interface HeroModelPhotoProps {
  imageSrc?: string;
}

export default function HeroModelPhoto({ imageSrc }: HeroModelPhotoProps) {
  return (
    <div className="hero-model-photo-wrapper">
      <Image
        src={imageSrc ?? hm6Img01}
        alt="Muthoot Goldpoint Premium Customer Service"
        className="hero-model-img"
        fill
        priority
        sizes="(max-width: 1024px) 320px, 521px"
      />
    </div>
  );
}
