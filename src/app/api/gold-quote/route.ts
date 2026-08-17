import { NextRequest, NextResponse } from 'next/server';
import { fetchGoldQuote, fetchAllGoldRates, checkRateLimit } from '@/lib/goldQuoteService';

export async function POST(request: NextRequest) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait a moment before trying again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter || 2),
          },
        }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { weightInGms, purityPerc } = body;

    const weight = Number(weightInGms);
    const purity = Number(purityPerc);

    if (!Number.isFinite(weight) || weight <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid weightInGms. Must be a positive number.',
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(purity) || purity <= 0 || purity > 100) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid purityPerc. Must be a number between 0 and 100.',
        },
        { status: 400 }
      );
    }

    const result = await fetchGoldQuote({ weightInGms: weight, purityPerc: purity });

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Rate temporarily unavailable — please try again',
          errorCode: result.errorCode,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        respData: result.respData,
        message: result.message || '',
        fromCache: result.fromCache,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API/GoldQuote Route Error]:', error?.message || error);
    return NextResponse.json(
      {
        success: false,
        message: 'Rate temporarily unavailable — please try again',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Support ?all=true to batch fetch all standard purity rates
    if (searchParams.get('all') === 'true') {
      const allRates = await fetchAllGoldRates();
      return NextResponse.json(allRates, { status: 200 });
    }

    const weightInGms = searchParams.get('weightInGms') || searchParams.get('weight') || '1';
    const purityPerc = searchParams.get('purityPerc') || searchParams.get('purity') || '99.9';

    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please wait a moment before trying again.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.retryAfter || 2),
          },
        }
      );
    }

    const weight = Number(weightInGms);
    const purity = Number(purityPerc);

    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(purity) || purity <= 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid weight or purity parameter.' },
        { status: 400 }
      );
    }

    const result = await fetchGoldQuote({ weightInGms: weight, purityPerc: purity });
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('[API/GoldQuote GET Route Error]:', err);
    return NextResponse.json(
      { success: false, message: 'Rate temporarily unavailable — please try again' },
      { status: 500 }
    );
  }
}
