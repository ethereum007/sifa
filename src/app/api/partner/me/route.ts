import { NextResponse } from 'next/server';
import { getPartnerFromKey } from '@/lib/partner/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  const partner = await getPartnerFromKey(key);
  if (!partner) {
    return NextResponse.json({ error: 'Unauthorized or partner not found' }, { status: 401 });
  }

  return NextResponse.json(partner);
}
