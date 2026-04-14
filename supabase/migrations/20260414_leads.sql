-- Direct lead capture from fund pages (sifprime.com) — separate from partner_leads
-- Run this in Supabase SQL editor

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  fund_slug text,
  fund_name text,
  message text,
  source text DEFAULT 'fund-page',
  status text DEFAULT 'new',
  created_at timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_fund_slug ON leads (fund_slug);

-- RLS: allow anon inserts from the public site (/api/leads uses the anon key).
-- Reads are admin-only.
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon can insert leads" ON leads;
CREATE POLICY "anon can insert leads" ON leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);
