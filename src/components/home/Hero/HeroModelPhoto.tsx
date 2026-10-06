import Image from 'next/image';
import defaultHeroModel from '@/assets/images/hm6-img01.png';

interface HeroModelPhotoProps {
  imageSrc?: string;
  mediaType?: 'image' | 'video';
}

export default function HeroModelPhoto({ imageSrc, mediaType }: HeroModelPhotoProps) {
  const isVideo = mediaType === 'video' && Boolean(imageSrc);

  return (
    <div className="hero-model-photo-wrapper">
      {isVideo && imageSrc ? (
        <video
          src={imageSrc}
          autoPlay
          loop
          muted
          playsInline
          className="hero-model-img"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      ) : (
        <Image
          src={imageSrc || defaultHeroModel}
          alt="Muthoot Goldpoint Premium Customer Service"
          className="hero-model-img"
          fill
          priority
          sizes="(max-width: 1024px) 320px, 521px"
        />
      )}
    </div>
  );
}

