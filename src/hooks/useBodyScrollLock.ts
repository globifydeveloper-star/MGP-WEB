import { useEffect } from 'react';

/**
 * Custom hook to lock body scrolling on mobile and desktop.
 * Uses position: fixed on document.body which is the most reliable strategy for iOS Safari.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked || typeof window === 'undefined') return;

    const scrollY = window.scrollY;
    
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;
    const originalDocOverflow = document.documentElement.style.overflow;

    // Apply fixed position to body to lock background completely on iOS & mobile web
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalDocOverflow;

      // Restore scroll position smoothly
      window.scrollTo(0, scrollY);
    };
  }, [isLocked]);
}
