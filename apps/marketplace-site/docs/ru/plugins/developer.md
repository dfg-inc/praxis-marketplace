# praxis-developer

Роль разработчика: принять архитектурный пакет, утвердить план, реализовать, проверить, отдать Quality.

**Лицензия:** Apache-2.0 · **Пакет:** `@praxis/developer` · **Путь:** `plugins/developer`  
**Версия:** см. [каталог](/catalog/)  
**Установка:** [с чего начать](/ru/guide/start) — на публичном npm пакета нет.

## Как работает

1. `accept-work-package` — валидация `architect.developer.handoff` и каталога design. Неполный пакет → `status: returned`.
2. `research-codebase` / `create-plan` / `validate-plan` — план не исполняется до approve.
3. **Гейт:** CLI `--approve` или человеческий гейт скилла. Без него `run-work-package` не реализует.
4. Применение `change-spec.json` (edit/create), `final-arbiter` (build/test/lint), `repair-loop` при ошибке (с лимитом).
5. Эмит `developer.quality.handoff` только после readiness (`assertDeveloperReadyForQuality`).

Опционально: `mr-intention` и `mr-preview-remote` (preview payload GitLab/GitHub, без живого create без отдельного разрешения).

Готовые фразы и claim: **[работа в сессии](/ru/guide/sessions)**.

## Как забрать WP (claim)

Jira Work Package (`PRX-12`) нужно **claim**, иначе вы не владелец пакета.

```bash
make developer WP=PRX-12 REPO=/path/to/product
```

```
/session-start
WP PRX-12.
Перечитай состав в Jira, отбрось superseded.
Забери пакет (/claim-work-package).
Потом /accept-work-package. План утверждаю я, код — после approve.
```

Что делает claim: assignee на вас, In Progress, свойство `praxis.claim`, локальный файл `.praxis-jira/claims/PRX-12.json`.

| Ситуация | Действие |
|----------|----------|
| Ничей / ваш старый claim | `/claim-work-package` — берёте или продолжаете |
| `claim denied: held by …` | Не ваш пакет. Force-release только с явным человеческим `--confirm` |
| Нет канонических members | Вернуть Architect (пусто или только superseded) |

Canon-папка `wp/WP-…` **не** claim'ается. Claim — только Jira-ключ.

## Сессия после claim

`accept-work-package` → исследование → `create-plan` → **вы** approve (`validate-plan`) → `implement-plan` → `final-arbiter` → `mr-intention`.

Мелкий bounded-фикс: `/caveman` вместо полной церемонии плана.

## Скиллы

### Взять работу и спланировать

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `session-start` | Старт | `.project`, knowledge, роль `developer` / стадия `implement` |
| `claim-work-package` | Jira WP готов к разработке | Claim на текущую учётку. Чужой active claim — отказ |
| `accept-work-package` | Architect отдал design | Проверка handoff. Incomplete → `status: returned`. Журнал `design/<WP>/dev/acceptance.md` |
| `research-codebase` | После accept | Исследование кода **внутри** context-slice |
| `load-stack-rules` | Перед планом | Правила стека из knowledge / `.project` |
| `classify-scale` | Перед планом | `exploratory` / `limited` / `architectural` |
| `present-design-options` | Несколько способов в коде | Варианты (с preview UI, если уместно). Выбор за вами |
| `create-plan` | Исследование достаточно | `design/<WP>/dev/plan.md` со статусом `draft`. Реализации ещё нет |
| `validate-plan` | План написан | Полнота, slice, тестируемость + **ваше** approve |
| `plan-status` | Сессия оборвалась | Журнал фаз, переживает сжатие контекста |
| `caveman` | Scale bounded, церемония избыточна | Короткий путь без полного плана |

### Реализация

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `implement-plan` | План `approved` | Фазы по очереди; красный verify → `repair-loop`, не следующая фаза |
| `tdd` | Фаза с `TDD: yes` | Red → green → refactor |
| `repair-loop` | Упал verify | Журнал раундов; эскалация; на исчерпании — человек |
| `final-arbiter` | Все фазы зелёные | Build / test / lint. Без этого нет handoff Quality |
| `mr-intention` | Arbiter зелёный | Намерение MR + `developer.quality.handoff` |
| `plan-archive` | WP закрыт | Архив плана для аудита |
| `request-architecture-deviation` | Нужно выйти за slice / ADR | Запрос Architect. Код за границей не писать |

## Как реализовано

| Часть | Где |
|-------|-----|
| Скиллы | `plugins/developer/skills/` |
| Accept | `plugins/developer/tools/accept-work-package.mjs` |
| Реализация | `plugins/developer/tools/run-work-package.mjs` |
| Arbiter | `plugins/developer/tools/final-arbiter.mjs` |
| Governance / MR preview | `plugins/developer/tools/developer-governance.mjs` |
| Bootstrap | `plugins/developer/tools/session-bootstrap.mjs` |

**Скиллы** — таблица выше. Исходники: `plugins/developer/skills/`.

## Примеры CLI

```bash
node plugins/developer/tools/accept-work-package.mjs \
  --arch-handoff design/WP-001/architect-developer.handoff.json \
  --design-dir design/WP-001

node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/WP-001/architect-developer.handoff.json \
  --design-dir design/WP-001 --product <product-repo> --approve \
  --max-repairs 2

node plugins/developer/tools/final-arbiter.mjs --cwd <product-repo>

node plugins/developer/tools/developer-governance.mjs mr-preview-remote \
  --provider gitlab --project group/repo
```

Выход: `design/<WP>/dev/quality-handoff.json`. Дальше: [Quality](/ru/plugins/quality).
