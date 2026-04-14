import { NextResponse } from 'next/server';
import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';

function isAuthed(request: Request): boolean {
  const cookie = request.headers.get('cookie') || '';
  return cookie.includes('admin_auth=true');
}

export async function GET(request: Request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (error) {
      console.error('Admin leads fetch error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    type Lead = { status?: string | null; fund_slug?: string | null };
    const list = (leads || []) as Lead[];
    const stats = {
      total: list.length,
      newCount: list.filter((l) => !l.status || l.status === 'new').length,
      contacted: list.filter((l) => l.status === 'contacted').length,
      converted: list.filter((l) => l.status === 'converted').length,
      byFund: list.reduce<Record<string, number>>((acc, l) => {
        const key = l.fund_slug || 'unknown';
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    };

    return NextResponse.json({ leads: list, stats });
  } catch (err) {
    console.error('Admin leads error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status required' }, { status: 400 });
    }

    const allowed = ['new', 'contacted', 'converted', 'not-interested'];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Admin leads PATCH error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
