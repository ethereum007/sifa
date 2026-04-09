import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { buildReportEmail } from '@/lib/partner/emails';
import type { Partner, PartnerLead } from '@/lib/partner/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { lead_id, lead_ids, widget_key } = await request.json();

    // Auth
    const { data: partner, error: pErr } = await supabase
      .from('partners')
      .select('*')
      .eq('widget_key', widget_key)
      .eq('is_active', true)
      .single();

    if (pErr || !partner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const ids = lead_ids || (lead_id ? [lead_id] : []);
    if (ids.length === 0) {
      return NextResponse.json({ error: 'No leads specified' }, { status: 400 });
    }

    let sentCount = 0;

    for (const id of ids) {
      const { data: lead, error: lErr } = await supabase
        .from('partner_leads')
        .select('*')
        .eq('id', id)
        .eq('partner_id', partner.id)
        .single();

      if (lErr || !lead) continue;

      const { subject, html } = buildReportEmail(
        partner as unknown as Partner,
        lead as unknown as PartnerLead
      );

      const fromName = partner.firm_name || partner.full_name;

      try {
        await resend.emails.send({
          from: `${fromName} <noreply@sifprime.com>`,
          to: lead.client_email,
          subject,
          html,
        });

        // Update lead
        await supabase
          .from('partner_leads')
          .update({
            report_sent_at: new Date().toISOString(),
            status: 'report_sent',
          })
          .eq('id', id);

        sentCount++;
      } catch (emailErr) {
        console.error(`Failed to send report email to ${lead.client_email}:`, emailErr);
      }
    }

    // Update partner reports_sent count
    await supabase
      .from('partners')
      .update({ reports_sent: (partner.reports_sent || 0) + sentCount })
      .eq('id', partner.id);

    return NextResponse.json({ success: true, sent_count: sentCount });
  } catch (err) {
    console.error('Send report error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
