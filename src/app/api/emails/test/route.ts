import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const to = searchParams.get('to');
    const key = searchParams.get('key');

    const adminPassword = process.env.ADMIN_PASSWORD || '';
    if (!adminPassword || key !== adminPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!to) {
      return NextResponse.json(
        { error: 'Pass ?to=<recipient-email>&key=<admin-password>' },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY || '';
    if (!apiKey || apiKey.length < 20) {
      return NextResponse.json(
        {
          error: 'RESEND_API_KEY missing or invalid',
          length: apiKey.length,
        },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: 'SIFPrime <noreply@sifprime.com>',
      to,
      subject: 'SIFPrime test email',
      html: '<p>If you can read this, Resend is wired up correctly.</p>',
    });

    if (error) {
      return NextResponse.json({ ok: false, error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
