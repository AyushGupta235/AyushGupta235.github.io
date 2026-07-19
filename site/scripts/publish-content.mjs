#!/usr/bin/env node
// Publish the unlisted page's content WITHOUT a git commit or push.
//
//   npm run publish
//
// The page's content lives only in site/private/portfolio.yaml (gitignored) and
// in the PORTFOLIO_YAML_B64 repo secret. So publishing a copy change means:
// update the secret, then re-run the existing deploy workflow. Neither step
// needs a commit — the workflow already allows workflow_dispatch.
//
// Requires the `gh` CLI, authenticated with repo + secrets scope.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = path.join(__dirname, "..", "private", "portfolio.yaml");
const WORKFLOW = "deploy.yml";

const run = (args, opts = {}) =>
  execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], ...opts }).trim();

if (!fs.existsSync(FILE)) {
  console.error(`✗ ${FILE} not found — nothing to publish.`);
  process.exit(1);
}

try {
  run(["auth", "status"]);
} catch {
  console.error("✗ gh CLI is not authenticated. Run: gh auth login");
  process.exit(1);
}

const yamlText = fs.readFileSync(FILE, "utf8");
const b64 = Buffer.from(yamlText).toString("base64");

// Sanity check: the file must still parse and carry a slug, or we'd deploy a
// build that silently drops the page.
if (!/^slug:\s*\S+/m.test(yamlText)) {
  console.error("✗ portfolio.yaml has no `slug:` — refusing to publish.");
  process.exit(1);
}

console.log(`→ Updating PORTFOLIO_YAML_B64 secret (${(b64.length / 1024).toFixed(1)} KB)…`);
execFileSync("gh", ["secret", "set", "PORTFOLIO_YAML_B64"], {
  input: b64,
  stdio: ["pipe", "inherit", "inherit"],
});

console.log(`→ Triggering ${WORKFLOW}…`);
run(["workflow", "run", WORKFLOW]);

console.log("✓ Deploy started. Watch it with:  gh run watch");
console.log("  (no commit, no push — the content never enters git)");
