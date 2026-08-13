import { NextResponse } from 'next/server';
import { getDailyCachedBranchMasterData } from '@/lib/branchMaster';

export const revalidate = 86400; // Cache on server for 24 hours (86,400 seconds)

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

    return NextResponse.json(
      {
        success: true,
        ...(typeof data === 'object' ? data : {}),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
        },
      }
    );
  } catch (err: any) {
    console.error('[API/Branch/All Route Error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || 'Failed to load Branch Master data',
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
}
