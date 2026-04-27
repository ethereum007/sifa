-- Lock down RLS on partner platform tables.
-- Server-side API routes use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
-- Anon key (browser/public) gets ZERO access — no SELECT, no INSERT, no UPDATE, no DELETE.

-- partners (contains password_hash + PII)
DROP POLICY IF EXISTS "Allow all operations on partners" ON partners;
CREATE POLICY "Deny anon access to partners" ON partners
  FOR ALL TO anon USING (false) WITH CHECK (false);

-- partner_leads (contains client PII per partner)
DROP POLICY IF EXISTS "Allow all operations on partner_leads" ON partner_leads;
CREATE POLICY "Deny anon access to partner_leads" ON partner_leads
  FOR ALL TO anon USING (false) WITH CHECK (false);

-- report_views (analytics — not sensitive but no reason to expose)
DROP POLICY IF EXISTS "Allow all operations on report_views" ON report_views;
CREATE POLICY "Deny anon access to report_views" ON report_views
  FOR ALL TO anon USING (false) WITH CHECK (false);

-- RLS is still enabled (from initial migration), so anon now has zero access.
-- service_role bypasses RLS, so server-side routes continue to work.
