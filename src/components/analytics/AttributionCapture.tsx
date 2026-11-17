'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

/** Records UTM / ad click-ID / referrer on the landing page view. Renders nothing. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
