import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';

const FRIENDLY_DB_ERROR = 'Could not save your details. Please try again or message us on WhatsApp.';

function isTechnicalError(message: string | undefined): boolean {
  if (!message) return false;
  const lower = message.toLowerCase();
  return (
    lower.includes('schema cache') ||
    lower.includes('pgrst') ||
    lower.includes('relation') ||
    lower.includes('does not exist') ||
    lower.includes('permission denied')
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, fund_slug, fund_name, message, source } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const { data: lead, error: insertError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone: phone || null,
        fund_slug: fund_slug || null,
        fund_name: fund_name || null,
        message: message || null,
        source: source || 'fund-page',
        status: 'new',
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Lead insert error:', insertError.message);
      if (isTechnicalError(insertError.message)) {
        return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 503 });
      }
      return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 500 });
    }

    // Fire-and-forget admin notification
    const adminEmail = process.env.ADMIN_EMAIL || 'info@sifprime.com';
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      resend.emails
        .send({
          from: 'SIFPrime <noreply@sifprime.com>',
          to: adminEmail,
          subject: `New lead: ${name}${fund_name ? ` — ${fund_name}` : ''}`,
          html: `
            <h2>New Lead from SIFPrime</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || '—'}</p>
            <p><strong>Fund:</strong> ${fund_name || '—'} (${fund_slug || 'n/a'})</p>
            <p><strong>Source:</strong> ${source || 'fund-page'}</p>
            ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
            <p style="color:#666;font-size:12px;margin-top:24px">Lead ID: ${lead?.id || 'n/a'}</p>
          `,
        })
        .catch((err) => console.error('Admin notify email failed:', err));
    }

    return NextResponse.json({ success: true, id: lead?.id });
  } catch (err: unknown) {
    console.error('Leads route error:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
