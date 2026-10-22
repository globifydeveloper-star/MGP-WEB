'use client';

import { createContext, useContext, useMemo } from 'react';
import type { SiteBranch } from '@/lib/siteData';
import type { AllGoldRatesResponse } from '@/lib/goldQuoteService';

export interface BranchIndex {
  states: string[];
  locationsByState: Record<string, string[]>;
  branchesByState: Record<string, SiteBranch[]>;
  allBranches: SiteBranch[];
}

interface SiteData {
  branches: BranchIndex;
  goldRates: AllGoldRatesResponse | null;
}

const SiteDataContext = createContext<SiteData>({
  branches: { states: [], locationsByState: {}, branchesByState: {}, allBranches: [] },
  goldRates: null,
});

// Grouped here rather than on the server so the page carries each branch only once
function indexBranches(allBranches: SiteBranch[]): BranchIndex {
  const locationSets: Record<string, Set<string>> = {};
  const branchesByState: Record<string, SiteBranch[]> = {};

  for (const b of allBranches) {
    const st = b.state.trim();
    const loc = b.location ? b.location.trim() : '';
    (locationSets[st] ||= new Set()).add(loc);
    (branchesByState[st] ||= []).push(b);
  }

  const states = Object.keys(branchesByState).sort();
  const locationsByState: Record<string, string[]> = {};
  for (const st of states) {
    locationsByState[st] = Array.from(locationSets[st]).filter(Boolean).sort();
  }

  return { states, locationsByState, branchesByState, allBranches };
}

export function SiteDataProvider({
  branches,
  goldRates,
  children,
}: {
  branches: SiteBranch[];
  goldRates: AllGoldRatesResponse | null;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ branches: indexBranches(branches), goldRates }), [branches, goldRates]);
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData(): SiteData {
  return useContext(SiteDataContext);
}
