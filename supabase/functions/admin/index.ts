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

async function fetchStudents() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/students?select=id,full_name,index_number,course_code,is_ic,exercise_score,final_exam_score,created_at&order=index_number.asc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch students (${res.status})`);
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

async function callRpc(fn: string, args: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`Failed to call ${fn} (${res.status})`);
  return await res.json();
}

async function addStudent(fullName: string, indexNumber: string, courseCode: string) {
  const rows = await callRpc("admin_add_student", {
    p_course_code: courseCode,
    p_full_name: fullName,
    p_index_number: indexNumber,
  });
  return rows[0]; // { id, full_name, index_number, pin }
}

async function regeneratePin(studentId: string) {
  const rows = await callRpc("admin_regenerate_pin", { p_student_id: studentId });
  return rows[0]; // { id, pin }
}

async function toggleIc(studentId: string, isIc: boolean) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ is_ic: isIc }),
  });
  if (!res.ok) throw new Error(`Failed to update student (${res.status})`);
}

async function updateExerciseScore(studentId: string, score: number | null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ exercise_score: score }),
  });
  if (!res.ok) throw new Error(`Failed to update exercise score (${res.status})`);
}

async function updateFinalExamScore(studentId: string, score: number | null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ final_exam_score: score }),
  });
  if (!res.ok) throw new Error(`Failed to update final exam score (${res.status})`);
}

async function fetchSubmissionById(id: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions?select=id,manual_scores&id=eq.${id}`, {
    headers: SERVICE_HEADERS,
  });
  if (!res.ok) throw new Error(`Failed to fetch submission (${res.status})`);
  const rows = await res.json();
  return rows[0] ?? null;
}

async function gradeShortAnswer(submissionId: string, questionId: string, score: number) {
  const sub = await fetchSubmissionById(submissionId);
  if (!sub) throw new Error("Submission not found");
  const manualScores = { ...(sub.manual_scores || {}), [questionId]: score };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/submissions?id=eq.${submissionId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ manual_scores: manualScores }),
  });
  if (!res.ok) throw new Error(`Failed to save score (${res.status})`);
}

function buildDetails(submission: any, questionsByQuiz: Record<string, any[]>) {
  const qs = questionsByQuiz[submission.quiz_id] || [];
  const answers = submission.answers || {};
  const manualScores = submission.manual_scores || {};
  return qs.map((q) => {
    const given = answers[q.id] ?? answers[String(q.id)] ?? null;
    const detail: any = {
      question_id: q.id,
      position: q.position,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options ?? null,
      given,
    };
    if (q.question_type === "short") {
      detail.model_answer = q.model_answer ?? null;
      const manualScore = manualScores[q.id] ?? manualScores[String(q.id)] ?? null;
      detail.manual_score = manualScore;
      detail.needs_manual_review = manualScore === null;
    } else {
      detail.correct_answer = q.correct_answer;
      detail.is_correct = given != null && given === q.correct_answer;
    }
    return detail;
  });
}

async function buildFullPayload() {
  const [submissions, questions, quizzes, students] = await Promise.all([
    fetchSubmissions(),
    fetchQuestions(),
    fetchQuizzes(),
    fetchStudents(),
  ]);
  const questionsByQuiz: Record<string, any[]> = {};
  for (const q of questions) {
    if (!questionsByQuiz[q.quiz_id]) questionsByQuiz[q.quiz_id] = [];
    questionsByQuiz[q.quiz_id].push(q);
  }
  for (const s of submissions) {
    s.details = buildDetails(s, questionsByQuiz);
    const qs = questionsByQuiz[s.quiz_id] || [];
    const manualScores = s.manual_scores || {};
    const manualTotal = Object.values(manualScores).reduce(
      (a: number, v: any) => a + (Number(v) || 0),
      0
    );
    s.effective_score = (s.score || 0) + manualTotal;
    s.effective_max = qs.length || s.max_score;
  }
  return { submissions, quizzes, students };
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
  let body: {
    password?: string;
    action?: string;
    quiz_id?: string;
    is_open?: boolean;
    student_id?: string;
    is_ic?: boolean;
    full_name?: string;
    index_number?: string;
    course_code?: string;
    exercise_score?: number | null;
    final_exam_score?: number | null;
    submission_id?: string;
    question_id?: string;
    score?: number;
  };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
  if (!ADMIN_PASSWORD || body.password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Incorrect password" }), {
      status: 401, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
  try {
    let lastAction: any = null;
    if (body.action === "toggle_quiz") {
      if (!body.quiz_id || typeof body.is_open !== "boolean") {
        return new Response(JSON.stringify({ error: "quiz_id and is_open are required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await toggleQuiz(body.quiz_id, body.is_open);
    } else if (body.action === "add_student") {
      if (!body.full_name || !body.index_number) {
        return new Response(JSON.stringify({ error: "full_name and index_number are required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      lastAction = await addStudent(body.full_name, body.index_number, body.course_code || "BBA251");
    } else if (body.action === "regenerate_pin") {
      if (!body.student_id) {
        return new Response(JSON.stringify({ error: "student_id is required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      lastAction = await regeneratePin(body.student_id);
    } else if (body.action === "toggle_ic") {
      if (!body.student_id || typeof body.is_ic !== "boolean") {
        return new Response(JSON.stringify({ error: "student_id and is_ic are required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await toggleIc(body.student_id, body.is_ic);
    } else if (body.action === "update_exercise_score") {
      if (!body.student_id) {
        return new Response(JSON.stringify({ error: "student_id is required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      const score = body.exercise_score;
      if (score !== null && (typeof score !== "number" || score < 0 || score > 100)) {
        return new Response(JSON.stringify({ error: "exercise_score must be a number between 0 and 100" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await updateExerciseScore(body.student_id, score ?? null);
    } else if (body.action === "update_final_exam_score") {
      if (!body.student_id) {
        return new Response(JSON.stringify({ error: "student_id is required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      const score = body.final_exam_score;
      if (score !== null && (typeof score !== "number" || score < 0 || score > 100)) {
        return new Response(JSON.stringify({ error: "final_exam_score must be a number between 0 and 100" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await updateFinalExamScore(body.student_id, score ?? null);
    } else if (body.action === "grade_short_answer") {
      if (!body.submission_id || !body.question_id || typeof body.score !== "number") {
        return new Response(JSON.stringify({ error: "submission_id, question_id and score are required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      if (body.score < 0 || body.score > 1) {
        return new Response(JSON.stringify({ error: "score must be between 0 and 1" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await gradeShortAnswer(body.submission_id, body.question_id, body.score);
    }
    const payload = await buildFullPayload();
    return new Response(JSON.stringify({ ...payload, last_action: lastAction }), {
      headers: { "Content-Type": "application/json", ...CORS }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500, headers: { "Content-Type": "application/json", ...CORS }
    });
  }
});
