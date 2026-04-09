-- SIFPrime B2B Partner Platform Schema
-- Run this in Supabase SQL editor

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  firm_name text,
  arn_number text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  website text,
  address text,
  city text,
  linkedin_url text,
  whatsapp_number text,
  sebi_reg_number text,
  tagline text,
  about_text text,
  logo_url text,
  profile_photo_url text,
  signature_url text,
  brand_color text DEFAULT '#1B4B8A',
  secondary_color text DEFAULT '#0A1628',
  report_header_style text DEFAULT 'professional',
  custom_disclaimer text,
  cta_text text DEFAULT 'Schedule a SIF Consultation',
  cta_url text,
  plan text DEFAULT 'starter',
  distributor_status text DEFAULT 'empanelled',
  is_active bool DEFAULT true,
  reports_sent int DEFAULT 0,
  widget_key uuid DEFAULT gen_random_uuid(),
  password_hash text,
  aum_band text,
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS partner_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid REFERENCES partners(id),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  investable_surplus text,
  risk_profile text,
  current_investments text[],
  priorities text[],
  sif_category_match text,
  sif_familiarity text,
  top_fund_recommendations jsonb,
  report_id uuid DEFAULT gen_random_uuid(),
  report_sent_at timestamp,
  consultation_booked bool DEFAULT false,
  aum_in_pipeline numeric,
  status text DEFAULT 'new',
  source text DEFAULT 'direct',
  created_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS report_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid,
  lead_id uuid,
  partner_id uuid,
  viewed_at timestamp DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_partners_widget_key ON partners(widget_key);
CREATE INDEX IF NOT EXISTS idx_partners_arn ON partners(arn_number);
CREATE INDEX IF NOT EXISTS idx_partners_email ON partners(email);
CREATE INDEX IF NOT EXISTS idx_partner_leads_partner_id ON partner_leads(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_leads_report_id ON partner_leads(report_id);
CREATE INDEX IF NOT EXISTS idx_report_views_report_id ON report_views(report_id);

-- Enable RLS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_views ENABLE ROW LEVEL SECURITY;

-- Policies: allow anon access for the partner platform (auth via widget_key)
CREATE POLICY "Allow all operations on partners" ON partners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on partner_leads" ON partner_leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on report_views" ON report_views FOR ALL USING (true) WITH CHECK (true);

-- Storage: Create bucket partner-assets (do this in Supabase dashboard)
-- Bucket: partner-assets | Public: true
