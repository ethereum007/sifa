import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';

export async function POST(
  request: Request,
  { params }: { params: { reportId: string } }
) {
  try {
    const { reportId } = params;

    // Get viewer metadata
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const { error } = await supabase.from('report_views').insert({
      report_id: reportId,
      viewer_ip: ip,
      user_agent: userAgent,
      viewed_at: new Date().toISOString(),
    });

    if (error) {
      // Non-critical — log but don't fail
      console.error('Failed to log report view:', error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
