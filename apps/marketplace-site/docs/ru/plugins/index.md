# Плагины

Ставьте из marketplace (см. заметку выше), либо для Claude Desktop Chat установите **Praxis Runtime** один раз и затем только нужный role ZIP. Обычная установка — Claude Desktop / Cowork с GitHub Releases: [С чего начать](/ru/guide/start) и [Каталог](/catalog/).

| Компонент | Пакет | Лицензия | Документация | Releases |
|-----------|-------|----------|--------------|----------|
| praxis-ba | `@praxis/ba` | Apache-2.0 | [BA](/ru/plugins/ba) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-ba/releases/tag/v0.1.0-alpha.48) |
| praxis-architect | `@praxis/architect` | Apache-2.0 | [Architect](/ru/plugins/architect) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-architect/releases/tag/v0.1.0-alpha.48) |
| praxis-developer | `@praxis/developer` | Apache-2.0 | [Developer](/ru/plugins/developer) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-developer/releases/tag/v0.1.0-alpha.48) |
| praxis-quality | `@praxis/quality` | UNLICENSED | [Quality](/ru/plugins/quality) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-quality/releases/tag/v0.1.0-alpha.48) |

Runtime: [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-runtime/releases/tag/v0.1.0-alpha.48) (`praxis-runtime.mcpb`).

Корпоративный **Jira** (`@praxis/jira`, UNLICENSED) не публичный ролевой плагин.

## Установка (Claude Desktop)

1. Скачайте Runtime MCPB и нужные ZIP с Release-ссылок (или из [Каталога](/catalog/)).
2. Следуйте [Desktop installation](/user-guide/getting-started/installation).
3. Сессии: [работа в сессии](/ru/guide/sessions).

Не клонируйте Praxis-mono, не берите временные CI job artifacts и не ставьте роли с публичного npm через `npm install -g`.

## Advanced (исходники продукта / CI)

Если вы разрабатываете **репозиторий продукта**, используйте его `npm run verify` и при необходимости Claude Code directory plugins. Это путь для maintainers, не для обычных Desktop-пользователей. См. [запуск](/ru/guide/run).
