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

Готовые фразы для чата: **[работа в сессии](/ru/guide/sessions)**.

## Сессия

```bash
make ba EPIC=PRX-1 REPO=/path/to/product
```

Или в уже открытом Claude Code с `praxis-ba`:

```
/session-start
Эпик PRX-1. Проанализируй эпик (/jira-analyze-epic).
В Jira ничего не пиши, пока я не подтвержу.
```

Canon без Jira:

```
/session-start
/capture-cr — слова клиента ниже.
Потом /grill-cr и нарезка. Confirm только после моего «да».
```

Slash-команда = имя скилла: `/prepare-wp`, `/status`.

## Скиллы

Вызов: `/<имя>` или обычным текстом («зафиксируй CR», «подготовь WP»).

### Каждый день

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `session-start` | Первое сообщение сессии | Версия плагина, `.project`, knowledge. Канон не меняет |
| `jira-analyze-epic` | Есть Epic в Jira (`PRX-1`) | Stories с AC, proposal, preview записи. Live-write только после вашего confirm. **Не** зовите рядом `create-story` |
| `status` | В любой момент | Сводка канона: vision, CR, WP, баги. Read-only |
| `capture-cr` | Пришёл запрос на изменение | CR словами клиента (Verbatim vs Interpretation). Ещё не confirm |
| `grill-cr` | После `capture-cr` | Интервью один вопрос за раз + recommended answer |
| `ba-plan-slice` | Внутри grill, до confirm | Нарезка: одна история = одно FR; файл impacts для `cr confirm` |
| `shape-requirement` | CR confirmed, impact set известен | Новые FR/NFR/BR (`spawns`) или правка существующих (`amends`) |
| `prepare-wp` | Срез требований готов к handoff | Папка `wp/<id>/`, гейт definition-of-ready |
| `approve-plan` | WP в статусе `ready`, есть `plan.md` | Ваше «да» → `plan-approved` + `ba-architect.handoff.json` |
| `accept` | Поставка доказана | Baseline требований WP. Единственный путь в `baselines/` |

### Старт продукта и слой вокруг канона

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `confirm-vision` | Новый продукт или смена vision | Человеческий гейт `vision confirm`. Без него нет CR/WP |
| `ba-scaffold` | Пустой проект, один раз | `inputs/`, `shared/`, glossary, NFR-каталог. **Не** создаёт `canon/` |
| `ba-onboard` | Код есть, требований нет | Реверс контекста из кода → первый срез в `capture-cr` |
| `ba-code-surface-scan` | Только из `ba-onboard` | Сырой список роутов/UI, без смысла |
| `ba-lint` | После любой записи в канон | `praxis-ba validate`. FAIL нельзя обойти руками |
| `goals` | Трассировка к целям | Страницы целей, `goal_ids` на требованиях |
| `one-pager` | Клиенту нужна одна страница | One-pager с живого FR (нужны назначение и AC) |
| `capture-bug` | Баг на **поставленный** FR | Запись в `bugs/`. Баги mid-WP живут в инженерных доках репо |

## Как реализовано

| Часть | Где |
|-------|-----|
| Скиллы | `plugins/ba/skills/` |
| Движок / CLI | `plugins/ba/canon-graph` (`praxis-ba`) |
| Handoff | `plugins/ba/canon-graph/src/handoff.ts`, `plugins/ba/tools/emit-architect-handoff.mjs` |
| Bootstrap | `plugins/ba/tools/session-bootstrap.mjs` |
| Манифест Claude | `plugins/ba/.claude-plugin/plugin.json` |

**Скиллы** — таблица выше. Исходники: `plugins/ba/skills/`.

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

См. [с чего начать](/ru/guide/start) / [Desktop installation](/user-guide/getting-started/installation): обычные пользователи ставят ZIP с GitHub Release. Не клонируйте Praxis-mono и не ставьте `@praxis/ba` с публичного npm. Maintainers могут подключить `plugins/ba` как directory marketplace в Claude Code.
