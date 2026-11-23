'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/**
 * Returns false during SSR and hydration, true once rendering on the client.
 * Use instead of a `mounted` state flipped in an effect (e.g. before createPortal).
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
