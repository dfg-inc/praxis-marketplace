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

## Implementation

| Piece | Location |
|-------|----------|
| Skills | `plugins/developer/skills/` |
| Accept | `plugins/developer/tools/accept-work-package.mjs` |
| Implement path | `plugins/developer/tools/run-work-package.mjs` |
| Arbiter | `plugins/developer/tools/final-arbiter.mjs` |
| Governance / MR preview | `plugins/developer/tools/developer-governance.mjs` |
| Session bootstrap | `plugins/developer/tools/session-bootstrap.mjs` |

**Skills:** `session-start`, `accept-work-package`, `research-codebase`, `load-stack-rules`, `classify-scale`, `create-plan`, `validate-plan`, `present-design-options`, `implement-plan`, `tdd`, `caveman`, `final-arbiter`, `repair-loop`, `plan-status`, `plan-archive`, `mr-intention`, `request-architecture-deviation`.

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
