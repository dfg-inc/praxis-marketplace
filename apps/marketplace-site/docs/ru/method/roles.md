# Роли

| Роль | Компонент | Фокус | Стадия (bootstrap сессии) |
|------|-----------|-------|---------------------------|
| BA | [praxis-ba](/ru/plugins/ba) | Канон требований, work packages | `research` |
| Architect | [praxis-architect](/ru/plugins/architect) | Решения, design-пакеты, NFR | `plan` |
| Developer | [praxis-developer](/ru/plugins/developer) | План, реализация, проверка, намерение MR | `implement` |
| Quality | [quality-service](/ru/plugins/quality) | Ревью, аудиты, метрики | после верификации Developer |

Jira — корпоративная инфраструктура (UNLICENSED), не публичный ролевой плагин.

Человеческие гейты стоят на необратимых шагах: confirm vision, approve плана WP, council/решения архитектора, Developer claim и `--approve`. Quality эти гейты не заменяет.

Как вызывать скиллы в чате: [работа в сессии](/ru/guide/sessions).
