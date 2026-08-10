'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { BranchMasterDetailsItem } from '@/lib/branchMaster';
import {
  BRANCHES_DATA,
  getUniqueStates as getFallbackStates,
  getCitiesByState as getFallbackCities,
  getBranchesByState as getFallbackBranches,
} from '@/data/branchesData';

export interface UseBranchMasterOptions {
  token?: string;
  autoFetch?: boolean;
}

const LOCAL_STORAGE_KEY = 'mgp_branch_master_cache_v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

interface CachedStoragePayload {
  timestamp: number;
  states: string[];
  locationsByState: Record<string, string[]>;
  branchesByState: Record<string, BranchMasterDetailsItem[]>;
  allBranches: BranchMasterDetailsItem[];
}

export function useBranchMaster(options: UseBranchMasterOptions = {}) {
  const { token, autoFetch = true } = options;

  const [states, setStates] = useState<string[]>([]);
  const [locationsByState, setLocationsByState] = useState<Record<string, string[]>>({});
  const [branchesByState, setBranchesByState] = useState<Record<string, BranchMasterDetailsItem[]>>({});
  const [allBranches, setAllBranches] = useState<BranchMasterDetailsItem[]>([]);

  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedBranch, setSelectedBranch] = useState<BranchMasterDetailsItem | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState<boolean>(false);

  // Apply fallback static data if API is unreachable
  const applyFallbackData = useCallback(() => {
    setUsingFallback(true);
    const fbStates = getFallbackStates();
    const locMap: Record<string, string[]> = {};
    const branchMap: Record<string, BranchMasterDetailsItem[]> = {};
    const allFbBranches: BranchMasterDetailsItem[] = [];

    fbStates.forEach((st) => {
      locMap[st] = getFallbackCities(st);
      const fbList = getFallbackBranches(st);
      branchMap[st] = fbList.map((b) => ({
        branchCode: b.id,
        branchName: b.name,
        location: b.city,
        state: b.state,
        addressLine1: b.address,
        pin: b.pincode,
        branchPhoneNo: '1800 102 1616',
      }));
      allFbBranches.push(...branchMap[st]);
    });

    setStates(fbStates);
    setLocationsByState(locMap);
    setBranchesByState(branchMap);
    setAllBranches(allFbBranches);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // 1. Try reading from 24-hour localStorage cache first
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const payload: CachedStoragePayload = JSON.parse(stored);
          const age = Date.now() - payload.timestamp;
          if (age < CACHE_TTL_MS && payload.states && payload.states.length > 0) {
            setStates(payload.states);
            setLocationsByState(payload.locationsByState || {});
            setBranchesByState(payload.branchesByState || {});
            setAllBranches(payload.allBranches || []);
            setUsingFallback(false);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Failed reading branch master cache from localStorage:', e);
      }
    }

    // 2. Fetch from 24-hour server cached route /api/branch/all
    try {
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
      }

      const res = await fetch('/api/branch/all', { method: 'GET', headers });
      const json = await res.json();

      if (res.ok && json.success && Array.isArray(json.states) && json.states.length > 0) {
        setStates(json.states);
        setLocationsByState(json.locationsByState || {});
        setBranchesByState(json.branchesByState || {});
        setAllBranches(json.allBranches || []);
        setUsingFallback(false);

        // Store into localStorage for 24-hour instant load
        if (typeof window !== 'undefined') {
          const cachePayload: CachedStoragePayload = {
            timestamp: Date.now(),
            states: json.states,
            locationsByState: json.locationsByState || {},
            branchesByState: json.branchesByState || {},
            allBranches: json.allBranches || [],
          };
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cachePayload));
        }
      } else {
        // Graceful fallback to static dataset
        applyFallbackData();
      }
    } catch (err) {
      console.warn('API /api/branch/all fetch error, using static fallback:', err);
      applyFallbackData();
    } finally {
      setLoading(false);
    }
  }, [token, applyFallbackData]);

  useEffect(() => {
    if (autoFetch) {
      loadData();
    }
  }, [autoFetch, loadData]);

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
    usingFallback,
    refetch: loadData,
    selectState,
    selectLocation,
    setSelectedBranch,
    resetSelection,
  };
}
