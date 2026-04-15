-- Daily NAV history for all SIF schemes (Direct + Regular Growth).
-- Populated by /api/cron/snapshot-nav running once/day after AMFI publishes.
-- Read-only for public; writes require service_role key.

create table if not exists public.nav_snapshots (
  id bigserial primary key,
  sif_id text not null,                       -- sifData.ts slug, e.g. 'altiva-hybrid-long-short'
  amfi_direct_code text,                      -- 'SIF-9'
  amfi_regular_code text,                     -- 'SIF-11'
  nav_direct numeric(12,4),
  nav_regular numeric(12,4),
  nav_date date not null,                     -- date reported by AMFI
  fetched_at timestamptz not null default now(),
  unique (sif_id, nav_date)
);

create index if not exists nav_snapshots_sif_date_idx
  on public.nav_snapshots (sif_id, nav_date desc);

alter table public.nav_snapshots enable row level security;

-- Public read (NAV history is public information)
drop policy if exists "nav_snapshots_public_read" on public.nav_snapshots;
create policy "nav_snapshots_public_read"
  on public.nav_snapshots
  for select
  using (true);

-- No insert/update/delete policies — only service_role (which bypasses RLS) can write.
