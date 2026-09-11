# Как роли связаны

Если вы здесь впервые — **[С чего начать](/ru/guide/start)** (клон, пакеты, Claude Code, первая сессия).

Praxis делит поставку на четыре роли. У каждой свой набор артефактов. Общего внутреннего API нет: обмен идёт **версионированными JSON-handoff** и markdown-пакетами на диске.

```
BA (canon)  --ba.architect.handoff-->  Architect
Architect   --architect.developer.handoff + change-spec.json-->  Developer
Developer   --developer.quality.handoff-->  Quality service
```

| Роль | Пакет | Что принадлежит роли | Что отдаёт дальше |
|------|-------|----------------------|-------------------|
| BA | `@praxis/ba` | Канон требований (markdown + git) | `wp/<WP>/handoffs/ba-architect.handoff.json` |
| Architect | `@praxis/architect` | Решения, design-пакет, change-spec | `design/<WP>/architect-developer.handoff.json` |
| Developer | `@praxis/developer` | План, правки кода, верификация | `design/<WP>/dev/quality-handoff.json` |
| Quality | `@praxis/quality-service` | Ревью, аудиты, метрики (SQLite) | Сохранённые записи ревью |

## Кто кому передаёт работу

1. **BA** подтверждает vision и план work package, затем пишет BA→Architect handoff. Архитектор по соглашению не читает весь канон — берёт handoff и путь WP из него.
2. **Architect** принимает пакет только если `visionConfirmed` и readiness-проверки прошли. Пишет каталог design и машинный `change-spec.json`, затем Architect→Developer.
3. **Developer** принимает design-пакет, проходит **гейт approve** (человек / `--approve`), применяет change-spec, гоняет final-arbiter (build/test/lint), затем Developer→Quality.
4. **Quality** ревьюит дерево или **контекст MR**. Валидирует схему Developer-handoff и готовность verification. Критерии приёмки не выдумывает: берёт `acceptanceChecks` из handoff, если они есть.

Роли не импортируют друг друга. Общие типы — `@praxis/contracts`. Настройки репозитория — `@praxis/project-config` (`.project`). Нормы — `@praxis/knowledge`.

## Сессия и CLI

В **Claude Code** скиллы в `plugins/<role>/skills/` ведут интервью и авторство файлов. Необратимые шаги всё равно идут через CLI (`praxis-ba wp approve-plan`, emit архитектора, Developer `--approve`).

В **CI / e2e** те же CLI без чата. Это доказанный машинный путь (`npm run accept:handoff-chain`, `npm run smoke`).

## Чего в конвейере нет

- Живые записи в Jira
- Живое создание MR в GitLab/GitHub (Developer умеет **preview** payload)
- Публикация marketplace / DNS / TLS
