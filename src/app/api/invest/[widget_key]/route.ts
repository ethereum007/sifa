import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { matchSifCategory, getTopFundsForCategory } from '@/lib/partner/sifMatcher';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ widget_key: string }> }
) {
  try {
    const { widget_key } = await params;

    // Look up partner (public endpoint, no auth required beyond valid widget_key)
    const { data: partner, error: partnerError } = await supabase
      .from('partners')
      .select('id')
      .eq('widget_key', widget_key)
      .eq('is_active', true)
      .single();

    if (partnerError || !partner) {
      return NextResponse.json({ error: 'Invalid or inactive partner' }, { status: 404 });
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      surplus,
      risk,
      current_investments,
      priorities,
      sif_familiarity,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'name and email are required' },
        { status: 400 }
      );
    }

    // Run SIF matching
    const sifCategoryMatch = matchSifCategory(
      risk || 'Moderate',
      priorities || [],
      current_investments || [],
      surplus || ''
    );
    const topFundRecommendations = getTopFundsForCategory(sifCategoryMatch);

    const reportId = `RPT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const { error: insertError } = await supabase
      .from('partner_leads')
      .insert({
        partner_id: partner.id,
        client_name: name,
        client_email: email,
        client_phone: phone || null,
        investable_surplus: surplus || null,
        risk_profile: risk || null,
        current_investments: current_investments || null,
        priorities: priorities || null,
        sif_familiarity: sif_familiarity || null,
        sif_category_match: sifCategoryMatch,
        top_fund_recommendations: topFundRecommendations,
        report_id: reportId,
        status: 'new',
        source: 'widget',
      });

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      report_id: reportId,
      sif_category_match: sifCategoryMatch,
      top_fund_recommendations: topFundRecommendations,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
