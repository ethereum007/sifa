import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { hashPassword } from '@/lib/partner/auth';

const FRIENDLY_DB_ERROR = 'Password reset is temporarily unavailable. Please try again later.';
const INVALID_TOKEN = 'This reset link is invalid or has expired. Please request a new one.';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Look up partner by reset token
    const { data: partner, error } = await supabase
      .from('partners')
      .select('id, password_reset_expires')
      .eq('password_reset_token', token)
      .single();

    if (error || !partner) {
      return NextResponse.json({ error: INVALID_TOKEN }, { status: 401 });
    }

    // Check expiry
    const expires = partner.password_reset_expires
      ? new Date(partner.password_reset_expires)
      : null;
    if (!expires || expires.getTime() < Date.now()) {
      return NextResponse.json({ error: INVALID_TOKEN }, { status: 401 });
    }

    // Hash the new password and clear the token
    const password_hash = await hashPassword(password);
    const { error: updateError } = await supabase
      .from('partners')
      .update({
        password_hash,
        password_reset_token: null,
        password_reset_expires: null,
      })
      .eq('id', partner.id);

    if (updateError) {
      console.error('Reset-password update error:', updateError.message);
      return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 503 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('Reset-password error:', message);
    return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 500 });
  }
}
