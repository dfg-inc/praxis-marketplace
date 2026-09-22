#!/usr/bin/env node
/**
 * CI helper: fetch praxis-docs/docs/user via GitLab CI_JOB_TOKEN.
 *
 * Locally: set PRAXIS_DOCS_USER to an existing docs/user path, or leave unset
 * to use ./docs/user if present.
 *
 * GitLab: requires Job token allowlist entry on praxis-docs for this project.
 * Does not embed PATs. Token value is never logged.
 */
import { cpSync, existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const dest = join(root, "docs/user");

function fail(msg) {
  console.error(`fetch-docs-ci: ${msg}`);
  process.exit(1);
}

if (process.env.PRAXIS_DOCS_USER && existsSync(process.env.PRAXIS_DOCS_USER)) {
  console.log(`using PRAXIS_DOCS_USER=${process.env.PRAXIS_DOCS_USER}`);
  process.exit(0);
}

if (existsSync(join(root, "docs/user/index.md"))) {
  console.log("using local docs/user");
  process.exit(0);
}

const token = process.env.CI_JOB_TOKEN;
const host = process.env.CI_SERVER_HOST || "gl.jetru.by";
const projectPath =
  process.env.PRAXIS_DOCS_PROJECT_PATH || "engineering/ai-tooling/praxis-docs";
const ref = process.env.PRAXIS_DOCS_REF || "master";

if (!token) {
  fail(
    "docs/user missing. Set PRAXIS_DOCS_USER locally, or run in GitLab CI with CI_JOB_TOKEN + praxis-docs job-token allowlist.",
  );
}

const cloneDir = mkdtempSync(join(tmpdir(), "praxis-docs-"));
const url = `https://gitlab-ci-token:${token}@${host}/${projectPath}.git`;
console.log(`cloning ${projectPath}@${ref} (token redacted)`);
const clone = spawnSync(
  "git",
  ["clone", "--depth", "1", "--branch", ref, url, cloneDir],
  { encoding: "utf8" },
);
if ((clone.status ?? 1) !== 0) {
  fail(`git clone failed (check job-token allowlist on praxis-docs):\n${clone.stderr}`);
}

const src = join(cloneDir, "docs/user");
if (!existsSync(join(src, "index.md"))) {
  fail(`cloned ${projectPath} but docs/user/index.md missing`);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dirname(dest), { recursive: true });
cpSync(src, dest, { recursive: true });
rmSync(cloneDir, { recursive: true, force: true });
console.log(`fetched docs/user from ${projectPath}@${ref}`);
