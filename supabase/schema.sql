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
  is_open boolean not null default false, -- lecturer must switch a quiz to "open" before students can take it
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

-- Anyone (anon key) can read quiz titles/metadata, so potential and current
-- students can see what's available even before a quiz is opened.
create policy "public read quizzes" on quizzes
  for select using (true);

-- Question content is only readable once the parent quiz has been switched
-- to is_open = true by the lecturer. This is enforced at the database level
-- (not just hidden in the UI) so a direct REST API call with the public
-- anon key cannot fetch a locked quiz's questions before it's due.
create policy "read questions of open quizzes" on questions
  for select using (
    exists (
      select 1 from quizzes q
      where q.id = questions.quiz_id and q.is_open = true
    )
  );

-- Anyone can submit a quiz attempt, but cannot read submissions directly
-- (the admin dashboard reads submissions via the service-role "admin" edge
-- function instead, which is gated by ADMIN_PASSWORD).
create policy "public insert submissions" on submissions
  for insert with check (true);

-- Student roster: index number + PIN login (Phase 1)
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  index_number text not null,
  course_code text not null default 'BBA251',
  pin_hash text not null,
  is_ic boolean not null default false,
  created_at timestamptz not null default now(),
  unique (course_code, index_number)
);

-- No RLS policies are defined for this table on purpose: this denies all
-- anon/authenticated access by default. Only the service-role key (used
-- inside the "admin" and "student" edge functions) can read/write it.
alter table students enable row level security;

-- Verifies an index number + PIN pair and returns the matching student's id
-- (or null), without ever exposing pin_hash to the caller.
create or replace function verify_student_pin(p_course_code text, p_index_number text, p_pin text)
returns uuid
language sql
security definer
set search_path = public, extensions
as $$
  select id from students
  where course_code = p_course_code
    and index_number = p_index_number
    and pin_hash = crypt(p_pin, pin_hash)
  limit 1;
$$;

-- Admin-only helper: adds a student and auto-generates a 4-digit PIN.
-- (Phase 4: extended to also capture phone/programme/email at creation time.)
create or replace function admin_add_student(
  p_course_code text,
  p_full_name text,
  p_index_number text,
  p_phone text default null,
  p_programme text default null,
  p_email text default null
)
returns table (id uuid, full_name text, index_number text, pin text, phone text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  new_pin text;
  new_id uuid;
begin
  new_pin := lpad(floor(random() * 10000)::text, 4, '0');
  insert into students (course_code, full_name, index_number, pin_hash, phone, programme, email)
  values (p_course_code, p_full_name, p_index_number, crypt(new_pin, gen_salt('bf')), p_phone, p_programme, p_email)
  returning students.id into new_id;

  return query select new_id, p_full_name, p_index_number, new_pin, p_phone;
end;
$$;

-- Admin-only helper: regenerates a student's PIN.
create or replace function admin_regenerate_pin(p_student_id uuid)
returns table (id uuid, pin text)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  new_pin text;
begin
  new_pin := lpad(floor(random() * 10000)::text, 4, '0');
  update students set pin_hash = crypt(new_pin, gen_salt('bf'))
  where students.id = p_student_id;

  return query select p_student_id, new_pin;
end;
$$;

-- Phase 2: exercise/participation score + final exam manual entry on students,
-- and per-question manual scores for short-answer grading on submissions.

alter table students
  add column if not exists exercise_score numeric,
  add column if not exists final_exam_score numeric;

alter table students
  add constraint students_exercise_score_range check (exercise_score is null or (exercise_score >= 0 and exercise_score <= 100));

alter table students
  add constraint students_final_exam_score_range check (final_exam_score is null or (final_exam_score >= 0 and final_exam_score <= 100));

alter table submissions
  add column if not exists manual_scores jsonb not null default '{}'::jsonb;

-- Phase 4: student contact details for SMS notifications, plus a log of
-- SMS send attempts for troubleshooting delivery issues.

alter table students
  add column if not exists phone text,
  add column if not exists programme text,
  add column if not exists email text;

create table if not exists sms_log (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete set null,
  phone text not null,
  message text not null,
  trigger text not null, -- e.g. 'pin_issued', 'quiz_open', 'missed_quiz', 'final_grade', 'broadcast'
  success boolean not null,
  response_snippet text,
  created_at timestamptz not null default now()
);

alter table sms_log enable row level security;
-- No policies: only the service-role key (used inside edge functions) can read/write.
