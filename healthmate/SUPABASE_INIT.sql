-- Run this in Supabase SQL Editor to create core tables

create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp default now()
);

create table profiles (
  user_id uuid primary key,
  name text,
  goal text,
  age int,
  gender text,
  height_cm int,
  weight_kg int,
  email text,
  active_subscription boolean default false,
  push_token text,
  created_at timestamp default now()
);

create table plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id),
  plan_json jsonb,
  created_at timestamp default now()
);

create table metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(user_id),
  day date not null,
  weight_kg numeric,
  steps int,
  sleep_hours numeric,
  notes text,
  created_at timestamp default now()
);

create table points (
  user_id uuid references profiles(user_id),
  total_points int default 0,
  updated_at timestamp default now()
);

create table achievements (
  id serial primary key,
  user_id uuid references profiles(user_id),
  title text,
  description text,
  earned_at timestamp default now()
);

create table friends (
  id serial primary key,
  user_id uuid references profiles(user_id),
  friend_id uuid references profiles(user_id),
  created_at timestamp default now()
);
