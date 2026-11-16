(function () {
"use strict";

/* =========================================================================
   Data
   ========================================================================= */
const HUB = window.HUB || { lessons: [], vocab: [], extras: {} };
const X = HUB.extras || {};
const LESSONS = HUB.lessons || [];
const VOCAB = HUB.vocab || [];
const LEVELS = ["A2", "B1", "B2", "C1", "C2"];
const LEVEL_INFO = {
  A2: { name: "Élémentaire", desc: "Tu te débrouilles dans les situations simples du quotidien." },
  B1: { name: "Seuil", desc: "Tu racontes, tu expliques, tu donnes ton avis simplement." },
  B2: { name: "Avancé", desc: "Tu argumentes et tu suis une discussion complexe sans effort excessif." },
  C1: { name: "Autonome", desc: "Tu t'exprimes avec aisance et précision, à l'écrit comme à l'oral." },
  C2: { name: "Maîtrise", desc: "Tu nuances, tu joues avec les registres comme un locuteur cultivé." }
};
const LS_KEY = "ehub_v2";
const STANDALONE = !!window.EHUB_STANDALONE; // set by the website build (GitHub Pages / Vercel), absent in the Claude artifact
const CLAUDE_URL = "https://claude.ai/artifact/Pm9UKhwEpDLUPfKgzRcu5x";
const byId = Object.create(null); LESSONS.forEach(l => { byId[l.id] = l; });
const vById = Object.create(null); VOCAB.forEach(v => { vById[v.id] = v; });
const lvVar = l => "var(--" + String(l).toLowerCase() + ")";
const isTouch = window.matchMedia && matchMedia("(pointer: coarse)").matches;
const reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* =========================================================================
   Helpers
   ========================================================================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const rich = s => esc(s).replace(/&lt;(\/?)(b|em)&gt;/g, "<$1$2>").replace(/&lt;br\s*\/?&gt;/g, "<br>");
const plain = s => String(s == null ? "" : s).replace(/<[^>]+>/g, "");
const qhtml = q => rich(q).replace("___", '<span class="blank" aria-label="blanc">&nbsp;</span>');
const pad = n => String(n).padStart(2, "0");
const dayKey = (d = new Date()) => d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
const parseKey = k => { const p = k.split("-").map(Number); return new Date(p[0], p[1] - 1, p[2], 12); };
const addDays = (k, n) => { const d = parseKey(k); d.setDate(d.getDate() + n); return dayKey(d); };
const daysBetween = (a, b) => Math.round((parseKey(b) - parseKey(a)) / 86400000);
const hashStr = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
const plural = (n, w, ws) => n + " " + (n > 1 ? (ws || w + "s") : w);
const norm = s => String(s || "").toLowerCase()
  .replace(/[’‘`´]/g, "'").replace(/[“”«»"]/g, "")
  .replace(/[.,!?;:()—–]/g, " ").replace(/\s+/g, " ").trim();
const countWords = s => (String(s).trim().match(/\S+/g) || []).length;
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej("timeout"), ms))]);
const fullSentence = e => {
  if (e.type === "order") return e.answer;
  const ans = e.type === "mcq" ? e.options[e.answer] : e.answer[0];
  return plain(e.q).replace(/\s*\([^)]*\)/g, "").replace("___", ans).replace(/\s+/g, " ").trim();
};
const correctText = e => e.type === "mcq" ? e.options[e.answer] : e.type === "type" ? e.answer[0] : e.answer;

const ICONS = {
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  route: '<circle cx="6" cy="18" r="2.2"/><circle cx="18" cy="6" r="2.2"/><path d="M8.2 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.8"/>',
  cards: '<rect x="3" y="7" width="13" height="13" rx="2"/><path d="M7 7V5.5A2.5 2.5 0 0 1 9.5 3H19a2 2 0 0 1 2 2v9.5a2.5 2.5 0 0 1-2.5 2.5H16"/>',
  book: '<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/><path d="M9 7.5h6"/>',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>',
  flame: '<path d="M12 3c.8 3.6 4.8 5.3 4.8 10.2A4.8 4.8 0 0 1 12 18a4.8 4.8 0 0 1-4.8-4.8c0-2.4 1.3-3.6 2-5 .9 1.3 1.6 2 1.6 2S9.9 6.8 12 3z"/><path d="M8 21h8"/>',
  speaker: '<path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  redo: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  stop: '<rect x="6.5" y="6.5" width="11" height="11" rx="2"/>',
  pen: '<path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14.5 7.5l3 3"/>',
  ear: '<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
  ask: '<path d="M4 5h16v11H9l-5 4z"/><path d="M10 9.2a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.3M12 14h.01"/>',
  chev: '<path d="M9 6l6 6-6 6"/>',
  slow: '<circle cx="12" cy="13" r="7.5"/><path d="M12 13V9M10 3h4"/>'
};
const icon = (n, cls) => '<svg class="ic' + (cls ? " " + cls : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[n] || "") + "</svg>";
const sayBtn = (text, label) => '<button class="say" type="button" data-act="say" data-text="' + esc(plain(text)) + '" aria-label="' + esc(label || "Écouter") + '">' + icon("speaker") + "</button>";

/* =========================================================================
   State and saving
   ========================================================================= */
function blank() {
  return { v: 2, updatedAt: 0, startLevel: "A2", goal: 60, rate: 1, xp: 0, days: {}, lessons: {}, vocab: {}, cards: {}, writing: [], migrated: false, welcomed: false };
}
const SYNC_TEXT = {
  local: "Ta progression est enregistrée dans ce navigateur.",
  connecting: "Connexion à ton compte Claude…",
  account: "Ta progression est enregistrée sur ton compte Claude : tu la retrouves sur tous tes appareils.",
  slow: "Ton compte ne répond pas encore : ta progression est gardée dans ce navigateur en attendant.",
  error: "La dernière sauvegarde sur ton compte a échoué. Ta progression reste dans ce navigateur et sera renvoyée à la prochaine action."
};
const Store = {
  s: blank(), ref: null, status: "local", busy: false, dirty: false, timer: 0,
  load() {
    try { const raw = localStorage.getItem(LS_KEY); if (raw) this.s = Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* storage blocked */ }
    if (!this.s.migrated) {
      try { const old = parseInt(localStorage.getItem("eh_xp") || "0", 10); if (old > 0) this.s.xp += old; } catch (e) { /* ignore */ }
      this.s.migrated = true;
    }
  },
  local() { try { localStorage.setItem(LS_KEY, JSON.stringify(this.s)); } catch (e) { /* ignore */ } },
  change() {
    this.s.updatedAt = Date.now();
    const keys = Object.keys(this.s.days).sort();
    if (keys.length > 400) keys.slice(0, keys.length - 400).forEach(k => { delete this.s.days[k]; });
    if (this.s.writing.length > 12) this.s.writing.length = 12;
    this.local();
    if (this.ref) { clearTimeout(this.timer); this.timer = setTimeout(() => this.flush(), 1500); }
  },
  async flush() {
    if (!this.ref) return;
    if (this.busy) { this.dirty = true; return; }
    this.busy = true; this.dirty = false;
    try {
      await this.ref.set(JSON.parse(JSON.stringify(this.s)));
      this.setStatus("account");
    } catch (e) {
      const c = e && e.code;
      if (c === "unavailable" || c === "resource_exhausted") { this.setStatus("error"); clearTimeout(this.timer); this.timer = setTimeout(() => this.flush(), 8000); }
      else { this.ref = null; this.setStatus(c === "quota_exceeded" ? "error" : "local"); }
    }
    this.busy = false;
    if (this.dirty) this.flush();
  },
  setStatus(st) { this.status = st; const el = $("#sync-state"); if (el) el.textContent = SYNC_TEXT[st] || ""; },
  async connect() {
    const C = window.claude;
    if (!C || typeof C.use !== "function") return;
    this.setStatus("connecting");
    let db = null, user = null;
    try { const r = await Promise.all([C.use("db"), C.use("user")]); db = r[0]; user = r[1]; } catch (e) { /* absent */ }
    if (!db || !user) { this.setStatus("local"); return; }
    let uid = null;
    try { uid = await user.id(); } catch (e) { uid = null; }
    if (!uid) { this.setStatus("local"); return; }
    try { this.ref = db.doc("data/users/" + uid + "/progress"); } catch (e) { this.setStatus("local"); return; }
    await this.pull(true);
  },
  async pull(first) {
    if (!this.ref) return;
    let snap;
    try { snap = await withTimeout(this.ref.get(), 10000); }
    catch (e) {
      if (e === "timeout") { if (first) this.setStatus("slow"); return; }
      if (e && e.code === "unavailable") { if (first) this.setStatus("slow"); return; }
      this.ref = null; this.setStatus("local"); return;
    }
    const remote = snap.exists ? snap.data() : null;
    const rT = remote ? (remote.updatedAt || 0) : -1;
    if (remote && rT > (this.s.updatedAt || 0)) {
      this.s = Object.assign(blank(), JSON.parse(JSON.stringify(remote)));
      this.local(); this.setStatus("account"); onRemoteState();
    } else {
      this.setStatus("account");
      if ((this.s.updatedAt || 0) > rT && this.s.updatedAt > 0) this.flush();
    }
  }
};
const S = () => Store.s;

function todayRec() { return S().days[dayKey()] || { xp: 0, l: 0, r: 0, p: 0, v: 0 }; }
function bump(kind, n) { const k = dayKey(); const d = S().days[k] || (S().days[k] = { xp: 0, l: 0, r: 0, p: 0, v: 0 }); d[kind] = (d[kind] || 0) + (n || 1); }
function addXP(n, silent) {
  const k = dayKey();
  const d = S().days[k] || (S().days[k] = { xp: 0, l: 0, r: 0, p: 0, v: 0 });
  const before = d.xp;
  d.xp += n; S().xp += n;
  Store.change(); updateHeader();
  if (!silent) toast("+" + n + " XP");
  if (before < S().goal && d.xp >= S().goal) setTimeout(() => toast("Objectif du jour atteint"), silent ? 300 : 1500);
}
function streak() {
  const days = S().days; let k = dayKey(), n = 0;
  if (!(days[k] && days[k].xp > 0)) k = addDays(k, -1);
  while (days[k] && days[k].xp > 0) { n++; k = addDays(k, -1); }
  return n;
}
function bestStreak() {
  const keys = Object.keys(S().days).filter(k => S().days[k].xp > 0).sort();
  let best = 0, run = 0, prev = null;
  keys.forEach(k => { run = prev && daysBetween(prev, k) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = k; });
  return best;
}

/* ---------- levels ---------- */
function levelStats(L) {
  const ls = LESSONS.filter(x => x.level === L), vs = VOCAB.filter(x => x.level === L);
  const ld = ls.filter(x => S().lessons[x.id]).length, vd = vs.filter(x => S().vocab[x.id]).length;
  const tot = ls.length + vs.length;
  return { ls, vs, ld, vd, tot, pct: tot ? Math.round(100 * (ld + vd) / tot) : 0 };
}
function activeLevels() { return LEVELS.slice(Math.max(0, LEVELS.indexOf(S().startLevel))); }
function currentLevel() { for (const L of activeLevels()) if (levelStats(L).pct < 80) return L; return "C2"; }
function nextLesson() {
  const lv = activeLevels();
  return LESSONS.find(l => lv.includes(l.level) && !S().lessons[l.id])
    || LESSONS.find(l => lv.includes(l.level) && S().lessons[l.id] && S().lessons[l.id].best < 5) || null;
}
function nextAfter(L) {
  const i = LESSONS.indexOf(L);
  return LESSONS.slice(i + 1).find(l => !S().lessons[l.id]) || LESSONS[i + 1] || null;
}
function nextVocab() { const lv = activeLevels(); return VOCAB.find(v => lv.includes(v.level) && !S().vocab[v.id]) || null; }
function weeksLeft() {
  const now = new Date(); let end = new Date(now.getFullYear(), 5, 30, 23);
  if (now > end) end = new Date(now.getFullYear() + 1, 5, 30, 23);
  return Math.max(0, Math.ceil((end - now) / (7 * 86400000)));
}

/* ---------- spaced repetition (Leitner boxes) ---------- */
const IV = [1, 2, 4, 8, 16, 32, 64];
function addCard(key, reset) {
  const c = S().cards[key];
  if (!c) S().cards[key] = { b: 0, d: addDays(dayKey(), 1) };
  else if (reset) { c.b = 0; c.d = addDays(dayKey(), 1); }
}
function nextInterval(c, q) { if (q === 0) return 1; if (q === 1) return Math.max(1, Math.round(IV[c.b] / 2)); return IV[Math.min(6, c.b + 1)]; }
function gradeCard(key, q) {
  const c = S().cards[key]; if (!c) return;
  const n = nextInterval(c, q);
  if (q === 0) c.b = 0; else if (q === 2) c.b = Math.min(6, c.b + 1);
  c.d = addDays(dayKey(), n);
}
function dueKeys() { const t = dayKey(); return Object.keys(S().cards).filter(k => S().cards[k].d <= t && cardData(k)); }
const fmtDays = n => n === 1 ? "demain" : n < 31 ? "dans " + n + " j" : "dans " + Math.round(n / 30) + " mois";
function cardData(key) {
  const p = key.split("|"), t = p[0], a = p[1], b = +p[2];
  if (t === "L") { const L = byId[a]; const c = L && L.cards[b]; return c ? { front: c.fr, back: c.en, say: c.en, tag: L.level + " · " + L.title, level: L.level } : null; }
  if (t === "V") { const V = vById[a]; const w = V && V.words[b]; return w ? { front: w.fr, hint: w.pos, back: w.en, say: w.en, extra: w.ex, extraFr: w.exFr, tag: V.level + " · " + V.title, level: V.level } : null; }
  if (t === "M") {
    const L = byId[a]; const e = L && L.exercises[b]; if (!e) return null;
    const front = e.type === "order" ? e.fr : e.q;
    return { front, back: fullSentence(e), say: fullSentence(e), extra: e.why, tag: "Erreur à corriger · " + L.title, level: L.level, mistake: true, frontRich: e.type !== "order" };
  }
  if (t === "X") {
    const it = (X[a] || [])[b]; if (!it) return null;
    if (a === "phrasal") return { front: it.fr, back: it.v, say: it.v + ". " + it.ex, extra: it.ex, tag: "Verbe à particule · " + it.level, level: it.level };
    if (a === "idioms") return { front: it.fr, back: it.en, say: it.en, extra: it.ex, tag: "Expression · " + it.level, level: it.level };
    if (a === "falseFriends") return { front: "Que veut dire « " + it.en + " » ?", back: it.means, say: it.en, extra: "Piège : " + it.trap + ". " + it.ex, tag: "Faux ami" };
    if (a === "daily") return { front: it.fr, back: it.en, say: it.en, extra: it.ex, tag: "Expression du quotidien" };
  }
  return null;
}

/* =========================================================================
   Audio (text to speech), dictation, Claude
   ========================================================================= */
const Voice = {
  mode: ("speechSynthesis" in window) ? "web" : null, tts: null, btn: null,
  async init() {
    const C = window.claude;
    if (C && typeof C.use === "function") {
      try {
        const t = await C.use("tts");
        if (t) {
          this.tts = t; this.mode = "tts";
          t.onState(e => { if (e.state === "idle" && e.reason !== "replaced") this.clear(); });
          if (t.setRate) t.setRate(S().rate || 1).catch(() => {});
        }
      } catch (e) { /* keep web speech */ }
    }
    this.apply();
  },
  apply() { document.documentElement.classList.toggle("no-audio", !this.mode); },
  clear() { if (this.btn) this.btn.classList.remove("playing"); this.btn = null; },
  stop() {
    if (this.mode === "tts" && this.tts) this.tts.stop().catch(() => {});
    else if (this.mode === "web") { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
    this.clear();
  },
  fail(e) {
    const c = e && e.code;
    if (c === "not_granted" || c === "unavailable") { this.mode = null; this.apply(); toast("La lecture audio est désactivée pour cette page."); }
    else if (c === "rate_limited") toast("Beaucoup de lectures d'affilée : réessaie dans un instant.");
    else if (c === "busy") toast("Termine d'abord ce qui est en cours.");
  },
  say(text, btn, rate) {
    if (!this.mode || !text) return;
    if (btn && this.btn === btn) { this.stop(); return; }
    if (this.mode === "web") { try { speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
    this.clear();
    if (btn) { btn.classList.add("playing"); this.btn = btn; }
    const r = Math.min(1.5, Math.max(0.7, rate || S().rate || 1));
    const txt = plain(text).slice(0, 1900);
    if (this.mode === "tts") {
      this.tts.speak(txt, { language: "en", rate: r }).catch(e => this.fail(e)).finally(() => { if (this.btn === btn) this.clear(); });
    } else {
      try {
        const u = new SpeechSynthesisUtterance(txt); u.lang = "en-GB"; u.rate = r;
        const v = this.voice(); if (v) u.voice = v;
        u.onend = u.onerror = () => { if (this.btn === btn) this.clear(); };
        speechSynthesis.speak(u);
      } catch (e) { this.clear(); }
    }
  },
  sayAll(texts, btn) {
    if (!this.mode || !texts.length) return;
    if (btn && this.btn === btn) { this.stop(); return; }
    this.clear();
    if (btn) { btn.classList.add("playing"); this.btn = btn; }
    const r = Math.min(1.5, Math.max(0.7, S().rate || 1));
    const lines = texts.slice(0, 60).map(t => ({ text: plain(t).slice(0, 1900) }));
    if (this.mode === "tts") {
      this.tts.speak(lines, { language: "en", rate: r }).catch(e => this.fail(e)).finally(() => { if (this.btn === btn) this.clear(); });
    } else {
      try {
        speechSynthesis.cancel();
        const v = this.voice();
        lines.forEach((l, i) => {
          const u = new SpeechSynthesisUtterance(l.text); u.lang = "en-GB"; u.rate = r; if (v) u.voice = v;
          if (i === lines.length - 1) u.onend = u.onerror = () => { if (this.btn === btn) this.clear(); };
          speechSynthesis.speak(u);
        });
      } catch (e) { this.clear(); }
    }
  },
  voice() { try { const vs = speechSynthesis.getVoices(); return vs.find(v => /en[-_]GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null; } catch (e) { return null; } }
};

/* Browser speech recognition (Chrome, Edge, Safari) with the same interface as Claude's dictation:
   used only on the standalone website, where the Claude capability does not exist. */
function webMic() {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  let rec = null, on = false, err = null;
  const h = { partial: [], final: [], state: [] };
  const emit = (k, v) => h[k].forEach(f => { try { f(v); } catch (e) { /* ignore */ } });
  return {
    onPartial: f => { h.partial.push(f); },
    onFinal: f => { h.final.push(f); },
    onState: f => { h.state.push(f); },
    active: () => on,
    start() {
      return new Promise((resolve, reject) => {
        try {
          err = null; rec = new SR();
          rec.lang = "en-GB"; rec.interimResults = true; rec.continuous = true; rec.maxAlternatives = 1;
          on = true; emit("state", { state: "starting" });
          rec.onstart = () => emit("state", { state: "listening" });
          rec.onresult = ev => {
            let interim = "";
            for (let i = ev.resultIndex; i < ev.results.length; i++) {
              const r = ev.results[i];
              if (r.isFinal) emit("final", { text: r[0].transcript + " " }); else interim += r[0].transcript;
            }
            emit("partial", { text: interim });
          };
          rec.onerror = ev => {
            err = (ev.error === "not-allowed" || ev.error === "service-not-allowed") ? "not_granted"
              : (ev.error === "no-speech" || ev.error === "aborted") ? "stopped" : "unavailable";
          };
          rec.onend = () => {
            on = false;
            emit("state", { state: "idle", reason: err || "stopped" });
            if (err && err !== "stopped") reject({ code: err }); else resolve();
          };
          rec.start();
        } catch (e) { on = false; reject({ code: "unavailable" }); }
      });
    },
    stop() { if (rec && on) { emit("state", { state: "finishing" }); try { rec.stop(); } catch (e) { /* ignore */ } } return Promise.resolve(); }
  };
}
const MIC_DENIED = STANDALONE
  ? "Le micro est refusé : autorise-le pour ce site dans les réglages de ton navigateur."
  : "Le micro est refusé pour cette page. Tu peux le réautoriser dans le menu Autorisations de l'artefact.";

const Mic = {
  d: null,
  async init() {
    const C = window.claude;
    if (STANDALONE) this.d = webMic();
    else if (C && typeof C.use === "function") { try { this.d = await C.use("dictation"); } catch (e) { this.d = null; } }
    if (this.d) {
      this.d.onPartial(e => { if (P) { P.partial = e.text; micLive(); } });
      this.d.onFinal(e => { if (P) { P.heard += e.text; P.partial = ""; micLive(); } });
      this.d.onState(e => {
        if (!P) return;
        P.state = e.state; micUI();
        if (e.state === "idle") {
          if (e.reason === "not_granted") { P.msg = MIC_DENIED; }
          if (P.heard.trim() && !P.evaluated) evalPron(); else micUI();
        }
      });
    }
    if (current.name === "pratique") renderPractice();
  }
};

const Coach = {
  s: null, blocked: false,
  async init() {
    const C = window.claude;
    if (C && typeof C.use === "function") { try { this.s = await C.use("sample"); } catch (e) { this.s = null; } }
    if (current.name === "pratique") renderPractice();
  },
  ok() { return !!this.s && !this.blocked; },
  err(e) {
    const c = e && e.code;
    if (c === "cancelled") return "";
    if (["not_granted", "sampling_disabled", "not_declared", "capability_disabled", "capability_removed"].includes(c)) {
      this.blocked = true;
      return "Claude n'est pas autorisé sur cette page pour l'instant. Tu peux l'activer depuis le menu Autorisations de l'artefact.";
    }
    if (c === "rate_limited") return "Beaucoup de demandes en peu de temps : réessaie dans quelques minutes.";
    if (c === "session_expired") return "Ta session Claude a expiré : reconnecte-toi puis réessaie.";
    if (c === "invalid_json") return "La correction est arrivée dans un format illisible. Réessaie.";
    if (c === "refused") return "Claude n'a pas pu traiter ce texte. Reformule-le et réessaie.";
    if (c === "prompt_too_large") return "Ton texte est trop long : raccourcis-le.";
    return "La demande n'a pas abouti (connexion). Réessaie dans un instant.";
  }
};

/* =========================================================================
   Toast, header, navigation
   ========================================================================= */
let toastT = 0;
function toast(msg) {
  const t = $("#toast"); if (!t) return;
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2000);
}
const NAV = [
  ["aujourdhui", "Aujourd'hui", "home"],
  ["parcours", "Parcours", "route"],
  ["revisions", "Révisions", "cards"],
  ["vocabulaire", "Vocabulaire", "book"],
  ["pratique", "Pratique", "mic"],
  ["memo", "Mémo", "table"]
];
function buildNav() {
  const html = NAV.map(n => '<a href="#' + n[0] + '" data-nav="' + n[0] + '">' + icon(n[2]) + "<span>" + n[1] + "</span>" + (n[0] === "revisions" ? '<span class="badge" data-due hidden></span>' : "") + "</a>").join("");
  $("#nav").innerHTML = html; $("#tabbar").innerHTML = html;
  $("#st-plan").innerHTML = icon("target") + '<span class="plan-txt">Mon plan</span>';
}
function updateNav() {
  const sec = current.name === "lesson" ? "parcours" : current.name === "vset" ? "vocabulaire" : current.name;
  $$("[data-nav]").forEach(a => { if (a.dataset.nav === sec) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current"); });
  const pl = $("#st-plan"); if (pl) { if (sec === "plan") pl.setAttribute("aria-current", "page"); else pl.removeAttribute("aria-current"); }
}
function updateHeader() {
  const st = streak();
  const f = $("#st-streak");
  f.innerHTML = icon("flame") + st; f.classList.toggle("off", st === 0);
  f.title = st ? plural(st, "jour") + " d'affilée" : "Fais une activité aujourd'hui pour lancer ta série";
  $("#st-xp").textContent = todayRec().xp + " / " + S().goal + " XP";
  const due = dueKeys().length;
  $$("[data-due]").forEach(b => { b.hidden = !due; b.textContent = due > 99 ? "99+" : String(due); });
}

/* =========================================================================
   Router
   ========================================================================= */
let current = { name: "aujourdhui", param: null };
const VIEWS = {};
function route() {
  const h = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (byId[h]) current = { name: "lesson", param: h };
  else if (vById[h]) current = { name: "vset", param: h };
  else if (VIEWS[h]) current = { name: h, param: null };
  else current = { name: "aujourdhui", param: null };
  Voice.stop();
  render(true);
}
function render(top) {
  const main = $("#main");
  main.classList.toggle("wide", current.name === "memo");
  let html = "";
  if (current.name === "lesson") { const L = byId[current.param]; if (!Run || Run.id !== L.id) startRun(L.id); html = viewLesson(L); }
  else if (current.name === "vset") html = viewVocabSet(vById[current.param]);
  else html = VIEWS[current.name]();
  main.innerHTML = html;
  if (current.name === "lesson") renderEx();
  if (current.name === "revisions" && Rev && !Rev.done) renderRev();
  if (current.name === "pratique") renderPractice();
  if (current.name === "vset" && VQ && VQ.id === current.param) renderVQ();
  updateNav(); updateHeader();
  if (top) window.scrollTo(0, 0);
}
function onRemoteState() {
  if (["aujourdhui", "parcours", "plan", "vocabulaire", "memo"].includes(current.name)) render(false);
  else updateHeader();
}

/* =========================================================================
   Shared fragments
   ========================================================================= */
function metro() {
  const cur = currentLevel();
  return '<div class="metro" role="list" aria-label="Progression par niveau">' + LEVELS.map((L, i) => {
    const st = levelStats(L);
    const prevPct = i ? levelStats(LEVELS[i - 1]).pct : 0;
    const cls = (L === cur ? " here" : "") + (st.pct >= 80 ? " done" : "");
    const style = "--lv:" + lvVar(L) + ";--pp:" + Math.min(100, Math.round(prevPct / 0.8)) + "%";
    return '<a role="listitem" class="stop' + cls + '" href="#parcours" data-act="openLevel" data-level="' + L + '" style="' + style + '">'
      + (i ? '<span class="fill" style="background:' + lvVar(LEVELS[i - 1]) + '"></span>' : "")
      + '<span class="dot"></span><span class="code">' + L + '</span><span class="pct">' + st.pct + "%</span></a>";
  }).join("") + "</div>";
}
function pageHead(eyebrow, title, lead) {
  return '<header class="lesson-head"><p class="eyebrow">' + eyebrow + "</p><h1>" + title + "</h1>" + (lead ? '<p class="muted" style="max-width:68ch">' + lead + "</p>" : "") + "</header>";
}
function table(head, rows, opts) {
  opts = opts || {};
  return '<div class="tbl-wrap"><table class="tbl">' + (opts.caption ? "<caption>" + esc(opts.caption) + "</caption>" : "")
    + "<thead><tr>" + head.map(h => "<th>" + esc(h) + "</th>").join("") + (opts.say != null ? '<th class="needs-audio"><span class="sr">Écouter</span></th>' : "") + "</tr></thead>"
    + "<tbody" + (opts.bodyId ? ' id="' + opts.bodyId + '"' : "") + ">" + rows.map((r, ri) => "<tr" + (opts.rowAttr ? opts.rowAttr(r, ri) : "") + ">" + r.map((c, ci) => '<td class="' + (opts.cls && opts.cls[ci] || "") + '">' + rich(c) + "</td>").join("")
    + (opts.say != null ? '<td class="needs-audio">' + sayBtn(typeof opts.say === "function" ? opts.say(r) : r[opts.say]) + "</td>" : "") + "</tr>").join("") + "</tbody></table></div>";
}

/* =========================================================================
   View: today
   ========================================================================= */
function practiceOfDay() {
  const opts = [];
  if (Voice.mode && (X.dictation || []).length) opts.push({ tab: "dictee", title: "Dictée : écoute et écris", sub: "Trois phrases de ton niveau, à l'oreille." });
  if (Voice.mode && (X.speaking || []).length) opts.push({ tab: "prononciation", title: "Prononciation : répète après le modèle", sub: Mic.d ? "Parle, l'appli vérifie ce qu'elle entend." : "Écoute, répète trois fois en même temps (shadowing)." });
  if ((X.writing || []).length) opts.push({ tab: "ecriture", title: "Écriture : un court texte", sub: Coach.ok() ? "Corrigé et expliqué par Claude." : "Avec la grille de relecture." });
  if (!opts.length) return { tab: "ecriture", title: "Pratique", sub: "" };
  return opts[hashStr(dayKey()) % opts.length];
}
VIEWS.aujourdhui = function () {
  const s = S(), t = todayRec(), L = currentLevel(), nl = nextLesson(), nv = nextVocab();
  const due = dueKeys().length, hasCards = Object.keys(s.cards).length > 0;
  const pct = Math.min(100, Math.round(100 * t.xp / s.goal));
  const C = 2 * Math.PI * 46;
  const hour = new Date().getHours();
  const hello = hour < 5 || hour >= 18 ? "Bonsoir" : "Bonjour";
  const date = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  const steps = [];
  steps.push(nl
    ? { done: t.l > 0, title: nl.title, sub: nl.level + " · " + nl.fr + " · " + nl.minutes + " min", href: "#" + nl.id, cta: t.l > 0 ? "Encore une" : "Commencer", label: "Leçon" }
    : { done: true, title: "Toutes les leçons sont faites", sub: "Refais celles où ton score est le plus bas.", href: "#parcours", cta: "Parcours", label: "Leçon" });
  if (!hasCards) {
    steps.push(nv
      ? { done: t.v > 0, title: "Apprends ta première liste de mots", sub: nv.level + " · " + nv.title + " · 14 mots", href: "#" + nv.id, cta: "Ouvrir", label: "Vocabulaire" }
      : { done: true, title: "Vocabulaire", sub: "", href: "#vocabulaire", cta: "Voir", label: "Vocabulaire" });
  } else {
    steps.push(due
      ? { done: false, title: plural(due, "carte") + " à revoir", sub: "Répétition espacée : cinq minutes suffisent.", href: "#revisions", cta: "Réviser", label: "Révisions" }
      : { done: true, title: "Révisions à jour", sub: nv ? "Pour aller plus loin : la liste « " + nv.title + " »." : "Reviens demain pour la suite.", href: nv ? "#" + nv.id : "#revisions", cta: nv ? "Vocabulaire" : "Voir", label: "Révisions" });
  }
  const pr = practiceOfDay();
  steps.push({ done: t.p > 0, title: pr.title, sub: pr.sub, href: "#pratique", cta: "Pratiquer", label: "Pratique", tab: pr.tab });
  const allDone = steps.every(x => x.done);

  const daily = X.daily || [], ff = X.falseFriends || [];
  const dd = daily.length ? daily[hashStr(dayKey()) % daily.length] : null;
  const fd = ff.length ? ff[(hashStr(dayKey()) + 7) % ff.length] : null;

  const week = [];
  for (let i = 6; i >= 0; i--) {
    const k = addDays(dayKey(), -i), d = s.days[k], xp = d ? d.xp : 0;
    const letter = ["D", "L", "M", "M", "J", "V", "S"][parseKey(k).getDay()];
    week.push('<div class="bar' + (i === 0 ? " today" : "") + '" title="' + xp + ' XP"><div class="col' + (xp >= s.goal ? " met" : "") + '"><i style="height:' + Math.min(100, Math.round(100 * xp / s.goal)) + '%"></i></div><span class="d">' + letter + "</span></div>");
  }
  const st = streak();

  const welcome = (!s.welcomed && s.xp === 0) ? '<section class="card welcome"><div class="card-head"><h2>Bienvenue</h2></div>'
    + '<div class="prose"><p>Chaque jour, ta <b>mission</b> tient en trois étapes : une leçon, tes révisions, une activité de pratique. Compte 30 à 45 minutes. Ta série de jours et ta ligne de progression A2 → C2 avancent à chaque activité.</p>'
    + '<p>Tu as dit être au niveau A2 : c\'est le point de départ choisi. Tu peux le changer ici ou plus tard dans « Mon plan ».</p></div>'
    + '<div class="row" style="margin-top:14px"><label for="welcome-level" class="muted">Je commence au niveau</label><select class="field" id="welcome-level" data-set="startLevel">' + LEVELS.map(l => '<option value="' + l + '"' + (l === s.startLevel ? " selected" : "") + ">" + l + " · " + LEVEL_INFO[l].name + "</option>").join("") + '</select><button class="btn" data-act="welcomeDone">C\'est parti</button></div></section>' : "";

  return '<section class="today-hero"><div><p class="eyebrow">' + esc(date) + "</p><h1>" + hello + "</h1>"
    + '<p class="lead">Niveau en cours : <b>' + L + " · " + LEVEL_INFO[L].name + "</b>. " + plural(weeksLeft(), "semaine") + " avant fin juin.</p></div>"
    + '<div class="ring' + (pct >= 100 ? " full" : "") + '" role="img" aria-label="' + t.xp + " XP sur " + s.goal + '"><svg viewBox="0 0 112 112"><circle class="bg" cx="56" cy="56" r="46"/><circle class="fg" cx="56" cy="56" r="46" stroke-dasharray="' + C.toFixed(1) + '" stroke-dashoffset="' + (C * (1 - pct / 100)).toFixed(1) + '"/></svg><div class="lbl"><b>' + t.xp + "</b><span>/ " + s.goal + " XP</span></div></div></section>"
    + welcome
    + metro()
    + '<section class="mission"><div class="card-head"><h2>Mission du jour</h2><span class="muted small">' + steps.filter(x => x.done).length + " / 3</span></div><ol>"
    + steps.map((x, i) => '<li class="step' + (x.done ? " done" : "") + '"><span class="num">' + (x.done ? icon("check") : i + 1) + '</span><span class="what"><span class="eyebrow">' + x.label + "</span><b>" + esc(x.title) + '</b><span class="muted">' + esc(x.sub) + '</span></span><a class="btn ' + (x.done ? "ghost" : "") + ' small go" href="' + x.href + '"' + (x.tab ? ' data-act="setPractice" data-tab="' + x.tab + '"' : "") + ">" + x.cta + "</a></li>").join("")
    + "</ol>" + (allDone ? '<p class="mission-done">Journée validée. Reviens demain pour garder ta série.</p>' : "") + "</section>"
    + '<div class="grid-2">'
    + (dd ? '<section class="card"><p class="eyebrow">Expression du jour</p><p class="quote-en" style="margin-top:10px"><span>' + esc(dd.en) + "</span>" + sayBtn(dd.en + " " + dd.ex) + '</p><p class="muted" style="margin-top:4px">' + esc(dd.fr) + '</p><p style="margin-top:12px"><em>' + esc(dd.ex) + '</em></p><p class="small muted" style="margin-top:8px">' + esc(dd.note) + "</p></section>" : "")
    + '<section class="card"><div class="card-head" style="margin-bottom:4px"><p class="eyebrow">Ta semaine</p><span class="small muted">' + (st ? plural(st, "jour") + " d'affilée" : "Lance ta série aujourd'hui") + '</span></div><div class="week">' + week.join("") + '</div><p class="small muted" style="margin-top:10px">Record : ' + plural(bestStreak(), "jour") + " · " + s.xp + " XP au total</p></section>"
    + (fd ? '<section class="card"><p class="eyebrow">Faux ami du jour</p><p class="quote-en" style="margin-top:10px"><span>' + esc(fd.en) + "</span>" + sayBtn(fd.en + ". " + fd.ex) + '</p><p style="margin-top:6px">= <b>' + esc(fd.means) + '</b></p><p class="small" style="margin-top:6px;color:var(--bad)">Piège : ' + esc(fd.trap) + '</p><p class="small muted" style="margin-top:8px"><em>' + esc(fd.ex) + "</em></p></section>" : "")
    + "</div>"
    + '<p class="small muted" id="sync-state">' + esc(SYNC_TEXT[Store.status]) + "</p>";
};

/* =========================================================================
   View: path
   ========================================================================= */
let openLevelPref = null;
VIEWS.parcours = function () {
  const open = openLevelPref || currentLevel(); openLevelPref = null;
  return pageHead("Parcours A2 → C2", "Ton parcours",
    "Avance dans l'ordre, une leçon par jour suffit. Une leçon est validée à 4/6 ; en dessous, elle reste marquée « à revoir ». Les leçons A2 et B1 indiquent les unités correspondantes de ton livre <em>Essential Grammar in Use</em>.")
    + metro() + LEVELS.map(L => levelBlock(L, L === open)).join("");
};
function levelBlock(L, open) {
  const st = levelStats(L);
  const mods = [];
  st.ls.forEach(l => { let m = mods.find(x => x.name === l.module); if (!m) mods.push(m = { name: l.module, items: [] }); m.items.push(l); });
  const body = mods.length ? mods.map(m => '<div class="module"><h3>' + esc(m.name) + "</h3>" + m.items.map(lrow).join("") + "</div>").join("") : '<p class="muted">Les leçons de ce niveau arrivent bientôt.</p>';
  return '<details class="level-block" style="--lv:' + lvVar(L) + '" id="lvl-' + L + '"' + (open ? " open" : "") + "><summary>"
    + '<span class="big">' + L + "</span><span><b>" + LEVEL_INFO[L].name + '</b> <span class="muted small">· ' + st.ld + "/" + st.ls.length + " leçons · " + st.vd + "/" + st.vs.length + ' listes</span><br><span class="muted small">' + LEVEL_INFO[L].desc + '</span><span class="bar" style="display:block"><i style="width:' + st.pct + '%"></i></span></span>'
    + icon("chev", "chev") + '</summary><div class="level-body">' + body
    + (st.vs.length ? '<div class="module"><h3>Vocabulaire</h3><div class="vchips">' + st.vs.map(v => '<a class="vchip' + (S().vocab[v.id] ? " done" : "") + '" href="#' + v.id + '">' + (S().vocab[v.id] ? icon("check") : "") + esc(v.title) + "</a>").join("") + "</div></div>" : "")
    + "</div></details>";
}
function lrow(l) {
  const r = S().lessons[l.id];
  const ok = r && r.best >= 4;
  return '<a class="lrow" href="#' + l.id + '"><span class="st ' + (r ? (ok ? "done" : "redo") : "") + '" aria-label="' + (r ? (ok ? "Validée" : "À revoir") : "Pas commencée") + '">' + (r ? icon(ok ? "check" : "redo") : "") + "</span>"
    + '<span class="t"><b>' + esc(l.title) + "</b><span>" + esc(l.fr) + "</span>" + (l.murphy ? '<br><span class="tag-book">Livre : ' + esc(l.murphy) + "</span>" : "") + "</span>"
    + '<span class="meta">' + (r ? r.best + "/6" : l.minutes + " min") + "</span></a>";
}

/* =========================================================================
   View: lesson
   ========================================================================= */
let Run = null;
function startRun(id) { Run = { id, i: 0, score: 0, res: [], wrong: [], answered: false, pool: [], picked: [], poolFor: -1, xp: 0, retake: !!S().lessons[id], finished: false }; }
function viewLesson(L) {
  const r = S().lessons[L.id];
  let n = 0;
  const sec = (id, title, inner) => '<section class="sec" id="' + id + '"><div class="sec-title"><span class="n">' + (++n) + "</span><h2>" + title + "</h2></div>" + inner + "</section>";
  const jump = [["sec-intro", "Comprendre"], ["sec-forme", "Forme"], ["sec-quand", "Quand"], ["sec-exemples", "Exemples"], ["sec-pieges", "Pièges"], ["sec-exos", "Exercices"]];
  const intro = '<div class="prose">' + L.intro.map(p => "<p>" + rich(p) + "</p>").join("") + "</div>";
  const forme = '<div class="formulas">' + L.formulas.map(f => '<div class="formula"><div class="k">' + rich(f.label) + '</div><div class="v">' + rich(f.value) + "</div></div>").join("") + "</div>"
    + (L.murphy ? '<div class="book">' + icon("book") + '<div><b>Dans ton livre : ' + esc(L.murphy) + "</b><br><span class=\"small\">Après cette leçon, fais les exercices de la page de droite de ces unités, puis vérifie avec le corrigé (Key to Exercises, p. 283).</span></div></div>" : "");
  const quand = '<div class="uses">' + L.uses.map(u => '<div class="use"><h3>' + rich(u.title) + '</h3><p class="d">' + rich(u.desc) + '</p><div class="ex"><span class="en">' + rich(u.en) + "</span>" + sayBtn(u.en) + '<span class="fr">' + rich(u.fr) + "</span></div></div>").join("") + "</div>";
  const exemples = '<div class="row"><button class="btn soft small needs-audio" data-act="sayAllEx">' + icon("speaker") + ' Écouter tous les exemples</button><span class="small muted">Lis à voix haute après chaque phrase.</span></div>'
    + '<div class="examples">' + L.examples.map(e => '<div class="exr"><span class="en">' + rich(e.en) + "</span>" + sayBtn(e.en) + '<span class="fr">' + rich(e.fr) + "</span>" + (e.note ? '<span class="note">' + rich(e.note) + "</span>" : "") + "</div>").join("") + "</div>"
    + (L.table ? table(L.table.head, L.table.rows, { caption: L.table.caption }) : "");
  const cmp = L.compare ? '<section class="sec"><h2>' + rich(L.compare.title) + '</h2><div class="compare">' + [L.compare.a, L.compare.b].map(sd => '<div class="side"><h3>' + rich(sd.label) + "</h3><ul>" + sd.points.map(p => "<li>" + rich(p) + "</li>").join("") + "</ul></div>").join("") + "</div></section>" : "";
  const pieges = '<div class="errors">' + L.errors.map(e => '<div class="err"><span class="bad">' + rich(e.bad) + '</span><span class="good">' + rich(e.good) + '</span><span class="why">' + rich(e.why) + "</span></div>").join("") + "</div>"
    + '<div class="tip"><b>Astuce</b><span>' + rich(L.tip) + "</span></div>";

  return '<a class="back" href="#parcours">' + icon("back") + " Parcours</a>"
    + '<header class="lesson-head" style="--lv:' + lvVar(L.level) + '"><p class="eyebrow"><span class="lvl">' + L.level + "</span> &nbsp;" + esc(L.module) + " · " + L.minutes + " min</p><h1>" + esc(L.title) + '</h1><p class="fr">' + esc(L.fr) + "</p>"
    + '<p class="goal"><b>Objectif :</b> ' + rich(L.goal) + "</p>"
    + '<div class="row">' + (r ? '<span class="small muted">Déjà faite ' + plural(r.n, "fois") .replace("fois" + "s", "fois") + " · meilleur score " + r.best + "/6</span>" : "") + '<button class="btn ghost small" data-act="jump" data-to="sec-exos">Je connais déjà : aux exercices ' + icon("arrow") + "</button></div></header>"
    + '<nav class="jump" aria-label="Sections de la leçon">' + jump.map(j => '<button type="button" data-act="jump" data-to="' + j[0] + '">' + j[1] + "</button>").join("") + "</nav>"
    + '<div style="--lv:' + lvVar(L.level) + ';display:grid;gap:34px">'
    + sec("sec-intro", "Comprendre", intro)
    + sec("sec-forme", "La forme", forme)
    + sec("sec-quand", "Quand l'utiliser", quand)
    + sec("sec-exemples", "Exemples", exemples)
    + cmp
    + sec("sec-pieges", "Pièges à éviter", pieges)
    + sec("sec-exos", "Entraînement", '<div class="exbox" id="exbox" aria-live="polite"></div>')
    + "</div>";
}
function renderEx() {
  const box = $("#exbox"); if (!box || !Run) return;
  const L = byId[Run.id];
  if (Run.i >= L.exercises.length) { box.innerHTML = resultHTML(L); return; }
  const e = L.exercises[Run.i];
  const prog = '<div class="ex-progress" aria-label="Question ' + (Run.i + 1) + " sur " + L.exercises.length + '">' + L.exercises.map((_, k) => '<i class="' + (k < Run.res.length ? (Run.res[k] ? "ok" : "ko") : k === Run.i ? "cur" : "") + '"></i>').join("") + "</div>";
  let body = "";
  if (e.type === "mcq") {
    body = '<p class="eyebrow">Question ' + (Run.i + 1) + " · choisis la bonne réponse</p><p class=\"q\">" + qhtml(e.q) + '</p><div class="opts">' + e.options.map((o, k) => '<button class="opt" data-act="mcq" data-k="' + k + '">' + esc(o) + "</button>").join("") + "</div>";
  } else if (e.type === "type") {
    body = '<p class="eyebrow">Question ' + (Run.i + 1) + " · écris la forme correcte</p><p class=\"q\">" + qhtml(e.q) + '</p><form class="row" data-form="type"><input class="field" id="ex-input" style="flex:1;min-width:180px" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Ta réponse" aria-label="Ta réponse"><button class="btn" type="submit">Vérifier</button></form>';
  } else {
    if (Run.poolFor !== Run.i) { Run.pool = shuffle(e.words); Run.picked = []; Run.poolFor = Run.i; }
    body = '<p class="eyebrow">Question ' + (Run.i + 1) + " · remets les mots dans l'ordre</p><p class=\"muted\">" + esc(e.fr) + '</p><div class="built" id="built" aria-label="Ta phrase"></div><div class="chips" id="wpool"></div><div class="row"><button class="btn ghost small" data-act="unpick">Effacer</button><button class="btn" data-act="checkOrder">Vérifier</button></div>';
  }
  box.innerHTML = prog + body + '<div id="fb"></div>';
  if (e.type === "order") orderUI();
  if (e.type === "type" && !isTouch) { const inp = $("#ex-input"); if (inp) inp.focus({ preventScroll: true }); }
}
function orderUI() {
  const built = $("#built"), pool = $("#wpool"); if (!built || !pool) return;
  built.innerHTML = Run.picked.map((k, n) => '<button class="wchip" data-act="unpickOne" data-n="' + n + '">' + esc(Run.pool[k]) + "</button>").join("") || '<span class="muted small">Touche les mots dans l\'ordre</span>';
  pool.innerHTML = Run.pool.map((w, k) => '<button class="wchip" data-act="pick" data-k="' + k + '"' + (Run.picked.includes(k) ? " disabled" : "") + ">" + esc(w) + "</button>").join("");
}
function exFeedback(ok) {
  const L = byId[Run.id], e = L.exercises[Run.i];
  Run.answered = true;
  Run.res.push(ok);
  if (ok) { Run.score++; const n = Run.retake ? 5 : 10; Run.xp += n; addXP(n, true); }
  else Run.wrong.push(Run.i);
  const sent = fullSentence(e);
  $("#fb").innerHTML = '<div class="feedback ' + (ok ? "ok" : "ko") + '"><b>' + (ok ? "Correct" : "Pas tout à fait") + "</b>"
    + (ok ? "" : "<span>Bonne réponse : <b>" + esc(correctText(e)) + "</b></span>")
    + "<span>" + rich(e.why) + "</span>"
    + '<div class="row" style="margin-top:8px"><button class="btn small" data-act="exNext" id="ex-next">' + (Run.i + 1 < L.exercises.length ? "Question suivante" : "Voir mon résultat") + "</button>"
    + '<button class="btn ghost small needs-audio" data-act="say" data-text="' + esc(sent) + '">' + icon("speaker") + " Écouter la phrase</button></div></div>";
  const nb = $("#ex-next"); if (nb && !isTouch) nb.focus({ preventScroll: true });
}
function finishRun(L) {
  Run.finished = true;
  const prev = S().lessons[L.id];
  S().lessons[L.id] = { best: Math.max(prev ? prev.best : 0, Run.score), last: Run.score, n: (prev ? prev.n : 0) + 1, at: dayKey() };
  L.cards.forEach((_, k) => addCard("L|" + L.id + "|" + k));
  Run.wrong.forEach(k => addCard("M|" + L.id + "|" + k, true));
  bump("l");
  const bonus = prev ? 5 : 20;
  Run.xp += bonus; addXP(bonus, true);
  toast("+" + Run.xp + " XP");
}
function resultHTML(L) {
  if (!Run.finished) finishRun(L);
  const nx = nextAfter(L);
  const msg = Run.score === 6 ? "Parfait : c'est acquis."
    : Run.score >= 4 ? "Leçon validée. Les phrases ratées reviendront dans tes révisions."
      : "Relis « Quand l'utiliser » et « Pièges », puis refais les exercices : c'est normal de se tromper au début.";
  return '<div class="result"><p class="eyebrow">Résultat</p><p class="score">' + Run.score + "/6</p><p>" + msg + '</p><p class="small muted">+' + Run.xp + " XP · 5 phrases ajoutées à tes révisions" + (Run.wrong.length ? " · " + plural(Run.wrong.length, "erreur") + " à revoir demain" : "") + "</p>"
    + (L.murphy ? '<p class="small">Pour ancrer la règle : ' + esc(L.murphy) + " dans ton livre.</p>" : "")
    + '<div class="row" style="justify-content:center">' + (nx ? '<a class="btn" href="#' + nx.id + '">Leçon suivante ' + icon("arrow") + "</a>" : "") + '<button class="btn ghost" data-act="retry">Refaire les exercices</button><a class="btn ghost" href="#aujourdhui">Accueil</a></div></div>';
}

/* =========================================================================
   View: reviews
   ========================================================================= */
let Rev = null;
VIEWS.revisions = function () {
  const head = pageHead("Répétition espacée", "Révisions", "Chaque carte revient juste avant que tu l'oublies : demain, puis dans 2, 4, 8, 16 jours… Réponds de tête (ou écris ta réponse) <b>avant</b> de retourner la carte : c'est cet effort de rappel qui fixe la mémoire.");
  if (Rev && !Rev.done) return head + '<div id="revbox"></div><p class="small muted">Raccourcis clavier : Espace pour retourner, 1 · 2 · 3 pour noter.</p>';
  const due = dueKeys();
  const total = Object.keys(S().cards).length;
  let done = "";
  if (Rev && Rev.done) done = '<section class="card"><p class="eyebrow">Session terminée</p><h2 style="margin-top:6px">' + Rev.ok + " / " + Rev.n + ' cartes sues</h2><p class="muted" style="margin-top:6px">Les cartes « À revoir » reviennent demain. Les autres s\'espacent.</p></section>';
  if (!due.length) {
    const next = Object.values(S().cards).map(c => c.d).sort()[0];
    return head + done + '<section class="card empty"><h2>Rien à revoir pour l\'instant</h2><p>' + (total ? plural(total, "carte") + " dans ton paquet. Prochaine révision : " + (next ? fmtDays(Math.max(1, daysBetween(dayKey(), next))) : "bientôt") + "." : "Ton paquet est vide : chaque leçon terminée et chaque liste de vocabulaire apprise y ajoutent des cartes.") + '</p><div class="row" style="justify-content:center"><a class="btn" href="#vocabulaire">Apprendre une liste</a><a class="btn ghost" href="#parcours">Faire une leçon</a></div></section>';
  }
  const kinds = { L: 0, V: 0, M: 0, X: 0 };
  due.forEach(k => { kinds[k[0]]++; });
  const parts = [];
  if (kinds.L) parts.push(plural(kinds.L, "phrase") + " de leçons");
  if (kinds.V) parts.push(plural(kinds.V, "mot") + " de vocabulaire");
  if (kinds.M) parts.push(plural(kinds.M, "erreur") + " à corriger");
  if (kinds.X) parts.push(plural(kinds.X, "expression"));
  return head + done + '<section class="card"><p class="eyebrow">Aujourd\'hui</p><h2 style="margin-top:6px">' + plural(due.length, "carte") + ' à revoir</h2><p class="muted" style="margin-top:6px">' + parts.join(" · ") + '</p><div class="row" style="margin-top:16px"><button class="btn" data-act="revStart">Commencer' + (due.length > 30 ? " (30 cartes)" : "") + "</button></div></section>";
};
function revStart() { Rev = { q: shuffle(dueKeys()).slice(0, 30), i: 0, shown: false, ok: 0, n: 0, done: false, typed: "" }; render(true); }
function renderRev() {
  const box = $("#revbox"); if (!box || !Rev) return;
  const key = Rev.q[Rev.i]; const c = cardData(key);
  if (!c) { Rev.i++; if (Rev.i >= Rev.q.length) { Rev.done = true; render(false); } else renderRev(); return; }
  const card = S().cards[key];
  const front = c.frontRich ? qhtml(c.front) : esc(c.front);
  let html = '<div class="flash"><div class="row" style="justify-content:space-between"><span class="small muted">' + esc(c.tag) + '</span><span class="small muted">' + (Rev.i + 1) + " / " + Rev.q.length + "</span></div>"
    + '<p class="front">' + front + (c.hint ? ' <span class="muted small">(' + esc(c.hint) + ")</span>" : "") + "</p>";
  if (!Rev.shown) {
    html += '<form data-form="rev" class="row"><input class="field" id="rev-input" style="flex:1;min-width:180px" autocomplete="off" spellcheck="false" placeholder="' + (c.mistake ? "Ta correction (facultatif)" : "Ta réponse en anglais (facultatif)") + '" aria-label="Ta réponse"><button class="btn" type="submit">Retourner la carte</button></form>';
  } else {
    const typed = Rev.typed.trim();
    let verdict = "";
    if (typed) { const m = matchWords(c.back, typed); verdict = '<p class="small" style="color:' + (m.score >= 0.9 ? "var(--good)" : "var(--warn)") + '">Ta réponse : ' + esc(typed) + (m.score >= 0.9 ? " · très proche" : "") + "</p>"; }
    html += '<div class="back"><p class="en"><span>' + esc(c.back) + "</span>" + sayBtn(c.say || c.back) + "</p>" + verdict + (c.extra ? '<p class="muted">' + rich(c.extra) + "</p>" : "") + (c.extraFr ? '<p class="small muted">' + esc(c.extraFr) + "</p>" : "") + "</div>"
      + '<div class="grades">' + [["À revoir", 0], ["Difficile", 1], ["Je savais", 2]].map(g => '<button class="grade g' + g[1] + '" data-act="grade" data-q="' + g[1] + '">' + g[0] + "<span>" + fmtDays(nextInterval(card, g[1])) + "</span></button>").join("") + "</div>";
  }
  box.innerHTML = html + "</div>";
  if (!Rev.shown && !isTouch) { const i = $("#rev-input"); if (i) i.focus({ preventScroll: true }); }
  if (Rev.shown && c.say && Voice.mode && Rev.autoSay) Voice.say(c.say);
}
function revFlip() { if (!Rev || Rev.shown) return; const i = $("#rev-input"); Rev.typed = i ? i.value : ""; Rev.shown = true; renderRev(); }
function revGrade(q) {
  if (!Rev || !Rev.shown) return;
  const key = Rev.q[Rev.i];
  gradeCard(key, q); bump("r"); Rev.n++; if (q > 0) Rev.ok++;
  addXP(q === 2 ? 3 : 2, true);
  Rev.i++; Rev.shown = false; Rev.typed = "";
  if (Rev.i >= Rev.q.length) { Rev.done = true; toast("Session terminée"); render(true); } else renderRev();
}

/* =========================================================================
   Word matching (dictation, pronunciation)
   ========================================================================= */
function matchWords(target, given) {
  const toks = String(target).split(/\s+/).filter(Boolean);
  const idx = [], a = [];
  toks.forEach((t, k) => { const n = norm(t); if (n) n.split(" ").forEach(w => { a.push(w); idx.push(k); }); });
  const b = norm(given).split(" ").filter(Boolean);
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hitW = new Array(m).fill(false);
  let i = 0, j = 0;
  while (i < m && j < n) { if (a[i] === b[j]) { hitW[i] = true; i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++; }
  const tokHit = toks.map(() => true);
  hitW.forEach((h, w) => { if (!h) tokHit[idx[w]] = false; });
  return { toks, tokHit, score: m ? dp[0][0] / Math.max(m, n) : 0 };
}
const diffHTML = m => '<p class="diff">' + m.toks.map((t, k) => '<span class="' + (m.tokHit[k] ? "okw" : "kow") + '">' + esc(t) + "</span>").join(" ") + "</p>";

/* =========================================================================
   View: vocabulary
   ========================================================================= */
let vocabFilter = null;
VIEWS.vocabulaire = function () {
  const f = vocabFilter;
  const sets = VOCAB.filter(v => !f || v.level === f);
  const chips = '<div class="chips" role="group" aria-label="Filtrer par niveau"><button class="chip" data-act="vfilter" data-level="" aria-pressed="' + (!f) + '">Tous</button>' + LEVELS.map(L => '<button class="chip" data-act="vfilter" data-level="' + L + '" aria-pressed="' + (f === L) + '">' + L + "</button>").join("") + "</div>";
  const grid = '<div class="vsets">' + sets.map(v => '<a class="vset" href="#' + v.id + '" style="--lv:' + lvVar(v.level) + '"><span><span class="lvl">' + v.level + "</span></span><b>" + esc(v.title) + '</b><span class="en">' + esc(v.en) + '</span><span class="state">' + (S().vocab[v.id] ? "Apprise · dans tes révisions" : "14 mots") + "</span></a>").join("") + "</div>";
  const lvOk = it => !f || it.level === f;
  const phr = (X.phrasal || []).map((p, i) => ({ p, i })).filter(o => lvOk(o.p));
  const idi = (X.idioms || []).map((p, i) => ({ p, i })).filter(o => lvOk(o.p));
  const ffs = (X.falseFriends || []).map((p, i) => ({ p, i }));
  const dly = (X.daily || []).map((p, i) => ({ p, i }));
  const ref = (id, title, sub, list, head, rowFn, sayFn) => list.length ? '<details class="ref" id="' + id + '"><summary><span>' + title + ' <span class="muted small" style="font-family:var(--f-body);font-weight:400">· ' + sub + "</span></span>" + icon("chev") + '</summary><div class="ref-body"><div class="row"><button class="btn soft small" data-act="addRef" data-ref="' + id + '">Ajouter ' + plural(list.length, "carte") + " à mes révisions</button></div>" + table(head, list.map(rowFn), { say: sayFn ? 0 : null, cls: ["en", "", "ex", ""] }) + "</div></details>" : "";
  return pageHead("Vocabulaire", "Les mots qui comptent",
    "Pour chaque liste : écoute chaque mot, répète-le à voix haute, lis l'exemple, puis clique sur « Apprendre cette liste » pour l'envoyer dans tes révisions. Le quiz rapide te teste tout de suite.")
    + chips + grid
    + ref("phrasal", "Verbes à particule", plural(phr.length, "verbe"), phr, ["Verbe", "Sens", "Exemple", "Niveau"], o => [o.p.v + (o.p.sep ? " <em>(séparable)</em>" : ""), o.p.fr, o.p.ex, o.p.level], true)
    + ref("idioms", "Expressions idiomatiques", plural(idi.length, "expression"), idi, ["Expression", "Équivalent", "Exemple", "Niveau"], o => [o.p.en, o.p.fr, o.p.ex, o.p.level], true)
    + ref("falseFriends", "Faux amis", plural(ffs.length, "mot"), ffs, ["Anglais", "Veut dire", "Piège", "Exemple"], o => [o.p.en, o.p.means, o.p.trap, o.p.ex], true)
    + ref("daily", "Expressions du quotidien", plural(dly.length, "expression"), dly, ["Anglais", "Sens", "Exemple", "Usage"], o => [o.p.en, o.p.fr, o.p.ex, o.p.note], true);
};
function addRef(id) {
  const f = vocabFilter;
  const list = (X[id] || []).map((p, i) => ({ p, i })).filter(o => id === "falseFriends" || id === "daily" || !f || o.p.level === f);
  let added = 0;
  list.forEach(o => { const k = "X|" + id + "|" + o.i; if (!S().cards[k]) { addCard(k); added++; } });
  if (added) { Store.change(); updateHeader(); toast(plural(added, "carte ajoutée", "cartes ajoutées")); } else toast("Déjà dans tes révisions");
}

let VQ = null;
function viewVocabSet(V) {
  const learned = S().vocab[V.id];
  return '<a class="back" href="#vocabulaire">' + icon("back") + " Vocabulaire</a>"
    + '<header class="lesson-head" style="--lv:' + lvVar(V.level) + '"><p class="eyebrow"><span class="lvl">' + V.level + "</span> &nbsp;Vocabulaire · 14 mots</p><h1>" + esc(V.title) + '</h1><p class="fr">' + esc(V.en) + "</p>"
    + '<div class="row">' + (learned ? '<span class="small muted">' + icon("check") + " Liste apprise, elle revient dans tes révisions</span>" : '<button class="btn" data-act="learnSet">Apprendre cette liste</button>') + '<button class="btn ghost" data-act="vquiz">Quiz rapide</button><button class="btn ghost needs-audio" data-act="sayAllWords">' + icon("speaker") + " Tout écouter</button></div></header>"
    + '<div id="vqbox"></div>'
    + '<div class="words" style="--lv:' + lvVar(V.level) + '">' + V.words.map(w => '<div class="word"><div><span class="w">' + esc(w.en) + '</span><span class="pos">' + esc(w.pos) + '</span><div class="tr">' + esc(w.fr) + "</div></div>" + sayBtn(w.en) + '<div class="ex"><em>' + esc(w.ex) + "</em>" + sayBtn(w.ex, "Écouter l'exemple") + '</div><div class="ex-fr">' + esc(w.exFr) + "</div></div>").join("") + "</div>";
}
function learnSet(V) {
  if (S().vocab[V.id]) return;
  S().vocab[V.id] = { at: dayKey() };
  V.words.forEach((_, k) => addCard("V|" + V.id + "|" + k));
  bump("v"); addXP(15);
  render(false);
}
function vquizStart(V) {
  const idx = shuffle(V.words.map((_, k) => k)).slice(0, 8);
  VQ = { id: V.id, items: idx.map(k => ({ k, opts: shuffle([k].concat(shuffle(V.words.map((_, j) => j).filter(j => j !== k)).slice(0, 3))) })), i: 0, score: 0, answered: false };
  renderVQ();
  const b = $("#vqbox"); if (b) b.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
}
function renderVQ() {
  const box = $("#vqbox"); if (!box || !VQ) return;
  const V = vById[VQ.id];
  if (VQ.i >= VQ.items.length) {
    box.innerHTML = '<div class="exbox"><div class="result"><p class="eyebrow">Quiz rapide</p><p class="score">' + VQ.score + "/" + VQ.items.length + "</p><p>" + (VQ.score >= 7 ? "Excellent." : VQ.score >= 5 ? "Bien. Réécoute les mots ratés." : "Relis la liste à voix haute puis recommence.") + '</p><div class="row" style="justify-content:center"><button class="btn" data-act="vquiz">Recommencer</button><button class="btn ghost" data-act="vqClose">Fermer</button></div></div></div>';
    return;
  }
  const it = VQ.items[VQ.i], w = V.words[it.k];
  box.innerHTML = '<div class="exbox"><div class="ex-progress">' + VQ.items.map((_, k) => '<i class="' + (k < VQ.i ? (VQ.items[k].ok ? "ok" : "ko") : k === VQ.i ? "cur" : "") + '"></i>').join("") + '</div><p class="eyebrow">Comment dit-on en anglais…</p><p class="q">' + esc(w.fr) + '</p><div class="opts">' + it.opts.map(o => '<button class="opt" data-act="vqAns" data-k="' + o + '">' + esc(V.words[o].en) + "</button>").join("") + '</div><div id="vqfb"></div></div>';
}
function vqAnswer(k, el) {
  if (!VQ || VQ.answered) return;
  const V = vById[VQ.id], it = VQ.items[VQ.i];
  VQ.answered = true; it.ok = k === it.k;
  $$("#vqbox .opt").forEach(b => { b.disabled = true; const bk = +b.dataset.k; if (bk === it.k) b.classList.add("ok"); else if (b === el) b.classList.add("ko"); });
  if (it.ok) { VQ.score++; addXP(3, true); }
  Voice.say(V.words[it.k].en);
  $("#vqfb").innerHTML = '<div class="row" style="margin-top:4px"><span class="small muted">' + esc(V.words[it.k].ex) + '</span><button class="btn small" data-act="vqNext">' + (VQ.i + 1 < VQ.items.length ? "Suivant" : "Résultat") + "</button></div>";
}

/* =========================================================================
   View: practice
   ========================================================================= */
const PR = { tab: "dictee", level: null };
let D = null, P = null;
const W = { level: null, idx: null, text: "", busy: false, res: null, err: "", ctl: null };
const Q = { text: "", busy: false, answer: "", err: "", ctl: null };
VIEWS.pratique = function () {
  const L = PR.level || currentLevel();
  const tabs = [["dictee", "Dictée", "ear"], ["prononciation", "Prononciation", "mic"], ["ecriture", "Écriture", "pen"], ["prof", "Question au prof", "ask"]];
  return pageHead("Compétences", "Pratique", "Écouter, parler, écrire. C'est en <b>produisant</b> de l'anglais que tu repères tes lacunes et que tu progresses le plus vite.")
    + '<div class="row" style="justify-content:space-between"><div class="seg" role="group" aria-label="Activité">' + tabs.map(t => '<button data-act="ptab" data-tab="' + t[0] + '" aria-pressed="' + (PR.tab === t[0]) + '">' + icon(t[2]) + t[1] + "</button>").join("") + "</div>"
    + '<label class="row small" for="pr-level"><span class="muted">Niveau</span><select class="field" id="pr-level" data-set="prLevel" style="min-width:110px">' + LEVELS.map(l => '<option value="' + l + '"' + (l === L ? " selected" : "") + ">" + l + "</option>").join("") + "</select></label></div>"
    + '<div id="prbox"></div>';
};
function renderPractice() {
  const box = $("#prbox"); if (!box) return;
  if (PR.tab === "dictee") renderDictee(box);
  else if (PR.tab === "prononciation") renderPron(box);
  else if (PR.tab === "ecriture") renderWriting(box);
  else renderProf(box);
}
const noAudio = STANDALONE
  ? '<div class="exbox"><p>Ton navigateur ne propose pas de lecture audio. Ouvre le site dans Chrome, Edge ou Safari pour les dictées et la prononciation.</p></div>'
  : '<div class="exbox"><p>La lecture audio n\'est pas disponible dans cette vue (par exemple dans Safari ou l\'app mobile). Ouvre la page dans Chrome ou dans l\'app de bureau Claude pour les dictées et la prononciation.</p></div>';
function poolFor(list, L) { return (list || []).map((d, i) => ({ d, i })).filter(o => o.d.level === L); }
function renderDictee(box) {
  if (!Voice.mode) { box.innerHTML = noAudio; return; }
  const L = PR.level || currentLevel(); const pool = poolFor(X.dictation, L);
  if (!pool.length) { box.innerHTML = '<div class="exbox"><p class="muted">Pas encore de dictée pour ce niveau.</p></div>'; return; }
  if (!D || D.level !== L) D = { level: L, idx: pool[Math.floor(Math.random() * pool.length)].i, checked: false, last: null };
  box.innerHTML = '<div class="exbox"><p class="eyebrow">Dictée · ' + L + '</p><p>Écoute la phrase autant de fois que tu veux, puis écris-la exactement. Majuscules et ponctuation ne comptent pas.</p>'
    + '<div class="row"><button class="btn" data-act="dictPlay">' + icon("speaker") + ' Écouter</button><button class="btn ghost" data-act="dictSlow">' + icon("slow") + " Plus lentement</button></div>"
    + '<form data-form="dict" class="row"><input class="field" id="dict-input" style="flex:1;min-width:200px" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Écris ce que tu entends" aria-label="Ta dictée"' + (D.checked ? " disabled" : "") + '><button class="btn" type="submit"' + (D.checked ? " disabled" : "") + ">Vérifier</button></form>"
    + '<div id="dict-fb">' + (D.checked && D.last ? D.last : "") + "</div></div>";
}
function dictCheck() {
  if (!D || D.checked) return;
  const inp = $("#dict-input"); const v = inp ? inp.value : "";
  if (!v.trim()) { toast("Écris d'abord ce que tu as entendu"); return; }
  const target = X.dictation[D.idx].en;
  const m = matchWords(target, v);
  const pct = Math.round(m.score * 100);
  const xp = pct >= 90 ? 15 : pct >= 60 ? 8 : 3;
  D.checked = true; bump("p"); addXP(xp, true);
  D.last = '<div class="feedback ' + (pct >= 90 ? "ok" : "ko") + '"><b>' + pct + " % de mots justes · +" + xp + " XP</b>" + diffHTML(m) + '<span class="small muted">En rouge : les mots manqués ou mal écrits.</span><div class="row" style="margin-top:8px"><button class="btn small" data-act="dictNext">Phrase suivante</button></div></div>';
  renderPractice();
}
function dictNext() {
  const L = PR.level || currentLevel(); const pool = poolFor(X.dictation, L).filter(o => o.i !== (D && D.idx));
  if (!pool.length) return;
  D = { level: L, idx: pool[Math.floor(Math.random() * pool.length)].i, checked: false, last: null };
  renderPractice();
  setTimeout(() => { const b = $("[data-act='dictPlay']"); if (b) Voice.say(X.dictation[D.idx].en, b); }, 50);
}

function renderPron(box) {
  if (!Voice.mode && !Mic.d) { box.innerHTML = noAudio; return; }
  const L = PR.level || currentLevel(); const pool = poolFor(X.speaking, L);
  if (!pool.length) { box.innerHTML = '<div class="exbox"><p class="muted">Pas encore de phrase pour ce niveau.</p></div>'; return; }
  if (!P || P.level !== L) P = { level: L, idx: pool[Math.floor(Math.random() * pool.length)].i, heard: "", partial: "", state: "idle", evaluated: false, result: "", msg: "" };
  const it = X.speaking[P.idx];
  let micPart;
  if (Mic.d) {
    micPart = '<div class="row" style="gap:16px"><button class="mic" id="mic-btn" data-act="micToggle" aria-label="Parler"></button><div style="flex:1;min-width:0"><b id="mic-label"></b><p class="muted small" id="mic-live"></p></div></div><div id="pron-fb">' + P.result + "</div>" + (P.msg ? '<p class="small" style="color:var(--bad)">' + esc(P.msg) + "</p>" : "");
  } else {
    micPart = '<p class="muted">La reconnaissance vocale n\'est pas disponible ici (' + (STANDALONE ? "elle marche dans Chrome, Edge et Safari" : "elle marche dans Chrome et dans l\'app de bureau Claude") + '). Entraîne-toi en <b>shadowing</b> : écoute, puis répète en même temps que le modèle, trois fois, en imitant la mélodie. Enregistre-toi avec ton téléphone pour comparer.</p><div class="row"><button class="btn" data-act="pronDone">C\'est fait</button></div>';
  }
  box.innerHTML = '<div class="exbox"><p class="eyebrow">Prononciation · ' + L + '</p><p class="target">' + esc(it.en) + '</p><div class="tip"><b>Le son à surveiller</b><span>' + esc(it.focus) + "</span></div>"
    + '<div class="row"><button class="btn ghost needs-audio" data-act="pronPlay">' + icon("speaker") + ' Écouter le modèle</button><button class="btn ghost needs-audio" data-act="pronSlow">' + icon("slow") + " Plus lentement</button></div>"
    + micPart + '<div class="row"><button class="btn ghost small" data-act="pronNext">Phrase suivante</button></div></div>';
  micUI(); micLive();
}
function micUI() {
  const b = $("#mic-btn"), l = $("#mic-label"); if (!b || !P) return;
  const on = P.state !== "idle";
  b.classList.toggle("on", on); b.innerHTML = icon(on ? "stop" : "mic"); b.setAttribute("aria-label", on ? "Arrêter" : "Parler");
  l.textContent = P.state === "starting" ? "Ouverture du micro…" : P.state === "listening" ? "Je t'écoute. Lis la phrase puis touche le bouton." : P.state === "finishing" ? "Analyse…" : "Touche le micro et lis la phrase à voix haute";
}
function micLive() { const el = $("#mic-live"); if (el && P) el.textContent = (P.heard + " " + P.partial).trim(); }
function micToggle() {
  const d = Mic.d; if (!d || !P) return;
  if (d.active()) { d.stop().catch(() => {}); return; }
  P.heard = ""; P.partial = ""; P.evaluated = false; P.result = ""; P.msg = "";
  const pf = $("#pron-fb"); if (pf) pf.innerHTML = "";
  d.start({ language: "en" }).catch(e => {
    const c = e && e.code;
    P.msg = c === "not_granted" ? MIC_DENIED
      : c === "unavailable" ? "La reconnaissance de l'anglais n'est pas disponible ici."
        : c === "dismissed" ? "" : c === "rate_limited" ? "Trop de dictées en même temps : réessaie dans un instant." : c === "stopped" ? "" : "Le micro n'a pas pu démarrer.";
    P.state = "idle";
    if (current.name === "pratique" && PR.tab === "prononciation") renderPractice();
  });
}
function evalPron() {
  if (!P || P.evaluated) return;
  P.evaluated = true;
  const it = X.speaking[P.idx];
  const m = matchWords(it.en, P.heard);
  const pct = Math.round(m.score * 100);
  const xp = pct >= 85 ? 10 : pct >= 60 ? 5 : 2;
  bump("p"); addXP(xp, true);
  P.result = '<div class="feedback ' + (pct >= 85 ? "ok" : "ko") + '"><b>' + pct + " % compris · +" + xp + " XP</b>" + diffHTML(m) + '<span class="small muted">' + (pct >= 85 ? "Très clair." : "Les mots en rouge n'ont pas été reconnus : réécoute le modèle et insiste sur eux.") + "</span></div>";
  const pf = $("#pron-fb"); if (pf) pf.innerHTML = P.result;
  micUI();
}
function pronNext() {
  const L = PR.level || currentLevel(); const pool = poolFor(X.speaking, L).filter(o => o.i !== (P && P.idx));
  if (!pool.length) return;
  if (Mic.d && Mic.d.active()) Mic.d.stop().catch(() => {});
  P = { level: L, idx: pool[Math.floor(Math.random() * pool.length)].i, heard: "", partial: "", state: "idle", evaluated: false, result: "", msg: "" };
  renderPractice();
}

const CHECKLIST = ["J'ai répondu à toutes les consignes du sujet.", "Chaque phrase a un sujet et un verbe conjugué (he/she/it + s au présent).", "J'ai vérifié les temps : prétérit pour un moment passé précis, present perfect sinon.", "J'ai relié mes idées avec des connecteurs (because, however, so, although).", "J'ai relu les pièges de francophone : adjectif avant le nom, pas de -s aux adjectifs, make/do, faux amis."];
function renderWriting(box) {
  const L = PR.level || currentLevel(); const pool = poolFor(X.writing, L);
  if (!pool.length) { box.innerHTML = '<div class="exbox"><p class="muted">Pas encore de sujet pour ce niveau.</p></div>'; return; }
  if (W.level !== L || W.idx == null || !X.writing[W.idx] || X.writing[W.idx].level !== L) { W.level = L; W.idx = pool[hashStr(dayKey()) % pool.length].i; W.res = null; W.err = ""; }
  const it = X.writing[W.idx];
  const hist = S().writing.slice(0, 5);
  box.innerHTML = '<div class="exbox"><div class="row" style="justify-content:space-between"><p class="eyebrow">Écriture · ' + L + " · " + esc(it.words) + ' mots</p><button class="btn ghost small" data-act="wrOther"' + (W.busy ? " disabled" : "") + '>Autre sujet</button></div><h2>' + esc(it.title) + "</h2><p>" + esc(it.prompt) + "</p>"
    + '<textarea class="field" id="wr-text" placeholder="Write your text here…" aria-label="Ton texte">' + esc(W.text) + "</textarea>"
    + '<div class="row" style="justify-content:space-between"><span class="muted small" id="wr-count">' + plural(countWords(W.text), "mot") + '</span><div class="row">'
    + (Coach.ok() ? (W.busy ? '<button class="btn" disabled>Correction en cours…</button><button class="btn ghost" data-act="wrStop">Arrêter</button>' : '<button class="btn" data-act="wrSend">' + icon("pen") + " Corriger avec Claude</button>") : '<button class="btn" data-act="wrSelf">J\'ai relu mon texte</button>')
    + "</div></div>"
    + (Coach.ok() ? "" : '<div class="tip"><b>Grille de relecture</b><ul style="margin:4px 0 0;padding-left:20px">' + CHECKLIST.map(c => "<li>" + esc(c) + "</li>").join("") + "</ul></div>")
    + '<div id="wr-res">' + (W.res ? coachHTML(W.res) : W.err ? '<div class="feedback ko"><span>' + esc(W.err) + "</span></div>" : "") + "</div></div>"
    + (hist.length ? '<section class="card"><p class="eyebrow">Tes derniers textes</p><div style="display:grid;gap:8px;margin-top:10px">' + hist.map(h => '<div class="row" style="justify-content:space-between"><span><span class="lvl" style="--lv:' + lvVar(h.level) + '">' + esc(h.level) + "</span> " + esc(h.title) + '</span><span class="small muted">' + (h.note != null ? h.note + "/20 · " : "") + plural(h.words, "mot") + " · " + esc(h.at) + "</span></div>").join("") + "</div></section>" : "");
}
function coachHTML(r) {
  const corr = Array.isArray(r.corrections) ? r.corrections.slice(0, 12) : [];
  const keep = Array.isArray(r.a_retenir) ? r.a_retenir.slice(0, 6) : [];
  const lvl = String(r.niveau_estime || "").slice(0, 2).toUpperCase();
  return '<div class="coach"><div class="row" style="align-items:baseline;gap:14px"><span class="note">' + esc(r.note != null ? r.note : "–") + '<span class="muted small">/20</span></span>' + (LEVELS.includes(lvl) ? '<span class="lvl" style="--lv:' + lvVar(lvl) + '">' + lvl + '</span><span class="muted small">niveau estimé de ton texte</span>' : "") + "</div>"
    + "<p>" + esc(r.commentaire || "") + "</p>"
    + (corr.length ? "<h3>Corrections</h3><div class=\"errors\">" + corr.map(c => '<div class="corr"><span class="o">' + esc(c.original) + '</span><span class="c">' + esc(c.correction) + '</span><span class="muted small">' + esc(c.explication) + "</span></div>").join("") + "</div>" : "")
    + (r.version_amelioree ? '<div class="row" style="justify-content:space-between"><h3>Version améliorée</h3>' + sayBtn(String(r.version_amelioree).slice(0, 1900), "Écouter la version améliorée") + '</div><p class="answer">' + esc(r.version_amelioree).replace(/\n/g, "<br>") + "</p>" : "")
    + (keep.length ? "<h3>À retenir</h3><ul style=\"margin:0;padding-left:20px\">" + keep.map(k => "<li>" + esc(k) + "</li>").join("") + "</ul>" : "")
    + "</div>";
}
async function wrSend() {
  const ta = $("#wr-text"); if (ta) W.text = ta.value;
  const text = W.text.trim();
  if (countWords(text) < 15) { toast("Écris au moins 15 mots"); return; }
  const it = X.writing[W.idx], L = W.level;
  W.busy = true; W.err = ""; W.res = null; W.ctl = new AbortController();
  renderPractice();
  const prompt = "Tu es un professeur d'anglais exigeant et bienveillant. Ton élève est francophone et vise le niveau " + L + " du CECRL.\n"
    + "Sujet donné : « " + it.title + " » : " + it.prompt + " (longueur visée : " + it.words + " mots).\n\n"
    + "Texte de l'élève, entre les balises :\n<texte>\n" + text.slice(0, 6000) + "\n</texte>\n\n"
    + "Corrige ce texte et réponds UNIQUEMENT avec un objet JSON de cette forme exacte :\n"
    + '{"note": 14, "niveau_estime": "B1", "commentaire": "2 ou 3 phrases en français : points forts et priorité de progrès", "corrections": [{"original": "extrait exact du texte", "correction": "version corrigée", "explication": "règle expliquée simplement en français"}], "version_amelioree": "le texte réécrit en anglais naturel au niveau ' + L + ', en gardant les idées de l\'élève", "a_retenir": ["3 à 5 points précis à retenir, en français"]}\n'
    + "La note est sur 20 et tient compte du niveau visé. Au maximum 10 corrections, les plus importantes d'abord. Si le texte n'est pas en anglais ou ne traite pas le sujet, dis-le dans le commentaire.";
  try {
    const r = await Coach.s.json(prompt, { signal: W.ctl.signal });
    if (!r || typeof r !== "object" || Array.isArray(r)) throw { code: "invalid_json" };
    W.res = r;
    S().writing.unshift({ at: dayKey(), level: L, title: it.title, words: countWords(text), note: Number.isFinite(Number(r.note)) ? Number(r.note) : null });
    bump("p"); addXP(25);
  } catch (e) { W.err = Coach.err(e); }
  W.busy = false; W.ctl = null;
  if (current.name === "pratique" && PR.tab === "ecriture") renderPractice();
}
function renderProf(box) {
  if (!Coach.ok()) {
    box.innerHTML = STANDALONE
      ? '<div class="exbox"><p>Cette activité utilise Claude pour répondre à tes questions de grammaire ou de vocabulaire, et pour corriger tes textes. Elle fonctionne dans la version Claude de l\'appli.</p><div class="row"><a class="btn" href="' + CLAUDE_URL + '" target="_blank" rel="noopener">Ouvrir la version Claude ' + icon("arrow") + "</a></div></div>"
      : '<div class="exbox"><p>Cette activité utilise Claude pour répondre à tes questions de grammaire ou de vocabulaire. Elle est disponible quand la page est ouverte dans claude.ai ou l\'app Claude, et que tu autorises Claude pour cet artefact.</p></div>';
    return;
  }
  const L = PR.level || currentLevel();
  const ex = ["Quelle différence entre for et since ?", "Quand faut-il mettre the ?", "Comment dire « ça fait longtemps que je ne t'ai pas vu » ?", "Explique-moi le present perfect avec des exemples de la vie de lycéen.", "Make ou do : comment choisir ?"];
  box.innerHTML = '<div class="exbox"><p class="eyebrow">Question au prof · réponses adaptées au niveau ' + L + '</p><div class="chips">' + ex.map((q, i) => '<button class="chip" data-act="qExample" data-i="' + i + '">' + esc(q) + "</button>").join("") + "</div>"
    + '<textarea class="field" id="q-text" style="min-height:110px" placeholder="Pose ta question sur l\'anglais, en français ou en anglais" aria-label="Ta question">' + esc(Q.text) + "</textarea>"
    + '<div class="row">' + (Q.busy ? '<button class="btn" disabled>Réponse en cours…</button><button class="btn ghost" data-act="qStop">Arrêter</button>' : '<button class="btn" data-act="qAsk">' + icon("ask") + " Demander</button>") + "</div>"
    + '<div class="answer" id="q-ans">' + (Q.answer ? mdLite(Q.answer) : Q.err ? '<div class="feedback ko"><span>' + esc(Q.err) + "</span></div>" : "") + "</div></div>";
  box.dataset.ex = JSON.stringify(ex);
}
function mdLite(t) {
  return String(t).split(/\n{2,}/).map(block => {
    const lines = block.split("\n");
    const fmt = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>").replace(/(^|[^*])\*([^*\n]+)\*/g, "$1<em>$2</em>");
    if (lines.every(l => /^\s*([-*•]|\d+[.)])\s+/.test(l))) return "<ul>" + lines.map(l => "<li>" + fmt(l.replace(/^\s*([-*•]|\d+[.)])\s+/, "")) + "</li>").join("") + "</ul>";
    return "<p>" + lines.map(fmt).join("<br>") + "</p>";
  }).join("");
}
async function qAsk() {
  const ta = $("#q-text"); if (ta) Q.text = ta.value;
  const text = Q.text.trim(); if (!text) { toast("Écris d'abord ta question"); return; }
  const L = PR.level || currentLevel();
  Q.busy = true; Q.err = ""; Q.answer = ""; Q.ctl = new AbortController();
  renderPractice();
  const el = $("#q-ans"); if (el) el.innerHTML = '<p class="muted">Réflexion…</p>';
  const prompt = "Tu es un professeur d'anglais pour un élève francophone de niveau " + L + " (CECRL) qui veut progresser vite. Réponds en français, clairement et concrètement : une explication courte, puis 3 exemples en anglais avec leur traduction, puis le piège le plus fréquent pour un francophone. Moins de 250 mots, pas de titre.\n\nQuestion de l'élève : " + text.slice(0, 2000);
  let ok = false;
  try {
    const r = await Coach.s(prompt, { signal: Q.ctl.signal, cache: false, onText: u => { Q.answer = u.text; const a = $("#q-ans"); if (a) a.innerHTML = mdLite(u.text); } });
    Q.answer = r.text; ok = true;
  } catch (e) { Q.err = Coach.err(e); if (e && e.text) Q.answer = e.text; }
  Q.busy = false; Q.ctl = null;
  if (ok) { bump("p"); addXP(5, true); }
  if (current.name === "pratique" && PR.tab === "prof") renderPractice();
}

/* =========================================================================
   View: memo
   ========================================================================= */
VIEWS.memo = function () {
  const sections = [["m-temps", "Les temps"], ["m-cond", "Conditionnels"], ["m-irr", "Verbes irréguliers"], ["m-comp", "Comparatifs"], ["m-pron", "Pronoms"], ["m-conn", "Connecteurs"]];
  const irr = X.irregular || [];
  return pageHead("Fiches de référence", "Mémo", "Tout ce qu'on vérifie d'un coup d'œil. Garde cette page ouverte quand tu écris.")
    + '<nav class="chips" aria-label="Sections du mémo">' + sections.map(s => '<button class="chip" data-act="jump" data-to="' + s[0] + '">' + s[1] + "</button>").join("") + "</nav>"
    + '<section class="sec" id="m-temps"><h2>Les temps en un coup d\'œil</h2>' + table(["Temps", "Forme", "Quand l'utiliser", "Exemple"], X.tenseTable || [], { cls: ["en", "", "", "ex"], say: 3 }) + "</section>"
    + '<section class="sec" id="m-cond"><h2>Les conditionnels</h2>' + table(["Type", "Structure", "Sens", "Exemple"], X.conditionalTable || [], { cls: ["en", "", "", "ex"], say: 3 }) + "</section>"
    + '<section class="sec" id="m-irr"><h2>Verbes irréguliers <span class="muted small" style="font-family:var(--f-body);font-weight:400">· ' + irr.length + ' verbes</span></h2><input class="field" id="irr-search" type="search" placeholder="Chercher un verbe (anglais ou français)" aria-label="Chercher un verbe" style="max-width:420px">'
    + table(["Base", "Prétérit", "Participe passé", "Français"], irr, { cls: ["en", "", "", "ex"], say: r => r[0] + ", " + r[1] + ", " + r[2], bodyId: "irr-body", rowAttr: r => ' data-q="' + esc(norm(r.join(" "))) + '"' }) + "</section>"
    + '<section class="sec" id="m-comp"><h2>Comparatifs et superlatifs</h2><p class="muted">Une syllabe : <b>-er / the -est</b>. Deux syllabes ou plus : <b>more / the most</b> (sauf celles en -y : happier). Les irréguliers sont à connaître par cœur.</p>'
    + table(["Adjectif", "Français", "Comparatif", "Superlatif", "Exemple"], X.comparativesAdj || [], { caption: "Adjectifs", cls: ["en", "", "", "", "ex"], say: 4 })
    + table(["Adverbe", "Français", "Comparatif", "Superlatif", "Exemple"], X.comparativesAdv || [], { caption: "Adverbes", cls: ["en", "", "", "", "ex"], say: 4 }) + "</section>"
    + '<section class="sec" id="m-pron"><h2>Pronoms</h2>' + table(["Personne", "Sujet", "Objet", "Adj. possessif", "Pronom possessif", "Réfléchi"], (X.pronounTable || []).map(r => r.map(c => c || "—")), { cls: ["", "en"] }) + '<p class="small muted">Attention : <em>his / her</em> s\'accorde avec le possesseur, pas avec l\'objet. Sa mère (à lui) = <b>his</b> mother ; sa mère (à elle) = <b>her</b> mother.</p></section>'
    + '<section class="sec" id="m-conn"><h2>Connecteurs</h2>' + table(["Connecteur", "Rôle", "Français", "Niveau", "Exemple"], (X.connectors || []).map(c => [c.en, c.role, c.fr, c.level, c.ex]), { cls: ["en", "", "", "", "ex"], say: 4 }) + "</section>";
};
function filterIrr(q) {
  const n = norm(q);
  $$("#irr-body tr").forEach(tr => { tr.hidden = !!n && !tr.dataset.q.includes(n); });
}

/* =========================================================================
   View: plan and settings
   ========================================================================= */
let resetAsk = false;
VIEWS.plan = function () {
  const s = S(), w = weeksLeft(), L = currentLevel();
  const hoursAt = { A2: 200, B1: 400, B2: 600, C1: 800, C2: 1100 };
  const toB2 = Math.max(0, hoursAt.B2 - hoursAt[L]), toC2 = Math.max(0, hoursAt.C2 - hoursAt[L]);
  const perDay = h => w ? (h / (w * 7)).toFixed(1).replace(".", ",") : "–";
  const lessonsDone = Object.keys(s.lessons).length;
  const methods = [
    ["Répétition espacée", "On retient bien mieux en revoyant une information à intervalles croissants qu'en la relisant d'un bloc. C'est le rôle de l'onglet Révisions : chaque carte revient demain, puis dans 2, 4, 8, 16 jours."],
    ["Rappel actif", "Chercher la réponse dans ta mémoire avant de la voir est plus efficace que relire. D'où les exercices à trous, les phrases à remettre dans l'ordre et les cartes à retourner."],
    ["Input compréhensible", "Tu progresses en écoutant et en lisant de l'anglais un peu au-dessus de ton niveau, où tu comprends l'essentiel. Les exemples audio, les dictées et l'immersion ci-dessous servent à ça."],
    ["Produire (output)", "Parler et écrire te montrent ce qui manque et fixent ce que tu sais. Prononciation, écriture corrigée et question au prof sont là pour ça."],
    ["Régularité", "Vingt à quarante minutes chaque jour valent mieux que trois heures le dimanche. La série de jours et la mission du jour t'y aident."],
    ["Erreurs utiles", "Chaque erreur faite en exercice revient en carte « Erreur à corriger ». Se tromper puis corriger aide à mémoriser."]
  ];
  return pageHead("Mon plan", "De A2 à C2 cette année", "")
    + '<section class="card"><h2>Ton objectif, honnêtement</h2><div class="prose" style="margin-top:10px">'
    + "<p>Les estimations de Cambridge en heures d'apprentissage guidé (cumulées) donnent un ordre de grandeur : A2 ≈ 200 h, B1 ≈ 400 h, B2 ≈ 600 h, C1 ≈ 800 h, C2 ≈ 1 000 à 1 200 h.</p>"
    + "<p>Il te reste <b>" + plural(w, "semaine") + "</b> avant fin juin. Depuis ton niveau actuel (" + L + "), atteindre le B2 demande environ <b>" + perDay(toB2) + " h par jour</b>, et le C2 environ <b>" + perDay(toC2) + " h par jour</b>, en plus de tes cours.</p>"
    + "<p>Conclusion : avec 45 à 60 minutes par jour, en plus des cours et d'un peu d'immersion, un <b>B2 solide en juin</b> est ambitieux mais réaliste. Le C1 est possible si tu ajoutes beaucoup d'anglais dans ta vie (séries, lectures, conversations). Le C2 se construit en général sur plusieurs années : tout le programme est quand même là pour que tu ailles aussi loin que possible.</p>"
    + "</div></section>"
    + '<section class="card"><h2>Réglages</h2><div class="kv" style="margin-top:14px">'
    + '<label for="set-level">Niveau de départ</label><select class="field" id="set-level" data-set="startLevel">' + LEVELS.map(l => '<option value="' + l + '"' + (l === s.startLevel ? " selected" : "") + ">" + l + " · " + LEVEL_INFO[l].name + "</option>").join("") + "</select>"
    + '<label for="set-goal">Objectif quotidien</label><select class="field" id="set-goal" data-set="goal">' + [[30, "30 XP · environ 15 min"], [60, "60 XP · environ 30 min"], [100, "100 XP · environ 45 min"], [150, "150 XP · environ 1 h"]].map(g => '<option value="' + g[0] + '"' + (g[0] === s.goal ? " selected" : "") + ">" + g[1] + "</option>").join("") + "</select>"
    + '<label for="set-rate" class="needs-audio">Vitesse de la voix</label><select class="field needs-audio" id="set-rate" data-set="rate">' + [[0.8, "Lente"], [0.9, "Un peu lente"], [1, "Normale"], [1.15, "Rapide"]].map(g => '<option value="' + g[0] + '"' + (g[0] === s.rate ? " selected" : "") + ">" + g[1] + "</option>").join("") + "</select>"
    + "</div></section>"
    + '<section class="card"><h2>Ta routine quotidienne</h2><div class="method" style="margin-top:14px">'
    + [["5 min", "Révisions", "Toutes les cartes du jour, en répondant de tête avant de retourner."], ["15 min", "Une leçon", "Lis, écoute les exemples à voix haute, fais les 6 exercices. Si la leçon renvoie à ton livre, fais aussi les exercices de l'unité."], ["10 min", "Pratique", "Une dictée, une phrase de prononciation ou un petit texte corrigé."], ["10 à 30 min", "Immersion", "Une série, une vidéo, un podcast ou un article en anglais, sur un sujet qui te plaît."]].map((r, i) => '<div class="m"><span class="n">' + (i + 1) + "</span><div><b>" + r[1] + ' <span class="muted small">· ' + r[0] + "</span></b><p>" + r[2] + "</p></div></div>").join("")
    + "</div></section>"
    + '<section class="card"><h2>Pourquoi ça marche</h2><div class="method" style="margin-top:14px">' + methods.map((m, i) => '<div class="m"><span class="n">' + (i + 1) + "</span><div><b>" + m[0] + "</b><p>" + m[1] + "</p></div></div>").join("") + "</div></section>"
    + '<section class="card"><h2>Avec ton livre <em style="font-style:italic">Essential Grammar in Use</em></h2><div class="prose" style="margin-top:10px"><p>Le livre couvre le A1 au B1 en 115 unités. Chaque leçon A2 et B1 de l\'appli indique les unités correspondantes. Fais d\'abord la leçon ici, puis lis la page de gauche de l\'unité et fais les exercices de la page de droite. Vérifie avec le corrigé (Key to Exercises, p. 283).</p><p>Si tu hésites sur ce qui te manque, fais le <b>Study guide</b> du livre (p. 271) : il t\'indique les unités à travailler. Au-delà du B1, l\'appli prend le relais avec les leçons B2, C1 et C2.</p></div></section>'
    + '<section class="card"><h2>L\'immersion selon ton niveau</h2><div class="method" style="margin-top:14px">'
    + [["A2 → B1", "Séries que tu connais déjà, en anglais avec sous-titres anglais. Vidéos courtes pour apprenants. Chansons avec les paroles."], ["B1 → B2", "Séries en VO sous-titres anglais, podcasts pour apprenants, articles courts sur tes centres d'intérêt, vidéos YouTube de créateurs anglophones."], ["B2 → C1", "Films sans sous-titres, actualités en anglais, romans jeunesse puis adultes, discussions en ligne ou échanges linguistiques."], ["C1 → C2", "Presse de qualité, essais, podcasts de débat, écriture régulière (journal, articles), conversations sur des sujets abstraits."]].map((r, i) => '<div class="m"><span class="n">' + (i + 1) + "</span><div><b>" + r[0] + "</b><p>" + r[1] + "</p></div></div>").join("")
    + "</div></section>"
    + '<section class="card"><h2>Ta sauvegarde</h2><p class="muted" id="sync-state" style="margin-top:8px">' + esc(SYNC_TEXT[Store.status]) + "</p>"
    + (STANDALONE ? '<p class="small" style="margin-top:8px">Sur ce site, chaque appareil garde sa propre progression. La <a href="' + CLAUDE_URL + '" target="_blank" rel="noopener">version Claude</a> enregistre la tienne sur ton compte et ajoute la correction de tes textes par Claude.</p>' : "")
    + '<p style="margin-top:10px">' + s.xp + " XP au total · " + plural(lessonsDone, "leçon") + " faite" + (lessonsDone > 1 ? "s" : "") + " · " + plural(Object.keys(s.vocab).length, "liste") + " de vocabulaire · " + plural(Object.keys(s.cards).length, "carte") + " en révision · record de " + plural(bestStreak(), "jour") + "</p>"
    + (resetAsk ? '<div class="confirm" style="margin-top:14px"><b>Tout effacer ?</b><span>XP, série, leçons, cartes et textes seront supprimés. C\'est définitif.</span><div class="row"><button class="btn" style="background:var(--bad)" data-act="resetDo">Oui, tout effacer</button><button class="btn ghost" data-act="resetCancel">Annuler</button></div></div>' : '<div class="row" style="margin-top:14px"><button class="btn ghost small" data-act="resetAsk">Recommencer à zéro</button></div>')
    + "</section>";
};

/* =========================================================================
   Events
   ========================================================================= */
const ACT = {
  say: el => Voice.say(el.dataset.text, el),
  sayAllEx: el => { const L = byId[current.param]; if (L) Voice.sayAll(L.examples.map(e => e.en), el); },
  sayAllWords: el => { const V = vById[current.param]; if (V) Voice.sayAll(V.words.map(w => w.en), el); },
  jump: el => { const t = document.getElementById(el.dataset.to); if (t) t.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); },
  openLevel: el => { openLevelPref = el.dataset.level; if (current.name === "parcours") { render(false); const d = document.getElementById("lvl-" + el.dataset.level); if (d) d.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); } },
  welcomeDone: () => { S().welcomed = true; Store.change(); render(false); },
  mcq: el => {
    if (!Run || Run.answered) return;
    const e = byId[Run.id].exercises[Run.i]; const k = +el.dataset.k; const ok = k === e.answer;
    $$("#exbox .opt").forEach(b => { b.disabled = true; const bk = +b.dataset.k; if (bk === e.answer) b.classList.add("ok"); else if (bk === k) b.classList.add("ko"); });
    exFeedback(ok);
  },
  pick: el => { if (!Run || Run.answered) return; const k = +el.dataset.k; if (!Run.picked.includes(k)) { Run.picked.push(k); orderUI(); } },
  unpickOne: el => { if (!Run || Run.answered) return; Run.picked.splice(+el.dataset.n, 1); orderUI(); },
  unpick: () => { if (!Run || Run.answered) return; Run.picked = []; orderUI(); },
  checkOrder: () => {
    if (!Run || Run.answered) return;
    const e = byId[Run.id].exercises[Run.i];
    if (Run.picked.length < Run.pool.length) { toast("Utilise tous les mots"); return; }
    const given = norm(Run.picked.map(k => Run.pool[k]).join(" "));
    const ok = [e.answer].concat(e.alt || []).some(a => norm(a) === given);
    const b = $("#built"); if (b) b.classList.add(ok ? "ok" : "ko");
    $$("#exbox .wchip").forEach(x => { x.disabled = true; });
    exFeedback(ok);
  },
  exNext: () => { if (!Run) return; Run.i++; Run.answered = false; renderEx(); const b = $("#exbox"); if (b) b.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" }); },
  retry: () => { startRun(current.param); Run.retake = true; renderEx(); const b = $("#exbox"); if (b) b.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" }); },
  revStart: () => revStart(),
  grade: el => revGrade(+el.dataset.q),
  learnSet: () => { const V = vById[current.param]; if (V) learnSet(V); },
  vquiz: () => { const V = vById[current.param]; if (V) vquizStart(V); },
  vqAns: el => vqAnswer(+el.dataset.k, el),
  vqNext: () => { if (!VQ) return; VQ.i++; VQ.answered = false; renderVQ(); },
  vqClose: () => { VQ = null; const b = $("#vqbox"); if (b) b.innerHTML = ""; },
  vfilter: el => { vocabFilter = el.dataset.level || null; render(false); },
  addRef: el => addRef(el.dataset.ref),
  setPractice: el => { PR.tab = el.dataset.tab; },
  ptab: el => { PR.tab = el.dataset.tab; $$(".seg button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.tab === PR.tab))); renderPractice(); },
  dictPlay: el => { if (D) Voice.say(X.dictation[D.idx].en, el); },
  dictSlow: el => { if (D) Voice.say(X.dictation[D.idx].en, el, 0.7); },
  dictNext: () => dictNext(),
  pronPlay: el => { if (P) Voice.say(X.speaking[P.idx].en, el); },
  pronSlow: el => { if (P) Voice.say(X.speaking[P.idx].en, el, 0.7); },
  micToggle: () => micToggle(),
  pronNext: () => pronNext(),
  pronDone: () => { bump("p"); addXP(5); pronNext(); },
  wrOther: () => { const pool = poolFor(X.writing, W.level).filter(o => o.i !== W.idx); if (pool.length) { W.idx = pool[Math.floor(Math.random() * pool.length)].i; W.res = null; W.err = ""; renderPractice(); } },
  wrSend: () => wrSend(),
  wrStop: () => { if (W.ctl) W.ctl.abort(); },
  wrSelf: () => { const ta = $("#wr-text"); if (ta) W.text = ta.value; if (countWords(W.text) < 15) { toast("Écris au moins 15 mots"); return; } const it = X.writing[W.idx]; S().writing.unshift({ at: dayKey(), level: W.level, title: it.title, words: countWords(W.text), note: null }); bump("p"); addXP(15); renderPractice(); },
  qExample: el => { const box = $("#prbox"); const ex = box ? JSON.parse(box.dataset.ex || "[]") : []; Q.text = ex[+el.dataset.i] || ""; const ta = $("#q-text"); if (ta) { ta.value = Q.text; ta.focus(); } },
  qAsk: () => qAsk(),
  qStop: () => { if (Q.ctl) Q.ctl.abort(); },
  resetAsk: () => { resetAsk = true; render(false); },
  resetCancel: () => { resetAsk = false; render(false); },
  resetDo: () => { resetAsk = false; Store.s = Object.assign(blank(), { migrated: true, welcomed: true }); Run = null; Rev = null; VQ = null; Store.change(); render(true); toast("Progression remise à zéro"); }
};
const SETTERS = {
  startLevel: v => { if (LEVELS.includes(v)) { S().startLevel = v; Store.change(); render(false); } },
  goal: v => { S().goal = Math.max(10, +v || 60); Store.change(); updateHeader(); },
  rate: v => { S().rate = +v || 1; Store.change(); if (Voice.tts && Voice.tts.setRate) Voice.tts.setRate(S().rate).catch(() => {}); Voice.say("This is how fast I will speak."); },
  prLevel: v => { PR.level = v; D = null; P = null; W.idx = null; W.res = null; renderPractice(); }
};
const FORMS = {
  type: () => {
    if (!Run || Run.answered) return;
    const inp = $("#ex-input"); const v = inp ? inp.value : "";
    if (!v.trim()) { toast("Écris ta réponse"); return; }
    const e = byId[Run.id].exercises[Run.i];
    const ok = e.answer.some(a => norm(a) === norm(v));
    if (inp) { inp.classList.add(ok ? "ok" : "ko"); inp.disabled = true; }
    const btn = $("#exbox form button"); if (btn) btn.disabled = true;
    exFeedback(ok);
  },
  rev: () => revFlip(),
  dict: () => dictCheck()
};
document.addEventListener("click", e => {
  const el = e.target.closest("[data-act]");
  if (!el) return;
  const f = ACT[el.dataset.act];
  if (f) f(el, e);
});
document.addEventListener("submit", e => {
  const f = e.target.closest("form[data-form]");
  if (!f) return;
  e.preventDefault();
  const fn = FORMS[f.dataset.form]; if (fn) fn(f);
});
document.addEventListener("change", e => {
  const el = e.target.closest("[data-set]");
  if (el && SETTERS[el.dataset.set]) SETTERS[el.dataset.set](el.value);
});
document.addEventListener("input", e => {
  const id = e.target.id;
  if (id === "wr-text") { W.text = e.target.value; const c = $("#wr-count"); if (c) c.textContent = plural(countWords(W.text), "mot"); }
  else if (id === "q-text") Q.text = e.target.value;
  else if (id === "irr-search") filterIrr(e.target.value);
});
document.addEventListener("keydown", e => {
  if (current.name !== "revisions" || !Rev || Rev.done) return;
  const typing = e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName);
  if (typing) return;
  if (!Rev.shown && (e.key === " " || e.key === "Enter")) { e.preventDefault(); revFlip(); }
  else if (Rev.shown && ["1", "2", "3"].includes(e.key)) { e.preventDefault(); revGrade(+e.key - 1); }
});
window.addEventListener("hashchange", route);
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { Store.pull(false); updateHeader(); } });

/* =========================================================================
   Start
   ========================================================================= */
Store.load();
buildNav();
route();
Voice.init();
Mic.init();
Coach.init();
if (STANDALONE) {
  if ("serviceWorker" in navigator && /^https:$|^http:$/.test(location.protocol)) {
    window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => { /* offline mode unavailable */ }); });
  }
} else {
  Store.connect();
}
})();
