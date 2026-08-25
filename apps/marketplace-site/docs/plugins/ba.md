# praxis-ba

Business analyst role over an md-first, git-native requirements canon (**canon-graph**).

**License:** Apache-2.0  
**Version:** see [catalog](/catalog/)

## What it does

- Captures change requests and bugs into versioned markdown pages.
- Grills CRs to confirmed status with impact sets.
- Authorizes work packages with Definition of Ready and plan approval.
- Emits machine-consumable `ba.architect.handoff` for Architect.

## Install

Use the monorepo `plugins/ba` path or a released marketplace artifact.

```bash
# CLI (workspace)
npx praxis-ba validate --repo <canon>
npx praxis-ba status --repo <canon>
```

## Session start

On session start the plugin loads `.project`, knowledge norms, and runs a version check (`praxis-check-version`) so outdated installs get an update command without blocking compatible work.
