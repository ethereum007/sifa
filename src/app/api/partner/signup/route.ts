import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { hashPassword } from '@/lib/partner/auth';

const FRIENDLY_DB_ERROR = 'Partner registration is temporarily unavailable. Please try again later or contact us on WhatsApp.';

function isTechnicalError(msg: string): boolean {
  const patterns = ['schema cache', 'relation', 'does not exist', 'PGRST', 'connection', 'timeout'];
  return patterns.some(p => msg.toLowerCase().includes(p.toLowerCase()));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      firm_name,
      arn_number,
      email,
      phone,
      city,
      aum_band,
      distributor_status,
      plan,
      password,
    } = body;

    // Validate required fields
    if (!full_name || !arn_number || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields: full_name, arn_number, email, password' },
        { status: 400 }
      );
    }

    // Check if ARN already exists
    const { data: existing, error: checkError } = await supabase
      .from('partners')
      .select('id')
      .eq('arn_number', arn_number)
      .single();

    if (checkError && isTechnicalError(checkError.message)) {
      console.error('Partner signup DB error:', checkError.message);
      return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 503 });
    }

    if (existing) {
      return NextResponse.json(
        { error: 'A partner with this ARN number already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const password_hash = await hashPassword(password);

    // Insert new partner
    const { data: partner, error } = await supabase
      .from('partners')
      .insert({
        full_name,
        firm_name: firm_name || null,
        arn_number,
        email,
        phone: phone || null,
        city: city || null,
        aum_band: aum_band || null,
        distributor_status: distributor_status || 'exploring',
        plan: plan || 'starter',
        password_hash,
      })
      .select('id, widget_key')
      .single();

    if (error) {
      console.error('Partner insert error:', error.message);
      const msg = isTechnicalError(error.message) ? FRIENDLY_DB_ERROR : error.message;
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    // Send welcome email (fire and forget — don't block signup on email delivery)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sifprime.com';
    fetch(`${baseUrl}/api/emails/welcome-partner`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partner_id: partner.id }),
    }).catch((err) => console.error('Welcome email trigger failed:', err));

    return NextResponse.json({ success: true, widget_key: partner.widget_key });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Partner signup error:', message);
    return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 500 });
  }
}
