# praxis-architect

Роль архитектора: принять work package от BA, зафиксировать решения, собрать design-пакет для Developer.

**Лицензия:** Apache-2.0 · **Пакет:** `@praxis/architect` · **Путь:** `plugins/architect`  
**Версия:** см. [каталог](/catalog/)  
**Установка:** [с чего начать](/ru/guide/start) — на публичном npm пакета нет.

## Как работает

1. Читает `ba.architect.handoff`. Отказывает в intake, если vision не подтверждён или readiness не прошёл (`intake-audit`).
2. Карта контекста, точки расхождения, альтернативы, lens review (скиллы + глаголы `architecture-governance.mjs`).
3. ADR / решения, NFR-бюджеты, platform contracts по необходимости.
4. Пишет `design/<WP-ID>/` (markdown + `change-spec.json`).
5. Эмитит `architect.developer.handoff` со всеми `readyForDev: true`.

Архитектор не применяет правки кода. Change-spec — **вход** для Developer.

## Как реализовано

| Часть | Где |
|-------|-----|
| Скиллы | `plugins/architect/skills/` |
| Сборка пакета | `plugins/architect/tools/build-architecture-package.mjs` |
| Handoff | `plugins/architect/tools/emit-developer-handoff.mjs` |
| Governance CLI | `plugins/architect/tools/architecture-governance.mjs` |
| Bootstrap | `plugins/architect/tools/session-bootstrap.mjs` |

**Скиллы:** `session-start`, `intake-audit`, `grill`, `council`, `context-map`, `context-slice`, `divergence-points`, `present-alternatives`, `lens-review`, `record-decision`, `nfr-budget`, `error-cost-gate`, `platform-contract`, `decompose-features`, `design-package`, `initial-estimate`, `verify-against-decisions`, `accept-deviation`.

Глаголы governance: `classify-error-cost`, `record-council`, `assert-record-decision`, `write-platform-contract`, `list-platform-contracts`, `detect-missing-contracts`, `build-plan`, `submit-deviation`, `decide-deviation`, `conformance`, `intake-audit`, `context-map`, `divergence-points`, `alternatives`, `lens-review`, `record-decision`, `nfr-budget`.

## Примеры CLI

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

`build-architecture-package.mjs` **требует** `--change-spec`.

Типичный design-каталог: `index.md`, `decisions.md`, ADR, `context-slice.md`, `nfr-budgets.md`, `contracts.md`, `change-spec.json`, `architect-developer.handoff.json`.

Контракты JSON: [handoffs](/ru/guide/handoffs).
