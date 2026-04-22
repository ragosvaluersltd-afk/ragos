-- Ragos Valuers: Phase 3 schema
create extension if not exists "pgcrypto";

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  listing_type text not null check (listing_type in ('for-sale', 'for-rent')),
  property_type text not null check (property_type in ('apartment', 'house', 'townhouse', 'land', 'office')),
  price bigint not null check (price >= 0),
  currency text not null default 'KES' check (currency in ('KES', 'USD')),
  city text not null,
  location text not null,
  sublocation text,
  bedrooms int,
  bathrooms int,
  size_sqm numeric,
  size_sqft numeric,
  summary text not null,
  description text not null,
  features text[] not null default '{}',
  amenities text[] not null default '{}',
  status text not null default 'available' check (status in ('available', 'under-offer', 'sold', 'let')),
  featured boolean not null default false,
  cover_image_url text not null,
  cover_image_alt text not null default 'Property image',
  gallery jsonb not null default '[]'::jsonb,
  reference_code text not null unique,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_slug_idx on public.properties (slug);
create index if not exists properties_location_idx on public.properties (location);
create index if not exists properties_featured_idx on public.properties (featured, published_at desc);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.valuation_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  property_location text not null,
  property_type text not null,
  valuation_type text not null,
  additional_notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete set null,
  property_slug text,
  name text not null,
  email text not null,
  phone text,
  message text not null,
  preferred_contact_method text check (preferred_contact_method in ('email', 'phone')),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text not null default 'viewer' check (role in ('admin', 'agent', 'viewer')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.properties enable row level security;
alter table public.contacts enable row level security;
alter table public.valuation_requests enable row level security;
alter table public.inquiries enable row level security;
alter table public.profiles enable row level security;

-- Public listing read policy.
drop policy if exists "Public can read properties" on public.properties;
create policy "Public can read properties" on public.properties for select using (true);

-- Profiles are only readable by owners/admin flows.
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);

insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;
