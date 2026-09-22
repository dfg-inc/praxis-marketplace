#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const site = join(root, "apps/marketplace-site");
const docs = join(site, "docs");
const pluginsRoot = process.env.PRAXIS_PLUGINS_ROOT || "";
const baRoot = process.env.PRAXIS_BA_ROOT || "";
const architectRoot = process.env.PRAXIS_ARCHITECT_ROOT || "";
const developerRoot = process.env.PRAXIS_DEVELOPER_ROOT || "";
const coreRoot = process.env.PRAXIS_CORE_ROOT || "";
const runtimeRoot = process.env.PRAXIS_RUNTIME_ROOT || "";

function fail(msg) {
  console.error(`FAIL: ${msg}`);
  process.exit(1);
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === ".vitepress" || name === "node_modules" || name === "user-guide") continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

const catalogPath = existsSync(join(root, "vendor/catalog.json"))
  ? join(root, "vendor/catalog.json")
  : join(coreRoot, "packages/catalog/catalog.json");
if (!existsSync(catalogPath)) fail("missing catalog.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8"));
const catalogPage = readFileSync(join(docs, "catalog/index.md"), "utf8");
for (const p of catalog.plugins) {
  if (!catalogPage.includes(p.name)) fail(`catalog page missing ${p.name}`);
  const doc = join(docs, "plugins", `${p.name.replace("praxis-", "")}.md`);
  if (!existsSync(doc)) fail(`missing plugin page ${relative(root, doc)}`);
}

const roleRoots = {
  ba: baRoot,
  architect: architectRoot,
  developer: developerRoot,
};
for (const id of ["ba", "architect", "developer"]) {
  const roleRoot = roleRoots[id] || (pluginsRoot ? join(pluginsRoot) : "");
  if (!roleRoot) continue;
  const lic = join(roleRoot, "plugins", id, "LICENSE");
  const pkg = JSON.parse(readFileSync(join(roleRoot, "plugins", id, "package.json"), "utf8"));
  if (!existsSync(lic)) fail(`missing LICENSE ${id}`);
  if (pkg.license !== "Apache-2.0") fail(`${id} license ${pkg.license}`);
}

if (coreRoot) {
  const jiraPkg = JSON.parse(readFileSync(join(coreRoot, "plugins/jira/package.json"), "utf8"));
  if (jiraPkg.license !== "UNLICENSED") fail("jira must stay UNLICENSED");
}
if (runtimeRoot) {
  const qPkg = JSON.parse(readFileSync(join(runtimeRoot, "apps/quality-service/package.json"), "utf8"));
  if (qPkg.license !== "UNLICENSED") fail("quality-service must stay UNLICENSED");
}

const mdFiles = walk(docs).filter((f) => extname(f) === ".md");
for (const file of mdFiles) {
  const text = readFileSync(file, "utf8");
  const re = /\[[^\]]+\]\(([^)]+)\)/g;
  let m;
  while ((m = re.exec(text))) {
    const href = m[1].split("#")[0].split("?")[0];
    if (!href || href.startsWith("http") || href.startsWith("mailto:")) continue;
    if (href.startsWith("/")) {
      const relDoc = href.replace(/^\//, "").replace(/\/$/, "");
      const target = join(docs, `${relDoc}.md`);
      const asIndex = join(docs, relDoc, "index.md");
      if (!existsSync(target) && !existsSync(asIndex)) {
        fail(`broken link in ${relative(root, file)} -> ${href}`);
      }
    }
  }
}

const changelog = readFileSync(join(docs, "changelog.md"), "utf8");
if (!catalog.plugins.every((p) => changelog.toLowerCase().includes(p.name))) {
  fail("changelog missing plugin name");
}

console.log(JSON.stringify({ ok: true, source: "split-marketplace" }, null, 2));
