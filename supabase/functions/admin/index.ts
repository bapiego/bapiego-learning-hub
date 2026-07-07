import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

const SERVICE_HEADERS = {
  apikey: SERVICE_ROLE_KEY,
  Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
};

async function fetchSubmissions() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/submissions?select=*,quizzes(title,day_number,slug)&order=submitted_at.desc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch submissions (${res.status})`);
  return await res.json();
}

async function fetchQuestions() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/questions?select=*&order=quiz_id.asc,position.asc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch questions (${res.status})`);
  return await res.json();
}

async function fetchQuizzes() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/quizzes?select=id,slug,course_code,day_number,title,time_limit_minutes,is_open&order=day_number.asc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch quizzes (${res.status})`);
  return await res.json();
}

async function toggleQuiz(quizId: string, isOpen: boolean) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/quizzes?id=eq.${quizId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ is_open: isOpen }),
  });
  if (!res.ok) throw new Error(`Failed to update quiz (${res.status})`);
}

function buildDetails(submission: any, questionsByQuiz: Record<string, any[]>) {
  const qs = questionsByQuiz[submission.quiz_id] || [];
  const answers = submission.answers || {};
  return qs.map((q) => {
    const given = answers[q.id] ?? answers[String(q.id)] ?? null;
    const detail: any = {
      position: q.position,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options ?? null,
      given,
    };
    if (q.question_type === "short") {
      detail.model_answer = q.model_answer ?? null;
      detail.needs_manual_review = true;
    } else {
      detail.correct_answer = q.correct_answer;
      detail.is_correct = given != null && given === q.correct_answer;
    }
    return detail;
  });
}

async function buildFullPayload() {
  const [submissions, questions, quizzes] = await Promise.all([
    fetchSubmissions(),
    fetchQuestions(),
    fetchQuizzes(),
  ]);
  const questionsByQuiz: Record<string, any[]> = {};
  for (const q of questions) {
    if (!questionsByQuiz[q.quiz_id]) questionsByQuiz[q.quiz_id] = [];
    questionsByQuiz[q.quiz_id].push(q);
  }
  for (const s of submissions) {
    s.details = buildDetails(s, questionsByQuiz);
  }
  return { submissions, quizzes };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json", ...C