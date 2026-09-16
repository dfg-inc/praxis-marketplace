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

Готовые фразы: **[работа в сессии](/ru/guide/sessions)**.

## Сессия

```bash
make architect EPIC=PRX-1 REPO=/path/to/product
```

```
/session-start
Эпик PRX-1. Handoff BA — только если readyForArchitecture=true.
/intake-audit, затем /jira-plan-epic (Work Packages).
В Jira писать после моего подтверждения.
```

Canon без Jira — путь `wp/<id>/handoffs/ba-architect.handoff.json`, затем design-пакет и эмит разработчику.

Architect **не** забирает WP claim'ом и не пишет код продукта.

## Скиллы

### Intake и Jira

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `session-start` | Старт сессии | `.project`, knowledge, роль `architect` / стадия `plan` |
| `intake-audit` | Первый шаг по WP | Completeness / contradictions / feasibility. Fail → возврат BA. Файл `architecture/audits/<WP>-intake-audit.md` |
| `jira-plan-epic` | Есть BA Jira handoff | Техдизайн, Work Packages в Jira. User Story / AC BA **не** переписывать |

### Проектирование

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `grill` | Нужно развить неопределённость | Адверсариальное интервью, один вопрос, recommended answer |
| `context-map` | После зелёного intake | Карта систем/контекстов, которых касается WP |
| `divergence-points` | Два разработчика разошлись бы | Список точек, где нужны решения |
| `present-alternatives` | По точкам расхождения | Варианты с tradeoff, без выбора за человека |
| `lens-review` | Перед решением | Reliability / security / cost / ops / migration |
| `error-cost-gate` | Перед ADR | Нужен ли council (по цене отката) |
| `council` | Гейт сказал «обязателен» или вы попросили | Несколько перспектив; **решает человек** |
| `record-decision` | Выбор сделан | ADR: scope, правило, отвергнутые альтернативы. Без отвергнутых — отказ |
| `nfr-budget` | Есть измеримый NFR | Метрика, лимит, как и когда проверять |
| `platform-contract` | Обмен между платформами | Контракт + политика совместимости |
| `design-package` | ADR приняты | `design/<WP>/`: index, диаграммы, decisions, `change-intent.json` |
| `decompose-features` | Пакет собран | Фичи/стори с `readyForDev` |
| `context-slice` | Перед handoff Developer | Что в срезе / вне среза / non-negotiables |
| `initial-estimate` | Нужен порядок поставки | Оценка и рекомендуемый build order |

### После разработки

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `accept-deviation` | Developer прислал `request-architecture-deviation` | Принять отклонение как изменение ADR |
| `verify-against-decisions` | Код уже есть | Сверка с ADR и тратой NFR-бюджета |

## Как реализовано

| Часть | Где |
|-------|-----|
| Скиллы | `plugins/architect/skills/` |
| Сборка пакета | `plugins/architect/tools/build-architecture-package.mjs` |
| Handoff | `plugins/architect/tools/emit-developer-handoff.mjs` |
| Governance CLI | `plugins/architect/tools/architecture-governance.mjs` |
| Bootstrap | `plugins/architect/tools/session-bootstrap.mjs` |

**Скиллы** — таблица выше. Исходники: `plugins/architect/skills/`.

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
