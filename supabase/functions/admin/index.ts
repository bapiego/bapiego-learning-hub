import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SMS_API_KEY = Deno.env.get("SMSONLINEGH_API_KEY");
const SMS_SENDER_ID = Deno.env.get("SMSONLINEGH_SENDER_ID");

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

async function fetchQuizById(quizId: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/quizzes?select=id,slug,course_code,day_number,title,time_limit_minutes,is_open&id=eq.${quizId}`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch quiz (${res.status})`);
  const rows = await res.json();
  return rows[0] ?? null;
}

async function fetchStudents() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/students?select=id,full_name,index_number,course_code,is_ic,exercise_score,final_exam_score,phone,programme,email,created_at&order=index_number.asc`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch students (${res.status})`);
  return await res.json();
}

async function fetchStudentById(studentId: string) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/students?select=id,full_name,index_number,course_code,is_ic,phone,programme,email&id=eq.${studentId}`,
    { headers: SERVICE_HEADERS }
  );
  if (!res.ok) throw new Error(`Failed to fetch student (${res.status})`);
  const rows = await res.json();
  return rows[0] ?? null;
}

async function logSms(studentId: string | null, phone: string, message: string, trigger: string, success: boolean, responseSnippet: string | null) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/sms_log`, {
      method: "POST",
      headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        student_id: studentId,
        phone,
        message,
        trigger,
        success,
        response_snippet: responseSnippet ? responseSnippet.slice(0, 500) : null,
      }),
    });
  } catch {
    // Logging failures should never break the calling action.
  }
}

// Sends a single SMS via SMSOnlineGH and logs the attempt. Never throws —
// SMS delivery problems must not break the underlying admin action (e.g.
// adding a student should still succeed even if the text fails to send).
async function sendSms(studentId: string | null, phone: string, message: string, trigger: string): Promise<boolean> {
  if (!phone) return false;
  if (!SMS_API_KEY || !SMS_SENDER_ID) {
    await logSms(studentId, phone, message, trigger, false, "SMS not configured: missing SMSONLINEGH_API_KEY or SMSONLINEGH_SENDER_ID secret");
    return false;
  }
  try {
    const params = new URLSearchParams({
      key: SMS_API_KEY,
      text: message,
      type: "0",
      sender: SMS_SENDER_ID,
      to: phone,
    });
    const res = await fetch("https://api.smsonlinegh.com/v5/message/sms/send", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body: params.toString(),
    });
    const text = await res.text();
    let ok = res.ok;
    try {
      const json = JSON.parse(text);
      if (json?.handshake && typeof json.handshake.id === "number") {
        ok = json.handshake.id === 0;
      }
    } catch {
      // Non-JSON response; fall back to HTTP status.
    }
    await logSms(studentId, phone, message, trigger, ok, text);
    return ok;
  } catch (e) {
    await logSms(studentId, phone, message, trigger, false, (e as Error).message);
    return false;
  }
}

async function toggleQuiz(quizId: string, isOpen: boolean) {
  const before = await fetchQuizById(quizId);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/quizzes?id=eq.${quizId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ is_open: isOpen }),
  });
  if (!res.ok) throw new Error(`Failed to update quiz (${res.status})`);
  if (!before) return;

  if (!before.is_open && isOpen) {
    // Quiz just opened: notify every student with a phone number.
    const students = await fetchStudents();
    for (const s of students) {
      if (!s.phone) continue;
      const message = `Hi ${s.full_name}, "${before.title}" (Day ${before.day_number}) is now open on the Bapiego Learning Hub. Log in to take it.`;
      await sendSms(s.id, s.phone, message, "quiz_open");
    }
  } else if (before.is_open && !isOpen) {
    // Quiz just closed: notify students on the roster who never submitted it.
    const [students, submissions] = await Promise.all([fetchStudents(), fetchSubmissions()]);
    const norm = (s: string) => (s || "").trim().toLowerCase();
    const submittedIndexes = new Set(
      submissions.filter((sub: any) => sub.quiz_id === quizId).map((sub: any) => norm(sub.student_index))
    );
    for (const s of students) {
      if (!s.phone) continue;
      if (submittedIndexes.has(norm(s.index_number))) continue;
      const message = `Hi ${s.full_name}, you did not submit "${before.title}" (Day ${before.day_number}) before it closed. Please see your lecturer if you have concerns.`;
      await sendSms(s.id, s.phone, message, "missed_quiz");
    }
  }
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

async function addStudent(
  fullName: string,
  indexNumber: string,
  courseCode: string,
  phone: string | null,
  programme: string | null,
  email: string | null
) {
  const rows = await callRpc("admin_add_student", {
    p_course_code: courseCode,
    p_full_name: fullName,
    p_index_number: indexNumber,
    p_phone: phone,
    p_programme: programme,
    p_email: email,
  });
  const created = rows[0]; // { id, full_name, index_number, pin, phone }
  if (created?.phone) {
    const message = `Hi ${created.full_name}, welcome to the Bapiego Learning Hub (BBA 251). Your index number is ${created.index_number} and your login PIN is ${created.pin}. Keep this PIN safe.`;
    await sendSms(created.id, created.phone, message, "pin_issued");
  }
  return created;
}

async function regeneratePin(studentId: string) {
  const rows = await callRpc("admin_regenerate_pin", { p_student_id: studentId });
  const result = rows[0]; // { id, pin }
  const student = await fetchStudentById(studentId);
  if (student?.phone) {
    const message = `Hi ${student.full_name}, your Bapiego Learning Hub PIN has been reset. Your new PIN is ${result.pin}.`;
    await sendSms(studentId, student.phone, message, "pin_issued");
  }
  return result;
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
  if (score !== null) {
    const student = await fetchStudentById(studentId);
    if (student?.phone) {
      const message = `Hi ${student.full_name}, your final exam score has been recorded: ${score}/100. Log in to the Bapiego Learning Hub to view your full grade breakdown.`;
      await sendSms(studentId, student.phone, message, "final_grade");
    }
  }
}

async function updateStudentIdentity(studentId: string, fullName: string, indexNumber: string) {
  const existing = await fetchStudentById(studentId);
  if (!existing) throw new Error("Student not found");
  const oldIndex: string = existing.index_number;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ full_name: fullName, index_number: indexNumber }),
  });
  if (!res.ok) {
    const errText = await res.text();
    if (res.status === 409 || errText.includes("23505") || errText.toLowerCase().includes("duplicate")) {
      throw new Error("That index number is already in use by another student.");
    }
    throw new Error(`Failed to update student (${res.status})`);
  }

  // Best-effort: re-link any submissions recorded under the old (incorrect)
  // index number / name so quiz history stays connected to this student's
  // corrected profile. Never lets a re-link failure break the main update.
  try {
    if (oldIndex && oldIndex.trim()) {
      const changed: Record<string, unknown> = {};
      if (oldIndex.trim().toLowerCase() !== indexNumber.trim().toLowerCase()) changed.student_index = indexNumber;
      if (fullName !== existing.full_name) changed.student_name = fullName;
      if (Object.keys(changed).length) {
        await fetch(`${SUPABASE_URL}/rest/v1/submissions?student_index=ilike.${encodeURIComponent(oldIndex.trim())}`, {
          method: "PATCH",
          headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
          body: JSON.stringify(changed),
        });
      }
    }
  } catch {
    // Ignore — the student's own record was already corrected successfully.
  }
}

async function updateStudentContact(studentId: string, phone: string | null, programme: string | null, email: string | null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${studentId}`, {
    method: "PATCH",
    headers: { ...SERVICE_HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ phone, programme, email }),
  });
  if (!res.ok) throw new Error(`Failed to update student contact info (${res.status})`);
}

async function sendBroadcast(message: string, studentId: string | null) {
  const students = await fetchStudents();
  const targets = studentId ? students.filter((s: any) => s.id === studentId) : students;
  let sent = 0;
  let skipped = 0;
  for (const s of targets) {
    if (!s.phone) {
      skipped++;
      continue;
    }
    const ok = await sendSms(s.id, s.phone, message, "broadcast");
    if (ok) sent++;
    else skipped++;
  }
  return { sent, skipped, total: targets.length };
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
    phone?: string | null;
    programme?: string | null;
    email?: string | null;
    exercise_score?: number | null;
    final_exam_score?: number | null;
    submission_id?: string;
    question_id?: string;
    score?: number;
    message?: string;
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
      lastAction = await addStudent(
        body.full_name,
        body.index_number,
        body.course_code || "BBA251",
        body.phone ?? null,
        body.programme ?? null,
        body.email ?? null
      );
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
    } else if (body.action === "update_student_identity") {
      if (!body.student_id || !body.full_name || !body.full_name.trim() || !body.index_number || !body.index_number.trim()) {
        return new Response(JSON.stringify({ error: "student_id, full_name and index_number are required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await updateStudentIdentity(body.student_id, body.full_name.trim(), body.index_number.trim());
    } else if (body.action === "update_student_contact") {
      if (!body.student_id) {
        return new Response(JSON.stringify({ error: "student_id is required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      await updateStudentContact(body.student_id, body.phone ?? null, body.programme ?? null, body.email ?? null);
    } else if (body.action === "send_broadcast") {
      if (!body.message || !body.message.trim()) {
        return new Response(JSON.stringify({ error: "message is required" }), {
          status: 400, headers: { "Content-Type": "application/json", ...CORS }
        });
      }
      lastAction = await sendBroadcast(body.message.trim(), body.student_id || null);
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
