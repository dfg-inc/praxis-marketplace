# praxis-ba

Business analyst role over an **md-first, git-native requirements canon** (canon-graph).

**License:** Apache-2.0 · **Package:** `@praxis/ba` · **Path:** `plugins/ba`  
**Version:** see [catalog](/catalog/)

BA prepares **input** for architecture and development. It does not implement product code and does not name a downstream vendor workflow.

## How it works

Canon lives in a dedicated directory (often `canon/`): `.ba/` config, `vision.md`, `epics/`, `br/`, `cr/`, `wp/`, `bugs/`. Skills write markdown from templates. The **CLI owns** confirm / approve / accept / validate.

Typical CR flow:

1. `capture-cr` — client words, no product judgment
2. `grill-cr` + `ba-plan-slice` — interview and impact set
3. Human gate: `praxis-ba cr confirm --entry … --impacts-file …`
4. `shape-requirement` — realize `spawns` / `amends`
5. `prepare-wp` → plan → `approve-plan` (emits Architect handoff)
6. Later: `accept` when delivery is proven in the canon

On session start the plugin loads [`.project` and knowledge](/guide/context) and runs a version check.

## Implementation

| Piece | Location |
|-------|----------|
| Skills | `plugins/ba/skills/` |
| Canon engine / CLI | `plugins/ba/canon-graph` (`praxis-ba`) |
| Handoff writer | `plugins/ba/canon-graph/src/handoff.ts`, `plugins/ba/tools/emit-architect-handoff.mjs` |
| Session bootstrap | `plugins/ba/tools/session-bootstrap.mjs` |
| Claude plugin manifest | `plugins/ba/.claude-plugin/plugin.json` |

**Skills:** `session-start`, `confirm-vision`, `capture-cr`, `grill-cr`, `ba-plan-slice`, `shape-requirement`, `prepare-wp`, `approve-plan`, `accept`, `capture-bug`, `status`, `goals`, `one-pager`, `ba-scaffold`, `ba-onboard`, `ba-code-surface-scan`, `ba-lint`.

## CLI

Monorepo:

```bash
node plugins/ba/canon-graph/bin/praxis-ba.mjs <verb> --repo <canon-dir>
```

Packed plugin: `node <plugin-dir>/bin/praxis-ba.cjs` (not present as `plugins/ba/bin/` in the workspace). Workspace package `@praxis/ba-canon-graph` also exposes `praxis-ba`.

Useful verbs: `validate [--check]`, `status`, `vision confirm`, `cr confirm`, `cr realize`, `req edit|retire`, `epic add`, `wp prepare|approve-plan|abandon`, `bug capture|resolve`, `accept`, `id next`, `fmt`, `render`/`export`, `migrate`.

## Examples

```bash
node plugins/ba/canon-graph/bin/praxis-ba.mjs validate --repo <canon>
node plugins/ba/canon-graph/bin/praxis-ba.mjs status --repo <canon>
node plugins/ba/canon-graph/bin/praxis-ba.mjs wp approve-plan \
  --repo <canon> --wp WP-001 --plan wp/WP-001/plan.md --json
```

That last command writes [BA→Architect handoff](/guide/handoffs).

## Install in a host repo

See [Getting started](/guide/start): clone the monorepo, `npm install`, then enable `plugins/ba` as a **directory** marketplace. Do not `npm install @praxis/ba` from the public registry.
