'use client';

import { useState, useEffect } from 'react';
import { BranchMasterDetail, BranchMasterAllData } from '@/lib/branchMaster';
import {
  getUniqueStates,
  getStateCitiesMap,
  getBranchesByState,
} from '@/data/branchesData';

const CACHE_KEY = 'mgp_branch_master_data_v1';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

interface CachePayload {
  timestamp: number;
  data: BranchMasterAllData;
}

export function useBranchMaster() {
  const [data, setData] = useState<BranchMasterAllData>({
    states: [],
    locationsByState: {},
    branchesByState: {},
    allBranches: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      // 1. Try reading from localStorage (24-hour client cache)
      if (typeof window !== 'undefined') {
        try {
          const raw = localStorage.getItem(CACHE_KEY);
          if (raw) {
            const parsed: CachePayload = JSON.parse(raw);
            if (
              parsed &&
              parsed.timestamp &&
              Date.now() - parsed.timestamp < CACHE_TTL_MS &&
              parsed.data?.states?.length > 0
            ) {
              if (isMounted) {
                setData(parsed.data);
                setLoading(false);
              }
              return;
            }
          }
        } catch {
          // ignore localStorage errors
        }
      }

      // 2. Fetch from 24-hour cached server API route
      try {
        const res = await fetch('/api/branch/all');
        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }
        const json = await res.json();
        if (json?.success && json?.data?.states?.length > 0) {
          if (isMounted) {
            setData(json.data);
            setLoading(false);
          }
          // Save to localStorage
          if (typeof window !== 'undefined') {
            try {
              const payload: CachePayload = {
                timestamp: Date.now(),
                data: json.data,
              };
              localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
            } catch {
              // ignore storage quota errors
            }
          }
          return;
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err?.message || 'Failed to load branch master');
        }
      }

      // 3. Static Fallback if offline/failed
      if (isMounted) {
        const fallbackStates = getUniqueStates();
        const fallbackLocations = getStateCitiesMap();
        const fallbackBranches: Record<string, BranchMasterDetail[]> = {};

        for (const st of fallbackStates) {
          const bList = getBranchesByState(st);
          fallbackBranches[st] = bList.map((b) => ({
            branchCode: b.id,
            branchName: b.name,
            contactPersonMobile: '',
            branchPhoneNo: '',
            branchEmail: '',
            location: b.city,
            addressLine1: b.address,
            addressLine2: '',
            state: b.state,
            pin: b.pincode,
          }));
        }

        setData({
          states: fallbackStates,
          locationsByState: fallbackLocations,
          branchesByState: fallbackBranches,
          allBranches: Object.values(fallbackBranches).flat(),
        });
        setLoading(false);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    states: data.states,
    locationsByState: data.locationsByState,
    branchesByState: data.branchesByState,
    allBranches: data.allBranches,
    loading,
    error,
  };
}
