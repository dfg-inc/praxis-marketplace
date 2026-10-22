#!/usr/bin/env node
/**
 * Standalone consistency check of the marketplace content (no network, no sibling repositories, no Claude CLI):
 *   - marketplace.json and every plugin.json parse; names and versions agree with the marketplace version
 *   - every `dependencies` entry (marketplace entry or plugin.json) names a plugin in this marketplace
 *   - the bundle plugin depends on every other plugin; each role depends on praxis-runtime
 *   - exactly one plugin ships an MCP server config
 *   - no absolute developer path and no obvious secret in shipped manifests/configs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const problems = [];
const bad = (message) => problems.push(message);
const read = (path) => JSON.parse(readFileSync(path, "utf8"));

const manifest = read(join(root, ".claude-plugin/marketplace.json"));
const version = manifest.metadata?.version;
const names = new Set(manifest.plugins.map((p) => p.name));
const depName = (d) => (typeof d === "string" ? d.split("@")[0] : d.name);

for (const entry of manifest.plugins) {
  const dir = resolve(root, entry.source);
  if (!dir.startsWith(root) || entry.source.includes("..")) bad(`${entry.name}: source escapes the marketplace`);
  const pluginJson = join(dir, ".claude-plugin/plugin.json");
  if (!existsSync(pluginJson)) {
    bad(`${entry.name}: missing plugin.json`);
    continue;
  }
  const plugin = read(pluginJson);
  if (plugin.name !== entry.name) bad(`${entry.name}: plugin.json name is ${plugin.name}`);
  if (plugin.version !== version) bad(`${entry.name}: plugin.json version ${plugin.version} != marketplace ${version}`);
  if (entry.version !== version) bad(`${entry.name}: entry version ${entry.version} != marketplace ${version}`);
  const deps = [...(entry.dependencies ?? []), ...(plugin.dependencies ?? [])].map(depName);
  for (const dep of deps) if (!names.has(dep)) bad(`${entry.name}: dependency ${dep} is not in this marketplace`);
  if (entry.name === "praxis") for (const other of names) if (other !== "praxis" && !deps.includes(other)) bad(`praxis does not depend on ${other}`);
  if (/^praxis-(ba|architect|developer|quality)$/.test(entry.name) && !deps.includes("praxis-runtime")) bad(`${entry.name} does not depend on praxis-runtime`);
}

const withMcp = manifest.plugins.filter((p) => existsSync(join(root, p.source, ".mcp.json"))).map((p) => p.name);
if (withMcp.join() !== "praxis-runtime") bad(`MCP server configs in: ${withMcp.join(", ") || "(none)"}; expected only praxis-runtime`);

const scan = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === ".git" || name === "node_modules") continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) scan(path);
    else if (/\.(json|md|mjs|cjs|js|yml|yaml)$/.test(name) && statSync(path).size < 3_000_000) {
      const text = readFileSync(path, "utf8");
      if (/\/Users\/[a-z]+\//.test(text) && !/\/docs\//.test(path)) bad(`absolute developer path in ${path.replace(root, "")}`);
      if (/(ghp_|github_pat_|xox[bp]-|AKIA)[A-Za-z0-9_]{12,}/.test(text)) bad(`possible secret in ${path.replace(root, "")}`);
    }
  }
};
scan(join(root, "plugins"));
scan(join(root, ".claude-plugin"));

if (problems.length) {
  console.error(`FAIL check-marketplace:\n  ${problems.join("\n  ")}`);
  process.exit(1);
}
console.log(`PASS check-marketplace ${version} (${manifest.plugins.length} plugins: ${[...names].join(", ")})`);
