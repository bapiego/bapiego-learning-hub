import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

async function verifyPin(courseCode: string, indexNumber: string, pin: string): Promise<string | null> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_student_pin`, {
    method: "POST",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify({ p_course_code: courseCode, p_index_number: indexNumber, p_pin: pin }),
  });
  if (!res.ok) throw new Error(`PIN check failed (${res.status})`);
  const id = await res.json();
  return id || null;
}

async function fetchStudent(studentId: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/students?select=id,full_name,index_number,course_code,is_ic,exercise_score,final_exam_score&id=eq.${studentId}`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch student (${res.status})`);
  const rows = await res.json();
  return rows[0] ?? null;
}

async function fetchQuizzes(courseCode: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/quizzes?select=id,slug,day_number,title,time_limit_minutes,is_open&course_code=eq.${courseCode}&order=day_number.asc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch quizzes (${res.status})`);
  return await res.json();
}

async function fetchSubmissionsForStudent(indexNumber: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/submissions?select=id,quiz_id,student_name,student_index,score,max_score,manual_scores,submitted_at&order=submitted_at.asc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch submissions (${res.status})`);
  const all = await res.json();
  const norm = (s: string) => (s || "").trim().toLowerCase();
  return all.filter((s: any) => norm(s.student_index) === norm(indexNumber));
}

async function fetchActiveGrants(studentId: string) {
  const nowIso = new Date().toISOString();
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/quiz_access_grants?select=id,quiz_id,expires_at&student_id=eq.${studentId}&used_at=is.null&expires_at=gt.${encodeURIComponent(nowIso)}`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch access grants (${res.status})`);
  return await res.json();
}

async function fetchQuestionCounts(quizIds: string[]): Promise<Record<string, number>> {
  if (!quizIds.length) return {};
  const idsParam = quizIds.join(",");
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/questions?select=quiz_id&quiz_id=in.(${idsParam})`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch questions (${res.status})`);
  const rows = await res.json();
  const counts: Record<string, number> = {};
  for (const row of rows) {
    counts[row.quiz_id] = (counts[row.quiz_id] || 0) + 1;
  }
  return counts;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: CORS });
  }
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
  let body: { index_number?: string; pin?: string; course_code?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
  const courseCode = body.course_code || "BBA251";
  if (!body.index_number || !body.pin) {
    return new Response(JSON.stringify({ error: "index_number and pin are required" }), {
      status: 400, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
  try {
    const studentId = await verifyPin(courseCode, body.index_number.trim(), body.pin.trim());
    if (!studentId) {
      return new Response(JSON.stringify({ error: "Incorrect index number or PIN" }), {
        status: 401, headers: { "Content-Type": "application/json", ...CORS }
      });
    }
    const student = await fetchStudent(studentId);
    const [quizzes, submissions, grants] = await Promise.all([
      fetchQuizzes(courseCode),
      fetchSubmissionsForStudent(student.index_number),
      fetchActiveGrants(studentId),
    ]);
    const counts = await fetchQuestionCounts(quizzes.map((q: any) => q.id));
    for (const s of submissions) {
      const manualScores = s.manual_scores || {};
      const manualTotal = Object.values(manualScores).reduce(
        (a: number, v: any) => a + (Number(v) || 0),
        0
      );
      s.effective_score = (s.score || 0) + manualTotal;
      s.effective_max = counts[s.quiz_id] || s.max_score;
    }
    return new Response(JSON.stringify({ student, quizzes, submissions, grants }), {
      headers: { "Content-Type": "application/json", ...CORS }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
});
