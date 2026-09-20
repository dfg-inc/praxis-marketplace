# С чего начать

**Обычная установка — Claude Desktop / Cowork.** Не клонируйте монорепозиторий и не экспортируйте `PRAXIS_JIRA_*`, если вы просто пользуетесь Praxis.

Канонические страницы (те же файлы, что у VitePress-портала):

1. [Установка](/user-guide/ru/getting-started/installation)
2. [Учётные данные Jira](/user-guide/ru/getting-started/credentials)
3. [Плагины ролей](/user-guide/ru/plugins/overview)
4. [Полный сценарий](/user-guide/ru/workflows/full-e2e)
5. [Диагностика](/user-guide/ru/reference/troubleshooting)

Файлы релиза: `claude-extensions/praxis-runtime.mcpb` и `claude-plugins/praxis-*.zip`. Инструкции alpha.29 про `.mcp.json` устарели.

---

## Для разработчиков Praxis (монорепозиторий)

Если вы **клонировали исходники** Praxis: `npm install`, `npm run build`, `npm run smoke`. Это не путь для BA/разработчика продукта в Claude Desktop.

Токены Jira не хранят в `.project`. CLI может использовать `PRAXIS_JIRA_*`.
