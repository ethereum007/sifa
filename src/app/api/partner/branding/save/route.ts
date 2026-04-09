import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { getPartnerFromKey } from '@/lib/partner/auth';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    const partner = await getPartnerFromKey(key);
    if (!partner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Only pick known branding fields
    const brandingFields: Record<string, unknown> = {};
    const allowedKeys = [
      'tagline',
      'about_text',
      'brand_color',
      'secondary_color',
      'report_header_style',
      'custom_disclaimer',
      'cta_text',
      'cta_url',
      'address',
      'whatsapp_number',
      'linkedin_url',
      'sebi_reg_number',
      'website',
    ];

    for (const k of allowedKeys) {
      if (k in body) {
        brandingFields[k] = body[k];
      }
    }

    if (Object.keys(brandingFields).length === 0) {
      return NextResponse.json({ error: 'No branding fields provided' }, { status: 400 });
    }

    const { error } = await supabase
      .from('partners')
      .update(brandingFields)
      .eq('id', partner.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
