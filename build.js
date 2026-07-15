// Builds a static, styled multi-page site from the Second Brain markdown.
// Re-runnable: copy latest markdown into ./content, then `node build.js`.
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const CONTENT = path.join(__dirname, 'content');
const OUT = path.join(__dirname, 'public');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Collect files: root md + sectioned dirs
function collect() {
  const items = [];
  for (const entry of fs.readdirSync(CONTENT)) {
    const full = path.join(CONTENT, entry);
    if (fs.statSync(full).isDirectory()) {
      for (const f of fs.readdirSync(full)) {
        if (f.endsWith('.md')) items.push({ section: entry, file: f, full: path.join(full, f) });
      }
    } else if (entry.endsWith('.md')) {
      items.push({ section: null, file: entry, full });
    }
  }
  return items;
}

const items = collect();

// slug + title
function slugFor(it) {
  const base = (it.section ? it.section + '-' : '') + it.file.replace(/\.md$/, '');
  return base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '.html';
}
function titleFor(it, html, raw) {
  const m = raw.match(/^#\s+(.+)$/m);
  if (m) return m[1].replace(/[#*`🧠🚀🌱📚🗄️📓🤖🎨📱✍️⚠️🔥🟡🟢]/gu, '').trim();
  return it.file.replace(/\.md$/, '');
}

// map original md links -> generated html pages
const linkMap = {};
for (const it of items) {
  const rel1 = (it.section ? it.section + '/' : '') + it.file;
  linkMap[rel1] = slugFor(it);
  linkMap[it.file] = slugFor(it);
  linkMap['../' + rel1] = slugFor(it);
}

const nav = { Dashboard: [], Projects: [], Areas: [], Resources: [], Log: [] };
const built = items.map(it => {
  const raw = fs.readFileSync(it.full, 'utf8');
  let body = marked.parse(raw);
  // rewrite internal .md links to .html pages
  body = body.replace(/href="([^"]+\.md)(#[^"]*)?"/g, (full, href) => {
    const clean = href.replace(/^\.\//, '');
    const target = linkMap[clean] || linkMap[path.basename(clean)];
    return target ? `href="${target}"` : full;
  });
  const slug = slugFor(it);
  const title = titleFor(it, body, raw);
  let bucket = 'Resources';
  if (!it.section && /SECOND-BRAIN/i.test(it.file)) bucket = 'Dashboard';
  else if (!it.section && /daily-log/i.test(it.file)) bucket = 'Log';
  else if (it.section && nav[it.section]) bucket = it.section;
  nav[bucket].push({ slug, title });
  return { slug, title, body, bucket };
});

// order dashboard first
const navOrder = ['Dashboard', 'Projects', 'Areas', 'Resources', 'Log'];
function sidebar(activeSlug) {
  let s = '<nav class="side">';
  s += `<div class="brand">🧠 World of Business</div>`;
  for (const sec of navOrder) {
    if (!nav[sec] || !nav[sec].length) continue;
    s += `<div class="sec">${sec}</div>`;
    for (const p of nav[sec]) {
      const cls = p.slug === activeSlug ? ' class="active"' : '';
      s += `<a href="${p.slug}"${cls}>${p.title}</a>`;
    }
  }
  s += '</nav>';
  return s;
}

const CSS = `
:root{--bg:#0f1115;--panel:#171a21;--ink:#e8eaed;--muted:#9aa4b2;--line:#262b34;--accent:#7c9cff;--accent2:#ffcf6b;}
*{box-sizing:border-box}
body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;background:var(--bg);color:var(--ink);}
.wrap{display:flex;min-height:100vh}
.side{width:260px;flex:0 0 260px;background:var(--panel);border-right:1px solid var(--line);padding:20px 14px;position:sticky;top:0;height:100vh;overflow:auto}
.brand{font-weight:700;font-size:18px;margin-bottom:18px;letter-spacing:.2px}
.sec{color:var(--muted);text-transform:uppercase;font-size:11px;letter-spacing:.12em;margin:18px 8px 6px}
.side a{display:block;color:var(--ink);text-decoration:none;padding:7px 10px;border-radius:8px;font-size:14.5px}
.side a:hover{background:#20242d}
.side a.active{background:#243056;color:#fff}
.main{flex:1;min-width:0;padding:40px 48px;max-width:900px}
.content h1{font-size:30px;margin:.2em 0 .6em;border-bottom:1px solid var(--line);padding-bottom:.3em}
.content h2{font-size:22px;margin:1.4em 0 .5em}
.content h3{font-size:17px;color:var(--muted)}
.content a{color:var(--accent);text-decoration:none}
.content a:hover{text-decoration:underline}
.content table{border-collapse:collapse;width:100%;margin:1em 0;font-size:14.5px}
.content th,.content td{border:1px solid var(--line);padding:8px 12px;text-align:left}
.content th{background:#1c2028}
.content code{background:#1c2028;padding:2px 6px;border-radius:5px;font-size:13.5px}
.content blockquote{border-left:3px solid var(--accent2);margin:1em 0;padding:.2em 1em;color:var(--muted);background:#15181f}
.content ul{padding-left:1.2em}
.content hr{border:none;border-top:1px solid var(--line);margin:2em 0}
.updated{color:var(--muted);font-size:12.5px;margin-top:40px;border-top:1px solid var(--line);padding-top:14px}
@media(max-width:760px){.wrap{flex-direction:column}.side{width:100%;height:auto;position:static;flex-basis:auto}.main{padding:24px}}
`;

const now = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
function page(p) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${p.title} — World of Business</title><style>${CSS}</style></head>
<body><div class="wrap">${sidebar(p.slug)}
<main class="main"><article class="content">${p.body}</article>
<div class="updated">Rendered ${now} · Philip Baker's Second Brain</div></main></div></body></html>`;
}

for (const p of built) fs.writeFileSync(path.join(OUT, p.slug), page(p));
// index -> dashboard
const dash = built.find(b => b.bucket === 'Dashboard') || built[0];
fs.writeFileSync(path.join(OUT, 'index.html'), page(dash));
console.log('Built', built.length + 1, 'pages ->', OUT);
