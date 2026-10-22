# С чего начать

> **Установка из Claude:** Customize → Plugins → Add → Add marketplace → `dfg-inc/praxis-marketplace` → **Praxis** → Add. Runtime и четыре роли ставятся автоматически (Claude Code, Desktop Code, Cowork). Для Claude Desktop **Chat** дополнительно нужен `praxis-runtime.mcpb` из релиза Runtime ниже.

**Обычная установка — Claude Desktop / Cowork.** Не клонируйте исходники продуктов и не экспортируйте `PRAXIS_JIRA_*`, если вы просто пользуетесь Praxis.

Канонические страницы Desktop (English user guide — тот же Markdown, что у VitePress):

1. [Installation](/user-guide/getting-started/installation)
2. [Jira credentials](/user-guide/getting-started/credentials)
3. [Role plugins](/user-guide/plugins/overview)
4. [Full tutorial](/user-guide/workflows/full-e2e)
5. [Troubleshooting](/user-guide/reference/troubleshooting)

Скачивайте файлы с **GitHub Releases** каждого продукта:

| Продукт | Releases | Файл |
|---------|----------|------|
| Runtime | [praxis-runtime](https://github.com/dfg-inc/praxis-runtime/releases) | `praxis-runtime.mcpb` |
| BA | [praxis-ba](https://github.com/dfg-inc/praxis-ba/releases) | `praxis-ba.zip` |
| Architect | [praxis-architect](https://github.com/dfg-inc/praxis-architect/releases) | `praxis-architect.zip` |
| Developer | [praxis-developer](https://github.com/dfg-inc/praxis-developer/releases) | `praxis-developer.zip` |
| Quality | [praxis-quality](https://github.com/dfg-inc/praxis-quality/releases) | `praxis-quality.zip` |

Не используйте временные CI job artifacts для обычной установки. Инструкции alpha.29 про `.mcp.json` устарели.

---

## Для разработчиков продуктов

Если вы **клонировали репозиторий продукта**: `npm ci` и `npm run verify` в этом репозитории. Это не путь для BA/разработчика продукта в Claude Desktop.

Токены Jira не хранят в `.project`. CLI может использовать `PRAXIS_JIRA_*`.
