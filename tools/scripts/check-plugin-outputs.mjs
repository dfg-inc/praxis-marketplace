#!/usr/bin/env node
/**
 * The installable plugins must carry their generated build outputs, tracked in git, and work with no npm install:
 *   1. no file under plugins/ is untracked or ignored (a .gitignore rule once dropped BA canon-graph/dist silently)
 *   2. BA: canon-graph/dist is present and bin/praxis-ba.cjs (the CLI the BA skills call) runs in a bare directory
 *   3. every role plugin ships tools/session-bootstrap.cjs and it runs
 *   4. Runtime: server/praxis-mcp.cjs starts (stdio) and reports ready
 *   5. every ${CLAUDE_PLUGIN_ROOT}/<path> a skill, hook or agent mentions exists in that plugin
 *   6. no absolute developer path in a shipped build output
 * Needs only Node and git (when run inside a git checkout). No network, no Claude CLI.
 */
import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const plugins = join(root, "plugins");
const problems = [];
const bad = (message) => problems.push(message);
const proven = [];
const walk = (dir, acc = []) => {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else acc.push(path);
  }
  return acc;
};
const run = (cmd, args, options = {}) => spawnSync(cmd, args, { encoding: "utf8", timeout: 60_000, ...options });

// 1. tracked, not ignored
const inGit = existsSync(join(root, ".git")) && run("git", ["-C", root, "rev-parse", "--git-dir"]).status === 0;
if (inGit) {
  const stray = run("git", ["-C", root, "ls-files", "--others", "--exclude-standard", "--", "plugins"]).stdout.trim();
  const ignored = run("git", ["-C", root, "ls-files", "--others", "--ignored", "--exclude-standard", "--", "plugins"]).stdout.trim();
  if (stray) bad(`untracked files under plugins/ (would not ship): ${stray.split("\n").slice(0, 5).join(", ")}`);
  if (ignored) bad(`git-ignored files under plugins/ (would not ship): ${ignored.split("\n").slice(0, 5).join(", ")} (${ignored.split("\n").length} total)`);
  proven.push("every file under plugins/ is tracked (nothing ignored or untracked)");
}

const work = mkdtempSync(join(tmpdir(), "praxis-outputs-"));
try {
  // 2. BA CLI
  const ba = join(plugins, "praxis-ba");
  const distFiles = existsSync(join(ba, "canon-graph/dist")) ? walk(join(ba, "canon-graph/dist")) : [];
  if (!distFiles.some((file) => file.endsWith("cli.js"))) bad("praxis-ba: canon-graph/dist/cli.js is missing");
  const cli = join(ba, "bin/praxis-ba.cjs");
  if (!existsSync(cli) || !existsSync(join(ba, "bin/praxis-ba.bundle.mjs"))) bad("praxis-ba: bin/praxis-ba.cjs (self-contained CLI) is missing");
  else {
    const bare = mkdtempSync(join(work, "canon-"));
    const status = run(process.execPath, [cli, "status", "--repo", bare], { cwd: bare, env: { PATH: process.env.PATH } });
    if (status.status !== 0 && !/VERIFY-OK/.test(status.stdout)) bad(`praxis-ba: the CLI did not run in a bare directory: ${(status.stderr || status.stdout).slice(0, 200)}`);
    else if (!/VERIFY-OK/.test(status.stdout)) bad(`praxis-ba: unexpected CLI output: ${status.stdout.slice(0, 200)}`);
    else proven.push(`BA validator CLI runs with no node_modules (canon-graph/dist: ${distFiles.length} files; bin/praxis-ba.cjs)`);
  }

  // 3. session-bootstrap of every role
  for (const role of ["ba", "architect", "developer", "quality"]) {
    const script = join(plugins, `praxis-${role}`, "tools/session-bootstrap.cjs");
    if (!existsSync(script)) {
      bad(`praxis-${role}: tools/session-bootstrap.cjs is missing`);
      continue;
    }
    const dir = mkdtempSync(join(work, `${role}-`));
    const result = run(process.execPath, [script, dir], { cwd: dir, env: { PATH: process.env.PATH } });
    if (result.status !== 0) bad(`praxis-${role}: session-bootstrap.cjs failed: ${(result.stderr || result.stdout).slice(0, 200)}`);
  }
  proven.push("session-bootstrap.cjs of BA, Architect, Developer and Quality runs");

  // 4. Runtime bundle starts
  const bundle = join(plugins, "praxis-runtime/server/praxis-mcp.cjs");
  if (!existsSync(bundle)) bad("praxis-runtime: server/praxis-mcp.cjs is missing");
  else {
    const ready = await new Promise((resolveReady) => {
      const child = spawn(process.execPath, [bundle, "--role", "runtime"], { cwd: work, env: { PATH: process.env.PATH, PRAXIS_STATE_HOME: join(work, "state") }, stdio: ["pipe", "ignore", "pipe"] });
      let text = "";
      const finish = (value) => {
        child.kill();
        resolveReady(value);
      };
      const timer = setTimeout(() => finish(false), 10_000);
      child.stderr.on("data", (chunk) => {
        text += chunk;
        if (text.includes("[praxis-mcp] ready")) {
          clearTimeout(timer);
          finish(true);
        }
      });
      child.on("exit", () => {
        clearTimeout(timer);
        resolveReady(text.includes("[praxis-mcp] ready"));
      });
    });
    if (!ready) bad("praxis-runtime: the bundle did not report ready on stdio");
    else proven.push("Runtime bundle starts from the plugin directory with no npm install");
  }

  // 5. every ${CLAUDE_PLUGIN_ROOT}/path exists
  const manifest = JSON.parse(readFileSync(join(root, ".claude-plugin/marketplace.json"), "utf8"));
  let references = 0;
  for (const entry of manifest.plugins) {
    const dir = resolve(root, entry.source);
    for (const file of walk(dir)) {
      if (!/(SKILL\.md|\.md|\.json|\.sh|\.mjs)$/.test(file) || !/(\/skills\/|\/hooks\/|\/agents\/|\.mcp\.json)/.test(file)) continue;
      const text = readFileSync(file, "utf8");
      for (const match of text.matchAll(/\$\{CLAUDE_PLUGIN_ROOT\}\/([A-Za-z0-9_./-]+)/g)) {
        const path = match[1].replace(/[.,]+$/, "");
        references += 1;
        if (!existsSync(join(dir, path))) bad(`${entry.name}: ${file.replace(dir + "/", "")} references \${CLAUDE_PLUGIN_ROOT}/${path}, which does not exist`);
      }
    }
  }
  proven.push(`${references} \${CLAUDE_PLUGIN_ROOT}/... references in skills, hooks and MCP config all resolve`);

  // 6. no developer paths in shipped build outputs
  for (const path of [join(ba, "bin/praxis-ba.bundle.mjs"), join(plugins, "praxis-runtime/server/praxis-mcp.cjs"), ...["ba", "architect", "developer", "quality"].map((role) => join(plugins, `praxis-${role}/tools/session-bootstrap.cjs`))]) {
    if (existsSync(path) && /\/Users\/[a-z][a-z0-9_-]*\//i.test(readFileSync(path, "utf8"))) bad(`absolute developer path in ${path.replace(root + "/", "")}`);
  }
  proven.push("no absolute developer path in the shipped build outputs");
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (problems.length) {
  console.error(`FAIL check-plugin-outputs:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`PASS check-plugin-outputs (${proven.length} checks)`);
for (const line of proven) console.log(`  ok ${line}`);
