// Usage: node validate.js data/a2-1.js [more files...]   (no args = all files in data/)
const fs = require("fs");
const path = require("path");
const vm = require("vm");

let files = process.argv.slice(2);
const dataDir = path.join(__dirname, "data");
if (!files.length) files = fs.readdirSync(dataDir).filter(f => f.endsWith(".js")).sort().map(f => path.join(dataDir, f));

const ctx = {};
ctx.window = ctx; // like a browser: window.HUB is also the global HUB
vm.createContext(ctx);
let errors = [];
const err = (where, msg) => errors.push(where + ": " + msg);

for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  try { vm.runInContext(src, ctx, { filename: f }); }
  catch (e) { err(f, "JS error: " + e.message); continue; }
  if (/\p{Extended_Pictographic}/u.test(src)) err(f, "contains emoji / pictographic characters");
  const tags = src.match(/<\/?([a-zA-Z]+)[^>]*>/g) || [];
  for (const t of tags) { if (!/^<\/?(b|em|br)\s*\/?>$/.test(t)) err(f, "disallowed HTML tag " + t); }
}
const HUB = ctx.HUB || { lessons: [], vocab: [], extras: {} };

const LEVELS = ["A2", "B1", "B2", "C1", "C2"];
const ids = new Set();
const isStr = s => typeof s === "string" && s.trim().length > 0;
const words = s => s.toLowerCase().replace(/[.,!?;:]/g, "").split(/\s+/).filter(Boolean).sort().join(" ");

for (const L of HUB.lessons || []) {
  const w = "lesson " + (L.id || "?");
  if (!/^(a2|b1|b2|c1|c2)-[a-z0-9-]+$/.test(L.id || "")) err(w, "bad id");
  if (ids.has(L.id)) err(w, "duplicate id"); ids.add(L.id);
  if (!LEVELS.includes(L.level)) err(w, "bad level");
  if (L.id && L.level && !L.id.startsWith(L.level.toLowerCase())) err(w, "id does not start with level");
  for (const k of ["module", "title", "fr", "goal", "tip"]) if (!isStr(L[k])) err(w, "missing " + k);
  if (typeof L.murphy !== "string") err(w, "murphy must be a string");
  if (!(L.minutes >= 5 && L.minutes <= 30)) err(w, "minutes out of range");
  if (!Array.isArray(L.intro) || L.intro.length < 2 || L.intro.length > 5 || !L.intro.every(isStr)) err(w, "intro must be 2-5 paragraphs");
  if (!Array.isArray(L.formulas) || L.formulas.length < 1 || !L.formulas.every(r => isStr(r.label) && isStr(r.value))) err(w, "formulas");
  if (!Array.isArray(L.uses) || L.uses.length < 3 || !L.uses.every(u => isStr(u.title) && isStr(u.desc) && isStr(u.en) && isStr(u.fr))) err(w, "uses must be 3+ with title/desc/en/fr");
  if (!Array.isArray(L.examples) || L.examples.length < 8 || !L.examples.every(e => isStr(e.en) && isStr(e.fr) && typeof (e.note ?? "") === "string")) err(w, "examples must be 8+ with en/fr");
  if (L.table != null) {
    const t = L.table;
    if (!Array.isArray(t.head) || !Array.isArray(t.rows) || !t.rows.every(r => Array.isArray(r) && r.length === t.head.length)) err(w, "table rows must match head length");
  }
  if (L.compare != null) {
    const c = L.compare;
    if (!isStr(c.title) || !c.a || !c.b || !isStr(c.a.label) || !isStr(c.b.label) || !Array.isArray(c.a.points) || !Array.isArray(c.b.points)) err(w, "compare shape");
  }
  if (!Array.isArray(L.errors) || L.errors.length < 3 || !L.errors.every(e => isStr(e.bad) && isStr(e.good) && isStr(e.why))) err(w, "errors must be 3+ with bad/good/why");
  const ex = L.exercises || [];
  if (ex.length !== 6) err(w, "exercises must be exactly 6 (has " + ex.length + ")");
  const count = t => ex.filter(e => e.type === t).length;
  if (count("mcq") < 2) err(w, "needs >= 2 mcq");
  if (count("type") < 2) err(w, "needs >= 2 type");
  if (count("order") < 1 || count("order") > 2) err(w, "needs 1-2 order");
  ex.forEach((e, i) => {
    const ew = w + " ex" + (i + 1);
    if (!isStr(e.why)) err(ew, "missing why");
    if (e.type === "mcq") {
      if (!isStr(e.q) || !Array.isArray(e.options) || e.options.length < 2 || e.options.length > 4) err(ew, "mcq q/options");
      if (!(Number.isInteger(e.answer) && e.answer >= 0 && e.answer < (e.options || []).length)) err(ew, "mcq answer index");
      if (new Set(e.options).size !== (e.options || []).length) err(ew, "duplicate options");
    } else if (e.type === "type") {
      if (!isStr(e.q) || (e.q.match(/___/g) || []).length !== 1) err(ew, "type q must contain exactly one ___");
      if (!Array.isArray(e.answer) || !e.answer.length || !e.answer.every(isStr)) err(ew, "type answer must be non-empty array");
    } else if (e.type === "order") {
      if (!Array.isArray(e.words) || e.words.length < 3 || !isStr(e.answer) || !isStr(e.fr)) err(ew, "order words/answer/fr");
      else {
        if (words(e.words.join(" ")) !== words(e.answer)) err(ew, "order words do not match answer");
        if (e.words.join(" ").toLowerCase() === e.answer.toLowerCase().replace(/[.,!?]/g, "")) err(ew, "order words already in correct order");
        if (e.words.some(x => /[.,!?;:]/.test(x))) err(ew, "order words must not contain punctuation");
        if (e.alt !== undefined) {
          if (!Array.isArray(e.alt) || !e.alt.every(isStr)) err(ew, "alt must be an array of strings");
          else e.alt.forEach(a => {
            if (words(a) !== words(e.answer)) err(ew, "alt uses different words: " + a);
            if (e.words.join(" ").toLowerCase() === a.toLowerCase().replace(/[.,!?]/g, "")) err(ew, "order words already match an alt");
          });
        }
      }
    } else err(ew, "unknown type " + e.type);
  });
  if (!Array.isArray(L.cards) || L.cards.length !== 5 || !L.cards.every(c => isStr(c.fr) && isStr(c.en))) err(w, "cards must be exactly 5 with fr/en");
}

for (const V of HUB.vocab || []) {
  const w = "vocab " + (V.id || "?");
  if (!/^(a2|b1|b2|c1|c2)-voc-[a-z0-9-]+$/.test(V.id || "")) err(w, "bad id");
  if (ids.has(V.id)) err(w, "duplicate id"); ids.add(V.id);
  if (!LEVELS.includes(V.level)) err(w, "bad level");
  if (!isStr(V.title) || !isStr(V.en)) err(w, "title/en");
  if (!Array.isArray(V.words) || V.words.length !== 14) err(w, "words must be exactly 14 (has " + (V.words || []).length + ")");
  (V.words || []).forEach((x, i) => { if (!isStr(x.en) || !isStr(x.fr) || !isStr(x.pos) || !isStr(x.ex) || !isStr(x.exFr)) err(w + " word" + (i + 1), "missing field"); });
}

const X = HUB.extras || {};
const checkArr = (name, min, fn) => {
  if (X[name] === undefined) return;
  if (!Array.isArray(X[name]) || X[name].length < min) err("extras." + name, "needs at least " + min + " items");
  (X[name] || []).forEach((it, i) => { if (!fn(it)) err("extras." + name + "[" + i + "]", "bad shape " + JSON.stringify(it).slice(0, 80)); });
};
checkArr("irregular", 100, r => Array.isArray(r) && r.length === 4 && r.every(isStr));
checkArr("phrasal", 60, p => isStr(p.v) && isStr(p.fr) && isStr(p.ex) && LEVELS.includes(p.level) && typeof p.sep === "boolean");
checkArr("idioms", 40, p => isStr(p.en) && isStr(p.fr) && isStr(p.ex) && LEVELS.includes(p.level));
checkArr("falseFriends", 25, p => isStr(p.en) && isStr(p.means) && isStr(p.trap) && isStr(p.ex));
checkArr("connectors", 35, p => isStr(p.en) && isStr(p.fr) && isStr(p.role) && LEVELS.includes(p.level) && isStr(p.ex));
checkArr("writing", 25, p => LEVELS.includes(p.level) && isStr(p.title) && isStr(p.prompt) && isStr(p.words));
checkArr("dictation", 50, p => LEVELS.includes(p.level) && isStr(p.en));
checkArr("speaking", 40, p => LEVELS.includes(p.level) && isStr(p.en) && isStr(p.focus));
checkArr("daily", 50, p => isStr(p.en) && isStr(p.fr) && isStr(p.ex) && isStr(p.note));

const byLevel = {};
for (const L of HUB.lessons || []) byLevel[L.level] = (byLevel[L.level] || 0) + 1;
console.log("lessons:", (HUB.lessons || []).length, JSON.stringify(byLevel), "| vocab sets:", (HUB.vocab || []).length, "| extras:", Object.keys(X).join(", ") || "none");
if (errors.length) { console.log("\n" + errors.length + " ERROR(S):\n" + errors.join("\n")); process.exit(1); }
console.log("OK");
