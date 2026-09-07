import Image from 'next/image';

interface HeroModelPhotoProps {
  imageSrc?: string;
  mediaType?: 'image' | 'video';
}

export default function HeroModelPhoto({ imageSrc, mediaType }: HeroModelPhotoProps) {
  return (
    <div className="hero-model-photo-wrapper">
      {mediaType === 'video' && imageSrc ? (
        <video
          src={imageSrc}
          autoPlay
          loop
          muted
          playsInline
          className="hero-model-img"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt="Muthoot Goldpoint Premium Customer Service"
          className="hero-model-img"
          fill
          priority
          sizes="(max-width: 1024px) 320px, 521px"
        />
      ) : null}
    </div>
  );
}
