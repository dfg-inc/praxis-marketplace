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

Copy-paste chat scripts: **[Working in a session](/guide/sessions)**.

## Session

```bash
make ba EPIC=PRX-1 REPO=/path/to/product
```

Or in Claude Code with `praxis-ba` already on:

```
/session-start
Epic PRX-1. Analyze the epic (/jira-analyze-epic).
Do not write to Jira until I confirm.
```

Canon without Jira:

```
/session-start
/capture-cr — client words below.
Then /grill-cr and slice. Confirm only after I say yes.
```

Slash command = skill name: `/prepare-wp`, `/status`.

## Skills

Invoke with `/<name>` or plain language (“capture this CR”, “prepare the WP”).

### Daily

| Skill | When | What you get |
|-------|------|----------------|
| `session-start` | First message | Plugin version, `.project`, knowledge. Does not mutate canon |
| `jira-analyze-epic` | Jira Epic exists (`PRX-1`) | Stories with AC, proposal, write preview. Live write only after you confirm. Do **not** also run `create-story` |
| `status` | Anytime | Canon summary: vision, CRs, WPs, bugs. Read-only |
| `capture-cr` | A change request arrived | CR in the client’s words (Verbatim vs Interpretation). Not confirmed yet |
| `grill-cr` | After `capture-cr` | One-question interview with a recommended answer |
| `ba-plan-slice` | Inside grill, before confirm | Slice plan: one story = one FR; impacts file for `cr confirm` |
| `shape-requirement` | CR confirmed, impact set known | New FR/NFR/BR (`spawns`) or edits (`amends`) |
| `prepare-wp` | Requirement slice ready to hand off | Folder `wp/<id>/`, definition-of-ready gate |
| `approve-plan` | WP is `ready`, `plan.md` exists | Your “yes” → `plan-approved` + `ba-architect.handoff.json` |
| `accept` | Delivery proven | Baselines the WP requirements. Only path into `baselines/` |

### Product start and the layer around the canon

| Skill | When | What you get |
|-------|------|----------------|
| `confirm-vision` | New product or vision change | Human `vision confirm` gate. Blocks CR/WP until done |
| `ba-scaffold` | Empty project, once | `inputs/`, `shared/`, glossary, NFR catalog. Does **not** create `canon/` |
| `ba-onboard` | Code exists, no requirements | Reverse context from code → first slice into `capture-cr` |
| `ba-code-surface-scan` | Only from `ba-onboard` | Raw routes/UI list, no interpretation |
| `ba-lint` | After any canon write | `praxis-ba validate`. A FAIL cannot be waved through |
| `goals` | Trace to product goals | Goal pages, `goal_ids` on requirements |
| `one-pager` | Client needs one page | One-pager from a live FR (needs purpose + AC) |
| `capture-bug` | Bug against a **shipped** FR | Record in `bugs/`. Mid-WP engineering bugs stay in repo docs |

## Implementation

| Piece | Location |
|-------|----------|
| Skills | `plugins/ba/skills/` |
| Canon engine / CLI | `plugins/ba/canon-graph` (`praxis-ba`) |
| Handoff writer | `plugins/ba/canon-graph/src/handoff.ts`, `plugins/ba/tools/emit-architect-handoff.mjs` |
| Session bootstrap | `plugins/ba/tools/session-bootstrap.mjs` |
| Claude plugin manifest | `plugins/ba/.claude-plugin/plugin.json` |

**Skills** — table above. Sources: `plugins/ba/skills/`.

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
