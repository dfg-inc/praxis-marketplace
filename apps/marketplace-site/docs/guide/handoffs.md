# Handoffs and data

Schemas: `@praxis/contracts` (`packages/contracts/src/index.ts`). Every role handoff has `contract` plus SemVer `version`.

## BA → Architect

**File:** `wp/<WP-ID>/handoffs/ba-architect.handoff.json`  
**Contract:** `ba.architect.handoff`

| Field | Meaning |
|-------|---------|
| `workPackageId` | WP id in the canon |
| `workPackagePath` | Path to the WP folder |
| `requirementIds` | At least one requirement id |
| `visionConfirmed` | Must be true for Architect intake |
| `readinessChecks` | `{ id, passed, detail? }[]` |

Emit:

```bash
node plugins/ba/canon-graph/bin/praxis-ba.mjs wp approve-plan \
  --repo <canon> --wp <WP-ID> --plan wp/<WP-ID>/plan.md --json

# or
node plugins/ba/tools/emit-architect-handoff.mjs --repo <canon> --wp <WP-ID>
```

Example shape:

```json
{
  "contract": "ba.architect.handoff",
  "version": "1.0.0",
  "workPackageId": "WP-001",
  "workPackagePath": "wp/WP-001",
  "requirementIds": ["FR-001"],
  "visionConfirmed": true,
  "readinessChecks": [{ "id": "plan-approved", "passed": true }]
}
```

## Architect → Developer

**Files:**

- `design/<WP-ID>/architect-developer.handoff.json` — `architect.developer.handoff`
- `design/<WP-ID>/change-spec.json` — machine edits (`ChangeSpecSchema`, no `contract` field)

Handoff fields: `workPackageId`, `designPackagePath`, `contextSlicePath`, `decisionIds[]`, `features[]` (`id`, `title`, `readyForDev`; optional `estimateHours`, `dependsOn`), optional `platformContractIds`.

All `features[].readyForDev` must be `true` before Developer `run-work-package`.

Change-spec: `changes[]` (min 1) and `features[]` (min 1). Ops: `edit` needs `match`+`replace`; `create` needs `content`. Optional `acceptanceChecks`: `{ file, contains }` or `{ type: "npm-test" }`.

```bash
node plugins/architect/tools/build-architecture-package.mjs \
  --ba-handoff <handoff.json> --change-spec <change-spec.json> \
  --canon <canon> --out design --product <product-repo>

node plugins/architect/tools/emit-developer-handoff.mjs \
  --ba-handoff <handoff.json> --design-dir design/<WP-ID>
```

## Developer → Quality

**File:** `design/<WP-ID>/dev/quality-handoff.json`  
**Contract:** `developer.quality.handoff`

Required: `workPackageId`, `mergeRequestRef`, `intention`, `requirementIds`, `decisionIds`, `verification` with `build` / `tests` / `lint` / `packageCriteria` each `{ status, required }`. Optional `acceptanceChecks`.

```bash
node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/<WP>/architect-developer.handoff.json \
  --design-dir design/<WP> --product <product-repo> --approve
```

Without `--approve` the implement/quality path does not run.

## Quality MR context

**Contract:** `quality.mr.context` — **input** to `praxis-quality review-mr --context`, not written by a role plugin.

Includes repo path, base/head branches and SHAs, `changedFiles`, requirement/decision ids, optional nested quality handoff.

## Proven chain

```bash
npm run accept:handoff-chain
npm run accept:edit-create-pipeline
npm run accept:dq-quality-pipeline
npm run pipeline -w @praxis/e2e
npm run smoke
```
