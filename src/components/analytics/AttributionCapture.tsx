'use client';

import { useEffect } from 'react';
import { captureAttribution, setSourceAliases } from '@/lib/attribution';

interface AttributionCaptureProps {
  /** utm_source aliases from Strapi "Lead Source Settings", e.g. { "1": "facebook" } */
  sourceAliases?: Record<string, string>;
}

/** Records UTM / ad click-ID / referrer on the landing page view. Renders nothing. */
export default function AttributionCapture({ sourceAliases }: AttributionCaptureProps) {
  useEffect(() => {
    setSourceAliases(sourceAliases);
    captureAttribution();
  }, [sourceAliases]);
  return null;
}
