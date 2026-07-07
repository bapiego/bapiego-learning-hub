-- Bapiego Learning Hub — database schema
-- Run this against a fresh Supabase project (SQL editor or `supabase db push`)
-- before running seed.sql.

create extension if not exists pgcrypto;

create table if not exists quizzes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  course_code text not null default 'BBA251',
  day_number integer,
  title text not null,
  time_limit_minutes integer not null default 10,
  created_at timestamptz not null default now()
);

create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  position integer not null,
  question_text text not null,
  question_type text not null check (question_type in ('mcq', 'tf', 'short')),
  options jsonb,           -- for mcq: [{"key":"a","text":"..."}, ...]
  correct_answer text,     -- for mcq/tf: the correct key/value; null for short
  model_answer text,       -- optional model answer shown after submission
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references quizzes(id) on delete cascade,
  student_name text not null,
  student_index text,
  programme text,
  answers jsonb not null,      -- { [question_id]: given_answer }
  score integer not null,
  max_score integer not null,
  submitted_at timestamptz not null default now()
);

-- Row Level Security
alter table quizzes enable row level security;
alter table questions enable row level security;
alter table submissions enable row level security;

-- Anyone (anon key) can read quizzes and questions to take a quiz.
create policy "public read quizzes" on quizzes
  for select using (true);

create policy "public read questions" on questions
  for select using (true);

-- Anyone can submit a quiz attempt, but cannot read submissions directly
-- (the admin dashboard reads submissions via the service-role "admin" edge
-- function instead, which is gated by ADMIN_PASSWORD).
create policy "public insert submissions" on submissions
  for insert with check (true);
