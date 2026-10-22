'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSiteData } from '@/components/providers/SiteDataProvider';
import type { SiteBranch } from '@/lib/siteData';

// Branch data arrives with the page (fetched by the root layout on the server), so there is
// no browser request and nothing to wait for.
export function useBranchMaster() {
  const { states, locationsByState, branchesByState, allBranches } = useSiteData().branches;

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<SiteBranch | null>(null);

  // Derived location list for selected state
  const availableLocations = useMemo(() => {
    if (!selectedState) return [];
    return locationsByState[selectedState] || [];
  }, [selectedState, locationsByState]);

  // Derived branch list for selected state & location
  const availableBranches = useMemo(() => {
    if (!selectedState) return allBranches;
    const list = branchesByState[selectedState] || [];
    if (!selectedLocation) return list;
    return list.filter(
      (b) => b.location.toLowerCase() === selectedLocation.toLowerCase()
    );
  }, [selectedState, selectedLocation, branchesByState, allBranches]);

  const selectState = useCallback((st: string) => {
    setSelectedState(st);
    setSelectedLocation('');
    setSelectedBranch(null);
  }, []);

  const selectLocation = useCallback(
    (loc: string) => {
      setSelectedLocation(loc);
      if (!loc) {
        setSelectedBranch(null);
        return;
      }
      if (selectedState && branchesByState[selectedState]) {
        const found = branchesByState[selectedState].find(
          (b) => b.location.toLowerCase() === loc.toLowerCase()
        );
        setSelectedBranch(found || null);
      }
    },
    [selectedState, branchesByState]
  );

  const resetSelection = useCallback(() => {
    setSelectedState('');
    setSelectedLocation('');
    setSelectedBranch(null);
  }, []);

  return {
    states,
    locationsByState,
    branchesByState,
    allBranches,
    availableLocations,
    availableBranches,
    selectedState,
    selectedLocation,
    selectedBranch,
    loading: false,
    selectState,
    selectLocation,
    setSelectedBranch,
    resetSelection,
  };
}
