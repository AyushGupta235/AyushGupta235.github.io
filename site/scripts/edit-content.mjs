#!/usr/bin/env node
// Local-only content editor for the unlisted work page. Run with:
//   npm run edit
// then open http://localhost:4322 — it's a plain form over
// site/private/portfolio.yaml, so editing prose/numbers doesn't mean touching
// code. Binds to 127.0.0.1 only; never reads/writes anything outside that one
// file. Structural changes (adding/removing a whole project or a viz row) are
// still a YAML edit — this tool edits existing fields, it doesn't reshape them.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "..", "private", "portfolio.yaml");
const PORT = 4322;

// Fields that read as prose even when short — always a textarea, never a
// single-line input, so line-wrapping while typing doesn't fight the field.
const LONG_FIELDS = new Set([
  "lede", "note", "context", "impact", "lessons", "pull_quote", "subtitle",
  "headline", "one_liner", "caption", "rule", "title",
]);

function readRaw() {
  return fs.readFileSync(FILE, "utf8");
}

function splitHeader(raw) {
  const lines = raw.split("\n");
  let i = 0;
  while (i < lines.length && (lines[i].trim() === "" || lines[i].trim().startsWith("#"))) i++;
  return { header: lines.slice(0, i).join("\n"), body: lines.slice(i).join("\n") };
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function itemLabel(value, index, parentKey) {
  if (value && typeof value === "object") {
    if (typeof value.title === "string") return value.title;
    if (typeof value.headline === "string") return value.headline;
    if (typeof value.label === "string") return value.label;
    if (typeof value.key === "string") return value.key;
  }
  const singular = parentKey.endsWith("s") ? parentKey.slice(0, -1) : parentKey;
  return `${singular} ${index + 1}`;
}

function fieldId(pathStr) {
  return "f_" + pathStr.replace(/[^a-zA-Z0-9]/g, "_");
}

function renderLeaf(value, pathStr, label) {
  const id = fieldId(pathStr);
  const type = typeof value;
  if (type === "boolean") {
    return `<div class="field field-check">
      <input type="hidden" name="${pathStr}" value="false">
      <label for="${id}"><input type="checkbox" id="${id}" name="${pathStr}" value="true" ${value ? "checked" : ""}> ${escapeHtml(label)}</label>
      <input type="hidden" name="${pathStr}__type" value="boolean">
    </div>`;
  }
  if (type === "number") {
    return `<div class="field">
      <label for="${id}">${escapeHtml(label)}</label>
      <input type="text" inputmode="decimal" id="${id}" name="${pathStr}" value="${escapeHtml(value)}">
      <input type="hidden" name="${pathStr}__type" value="number">
    </div>`;
  }
  const str = String(value ?? "");
  const long = LONG_FIELDS.has(label) || str.length > 70;
  if (long) {
    const rows = Math.min(12, Math.max(2, Math.ceil(str.length / 68)));
    return `<div class="field field-wide">
      <label for="${id}">${escapeHtml(label)}</label>
      <textarea id="${id}" name="${pathStr}" rows="${rows}">${escapeHtml(str)}</textarea>
      <input type="hidden" name="${pathStr}__type" value="string">
    </div>`;
  }
  return `<div class="field">
    <label for="${id}">${escapeHtml(label)}</label>
    <input type="text" id="${id}" name="${pathStr}" value="${escapeHtml(str)}">
    <input type="hidden" name="${pathStr}__type" value="string">
  </div>`;
}

function renderNode(value, pathStr, label, depth) {
  if (Array.isArray(value)) {
    const parentKey = label.toLowerCase();
    const body = value.map((v, i) => renderNode(v, `${pathStr}[${i}]`, itemLabel(v, i, parentKey), depth + 1)).join("");
    return `<details class="node" ${depth < 2 ? "open" : ""}>
      <summary>${escapeHtml(label)} <span class="count">${value.length} item${value.length === 1 ? "" : "s"}</span></summary>
      <div class="node-body">${body}</div>
    </details>`;
  }
  if (value !== null && typeof value === "object") {
    const body = Object.entries(value).map(([k, v]) => renderNode(v, pathStr ? `${pathStr}.${k}` : k, k, depth + 1)).join("");
    return `<details class="node" ${depth < 2 ? "open" : ""}>
      <summary>${escapeHtml(label)}</summary>
      <div class="node-body">${body}</div>
    </details>`;
  }
  return renderLeaf(value, pathStr, label);
}

// Push content live: update the repo secret + re-run the deploy workflow.
// No commit, no push — the content never enters git.
function publish() {
  const raw = readRaw();
  if (!/^slug:\s*\S+/m.test(raw)) throw new Error("portfolio.yaml has no `slug:` — refusing to publish.");
  const b64 = Buffer.from(raw).toString("base64");
  execFileSync("gh", ["secret", "set", "PORTFOLIO_YAML_B64"], { input: b64, stdio: ["pipe", "ignore", "pipe"] });
  execFileSync("gh", ["workflow", "run", "deploy.yml"], { stdio: ["ignore", "ignore", "pipe"] });
}

function page(body, flash) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Edit portfolio content</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; max-width: 760px; margin: 0 auto; padding: 2rem 1.25rem 6rem; line-height: 1.5; }
  h1 { font-size: 1.1rem; letter-spacing: 0.04em; text-transform: uppercase; }
  .help { color: #777; font-size: 0.85rem; margin-bottom: 1.5rem; }
  details.node { border-left: 2px solid #ccc; padding-left: 0.9rem; margin: 0.6rem 0; }
  details.node > summary { cursor: pointer; font-weight: 700; padding: 0.25rem 0; }
  details.node .count { font-weight: 400; color: #888; font-size: 0.8em; }
  .node-body { padding-left: 0.25rem; }
  .field { margin: 0.6rem 0; }
  .field label { display: block; font-size: 0.78rem; color: #666; margin-bottom: 0.2rem; }
  .field input[type="text"], .field textarea { width: 100%; box-sizing: border-box; font: inherit; padding: 0.4rem 0.5rem; border: 1px solid #bbb; border-radius: 3px; background: transparent; color: inherit; }
  .field textarea { resize: vertical; }
  .field-check label { display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; color: inherit; }
  .bar { position: sticky; bottom: 0; background: Canvas; border-top: 1px solid #999; padding: 0.9rem 0; margin-top: 2rem; display: flex; gap: 0.8rem; align-items: center; }
  button { font: inherit; padding: 0.5rem 1.1rem; border: 1px solid #999; border-radius: 4px; background: transparent; color: inherit; cursor: pointer; }
  button.primary { background: #c8201c; border-color: #c8201c; color: #fff; font-weight: 700; }
  .flash { padding: 0.5rem 0.8rem; border-radius: 4px; margin-bottom: 1rem; font-size: 0.85rem; color: #fff; }
  .flash.ok { background: #1a7f37; }
  .flash.err { background: #c8201c; }
  .secret { margin-top: 1rem; }
  .secret textarea { width: 100%; box-sizing: border-box; font-size: 0.7rem; }
  details.secret-box summary { cursor: pointer; font-size: 0.85rem; color: #666; }
</style>
</head>
<body>
  <h1>Edit portfolio content</h1>
  <p class="help">
    Local-only editor over <code>site/private/portfolio.yaml</code> — a file that is never committed.
    <b>Save</b> rewrites it on disk (refresh your dev server to see it).
    <b>Publish</b> pushes it live: updates the GitHub secret and re-runs the deploy — no commit, no
    git push. Adding or removing a whole project still means opening the YAML directly.
  </p>
  ${flash ? `<p class="flash ${flash.kind}">${escapeHtml(flash.msg)}</p>` : ""}
  <form method="POST" action="/save">
    ${body}
    <div class="bar">
      <button class="primary" type="submit">Save</button>
      <button type="submit" formaction="/publish" formnovalidate>Save &amp; Publish →</button>
      <a href="/" style="margin-left:auto;color:#888;font-size:0.85rem;">Reload</a>
    </div>
  </form>
  <details class="secret-box">
    <summary>Deploy secret (base64) — for pasting into PORTFOLIO_YAML_B64 by hand</summary>
    <div class="secret">
      <textarea readonly rows="6" onclick="this.select()">${escapeHtml(Buffer.from(readRaw()).toString("base64"))}</textarea>
    </div>
  </details>
</body>
</html>`;
}

function tokenize(pathStr) {
  const tokens = [];
  const re = /([a-zA-Z0-9_]+)|\[(\d+)\]/g;
  let m;
  while ((m = re.exec(pathStr))) tokens.push(m[1] !== undefined ? m[1] : Number(m[2]));
  return tokens;
}

function setByPath(obj, tokens, value) {
  let cur = obj;
  for (let i = 0; i < tokens.length - 1; i++) cur = cur[tokens[i]];
  cur[tokens[tokens.length - 1]] = value;
}

function applyForm(body) {
  const params = new URLSearchParams(body);
  const data = yaml.load(splitHeader(readRaw()).body);

  const paths = new Set();
  for (const key of params.keys()) {
    if (!key.endsWith("__type")) paths.add(key);
  }

  for (const p of paths) {
    const type = params.get(`${p}__type`) || "string";
    const raw = params.getAll(p).at(-1) ?? "";
    let value;
    if (type === "number") value = Number(raw);
    else if (type === "boolean") value = raw === "true";
    else value = raw;
    setByPath(data, tokenize(p), value);
  }

  const { header } = splitHeader(readRaw());
  const dumped = yaml.dump(data, { lineWidth: 100, noRefs: true });
  fs.writeFileSync(FILE, header + "\n" + dumped);
}

function handleSave(body, res) {
  applyForm(body);
  res.writeHead(303, { Location: "/?flash=saved" });
  res.end();
}

function handlePublish(body, res) {
  applyForm(body);
  try {
    publish();
    res.writeHead(303, { Location: "/?flash=published" });
  } catch (err) {
    const msg = (err.stderr?.toString() || err.message || "unknown error").trim().split("\n").at(-1);
    res.writeHead(303, { Location: "/?flash=error&msg=" + encodeURIComponent(msg) });
  }
  res.end();
}

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url.startsWith("/")) {
    if (!fs.existsSync(FILE)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`private/portfolio.yaml not found at ${FILE}`);
      return;
    }
    const { body } = splitHeader(readRaw());
    const data = yaml.load(body);

    const q = new URL(req.url, "http://localhost").searchParams;
    const flashes = {
      saved: { kind: "ok", msg: "Saved to disk. Not published yet." },
      published: { kind: "ok", msg: "Saved and deploy triggered — live in ~1 min. Check: gh run watch" },
      error: { kind: "err", msg: "Saved, but publish failed: " + (q.get("msg") || "unknown error") },
    };
    const flash = flashes[q.get("flash")] || null;

    const formBody = Object.entries(data).map(([k, v]) => renderNode(v, k, k, 0)).join("");
    const html = page(formBody, flash);
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
    return;
  }
  if (req.method === "POST" && (req.url === "/save" || req.url === "/publish")) {
    const isPublish = req.url === "/publish";
    let chunks = "";
    req.on("data", (c) => (chunks += c));
    req.on("end", () => (isPublish ? handlePublish(chunks, res) : handleSave(chunks, res)));
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Portfolio editor → http://localhost:${PORT}`);
  console.log(`Editing: ${FILE}`);
});
