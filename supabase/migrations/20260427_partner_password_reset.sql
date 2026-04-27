-- Add password reset columns to partners table.
-- Token is a UUID stored hex; expires_at is a timestamp ~30 min from request.

ALTER TABLE partners
  ADD COLUMN IF NOT EXISTS password_reset_token text,
  ADD COLUMN IF NOT EXISTS password_reset_expires timestamptz;

CREATE INDEX IF NOT EXISTS idx_partners_password_reset_token
  ON partners(password_reset_token)
  WHERE password_reset_token IS NOT NULL;
