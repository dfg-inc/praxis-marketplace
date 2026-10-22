#!/usr/bin/env node
/**
 * Is what you are about to install (or what is already installed) the current source?
 *
 *   node tools/scripts/verify-release-candidate.mjs
 *       [--split-root=<dir containing the praxis-* repos>]
 *       [--rc=<release-candidate dir>]
 *       [--installed-extension=<Claude Extensions/local.mcpb.dfuture-co.praxis-runtime>]
 *       [--installed-plugins=<dir holding plugin_* directories>]
 *       [--strict-installed] [--json]
 *
 * 1. The release candidate is compared file by file with each source plugin directory. Any difference
 *    is "stale" and fails: rebuild with build-release-candidate.mjs.
 * 2. An installed Desktop extension is compared with the source Runtime bundle.
 * 3. Installed role plugins are compared with their source: skills missing from the installed copy,
 *    and skills whose content differs.
 * Installed artifacts live outside the repositories, so 2 and 3 are warnings unless --strict-installed.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRIES = [
  { name: "praxis", sourceRel: "praxis-marketplace/plugins/praxis" },
  { name: "praxis-ba", sourceRel: "praxis-ba/plugins/ba" },
  { name: "praxis-architect", sourceRel: "praxis-architect/plugins/architect" },
  { name: "praxis-developer", sourceRel: "praxis-developer/plugins/developer" },
  { name: "praxis-quality", sourceRel: "praxis-quality/plugins/quality" },
  { name: "praxis-runtime", sourceRel: "praxis-runtime/plugins/runtime" },
];
const RC_ONLY = new Set(["FILES.sha256.json"]);

const sha = (path) => createHash("sha256").update(readFileSync(path)).digest("hex");

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, acc);
    else acc.push(path);
  }
  return acc;
}

function fileMap(dir) {
  return new Map(walk(dir).map((file) => [relative(dir, file).split(sep).join("/"), sha(file)]));
}

function skills(pluginDir) {
  const dir = join(pluginDir, "skills");
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((name) => existsSync(join(dir, name, "SKILL.md"))).sort();
}

export function compareDirs(sourceDir, otherDir) {
  const a = fileMap(sourceDir);
  const b = fileMap(otherDir);
  for (const key of RC_ONLY) b.delete(key);
  return {
    changed: [...a].filter(([k, v]) => b.has(k) && b.get(k) !== v).map(([k]) => k).sort(),
    missing: [...a.keys()].filter((k) => !b.has(k)).sort(),
    extra: [...b.keys()].filter((k) => !a.has(k)).sort(),
  };
}

export function verify({ splitRoot, rc, installedExtension, installedPlugins }) {
  const report = { releaseCandidate: [], installedExtension: null, installedPlugins: [], stale: false, installedMismatch: false };
  for (const entry of ENTRIES) {
    const source = join(splitRoot, entry.sourceRel);
    const target = join(rc, "plugins", entry.name);
    if (!existsSync(source)) {
      report.releaseCandidate.push({ plugin: entry.name, problem: "source directory not found", source });
      report.stale = true;
      continue;
    }
    if (!existsSync(target)) {
      report.releaseCandidate.push({ plugin: entry.name, problem: "not present in the release candidate" });
      report.stale = true;
      continue;
    }
    const diff = compareDirs(source, target);
    const stale = diff.changed.length + diff.missing.length + diff.extra.length > 0;
    if (stale) report.stale = true;
    report.releaseCandidate.push({ plugin: entry.name, stale, ...diff });
  }

  if (installedExtension) {
    const installed = join(installedExtension, "server", "praxis-mcp.cjs");
    const source = join(splitRoot, "praxis-runtime/plugins/runtime/server/praxis-mcp.cjs");
    if (!existsSync(installed)) {
      report.installedExtension = { path: installed, problem: "not found" };
      report.installedMismatch = true;
    } else {
      const same = existsSync(source) && sha(installed) === sha(source);
      report.installedExtension = { path: installed, matchesSource: same, installedSha256: sha(installed), sourceSha256: existsSync(source) ? sha(source) : null };
      if (!same) report.installedMismatch = true;
    }
  }

  if (installedPlugins && existsSync(installedPlugins)) {
    for (const dir of readdirSync(installedPlugins).filter((name) => name.startsWith("plugin_"))) {
      const manifest = join(installedPlugins, dir, ".claude-plugin", "plugin.json");
      if (!existsSync(manifest)) continue;
      const name = JSON.parse(readFileSync(manifest, "utf8")).name;
      const entry = ENTRIES.find((item) => item.name === name && item.name !== "praxis-runtime" && item.name !== "praxis");
      if (!entry) continue;
      const source = join(splitRoot, entry.sourceRel);
      const have = skills(join(installedPlugins, dir));
      const want = skills(source);
      const differing = have.filter(
        (skill) =>
          want.includes(skill) &&
          sha(join(installedPlugins, dir, "skills", skill, "SKILL.md")) !== sha(join(source, "skills", skill, "SKILL.md")),
      );
      const missing = want.filter((skill) => !have.includes(skill));
      const outdated = missing.length > 0 || differing.length > 0;
      if (outdated) report.installedMismatch = true;
      report.installedPlugins.push({ plugin: name, installed: have.length, source: want.length, missing, differing, outdated });
    }
  }
  return report;
}

function main() {
  const args = process.argv.slice(2);
  const option = (name) => args.find((arg) => arg.startsWith(`--${name}=`))?.slice(name.length + 3);
  const here = dirname(fileURLToPath(import.meta.url));
  const marketplaceRoot = resolve(here, "../..");
  const report = verify({
    splitRoot: resolve(option("split-root") ?? resolve(marketplaceRoot, "..")),
    rc: resolve(option("rc") ?? join(marketplaceRoot, "release-candidate")),
    installedExtension: option("installed-extension") ? resolve(option("installed-extension")) : undefined,
    installedPlugins: option("installed-plugins") ? resolve(option("installed-plugins")) : undefined,
  });
  if (args.includes("--json")) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const item of report.releaseCandidate) {
      const state = item.problem ?? (item.stale ? "STALE" : "current");
      console.log(`rc        ${item.plugin.padEnd(18)} ${state}${item.stale ? `  changed=${item.changed.length} missing=${item.missing.length} extra=${item.extra.length}` : ""}`);
      for (const file of [...(item.changed ?? []), ...(item.missing ?? []).map((f) => `+${f}`), ...(item.extra ?? []).map((f) => `-${f}`)].slice(0, 5)) console.log(`            ${file}`);
    }
    if (report.installedExtension) {
      const e = report.installedExtension;
      console.log(`extension ${e.problem ?? (e.matchesSource ? "runtime matches source" : `OUTDATED  installed ${e.installedSha256.slice(0, 12)} != source ${String(e.sourceSha256).slice(0, 12)}`)}`);
    }
    for (const p of report.installedPlugins) {
      console.log(`installed ${p.plugin.padEnd(18)} ${p.outdated ? "OUTDATED" : "current"}  skills ${p.installed}/${p.source}${p.missing.length ? `  missing: ${p.missing.slice(0, 6).join(", ")}${p.missing.length > 6 ? ", …" : ""}` : ""}${p.differing.length ? `  differing: ${p.differing.join(", ")}` : ""}`);
    }
    console.log(`verify-release-candidate: release candidate ${report.stale ? "STALE" : "current"}; installed artifacts ${report.installedMismatch ? "OUTDATED" : args.some((a) => a.startsWith("--installed-")) ? "current" : "not checked"}`);
  }
  const failed = report.stale || (args.includes("--strict-installed") && report.installedMismatch);
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
