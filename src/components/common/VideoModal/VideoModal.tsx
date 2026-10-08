'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './VideoModal.css';

export interface LanguageOption {
  code: string;
  label: string;
  poster: string;
  video: string | null;
}

export const VIDEO_LANGUAGES: LanguageOption[] = [
  { code: 'hi', label: 'हिंदी', poster: '/components/video_thumb.png', video: '/videos/goldpoint-hindi.mp4' },
  { code: 'ml', label: 'മലയാളം', poster: '/components/video_thumb.png', video: '/videos/goldpoint-malayalam.mp4' },
  { code: 'ta', label: 'தமிழ்', poster: '/components/video_thumb.png', video: '/videos/goldpoint-tamil.mp4' },
  { code: 'kn', label: 'ಕನ್ನಡ', poster: '/components/video_thumb.png', video: '/videos/goldpoint-kannada.mp4' },
  { code: 'en', label: 'EN', poster: '/components/video_thumb.png', video: null },
  { code: 'te', label: 'తెలుగు', poster: '/components/video_thumb.png', video: null },
  { code: 'mr', label: 'मराठी', poster: '/components/video_thumb.png', video: null },
  { code: 'bn', label: 'বাংলা', poster: '/components/video_thumb.png', video: null },
];

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, title = 'Muthoot Gold Point — How It Works' }: VideoModalProps) {
  const [activeCode, setActiveCode] = useState(VIDEO_LANGUAGES[0].code);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeLanguage = VIDEO_LANGUAGES.find((l) => l.code === activeCode) ?? VIDEO_LANGUAGES[0];

  // Pause video & reset playback state when language or isOpen changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  }, [activeCode, isOpen]);

  // Handle ESC key to close modal & lock body/html scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const selectLanguage = (code: string) => {
    setActiveCode(code);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="vm-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vm-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="vm-header">
          <div className="vm-header-title-wrap">
            <Link href="/" onClick={onClose} title="Muthoot Gold Point" style={{ display: 'flex', alignItems: 'center' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/common/logo_image.png" alt="Muthoot Gold Point" className="vm-header-logo" />
            </Link>
            <h3 className="vm-header-title">{title}</h3>
          </div>
          <button type="button" className="vm-close-btn" onClick={onClose} aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Video Player Box */}
        <div className="vm-player-card">
          {activeLanguage.video ? (
            <video
              key={activeLanguage.code}
              ref={videoRef}
              poster={activeLanguage.poster}
              className="vm-video-el"
              playsInline
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              <source src={activeLanguage.video} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <div className="vm-no-video-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeLanguage.poster}
                alt={`Gold valuation demo video — ${activeLanguage.label}`}
                className="vm-video-poster"
              />
              <div className="vm-no-video-overlay">
                <span className="vm-coming-soon-badge">Video coming soon in {activeLanguage.label}</span>
              </div>
            </div>
          )}

          {/* Center Play Overlay Button if video is present */}
          {activeLanguage.video && !isPlaying && (
            <button
              type="button"
              className="vm-center-play-btn"
              aria-label="Play video"
              onClick={togglePlay}
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          )}

          {/* Language Switcher Bar */}
          <div className="vm-lang-bar">
            <span className="vm-lang-label">Language:</span>
            <div className="vm-lang-buttons">
              {VIDEO_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`vm-lang-btn ${activeCode === lang.code ? 'vm-lang-active' : ''}`}
                  onClick={() => selectLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
