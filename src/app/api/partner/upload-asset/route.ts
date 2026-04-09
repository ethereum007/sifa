import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import { getPartnerFromKey } from '@/lib/partner/auth';

export async function POST(request: Request) {
  try {
    // Read key from searchParams or x-widget-key header
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key') || request.headers.get('x-widget-key');

    const partner = await getPartnerFromKey(key);
    if (!partner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const assetType = formData.get('asset_type') as string | null;

    if (!file || !assetType) {
      return NextResponse.json(
        { error: 'file and asset_type are required' },
        { status: 400 }
      );
    }

    const validTypes = ['logo', 'photo', 'signature'];
    if (!validTypes.includes(assetType)) {
      return NextResponse.json(
        { error: `asset_type must be one of: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Determine file extension
    const ext = file.name.split('.').pop() || 'png';
    const storagePath = `partners/${partner.id}/${assetType}.${ext}`;

    // Upload to Supabase Storage
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from('partner-assets')
      .upload(storagePath, arrayBuffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('partner-assets')
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;

    // Map asset_type to the partner column
    const columnMap: Record<string, string> = {
      logo: 'logo_url',
      photo: 'profile_photo_url',
      signature: 'signature_url',
    };

    const { error: updateError } = await supabase
      .from('partners')
      .update({ [columnMap[assetType]]: publicUrl })
      .eq('id', partner.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
