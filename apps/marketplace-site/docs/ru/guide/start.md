# С чего начать

**Обычная установка — Claude Desktop / Cowork.** Не клонируйте монорепозиторий и не экспортируйте `PRAXIS_JIRA_*`, если вы просто пользуетесь Praxis.

Канонические страницы Desktop (English user guide — тот же Markdown, что у VitePress):

1. [Installation](/user-guide/getting-started/installation)
2. [Jira credentials](/user-guide/getting-started/credentials)
3. [Role plugins](/user-guide/plugins/overview)
4. [Full tutorial](/user-guide/workflows/full-e2e)
5. [Troubleshooting](/user-guide/reference/troubleshooting)

Файлы релиза: `claude-extensions/praxis-runtime.mcpb` и `claude-plugins/praxis-*.zip`. Инструкции alpha.29 про `.mcp.json` устарели.

---

## Для разработчиков Praxis (монорепозиторий)

Если вы **клонировали исходники** Praxis: `npm install`, `npm run build`, `npm run smoke`. Это не путь для BA/разработчика продукта в Claude Desktop.

Токены Jira не хранят в `.project`. CLI может использовать `PRAXIS_JIRA_*`.
