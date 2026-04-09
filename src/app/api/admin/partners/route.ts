import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';

export async function GET() {
  try {
    const { data: partners, error } = await supabase
      .from('partners')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get aggregate stats
    const { count: totalProspects } = await supabase
      .from('partner_leads')
      .select('*', { count: 'exact', head: true });

    const totalReports = (partners || []).reduce((sum, p) => sum + (p.reports_sent || 0), 0);
    const needHelp = (partners || []).filter(p => p.distributor_status === 'need_help').length;

    return NextResponse.json({
      partners: partners || [],
      stats: {
        total: (partners || []).length,
        totalProspects: totalProspects || 0,
        totalReports,
        needHelp,
      },
    });
  } catch (err) {
    console.error('Admin partners error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
