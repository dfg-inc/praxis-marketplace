# Getting started

This page is for someone who has **never** opened Praxis. It covers what you install, what is *not* on the public npm registry, how to turn the plugins on, and how a person actually works day to day.

There are two honest paths:

| Path | Who it is for | What “success” looks like |
|------|----------------|---------------------------|
| **A — this repository** | You cloned Praxis and want it running | `npm run smoke` passes; you can open the docs site |
| **B — Claude Code on a product** | You are a BA / architect / developer on a real repo | Skills show up in Claude Code; session-start prints `.project` |

You do **not** `npm install -g praxis-ba` today. The `@praxis/*` packages live in this **npm workspaces** monorepo. Until they are published to the public npm registry, install is always `npm install` **inside a git clone**.

Remote standalone repos (`praxis-ba.git`, `praxis-developer.git`) are optional. The supported way for an outsider is: **clone this monorepo** (GitHub when it is public, GitLab until then) and point Claude Code at `plugins/`.

---

## Source and license

| What | License | Goes to public GitHub? |
|------|---------|------------------------|
| praxis-ba, praxis-architect, praxis-developer | Apache-2.0 | **Yes** — this is the open-source product |
| Shared contracts / SDK / knowledge used by those plugins | Apache-2.0 where the package says so | Yes, as part of the same tree |
| Quality service, Jira plugin | UNLICENSED | **No** — company-only; you can ignore them to run the role pipeline |

**Today:** the canonical clone is still GitLab (access required).

**After the GitHub publish:** clone the public repository instead. The rest of this page does not change — same `npm install`, same `plugins/` folders, same Claude Code `directory` marketplaces. We will replace the clone URL here when the GitHub repo exists; do not invent an org/repo name.

---

## What you need

- **Git**
- **Node.js ≥ 20** (CI/Docker use 22) and **npm** that ships with it
- Optional: **Docker** (same verify as CI; Quality container)
- For path B: **Claude Code** (the plugins are Claude Code plugins, not VS Code extensions)
- **Today:** access to the GitLab project. **After GitHub:** none — the Apache-2.0 tree will be public

Clone (GitLab, current origin):

```bash
git clone git@gl.jetru.by:engineering/ai-tooling/Praxis-mono.git praxis
cd praxis
```

HTTPS: use the URL GitLab shows for the same project. After the open-source cutover, use `git clone https://github.com/<org>/<repo>.git` from the GitHub page — then `cd` and continue at Path A.

---

## Path A — install the monorepo (packages)

From the repository root:

```bash
# 1. Optional: env template. Leave Jira empty. Smoke does not need Jira.
cp .env.example .env

# 2. Install every workspace package (plugins, contracts, Quality, docs, …)
npm install

# 3. Compile TypeScript workspaces (@praxis/contracts, plugin-sdk, …)
npm run build
```

That **is** “installing the packages”. Workspaces are linked locally via `"*"` in `package.json`. npm will **not** fetch `@praxis/ba` from registry.npmjs.org until a public npm publish exists (open-sourcing the git repo does not by itself publish npm packages).

Prove the machine pipeline (BA → Architect → Developer → Quality) on the sample app:

```bash
npm run smoke
```

Full gate (long): `npm run verify`. Same thing in Docker:

```bash
docker compose build workspace
docker compose run --rm workspace npm run verify
```

This documentation site:

```bash
npm run dev -w @praxis/marketplace-site
# http://localhost:5173  — English at /, Russian at /ru/
```

Layout after install:

| Path | What it is |
|------|------------|
| `plugins/ba` | BA plugin + canon-graph CLI |
| `plugins/architect` | Architect plugin |
| `plugins/developer` | Developer plugin |
| `apps/quality-service` | Quality HTTP/CLI (not a public plugin) |
| `packages/*` | Shared contracts, `.project` parser, knowledge, SDK |
| `samples/mini-counter` | Sample product used by smoke |

Jira credentials are **not** needed for install, build, smoke, or the role pipeline.

---

## Path B — work as a person (Claude Code)

Praxis roles are used **in chat**, with skills. The CLIs are gates and CI. A new BA should not start by typing `run-work-package`.

### 1. Put `.project` in the **product** repo

The product is the repo you will change (your service), not necessarily Praxis itself. Copy the template from the monorepo:

```bash
cp /path/to/praxis/.project.example /path/to/your-product/.project
```

Edit `stack`, `requirementsFormat`, and `knowledge.path` if you have a corpus. No tokens in this file.

If `.project` is missing, session-start still runs on defaults and lists unset fields — you acknowledge and continue.

### 2. Enable the three role plugins (local folders)

Remote marketplace git URLs for standalone `praxis-ba` / `praxis-architect` / `praxis-developer` may not exist yet. Use the cloned plugin directories.

In the **product** repo (or your user Claude settings), `.claude/settings.json` or `.claude/settings.local.json`:

```json
{
  "extraKnownMarketplaces": {
    "praxis-ba": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/ba"
      }
    },
    "praxis-architect": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/architect"
      }
    },
    "praxis-developer": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/developer"
      }
    }
  },
  "enabledPlugins": {
    "praxis-ba@praxis-ba": true,
    "praxis-architect@praxis-architect": true,
    "praxis-developer@praxis-developer": true
  }
}
```

Replace `/ABS/PATH/praxis` with the real clone path. You can enable only the role you are (BA-only is valid).

Then in Claude Code:

1. Restart the session (or reload plugins).
2. `/plugin marketplace list` — the three Praxis marketplaces.
3. `/plugin list` — `praxis-ba@praxis-ba` (and the others) **enabled**.

If you develop Praxis itself, open the monorepo in Claude Code and still enable the same folders.

Quality is **not** enabled this way. It is a Node/Docker service. See [Quality](/plugins/quality).

### 3. First session (what to actually type)

Open the **product** repository as the Claude Code working directory.

**Business analyst**

1. Ask to start a BA session (skill `session-start`) — you should see plugin version, `.project`, knowledge on/off.
2. Capture a change request in the client’s words (`capture-cr`).
3. Grill and plan the impact set (`grill-cr` / `ba-plan-slice`), then confirm with the CLI gate the skill tells you (`praxis-ba cr confirm …`).
4. Shape requirements, prepare a work package, approve the plan — that **writes** `wp/<WP>/handoffs/ba-architect.handoff.json` for Architect.

Canon CLI from the monorepo (after `npm install`):

```bash
node /ABS/PATH/praxis/plugins/ba/canon-graph/bin/praxis-ba.mjs status --repo /path/to/canon
```

The canon directory is the requirements tree (`canon/` or whatever your project uses), not always the product root.

**Architect**

1. Session-start for architect.
2. Intake the BA handoff (`intake-audit` / accept only if vision + readiness passed).
3. Decisions, design package, `change-spec.json`.
4. Emit `design/<WP>/architect-developer.handoff.json`.

**Developer**

1. Session-start for developer.
2. Accept the design package; research; write a plan.
3. **Stop until a human approves** (CLI `--approve` or the skill gate).
4. Implement + final-arbiter; on green, `design/<WP>/dev/quality-handoff.json` appears.

**Quality**

In a terminal (monorepo already installed):

```bash
node /ABS/PATH/praxis/apps/quality-service/bin/praxis-quality.mjs review-path \
  --path /path/to/your-product \
  --handoff /path/to/design/<WP>/dev/quality-handoff.json \
  --project my-product
```

Or HTTP on port 8787 — [Quality](/plugins/quality).

---

## How the four people share work

They do not share a chat. They share **files in git**:

1. BA commits canon + `ba-architect.handoff.json`
2. Architect commits `design/<WP>/` + Developer handoff
3. Developer commits product code + `quality-handoff.json`
4. Quality persists reviews in SQLite (local/service), not in the plugin tree

Details: [how roles connect](/guide/), [shared context](/guide/context), [handoff JSON](/guide/handoffs).

Machine-only walkthrough (no Claude), including `npm run smoke`: [Run and verify](/guide/run).

---

## Common mistakes

| Mistake | What to do instead |
|---------|-------------------|
| `npm install @praxis/ba` from the public registry | `npm install` **inside the cloned monorepo** (git first; npm publish is a later step) |
| Waiting for GitHub before trying anything | Clone GitLab today; after the public repo exists, clone GitHub — same commands |
| Pointing Claude at a git marketplace that does not exist yet | `directory` + `plugins/<role>` as above |
| Putting Jira tokens in `.project` | Tokens only in `.env` / `PRAXIS_JIRA_*` |
| Running Developer implement without approve | `--approve` / human gate |
| Treating Quality as a Claude plugin | Run `praxis-quality` or `docker compose up quality-service` |
| Inventing web/Jira/MR “success” without credentials | Those stay external; local pipeline does not need them |
