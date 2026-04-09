import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { getPartnerFromKey } from '@/lib/partner/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  const partner = await getPartnerFromKey(key);
  if (!partner) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: leads, error } = await supabase
    .from('partner_leads')
    .select('*')
    .eq('partner_id', partner.id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(leads);
}
