import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { hashPassword } from '@/lib/partner/auth';

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
    const { data: existing } = await supabase
      .from('partners')
      .select('id')
      .eq('arn_number', arn_number)
      .single();

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
      .select('widget_key')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, widget_key: partner.widget_key });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
