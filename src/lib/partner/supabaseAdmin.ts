import { createClient } from '@supabase/supabase-js';

// Untyped Supabase client for the partner platform tables
// (partners, partner_leads, report_views are not in the generated Database type)
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
// Prefer service_role key (bypasses RLS) for server-side admin operations.
// Falls back to anon key only for local dev where service key may not be set.
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  '';

export const supabasePartner = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
