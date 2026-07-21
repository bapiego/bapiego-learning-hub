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
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='6' r='3' fill='%23C08A2E'/%3E%3Ccircle cx='14' cy='12' r='3.6' fill='%23C08A2E'/%3E%3Ccircle cx='26' cy='12' r='2.6' fill='%23C08A2E'/%3E%3Ccircle cx='10' cy='20' r='3.2' fill='%23C08A2E'/%3E%3Ccircle cx='20' cy='19' r='4.2' fill='%23C08A2E'/%3E%3Ccircle cx='29' cy='21' r='2.4' fill='%23C08A2E'/%3E%3Ccircle cx='15' cy='28' r='3.4' fill='%23C08A2E'/%3E%3Ccircle cx='24' cy='29' r='3' fill='%23C08A2E'/%3E%3Ccircle cx='20' cy='35' r='2.4' fill='%23C08A2E'/%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
  :root {
    --navy: #21295C;
    --blue: #065A82;
    --teal: #1C7293;
    --ice: #F8F4EA;
    --amber: #C08A2E;
    --text: #1B2430;
    --muted: #5B6B79;
    --white: #FFFFFF;
    --good: #1E7A46;
    --bad: #B3261E;
  }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: "Inter", -apple-system, "Segoe UI", Calibri, Arial, sans-serif;
    background: var(--ice); color: var(--text); min-height: 100vh;
  }
  header {
    background: var(--navy); color: var(--white); padding: 18px 24px;
    display: flex; align-items: center; justify-content: space-between;
    box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  }
  .brand { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .brand .mark { display: flex; flex-shrink: 0; }
  .brand .name { font-family: "Fraunces", Georgia, "Cambria", serif; font-weight: 700; font-size: 24px; letter-spacing: 0.5px; }
  .brand .tag { font-size: 12px; color: var(--amber); text-transform: uppercase; letter-spacing: 1.5px; }
  nav a { color: #C7D8E3; text-decoration: none; margin-left: 22px; font-size: 14px; cursor: pointer; }
  nav a:hover { color: var(--white); }
  main { max-width: 900px; margin: 0 auto; padding: 32px 20px 80px; }
  .hero { background: linear-gradient(135deg, var(--navy), var(--blue)); color: var(--white); border-radius: 14px; padding: 36px 32px; margin-bottom: 32px; border-bottom: 3px solid var(--amber); }
  .hero h1 { margin: 0 0 8px; font-family: "Fraunces", Georgia, serif; font-size: 30px; }
  .hero p { margin: 0; color: #C7D8E3; font-size: 15px; }
  .section-title { font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; color: var(--amber); font-weight: 700; margin: 0 0 14px; }
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
  .panel h2 { margin-top: 0; color: var(--navy); font-family: "Fraunces", Georgia, serif; }
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
    background: var(--amber); color: var(--navy); border: none; padding: 12px 22px; border-radius: 8px;
    font-size: 15px; font-weight: 700; cursor: pointer; margin-top: 20px;
  }
  button:hover { background: var(--navy); color: var(--white); }
  button:disabled { background: #D9CFB8; color: #8A8270; cursor: not-allowed; }
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
  .quiz-toggle-btn.to-open { background: var(--good); color: #fff; }
  .quiz-toggle-btn.to-open:hover { background: #175c35; color: #fff; }
  .manage-section { margin-bottom: 28px; }
  .admin-topbar { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:24px; }
  .admin-tabs { display:flex; gap:6px; flex-wrap:wrap; background:var(--white); border:1px solid #E1E9EE; border-radius:12px; padding:5px; box-shadow:0 2px 8px rgba(20,30,60,0.06); }
  .admin-tab { background:transparent; color:var(--muted); border:none; padding:9px 16px; border-radius:8px; font-size:13.5px; font-weight:600; cursor:pointer; margin:0; }
  .admin-tab:hover { background:var(--ice); color:var(--navy); }
  .admin-tab.active { background:var(--navy); color:#fff; }
  .tab-badge { display:inline-block; background:var(--amber); color:#fff; font-size:10.5px; font-weight:800; padding:1px 6px; border-radius:10px; margin-left:6px; }
  .course-heading { display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:6px; }
  .course-heading h1 { margin:0; font-family:"Fraunces",Georgia,serif; font-size:24px; color:var(--navy); }
  .course-heading p { margin:4px 0 0; color:var(--muted); font-size:13.5px; }
  .toggle-panel-btn { background:var(--white); color:var(--navy); border:1.5px solid var(--navy); padding:9px 16px; font-size:13.5px; }
  .toggle-panel-btn:hover { background:var(--navy); color:#fff; }
  .toggle-panel-btn.open { background:var(--navy); color:#fff; }
</style>
</head>
<body>
<header>
  <div class="brand" onclick="location.hash='#/'">
    <svg class="mark" width="28" height="28" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="6" r="3" fill="#C08A2E"/>
      <circle cx="14" cy="12" r="3.6" fill="#C08A2E"/>
      <circle cx="26" cy="12" r="2.6" fill="#C08A2E"/>
      <circle cx="10" cy="20" r="3.2" fill="#C08A2E"/>
      <circle cx="20" cy="19" r="4.2" fill="#C08A2E"/>
      <circle cx="29" cy="21" r="2.4" fill="#C08A2E"/>
      <circle cx="15" cy="28" r="3.4" fill="#C08A2E"/>
      <circle cx="24" cy="29" r="3" fill="#C08A2E"/>
      <circle cx="20" cy="35" r="2.4" fill="#C08A2E"/>
    </svg>
    <span class="name">Bapiego</span>
    <span class="tag">Learning Hub</span>
  </div>
  <nav>
    <a onclick="location.hash='#/'">Home</a>
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
let ADMIN_VIEW = null;
let STUDENT_SESSION = null;
let PENDING_QUIZ_SLUG = null;
let PENDING_COURSE_CODE = null;
let STUDENT_NOTICE = null;
let OPEN_DETAIL_KEYS = new Set();

// Courses used to be hardcoded here. They're now a real "offerings" table in
// Supabase (university courses, private tuition, special groups), fetched
// dynamically so adding a new one is an admin action, not a code deploy.
let COURSES = [];
let CURRENT_COURSE_CODE = "BBA251";

// Normalizes raw offering rows (from either the public anon fetch or an
// admin/student edge function payload) into the shape the rest of this file
// already expects, so every existing COURSES.find/filter/map call keeps
// working unchanged regardless of where the data came from.
function mapOfferingsToCourses(offerings) {
  return (offerings || []).map(o => ({
    id: o.id,
    code: (o.code || "").toLowerCase(),
    name: o.name,
    programme: o.programme || "",
    desc: o.description || "",
    type: o.type || "university_course",
    institution: o.institution || "",
    is_active: o.is_active !== false,
  }));
}

// Public homepage / course browsing happens before any login, so it fetches
// active university courses directly with the anon key (same pattern already
// used for reading quizzes). Only runs once per page load.
async function ensureCoursesLoaded() {
  if (COURSES.length) return;
  try {
    const { data, error } = await supabase
      .from("offerings")
      .select("id, code, name, type, institution, programme, description, is_active")
      .eq("is_active", true)
      .eq("type", "university_course")
      .order("institution", { ascending: true })
      .order("code", { ascending: true });
    if (!error && data) COURSES = mapOfferingsToCourses(data);
  } catch {
    // Public browsing degrading to an empty course list is better than a crash.
  }
}

function el(html) { const d = document.createElement("div"); d.innerHTML = html; return d.firstElementChild; }
function esc(s) { return (s ?? "").toString().replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

// Briefly flashes a soft green background on one or more inputs to confirm
// an autosave went through, without needing a "Saved" button or full re-render.
function flashSaved(inputEls) {
  inputEls.forEach(input => {
    if (!input) return;
    input.style.transition = "background-color 0.25s";
    input.style.backgroundColor = "#E4F7EC";
    setTimeout(() => { input.style.backgroundColor = ""; }, 900);
  });
}

// When a student has multiple submissions for the same quiz (e.g. after a
// reopened retake), the higher-scoring attempt counts toward their grade.
function bestSubmissionForQuiz(quizId, submissions) {
  const matches = (submissions || []).filter(s => s.quiz_id === quizId);
  if (!matches.length) return null;
  const ratio = (s) => {
    const max = s.effective_max ?? s.max_score;
    return max ? (s.effective_score ?? s.score) / max : 0;
  };
  return matches.reduce((best, cur) => (ratio(cur) > ratio(best) ? cur : best));
}

async function router() {
  if (activeTimerInterval) { clearInterval(activeTimerInterval); activeTimerInterval = null; }
  await ensureCoursesLoaded();
  const hash = location.hash || "#/";
  const parts = hash.replace("#/", "").split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0) return renderHome();
  if (parts[0] === "course") return renderCourse(parts[1]);
  if (parts[0] === "quiz") return renderQuizStart(parts[1]);
  if (parts[0] === "admin") return renderAdminLogin();
  if (parts[0] === "profile") {
    if (STUDENT_SESSION) return renderStudentProfile(STUDENT_SESSION);
    return renderStudentLogin();
  }
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
  CURRENT_COURSE_CODE = (code || "bba251").toUpperCase();
  const { data: quizzes, error } = await supabase
    .from("quizzes")
    .select("slug, day_number, title, time_limit_minutes, is_open")
    .eq("course_code", CURRENT_COURSE_CODE)
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
  CURRENT_COURSE_CODE = quiz.course_code || CURRENT_COURSE_CODE;
  const courseBackHash = "#/course/" + CURRENT_COURSE_CODE.toLowerCase();

  if (!quiz.is_open && !STUDENT_SESSION) {
    app.innerHTML = \`
      <a class="backlink" onclick="location.hash='\${courseBackHash}'">← Back to quizzes</a>
      <div class="panel">
        <h2>\${esc(quiz.title)}</h2>
        <p style="color:var(--muted); font-size:14px;">🔒 This quiz isn't open yet. Your lecturer will enable it closer to when it's due — please check back later.</p>
      </div>
    \`;
    return;
  }

  if (!STUDENT_SESSION) {
    PENDING_QUIZ_SLUG = slug;
    PENDING_COURSE_CODE = CURRENT_COURSE_CODE;
    location.hash = "#/profile";
    return;
  }

  const grant = (STUDENT_SESSION.grants || []).find(g => g.quiz_id === quiz.id);
  if (!quiz.is_open && !grant) {
    app.innerHTML = \`
      <a class="backlink" onclick="location.hash='\${courseBackHash}'">← Back to quizzes</a>
      <div class="panel">
        <h2>\${esc(quiz.title)}</h2>
        <p style="color:var(--muted); font-size:14px;">🔒 This quiz isn't open yet. Your lecturer will enable it closer to when it's due — please check back later.</p>
      </div>
    \`;
    return;
  }

  const loggedInStudent = STUDENT_SESSION.student;
  const alreadyTaken = (STUDENT_SESSION.submissions || []).some(s => s.quiz_id === quiz.id);
  const grantNote = grant
    ? \`<p style="color:var(--amber); font-size:13.5px; font-weight:600;">🔓 Reopened just for you — available until \${esc(new Date(grant.expires_at).toLocaleString())}.</p>\`
    : "";
  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='#/profile'">← Back to my progress</a>
    <div class="panel">
      <h2>\${esc(quiz.title)}</h2>
      <p style="color:var(--muted); font-size:14px;">Time allowed: \${quiz.time_limit_minutes} minutes · 10 questions</p>
      <p style="color:var(--muted); font-size:13.5px;">Starting as <strong>\${esc(loggedInStudent.full_name)}</strong> (\${esc(loggedInStudent.index_number)})</p>
      \${grantNote}
      <div id="start-error"></div>
      <button id="start-btn">\${alreadyTaken ? "Retake Quiz" : "Start Quiz"}</button>
    </div>
  \`;
  document.getElementById("start-btn").onclick = () => {
    const student = {
      name: loggedInStudent.full_name,
      index: loggedInStudent.index_number,
      programme: null
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
      <p style="color:var(--muted); font-size:13.5px;">Answering as <strong>\${esc(student.name)}</strong>\${student.index ? " · " + esc(student.index) : ""}\${student.programme ? " (" + esc(student.programme) + ")" : ""}</p>
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
    } else if (STUDENT_SESSION) {
      STUDENT_SESSION.submissions = STUDENT_SESSION.submissions || [];
      STUDENT_SESSION.submissions.push({
        quiz_id: quiz.id,
        score,
        max_score: maxScore,
        effective_score: score,
        effective_max: questions.length
      });
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

  const backHash = STUDENT_SESSION ? "#/profile" : "#/course/" + CURRENT_COURSE_CODE.toLowerCase();
  const backLabel = STUDENT_SESSION ? "← Back to my progress" : "← Back to quizzes";

  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='\${backHash}'">\${backLabel}</a>
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
      <p style="color:var(--muted); font-size:13.5px;">Enter your official index number and the PIN given to you by your lecturer. One login covers every course you're enrolled in.</p>
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
      PENDING_COURSE_CODE = null;
      if (PENDING_QUIZ_SLUG) {
        const slug = PENDING_QUIZ_SLUG;
        PENDING_QUIZ_SLUG = null;
        const stillAvailable = (data.quizzes || []).some(q => q.slug === slug);
        if (stillAvailable) {
          location.hash = "#/quiz/" + slug;
          return;
        }
        STUDENT_NOTICE = "You're not yet enrolled in that course, so that quiz isn't available. Contact your lecturer to be added.";
      }
      renderStudentProfile(data);
    } catch (e) {
      document.getElementById("stu-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "View My Progress";
    }
  };
}

function gradeLetter(total) {
  if (total < 40) return "F";
  if (total < 50) return "D";
  if (total < 60) return "C";
  if (total < 70) return "B";
  return "A";
}

function computeAssessment(student, quizzes, submissions, forecast) {
  const total = quizzes.length;
  let quizSum = 0;
  quizzes.forEach(q => {
    const sub = bestSubmissionForQuiz(q.id, submissions);
    if (sub) {
      const effScore = sub.effective_score ?? sub.score;
      const effMax = sub.effective_max ?? sub.max_score;
      quizSum += effMax ? effScore / effMax : 0;
    } else {
      quizSum += forecast ? 1 : 0;
    }
  });
  const quizAvgPct = total ? (quizSum / total) * 100 : 0;

  const exercisePct = student.exercise_score != null ? student.exercise_score : (forecast ? 100 : 0);
  const finalPct = student.final_exam_score != null ? student.final_exam_score : (forecast ? 100 : 0);

  const assignment = (exercisePct / 100) * 10;
  const quiz = (quizAvgPct / 100) * 5;
  const midsem = (quizAvgPct / 100) * 15;
  const finalScore = (finalPct / 100) * 70;
  const subtotal = assignment + quiz + midsem;
  const totalScore = subtotal + finalScore;
  return {
    quizAvgPct, assignment, quiz, midsem, subtotal, final: finalScore, total: totalScore,
    grade: student.is_ic ? "IC" : gradeLetter(totalScore)
  };
}

function renderAssessmentTable(label, note, a) {
  return \`
    <div class="section-title" style="margin-top:24px;">\${label}</div>
    \${note ? \`<p style="color:var(--muted); font-size:12.5px; margin:0 0 10px;">\${note}</p>\` : ""}
    <table>
      <thead><tr><th>Component</th><th>Weight</th><th>Score</th></tr></thead>
      <tbody>
        <tr><td>Assignment</td><td>10%</td><td>\${a.assignment.toFixed(1)}</td></tr>
        <tr><td>Quiz</td><td>5%</td><td>\${a.quiz.toFixed(1)}</td></tr>
        <tr><td>Mid-Sem</td><td>15%</td><td>\${a.midsem.toFixed(1)}</td></tr>
        <tr><td><strong>Subtotal</strong></td><td>30%</td><td><strong>\${a.subtotal.toFixed(1)}</strong></td></tr>
        <tr><td>Final Exam</td><td>70%</td><td>\${a.final.toFixed(1)}</td></tr>
        <tr><td><strong>Total</strong></td><td>100%</td><td><strong>\${a.total.toFixed(1)}</strong></td></tr>
        <tr><td colspan="2"><strong>Grade</strong></td><td><strong>\${a.grade}</strong></td></tr>
      </tbody>
    </table>
  \`;
}

function renderStudentProfile(data) {
  if (data.offerings) COURSES = mapOfferingsToCourses(data.offerings);
  const student = data.student || {};
  const allQuizzes = data.quizzes || [];
  const submissions = data.submissions || [];
  const grants = data.grants || [];
  const allEnrollments = student.enrollments || [];
  const enrollments = allEnrollments.filter(e => e.status === "active");
  const pendingEnrollments = allEnrollments.filter(e => e.status === "pending");
  const spokenForCodes = allEnrollments
    .filter(e => e.status === "active" || e.status === "pending")
    .map(e => e.course_code);
  // Only university courses are self-service — private tuition and special
  // groups are set up individually by the lecturer, not requested by browsing.
  const availableCourses = COURSES.filter(c => c.type === "university_course" && !spokenForCodes.includes(c.code.toUpperCase()));

  const notice = STUDENT_NOTICE;
  STUDENT_NOTICE = null;

  const otherCoursesHtml = (pendingEnrollments.length || availableCourses.length) ? \`
    <div class="panel" style="margin-top:20px;">
      <h2 style="margin:0 0 4px;">Other Courses</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Taking something else with Mr. Bapiego? Request to join below — your lecturer will approve it from their end.</p>
      \${pendingEnrollments.map(e => {
        const course = COURSES.find(c => c.code.toUpperCase() === e.course_code);
        return \`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #EAF0F3;">
          <div><strong>\${esc(course ? course.name : e.course_code)}</strong></div>
          <span class="qstatus to-open" style="background:#FFF6E5;color:var(--amber);">Awaiting Approval</span>
        </div>\`;
      }).join("")}
      \${availableCourses.map(c => \`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #EAF0F3;">
          <div><strong>\${esc(c.name)}</strong><div style="color:var(--muted);font-size:12.5px;">\${esc(c.programme)}</div></div>
          <button class="request-course-btn" data-course="\${c.code.toUpperCase()}" style="margin:0;padding:7px 14px;font-size:12.5px;">Request to Join</button>
        </div>
      \`).join("")}
    </div>
  \` : "";

  if (!enrollments.length) {
    app.innerHTML = \`
      <a class="backlink" onclick="location.hash='#/'">← Back home</a>
      \${notice ? \`<div class="panel error" style="margin-bottom:16px;">\${esc(notice)}</div>\` : ""}
      <div class="panel">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
          <div>
            <h2 style="margin:0 0 4px;">\${esc(student.full_name || "")}</h2>
            <p style="color:var(--muted); font-size:13.5px; margin:0;">\${esc(student.index_number || "")}</p>
          </div>
          <button id="logout-btn" class="detail-toggle">Log Out</button>
        </div>
        <p style="margin-top:20px;color:var(--muted);font-size:14px;">You're not currently enrolled in any course yet. Request to join one below, or contact your lecturer.</p>
      </div>
      \${otherCoursesHtml}
    \`;
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) logoutBtn.onclick = () => { STUDENT_SESSION = null; location.hash = "#/"; };
    document.querySelectorAll(".request-course-btn").forEach(btn => {
      btn.onclick = async () => {
        const courseCode = btn.dataset.course;
        btn.disabled = true; btn.textContent = "Requesting…";
        try {
          const res = await fetch(STUDENT_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "request_enrollment", student_id: student.id, course_code: courseCode })
          });
          const respData = await res.json();
          if (!res.ok) { alert(respData.error || "Could not send request."); btn.disabled = false; btn.textContent = "Request to Join"; return; }
          STUDENT_SESSION = respData;
          renderStudentProfile(respData);
        } catch (e) {
          alert("Network error: " + e.message);
          btn.disabled = false; btn.textContent = "Request to Join";
        }
      };
    });
    return;
  }

  const courseBlocks = enrollments.map(enr => {
    const quizzes = allQuizzes.filter(q => q.course_code === enr.course_code);
    const course = COURSES.find(c => c.code.toUpperCase() === enr.course_code);
    const courseName = course ? course.name : enr.course_code;

    const rows = quizzes.map(q => {
      const sub = bestSubmissionForQuiz(q.id, submissions);
      const grant = grants.find(g => g.quiz_id === q.id);
      let statusHtml, scoreHtml, actionHtml;
      if (sub) {
        statusHtml = '<span class="qstatus open">Taken</span>';
        const effScore = sub.effective_score ?? sub.score;
        const effMax = sub.effective_max ?? sub.max_score;
        scoreHtml = \`\${effScore} / \${effMax}\`;
        actionHtml = grant
          ? \`<button class="take-quiz-btn" data-slug="\${q.slug}" style="margin:0;padding:6px 14px;font-size:12.5px;background:var(--amber);">Retake (reopened)</button>\`
          : "—";
      } else if (q.is_open || grant) {
        statusHtml = grant && !q.is_open
          ? '<span class="qstatus" style="background:#FFF6E5;color:var(--amber);">Reopened For You</span>'
          : '<span class="qstatus to-open" style="background:#FFF6E5;color:var(--amber);">Not Yet Taken</span>';
        scoreHtml = "—";
        actionHtml = \`<button class="take-quiz-btn" data-slug="\${q.slug}" style="margin:0;padding:6px 14px;font-size:12.5px;">Take Quiz</button>\`;
      } else {
        statusHtml = '<span class="qstatus locked">Locked</span>';
        scoreHtml = "—";
        actionHtml = "—";
      }
      return \`<tr>
        <td>Day \${q.day_number}</td>
        <td>\${esc(q.title)}</td>
        <td>\${statusHtml}</td>
        <td>\${scoreHtml}</td>
        <td>\${actionHtml}</td>
      </tr>\`;
    }).join("");

    const takenSubs = quizzes.map(q => bestSubmissionForQuiz(q.id, submissions)).filter(Boolean);
    const quizAvgPct = takenSubs.length
      ? Math.round((takenSubs.reduce((a, s) => {
          const effScore = s.effective_score ?? s.score;
          const effMax = s.effective_max ?? s.max_score;
          return a + (effMax ? effScore / effMax : 0);
        }, 0) / takenSubs.length) * 100)
      : null;

    const enrolledStudent = { exercise_score: enr.exercise_score, final_exam_score: enr.final_exam_score, is_ic: enr.is_ic };
    const officialA = computeAssessment(enrolledStudent, quizzes, submissions, false);
    const forecastA = computeAssessment(enrolledStudent, quizzes, submissions, true);

    return \`
      <div class="panel" style="margin-top:20px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
          <h2 style="margin:0;">\${esc(courseName)}</h2>
          \${enr.is_ic ? '<span class="qstatus locked">IC — Incomplete</span>' : ""}
          \${enr.amount_owed != null ? (Number(enr.amount_paid || 0) >= Number(enr.amount_owed)
            ? '<span class="qstatus open">Fees Paid in Full</span>'
            : \`<span class="qstatus" style="background:#FFF6E5;color:var(--amber);">Balance Due: GH₵\${(Number(enr.amount_owed) - Number(enr.amount_paid || 0)).toFixed(2)}</span>\`) : ""}
        </div>
        <div class="stat-cards" style="margin-top:16px;">
          <div class="stat"><div class="n">\${takenSubs.length} / \${quizzes.length}</div><div class="l">Quizzes Taken</div></div>
          <div class="stat"><div class="n">\${quizAvgPct === null ? "—" : quizAvgPct + "%"}</div><div class="l">Quiz Average</div></div>
          <div class="stat"><div class="n">\${officialA.grade}</div><div class="l">Current Grade</div></div>
        </div>
        <div class="section-title" style="margin-top:24px;">Daily Performance</div>
        <table>
          <thead><tr><th>Day</th><th>Quiz</th><th>Status</th><th>Score</th><th>Action</th></tr></thead>
          <tbody>\${rows || '<tr><td colspan="5" style="text-align:center;color:var(--muted);">No quizzes found.</td></tr>'}</tbody>
        </table>
        \${renderAssessmentTable("Forecast Grade", "Projects your grade assuming maximum marks on everything not yet completed or entered.", forecastA)}
        \${renderAssessmentTable("Official Assessment", "Based only on work completed and scores entered so far. Missing components currently count as zero.", officialA)}
      </div>
    \`;
  }).join("");

  app.innerHTML = \`
    <a class="backlink" onclick="location.hash='#/'">← Back home</a>
    \${notice ? \`<div class="panel error" style="margin-bottom:16px;">\${esc(notice)}</div>\` : ""}
    <div class="panel">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px;">
        <div>
          <h2 style="margin:0 0 4px;">\${esc(student.full_name || "")}</h2>
          <p style="color:var(--muted); font-size:13.5px; margin:0;">\${esc(student.index_number || "")} · \${enrollments.length} course\${enrollments.length === 1 ? "" : "s"}</p>
        </div>
        <button id="logout-btn" class="detail-toggle">Log Out</button>
      </div>
    </div>
    \${courseBlocks}
    \${otherCoursesHtml}
  \`;
  document.querySelectorAll(".take-quiz-btn").forEach(btn => {
    btn.onclick = () => { location.hash = "#/quiz/" + btn.dataset.slug; };
  });
  document.querySelectorAll(".request-course-btn").forEach(btn => {
    btn.onclick = async () => {
      const courseCode = btn.dataset.course;
      btn.disabled = true; btn.textContent = "Requesting…";
      try {
        const res = await fetch(STUDENT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "request_enrollment", student_id: student.id, course_code: courseCode })
        });
        const respData = await res.json();
        if (!res.ok) { alert(respData.error || "Could not send request."); btn.disabled = false; btn.textContent = "Request to Join"; return; }
        STUDENT_SESSION = respData;
        renderStudentProfile(respData);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Request to Join";
      }
    };
  });
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      STUDENT_SESSION = null;
      location.hash = "#/";
    };
  }
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
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
    } catch (e) {
      document.getElementById("admin-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "View Results";
    }
  };
}

function toCsv(rows) {
  const header = ["Course", "Student Name", "Index No", "Programme", "Quiz", "Day", "Score", "Max Score", "Submitted At"];
  const lines = [header.join(",")];
  rows.forEach(r => {
    const line = [
      r.quizzes?.course_code || "", r.student_name, r.student_index || "", r.programme || "",
      r.quizzes?.title || "", r.quizzes?.day_number ?? "",
      r.score, r.max_score, r.submitted_at
    ].map(v => \`"\${String(v ?? "").replace(/"/g, '""')}"\`).join(",");
    lines.push(line);
  });
  return lines.join("\\n");
}

function renderAdminDashboard(rows, quizzes, students, grants, offerings) {
  quizzes = quizzes || [];
  students = students || [];
  grants = grants || [];
  rows = rows || [];
  if (offerings && offerings.length) COURSES = mapOfferingsToCourses(offerings);

  const courseLabel = (s) => (s.enrollments && s.enrollments.length) ? s.enrollments.map(e => e.course_code).join(", ") : "—";

  const currentView = ADMIN_VIEW || (COURSES[0] ? COURSES[0].code.toUpperCase() : "students");
  ADMIN_VIEW = currentView;
  const isStudentsView = currentView === "students";
  const courseMeta = COURSES.find(c => c.code.toUpperCase() === currentView);

  const scopedQuizzes = isStudentsView ? [] : quizzes.filter(q => (q.course_code || "").toUpperCase() === currentView);
  const scopedStudents = isStudentsView ? [] : students.filter(s => (s.enrollments || []).some(e => e.status === "active" && e.course_code === currentView));
  const scopedRows = isStudentsView ? [] : rows.filter(r => (r.quizzes?.course_code || "").toUpperCase() === currentView);
  const scopedGrants = isStudentsView ? [] : grants.filter(g => scopedQuizzes.some(q => q.id === g.quiz_id));
  const pendingForCourse = isStudentsView ? [] : students.filter(s => (s.enrollments || []).some(e => e.status === "pending" && e.course_code === currentView));
  const pendingCountByCourse = {};
  students.forEach(s => {
    (s.enrollments || []).forEach(e => {
      if (e.status === "pending") pendingCountByCourse[e.course_code] = (pendingCountByCourse[e.course_code] || 0) + 1;
    });
  });

  const totalSubs = scopedRows.length;
  const uniqueStudents = new Set(scopedRows.map(r => r.student_name + "|" + (r.student_index || ""))).size;
  const avgPct = scopedRows.length
    ? Math.round((scopedRows.reduce((a, r) => {
        const effScore = r.effective_score ?? r.score;
        const effMax = r.effective_max ?? r.max_score;
        return a + (effMax ? effScore / effMax : 0);
      }, 0) / scopedRows.length) * 100)
    : 0;

  const shortCount = scopedRows.reduce((a, r) => a + (r.details ? r.details.filter(d => d.question_type === "short" && d.needs_manual_review).length : 0), 0);

  const tableRows = scopedRows.map((r, idx) => {
    const shortDetails = r.details ? r.details.filter(d => d.question_type === "short") : [];
    const needsReview = shortDetails.filter(d => d.needs_manual_review).length;
    let reviewBadge = "";
    if (shortDetails.length > 0) {
      reviewBadge = needsReview > 0
        ? \`<span class="qstatus locked" style="margin-left:8px;">⚠ \${needsReview} to review</span>\`
        : \`<span class="qstatus open" style="margin-left:8px;">✓ Reviewed</span>\`;
    }
    return \`
    <tr\${needsReview > 0 ? ' style="background:#FFF9EC;"' : ""}>
      <td>\${esc(r.student_name)}</td>
      <td>\${esc(r.student_index)}</td>
      <td>\${esc(r.programme)}</td>
      <td>\${esc(r.quizzes?.title || "—")}</td>
      <td>\${r.effective_score ?? r.score} / \${r.effective_max ?? r.max_score}</td>
      <td>\${esc(new Date(r.submitted_at).toLocaleString())}</td>
      <td><button class="detail-toggle" data-idx="\${idx}" data-submission-id="\${r.id}">View Answers</button>\${reviewBadge}</td>
    </tr>
    <tr class="detail-row" id="detail-row-\${idx}" style="display:none;"><td colspan="7">\${renderSubmissionDetails(r)}</td></tr>
  \`;
  }).join("");

  const quizRows = scopedQuizzes.map(q => \`
    <tr>
      <td>Day \${q.day_number}</td>
      <td>\${esc(q.title)}</td>
      <td><span class="qstatus \${q.is_open ? "open" : "locked"}">\${q.is_open ? "Open" : "Locked"}</span></td>
      <td><button class="quiz-toggle-btn \${q.is_open ? "" : "to-open"}" data-quiz-id="\${q.id}" data-is-open="\${q.is_open}">\${q.is_open ? "Lock" : "Open"}</button></td>
    </tr>
  \`).join("");

  const studentRows = students.flatMap(s => {
    const enrolls = (s.enrollments && s.enrollments.length) ? s.enrollments : [null];
    return enrolls.map(enr => \`
    <tr>
      <td>\${esc(enr ? enr.course_code : "—")}</td>
      <td style="min-width:150px;">
        <input type="text" class="inline-score-input identity-name-input" data-student-id="\${s.id}" value="\${esc(s.full_name)}" placeholder="Full name" style="width:100%!important;margin-bottom:4px;" />
        <input type="text" class="inline-score-input identity-index-input" data-student-id="\${s.id}" value="\${esc(s.index_number)}" placeholder="Index number" style="width:100%!important;margin-bottom:4px;" />
        <div class="identity-error" data-student-id="\${s.id}" style="font-size:11px;color:var(--bad);margin-top:2px;"></div>
      </td>
      <td><span class="qstatus \${enr && enr.is_ic ? "locked" : "open"}">\${enr && enr.is_ic ? "IC" : "Active"}</span></td>
      <td>
        <input type="number" class="inline-score-input exercise-score-input" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" min="0" max="100" step="1" value="\${enr && enr.exercise_score != null ? enr.exercise_score : ""}" placeholder="0-100" \${enr ? "" : "disabled"} />
        <div class="exercise-error" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" style="font-size:11px;color:var(--bad);margin-top:2px;"></div>
      </td>
      <td>
        <input type="number" class="inline-score-input final-exam-input" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" min="0" max="100" step="1" value="\${enr && enr.final_exam_score != null ? enr.final_exam_score : ""}" placeholder="0-100" \${enr ? "" : "disabled"} />
        <button class="save-score-btn save-final-exam-btn" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" \${enr ? "" : "disabled"}>Save</button>
      </td>
      <td>
        <input type="number" class="inline-score-input fee-owed-input" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" min="0" step="0.01" value="\${enr && enr.amount_owed != null ? enr.amount_owed : ""}" placeholder="GH₵ fee" \${enr ? "" : "disabled"} />
        <div class="fee-owed-error" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" style="font-size:11px;color:var(--bad);margin-top:2px;"></div>
      </td>
      <td>
        <input type="number" class="inline-score-input amount-paid-input" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" min="0" step="0.01" value="\${enr ? (enr.amount_paid || 0) : ""}" placeholder="0.00" \${enr ? "" : "disabled"} />
        <button class="save-score-btn save-amount-paid-btn" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}" \${enr ? "" : "disabled"}>Save</button>
        <div class="balance-indicator" data-student-id="\${s.id}" data-course-code="\${esc(enr ? enr.course_code : "")}">\${enr && enr.amount_owed != null ? (Number(enr.amount_paid || 0) >= Number(enr.amount_owed) ? '<div style="font-size:11px;color:var(--good);margin-top:3px;">Paid in full</div>' : \`<div style="font-size:11px;color:var(--amber);margin-top:3px;">Owes GH₵\${(Number(enr.amount_owed) - Number(enr.amount_paid || 0)).toFixed(2)}</div>\`) : ""}</div>
      </td>
      <td style="min-width:200px;">
        <input type="text" class="inline-score-input contact-phone-input" data-student-id="\${s.id}" value="\${esc(s.phone ?? "")}" placeholder="Phone" style="width:100%!important;margin-bottom:4px;" />
        <select class="inline-score-input contact-programme-input" data-student-id="\${s.id}" style="width:100%!important;margin-bottom:4px;">
          <option value="" \${!s.programme ? "selected" : ""}>—</option>
          <option value="HRM" \${s.programme === "HRM" ? "selected" : ""}>HRM</option>
          <option value="PSCM" \${s.programme === "PSCM" ? "selected" : ""}>PSCM</option>
          <option value="Other" \${s.programme === "Other" ? "selected" : ""}>Other</option>
        </select>
        <input type="text" class="inline-score-input contact-email-input" data-student-id="\${s.id}" value="\${esc(s.email ?? "")}" placeholder="Email" style="width:100%!important;margin-bottom:4px;" />
        <div class="contact-error" data-student-id="\${s.id}" style="font-size:11px;color:var(--bad);margin-top:2px;"></div>
      </td>
      <td>
        <button class="regen-pin-btn" data-student-id="\${s.id}" style="margin:0 6px 6px 0;padding:7px 12px;font-size:12.5px;">Regenerate PIN</button>
        \${enr ? \`<button class="toggle-ic-btn" data-student-id="\${s.id}" data-course-code="\${esc(enr.course_code)}" data-is-ic="\${enr.is_ic}" style="margin:0 6px 6px 0;padding:7px 12px;font-size:12.5px;background:\${enr.is_ic ? "var(--good)" : "var(--bad)"};color:#fff;">\${enr.is_ic ? "Clear IC" : "Mark IC"}</button>\` : ""}
        \${enr ? \`<button class="unenroll-btn" data-student-id="\${s.id}" data-course-code="\${esc(enr.course_code)}" data-student-name="\${esc(s.full_name)}" style="margin:0 6px 6px 0;padding:7px 12px;font-size:12.5px;background:var(--amber);">Remove from \${esc(enr.course_code)}</button>\` : ""}
        <button class="delete-student-btn" data-student-id="\${s.id}" data-student-name="\${esc(s.full_name)}" style="margin:0;padding:7px 12px;font-size:12.5px;background:var(--bad);color:#fff;">Delete Everywhere</button>
      </td>
    </tr>
  \`).join("");
  }).join("");

  const tabsHtml = \`
    <div class="admin-topbar">
      <div class="admin-tabs">
        \${COURSES.map(c => {
          const code = c.code.toUpperCase();
          const pendingCount = pendingCountByCourse[code] || 0;
          const label = esc(code) + (c.is_active === false ? " (Archived)" : "");
          return \`<button class="admin-tab \${currentView === code ? "active" : ""}" data-view="\${code}">\${label}\${pendingCount ? \`<span class="tab-badge">\${pendingCount}</span>\` : ""}</button>\`;
        }).join("")}
        <button class="admin-tab \${isStudentsView ? "active" : ""}" data-view="students">All Students</button>
      </div>
      <button id="refresh-btn" style="margin:0;">🔄 Refresh</button>
    </div>
  \`;

  const offeringTypeLabel = { university_course: "University Course", private: "Private Tuition", group: "Special Group" };
  const courseContentHtml = \`
    <div class="course-heading">
      <div>
        <h1>\${esc(courseMeta ? courseMeta.name : currentView)}</h1>
        <p>\${[courseMeta ? courseMeta.programme : "", courseMeta ? courseMeta.institution : "", courseMeta ? offeringTypeLabel[courseMeta.type] : ""].filter(Boolean).map(esc).join(" · ")}</p>
      </div>
      \${courseMeta ? \`<button id="toggle-offering-active-btn" data-offering-id="\${courseMeta.id}" data-is-active="\${courseMeta.is_active}" style="margin:0;padding:8px 14px;font-size:12.5px;background:\${courseMeta.is_active ? "var(--amber)" : "var(--good)"};color:\${courseMeta.is_active ? "var(--navy)" : "#fff"};">\${courseMeta.is_active ? "Archive This Course" : "Reactivate This Course"}</button>\` : ""}
    </div>
    \${pendingForCourse.length ? \`
      <div class="manage-section" style="border:1px solid #f0c36d;background:#fffaf0;">
        <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Pending Enrollment Requests</h2>
        <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">These students asked to join \${esc(currentView)}. Approve to give them access to quizzes and notifications, or decline to remove the request.</p>
        <table>
          <thead><tr><th>Student</th><th>Index No.</th><th>Requested</th><th></th></tr></thead>
          <tbody>
            \${pendingForCourse.map(s => {
              const enr = (s.enrollments || []).find(e => e.course_code === currentView && e.status === "pending");
              const requestedAt = enr && enr.requested_at ? new Date(enr.requested_at).toLocaleString() : "—";
              return \`
                <tr>
                  <td>\${esc(s.full_name)}</td>
                  <td>\${esc(s.index_number)}</td>
                  <td>\${requestedAt}</td>
                  <td style="white-space:nowrap;">
                    <button class="approve-request-btn" data-student-id="\${s.id}" data-course-code="\${currentView}" style="margin:0 6px 0 0;padding:6px 12px;font-size:12px;">Approve</button>
                    <button class="decline-request-btn" data-student-id="\${s.id}" data-course-code="\${currentView}" style="margin:0;padding:6px 12px;font-size:12px;background:var(--bad);color:#fff;">Decline</button>
                  </td>
                </tr>
              \`;
            }).join("")}
          </tbody>
        </table>
      </div>
    \` : ""}
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Manage Quizzes</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Students can only start a quiz once you've switched it to <strong>Open</strong>. Everyone can still see the quiz titles either way.</p>
      <table>
        <thead><tr><th>Day</th><th>Quiz</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>\${quizRows || '<tr><td colspan="4" style="text-align:center;color:var(--muted);">No quizzes found for this course yet.</td></tr>'}</tbody>
      </table>
    </div>
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Reopen a Quiz for Specific Students</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Grant one or more students temporary access to take (or retake) a quiz, even while it's locked for everyone else — useful for paid retakes or make-ups. If a student already has a score, whichever attempt scores higher counts. Access expires automatically.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px;">
        <div style="flex:1;min-width:200px;">
          <label style="margin-top:0;">Quiz</label>
          <select id="reopen-quiz-select">
            \${scopedQuizzes.map(q => \`<option value="\${q.id}">Day \${q.day_number} — \${esc(q.title)}</option>\`).join("")}
          </select>
        </div>
        <div style="flex:1;min-width:120px;">
          <label style="margin-top:0;">Valid for (hours)</label>
          <input type="number" id="reopen-hours" min="1" max="336" value="24" />
        </div>
      </div>
      <label style="margin-top:0;">Students (select one or more)</label>
      <select id="reopen-student-select" multiple size="8" style="height:auto;">
        \${scopedStudents.map(s => \`<option value="\${s.id}">\${esc(s.full_name)} (\${esc(s.index_number)})</option>\`).join("")}
      </select>
      <div id="reopen-error"></div>
      <button id="reopen-grant-btn">Reopen for Selected Students</button>
      \${scopedGrants.length ? \`
        <div style="margin-top:24px;">
          <div class="section-title" style="margin-top:0;">Active Reopen Grants</div>
          <table>
            <thead><tr><th>Student</th><th>Quiz</th><th>Expires</th><th></th></tr></thead>
            <tbody>
              \${scopedGrants.map(g => \`
                <tr>
                  <td>\${esc(g.students?.full_name || "—")} (\${esc(g.students?.index_number || "")})</td>
                  <td>Day \${g.quizzes?.day_number ?? "—"} — \${esc(g.quizzes?.title || "—")}</td>
                  <td>\${esc(new Date(g.expires_at).toLocaleString())}</td>
                  <td><button class="revoke-grant-btn" data-grant-id="\${g.id}" style="margin:0;padding:6px 12px;font-size:12px;background:var(--bad);color:#fff;">Revoke</button></td>
                </tr>
              \`).join("")}
            </tbody>
          </table>
        </div>
      \` : ""}
    </div>
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">SMS Broadcast</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Send a text message to everyone enrolled in this course, or to one specific student. Only students with a phone number on file will receive it.</p>
      <label style="margin-top:0;">Send To</label>
      <select id="broadcast-target">
        <option value="">All students in this course</option>
        \${scopedStudents.map(s => \`<option value="\${s.id}">\${esc(s.full_name)} (\${esc(s.index_number)})</option>\`).join("")}
      </select>
      <label>Message</label>
      <textarea id="broadcast-message" placeholder="Type your message…"></textarea>
      <div id="broadcast-error"></div>
      <button id="broadcast-btn">Send SMS</button>
    </div>
    <div class="toolbar">
      <h2 style="margin:0;color:var(--navy);font-family:Georgia,serif;">Student Results</h2>
      <div>
        <button id="csv-btn" style="margin:0;">⬇ Download CSV</button>
      </div>
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

  const activeCourses = COURSES.filter(c => c.is_active !== false);
  const studentsContentHtml = \`
    <div class="course-heading">
      <div>
        <h1>All Students</h1>
        <p>Every student in the system, across every course. Add new people here, then use each course tab to open or lock their quizzes.</p>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button id="toggle-new-offering-btn" class="toggle-panel-btn" style="margin:0;">+ New Course / Offering</button>
        <button id="toggle-add-student-btn" class="toggle-panel-btn" style="margin:0;">+ Add / Enroll Student</button>
      </div>
    </div>
    <div class="manage-section" id="new-offering-panel" style="display:none;">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Create a New Course / Offering</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Set up a new university course, a private tuition engagement, or a special group. Once created, it gets its own tab with quizzes, enrollment, and SMS tools.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px;">
        <div style="flex:1;min-width:150px;"><label style="margin-top:0;">Type</label>
          <select id="new-offering-type">
            <option value="university_course">University Course</option>
            <option value="private">Private Tuition</option>
            <option value="group">Special Group</option>
          </select>
        </div>
        <div style="flex:1;min-width:120px;"><label style="margin-top:0;">Code</label><input type="text" id="new-offering-code" placeholder="e.g. ENG301" /></div>
        <div style="flex:2;min-width:220px;"><label style="margin-top:0;">Name</label><input type="text" id="new-offering-name" placeholder="e.g. ENG 301: Advanced Composition" /></div>
        <div style="flex:1;min-width:180px;"><label style="margin-top:0;">Institution (optional)</label><input type="text" id="new-offering-institution" placeholder="e.g. Fountainhead Christian University College" /></div>
        <div style="flex:1;min-width:160px;"><label style="margin-top:0;">Programme / Subtitle</label><input type="text" id="new-offering-programme" placeholder="e.g. HRM · Level 200" /></div>
      </div>
      <label style="margin-top:0;">Description</label>
      <textarea id="new-offering-description" placeholder="Short description shown on the public course card…"></textarea>
      <div id="new-offering-error"></div>
      <button id="create-offering-btn">Create Offering</button>
    </div>
    <div class="manage-section" id="add-student-panel" style="display:none;">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Add a New Student</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Add a student to auto-generate their login PIN. They'll log in at the Student Portal using their index number + PIN.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;margin-bottom:14px;">
        <div style="flex:1;min-width:140px;"><label style="margin-top:0;">Course</label>
          <select id="new-student-course">
            \${activeCourses.map(c => \`<option value="\${c.code.toUpperCase()}">\${esc(c.code.toUpperCase())}</option>\`).join("")}
          </select>
        </div>
        <div style="flex:1;min-width:160px;"><label style="margin-top:0;">Full Name</label><input type="text" id="new-student-name" /></div>
        <div style="flex:1;min-width:140px;"><label style="margin-top:0;">Index Number</label><input type="text" id="new-student-index" /></div>
        <div style="flex:1;min-width:140px;"><label style="margin-top:0;">Phone</label><input type="text" id="new-student-phone" placeholder="e.g. 0246314915" /></div>
        <div style="flex:1;min-width:120px;"><label style="margin-top:0;">Programme</label>
          <select id="new-student-programme">
            <option value="">—</option>
            <option value="HRM">HRM</option>
            <option value="PSCM">PSCM</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div style="flex:1;min-width:160px;"><label style="margin-top:0;">Email</label><input type="text" id="new-student-email" /></div>
        <button id="add-student-btn" style="margin:0;">Add Student</button>
      </div>
      <div id="add-student-error"></div>
      <div style="border-top:1px solid #EAF0F3;margin:18px 0;padding-top:16px;">
        <div class="section-title" style="margin-top:0;">Enroll an Existing Student in Another Course</div>
        <p style="color:var(--muted);font-size:13.5px;margin:0 0 12px;">Already have this person in the system for another course? Add them here instead of re-entering their details — they'll keep the same login.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end;">
          <div style="flex:1;min-width:220px;"><label style="margin-top:0;">Student</label>
            <select id="enroll-existing-student">
              \${students.map(s => \`<option value="\${s.id}">\${esc(s.full_name)} (\${esc(s.index_number)}) — currently: \${esc(courseLabel(s))}</option>\`).join("")}
            </select>
          </div>
          <div style="flex:1;min-width:140px;"><label style="margin-top:0;">Course to Add</label>
            <select id="enroll-existing-course">
              \${activeCourses.map(c => \`<option value="\${c.code.toUpperCase()}">\${esc(c.code.toUpperCase())}</option>\`).join("")}
            </select>
          </div>
          <button id="enroll-existing-btn" style="margin:0;">Enroll</button>
        </div>
        <div id="enroll-existing-error"></div>
      </div>
    </div>
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Student Roster</h2>
      <p style="color:var(--muted);font-size:12.5px;margin:0 0 10px;">Exercise Score and Final Exam are entered out of 100 and count toward the official grade breakdown. Fee Agreed and Amount Paid are in GH₵ and are mainly for private tuition and groups — leave blank if a course isn't paid per-student. A phone number is required for a student to receive SMS notifications (PIN, quiz alerts, grades, payments).</p>
      <table>
        <thead><tr><th>Course</th><th>Name / Index No.</th><th>Status</th><th>Exercise Score</th><th>Final Exam</th><th>Fee Agreed</th><th>Paid</th><th>Contact</th><th>Actions</th></tr></thead>
        <tbody>\${studentRows || '<tr><td colspan="9" style="text-align:center;color:var(--muted);">No students added yet.</td></tr>'}</tbody>
      </table>
    </div>
    <div class="manage-section">
      <h2 style="margin:0 0 14px;color:var(--navy);font-family:Georgia,serif;">Broadcast to Everyone</h2>
      <p style="color:var(--muted);font-size:13.5px;margin:0 0 14px;">Send a text message to every student on the roster regardless of course, or to one specific student. Only students with a phone number on file will receive it.</p>
      <label style="margin-top:0;">Send To</label>
      <select id="broadcast-target">
        <option value="">All Students</option>
        \${students.map(s => \`<option value="\${s.id}">[\${esc(courseLabel(s))}] \${esc(s.full_name)} (\${esc(s.index_number)})</option>\`).join("")}
      </select>
      <label>Message</label>
      <textarea id="broadcast-message" placeholder="Type your message…"></textarea>
      <div id="broadcast-error"></div>
      <button id="broadcast-btn">Send SMS</button>
    </div>
  \`;

  app.innerHTML = tabsHtml + (isStudentsView ? studentsContentHtml : courseContentHtml);
  document.querySelectorAll(".admin-tab").forEach(btn => {
    btn.onclick = () => {
      ADMIN_VIEW = btn.dataset.view;
      renderAdminDashboard(rows, quizzes, students, grants, offerings);
    };
  });
  const togglePanel = (btnId, panelId, openLabel, closeLabel) => {
    const btn = document.getElementById(btnId);
    const panel = document.getElementById(panelId);
    if (!btn || !panel) return;
    btn.onclick = () => {
      const isOpen = panel.style.display !== "none";
      panel.style.display = isOpen ? "none" : "block";
      btn.textContent = isOpen ? openLabel : closeLabel;
      btn.classList.toggle("open", !isOpen);
    };
  };
  togglePanel("toggle-new-offering-btn", "new-offering-panel", "+ New Course / Offering", "− Close");
  togglePanel("toggle-add-student-btn", "add-student-panel", "+ Add / Enroll Student", "− Close");
  document.querySelectorAll(".detail-toggle").forEach(btn => {
    btn.onclick = () => {
      const idx = btn.dataset.idx;
      const submissionId = btn.dataset.submissionId;
      const row = document.getElementById("detail-row-" + idx);
      const showing = row.style.display !== "none";
      row.style.display = showing ? "none" : "table-row";
      btn.textContent = showing ? "View Answers" : "Hide Answers";
      if (submissionId) {
        if (showing) OPEN_DETAIL_KEYS.delete(submissionId);
        else OPEN_DETAIL_KEYS.add(submissionId);
      }
    };
  });
  document.querySelectorAll(".detail-toggle").forEach(btn => {
    const submissionId = btn.dataset.submissionId;
    if (submissionId && OPEN_DETAIL_KEYS.has(submissionId)) {
      const row = document.getElementById("detail-row-" + btn.dataset.idx);
      if (row) {
        row.style.display = "table-row";
        btn.textContent = "Hide Answers";
      }
    }
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
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false;
      }
    };
  });
  if (document.getElementById("reopen-grant-btn")) document.getElementById("reopen-grant-btn").onclick = async () => {
    const btn = document.getElementById("reopen-grant-btn");
    const quizId = document.getElementById("reopen-quiz-select").value;
    const hoursRaw = document.getElementById("reopen-hours").value.trim();
    const hours = Number(hoursRaw);
    const studentIds = Array.from(document.getElementById("reopen-student-select").selectedOptions).map(o => o.value);
    document.getElementById("reopen-error").innerHTML = "";
    if (!quizId) {
      document.getElementById("reopen-error").innerHTML = '<div class="error">Please select a quiz.</div>';
      return;
    }
    if (!studentIds.length) {
      document.getElementById("reopen-error").innerHTML = '<div class="error">Please select at least one student.</div>';
      return;
    }
    if (!hoursRaw || isNaN(hours) || hours <= 0) {
      document.getElementById("reopen-error").innerHTML = '<div class="error">Enter a valid number of hours.</div>';
      return;
    }
    btn.disabled = true; btn.textContent = "Reopening…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PW, action: "grant_quiz_access", quiz_id: quizId, student_ids: studentIds, hours })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("reopen-error").innerHTML = \`<div class="error">\${esc(data.error || "Could not reopen quiz.")}</div>\`;
        btn.disabled = false; btn.textContent = "Reopen for Selected Students";
        return;
      }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      if (data.last_action) {
        alert(\`Reopened for \${data.last_action.granted} student(s). SMS sent to \${data.last_action.notified} of them.\`);
      }
    } catch (e) {
      document.getElementById("reopen-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "Reopen for Selected Students";
    }
  };
  document.querySelectorAll(".revoke-grant-btn").forEach(btn => {
    btn.onclick = async () => {
      const grantId = btn.dataset.grantId;
      if (!confirm("Revoke this student's reopened access?")) return;
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "revoke_quiz_access", grant_id: grantId })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not revoke access."); btn.disabled = false; btn.textContent = "Revoke"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Revoke";
      }
    };
  });
  if (document.getElementById("add-student-btn")) document.getElementById("add-student-btn").onclick = async () => {
    const btn = document.getElementById("add-student-btn");
    const courseCode = document.getElementById("new-student-course").value;
    const fullName = document.getElementById("new-student-name").value.trim();
    const indexNumber = document.getElementById("new-student-index").value.trim();
    const phone = document.getElementById("new-student-phone").value.trim();
    const programme = document.getElementById("new-student-programme").value;
    const email = document.getElementById("new-student-email").value.trim();
    if (!fullName || !indexNumber) {
      document.getElementById("add-student-error").innerHTML = '<div class="error">Please enter both a name and an index number.</div>';
      return;
    }
    btn.disabled = true; btn.textContent = "Adding…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PW, action: "add_student", full_name: fullName, index_number: indexNumber,
          course_code: courseCode, phone: phone || null, programme: programme || null, email: email || null
        })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("add-student-error").innerHTML = \`<div class="error">\${esc(data.error || "Could not add student.")}</div>\`;
        btn.disabled = false; btn.textContent = "Add Student";
        return;
      }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      if (data.last_action && data.last_action.pin) {
        const smsNote = data.last_action.phone ? "\\n\\nAn SMS with this PIN has also been sent to " + data.last_action.phone + "." : "\\n\\nNo phone number was provided, so no SMS was sent.";
        alert(\`Student added: \${data.last_action.full_name} (\${data.last_action.index_number})\\nPIN: \${data.last_action.pin}\${smsNote}\`);
      }
    } catch (e) {
      document.getElementById("add-student-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "Add Student";
    }
  };
  document.querySelectorAll(".exercise-score-input").forEach(input => {
    if (input.disabled) return;
    input.dataset.lastSaved = input.value;
    input.addEventListener("blur", async () => {
      const studentId = input.dataset.studentId;
      const courseCode = input.dataset.courseCode;
      const errorEl = document.querySelector(\`.exercise-error[data-student-id="\${studentId}"][data-course-code="\${courseCode}"]\`);
      const raw = input.value.trim();
      if (errorEl) errorEl.textContent = "";
      if (raw !== "" && (isNaN(Number(raw)) || Number(raw) < 0 || Number(raw) > 100)) {
        if (errorEl) errorEl.textContent = "Must be 0-100.";
        return;
      }
      if (input.dataset.lastSaved === raw) return;
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "update_exercise_score", student_id: studentId, course_code: courseCode, exercise_score: raw === "" ? null : Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { if (errorEl) errorEl.textContent = data.error || "Could not save."; return; }
        input.dataset.lastSaved = raw;
        const student = students.find(s => s.id === studentId);
        const enr = student && (student.enrollments || []).find(e => e.course_code === courseCode);
        if (enr) enr.exercise_score = raw === "" ? null : Number(raw);
        flashSaved([input]);
      } catch (e) {
        if (errorEl) errorEl.textContent = "Network error: " + e.message;
      }
    });
  });
  document.querySelectorAll(".save-final-exam-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const courseCode = btn.dataset.courseCode;
      const input = document.querySelector(\`.final-exam-input[data-student-id="\${studentId}"][data-course-code="\${courseCode}"]\`);
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
          body: JSON.stringify({ password: ADMIN_PW, action: "update_final_exam_score", student_id: studentId, course_code: courseCode, final_exam_score: raw === "" ? null : Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not save final exam score."); btn.disabled = false; btn.textContent = "Save"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Save";
      }
    };
  });
  document.querySelectorAll(".fee-owed-input").forEach(input => {
    if (input.disabled) return;
    input.dataset.lastSaved = input.value;
    input.addEventListener("blur", async () => {
      const studentId = input.dataset.studentId;
      const courseCode = input.dataset.courseCode;
      const errorEl = document.querySelector(\`.fee-owed-error[data-student-id="\${studentId}"][data-course-code="\${courseCode}"]\`);
      const raw = input.value.trim();
      if (errorEl) errorEl.textContent = "";
      if (raw !== "" && (isNaN(Number(raw)) || Number(raw) < 0)) {
        if (errorEl) errorEl.textContent = "Must be 0 or more.";
        return;
      }
      if (input.dataset.lastSaved === raw) return;
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "update_amount_owed", student_id: studentId, course_code: courseCode, amount_owed: raw === "" ? null : Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { if (errorEl) errorEl.textContent = data.error || "Could not save."; return; }
        input.dataset.lastSaved = raw;
        const newOwed = raw === "" ? null : Number(raw);
        const student = students.find(s => s.id === studentId);
        const enr = student && (student.enrollments || []).find(e => e.course_code === courseCode);
        if (enr) enr.amount_owed = newOwed;
        flashSaved([input]);
        const indicator = document.querySelector(\`.balance-indicator[data-student-id="\${studentId}"][data-course-code="\${courseCode}"]\`);
        if (indicator) {
          const paid = Number(enr ? (enr.amount_paid || 0) : 0);
          indicator.innerHTML = newOwed != null
            ? (paid >= newOwed
                ? '<div style="font-size:11px;color:var(--good);margin-top:3px;">Paid in full</div>'
                : \`<div style="font-size:11px;color:var(--amber);margin-top:3px;">Owes GH₵\${(newOwed - paid).toFixed(2)}</div>\`)
            : "";
        }
      } catch (e) {
        if (errorEl) errorEl.textContent = "Network error: " + e.message;
      }
    });
  });
  document.querySelectorAll(".save-amount-paid-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const courseCode = btn.dataset.courseCode;
      const input = document.querySelector(\`.amount-paid-input[data-student-id="\${studentId}"][data-course-code="\${courseCode}"]\`);
      const raw = input.value.trim();
      if (raw === "" || isNaN(Number(raw)) || Number(raw) < 0) {
        alert("Amount paid must be a non-negative number.");
        return;
      }
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "update_amount_paid", student_id: studentId, course_code: courseCode, amount_paid: Number(raw) })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not save payment."); btn.disabled = false; btn.textContent = "Save"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
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
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
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
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false;
      }
    };
  });
  document.querySelectorAll(".toggle-ic-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const courseCode = btn.dataset.courseCode;
      const newIsIc = btn.dataset.isIc !== "true";
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "toggle_ic", student_id: studentId, course_code: courseCode, is_ic: newIsIc })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not update student."); btn.disabled = false; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false;
      }
    };
  });
  document.querySelectorAll(".unenroll-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const courseCode = btn.dataset.courseCode;
      const studentName = btn.dataset.studentName;
      const confirmed = confirm(\`Remove \${studentName} from \${courseCode}? They'll lose access to that course's quizzes, but their profile and other course enrollments are unaffected.\`);
      if (!confirmed) return;
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "unenroll_student", student_id: studentId, course_code: courseCode })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not remove student from course."); btn.disabled = false; btn.textContent = "Remove from Course"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Remove from Course";
      }
    };
  });
  document.querySelectorAll(".approve-request-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const courseCode = btn.dataset.courseCode;
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "enroll_student", student_id: studentId, course_code: courseCode })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not approve request."); btn.disabled = false; btn.textContent = "Approve"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Approve";
      }
    };
  });
  document.querySelectorAll(".decline-request-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const courseCode = btn.dataset.courseCode;
      const confirmed = confirm(\`Decline this request to join \${courseCode}? The student can request again later if they change their mind.\`);
      if (!confirmed) return;
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "unenroll_student", student_id: studentId, course_code: courseCode })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not decline request."); btn.disabled = false; btn.textContent = "Decline"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Decline";
      }
    };
  });
  if (document.getElementById("create-offering-btn")) document.getElementById("create-offering-btn").onclick = async () => {
    const btn = document.getElementById("create-offering-btn");
    const type = document.getElementById("new-offering-type").value;
    const code = document.getElementById("new-offering-code").value.trim();
    const name = document.getElementById("new-offering-name").value.trim();
    const institution = document.getElementById("new-offering-institution").value.trim();
    const programme = document.getElementById("new-offering-programme").value.trim();
    const description = document.getElementById("new-offering-description").value.trim();
    document.getElementById("new-offering-error").innerHTML = "";
    if (!code || !name) {
      document.getElementById("new-offering-error").innerHTML = '<div class="error">Code and name are required.</div>';
      return;
    }
    btn.disabled = true; btn.textContent = "Creating…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PW, action: "create_offering",
          offering_type: type, offering_code: code, offering_name: name,
          offering_institution: institution || null, offering_programme: programme || null,
          offering_description: description || null
        })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("new-offering-error").innerHTML = \`<div class="error">\${esc(data.error || "Could not create offering.")}</div>\`;
        btn.disabled = false; btn.textContent = "Create Offering";
        return;
      }
      ADMIN_VIEW = code.toUpperCase();
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
    } catch (e) {
      document.getElementById("new-offering-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "Create Offering";
    }
  };
  if (document.getElementById("toggle-offering-active-btn")) document.getElementById("toggle-offering-active-btn").onclick = async () => {
    const btn = document.getElementById("toggle-offering-active-btn");
    const offeringId = btn.dataset.offeringId;
    const newActive = btn.dataset.isActive !== "true";
    const confirmed = confirm(newActive
      ? "Reactivate this course? It will become visible again in the active list."
      : "Archive this course? Its quizzes, students, and results are all kept — it just moves out of the active list and off the public site.");
    if (!confirmed) return;
    btn.disabled = true; btn.textContent = "…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PW, action: "toggle_offering_active", offering_id: offeringId, offering_is_active: newActive })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Could not update course."); btn.disabled = false; return; }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
    } catch (e) {
      alert("Network error: " + e.message);
      btn.disabled = false;
    }
  };
  if (document.getElementById("enroll-existing-btn")) document.getElementById("enroll-existing-btn").onclick = async () => {
    const btn = document.getElementById("enroll-existing-btn");
    const studentId = document.getElementById("enroll-existing-student").value;
    const courseCode = document.getElementById("enroll-existing-course").value;
    if (!studentId || !courseCode) return;
    btn.disabled = true; btn.textContent = "Enrolling…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PW, action: "enroll_student", student_id: studentId, course_code: courseCode })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("enroll-existing-error").innerHTML = \`<div class="error">\${esc(data.error || "Could not enroll student.")}</div>\`;
        btn.disabled = false; btn.textContent = "Enroll";
        return;
      }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
    } catch (e) {
      document.getElementById("enroll-existing-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "Enroll";
    }
  };
  document.querySelectorAll(".delete-student-btn").forEach(btn => {
    btn.onclick = async () => {
      const studentId = btn.dataset.studentId;
      const studentName = btn.dataset.studentName;
      const confirmed = confirm(\`Delete \${studentName}? This removes their profile, PIN, and all quiz submissions across every course they're enrolled in, permanently. This cannot be undone.\`);
      if (!confirmed) return;
      btn.disabled = true; btn.textContent = "…";
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password: ADMIN_PW, action: "delete_student", student_id: studentId })
        });
        const data = await res.json();
        if (!res.ok) { alert(data.error || "Could not delete student."); btn.disabled = false; btn.textContent = "Delete Everywhere"; return; }
        renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      } catch (e) {
        alert("Network error: " + e.message);
        btn.disabled = false; btn.textContent = "Delete Everywhere";
      }
    };
  });
  document.querySelectorAll(".identity-name-input, .identity-index-input").forEach(input => {
    input.addEventListener("blur", async () => {
      const row = input.closest("tr");
      if (!row) return;
      const nameInput = row.querySelector(".identity-name-input");
      const indexInput = row.querySelector(".identity-index-input");
      const studentId = nameInput.dataset.studentId;
      const errorEl = row.querySelector(".identity-error");
      const fullName = nameInput.value.trim();
      const indexNumber = indexInput.value.trim();
      if (errorEl) errorEl.textContent = "";
      if (!fullName || !indexNumber) {
        if (errorEl) errorEl.textContent = "Name and index number are both required.";
        return;
      }
      const key = fullName + "|" + indexNumber;
      if (row.dataset.identitySaved === key) return;
      try {
        const res = await fetch(ADMIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: ADMIN_PW, action: "update_student_identity", student_id: studentId,
            full_name: fullName, index_number: indexNumber
          })
        });
        const data = await res.json();
        if (!res.ok) { if (errorEl) errorEl.textContent = data.error || "Could not save."; return; }
        row.dataset.identitySaved = key;
        const student = students.find(s => s.id === studentId);
        if (student) { student.full_name = fullName; student.index_number = indexNumber; }
        flashSaved([nameInput, indexInput]);
      } catch (e) {
        if (errorEl) errorEl.textContent = "Network error: " + e.message;
      }
    });
  });
  document.querySelectorAll(".contact-phone-input, .contact-email-input").forEach(input => {
    input.addEventListener("blur", () => saveContactRow(input));
  });
  document.querySelectorAll(".contact-programme-input").forEach(select => {
    select.addEventListener("change", () => saveContactRow(select));
  });
  async function saveContactRow(triggerEl) {
    const row = triggerEl.closest("tr");
    if (!row) return;
    const phoneInput = row.querySelector(".contact-phone-input");
    const programmeInput = row.querySelector(".contact-programme-input");
    const emailInput = row.querySelector(".contact-email-input");
    const studentId = phoneInput.dataset.studentId;
    const errorEl = row.querySelector(".contact-error");
    const phone = phoneInput.value.trim();
    const programme = programmeInput.value;
    const email = emailInput.value.trim();
    if (errorEl) errorEl.textContent = "";
    const key = phone + "|" + programme + "|" + email;
    if (row.dataset.contactSaved === key) return;
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: ADMIN_PW, action: "update_student_contact", student_id: studentId,
          phone: phone || null, programme: programme || null, email: email || null
        })
      });
      const data = await res.json();
      if (!res.ok) { if (errorEl) errorEl.textContent = data.error || "Could not save."; return; }
      row.dataset.contactSaved = key;
      const student = students.find(s => s.id === studentId);
      if (student) { student.phone = phone || null; student.programme = programme || null; student.email = email || null; }
      flashSaved([phoneInput, emailInput]);
    } catch (e) {
      if (errorEl) errorEl.textContent = "Network error: " + e.message;
    }
  }
  document.getElementById("broadcast-btn").onclick = async () => {
    const btn = document.getElementById("broadcast-btn");
    const studentId = document.getElementById("broadcast-target").value;
    const message = document.getElementById("broadcast-message").value.trim();
    if (!message) {
      document.getElementById("broadcast-error").innerHTML = '<div class="error">Please type a message.</div>';
      return;
    }
    btn.disabled = true; btn.textContent = "Sending…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PW, action: "send_broadcast", message, student_id: studentId || null })
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("broadcast-error").innerHTML = \`<div class="error">\${esc(data.error || "Could not send broadcast.")}</div>\`;
        btn.disabled = false; btn.textContent = "Send SMS";
        return;
      }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
      if (data.last_action) {
        alert(\`Sent to \${data.last_action.sent} of \${data.last_action.total} student(s). \${data.last_action.skipped} skipped (no phone on file or delivery failed).\`);
      }
    } catch (e) {
      document.getElementById("broadcast-error").innerHTML = \`<div class="error">Network error: \${esc(e.message)}</div>\`;
      btn.disabled = false; btn.textContent = "Send SMS";
    }
  };
  document.getElementById("refresh-btn").onclick = async () => {
    const btn = document.getElementById("refresh-btn");
    btn.disabled = true; btn.textContent = "Refreshing…";
    try {
      const res = await fetch(ADMIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: ADMIN_PW })
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || "Could not refresh."); btn.disabled = false; btn.textContent = "🔄 Refresh"; return; }
      renderAdminDashboard(data.submissions || [], data.quizzes || [], data.students || [], data.grants || [], data.offerings || []);
    } catch (e) {
      alert("Network error: " + e.message);
      btn.disabled = false; btn.textContent = "🔄 Refresh";
    }
  };
  if (document.getElementById("csv-btn")) document.getElementById("csv-btn").onclick = () => {
    const blob = new Blob([toCsv(scopedRows)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = currentView.toLowerCase() + "_results.csv"; a.click();
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
