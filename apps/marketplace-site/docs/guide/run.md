# Run and verify

Advanced / CI page for **product maintainers**. Ordinary Desktop users install from GitHub Releases ([Catalog](/catalog/), [Desktop installation](/user-guide/getting-started/installation)) and do not run these commands.

Use this page **after** [Getting started](/guide/start). Commands are from the **product repository** root you are developing (not Praxis-mono), with that repo’s `npm install` / `npm run build` already done.

## Prove it works (first command)

```bash
npm run smoke
```

Runs BA → Architect → Developer → Quality on `samples/mini-counter`. No Jira, no live Git host.

Longer: `npm run verify` (build, tests, boundary checks, accept gates, smoke, packaging).

Docker (same as CI; needs a running daemon):

```bash
docker compose build workspace
docker compose run --rm workspace npm run verify
```

## Enable plugins in Claude Code

Prefer **local directories** from your clone — see [Getting started, path B](/guide/start). Example shape:

```json
{
  "extraKnownMarketplaces": {
    "praxis-ba": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/ba"
      }
    }
  },
  "enabledPlugins": {
    "praxis-ba@praxis-ba": true
  }
}
```

Architect and Developer: same pattern with `plugins/architect` and `plugins/developer`.

A **future** git marketplace (GitHub or GitLab) looks like this — only after that remote exists and you pin a **real tag**:

```json
{
  "extraKnownMarketplaces": {
    "praxis-ba": {
      "source": {
        "source": "url",
        "url": "https://github.com/dfg-inc/praxis-ba.git",
        "ref": "v0.1.0-alpha.20"
      }
    }
  },
  "enabledPlugins": {
    "praxis-ba@praxis-ba": true
  }
}
```

Do not copy a `v1.0` pin unless that tag exists. Verify with `/plugin marketplace list` and `/plugin list`, then restart the session.

## Machine walkthrough (no chat)

Use a real canon / design / product, or rely on smoke/e2e instead of inventing ids.

```bash
# 1. BA — validate canon and approve a WP plan (emits BA handoff)
node plugins/ba/canon-graph/bin/praxis-ba.mjs validate --repo <canon>
node plugins/ba/canon-graph/bin/praxis-ba.mjs wp approve-plan \
  --repo <canon> --wp <WP-ID> --plan wp/<WP-ID>/plan.md --json

# 2. Architect — design package + Developer handoff (needs --change-spec)
node plugins/architect/tools/build-architecture-package.mjs \
  --ba-handoff wp/<WP-ID>/handoffs/ba-architect.handoff.json \
  --change-spec <change-spec.json> \
  --canon <canon> --out design --product <product>

# 3. Developer — accept, then implement only with --approve
node plugins/developer/tools/accept-work-package.mjs \
  --arch-handoff design/<WP-ID>/architect-developer.handoff.json \
  --design-dir design/<WP-ID>
node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/<WP-ID>/architect-developer.handoff.json \
  --design-dir design/<WP-ID> --product <product> --approve

# 4. Quality — review the product tree against the Developer handoff
node apps/quality-service/bin/praxis-quality.mjs review-path \
  --path <product> --handoff design/<WP-ID>/dev/quality-handoff.json \
  --project demo
```

Packed BA releases expose `bin/praxis-ba.cjs`. In the monorepo use `plugins/ba/canon-graph/bin/praxis-ba.mjs`.

Related gates: `npm run accept:handoff-chain`, `npm run pipeline -w @praxis/e2e`.

## Quality HTTP (optional)

```bash
export PRAXIS_QUALITY_ALLOWED_ROOT="$(pwd)"
export PORT=8787
npm run start -w @praxis/quality-service
curl -s http://127.0.0.1:8787/health
```

```bash
docker compose up --build quality-service
```

## Claude roles (Jira)

```bash
make ba         EPIC=PRX-1  REPO=/path/to/product
make architect  EPIC=PRX-1  REPO=/path/to/product
make developer  WP=PRX-12   REPO=/path/to/product
make qa         WP=PRX-12   REPO=/path/to/product
```

What to type, skill catalogs, claiming a WP: **[Working in a session](/guide/sessions)**.

## This documentation site

```bash
docker compose --profile docs up --build marketplace-site
# http://localhost:4173/  — sessions: /guide/sessions

npm run dev -w @praxis/marketplace-site
# http://localhost:5173/
```

English is the default locale; Russian is under `/ru/`.
