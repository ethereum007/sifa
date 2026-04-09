import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { getPartnerFromKey } from '@/lib/partner/auth';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    const partner = await getPartnerFromKey(key);
    if (!partner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Support single lead_id or array of lead_ids
    const leadIds: string[] = body.lead_ids
      ? body.lead_ids
      : body.lead_id
        ? [body.lead_id]
        : [];

    if (leadIds.length === 0) {
      return NextResponse.json(
        { error: 'lead_id or lead_ids[] is required' },
        { status: 400 }
      );
    }

    // Update each lead
    const { error } = await supabase
      .from('partner_leads')
      .update({
        report_sent_at: new Date().toISOString(),
        status: 'report_sent',
      })
      .eq('partner_id', partner.id)
      .in('id', leadIds);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Increment partner's reports_sent count
    const { error: updateError } = await supabase
      .from('partners')
      .update({ reports_sent: partner.reports_sent + leadIds.length })
      .eq('id', partner.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, sent_count: leadIds.length });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
