import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { getPartnerFromKey } from '@/lib/partner/auth';
import { getBrandingCompleteness } from '@/lib/partner/sifMatcher';
import type { PartnerStats } from '@/lib/partner/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  const partner = await getPartnerFromKey(key);
  if (!partner) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Count total prospects
  const { count: totalProspects } = await supabase
    .from('partner_leads')
    .select('*', { count: 'exact', head: true })
    .eq('partner_id', partner.id);

  // Count consultations booked
  const { count: consultationsBooked } = await supabase
    .from('partner_leads')
    .select('*', { count: 'exact', head: true })
    .eq('partner_id', partner.id)
    .eq('consultation_booked', true);

  // Sum AUM in pipeline
  const { data: aumRows } = await supabase
    .from('partner_leads')
    .select('aum_in_pipeline')
    .eq('partner_id', partner.id)
    .not('aum_in_pipeline', 'is', null);

  const aumInPipeline = (aumRows || []).reduce(
    (sum, row) => sum + (row.aum_in_pipeline || 0),
    0
  );

  const brandingCompletenessPct = getBrandingCompleteness(partner);

  const stats: PartnerStats = {
    total_prospects: totalProspects ?? 0,
    reports_sent: partner.reports_sent,
    consultations_booked: consultationsBooked ?? 0,
    aum_in_pipeline: aumInPipeline,
    branding_completeness_pct: brandingCompletenessPct,
  };

  return NextResponse.json(stats);
}
