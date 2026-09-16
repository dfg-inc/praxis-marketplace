# Работа в сессии

Страница для человека, который открыл Claude Code и должен **сам** провести роль: какие скиллы есть, что писать в чат, как забрать Work Package.

Плагины должны быть включены ([с чего начать](/ru/guide/start)). Рабочая директория — **продуктовый** репозиторий, не монорепозиторий Praxis.

## Как вызывать скиллы

Скилл — именованный сценарий плагина. Два равносильных способа:

1. Slash-команда: `/session-start`, `/claim-work-package`, `/prepare-wp`
2. Обычный текст: «Начни сессию BA», «Забери WP PRX-12»

Пишите **ключ тикета и путь к репо** сразу. Не ждите, что агент угадает эпик.

Необратимые шаги агент **не** делает молча: confirm vision, confirm CR, approve плана, claim чужого WP, `--approve` реализации, live-запись в Jira. Если спросил — ответьте явно «да» / «нет».

## Два вида Work Package

| Вид | Пример | Кто создаёт | Как «забрать» |
|-----|--------|-------------|---------------|
| **Jira WP** | `PRX-12` | Architect (`jira-plan-epic`) | Developer: `/claim-work-package` |
| **Canon WP** | `WP-20260825-001`, папка `canon/wp/…` | BA (`prepare-wp`) | Не claim. Architect читает handoff после `approve-plan` |

GDS с Jira работает **ключами вроде `PRX-12`**. Папки `WP-…` — канон требований, их не claim'ают.

## Ежедневный контур (Jira)

Из корня **монорепозитория** Praxis (нужны Claude Code, `.env.praxis.local`, плагины в продукте):

```bash
# Плагины в продуктовый репо (один раз на версию)
make install-test VERSION=0.1.0-alpha.25 TEST_REPO=/path/to/product

# Роли — каждая открывает Claude Code в REPO
make ba         EPIC=PRX-1  REPO=/path/to/product
make architect  EPIC=PRX-1  REPO=/path/to/product
make developer  WP=PRX-12   REPO=/path/to/product
make qa         WP=PRX-12   REPO=/path/to/product
```

Порядок: BA закрывает Epic → Architect режет Work Packages → Developer **claim** → реализация → QA verify.

Машина без чата: `make ba-preview`, `make architect-preview`, `make developer-status`, `make quality-report`.

---

## BA

Полный каталог: [плагин BA](/ru/plugins/ba).

### Что написать в чат

После `make ba EPIC=PRX-1 REPO=/path/to/product` (или сами включили `praxis-ba`):

```
Начни сессию BA (/session-start).
Эпик PRX-1. Репозиторий — текущий.
Проанализируй эпик (/jira-analyze-epic): Stories с AC, proposal, preview в Jira.
Ничего не пиши в Jira, пока я не подтвержу.
```

Новый продукт без Jira:

```
/session-start
Разложи BA-слой (/ba-scaffold), затем подтвердим vision (/confirm-vision).
Дальше CR: /capture-cr → /grill-cr → /shape-requirement → /prepare-wp.
```

Запрос от клиента:

```
Зафиксируй CR словами клиента (/capture-cr):
«Хотим экспорт отчёта в Excel с прошлого месяца».
Потом grill и нарезка. Confirm не делай без моего «да».
```

### Типовой порядок

`session-start` → `jira-analyze-epic` **или** `capture-cr` → `grill-cr` / `ba-plan-slice` → человек confirm → `shape-requirement` → `prepare-wp` → человек approve (`approve-plan`) → handoff архитектору.

Не вызывайте отдельно jira-скилл `create-story`: дублирует Stories без `praxis.artifactId`.

---

## Architect

Полный каталог: [плагин Architect](/ru/plugins/architect).

### Что написать в чат

```
Начни сессию Architect (/session-start).
Эпик PRX-1.
Возьми BA-handoff, только если readyForArchitecture=true.
Прогони intake (/intake-audit). Canonical stories only, superseded не трогай.
Спланируй эпик в Jira (/jira-plan-epic): design, Work Packages.
Записи в Jira — только после моего подтверждения.
```

Canon без Jira:

```
/session-start
Intake по wp/WP-001/handoffs/ba-architect.handoff.json
Дальше: context-map → divergence-points → record-decision → design-package → context-slice.
Эмит handoff разработчику, когда все features readyForDev.
```

Architect **не** claim'ает WP и **не** пишет код продукта.

---

## Developer — как забрать WP

Полный каталог: [плагин Developer](/ru/plugins/developer).

**Забрать WP** = claim в Jira. Пакет становится вашим: assignee, In Progress, свойство `praxis.claim`. Чужой активный claim агент не перебивает.

### Старт сессии

```bash
make developer WP=PRX-12 REPO=/path/to/product
```

В чат:

```
Начни сессию Developer (/session-start).
Work Package PRX-12.
1. Перечитай состав WP в Jira, отбрось superseded.
2. Забери пакет на себя (/claim-work-package).
3. Прими design-пакет (/accept-work-package).
4. Исследование и план. Реализацию не начинай, пока я не утвержу план.
```

Если `make developer` уже подставил `WP`, достаточно:

```
Забери этот WP. Потом accept и план. Код — после моего approve.
```

### Если claim не прошёл

| Сообщение | Что делать |
|-----------|------------|
| `claim denied: … held by …` | Пакет у другого человека. Не force-release сами. Владелец или явный `--confirm` на release |
| нет канонических members | Architect: в WP только superseded/пусто. Вернуть Architect |
| плагин не в `node_modules/@praxis/developer` | `make install-test VERSION=… TEST_REPO=…` |

Свой claim можно продолжить той же учёткой (повторный `/claim-work-package` вернёт существующий).

### После claim

`accept-work-package` → `research-codebase` / `load-stack-rules` → `classify-scale` → `create-plan` → **вы** approve (`validate-plan`) → `implement-plan` → `final-arbiter` → `mr-intention` (handoff Quality).

Мелкий фикс без полной церемонии: `/caveman` — только если scale bounded.

Не реализовывать, пока план не `approved` и нет явного «делай» / CLI `--approve`.

---

## Quality (QA)

Плагин Claude: [Quality](/ru/plugins/quality). Не путать с HTTP-сервисом ревью.

```bash
make quality-up
make qa WP=PRX-12 REPO=/path/to/product
```

В чат:

```
Начни сессию QA (/session-start).
WP PRX-12 уже claimed / ready-for-qa.
Проверь локально (/verify-work-package): build/test/coverage из .project.
Исходники продукта не меняй.
```

Команды берутся только из `.project` → `quality:`. Тестовые записи на диск — только если `PRAXIS_QA_ALLOW_TEST_WRITES=1` и вы утвердили список файлов.

---

## Чеклист «получилось»

| Роль | Признак успеха |
|------|----------------|
| BA | Proposal/Stories согласованы; есть BA→Architect handoff (Jira property или `wp/…/handoffs/ba-architect.handoff.json`) |
| Architect | Есть WP в Jira **или** `design/<WP>/architect-developer.handoff.json` |
| Developer | `praxis.claim` ваш; план approved; arbiter зелёный; `design/<WP>/dev/quality-handoff.json` |
| QA | Отчёт `.praxis-jira/quality/<WP>.md` или запись ревью в quality-service |

Общего чата между ролями нет: следующий человек читает **git + Jira**, не вашу сессию.
