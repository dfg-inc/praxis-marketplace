#!/usr/bin/env node
/**
 * Public-content gate: nothing that must not leave the company ships in this repository's plugins or in the release
 * archives. Scans the CONTENT of what users receive, not only source files:
 *   - this repository's tracked tree (plugins/, .claude-plugin/, root documents);
 *   - when the sibling repositories are checked out next to this one: the extracted Runtime .mcpb, the four role ZIPs and
 *     every vendored @praxis/*.tgz.
 * Fails on developer home paths, internal hosts, the unconfirmed corporate knowledge dataset (labels and files), a
 * withdrawn personal address, secret shapes and .env/key files; and requires LICENSE (Apache-2.0 text), NOTICE and
 * the Apache-2.0 / dfuture-co declarations in each plugin and archive manifest.
 */
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const split = resolve(root, "..");
const failures = [];
const notes = [];
const fail = (where, what) => failures.push(`${where}: ${what}`);

const FORBIDDEN = [
  ["developer home path", /\/Users\/(?!example\b|you\b|me\b|user\b|name\b|runner\b)[A-Za-z0-9._-]+\/|[A-Z]:\\Users\\[A-Za-z0-9._-]+\\/],
  ["internal host", /jetru\.by|jetruby/i],
  ["corporate dataset label", /corp-engineering-handbook|corp-quality-policy/],
  ["corporate dataset file", /dataset\/(company|product\/demo)\//],
  ["withdrawn personal address", /alexey\.golubev/i],
  ["secret shape", /ghp_[A-Za-z0-9]{30,}|glpat-[A-Za-z0-9_-]{18,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----|xox[bp]-[0-9]{8,}|sk-[A-Za-z0-9]{40,}/],
];
const FORBIDDEN_NAMES = /(^|\/)(\.env(\..*)?|id_rsa.*|.*\.pem|.*\.key)$/;
const APACHE = "Apache License\n                           Version 2.0, January 2004";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules" || name === "release-candidate") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (st.isFile()) out.push(p);
  }
  return out;
}

function scanTree(dir, label) {
  const files = walk(dir);
  for (const f of files) {
    const rel = relative(dir, f);
    if (FORBIDDEN_NAMES.test(rel)) fail(`${label}/${rel}`, "secret-bearing file name");
    if (statSync(f).size > 20_000_000) continue;
    const text = readFileSync(f).toString("latin1");
    for (const [name, re] of FORBIDDEN) {
      const m = re.exec(text);
      if (m) fail(`${label}/${rel}`, `${name} ("${m[0].slice(0, 60)}")`);
    }
  }
  return files.length;
}

function requireLicenseFiles(dir, label, { notice = true } = {}) {
  const lic = join(dir, "LICENSE");
  if (!existsSync(lic) || !readFileSync(lic, "utf8").includes(APACHE)) fail(label, "LICENSE missing or not the Apache License 2.0 text");
  if (notice && !existsSync(join(dir, "NOTICE"))) fail(label, "NOTICE missing");
}

function checkManifest(file, label, { author = true } = {}) {
  if (!existsSync(file)) return fail(label, `${relative(dir0(file), file)} missing`);
  const j = JSON.parse(readFileSync(file, "utf8"));
  if (j.license !== "Apache-2.0") fail(label, `license ${JSON.stringify(j.license)} is not Apache-2.0`);
  const a = typeof j.author === "string" ? j.author : j.author?.name;
  if (author && a !== "dfuture-co") fail(label, `author ${JSON.stringify(j.author)} is not dfuture-co`);
  if (j.author && typeof j.author === "object" && j.author.email) fail(label, "author carries an e-mail address");
}
const dir0 = (f) => dirname(f);

// 1. this repository
const plugins = join(root, "plugins");
let count = scanTree(plugins, "plugins") + scanTree(join(root, ".claude-plugin"), ".claude-plugin");
for (const f of ["README.md", "LICENSE", "NOTICE"]) {
  const p = join(root, f);
  if (!existsSync(p)) { fail(f, "missing"); continue; }
  const text = readFileSync(p, "latin1");
  for (const [name, re] of FORBIDDEN) if (re.test(text)) fail(f, name);
}
for (const d of readdirSync(plugins)) {
  const p = join(plugins, d);
  if (!statSync(p).isDirectory()) continue;
  requireLicenseFiles(p, `plugins/${d}`);
  checkManifest(join(p, ".claude-plugin", "plugin.json"), `plugins/${d}`);
}
requireLicenseFiles(root, "repository root");
notes.push(`marketplace tree: ${count} files`);

// 2. release archives and vendored packages, when the sibling repositories are present
const work = mkdtempSync(join(tmpdir(), "praxis-public-content-"));
function extract(kind, archive, dest) {
  const r = kind === "zip"
    ? spawnSync("unzip", ["-oq", archive, "-d", dest], { encoding: "utf8" })
    : spawnSync("tar", ["xzf", archive, "-C", dest], { encoding: "utf8" });
  if (r.status !== 0) fail(archive, `cannot extract: ${(r.stderr || r.stdout).slice(0, 120)}`);
}
try {
  const archives = [];
  const mcpb = join(split, "praxis-runtime/claude-extensions/praxis-runtime.mcpb");
  if (existsSync(mcpb)) archives.push({ kind: "zip", file: mcpb, role: "mcpb" });
  for (const r of ["ba", "architect", "developer", "quality"]) {
    const z = join(split, `praxis-${r}/claude-plugins/praxis-${r}.zip`);
    if (existsSync(z)) archives.push({ kind: "zip", file: z, role: "zip" });
  }
  for (const repo of ["core", "runtime", "ba", "architect", "developer", "quality"]) {
    const v = join(split, `praxis-${repo}/vendor`);
    if (!existsSync(v)) continue;
    for (const f of readdirSync(v)) if (f.endsWith(".tgz")) archives.push({ kind: "tgz", file: join(v, f), role: "tgz" });
  }
  let i = 0;
  for (const a of archives) {
    const dest = join(work, String(i++));
    spawnSync("mkdir", ["-p", dest]);
    extract(a.kind, a.file, dest);
    const base = a.role === "tgz" ? join(dest, "package") : dest;
    const label = relative(split, a.file);
    scanTree(dest, label);
    if (a.role === "mcpb") {
      requireLicenseFiles(base, label);
      if (!existsSync(join(base, "THIRD-PARTY-NOTICES.md"))) fail(label, "THIRD-PARTY-NOTICES.md missing");
      checkManifest(join(base, "manifest.json"), label);
    } else if (a.role === "zip") {
      requireLicenseFiles(base, label);
      checkManifest(join(base, ".claude-plugin", "plugin.json"), label);
      if (label.includes("praxis-ba")) {
        const tpn = join(base, "THIRD-PARTY-NOTICES.md");
        if (!existsSync(tpn) || !readFileSync(tpn, "utf8").includes("Matt Pocock")) fail(label, "BA archive lacks the MIT notice for the adapted grill-cr text");
      }
    } else {
      if (!existsSync(join(base, "LICENSE"))) fail(label, "package LICENSE missing");
      checkManifest(join(base, "package.json"), label, { author: false });
      if (existsSync(join(base, "dataset", "company")) || existsSync(join(base, "dataset", "product", "demo"))) fail(label, "ships the corporate knowledge dataset");
    }
  }
  notes.push(`archives: ${archives.length} extracted and scanned${archives.length ? "" : " (sibling repositories not present: skipped)"}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`FAIL check-public-content:\n  ${failures.join("\n  ")}`);
  process.exit(1);
}
console.log(`PASS check-public-content (${notes.join("; ")})`);
