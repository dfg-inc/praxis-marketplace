# С чего начать

Страница для человека, который **никогда** не открывал Praxis: что поставить, чего **нет** в публичном npm, как включить плагины и как работать каждый день.

Два честных пути:

| Путь | Для кого | Когда «получилось» |
|------|----------|-------------------|
| **A — этот репозиторий** | Склонировали Praxis и хотите, чтобы оно собралось | Проходит `npm run smoke`; открывается сайт доков |
| **B — Claude Code на продукте** | BA / архитектор / разработчик в боевом репо | В Claude Code видны скиллы; session-start печатает `.project` |

**Нельзя** сегодня сделать `npm install -g praxis-ba`. Пакеты `@praxis/*` живут в этом монорепозитории (**npm workspaces**). Пока их нет на публичном npm registry, установка всегда `npm install` **внутри git-клона**.

Отдельные репозитории `praxis-ba.git` / `praxis-developer.git` не обязательны. Для постороннего человека нормальный путь: **клонировать этот монорепозиторий** (GitHub, когда он станет публичным; до этого — GitLab) и указать Claude Code на `plugins/`.

---

## Исходники и лицензия

| Что | Лицензия | Уйдёт на публичный GitHub? |
|-----|----------|----------------------------|
| praxis-ba, praxis-architect, praxis-developer | Apache-2.0 | **Да** — это открытый продукт |
| Общие contracts / SDK / knowledge этих плагинов | Apache-2.0, если так указано в пакете | Да, тем же деревом |
| Quality, плагин Jira | UNLICENSED | **Нет** — внутренний контур; для ролевого конвейера их можно не трогать |

**Сейчас:** канонический клон — GitLab (нужен доступ).

**После выкладки на GitHub:** клонируйте публичный репозиторий. Дальше эта страница не меняется — те же `npm install`, те же `plugins/`, те же `directory`-marketplace в Claude Code. URL подставим, когда репозиторий появится; выдумывать `org/repo` не нужно.

---

## Что нужно

- **Git**
- **Node.js ≥ 20** (в CI/Docker — 22) и штатный **npm**
- По желанию: **Docker** (тот же verify, что в CI; контейнер Quality)
- Для пути B: **Claude Code** (это плагины Claude Code, не расширения VS Code)
- **Сейчас:** доступ к проекту в GitLab. **После GitHub:** не нужен — дерево Apache-2.0 будет публичным

Клон (GitLab, текущий origin):

```bash
git clone git@gl.jetru.by:engineering/ai-tooling/Praxis-mono.git praxis
cd praxis
```

HTTPS — URL того же проекта из GitLab. После open-source cutover: `git clone https://github.com/<org>/<repo>.git` со страницы GitHub — затем `cd` и Путь A.

---

## Путь A — поставить монорепозиторий (пакеты)

Из корня репозитория:

```bash
# 1. Шаблон env. Jira можно не заполнять — smoke её не вызывает.
cp .env.example .env

# 2. Ставит все workspace-пакеты (плагины, контракты, Quality, доки, …)
npm install

# 3. Сборка TypeScript (@praxis/contracts, plugin-sdk, …)
npm run build
```

Это и есть «поставить пакеты». Workspaces линкуются локально через `"*"` в `package.json`. npm **не** качает `@praxis/ba` с публичного registry, пока не будет отдельной публикации в npm (сам по себе GitHub это не делает).

Проверка машинного конвейера (BA → Architect → Developer → Quality) на учебном приложении:

```bash
npm run smoke
```

Полный гейт (долго): `npm run verify`. То же в Docker:

```bash
docker compose build workspace
docker compose run --rm workspace npm run verify
```

Этот сайт документации:

```bash
npm run dev -w @praxis/marketplace-site
# http://localhost:5173  — английский /, русский /ru/
```

После установки:

| Путь | Что это |
|------|---------|
| `plugins/ba` | Плагин BA + CLI canon-graph |
| `plugins/architect` | Плагин архитектора |
| `plugins/developer` | Плагин разработчика |
| `apps/quality-service` | Quality HTTP/CLI (не публичный плагин) |
| `packages/*` | Контракты, парсер `.project`, knowledge, SDK |
| `samples/mini-counter` | Учебный продукт для smoke |

Для install / build / smoke / ролевого конвейера **Jira не нужна**.

---

## Путь B — работа человеком (Claude Code)

Роли Praxis живут **в чате**, скиллами. CLI — это гейты и CI. Новому BA не нужно начинать с `run-work-package`.

### 1. Файл `.project` в **продуктовом** репозитории

Продукт — репозиторий, который вы меняете (ваш сервис), не обязательно сам Praxis. Скопируйте шаблон из монорепозитория:

```bash
cp /path/to/praxis/.project.example /path/to/your-product/.project
```

Заполните `stack`, `requirementsFormat`, при наличии корпуса — `knowledge.path`. Токены в этот файл не кладут.

Если `.project` нет, session-start идёт на дефолтах и перечисляет незаданное — вы подтверждаете и продолжаете.

### 2. Включить три ролевых плагина (локальные папки)

Git-URL отдельных marketplace-репозиториев может ещё не существовать. Используйте склонированные каталоги плагинов.

В **продуктовом** репо (или в пользовательских настройках Claude) — `.claude/settings.json` или `.claude/settings.local.json`:

```json
{
  "extraKnownMarketplaces": {
    "praxis-ba": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/ba"
      }
    },
    "praxis-architect": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/architect"
      }
    },
    "praxis-developer": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/developer"
      }
    }
  },
  "enabledPlugins": {
    "praxis-ba@praxis-ba": true,
    "praxis-architect@praxis-architect": true,
    "praxis-developer@praxis-developer": true
  }
}
```

`/ABS/PATH/praxis` замените на реальный путь клону. Можно включить только свою роль (только BA — нормально).

Дальше в Claude Code:

1. Перезапустите сессию (или reload плагинов).
2. `/plugin marketplace list` — три marketplace Praxis.
3. `/plugin list` — `praxis-ba@praxis-ba` (и остальные) **enabled**.

Если вы разрабатываете сам Praxis — откройте монорепозиторий в Claude Code и включите те же папки.

Quality в Claude включается как `plugins/quality` (`make qa`). HTTP-сервис — отдельно. См. [Quality](/ru/plugins/quality) и [работу в сессии](/ru/guide/sessions).

### 3. Первая сессия (что писать в чат)

Рабочая директория Claude Code — **продуктовый** репозиторий.

Готовые тексты, каталог скиллов и **как забрать Jira WP**: **[работа в сессии](/ru/guide/sessions)**. Кратко по ролям:

**Аналитик**

1. Попросите начать сессию BA (скилл `session-start`) — должны увидеть версию плагина, `.project`, knowledge вкл/выкл.
2. С Jira: `/jira-analyze-epic` по ключу эпика. Без Jira: зафиксируйте запрос словами клиента (`capture-cr`).
3. Grill и план impact set (`grill-cr` / `ba-plan-slice`), затем confirm тем CLI, который назовёт скилл (`praxis-ba cr confirm …`).
4. Требования, work package, approve плана — это **пишет** `wp/<WP>/handoffs/ba-architect.handoff.json` для архитектора.

CLI канона из монорепозитория (после `npm install`):

```bash
node /ABS/PATH/praxis/plugins/ba/canon-graph/bin/praxis-ba.mjs status --repo /path/to/canon
```

Canon — дерево требований (`canon/` или как у вас заведено), не всегда корень продукта.

**Архитектор**

1. Session-start роли architect.
2. Intake BA-handoff (`intake-audit` / только если vision и readiness прошли).
3. Решения, design-пакет, `change-spec.json`.
4. Эмит `design/<WP>/architect-developer.handoff.json`.

**Разработчик**

1. Session-start роли developer. С Jira: сразу ключ WP, затем `/claim-work-package` (чужой claim не перебивать).
2. Принять design-пакет, исследование, план.
3. **Не реализовывать, пока человек не утвердил** (CLI `--approve` или гейт скилла).
4. Реализация + final-arbiter; после зелёного появляется `design/<WP>/dev/quality-handoff.json`.

**Quality**

В терминале (монорепозиторий уже установлен):

```bash
node /ABS/PATH/praxis/apps/quality-service/bin/praxis-quality.mjs review-path \
  --path /path/to/your-product \
  --handoff /path/to/design/<WP>/dev/quality-handoff.json \
  --project my-product
```

Либо HTTP на порту 8787 — [Quality](/ru/plugins/quality).

---

## Как четыре роли передают работу

Общего чата нет. Общие **файлы в git**:

1. BA коммитит канон + `ba-architect.handoff.json`
2. Архитектор коммитит `design/<WP>/` + handoff разработчику
3. Разработчик коммитит код продукта + `quality-handoff.json`
4. Quality пишет ревью в SQLite (сервис), не в дерево плагина

Дальше: [как связаны роли](/ru/guide/), [общий контекст](/ru/guide/context), [JSON handoff](/ru/guide/handoffs).

Только машина, без Claude, включая `npm run smoke`: [запуск и проверка](/ru/guide/run).

---

## Типичные ошибки

| Ошибка | Как надо |
|--------|----------|
| `npm install @praxis/ba` с публичного registry | `npm install` **внутри клона монорепозитория** (сначала git; публикация в npm — отдельный шаг) |
| Ждать GitHub, ничего не пробуя | Сейчас клонируйте GitLab; когда появится публичный репо — GitHub; команды те же |
| Git-marketplace, которого ещё нет | `directory` + `plugins/<role>` как выше |
| Токены Jira в `.project` | Только `.env` / `PRAXIS_JIRA_*` |
| Реализация Developer без approve | `--approve` / человеческий гейт |
| Quality как плагин Claude | `praxis-quality` или `docker compose up quality-service` |
| «Успех» live web/Jira/MR без учёток | Это внешние шаги; локальному конвейеру они не нужны |
