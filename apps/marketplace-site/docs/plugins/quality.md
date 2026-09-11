# Quality service

Reviews, audits, and metrics for work that already passed Developer verification.

**License:** UNLICENSED (company-only) · **Package:** `@praxis/quality-service` · **Path:** `apps/quality-service`  
**Not** an Apache Claude marketplace plugin. Not in the public catalog lineup ([catalog](/catalog/)).

## How it works

Quality consumes `developer.quality.handoff` (and optionally `quality.mr.context`). It:

1. Validates the handoff with `@praxis/contracts`
2. Requires verification checks marked `required` to have passed
3. Runs path review (discovery, acceptance checks, optional npm test rerun) or MR-context review
4. Persists results in SQLite (`reviews`, `audits`, `rollback_events`, `return_events`, `task_completions`)

HTTP path reviews also require `PRAXIS_QUALITY_ALLOWED_ROOT`; the requested path must stay under that root.

## Run

```bash
# CLI
node apps/quality-service/bin/praxis-quality.mjs review-path \
  --path <product-repo> \
  --handoff design/<WP>/dev/quality-handoff.json \
  --project demo

node apps/quality-service/bin/praxis-quality.mjs review-mr --context mr-context.json
node apps/quality-service/bin/praxis-quality.mjs review-mr-preview \
  --provider gitlab --project group/repo --mr 12
node apps/quality-service/bin/praxis-quality.mjs metrics --project demo

# HTTP
export PRAXIS_QUALITY_ALLOWED_ROOT="$(pwd)"
export PRAXIS_QUALITY_DB=.praxis-quality/quality.sqlite
export PORT=8787
npm run start -w @praxis/quality-service
curl -s http://127.0.0.1:8787/health
```

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health` | Liveness |
| `GET` | `/metrics?project=` | Metrics |
| `POST` | `/reviews/path` | Path review + persist |
| `GET` | `/reviews/:id` | Persisted review |

`POST /reviews/path` body: `{ "projectId", "path", "handoff" }`. Contract errors → 4xx. A completed failing review → **200** with `verdict: "fail"`.

## Docker

```bash
docker compose up --build quality-service
```

Compose maps host `${PRAXIS_QUALITY_HOST_ROOT:-.}` → `/work`, sets `PRAXIS_QUALITY_ALLOWED_ROOT=/work`, persists DB on volume `quality-data` (`/data/quality.sqlite`), port **8787**.

If the Docker daemon is not running, use the Node CLI/HTTP path above. Static compose/Dockerfile checks: `npm run verify:docker`.

## Skill

App-local (not a public plugin): `apps/quality-service/skills/propose-rule-from-findings`.
