# Quality

Reviews, audits, and metrics for work that already passed Developer verification.

Two parts:

| What | Path | How to run |
|------|------|------------|
| Claude plugin **praxis-quality** | `plugins/quality` | `make qa WP=PRX-12 REPO=…` |
| HTTP/CLI **quality-service** | `apps/quality-service` | `docker compose up quality-service` or `praxis-quality.mjs` |

**License:** UNLICENSED (company-only). Not an Apache marketplace plugin and not in the public catalog ([catalog](/catalog/)).

Copy-paste scripts: **[Working in a session](/guide/sessions)**.

## QA session (Claude)

```bash
make quality-up
make qa WP=PRX-12 REPO=/path/to/product
```

```
/session-start
WP PRX-12. Verify locally (/verify-work-package).
Do not change product source.
```

install/build/test/coverage/start come only from `.project` → `quality:`. Test-file writes only with `PRAXIS_QA_ALLOW_TEST_WRITES=1` and your approved file list.

### Plugin skills

| Skill | When | What you get |
|-------|------|----------------|
| `session-start` | Start | `.project`, knowledge, role `qa` / stage `quality`. Then waits for a WP key |
| `verify-work-package` | WP claimed / ready-for-qa | Local run + report `.praxis-jira/quality/<WP>.md` |

Do not invent Jira data. Canonical tickets only.

Machine report without chat: `make quality-report WP=PRX-12` (after verify).

## Review service (HTTP/CLI)

Quality-service consumes `developer.quality.handoff` (and optionally `quality.mr.context`). It:

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
| `POST` | `/reviews/work-package` | Work Package review + persist (no Jira) |
| `GET` | `/reviews` | List persisted reviews |
| `GET` | `/reviews/:id` | Persisted review |
| `POST` | `/reviews/:id/applied` | Mark review applied after Quality Apply |

`POST /reviews/path` body: `{ "projectId", "path", "handoff" }`. Contract errors → 4xx. A completed failing review → **200** with `verdict: "fail"`.

## Docker

```bash
docker compose up --build quality-service
```

Compose maps host `${PRAXIS_QUALITY_HOST_ROOT:-.}` → `/work`, sets `PRAXIS_QUALITY_ALLOWED_ROOT=/work`, persists DB on volume `quality-data` (`/data/quality.sqlite`), port **8787**.

If the Docker daemon is not running, use the Node CLI/HTTP path above. Static compose/Dockerfile checks: `npm run verify:docker`.

## Service skill

App-local (not a public plugin): `apps/quality-service/skills/propose-rule-from-findings`.
