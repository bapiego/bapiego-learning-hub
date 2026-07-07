const SUPABASE_URL = "https://qaqypbplpubkmwtekeva.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhcXlwYnBscHVia213dGVrZXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNTI3MjMsImV4cCI6MjA5ODkyODcyM30.iDg1fpBi3_O8d_n8jP8cf_ZwgHyBNe6GkWZzLj7PvMA";
const ADMIN_FUNCTION_URL = "https://qaqypbplpubkmwtekeva.supabase.co/functions/v1/admin";

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Bapiego — Learning Hub</title>
<style>
  :root {
    --navy: #21295C;
    --blue: #065A82;
    --teal: #1C7293;
    --ice: #EAF3F7;
    --amber: #E8A33D;
    --text: #1B2430;
    --muted: #5B6B79;
    --white: #FFFFFF;
    --good: #1E7A46;
    --bad: #B3261E;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: -apple-system, "Segoe UI", Calibri, Arial, sans-serif;
    background: var(--ice); color: var(--text); min-height: 100vh;
  }
  header {
    background: var(--navy); color: var(--white); padding: 18px 24px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  }
  .brand { display: flex; align-items: baseline; gap: 10px; cursor: pointer; }
  .brand .name { font-family: Georgia, "Cambria", serif; font-weight: 700; font-size: 24px; letter-spacing: 0.5px; }
  .brand .tag { font-size: 12px; color: var(--amber); text-transform: uppercase; letter-spacing: 1.5px; }
  nav a { color: #C7D8E3; text-decoration: none; margin-left: 22px; font-size: 14px; cursor: pointer; }
  nav a:hover { color: var(--white); }
  main { max-width: 900px; margin: 0 auto; padding: 32px 20px 80px; }
  .hero { background: linear-gradient(135deg, var(--navy), var(--blue)); color: var(--white); border-radius: 14px; padding: 36px 32px; margin-bottom: 32px; }
  .hero h1 { margin: 0 0 8px; font-family: Georgia, serif; font-size: 30px; }
  .hero p { margin: 0; color: #C7D8E3; font-size: 15px; }
  .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--teal); font-weight: 700; margin: 0 0 14px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .card {
    background: var(--white); border-radius: 12px; padding: 20px; cursor: pointer;
    box-shadow: 0 2px 10px rgba(20,30,60,0.08); border: 1px solid #E1E9EE; transition: transform .15s, box-shadow .15s;
  }
  .card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(20,30,60,0.14); }
  .card .kicker { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
  .card h3 { margin: 0 0 6px; font-size: 17px; color: var(--navy); }
  .card .meta { font-size: 12.5px; color: var(--muted); }
  .badge { display: inline-block; background: var(--ice); color: var(--teal); font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 20px; margin-top: 10px; }
  .backlink { display: inline-block; margin-bottom: 18px; color: var(--blue); font-size: 14px; cursor: pointer; text-decoration: none; }
  .backlink:hover { text-decoration: underline; }
  .panel { background: var(--white); border-radius: 14px; padding: 28px; box-shadow: 0 2px 10px rgba(20,30,60,0.08); border: 1px solid #E1E9EE; }
  .panel h2 { margin-top: 0; color: var(--navy); font-family: Georgia, serif; }
  label { display: block; font-size: 13px; font-weight: 600; color: var(--muted); margin: 14px 0 5px; }
  input[type=text], input[type=password], select, textarea {
    width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #CBD8E0; font-size: 14px; font-family: inherit; background: #FBFDFE;
  }
  textarea { min-height: 70px; resize: vertical; }
  button {
    background: var(--blue); color: var(--white); border: none; padding: 12px 22px; border-radius: 8px;
    font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 20px;
  }
  button:hover { background: var(--teal); }
  button:disabled { background: #A9B7C0; cursor: not-allowed; }
  .qblock { border-top: 1px solid #EAF0F3; padding: 18px 0; }
  .qblock:first-of-type { border-top: none; }
  .qnum { font-weight: 700; color: var(--navy); margin-bottom: 8px; }
  .opt { display: flex; align-items: center; gap: 8px; padding: 7px 0; font-size: 14.5px; cursor: pointer; }
  .opt input { cursor: pointer; }
  .tf-row { display: flex; gap: 18px; }
  .quiz-timer { display:inline-block; background: var(--ice); color: var(--navy); font-weight:700; font-size:15px; padding:6px 14px; border-radius:20px; white-space:nowrap; }
  .quiz-timer.low { background:#FCEEED; color: var(--bad); }
  .detail-toggle { background:none; border:1px solid var(--teal); color:var(--teal); padding:6px 12px; font-size:12.5px; font-weight:600; border-radius:6px; cursor:pointer; margin:0; }
  .detail-toggle:hover { background: var(--ice); }
  .detail-row td { background:#F7FAFB; }
  .detail-q { border-bottom:1px solid #E1E9EE; padding:12px 4px; }
  .detail-q:last-child { border-bottom:none; }
  .detail-q .dqt { font-weight:600; color:var(--navy); font-size:13.5px; margin-top:4px; }
  .detail-q .dgiven { font-size:13px; margin-top:4px; }
  .detail-q .dcorrect { font-size:12px; font-weight:700; color:var(--good); text-transform:uppercase; letter-spacing:0.5px; }
  .detail-q .dincorrect { font-size:12px; font-weight:700; color:var(--bad); text-transform:uppercase; letter-spacing:0.5px; }
  .detail-q .dreview { font-size:11px; font-weight:700; color:var(--amber); text-transform:uppercase; letter-spacing:0.5px; }
  .detail-q .dmodel { font-size:12.5px; color:var(--muted); margin-top:4px; }
  .result-score { text-align: center; padding: 20px 0; }
  .result-score .big { font-size: 44px; font-weight: 800; color: var(--navy); }
  .result-score .label { color: var(--muted); font-size: 14px; }
  .review-item { border-radius: 10px; padding: 14px 16px; margin-bottom: 10px; }
  .review-item.correct { background: #EAF7EF; border: 1px solid #BEE3C8; }
  .review-item.incorrect { background: #FCEEED; border: 1px solid #F1C0BC; }
  .review-item.ungraded { background: #F4F6F8; border: 1px solid #DDE4E9; }
  .review-item .tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
  .review-item.correct .tag { color: var(--good); }
  .review-item.incorrect .tag { color: var(--bad); }
  .review-item.ungraded .tag { color: var(--muted); }
  .review-item .qt { font-weight: 600; margin: 6px 0; }
  .review-item .ans { font-size: 13.5px; color: var(--text); margin: 2px 0; }
  .review-item .model { font-size: 13.5px; color: var(--muted); margin-top: 4px; }
  footer { text-align: center; color: var(--muted); font-size: 12.5px; padding: 24px; }
  footer a { color: var(--muted); }
  .error { color: var(--bad); font-size: 13.5px; margin-top: 10px; }
  .loading { color: var(--muted); padding: 40px; text-align: center; }
  .toolbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px; }
  .stat-cards { display:flex; gap:14px; margin-bottom:20px; flex-wrap:wrap; }
  .stat { background:var(--white); border-radius:10px; padding:14px 20px; box-shadow:0 2px 8px rgba(20,30,60,0.06); border:1px solid #E1E9EE; min-width:140px; }
  .stat .n { font-size:24px; font-weight:800; color:var(--navy); }
  .stat .l { font-size:12px; color:var(--muted); }
  table { width:100%; border-collapse: collapse; background:var(--white); border-radius:10px; overflow:hidden; box-shadow:0 2px 10px rgba(20,30,60,0.06); font-size: 13.5px;}
  th, td { padding:10px 12px; text-align:left; border-bottom:1px solid #EAF0F3; }
  th { background:var(--navy); color:#fff; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; }
  a.dl { color:#fff; background:var(--teal); padding:9px 16px; border-radius:8px; text-decoration:none; font-size:13.5px; font-weight:600; }
</style>
</head>
<body>
<header>
  <div class="brand" onclick="location.hash='#/'">
    <span class="name">Bapiego</span>
    <span class="tag">Learning Hub</span>
  </div>
  <nav>
    <a onclick="location.hash='#/'">Home</a>
    <a onclick="location.hash='#/course/bba251'">BBA 251</a>
  </nav>
</header>
<main id="app"><div class="loading">Loading…</div></main>
<footer>Bapiego Learning Hub — built for Fountainhead Christian University College classes · <a onclick="location.hash='#/admin'" style="cursor:pointer;">Lecturer Login</a></footer>

<script type="module">
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient("${SUPABASE_URL}", "${SUPABASE_ANON_KEY}");
const ADMIN_URL = "${ADMIN_FUNCTION_URL}";
const app = document.getElementById("app");
let activeTimerInterval = null;

const COURSES = [
  { code: "bba251", name: "BBA 251: Business Economics I (Micro)", programme: "HRM / PSCM · Level 200", desc: "Scarcity, markets, consumer & producer theory, costs & revenue, market structures, and national income." }
];

function el(html) { const d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
function esc(s) { return (s ?? "").toString().replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

async function router() {
  if (activeTimerInterval) { clearInterval(activeTimerInterval); activeTimerInterval = null; }
  const hash = location.hash || "#/";
  const parts = hash.replace("#/", "").split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0) return renderHome();
  if (parts[0] === "course") return renderCourse(parts[1]);
  if (parts[0] === "quiz") return renderQuizStart(parts[1]);
  if (parts[0] === "admin") return renderAdminLogin();
  return renderHome();
}

function renderHome() {
  app.innerHTML = \`
    <div class="hero">
      <h1>Welcome to the Bapiego Learning Hub</h1>
      <p>Quick lessons, practice quizzes, and resources for classes taught by Mr. Samuel A. Bapiego.</p>
    </div>
    <div class="section-title">Courses</div>
    <div class="grid" id="course-grid"></div>
  \`;
  const grid = document.getElementById("course-grid");
  COURSES.forEach(c => {
    const card = el(\`<div class="card">
      <div class="kicker">\${esc(c.programme)}</div>
      <h3>\${esc(c.name)}</h3>
      <div class="meta">\${esc(c.desc)}</div>
      <div class="badge">Daily Quizzes Available</div>
    </div>\`);
    card.onclick = () => location.hash = "#/course/" + c.code;
    grid.appendChild(card);
  });
}

async function renderCourse(code) {
  app.innerHTML = \`<div class="loading">Loading quizzes…</div>\`;
  const course = COURSES.find(c => c.code === code);
  const { data: quizzes, error } = await supabase
    .from("quizzes")
    .select("slug, day_number, title, time_limit_minutes")
    .eq("course_code", "BBA251")
    .order("day_number");
  if (error) { app.innerHTML = \`<div class="panel error">Could not load quizzes: \${esc(error.message)}</div>\`; return; }
  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='#/'">← All courses</a>
    <div class="section-title">\${esc(course ? course.name : code.toUpperCase())}</div>
    <div class="grid" id="quiz-grid"></div>
  \`;
  const grid = document.getElementById("quiz-grid");
  quizzes.forEach(q => {
    const card = el(\`<div class="card">
      <div class="kicker">Day \${q.day_number} · \${q.time_limit_minutes} min</div>
      <h3>\${esc(q.title)}</h3>
      <div class="badge">10 Questions</div>
    </div>\`);
    card.onclick = () => location.hash = "#/quiz/" + q.slug;
    grid.appendChild(card);
  });
}

async function renderQuizStart(slug) {
  app.innerHTML = \`<div class="loading">Loading quiz…</div>\`;
  const { data: quiz, error } = await supabase.from("quizzes").select("*").eq("slug", slug).single();
  if (error || !quiz) { app.innerHTML = \`<div class="panel error">Quiz not found.</div>\`; return; }
  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='#/course/bba251'">← Back to quizzes</a>
    <div class="panel">
      <h2>\${esc(quiz.title)}</h2>
      <p style="color:var(--muted); font-size:14px;">Time allowed: \${quiz.time_limit_minutes} minutes · 10 questions</p>
      <label>Full Name *</label>
      <input type="text" id="s-name" placeholder="e.g. Ama Serwaa" />
      <label>Index Number</label>
      <input type="text" id="s-index" placeholder="e.g. UG12345" />
      <label>Programme</label>
      <select id="s-prog">
        <option value="HRM">HRM</option>
        <option value="PSCM">PSCM</option>
        <option value="Other">Other</option>
      </select>
      <div id="start-error"></div>
      <button id="start-btn">Start Quiz</button>
    </div>
  \`;
  document.getElementById("start-btn").onclick = async () => {
    const name = document.getElementById("s-name").value.trim();
    if (!name) { document.getElementById("start-error").innerHTML = '<div class="error">Please enter your name.</div>'; return; }
    const student = {
      name,
      index: document.getElementById("s-index").value.trim(),
      programme: document.getElementById("s-prog").value
    };
    renderQuizTake(quiz, student);
  };
}

async function renderQuizTake(quiz, student) {
  app.innerHTML = \`<div class="loading">Loading questions…</div>\`;
  const { data: questions, error } = await supabase
    .from("questions").select("*").eq("quiz_id", quiz.id).order("position");
  if (error) { app.innerHTML = \`<div class="panel error">Could not load questions.</div>\`; return; }

  const blocks = questions.map(q => {
    let inner = "";
    if (q.question_type === "mcq") {
      inner = q.options.map(o => \`
        <label class="opt"><input type="radio" name="q-\${q.id}" value="\${o.key}" /> (\${o.key}) \${esc(o.text)}</label>
      \`).join("");
    } else if (q.question_type === "tf") {
      inner = \`<div class="tf-row">
        <label class="opt"><input type="radio" name="q-\${q.id}" value="true" /> True</label>
        <label class="opt"><input type="radio" name="q-\${q.id}" value="false" /> False</label>
      </div>\`;
    } else {
      inner = \`<textarea id="q-\${q.id}" placeholder="Type your answer…"></textarea>\`;
    }
    return \`<div class="qblock">
      <div class="qnum">\${q.position}. \${esc(q.question_text)}</div>
      \${inner}
    </div>\`;
  }).join("");

  app.innerHTML = \`
    <div class="panel">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
        <h2 style="margin:0;">\${esc(quiz.title)}</h2>
        <div class="quiz-timer" id="quiz-timer">⏱ --:--</div>
      </div>
      <p style="color:var(--muted); font-size:13.5px;">Answering as <strong>\${esc(student.name)}</strong>\${student.index ? " · " + esc(student.index) : ""} (\${esc(student.programme)})</p>
      \${blocks}
      <div id="submit-error"></div>
      <button id="submit-btn">Submit Quiz</button>
    </div>
  \`;

  let autoSubmitted = false;
  function startTimer() {
    let remaining = Math.max(1, Math.round((quiz.time_limit_minutes || 10) * 60));
    const timerEl = document.getElementById("quiz-timer");
    const render = () => {
      if (!timerEl) return;
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      timerEl.textContent = "⏱ " + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
      timerEl.classList.toggle("low", remaining <= 60);
    };
    render();
    activeTimerInterval = setInterval(() => {
      remaining -= 1;
      render();
      if (remaining <= 0) {
        clearInterval(activeTimerInterval);
        activeTimerInterval = null;
        if (!autoSubmitted) {
          autoSubmitted = true;
          doSubmit(true);
        }
      }
    }, 1000);
  }

  async function doSubmit(timeExpired) {
    if (activeTimerInterval) { clearInterval(activeTimerInterval); activeTimerInterval = null; }
    const btn = document.getElementById("submit-btn");
    btn.disabled = true; btn.textContent = timeExpired ? "Time's up — submitting…" : "Submitting…";
    const answers = {};
    let score = 0, maxScore = 0;
    const review = [];
    questions.forEach(q => {
      let given = null;
      if (q.question_type === "short") {
        given = document.getElementById("q-" + q.id).value.trim();
      } else {
        const sel = document.querySelector(\`input[name="q-\${q.id}"]:checked\`);
        given = sel ? sel.value : null;
      }
      answers[q.id] = given;
      if (q.question_type !== "short") {
        maxScore += 1;
        const isCorrect = given && given === q.correct_answer;
        if (isCorrect) score += 1;
        review.push({ q, given, isCorrect, graded: true });
      } else {
        review.push({ q, given, graded: false });
      }
    });

    const { error } = await supabase.from("submissions").insert({
      quiz_id: quiz.id,
      student_name: student.name,
      student_index: student.index || null,
      programme: student.programme,
      answers,
      score,
      max_score: maxScore
    });

    if (error) {
      document.getElementById("submit-error").innerHTML = \`<div class="error">Could not save your submission: \${esc(error.message)}. Your score is shown below, but please tell your lecturer.</div>\`;
    }
    renderResult(quiz, score, maxScore, review);
  }

  document.getElementById("submit-btn").onclick = () => doSubmit(false);
  startTimer();
}

function renderResult(quiz, score, maxScore, review) {
  const reviewHtml = review.map(r => {
    if (!r.graded) {
      return \`<div class="review-item ungraded">
        <span class="tag">Self-check</span>
        <div class="qt">\${r.q.position}. \${esc(r.q.question_text)}</div>
        <div class="ans">Your answer: \${esc(r.given || "(blank)")}</div>
        <div class="model">Model answer: \${esc(r.q.model_answer || "—")}</div>
      </div>\`;
    }
    const cls = r.isCorrect ? "correct" : "incorrect";
    const optText = (val) => {
      if (r.q.question_type === "mcq" && r.q.options) {
        const found = r.q.options.find(o => o.key === val);
        return found ? \`(\${found.key}) \${found.text}\` : val;
      }
      return val;
    };
    return \`<div class="review-item \${cls}">
      <span class="tag">\${r.isCorrect ? "Correct" : "Incorrect"}</span>
      <div class="qt">\${r.q.position}. \${esc(r.q.question_text)}</div>
      <div class="ans">Your answer: \${esc(optText(r.given) || "(no answer)")}</div>
      \${!r.isCorrect ? \`<div class="ans">Correct answer: \${esc(optText(r.q.correct_answer))}</div>\` : ""}
      \${r.q.model_answer ? \`<div class="model">\${esc(r.q.model_answer)}</div>\` : ""}
    </div>\`;
  }).join("");

  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='#/course/bba251'">← Back to quizzes</a>
    <div class="panel">
      <div class="result-score">
        <div class="big">\${score} / \${maxScore}</div>
        <div class="label">Auto-graded score (multiple-choice & true/false questions)</div>
      </div>
      <div class="section-title">Question Review</div>
      \${reviewHtml}
    </div>
  \`;
}

function renderAdminLogin() {
  app.innerHTML = \`
    <div class="panel" style="max-width:420px;margin:20px auto;">
      <h2>Lecturer Login</h2>
      <label>Admin Password</label>
      <input type="password" id="admin-pw" />
      <div id="admin-error"></div>
      <button id="admin-login-btn">View Results</button>
    </div>
  \`;
  document.getElementById("admin-login-btn").onclick = async () => {
    const btn = document.getElementById("admin-login-btn");
    const pw = document.getElementById("admin-pw").value;
    btn.disabled = true; btn.textContent = "Checking…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("admin-error").innerHTML = \`<div class="error">\${esc(data.error || "Login failed")}</div>\`;
        btn.disabled = false; btn.textContent = "View Results";
        return;
      }
      renderAdminDashboard(data.submissions || []);
    } catch (e) {
      document.getElementById("admin-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "View Results";
    }
  };
}

function toCsv(rows) {
  const header = ["Student Name", "Index No", "Programme", "Quiz", "Day", "Score", "Max Score", "Submitted At"];
  const lines = [header.join(",")];
  rows.forEach(r => {
    const line = [
      r.student_name, r.student_index || "", r.programme || "",
      r.quizzes?.title || "", r.quizzes?.day_number ?? "",
      r.score, r.max_score, r.submitted_at
    ].map(v => \`"\${String(v ?? "").replace(/"/g, '""')}"\`).join(",");
    lines.push(line);
  });
  return lines.join("\\n");
}

function renderAdminDashboard(rows) {
  const totalSubs = rows.length;
  const uniqueStudents = new Set(rows.map(r => r.student_name + "|" + (r.student_index || ""))).size;
  const avgPct = rows.length
    ? Math.round((rows.reduce((a, r) => a + (r.max_score ? r.score / r.max_score : 0), 0) / rows.length) * 100)
    : 0;

  const shortCount = rows.reduce((a, r) => a + (r.details ? r.details.filter(d => d.question_type === "short").length : 0), 0);

  const tableRows = rows.map((r, idx) => \`
    <tr>
      <td>\${esc(r.student_name)}</td>
      <td>\${esc(r.student_index)}</td>
      <td>\${esc(r.programme)}</td>
      <td>\${esc(r.quizzes?.title || "—")}</td>
      <td>\${r.score} / \${r.max_score}</td>
      <td>\${esc(new Date(r.submitted_at).toLocaleString())}</td>
      <td><button class="detail-toggle" data-idx="\${idx}">View Answers</button></td>
    </tr>
    <tr class="detail-row" id="detail-row-\${idx}" style="display:none;"><td colspan="7">\${renderSubmissionDetails(r)}</td></tr>
  \`).join("");

  app.innerHTML = \`
    <div class="toolbar">
      <h2 style="margin:0;color:var(--navy);font-family:Georgia,serif;">Student Results — BBA 251</h2>
      <button id="csv-btn" style="margin:0;">⬇ Download CSV</button>
    </div>
    <div class="stat-cards">
      <div class="stat"><div class="n">\${totalSubs}</div><div class="l">Total Submissions</div></div>
      <div class="stat"><div class="n">\${uniqueStudents}</div><div class="l">Unique Students</div></div>
      <div class="stat"><div class="n">\${avgPct}%</div><div class="l">Average Score</div></div>
      <div class="stat"><div class="n">\${shortCount}</div><div class="l">Short Answers to Review</div></div>
    </div>
    <table>
      <thead><tr><th>Student</th><th>Index No.</th><th>Programme</th><th>Quiz</th><th>Score</th><th>Submitted</th><th>Answers</th></tr></thead>
      <tbody>\${tableRows || '<tr><td colspan="7" style="text-align:center;color:var(--muted);">No submissions yet.</td></tr>'}</tbody>
    </table>
  \`;
  document.querySelectorAll(".detail-toggle").forEach(btn => {
    btn.onclick = () => {
      const idx = btn.dataset.idx;
      const row = document.getElementById("detail-row-" + idx);
      const showing = row.style.display !== "none";
      row.style.display = showing ? "none" : "table-row";
      btn.textContent = showing ? "View Answers" : "Hide Answers";
    };
  });
  document.getElementById("csv-btn").onclick = () => {
    const blob = new Blob([toCsv(rows)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "bba251_results.csv"; a.click();
    URL.revokeObjectURL(url);
  };
}

function renderSubmissionDetails(r) {
  const details = r.details;
  if (!details || !details.length) {
    return \`<div style="padding:10px 4px;color:var(--muted);font-size:13px;">No question detail available for this submission.</div>\`;
  }
  return details.map(d => {
    if (d.question_type === "short") {
      return \`<div class="detail-q">
        <span class="dreview">Needs manual review</span>
        <div class="dqt">\${d.position}. \${esc(d.question_text)}</div>
        <div class="dgiven"><strong>Student answer:</strong> \${esc(d.given || "(blank)")}</div>
        <div class="dmodel"><strong>Model answer:</strong> \${esc(d.model_answer || "—")}</div>
      </div>\`;
    }
    const optText = (val) => {
      if (d.question_type === "mcq" && d.options) {
        const found = d.options.find(o => o.key === val);
        return found ? \`(\${found.key}) \${found.text}\` : (val ?? "(no answer)");
      }
      return val ?? "(no answer)";
    };
    return \`<div class="detail-q">
      <span class="\${d.is_correct ? "dcorrect" : "dincorrect"}">\${d.is_correct ? "✓ Correct" : "✗ Incorrect"}</span>
      <div class="dqt">\${d.position}. \${esc(d.question_text)}</div>
      <div class="dgiven">Student answer: \${esc(optText(d.given))}</div>
      \${!d.is_correct ? \`<div class="dincorrect" style="text-transform:none;font-weight:400;">Correct answer: \${esc(optText(d.correct_answer))}</div>\` : ""}
    </div>\`;
  }).join("");
}

window.addEventListener("hashchange", router);
router();
</script>
</body>
</html>`;

export default {
  async fetch(request) {
    return new Response(HTML, {
      headers: { "content-type": "text/html; charset=UTF-8" }
    });
  }
};
