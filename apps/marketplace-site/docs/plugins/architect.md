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

## Implementation

| Piece | Location |
|-------|----------|
| Skills | `plugins/architect/skills/` |
| Package builder | `plugins/architect/tools/build-architecture-package.mjs` |
| Handoff emit | `plugins/architect/tools/emit-developer-handoff.mjs` |
| Governance CLI | `plugins/architect/tools/architecture-governance.mjs` |
| Session bootstrap | `plugins/architect/tools/session-bootstrap.mjs` |

**Skills:** `session-start`, `intake-audit`, `grill`, `council`, `context-map`, `context-slice`, `divergence-points`, `present-alternatives`, `lens-review`, `record-decision`, `nfr-budget`, `error-cost-gate`, `platform-contract`, `decompose-features`, `design-package`, `initial-estimate`, `verify-against-decisions`, `accept-deviation`.

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
