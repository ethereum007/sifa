import { supabasePartner as supabase } from '@/lib/partner/supabaseAdmin';
import type { Partner } from './types';

/**
 * Look up an active partner by their widget_key.
 * Returns null if key is missing, invalid, or partner is inactive.
 */
export async function getPartnerFromKey(key: string | null): Promise<Partner | null> {
  if (!key) return null;

  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('widget_key', key)
    .eq('is_active', true)
    .single();

  if (error || !data) return null;
  return data as Partner;
}

/**
 * Hash a password string using SHA-256.
 * Returns the hex-encoded digest.
 */
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
