-- Run this once in the Supabase SQL editor to set up the `requests` table.

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  lat double precision not null,
  lng double precision not null,
  radius_km numeric not null,
  area_name text,
  home_type text,
  budget_min integer,
  budget_max integer,
  furnished boolean default false,
  occupant_type text,
  name text not null,
  whatsapp text not null,
  move_in_date date,
  notes text,
  status text not null default 'pending_payment',
  plan text,
  addon_verification boolean default false,
  amount numeric,
  razorpay_order_id text,
  razorpay_payment_id text,
  utm_source text,
  utm_campaign text,
  created_at timestamptz not null default now()
);

-- All writes go through server-side API routes using the service role key,
-- so RLS can stay locked down with no public policies at all.
alter table public.requests enable row level security;
