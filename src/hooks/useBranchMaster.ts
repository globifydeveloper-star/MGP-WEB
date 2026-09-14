'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { BranchMasterDetailsItem } from '@/lib/branchMaster';

export interface UseBranchMasterOptions {
  autoFetch?: boolean;
}

interface BranchMasterPayload {
  states: string[];
  locationsByState: Record<string, string[]>;
  branchesByState: Record<string, BranchMasterDetailsItem[]>;
  allBranches: BranchMasterDetailsItem[];
}

// One request per page load, shared by every component that uses this hook.
let branchRequest: Promise<BranchMasterPayload> | null = null;

async function requestBranches(): Promise<BranchMasterPayload> {
  const res = await fetch('/api/branch/all', { method: 'GET', cache: 'no-store' });
  const json = await res.json();

  if (!res.ok || !json.success || !Array.isArray(json.states) || json.states.length === 0) {
    throw new Error(json?.message || 'Failed to fetch Branch Master data.');
  }

  return {
    states: json.states,
    locationsByState: json.locationsByState || {},
    branchesByState: json.branchesByState || {},
    allBranches: json.allBranches || [],
  };
}

function loadBranches(force: boolean): Promise<BranchMasterPayload> {
  if (branchRequest && !force) return branchRequest;

  const request = requestBranches();
  branchRequest = request;
  // Drop a failed request so the next caller retries instead of reusing the error
  request.catch(() => {
    if (branchRequest === request) branchRequest = null;
  });
  return request;
}

export function useBranchMaster(options: UseBranchMasterOptions = {}) {
  const { autoFetch = true } = options;

  const [states, setStates] = useState<string[]>([]);
  const [locationsByState, setLocationsByState] = useState<Record<string, string[]>>({});
  const [branchesByState, setBranchesByState] = useState<Record<string, BranchMasterDetailsItem[]>>({});
  const [allBranches, setAllBranches] = useState<BranchMasterDetailsItem[]>([]);

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<BranchMasterDetailsItem | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBranches = useCallback(async (force: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loadBranches(force);
      setStates(data.states);
      setLocationsByState(data.locationsByState);
      setBranchesByState(data.branchesByState);
      setAllBranches(data.allBranches);
    } catch (err) {
      console.error('API /api/branch/all fetch error:', err);
      setError(err instanceof Error ? err.message : 'Network error fetching Branch Master data.');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => fetchBranches(true), [fetchBranches]);

  useEffect(() => {
    if (autoFetch) {
      fetchBranches(false);
    }
  }, [autoFetch, fetchBranches]);

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
    loading,
    error,
    refetch,
    selectState,
    selectLocation,
    setSelectedBranch,
    resetSelection,
  };
}
