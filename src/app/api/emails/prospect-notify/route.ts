import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { buildProspectNotifyEmail } from '@/lib/partner/emails';
import type { Partner, PartnerLead } from '@/lib/partner/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { partner_id, lead_id } = await request.json();

    const { data: partner } = await supabase
      .from('partners')
      .select('*')
      .eq('id', partner_id)
      .single();

    const { data: lead } = await supabase
      .from('partner_leads')
      .select('*')
      .eq('id', lead_id)
      .single();

    if (!partner || !lead) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { subject, html } = buildProspectNotifyEmail(
      partner as unknown as Partner,
      lead as unknown as PartnerLead
    );

    const { error: sendError } = await resend.emails.send({
      from: 'SIFPrime <noreply@sifprime.com>',
      to: partner.email,
      subject,
      html,
    });

    if (sendError) {
      console.error('Prospect notify email error:', sendError);
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Prospect notify error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
