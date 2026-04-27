import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';

const FRIENDLY_DB_ERROR = 'Password reset is temporarily unavailable. Please try again later.';
// Always respond identically whether or not the email exists, to prevent
// account enumeration. The body says "if an account exists with this email,
// we'll send a reset link" regardless.
const SUCCESS_MESSAGE =
  'If an account exists with that email, a password-reset link has been sent.';

function generateToken(): string {
  // 32-byte hex token (similar to UUID hex form, but unguessable)
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalisedEmail = email.trim().toLowerCase();

    const { data: partner, error } = await supabase
      .from('partners')
      .select('id, email, full_name, is_active')
      .eq('email', normalisedEmail)
      .single();

    // If lookup fails, still return success to avoid account enumeration —
    // BUT log the technical error server-side.
    if (error && !error.message.includes('No rows')) {
      console.error('Forgot-password DB error:', error.message);
    }

    if (!partner || !partner.is_active) {
      return NextResponse.json({ message: SUCCESS_MESSAGE });
    }

    // Generate token, store hashed timestamp, expire in 30 minutes
    const token = generateToken();
    const expires = new Date(Date.now() + 30 * 60 * 1000).toISOString();

    const { error: updateError } = await supabase
      .from('partners')
      .update({
        password_reset_token: token,
        password_reset_expires: expires,
      })
      .eq('id', partner.id);

    if (updateError) {
      console.error('Forgot-password update error:', updateError.message);
      return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 503 });
    }

    // Send the email (fire-and-forget; we still respond success even if it fails)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sifprime.com';
    const resetUrl = `${baseUrl}/partner/reset-password?token=${token}`;
    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      try {
        await resend.emails.send({
          from: 'SIFPrime <partners@sifprime.com>',
          to: partner.email,
          subject: 'Reset your SIFPrime partner password',
          html: `
<div style="font-family: -apple-system, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
  <h1 style="font-size: 22px; color: #0A1628; margin: 0 0 16px;">Reset your password</h1>
  <p style="color: #475569; font-size: 15px; line-height: 1.6;">
    Hi ${partner.full_name || 'there'},<br><br>
    We received a request to reset the password for your SIFPrime partner account.
    Click the button below to set a new password. This link expires in 30 minutes.
  </p>
  <p style="margin: 28px 0;">
    <a href="${resetUrl}" style="display: inline-block; background: #f59e0b; color: #0A1628; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
      Reset Password
    </a>
  </p>
  <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
    If the button doesn't work, paste this link into your browser:<br>
    <a href="${resetUrl}" style="color: #d97706; word-break: break-all;">${resetUrl}</a>
  </p>
  <p style="color: #64748b; font-size: 13px; margin-top: 32px;">
    If you didn't request a password reset, you can safely ignore this email.
  </p>
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
  <p style="color: #94a3b8; font-size: 12px;">
    SIFPrime · India's SIF intelligence platform · <a href="https://sifprime.com" style="color: #94a3b8;">sifprime.com</a>
  </p>
</div>`,
        });
      } catch (emailErr) {
        console.error('Reset email send failed:', emailErr);
      }
    } else {
      console.warn('RESEND_API_KEY not set — reset email not sent');
    }

    return NextResponse.json({ message: SUCCESS_MESSAGE });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    console.error('Forgot-password error:', message);
    return NextResponse.json({ error: FRIENDLY_DB_ERROR }, { status: 500 });
  }
}
