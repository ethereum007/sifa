import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { buildWelcomeEmail } from '@/lib/partner/emails';
import type { Partner } from '@/lib/partner/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { partner_id } = await request.json();

    const { data: partner, error } = await supabase
      .from('partners')
      .select('*')
      .eq('id', partner_id)
      .single();

    if (error || !partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const { subject, html } = buildWelcomeEmail(partner as unknown as Partner);

    const { error: sendError } = await resend.emails.send({
      from: 'SIFPrime <noreply@sifprime.com>',
      to: partner.email,
      subject,
      html,
    });

    if (sendError) {
      console.error('Email send error:', sendError);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Welcome email error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
