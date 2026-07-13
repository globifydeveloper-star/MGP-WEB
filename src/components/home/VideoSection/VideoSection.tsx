'use client';

import React, { useEffect, useRef, useState } from 'react';
import './VideoSection.css';

const LANGUAGES = [
  { code: 'hi', label: 'हिंदी', poster: '/video_thumb.png', video: '/videos/goldpoint-hindi.mp4' },
  { code: 'ml', label: 'മലയാളം', poster: '/video_thumb.png', video: '/videos/goldpoint-malayalam.mp4' },
  { code: 'ta', label: 'தமிழ்', poster: '/video_thumb.png', video: '/videos/goldpoint-tamil.mp4' },
  { code: 'kn', label: 'ಕನ್ನಡ', poster: '/video_thumb.png', video: '/videos/goldpoint-kannada.mp4' },
  { code: 'en', label: 'EN', poster: '/video_thumb.png', video: null },
  { code: 'te', label: 'తెలుగు', poster: '/video_thumb.png', video: null },
  { code: 'mr', label: 'मराठी', poster: '/video_thumb.png', video: null },
  { code: 'bn', label: 'বাংলা', poster: '/video_thumb.png', video: null },
];

const VISIBLE_COUNT = 4;

export default function VideoSection() {
  const [activeCode, setActiveCode] = useState(LANGUAGES[0].code);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const visibleLanguages = LANGUAGES.slice(0, VISIBLE_COUNT);
  const moreLanguages = LANGUAGES.slice(VISIBLE_COUNT);
  const activeLanguage = LANGUAGES.find((l) => l.code === activeCode) ?? LANGUAGES[0];

  const selectLanguage = (code: string) => {
    setActiveCode(code);
    setDropdownOpen(false);
    setIsPlaying(false);
  };

  useEffect(() => {
    videoRef.current?.pause();
  }, [activeCode]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="vs-section">
      <div className="container">
        <div className="vs-grid">
          {/* Left: Video player with language switcher */}
          <div className="vs-video-card">
            {activeLanguage.video ? (
              <video
                key={activeLanguage.code}
                ref={videoRef}
                poster={activeLanguage.poster}
                className="vs-video-el"
                playsInline
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={activeLanguage.video} type="video/mp4" />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeLanguage.poster}
                alt={`Gold valuation demo video — ${activeLanguage.label}`}
                className="vs-video-poster"
              />
            )}

            <button
              type="button"
              className={`vs-play-btn ${isPlaying ? 'vs-play-btn-playing' : ''}`}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              onClick={togglePlay}
              disabled={!activeLanguage.video}
            >
              {isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" />
                  <rect x="14" y="5" width="4" height="14" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <div className="vs-lang-bar">
              {visibleLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`vs-lang-btn ${activeCode === lang.code ? 'vs-lang-active' : ''}`}
                  onClick={() => selectLanguage(lang.code)}
                >
                  {lang.label}
                </button>
              ))}

              <span className="vs-lang-divider" />

              <div className="vs-lang-more-wrap">
                <button
                  type="button"
                  className="vs-lang-more-btn"
                  aria-label="Show more languages"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="vs-lang-dropdown">
                    {moreLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        className={`vs-lang-dropdown-item ${activeCode === lang.code ? 'vs-lang-active' : ''}`}
                        onClick={() => selectLanguage(lang.code)}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Brand card */}
          <div className="vs-brand-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_image.png"
              alt="GOLDPOINT - We Buy Gold"
              className="vs-brand-logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
