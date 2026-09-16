# praxis-architect

Architecture role: intake a BA work package, record decisions, produce a Developer-ready design package.

**License:** Apache-2.0 · **Package:** `@praxis/architect` · **Path:** `plugins/architect`  
**Version:** see [catalog](/catalog/)  
**Install:** [Getting started](/guide/start) — not published to public npm.

## How it works

1. Read `ba.architect.handoff`. Refuse intake if vision is not confirmed or readiness checks fail (`intake-audit`).
2. Map context, divergence, alternatives, lens review (skills + `architecture-governance.mjs` verbs).
3. Record ADRs / decisions, NFR budgets, platform contracts as needed.
4. Write `design/<WP-ID>/` (markdown package + `change-spec.json`).
5. Emit `architect.developer.handoff` with every feature `readyForDev: true`.

Architect does not apply code edits. The change-spec is **input** for Developer.

Copy-paste scripts: **[Working in a session](/guide/sessions)**.

## Session

```bash
make architect EPIC=PRX-1 REPO=/path/to/product
```

```
/session-start
Epic PRX-1. Read the BA handoff only if readyForArchitecture=true.
/intake-audit, then /jira-plan-epic (Work Packages).
Jira writes after I confirm.
```

Canon without Jira: path `wp/<id>/handoffs/ba-architect.handoff.json`, then design package and developer emit.

Architect does **not** claim WPs and does not edit product code.

## Skills

### Intake and Jira

| Skill | When | What you get |
|-------|------|----------------|
| `session-start` | Session start | `.project`, knowledge, role `architect` / stage `plan` |
| `intake-audit` | First step on a WP | Completeness / contradictions / feasibility. Fail → return to BA. File `architecture/audits/<WP>-intake-audit.md` |
| `jira-plan-epic` | BA Jira handoff exists | Technical design, Jira Work Packages. Do **not** overwrite BA User Story / AC |

### Design

| Skill | When | What you get |
|-------|------|----------------|
| `grill` | Ambiguity needs pressure | Adversarial interview, one question, recommended answer |
| `context-map` | After green intake | Systems/contexts the WP touches |
| `divergence-points` | Two implementers would diverge | Points that need decisions |
| `present-alternatives` | Per divergence point | Options with tradeoffs; human still chooses |
| `lens-review` | Before a decision | Reliability / security / cost / ops / migration |
| `error-cost-gate` | Before an ADR | Whether council is mandatory (rollback cost) |
| `council` | Gate said required, or you asked | Multiple perspectives; **human decides** |
| `record-decision` | Choice made | ADR: scope, rule, rejected alternatives. Missing rejects → refuse |
| `nfr-budget` | Measurable NFR | Metric, limit, how and when to verify |
| `platform-contract` | Cross-platform exchange | Contract + compatibility policy |
| `design-package` | ADRs accepted | `design/<WP>/`: index, diagrams, decisions, `change-intent.json` |
| `decompose-features` | Package assembled | Features/stories with `readyForDev` |
| `context-slice` | Before Developer handoff | In slice / out of slice / non-negotiables |
| `initial-estimate` | Need a delivery order | Estimate and recommended build order |

### After implementation

| Skill | When | What you get |
|-------|------|----------------|
| `accept-deviation` | Developer filed `request-architecture-deviation` | Accept as an ADR change |
| `verify-against-decisions` | Code already exists | Check against ADRs and NFR budget spend |

## Implementation

| Piece | Location |
|-------|----------|
| Skills | `plugins/architect/skills/` |
| Package builder | `plugins/architect/tools/build-architecture-package.mjs` |
| Handoff emit | `plugins/architect/tools/emit-developer-handoff.mjs` |
| Governance CLI | `plugins/architect/tools/architecture-governance.mjs` |
| Session bootstrap | `plugins/architect/tools/session-bootstrap.mjs` |

**Skills** — table above. Sources: `plugins/architect/skills/`.

Governance verbs include: `classify-error-cost`, `record-council`, `assert-record-decision`, `write-platform-contract`, `list-platform-contracts`, `detect-missing-contracts`, `build-plan`, `submit-deviation`, `decide-deviation`, `conformance`, `intake-audit`, `context-map`, `divergence-points`, `alternatives`, `lens-review`, `record-decision`, `nfr-budget`.

## CLI examples

```bash
node plugins/architect/tools/build-architecture-package.mjs \
  --ba-handoff wp/WP-001/handoffs/ba-architect.handoff.json \
  --change-spec change-spec.json \
  --canon <canon> --out design --product <product-repo>

node plugins/architect/tools/emit-developer-handoff.mjs \
  --ba-handoff wp/WP-001/handoffs/ba-architect.handoff.json \
  --design-dir design/WP-001

node plugins/architect/tools/architecture-governance.mjs intake-audit --in ba-handoff.json
```

`build-architecture-package.mjs` **requires** `--change-spec`. Interactive sessions may author `change-intent.json` plus markdown, then emit the Developer handoff.

Design folder typically contains `index.md`, `decisions.md`, ADR files, `context-slice.md`, `nfr-budgets.md`, `contracts.md`, `change-spec.json`, `architect-developer.handoff.json`.

See [handoffs](/guide/handoffs) for the JSON contracts.
