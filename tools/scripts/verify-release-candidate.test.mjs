import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { verify } from "./verify-release-candidate.mjs";

const script = join(dirname(fileURLToPath(import.meta.url)), "verify-release-candidate.mjs");
const PLUGINS = { "praxis-ba": "praxis-ba/plugins/ba", "praxis-architect": "praxis-architect/plugins/architect", "praxis-developer": "praxis-developer/plugins/developer", "praxis-quality": "praxis-quality/plugins/quality", "praxis-runtime": "praxis-runtime/plugins/runtime" };

function put(root, path, body) {
  mkdirSync(dirname(join(root, path)), { recursive: true });
  writeFileSync(join(root, path), body);
}

/** A split workspace with sources and a release candidate that is an exact copy. */
function workspace() {
  const root = mkdtempSync(join(tmpdir(), "praxis-rc-"));
  for (const [name, rel] of Object.entries(PLUGINS)) {
    for (const base of [join(root, rel), join(root, "marketplace/release-candidate/plugins", name)]) {
      put(base, ".claude-plugin/plugin.json", JSON.stringify({ name }));
      put(base, "skills/local-workflow/SKILL.md", `# ${name} local workflow\n`);
      put(base, "skills/present-plan/SKILL.md", `# ${name} present plan\n`);
    }
    put(join(root, "marketplace/release-candidate/plugins", name), "FILES.sha256.json", "{}");
  }
  put(root, "praxis-runtime/plugins/runtime/server/praxis-mcp.cjs", "current runtime");
  put(root, "marketplace/release-candidate/plugins/praxis-runtime/server/praxis-mcp.cjs", "current runtime");
  return { root, rc: join(root, "marketplace/release-candidate") };
}

test("an exact release candidate is current (its own FILES.sha256.json is ignored)", () => {
  const { root, rc } = workspace();
  const report = verify({ splitRoot: root, rc });
  assert.equal(report.stale, false);
  assert.ok(report.releaseCandidate.every((item) => item.stale === false));
});

test("regression: a stale runtime bundle in the release candidate is detected", () => {
  // The real defect: the RC kept an older praxis-mcp.cjs after the source Runtime was rebuilt.
  const { root, rc } = workspace();
  put(root, "marketplace/release-candidate/plugins/praxis-runtime/server/praxis-mcp.cjs", "OLD runtime");
  const report = verify({ splitRoot: root, rc });
  assert.equal(report.stale, true);
  assert.deepEqual(report.releaseCandidate.find((item) => item.plugin === "praxis-runtime").changed, ["server/praxis-mcp.cjs"]);
});

test("a skill added to source but absent from the release candidate is stale", () => {
  const { root, rc } = workspace();
  put(root, "praxis-ba/plugins/ba/skills/new-skill/SKILL.md", "# new\n");
  const ba = verify({ splitRoot: root, rc }).releaseCandidate.find((item) => item.plugin === "praxis-ba");
  assert.deepEqual(ba.missing, ["skills/new-skill/SKILL.md"]);
});

test("an installed extension with a different runtime is reported outdated", () => {
  const { root, rc } = workspace();
  const installed = join(root, "installed-extension");
  put(installed, "server/praxis-mcp.cjs", "OLD runtime");
  const report = verify({ splitRoot: root, rc, installedExtension: installed });
  assert.equal(report.installedExtension.matchesSource, false);
  assert.equal(report.installedMismatch, true);
  put(installed, "server/praxis-mcp.cjs", "current runtime");
  assert.equal(verify({ splitRoot: root, rc, installedExtension: installed }).installedMismatch, false);
});

test("installed role plugins: missing and differing skills are named", () => {
  const { root, rc } = workspace();
  const rpm = join(root, "rpm");
  put(rpm, "plugin_A/.claude-plugin/plugin.json", JSON.stringify({ name: "praxis-quality" }));
  put(rpm, "plugin_A/skills/local-workflow/SKILL.md", "# an older local workflow\n");
  put(rpm, "plugin_B/.claude-plugin/plugin.json", JSON.stringify({ name: "someone-elses-plugin" }));
  const report = verify({ splitRoot: root, rc, installedPlugins: rpm });
  assert.equal(report.installedPlugins.length, 1);
  assert.deepEqual(report.installedPlugins[0], { plugin: "praxis-quality", installed: 1, source: 2, missing: ["present-plan"], differing: ["local-workflow"], outdated: true });
});

test("CLI: stale release candidate exits 1; outdated installed artifacts only warn unless --strict-installed", () => {
  const { root, rc } = workspace();
  const installed = join(root, "installed-extension");
  put(installed, "server/praxis-mcp.cjs", "OLD runtime");
  const base = [script, `--split-root=${root}`, `--rc=${rc}`, `--installed-extension=${installed}`];
  const warn = spawnSync(process.execPath, base, { encoding: "utf8" });
  assert.equal(warn.status, 0);
  assert.match(warn.stdout, /extension OUTDATED/);
  assert.match(warn.stdout, /installed artifacts OUTDATED/);
  assert.equal(spawnSync(process.execPath, [...base, "--strict-installed"], { encoding: "utf8" }).status, 1);
  put(root, "marketplace/release-candidate/plugins/praxis-ba/skills/local-workflow/SKILL.md", "# edited in the RC\n");
  const stale = spawnSync(process.execPath, base, { encoding: "utf8" });
  assert.equal(stale.status, 1);
  assert.match(stale.stdout, /praxis-ba\s+STALE/);
});
