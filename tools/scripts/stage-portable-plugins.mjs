#!/usr/bin/env node
/**
 * Replace symlink marketplace plugins with self-contained copies.
 * Does not publish. Does not touch the developer's real Claude config.
 */
import { cpSync, existsSync, lstatSync, mkdirSync, rmSync, readFileSync, writeFileSync, symlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import * as esbuild from "esbuild";

const marketplaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const splitRoot = resolve(marketplaceRoot, "..");
const pluginsDir = join(marketplaceRoot, "plugins");

const entries = [
  { name: "praxis-ba", source: join(splitRoot, "praxis-ba/plugins/ba") },
  { name: "praxis-architect", source: join(splitRoot, "praxis-architect/plugins/architect") },
  { name: "praxis-developer", source: join(splitRoot, "praxis-developer/plugins/developer") },
  { name: "praxis-quality", source: join(splitRoot, "praxis-quality/plugins/quality") },
  { name: "praxis-runtime", source: join(splitRoot, "praxis-runtime/plugins/runtime") },
];

mkdirSync(pluginsDir, { recursive: true });

for (const entry of entries) {
  if (!existsSync(entry.source)) {
    throw new Error(`missing source ${entry.source}`);
  }
  const dest = join(pluginsDir, entry.name);
  if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
  cpSync(entry.source, dest, {
    recursive: true,
    filter: (src) => !src.includes("node_modules") && !src.includes("/.git/"),
  });
  // The source bootstrap imports @praxis/plugin-sdk, which an installed plugin does not have. Ship a
  // self-contained .cjs next to it, bundled from the source repository where the SDK resolves.
  const bootstrap = join(entry.source, "tools", "session-bootstrap.mjs");
  if (existsSync(bootstrap)) {
    esbuild.buildSync({
      entryPoints: [bootstrap],
      outfile: join(dest, "tools", "session-bootstrap.cjs"),
      bundle: true,
      platform: "node",
      target: "node20",
      format: "cjs",
      logLevel: "silent",
      banner: { js: "var __import_meta_url = require('url').pathToFileURL(__filename).href;" },
      define: { "import.meta.url": "__import_meta_url" },
    });
  }
  // BA skills (ba-lint, approve-plan, accept ...) call ${CLAUDE_PLUGIN_ROOT}/bin/praxis-ba.cjs. The canon-graph CLI needs
  // zod, yaml and gray-matter, which an installed plugin does not have, so ship it as one self-contained file.
  const baCli = join(entry.source, "canon-graph", "bin", "praxis-ba.mjs");
  if (entry.name === "praxis-ba" && existsSync(baCli)) {
    // The entry uses top-level await, so it is bundled as ESM; bin/praxis-ba.cjs is the path the skills call.
    esbuild.buildSync({
      entryPoints: [baCli],
      outfile: join(dest, "bin", "praxis-ba.bundle.mjs"),
      bundle: true,
      platform: "node",
      target: "node20",
      format: "esm",
      logLevel: "silent",
      banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
    });
    writeFileSync(
      join(dest, "bin", "praxis-ba.cjs"),
      "#!/usr/bin/env node\n// Self-contained praxis-ba CLI (canon-graph bundled; no node_modules needed).\nimport(require('node:url').pathToFileURL(require('node:path').join(__dirname, 'praxis-ba.bundle.mjs')).href).catch((error) => {\n  console.error(error && error.stack ? error.stack : String(error));\n  process.exit(1);\n});\n",
    );
  }
  const st = lstatSync(dest);
  if (st.isSymbolicLink()) {
    throw new Error(`${dest} is still a symlink`);
  }
  console.log(`staged ${entry.name}`);
}

const manifest = JSON.parse(readFileSync(join(marketplaceRoot, ".claude-plugin/marketplace.json"), "utf8"));
for (const plugin of manifest.plugins) {
  if (plugin.source.includes("..")) {
    throw new Error(`non-portable source ${plugin.source}`);
  }
  const resolved = resolve(marketplaceRoot, plugin.source);
  if (!resolved.startsWith(marketplaceRoot)) {
    throw new Error(`source escapes marketplace ${plugin.source}`);
  }
  if (!existsSync(join(resolved, ".claude-plugin/plugin.json"))) {
    throw new Error(`missing plugin.json under ${plugin.source}`);
  }
}
writeFileSync(
  join(marketplaceRoot, "plugins/.staged-at"),
  `${new Date().toISOString()}\nportable=true\n`,
);

const validate = spawnSync("claude", ["plugin", "validate", marketplaceRoot], { encoding: "utf8" });
console.log(validate.stdout || validate.stderr);
if ((validate.status ?? 1) !== 0) process.exit(1);
console.log("PASS portable stage");
