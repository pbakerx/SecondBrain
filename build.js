// Builds the Second Brain site from markdown, plus a Metrics page.
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const CONTENT = path.join(__dirname, 'content');
const OUT = path.join(__dirname, 'public');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

function collect() {
  const items = [];
  for (const entry of fs.readdirSync(CONTENT)) {
    const full = path.join(CONTENT, entry);
    if (fs.statSync(full).isDirectory()) {
      for (const f of fs.readdirSync(full)) if (f.endsWith('.md')) items.push({ section: entry, file: f, full: path.join(full, f) });
    } else if (entry.endsWith('.md')) items.push({ section: null, file: entry, full });
  }
  return items;
}
const items = collect();

function slugFor(it) {
  const base = (it.section ? it.section + '-' : '') + it.file.replace(/\.md$/, '');
  return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '.html';
}
function titleFor(it, raw) {
  const m = raw.match(/^#\s+(.+)$/m);
  if (m) return m[1].replace(/[#*`🧠🚀🌱📚🗄️📓🤖🎨📱✍️⚠️🔥🟡🟢🆕✅⭐📊]/gu, '').trim();
  return it.file.replace(/\.md$/, '');
}
const linkMap = {};
for (const it of items) {
  const rel1 = (it.section ? it.section + '/' : '') + it.file;
  linkMap[rel1] = slugFor(it); linkMap[it.file] = slugFor(it); linkMap['../' + rel1] = slugFor(it);
}
const nav = { Dashboard: [], Projects: [], Areas: [], Resources: [], Log: [] };
const built = items.map(it => {
  const raw = fs.readFileSync(it.full, 'utf8');
  let body = marked.parse(raw);
  body = body.replace(/href="([^"]+\.md)(#[^"]*)?"/g, (full, href) => {
    const clean = href.replace(/^\.\//, '');
    const target = linkMap[clean] || linkMap[path.basename(clean)];
    return target ? `href="${target}"` : full;
  });
  const slug = slugFor(it); const title = titleFor(it, raw);
  let bucket = 'Resources';
  if (!it.section && /SECOND-BRAIN/i.test(it.file)) bucket = 'Dashboard';
  else if (!it.section && /daily-log/i.test(it.file)) bucket = 'Log';
  else if (it.section && nav[it.section]) bucket = it.section;
  nav[bucket].push({ slug, title });
  return { slug, title, body, bucket };
});

// ---------- METRICS ----------
function computeStats() {
  const dir = path.join(CONTENT, 'Projects');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.md')) : [];
  const today = new Date();
  return files.map(f => {
    const raw = fs.readFileSync(path.join(dir, f), 'utf8');
    const title = ((raw.match(/^#\s+(.+)$/m) || [])[1] || f).replace(/[#*`]/g, '').trim();
    const st = ((raw.match(/\*\*Status:\*\*\s*([^\n|]+)/) || [])[1] || '').trim();
    let cat = 'active';
    if (/✅|done|archived|complete|billed/i.test(st)) cat = 'done';
    else if (/🆕|\bnew\b/i.test(st)) cat = 'new';
    const dates = (raw.match(/20\d\d-\d\d-\d\d/g) || []).sort();
    const last = dates.length ? dates[dates.length - 1] : null;
    const days = last ? Math.round((today - new Date(last + 'T00:00:00')) / 86400000) : null;
    return { title, status: st, cat, lastTouched: last, days };
  });
}
const stats = computeStats();
const activeCount = stats.filter(s => s.cat === 'active').length;
const newCount = stats.filter(s => s.cat === 'new').length;
const doneCount = stats.filter(s => s.cat === 'done').length;
const today = new Date().toISOString().slice(0, 10);
const HIST = path.join(__dirname, 'metrics-history.json');
let hist = []; try { hist = JSON.parse(fs.readFileSync(HIST, 'utf8')); } catch (e) {}
const row = { date: today, active: activeCount, new: newCount, done: doneCount, total: stats.length };
const hi = hist.findIndex(h => h.date === today);
if (hi >= 0) hist[hi] = row; else hist.push(row);
hist.sort((a, b) => a.date.localeCompare(b.date));
fs.writeFileSync(HIST, JSON.stringify(hist, null, 2));
const staleness = stats.filter(s => s.cat !== 'done')
  .map(s => ({ title: s.title, days: s.days == null ? 0 : s.days }))
  .sort((a, b) => b.days - a.days);

const navOrder = ['Dashboard', 'Projects', 'Areas', 'Resources', 'Log'];
function sidebar(activeSlug) {
  let s = '<nav class="side"><div class="brand">🧠 World of Business</div>';
  const mc = activeSlug === 'metrics.html' ? ' class="active"' : '';
  s += `<a href="metrics.html"${mc}>📊 Metrics</a>`;
  for (const sec of navOrder) {
    if (!nav[sec] || !nav[sec].length) continue;
    s += `<div class="sec">${sec}</div>`;
    for (const p of nav[sec]) s += `<a href="${p.slug}"${p.slug === activeSlug ? ' class="active"' : ''}>${p.title}</a>`;
  }
  return s + '</nav>';
}
const CSS = `
:root{--bg:#0f1115;--panel:#171a21;--ink:#e8eaed;--muted:#9aa4b2;--line:#262b34;--accent:#7c9cff;--accent2:#ffcf6b;}
*{box-sizing:border-box}body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink);}
.wrap{display:flex;min-height:100vh}
.side{width:260px;flex:0 0 260px;background:var(--panel);border-right:1px solid var(--line);padding:20px 14px;position:sticky;top:0;height:100vh;overflow:auto}
.brand{font-weight:700;font-size:18px;margin-bottom:14px}
.sec{color:var(--muted);text-transform:uppercase;font-size:11px;letter-spacing:.12em;margin:18px 8px 6px}
.side a{display:block;color:var(--ink);text-decoration:none;padding:7px 10px;border-radius:8px;font-size:14.5px}
.side a:hover{background:#20242d}.side a.active{background:#243056;color:#fff}
.main{flex:1;min-width:0;padding:40px 48px;max-width:900px}
.content h1{font-size:30px;margin:.2em 0 .6em;border-bottom:1px solid var(--line);padding-bottom:.3em}
.content h2{font-size:22px;margin:1.4em 0 .5em}.content h3{font-size:17px;color:var(--muted)}
.content a{color:var(--accent);text-decoration:none}.content a:hover{text-decoration:underline}
.content table{border-collapse:collapse;width:100%;margin:1em 0;font-size:14.5px}
.content th,.content td{border:1px solid var(--line);padding:8px 12px;text-align:left}.content th{background:#1c2028}
.content code{background:#1c2028;padding:2px 6px;border-radius:5px;font-size:13.5px}
.content blockquote{border-left:3px solid var(--accent2);margin:1em 0;padding:.2em 1em;color:var(--muted);background:#15181f}
.content ul{padding-left:1.2em}.content hr{border:none;border-top:1px solid var(--line);margin:2em 0}
.updated{color:var(--muted);font-size:12.5px;margin-top:40px;border-top:1px solid var(--line);padding-top:14px}
.cards{display:flex;gap:14px;flex-wrap:wrap;margin:8px 0 24px}
.card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px 20px;min-width:120px}
.card .n{font-size:30px;font-weight:700}.card .l{color:var(--muted);font-size:13px}
.chartbox{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:18px;margin:18px 0}
@media(max-width:760px){.wrap{flex-direction:column}.side{width:100%;height:auto;position:static}.main{padding:24px}}
`;
const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
function shell(activeSlug, title, mainInner, extraHead) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${title} — World of Business</title><style>${CSS}</style>${extraHead || ''}</head><body><div class="wrap">${sidebar(activeSlug)}<main class="main">${mainInner}<div class="updated">Rendered ${now} · Philip Baker's Second Brain</div></main></div></body></html>`;
}
function page(p) { return shell(p.slug, p.title, `<article class="content">${p.body}</article>`); }

for (const p of built) fs.writeFileSync(path.join(OUT, p.slug), page(p));
const dash = built.find(b => b.bucket === 'Dashboard') || built[0];
fs.writeFileSync(path.join(OUT, 'index.html'), page(dash));

// Metrics page
const metricsMain = `<article class="content"><h1>📊 Metrics</h1>
<div class="cards">
<div class="card"><div class="n">${activeCount}</div><div class="l">Active</div></div>
<div class="card"><div class="n">${newCount}</div><div class="l">New / not started</div></div>
<div class="card"><div class="n">${doneCount}</div><div class="l">Completed</div></div>
<div class="card"><div class="n">${stats.length}</div><div class="l">Total tracked</div></div>
</div>
<h2>Throughput over time</h2>
<p style="color:var(--muted);font-size:13.5px;margin-top:-6px">Daily snapshot of your pipeline. Trends fill in as the 7 AM sync runs each day.</p>
<div class="chartbox"><canvas id="through" height="120"></canvas></div>
<h2>Momentum &amp; staleness</h2>
<p style="color:var(--muted);font-size:13.5px;margin-top:-6px">Days since each active project last moved. <span style="color:#ff6b6b">Red = 14+ days (going stale)</span>, amber = 7+, green = fresh.</p>
<div class="chartbox"><canvas id="stale" height="${Math.max(120, staleness.length * 26)}"></canvas></div>
</article>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
<script>
const HIST=${JSON.stringify(hist)}; const STALE=${JSON.stringify(staleness)};
const grid={color:'#262b34'}, tick={color:'#9aa4b2'};
new Chart(document.getElementById('through'),{type:'line',data:{labels:HIST.map(h=>h.date),datasets:[
{label:'Active',data:HIST.map(h=>h.active),borderColor:'#7c9cff',backgroundColor:'#7c9cff33',tension:.3},
{label:'New',data:HIST.map(h=>h.new),borderColor:'#ffcf6b',backgroundColor:'#ffcf6b33',tension:.3},
{label:'Completed',data:HIST.map(h=>h.done),borderColor:'#5ad19a',backgroundColor:'#5ad19a33',tension:.3}]},
options:{plugins:{legend:{labels:{color:'#e8eaed'}}},scales:{x:{grid,ticks:tick},y:{grid,ticks:tick,beginAtZero:true}}}});
new Chart(document.getElementById('stale'),{type:'bar',data:{labels:STALE.map(s=>s.title),datasets:[{label:'Days since last activity',data:STALE.map(s=>s.days),backgroundColor:STALE.map(s=>s.days>=14?'#ff6b6b':s.days>=7?'#ffcf6b':'#5ad19a')}]},
options:{indexAxis:'y',plugins:{legend:{display:false}},scales:{x:{grid,ticks:tick,beginAtZero:true},y:{grid,ticks:tick}}}});
</script>`;
fs.writeFileSync(path.join(OUT, 'metrics.html'), shell('metrics.html', 'Metrics', metricsMain));

console.log('Built', built.length + 2, 'pages (incl. Metrics). Active', activeCount, 'New', newCount, 'Done', doneCount);
