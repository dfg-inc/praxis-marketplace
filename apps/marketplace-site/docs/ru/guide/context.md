# Общий контекст

Каждая ролевая сессия стартует от **корня продуктового репозитория**, а не от памяти чата.

## `.project`

Необязательный YAML/JSON в корне: `.project`, `.project.yaml` или `.project.yml`. Шаблон: `.project.example`.

```yaml
stack:
  - node
requirementsFormat: user-story-gherkin
requiredArtifacts: []
environments:
  - local
knowledge:
  path: packages/knowledge/dataset
  ref: main
  # product: demo
  # service: api
jira:
  # baseUrl: https://jira.example.com
  # projectKey: SMOKE
```

Разбор: `@praxis/project-config`. Если файла нет, работа идёт на значениях по умолчанию, сессия перечисляет незаданные параметры. Секреты сюда не кладут — токен Jira только в окружении (`PRAXIS_JIRA_TOKEN`).

| Поле | Зачем |
|------|-------|
| `stack` | Правила стека у Developer |
| `requirementsFormat` | Формат требований у BA |
| `requiredArtifacts` | Напоминание об обязательных файлах |
| `environments` | Имена окружений (параметр, не runtime-switch) |
| `knowledge.*` | Срез правил company/product/service |
| `jira.*` | Опциональные URL/ключ, без токена |

## Knowledge

Раскладка `packages/knowledge/dataset/`:

`company | product/<id> | service/<id> / {rules,precedents}`

Bootstrap грузит срез **роль ∩ стадия**. Если `knowledge.path` не задан, knowledge **пропускается** — путь выдумывать нельзя.

## Старт сессии

У каждого Apache-плагина есть `skills/session-start` и bootstrap:

```bash
node plugins/ba/tools/session-bootstrap.mjs .
node plugins/architect/tools/session-bootstrap.mjs .
node plugins/developer/tools/session-bootstrap.mjs .
```

`@praxis/plugin-sdk.bootstrapSession()` печатает `.project`, применимые нормы и **проверку версии**. Устаревший, но совместимый плагин предупреждает и продолжает; **major**-разрыв канона останавливает работу.

Стадии по умолчанию: BA `research`, Architect `plan`, Developer `implement`.

## Что само не шарится

- История чата между ролями
- SQLite Quality (локальный процесс / Docker volume)
- `design.root` из некоторых скиллов Architect — **не** поле схемы `.project`; выход задаётся `--out` / каталогом `design/<WP-ID>/`
