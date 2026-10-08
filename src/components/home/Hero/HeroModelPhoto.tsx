'use client';

import { useState } from 'react';
import Image from 'next/image';
import defaultHeroModel from '@/assets/images/hero-model.png';

interface HeroModelPhotoProps {
  imageSrc?: string | any;
  mediaType?: 'image' | 'video';
  isFirstSlide?: boolean;
}

export default function HeroModelPhoto({ imageSrc, mediaType, isFirstSlide = true }: HeroModelPhotoProps) {
  const [hasError, setHasError] = useState(false);
  const isVideo = mediaType === 'video' && Boolean(imageSrc);

  const finalSrc = !hasError && imageSrc ? imageSrc : defaultHeroModel;

  return (
    <div className={`hero-model-photo-wrapper ${!isFirstSlide ? 'hero-model-photo-standalone' : ''}`}>
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
          src={finalSrc}
          alt="Muthoot Goldpoint Premium Customer Service"
          className="hero-model-img"
          fill
          priority
          sizes="(max-width: 1024px) 320px, 521px"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

