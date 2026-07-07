# Bapiego Learning Hub

A small teaching platform for Samuel A. Bapiego's BBA 251 (Business Economics I) classes at
Fountainhead Christian University College. Students take daily quizzes and get instant
auto-graded feedback; the lecturer gets a password-gated dashboard to review results,
including manual review of short-answer questions.

**Live site:** https://bapiego-learning-hub.sabapiego.workers.dev/

## Architecture

- **Frontend** — a single-file HTML/JS app served by a Cloudflare Worker (`worker/index.js`).
  No build step; it's plain JS using the Supabase JS client loaded from a CDN.
- **Database** — Supabase Postgres, three tables: `quizzes`, `questions`, `submissions`
  (see `supabase/schema.sql`). Row Level Security is enabled; the anon key can read
  quizzes/questions and insert submissions, but cannot read other students' submissions.
- **Admin API** — a Supabase Edge Function (`supabase/functions/admin`) that checks a
  password (stored as a Supabase secret, not in code) and, if correct, uses the
  service-role key server-side to return all submissions plus per-question detail
  (including short-answer text for manual grading).

## Repo layout

```
worker/index.js                    Cloudflare Worker source (the whole frontend)
wrangler.toml                      Cloudflare Worker config (for `wrangler deploy`)
supabase/schema.sql                Table + RLS definitions
supabase/seed.sql                  The 5 BBA 251 daily quizzes (10 questions each)
supabase/functions/admin/index.ts  Password-gated admin API (Deno / Supabase Edge Function)
```

## Setting up your own copy

1. **Supabase project**
   - Create a project, run `supabase/schema.sql` in the SQL editor, then `supabase/seed.sql`.
   - Deploy the edge function: `supabase functions deploy admin --project-ref <your-ref> --no-verify-jwt`
   - Set two secrets on the project: `ADMIN_PASSWORD` (the lecturer login password) —
     `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided automatically by Supabase.

2. **Cloudflare Worker**
   - Edit the constants at the top of `worker/index.js`: `SUPABASE_URL`,
     `SUPABASE_ANON_KEY` (safe to expose — it's the public anon key), and
     `ADMIN_FUNCTION_URL` (the deployed edge function's URL).
   - Deploy: `npx wrangler deploy` (or paste the file into the Cloudflare dashboard's
     Quick Edit for a Worker named to match `wrangler.toml`).

## Security notes

- The admin password lives only as a Supabase secret (`ADMIN_PASSWORD`), read via
  `Deno.env.get(...)` in the edge function — never hardcoded in this repo.
- `supabase/seed.sql` contains the correct answers to every quiz question in plain text.
  Keep this repository **private**, or strip/replace the answers before making it public.
- The Supabase service-role key is never exposed to the frontend; it's only used
  server-side inside the `admin` edge function.
