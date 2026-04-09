import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';

export async function GET(
  _request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const { reportId } = params;

    // Look up lead by report_id
    const { data: lead, error: leadError } = await supabase
      .from('partner_leads')
      .select('*')
      .eq('report_id', reportId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // Look up the partner
    const { data: partner, error: partnerError } = await supabase
      .from('partners')
      .select('*')
      .eq('id', lead.partner_id)
      .eq('is_active', true)
      .single();

    if (partnerError || !partner) {
      return NextResponse.json(
        { error: 'Partner not found or inactive' },
        { status: 404 }
      );
    }

    return NextResponse.json({ lead, partner });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
