#!/usr/bin/env node
/**
 * Deterministic local release-candidate staging. Does not publish.
 * Records dirty working trees explicitly — never claims a clean revision falsely.
 */
import { createHash } from "node:crypto";
import {
  cpSync,
  createReadStream,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const marketplaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const splitRoot = resolve(marketplaceRoot, "..");
const outDir = join(marketplaceRoot, "release-candidate");
const pluginsOut = join(outDir, "plugins");

const entries = [
  { name: "praxis", repo: "praxis-marketplace", sourceRel: "plugins/praxis" },
  { name: "praxis-ba", repo: "praxis-ba", sourceRel: "plugins/ba" },
  { name: "praxis-architect", repo: "praxis-architect", sourceRel: "plugins/architect" },
  { name: "praxis-developer", repo: "praxis-developer", sourceRel: "plugins/developer" },
  { name: "praxis-quality", repo: "praxis-quality", sourceRel: "plugins/quality" },
  { name: "praxis-runtime", repo: "praxis-runtime", sourceRel: "plugins/runtime" },
];

function git(repoPath, args) {
  return spawnSync("git", args, { cwd: repoPath, encoding: "utf8" });
}

function sha256File(path) {
  const hash = createHash("sha256");
  hash.update(readFileSync(path));
  return `sha256:${hash.digest("hex")}`;
}

function listSkills(pluginRoot) {
  const skillsDir = join(pluginRoot, "skills");
  if (!existsSync(skillsDir)) return [];
  return readdirSync(skillsDir)
    .filter((name) => existsSync(join(skillsDir, name, "SKILL.md")))
    .sort();
}

function walkFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walkFiles(path, acc);
    } else {
      acc.push(path);
    }
  }
  return acc;
}

if (existsSync(outDir)) rmSync(outDir, { recursive: true, force: true });
mkdirSync(pluginsOut, { recursive: true });
mkdirSync(join(outDir, ".claude-plugin"), { recursive: true });

const plugins = [];
for (const entry of entries) {
  const repoPath = join(splitRoot, entry.repo);
  const source = join(repoPath, entry.sourceRel);
  if (!existsSync(source)) throw new Error(`missing ${source}`);
  const dest = join(pluginsOut, entry.name);
  cpSync(source, dest, {
    recursive: true,
    filter: (src) => !src.includes("node_modules") && !src.includes("/.git/"),
  });
  const head = git(repoPath, ["rev-parse", "HEAD"]).stdout.trim();
  const branch = git(repoPath, ["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim();
  const dirty = git(repoPath, ["status", "--porcelain"]).stdout.trim();
  const pkg = existsSync(join(dest, ".claude-plugin/plugin.json"))
    ? JSON.parse(readFileSync(join(dest, ".claude-plugin/plugin.json"), "utf8"))
    : {};
  const files = walkFiles(dest).map((path) => ({
    path: relative(dest, path),
    sha256: sha256File(path),
    bytes: statSync(path).size,
  }));
  const artifactDigest = createHash("sha256");
  for (const file of [...files].sort((a, b) => a.path.localeCompare(b.path))) {
    artifactDigest.update(file.path);
    artifactDigest.update(file.sha256);
  }
  plugins.push({
    name: entry.name,
    version: pkg.version || "0.1.0-alpha.49",
    sourceRepository: entry.repo,
    sourceRevision: head,
    sourceBranch: branch,
    dirtyWorkingTree: Boolean(dirty),
    dirtySummary: dirty ? dirty.split("\n").slice(0, 20) : [],
    skills: listSkills(dest),
    runtimeExecutables: existsSync(join(dest, "server/praxis-mcp.cjs"))
      ? ["server/praxis-mcp.cjs"]
      : [],
    mcpConfig: existsSync(join(dest, ".mcp.json")),
    artifactChecksum: `sha256:${artifactDigest.digest("hex")}`,
    fileCount: files.length,
  });
  writeFileSync(join(dest, "FILES.sha256.json"), `${JSON.stringify(files, null, 2)}\n`);
}

cpSync(join(marketplaceRoot, ".claude-plugin/marketplace.json"), join(outDir, ".claude-plugin/marketplace.json"));
// The release candidate ships the real marketplace manifest (entries, dependencies, versions), not a rewritten copy.

const host = {
  node: process.version,
  platform: process.platform,
  arch: process.arch,
  claudeCode: (spawnSync("claude", ["--version"], { encoding: "utf8" }).stdout || "").trim() || null,
};

const manifest = {
  contract: "praxis.marketplace.release-candidate",
  version: 1,
  builtAt: new Date().toISOString(),
  host,
  requiredHostVersions: { claudeCode: ">=2.1.278", node: ">=20" },
  dirtySources: plugins.filter((p) => p.dirtyWorkingTree).map((p) => p.name),
  warning: plugins.some((p) => p.dirtyWorkingTree)
    ? "One or more plugins were built from dirty working trees. Do not claim a clean published revision."
    : null,
  plugins,
};
writeFileSync(join(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const validate = spawnSync("claude", ["plugin", "validate", outDir], { encoding: "utf8" });
console.log(validate.stdout || validate.stderr);
if ((validate.status ?? 1) !== 0) process.exit(1);
console.log(`PASS release-candidate at ${outDir}`);
console.log(`dirtySources=${manifest.dirtySources.join(",") || "(none)"}`);
