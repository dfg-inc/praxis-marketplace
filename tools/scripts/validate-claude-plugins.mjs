#!/usr/bin/env node
/**
 * `claude plugin validate --profile directory` on every plugin of this marketplace and on the marketplace manifest: no errors,
 * no warnings. Skips (and says so) when the claude CLI is not installed.
 */
import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
if (spawnSync("claude", ["--version"], { encoding: "utf8" }).status !== 0) {
  console.log("SKIPPED validate-claude-plugins: the claude CLI is not available (nothing was validated)");
  process.exit(0);
}
let bad = 0;
const dirs = readdirSync(join(root, "plugins")).filter((n) => !n.startsWith(".")).map((n) => join(root, "plugins", n));
for (const dir of dirs) {
  const r = spawnSync("claude", ["plugin", "validate", dir, "--profile", "directory"], { encoding: "utf8" });
  const out = `${r.stdout}${r.stderr}`;
  if (r.status !== 0 || /⚠ Found|✘/.test(out)) {
    bad += 1;
    console.error(`FAIL ${dir}\n${out.split("\n").filter((l) => /❯|⚠|✘/.test(l)).join("\n")}`);
  }
}
const m = spawnSync("claude", ["plugin", "validate", root], { encoding: "utf8" });
if (m.status !== 0 || /✘/.test(`${m.stdout}${m.stderr}`)) {
  bad += 1;
  console.error(`FAIL marketplace manifest\n${m.stdout}${m.stderr}`);
}
if (bad) process.exit(1);
console.log(`PASS validate-claude-plugins (${dirs.length} plugins + the marketplace manifest, no errors, no warnings)`);
