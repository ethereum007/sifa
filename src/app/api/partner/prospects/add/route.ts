import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { getPartnerFromKey } from '@/lib/partner/auth';
import { matchSifCategory, getTopFundsForCategory } from '@/lib/partner/sifMatcher';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    const partner = await getPartnerFromKey(key);
    if (!partner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      client_name,
      client_email,
      client_phone,
      investable_surplus,
      risk_profile,
      current_investments,
      priorities,
      sif_familiarity,
    } = body;

    if (!client_name || !client_email) {
      return NextResponse.json(
        { error: 'client_name and client_email are required' },
        { status: 400 }
      );
    }

    // Run SIF matching
    const sifCategoryMatch = matchSifCategory(
      risk_profile || 'Moderate',
      priorities || [],
      current_investments || [],
      investable_surplus || ''
    );
    const topFundRecommendations = getTopFundsForCategory(sifCategoryMatch);

    // Generate a report ID
    const reportId = `RPT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const { data: lead, error } = await supabase
      .from('partner_leads')
      .insert({
        partner_id: partner.id,
        client_name,
        client_email,
        client_phone: client_phone || null,
        investable_surplus: investable_surplus || null,
        risk_profile: risk_profile || null,
        current_investments: current_investments || null,
        priorities: priorities || null,
        sif_familiarity: sif_familiarity || null,
        sif_category_match: sifCategoryMatch,
        top_fund_recommendations: topFundRecommendations,
        report_id: reportId,
        status: 'new',
        source: 'partner_dashboard',
      })
      .select('id')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      sif_category_match: sifCategoryMatch,
      report_id: reportId,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
