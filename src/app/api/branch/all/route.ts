import { NextResponse } from 'next/server';
import { getDailyCachedBranchMasterData } from '@/lib/branchMaster';
import { attachCoordinates } from '@/lib/branchCoordinates';

export const revalidate = 86400; // Cache on server for 24 hours (86,400 seconds)
export const dynamic = 'force-dynamic';


export async function GET() {
  try {
    const data = await getDailyCachedBranchMasterData();

    if (!data) {
      console.warn('/api/branch/all: Live fetch returned null, using fallback response.');
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to fetch live Branch Master data',
          data: {
            states: [],
            locationsByState: {},
            branchesByState: {},
            allBranches: [],
          },
        },
        { status: 200 }
      );
    }

    // Map pins: coordinates from the saved file, or looked up automatically for new branches
    const allBranches = await attachCoordinates(data.allBranches);
    const branchesByState: Record<string, typeof allBranches> = {};
    for (const b of allBranches) (branchesByState[b.state.trim()] ||= []).push(b);

    return NextResponse.json(
      {
        success: true,
        ...data,
        allBranches,
        branchesByState,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    );
  } catch (err: unknown) {
    console.error('[API/Branch/All Route Error]:', (err as Error)?.message || 'unknown');
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to load Branch Master data',
        data: { states: [], locationsByState: {}, branchesByState: {}, allBranches: [] },
      },
      { status: 200 }
    );
  }
}
