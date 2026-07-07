const SUPABASE_URL = "https://qaqypbplpubkmwtekeva.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhcXlwYnBscHVia213dGVrZXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzNTI3MjMsImV4cCI6MjA5ODkyODcyM30.iDg1fpBi3_O8d_n8jP8cf_ZwgHyBNe6GkWZzLj7PvMA";
const ADMIN_FUNCTION_URL = "https://qaqypbplpubkmwtekeva.supabase.co/functions/v1/admin";
const STUDENT_FUNCTION_URL = "https://qaqypbplpubkmwtekeva.supabase.co/functions/v1/student";

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
  input[type=text], input[type=password], input[type=number], select, textarea {
    width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #CBD8E0; font-size: 14px; font-family: inherit; background: #FBFDFE;
  }
  .inline-score-input { width: 72px !important; display: inline-block; padding: 6px 8px !important; margin-right: 6px; }
  .save-score-btn { margin: 0; padding: 7px 12px; font-size: 12.5px; }
  .grade-input { width: 90px !important; display: inline-block; padding: 6px 8px !important; margin-right: 8px; }
  .grade-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
  .dgraded { font-size: 11px; font-weight: 700; color: var(--good); text-transform: uppercase; letter-spacing: 0.5px; }
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
  .badge.locked { background:#FCEEED; color: var(--bad); }
  .card.locked-card { opacity: 0.7; }
  .card.locked-card:hover { transform: none; box-shadow: 0 2px 10px rgba(20,30,60,0.08); }
  .qstatus { display:inline-block; font-size:11px; font-weight:700; padding:3px 9px; border-radius:20px; text-transform:uppercase; letter-spacing:0.5px; }
  .qstatus.open { background:#EAF7EF; color: var(--good); }
  .qstatus.locked { background:#FCEEED; color: var(--bad); }
  .quiz-toggle-btn { margin:0; padding:7px 14px; font-size:12.5px; }
  .quiz-toggle-btn.to-open { background: var(--good); }
  .quiz-toggle-btn.to-open:hover { background: #175c35; }
  .manage-section { margin-bottom: 28px; }
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
    <a onclick="location.hash='#/profile'">Student Portal</a>
  </nav>
</header>
<main id="app"><div class="loading">Loading…</div></main>
<footer>Bapiego Learning Hub — built for Fountainhead Christian University College classes · <a onclick="location.hash='#/admin'" style="cursor:pointer;">Lecturer Login</a></footer>

<script type="module">
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient("${SUPABASE_URL}", "${SUPABASE_ANON_KEY}");
const ADMIN_URL = "${ADMIN_FUNCTION_URL}";
const STUDENT_URL = "${STUDENT_FUNCTION_URL}";
const app = document.getElementById("app");
let activeTimerInterval = null;
let ADMIN_PW = null;
let STUDENT_SESSION = null;

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
  if (parts[0] === "profile") return renderStudentLogin();
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
    .select("slug, day_number, title, time_limit_minutes, is_open")
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
    const card = el(\`<div class="card\${q.is_open ? "" : " locked-card"}">
      <div class="kicker">Day \${q.day_number} · \${q.time_limit_minutes} min</div>
      <h3>\${esc(q.title)}</h3>
      \${q.is_open ? '<div class="badge">10 Questions</div>' : '<div class="badge locked">🔒 Locked</div>'}
    </div>\`);
    card.onclick = () => location.hash = "#/quiz/" + q.slug;
    grid.appendChild(card);
  });
}

async function renderQuizStart(slug) {
  app.innerHTML = \`<div class="loading">Loading quiz…</div>\`;
  const { data: quiz, error } = await supabase.from("quizzes").select("*").eq("slug", slug).single();
  if (error || !quiz) { app.innerHTML = \`<div class="panel error">Quiz not found.</div>\`; return; }
  if (!quiz.is_open) {
    app.innerHTML = \`
      <a class="backlink" onclick="location.hash='#/course/bba251'">← Back to quizzes</a>
      <div class="panel">
        <h2>\${esc(quiz.title)}</h2>
        <p style="color:var(--muted); font-size:14px;">🔒 This quiz isn't open yet. Your lecturer will enable it closer to when it's due — please check back later.</p>
      </div>
    \`;
    return;
  }
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

function renderStudentLogin() {
  app.innerHTML = \`
    <div class="panel" style="max-width:420px;margin:20px auto;">
      <h2>Student Portal</h2>
      <p style="color:var(--muted); font-size:13.5px;">Enter your official index number and the PIN given to you by your lecturer.</p>
      <label>Index Number</label>
      <input type="text" id="stu-index" placeholder="e.g. UG12345" />
      <label>PIN</label>
      <input type="password" id="stu-pin" placeholder="4-digit PIN" />
      <div id="stu-error"></div>
      <button id="stu-login-btn">View My Progress</button>
    </div>
  \`;
  document.getElementById("stu-login-btn").onclick = async () => {
    const btn = document.getElementById("stu-login-btn");
    const indexNumber = document.getElementById("stu-index").value.trim();
    const pin = document.getElementById("stu-pin").value.trim();
    if (!indexNumber || !pin) {
      document.getElementById("stu-error").innerHTML = '<div class="error">Please enter both your index number and PIN.</div>';
      return;
    }
    btn.disabled = true; btn.textContent = "Checking…";
    try {
      const res = await fetch(STUDENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index_number: indexNumber, pin })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("stu-error").innerHTML = \`<div class="error">\${esc(data.error || "Login failed")}</div>\`;
        btn.disabled = false; btn.textContent = "View My Progress";
        return;
      }
      STUDENT_SESSION = data;
      renderStudentProfile(data);
    } catch (e) {
      document.getElementById("stu-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "View My Progress";
    }
  };
}

function renderStudentProfile(data) {
  const student = data.student || {};
  const quizzes = data.quizzes || [];
  const submissions = data.submissions || [];

  const rows = quizzes.map(q => {
    const sub = submissions.find(s => s.quiz_id === q.id);
    let statusHtml, scoreHtml;
    if (sub) {
      statusHtml = '<span class="qstatus open">Taken</span>';
      const effScore = sub.effective_score ?? sub.score;
      const effMax = sub.effective_max ?? sub.max_score;
      scoreHtml = \`\${effScore} / \${effMax}\`;
    } else if (q.is_open) {
      statusHtml = '<span class="qstatus to-open" style="background:#FFF6E5;color:var(--amber);">Not Yet Taken</span>';
      scoreHtml = "—";
    } else {
      statusHtml = '<span class="qstatus locked">Locked</span>';
      scoreHtml = "—";
    }
    return \`<tr>
      <td>Day \${q.day_number}</td>
      <td>\${esc(q.title)}</td>
      <td>\${statusHtml}</td>
      <td>\${scoreHtml}</td>
    </tr>\`;
  }).join("");

  const takenSubs = submissions.filter(s => quizzes.some(q => q.id === s.quiz_id));
  const quizAvgPct = takenSubs.length
    ? Math.round((takenSubs.reduce((a, s) => {
        const effScore = s.effective_score ?? s.score;
        const effMax = s.effective_max ?? s.max_score;
        return a + (effMax ? effScore / effMax : 0);
      }, 0) / takenSubs.length) * 100)
    : null;

  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='#/'">← Back home</a>
    <div class="panel">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
        <div>
          <h2 style="margin:0 0 4px;">\${esc(student.full_name || "")}</h2>
          <p style="color:var(--muted); font-size:13.5px; margin:0;">\${esc(student.index_number || "")} · \${esc(student.course_code || "")}</p>
        </div>
        \${student.is_ic ? '<span class="qstatus locked">IC — Incomplete</span>' : ""}
      </div>
      <div class="stat-cards" style="margin-top:20px;">
        <div class="stat"><div class="n">\${takenSubs.length} / \${quizzes.length}</div><div class="l">Quizzes Taken</div></div>
        <div class="stat"><div class="n">\${quizAvgPct === null ? "—" : quizAvgPct + "%"}</div><div class="l">Quiz Average</div></div>
      </div>
      <div class="section-title" style="margin-top:24px;">Daily Performance</div>
      <table>
        <thead><tr><th>Day</th><th>Quiz</th><th>Status</th><th>Score</th></tr></thead>
        <tbody>\${rows || '<tr><td colspan="4" style="text-align:center;color:var(--muted);">No quizzes found.</td></tr>'}</tbody>
      </table>
      <p style="color:var(--muted); font-size:12.5px; margin-top:18px;">Forecast grade and official assessment breakdown (Assignment / Quiz / Mid-Sem / Final) will appear here in a future update.</p>
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
      ADMIN_PW = pw;
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
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

function renderAdminDashboard(rows, quizzes, students) {
  quizzes = quizzes || [];
  students = students || [];
  const totalSubs = rows.length;
  const uniqueStudents = new Set(rows.map(r => r.student_name + "|" + (r.student_index || ""))).size;
  const avgPct = rows.length
    ? Math.round((rows.reduce((a, r) => {
        const effScore = r.effective_score ?? r.score;
        const effMax = r.effective_max ?? r.max_score;
        return a + (effMax ? effScore / effMax : 0);
      }, 0) / rows.length) * 100)
    : 0;

  const shortCount = rows.reduce((a, r) => a + (r.details ? r.details.filter(d => d.question_type === "short" && d.needs_manual_review).length : 0), 0);

  const tableRows = rows.map((r, idx) => \`
    <tr>
      <td>\${esc(r.student_name)}</td>
      <td>\${esc(r.student_index)}</td>
      <td>\${esc(r.programme)}</td>
      <td>\${esc(r.quizzes?.title || "—")}</td>
      <td>\${r.effective_score ?? r.score} / \${r.effective_max ?? r.max_score}</td>
      <td>\${esc(new Date(r.submitted_at).toLocaleString())}</td>
      <td><button class="detail-toggle" data-idx="\${idx}">View Answers</button></td>
    </tr>
    <tr class="detail-row" id="detail-row-\${idx}" style="display:none;"><td colspan="7">\${renderSubmissionDetails(r)}</td></tr>
  \`).join("");

  const quizRows = quizzes.map(q => \`
    <tr>
      <td>Day \${q.day_number}</td>
      <td>\${esc(q.title)}</td>
      <td><span class="qstatus \${q.is_open ? "open" : "locked"}">\${q.is_open ? "Open" : "Locked"}</span></td>
      <td><button class="quiz-toggle-btn \${q.is_open ? "" : "to-open"}" data-quiz-id="\${q.id}" data-is-open="\${q.is_open}">\${q.is_open ? "Lock" : "Open"}</button></td>
    </tr>
  \`).join("");

  const studentRows = students.map(s => \`
    <tr>
      <td>\${esc(s.index_number)}</td>
      <td>\${esc(s.full_name)}</td>
      <td><span class="qstatus \${s.is_ic ? "locked" : "open"}">\${s.is_ic ? "IC" : "Active"}</span></td>
      <td>
        <input type="number" class="inline-score-input exercise-score-input" data-student-id="\${s.id}" min="0" max="100" step="1" value="\${s.exercise_score ?? ""}" placeholder="0-100" />
        <button class="save-score-btn save-exercise-btn" data-student-id="\${s.id}">Save</button>
      </td>
      <td>
        <input type="number" class="inline-score-input final-exam-input" data-student-id="\${s.id}" min="0" max="100" step="1" value="\${s.final_exam_score ?? ""}" placeholder="0-100" />
        <button class="save-score-btn save-final-exam-btn" data-student-id="\${s.id}">Save</button>
      </td>
      <td>
        <button class="regen-pin-btn" data-student-id="\${s.id}" style="margin:0 6px 6px 0;padding:7px 12px;font-size:12.5px;">Regenerate PIN</button>
        <button class="toggle-ic-btn" data-student-id="\${s.id}" data-is-ic="\${s.is_ic}" style="margin:0 0 6px 0;padding:7px 12px;font-size:12.5px;background:\${s.is_ic ? "var(--good)" : "var(--bad)"};">\${s.is_ic ? "Clear IC" : "Mark IC"}</button>
      </td>
    </tr>
  \`).join("");

  app.innerHTML = \`
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Manage Quizzes — BBA 251</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Students can only start a quiz once you've switched it to <strong>Open</strong>. Everyone can still see the quiz titles either way.</p>
      <table>
        <thead><tr><th>Day</th><th>Quiz</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>\${quizRows || '<tr><td colspan="4" style="text-align:center;color:var(--muted);">No quizzes found.</td></tr>'}</tbody>
      </table>
    </div>
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Manage Students — BBA 251</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Add a student to auto-generate their login PIN. They'll log in at the Student Portal using their index number + PIN.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px;">
        <div style="flex:1;min-width:160px;"><label style="margin-top:0;">Full Name</label><input type="text" id="new-student-name" /></div>
        <div style="flex:1;min-width:140px;"><label style="margin-top:0;">Index Number</label><input type="text" id="new-student-index" /></div>
        <button id="add-student-btn" style="margin:0;">Add Student</button>
      </div>
      <div id="add-student-error"></div>
      <p style="color:var(--muted);font-size:12.5px;margin:0 0 10px;">Exercise Score and Final Exam are entered out of 100 and count toward the official grade breakdown.</p>
      <table>
        <thead><tr><th>Index No.</th><th>Name</th><th>Status</th><th>Exercise Score</th><th>Final Exam</th><th>Actions</th></tr></thead>
        <tbody>\${studentRows || '<tr><td colspan="6" style="text-align:center;color:var(--muted);">No students added yet.</td></tr>'}</tbody>
      </table>
    </div>
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
  document.querySelectorAll(".quiz-toggle-btn").forEach(btn => {
    btn.onclick = async () => {
      const quizId = btn.dataset.quizId;
      const newIsOpen = btn.dataset.isOpen !== "true";
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "toggle_quiz", quiz_id: quizId, is_open: newIsOpen })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not update quiz."); btn.disabled = false; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false;
      }
    };
  });
  document.getElementById("add-student-btn").onclick = async () => {
    const btn = document.getElementById("add-student-btn");
    const fullName = document.getElementById("new-student-name").value.trim();
    const indexNumber = document.getElementById("new-student-index").value.trim();
    if (!fullName || !indexNumber) {
      document.getElementById("add-student-error").innerHTML = '<div class="error">Please enter both a name and an index number.</div>';
      return;
    }
    btn.disabled = true; btn.textContent = "Adding…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PW, action: "add_student", full_name: fullName, index_number: indexNumber })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("add-student-error").innerHTML = \`<div class="error">\${esc(data.error || "Could not add student.")}</div>\`;
        btn.disabled = false; btn.textContent = "Add Student";
        return;
      }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      if (data.last_action && data.last_action.pin) {
        alert(\`Student added: \${data.last_action.full_name} (\${data.last_action.index_number})\\nPIN: \${data.last_action.pin}\\n\\nShare this PIN with the student — it will not be shown again.\`);
      }
    } catch (e) {
      document.getElementById("add-student-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "Add Student";
    }
  };
  document.querySelectorAll(".save-exercise-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const input = document.querySelector(\`.exercise-score-input[data-student-id="\${studentId}"]\`);
      const raw = input.value.trim();
      if (raw !== "" && (isNaN(Number(raw)) || Number(raw) < 0 || Number(raw) > 100)) {
        alert("Exercise score must be a number between 0 and 100.");
        return;
      }
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "update_exercise_score", student_id: studentId, exercise_score: raw === "" ? null : Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not save exercise score."); btn.disabled = false; btn.textContent = "Save"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Save";
      }
    };
  });
  document.querySelectorAll(".save-final-exam-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const input = document.querySelector(\`.final-exam-input[data-student-id="\${studentId}"]\`);
      const raw = input.value.trim();
      if (raw !== "" && (isNaN(Number(raw)) || Number(raw) < 0 || Number(raw) > 100)) {
        alert("Final exam score must be a number between 0 and 100.");
        return;
      }
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "update_final_exam_score", student_id: studentId, final_exam_score: raw === "" ? null : Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not save final exam score."); btn.disabled = false; btn.textContent = "Save"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Save";
      }
    };
  });
  document.querySelectorAll(".grade-short-btn").forEach(btn => {
    btn.onclick = async () => {
      const submissionId = btn.dataset.submissionId;
      const questionId = btn.dataset.questionId;
      const input = document.querySelector(\`.grade-input[data-submission-id="\${submissionId}"][data-question-id="\${questionId}"]\`);
      const raw = input.value.trim();
      if (raw === "" || isNaN(Number(raw)) || Number(raw) < 0 || Number(raw) > 1) {
        alert("Score must be a number between 0 and 1 (e.g. 0, 0.5, or 1).");
        return;
      }
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "grade_short_answer", submission_id: submissionId, question_id: questionId, score: Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not save score."); btn.disabled = false; btn.textContent = "Save Score"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Save Score";
      }
    };
  });
  document.querySelectorAll(".regen-pin-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "regenerate_pin", student_id: studentId })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not regenerate PIN."); btn.disabled = false; return; }
        if (data.last_action && data.last_action.pin) {
          alert(\`New PIN: \${data.last_action.pin}\\n\\nShare this PIN with the student — it will not be shown again.\`);
        }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false;
      }
    };
  });
  document.querySelectorAll(".toggle-ic-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const newIsIc = btn.dataset.isIc !== "true";
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "toggle_ic", student_id: studentId, is_ic: newIsIc })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not update student."); btn.disabled = false; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false;
      }
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
      const graded = d.manual_score !== null && d.manual_score !== undefined;
      return \`<div class="detail-q">
        \${graded ? \`<span class="dgraded">Graded: \${d.manual_score} / 1</span>\` : '<span class="dreview">Needs manual review</span>'}
        <div class="dqt">\${d.position}. \${esc(d.question_text)}</div>
        <div class="dgiven"><strong>Student answer:</strong> \${esc(d.given || "(blank)")}</div>
        <div class="dmodel"><strong>Model answer:</strong> \${esc(d.model_answer || "—")}</div>
        <div class="grade-row">
          <input type="number" class="grade-input" data-submission-id="\${r.id}" data-question-id="\${d.question_id}" min="0" max="1" step="0.5" value="\${graded ? d.manual_score : ""}" placeholder="0 – 1" />
          <button class="save-score-btn grade-short-btn" data-submission-id="\${r.id}" data-question-id="\${d.question_id}">\${graded ? "Update Score" : "Save Score"}</button>
        </div>
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
