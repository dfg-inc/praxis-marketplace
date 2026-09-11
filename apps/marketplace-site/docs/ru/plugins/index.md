# Плагины

Praxis поставляет **ролевые плагины Claude Code** и отдельный сервис Quality.

| Компонент | Пакет | Лицензия | Документация |
|-----------|-------|----------|--------------|
| praxis-ba | `@praxis/ba` | Apache-2.0 | [BA](/ru/plugins/ba) |
| praxis-architect | `@praxis/architect` | Apache-2.0 | [Architect](/ru/plugins/architect) |
| praxis-developer | `@praxis/developer` | Apache-2.0 | [Developer](/ru/plugins/developer) |
| praxis-quality | `@praxis/quality-service` | UNLICENSED | [Quality](/ru/plugins/quality) |

Корпоративный **Jira** (`@praxis/jira`, UNLICENSED) не публичный ролевой плагин и не нужен для цепочки BA→Architect→Developer→Quality.

## Установка (Claude Code)

По шагам (клон, `npm install`, локальные папки плагинов, первый чат): **[С чего начать](/ru/guide/start)**.

Ролевые плагины (**praxis-ba**, **praxis-architect**, **praxis-developer**) — **Apache-2.0**, это линейка для GitHub / open source. Корпоративная инфраструктура (**Quality**, **Jira**) остаётся UNLICENSED и в эту линейку не входит.

Пакетов **ещё нет** на публичном npm. Установка — `npm install` в git-клоне ([с чего начать](/ru/guide/start)). Claude Code указывайте на `plugins/ba`, `plugins/architect`, `plugins/developer`.

Конвейер: [как роли связаны](/ru/guide/). Машинный CLI: [запуск](/ru/guide/run).
