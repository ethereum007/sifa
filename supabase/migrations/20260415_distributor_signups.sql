-- SIFPrime Partner Programme — free toolkit funnel.
-- Separate from the existing `partners` table (which is the active monetised
-- relationship with auth, dashboard, co-branded reports). A distributor_signup
-- can be promoted to a partner manually later.

create table if not exists public.distributor_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Captured fields from /partner signup form
  name text not null,
  firm text,
  arn text not null,                          -- AMFI ARN (e.g. ARN-12345)
  email text not null,
  phone text,
  city text,
  aum_band text,                              -- '< ₹5 Cr' | '₹5–25 Cr' | '₹25–100 Cr' | '₹100 Cr+'
  sif_status text,                            -- 'Already empanelled' | 'Empanelment in progress' | 'Need help getting empanelled' | 'Just exploring'

  -- Derived / system fields
  source text not null default 'partner_page',
  priority boolean not null default false,    -- true if aum_band = '₹100 Cr+'
  email_track text,                           -- which Track-B branch to put them on
  toolkit_downloads jsonb not null default '[]'::jsonb,
  last_engaged_at timestamptz,

  unique (email)
);

create index if not exists distributor_signups_arn_idx
  on public.distributor_signups (arn);
create index if not exists distributor_signups_priority_idx
  on public.distributor_signups (priority) where priority = true;

alter table public.distributor_signups enable row level security;

-- No public policies. Only service_role (bypasses RLS) writes/reads.
-- The /api/partner/signup route uses service_role.

-- ---------------------------------------------------------------------------
-- Knowledge Series — separate top-of-funnel for the Friday Brief.
-- Anyone can subscribe without an ARN; this audience compounds brand authority
-- (private bankers, family-office advisors, AMC RMs) and is broadcast to via
-- Resend audiences every Friday.

create table if not exists public.knowledge_series_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  email text not null,
  name text,
  source text not null default 'partner_page', -- 'partner_page' | 'standalone' | etc.
  unsubscribed_at timestamptz,

  unique (email)
);

create index if not exists knowledge_series_subscribers_email_idx
  on public.knowledge_series_subscribers (email);

alter table public.knowledge_series_subscribers enable row level security;

-- No public policies. Only service_role writes/reads.
