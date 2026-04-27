import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { verifyPassword } from '@/lib/partner/auth';

const FRIENDLY_DB_ERROR = 'Login is temporarily unavailable. Please try again later.';
const INVALID_CREDS = 'Invalid email or password';

function isTechnicalError(msg: string): boolean {
  const patterns = ['schema cache', 'relation', 'does not exist', 'PGRST', 'connection', 'timeout'];
  return patterns.some((p) => msg.toLowerCase().includes(p.toLowerCase()));
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data: partner, error } = await supabase
      .from('partners')
      .select('id, widget_key, password_hash, is_active')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (error && isTechnicalError(error.message)) {
      console.error('Partner login DB error:', error.message);
      return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 503 });
    }

    if (!partner || !partner.password_hash) {
      return NextResponse.json({ error: INVALID_CREDS }, { status: 401 });
    }

    if (!partner.is_active) {
      return NextResponse.json(
        { error: 'Your account is inactive. Please contact partners@sifprime.com.' },
        { status: 403 }
      );
    }

    const ok = await verifyPassword(password, partner.password_hash);
    if (!ok) {
      return NextResponse.json({ error: INVALID_CREDS }, { status: 401 });
    }

    return NextResponse.json({ success: true, widget_key: partner.widget_key });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('Partner login error:', message);
    return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 500 });
  }
}
