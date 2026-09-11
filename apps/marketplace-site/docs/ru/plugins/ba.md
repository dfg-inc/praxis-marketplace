# praxis-ba

Роль бизнес-аналитика над **md-first, git-native каноном требований** (canon-graph).

**Лицензия:** Apache-2.0 · **Пакет:** `@praxis/ba` · **Путь:** `plugins/ba`  
**Версия:** см. [каталог](/catalog/)

BA готовит **вход** для архитектуры и разработки. Код продукта не пишет и не привязывает канон к конкретному вендорскому workflow.

## Как работает

Канон — отдельный каталог (часто `canon/`): `.ba/`, `vision.md`, `epics/`, `br/`, `cr/`, `wp/`, `bugs/`. Скиллы пишут markdown из шаблонов. **CLI владеет** confirm / approve / accept / validate.

Типовой поток CR:

1. `capture-cr` — слова клиента без продуктового суда
2. `grill-cr` + `ba-plan-slice` — интервью и impact set
3. Человеческий гейт: `praxis-ba cr confirm --entry … --impacts-file …`
4. `shape-requirement` — `spawns` / `amends`
5. `prepare-wp` → план → `approve-plan` (эмит handoff архитектору)
6. Позже: `accept`, когда поставка доказана в каноне

На старте сессии плагин читает [`.project` и knowledge](/ru/guide/context) и проверяет версию.

## Как реализовано

| Часть | Где |
|-------|-----|
| Скиллы | `plugins/ba/skills/` |
| Движок / CLI | `plugins/ba/canon-graph` (`praxis-ba`) |
| Handoff | `plugins/ba/canon-graph/src/handoff.ts`, `plugins/ba/tools/emit-architect-handoff.mjs` |
| Bootstrap | `plugins/ba/tools/session-bootstrap.mjs` |
| Манифест Claude | `plugins/ba/.claude-plugin/plugin.json` |

**Скиллы:** `session-start`, `confirm-vision`, `capture-cr`, `grill-cr`, `ba-plan-slice`, `shape-requirement`, `prepare-wp`, `approve-plan`, `accept`, `capture-bug`, `status`, `goals`, `one-pager`, `ba-scaffold`, `ba-onboard`, `ba-code-surface-scan`, `ba-lint`.

## CLI

Монорепозиторий:

```bash
node plugins/ba/canon-graph/bin/praxis-ba.mjs <verb> --repo <canon-dir>
```

Упакованный плагин: `node <plugin-dir>/bin/praxis-ba.cjs` (в workspace нет `plugins/ba/bin/`). Пакет `@praxis/ba-canon-graph` также даёт бинарь `praxis-ba`.

Глаголы: `validate [--check]`, `status`, `vision confirm`, `cr confirm`, `cr realize`, `req edit|retire`, `epic add`, `wp prepare|approve-plan|abandon`, `bug capture|resolve`, `accept`, `id next`, `fmt`, `render`/`export`, `migrate`.

## Примеры

```bash
node plugins/ba/canon-graph/bin/praxis-ba.mjs validate --repo <canon>
node plugins/ba/canon-graph/bin/praxis-ba.mjs status --repo <canon>
node plugins/ba/canon-graph/bin/praxis-ba.mjs wp approve-plan \
  --repo <canon> --wp WP-001 --plan wp/WP-001/plan.md --json
```

Последняя команда пишет [BA→Architect handoff](/ru/guide/handoffs).

## Установка в хост-репозиторий

См. [с чего начать](/ru/guide/start): клон монорепозитория, `npm install`, затем `plugins/ba` как marketplace типа **directory**. Не ставьте `@praxis/ba` с публичного npm.
