# Handoff и данные

Схемы: `@praxis/contracts` (`packages/contracts/src/index.ts`). У каждого ролевого handoff есть `contract` и SemVer `version`.

## BA → Architect

**Файл:** `wp/<WP-ID>/handoffs/ba-architect.handoff.json`  
**Контракт:** `ba.architect.handoff`

| Поле | Смысл |
|------|-------|
| `workPackageId` | Идентификатор WP в каноне |
| `workPackagePath` | Путь к папке WP |
| `requirementIds` | Минимум один id требования |
| `visionConfirmed` | Должно быть true для intake архитектора |
| `readinessChecks` | `{ id, passed, detail? }[]` |

Эмит:

```bash
node plugins/ba/canon-graph/bin/praxis-ba.mjs wp approve-plan \
  --repo <canon> --wp <WP-ID> --plan wp/<WP-ID>/plan.md --json

# или
node plugins/ba/tools/emit-architect-handoff.mjs --repo <canon> --wp <WP-ID>
```

Пример:

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

**Файлы:**

- `design/<WP-ID>/architect-developer.handoff.json` — `architect.developer.handoff`
- `design/<WP-ID>/change-spec.json` — машинные правки (`ChangeSpecSchema`, поля `contract` нет)

Поля handoff: `workPackageId`, `designPackagePath`, `contextSlicePath`, `decisionIds[]`, `features[]` (`id`, `title`, `readyForDev`; опционально `estimateHours`, `dependsOn`), опционально `platformContractIds`.

Все `features[].readyForDev` должны быть `true` до `run-work-package`.

Change-spec: `changes[]` (мин. 1) и `features[]` (мин. 1). Операции: `edit` — `match`+`replace`; `create` — `content`. Опционально `acceptanceChecks`: `{ file, contains }` или `{ type: "npm-test" }`.

```bash
node plugins/architect/tools/build-architecture-package.mjs \
  --ba-handoff <handoff.json> --change-spec <change-spec.json> \
  --canon <canon> --out design --product <product-repo>

node plugins/architect/tools/emit-developer-handoff.mjs \
  --ba-handoff <handoff.json> --design-dir design/<WP-ID>
```

## Developer → Quality

**Файл:** `design/<WP-ID>/dev/quality-handoff.json`  
**Контракт:** `developer.quality.handoff`

Обязательно: `workPackageId`, `mergeRequestRef`, `intention`, `requirementIds`, `decisionIds`, `verification` с `build` / `tests` / `lint` / `packageCriteria` вида `{ status, required }`. Опционально `acceptanceChecks`.

```bash
node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/<WP>/architect-developer.handoff.json \
  --design-dir design/<WP> --product <product-repo> --approve
```

Без `--approve` путь реализации и Quality не запускается.

## Контекст MR для Quality

**Контракт:** `quality.mr.context` — **вход** для `praxis-quality review-mr --context`, роль-плагин его не пишет.

## Доказанная цепочка

```bash
npm run accept:handoff-chain
npm run accept:edit-create-pipeline
npm run accept:dq-quality-pipeline
npm run pipeline -w @praxis/e2e
npm run smoke
```
