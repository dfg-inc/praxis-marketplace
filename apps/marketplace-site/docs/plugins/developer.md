# praxis-developer

Developer role: accept an architecture package, plan with an approval gate, implement, verify, hand off to Quality.

**License:** Apache-2.0 · **Package:** `@praxis/developer` · **Path:** `plugins/developer`  
**Version:** see [catalog](/catalog/)  
**Install:** [Getting started](/guide/start) — not published to public npm.

## How it works

1. `accept-work-package` — validate `architect.developer.handoff` and the design dir. Incomplete package → `status: returned`.
2. `research-codebase` / `create-plan` / `validate-plan` — plan is not executed until approved.
3. **Gate:** CLI `--approve` or the human skill gate. Without it, `run-work-package` will not implement.
4. Apply `change-spec.json` (edit/create), `final-arbiter` (build/test/lint), `repair-loop` on failure (bounded).
5. Emit `developer.quality.handoff` only when readiness checks pass (`assertDeveloperReadyForQuality`).

Optional: `mr-intention` and `mr-preview-remote` (GitLab/GitHub payload **preview**, no live create unless you separately grant credentials and permission).

Copy-paste scripts and claim flow: **[Working in a session](/guide/sessions)**.

## How to claim a WP

A Jira Work Package (`PRX-12`) must be **claimed** or you do not own it.

```bash
make developer WP=PRX-12 REPO=/path/to/product
```

```
/session-start
WP PRX-12.
Re-read members in Jira; drop superseded.
Claim it (/claim-work-package).
Then /accept-work-package. I approve the plan; code only after approve.
```

Claim does: assignee on you, In Progress, `praxis.claim`, local `.praxis-jira/claims/PRX-12.json`.

| Situation | Action |
|-----------|--------|
| Unclaimed / your previous claim | `/claim-work-package` — take or resume |
| `claim denied: held by …` | Not yours. Force-release only with explicit human `--confirm` |
| No canonical members | Return to Architect (empty or superseded-only) |

A canon folder `wp/WP-…` is **not** claimed. Claim is a Jira key only.

## Session after claim

`accept-work-package` → research → `create-plan` → **you** approve (`validate-plan`) → `implement-plan` → `final-arbiter` → `mr-intention`.

Tiny bounded fix: `/caveman` instead of the full plan ceremony.

## Skills

### Take work and plan

| Skill | When | What you get |
|-------|------|----------------|
| `session-start` | Start | `.project`, knowledge, role `developer` / stage `implement` |
| `claim-work-package` | Jira WP ready for development | Claim for the current account. Someone else's active claim → refuse |
| `accept-work-package` | Architect published design | Handoff check. Incomplete → `status: returned`. Journal `design/<WP>/dev/acceptance.md` |
| `research-codebase` | After accept | Research **inside** the context slice |
| `load-stack-rules` | Before planning | Stack rules from knowledge / `.project` |
| `classify-scale` | Before planning | `exploratory` / `limited` / `architectural` |
| `present-design-options` | Several implementation paths | Options (UI preview when relevant). You choose |
| `create-plan` | Enough research | `design/<WP>/dev/plan.md` as `draft`. No implementation yet |
| `validate-plan` | Plan exists | Completeness, slice, testability + **your** approve |
| `plan-status` | Session dropped | Phase journal that survives context compression |
| `caveman` | Scale bounded, ceremony is overhead | Short path without a full plan |

### Implement

| Skill | When | What you get |
|-------|------|----------------|
| `implement-plan` | Plan `approved` | Phases in order; red verify → `repair-loop`, not the next phase |
| `tdd` | Phase marked `TDD: yes` | Red → green → refactor |
| `repair-loop` | Verify failed | Round journal; escalation; human on exhaustion |
| `final-arbiter` | All phases green | Build / test / lint. Required before Quality handoff |
| `mr-intention` | Arbiter green | MR intention + `developer.quality.handoff` |
| `plan-archive` | WP closed | Archive the plan for audit |
| `request-architecture-deviation` | Need to leave the slice / ADR | Request to Architect. Do not code outside the boundary |

## Implementation

| Piece | Location |
|-------|----------|
| Skills | `plugins/developer/skills/` |
| Accept | `plugins/developer/tools/accept-work-package.mjs` |
| Implement path | `plugins/developer/tools/run-work-package.mjs` |
| Arbiter | `plugins/developer/tools/final-arbiter.mjs` |
| Governance / MR preview | `plugins/developer/tools/developer-governance.mjs` |
| Session bootstrap | `plugins/developer/tools/session-bootstrap.mjs` |

**Skills** — table above. Sources: `plugins/developer/skills/`.

## CLI examples

```bash
node plugins/developer/tools/accept-work-package.mjs \
  --arch-handoff design/WP-001/architect-developer.handoff.json \
  --design-dir design/WP-001

node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/WP-001/architect-developer.handoff.json \
  --design-dir design/WP-001 --product <product-repo> --approve \
  --max-repairs 2

node plugins/developer/tools/final-arbiter.mjs --cwd <product-repo>

node plugins/developer/tools/developer-governance.mjs mr-preview-remote \
  --provider gitlab --project group/repo
```

Output handoff: `design/<WP>/dev/quality-handoff.json`. Next step: [Quality](/plugins/quality).
