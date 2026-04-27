import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { buildDistributorWelcomeEmail, buildPriorityPartnerEmail } from '@/lib/partner/distributorWelcomeEmail';

// Free toolkit funnel — separate from /api/partner/signup which is the
// auth-based partner platform signup. This endpoint just captures leads
// into distributor_signups, fires the Welcome Brief, and (for ₹100 Cr+)
// pings Slack.

const resend = new Resend(process.env.RESEND_API_KEY);

const ARN_REGEX = /^ARN-?\d{4,8}$/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SIF_STATUS_TO_TRACK: Record<string, string> = {
  'Already empanelled': 'B-empanelled',
  'Empanelment in progress': 'B-in-progress',
  'Need help getting empanelled': 'B-need-help',
  'Just exploring': 'B-exploring',
};

interface SignupBody {
  name?: string;
  firm?: string;
  arn?: string;
  email?: string;
  phone?: string;
  city?: string;
  aum?: string;
  sifStatus?: string;
}

export async function POST(request: Request) {
  let body: SignupBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const name = body.name?.trim();
  const firm = body.firm?.trim();
  const arn = body.arn?.trim().toUpperCase();
  const email = body.email?.trim().toLowerCase();
  const phone = body.phone?.trim();
  const city = body.city?.trim();
  const aum = body.aum?.trim();
  const sifStatus = body.sifStatus?.trim();

  if (!name || !arn || !email) {
    return NextResponse.json({ error: 'missing_required_fields' }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }
  if (!ARN_REGEX.test(arn)) {
    return NextResponse.json({ error: 'invalid_arn', hint: 'expected format ARN-12345' }, { status: 400 });
  }

  const isPriority = aum === '₹100 Cr+';
  const emailTrack = sifStatus ? SIF_STATUS_TO_TRACK[sifStatus] ?? null : null;
  const firstName = name.split(/\s+/)[0] || name;

  // Upsert (re-signups should not throw)
  const { error: insertError } = await supabase
    .from('distributor_signups')
    .upsert(
      {
        name,
        firm: firm || null,
        arn,
        email,
        phone: phone || null,
        city: city || null,
        aum_band: aum || null,
        sif_status: sifStatus || null,
        priority: isPriority,
        email_track: emailTrack,
        last_engaged_at: new Date().toISOString(),
      },
      { onConflict: 'email' },
    );

  if (insertError) {
    console.error('[toolkit-signup] supabase insert error:', insertError.message);
    return NextResponse.json({ error: 'db_error' }, { status: 500 });
  }

  // Slack notification for priority partners (non-blocking)
  if (isPriority && process.env.SLACK_PRIORITY_PARTNER_WEBHOOK) {
    try {
      await fetch(process.env.SLACK_PRIORITY_PARTNER_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `:rotating_light: *Priority Partner signup* — ${name} from ${firm || 'unknown firm'} (₹100 Cr+ AUM)\n• Email: ${email}\n• Phone: ${phone || '—'}\n• City: ${city || '—'}\n• ARN: ${arn}\n• Status: ${sifStatus || '—'}\nFollow up within 4 hours.`,
        }),
      });
    } catch (err) {
      console.error('[toolkit-signup] slack webhook error:', err);
    }
  }

  // Welcome email (priority variant for ₹100 Cr+, otherwise standard Welcome Brief)
  try {
    const builder = isPriority ? buildPriorityPartnerEmail : buildDistributorWelcomeEmail;
    const { subject, html, text } = builder({ firstName, arn });
    const { error: sendError } = await resend.emails.send({
      from: 'Kiran @ SIFPrime <info@sifprime.com>',
      to: email,
      replyTo: 'info@sifprime.com',
      subject,
      html,
      text,
    });
    if (sendError) {
      console.error('[toolkit-signup] resend error:', sendError);
    }
  } catch (err) {
    console.error('[toolkit-signup] email send threw:', err);
  }

  // Add to Resend audience (non-blocking, optional)
  const audienceId = process.env.RESEND_AUDIENCE_DISTRIBUTOR_TOOLKIT_ID;
  if (audienceId) {
    try {
      await resend.contacts.create({
        email,
        firstName,
        lastName: name.split(/\s+/).slice(1).join(' ') || undefined,
        unsubscribed: false,
        audienceId,
      });
    } catch (err) {
      console.error('[toolkit-signup] resend audience add error:', err);
    }
  }

  return NextResponse.json({ success: true });
}
