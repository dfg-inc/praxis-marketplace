# Запуск и проверка

Сначала пройдите [С чего начать](/ru/guide/start). Команды — из корня **монорепозитория** Praxis, после `npm install` и `npm run build`.

## Проверить, что стоит (первая команда)

```bash
npm run smoke
```

Прогон BA → Architect → Developer → Quality на `samples/mini-counter`. Без Jira и без живого git-хоста.

Длиннее: `npm run verify` (сборка, тесты, границы, accept-гейты, smoke, упаковка).

Docker (как CI; нужен daemon):

```bash
docker compose build workspace
docker compose run --rm workspace npm run verify
```

## Включение плагинов в Claude Code

Предпочтительны **локальные каталоги** из клона — [путь B](/ru/guide/start). Форма:

```json
{
  "extraKnownMarketplaces": {
    "praxis-ba": {
      "source": {
        "source": "directory",
        "path": "/ABS/PATH/praxis/plugins/ba"
      }
    }
  },
  "enabledPlugins": {
    "praxis-ba@praxis-ba": true
  }
}
```

Architect и Developer — то же с `plugins/architect` и `plugins/developer`.

**Будущий** git-marketplace (GitHub или GitLab) — только когда remote есть и вы пините **существующий** тег:

```json
{
  "extraKnownMarketplaces": {
    "praxis-ba": {
      "source": {
        "source": "url",
        "url": "git@gl.jetru.by:engineering/ai-tooling/praxis-ba.git",
        "ref": "v0.1.0-alpha.20"
      }
    }
  },
  "enabledPlugins": {
    "praxis-ba@praxis-ba": true
  }
}
```

Не копируйте `v1.0`, если такого тега нет. Проверка: `/plugin marketplace list`, `/plugin list`, перезапуск сессии.

## Машинный прогон (без чата)

Реальные canon / design / product — или smoke/e2e, без выдуманных id.

```bash
# 1. BA
node plugins/ba/canon-graph/bin/praxis-ba.mjs validate --repo <canon>
node plugins/ba/canon-graph/bin/praxis-ba.mjs wp approve-plan \
  --repo <canon> --wp <WP-ID> --plan wp/<WP-ID>/plan.md --json

# 2. Architect (нужен --change-spec)
node plugins/architect/tools/build-architecture-package.mjs \
  --ba-handoff wp/<WP-ID>/handoffs/ba-architect.handoff.json \
  --change-spec <change-spec.json> \
  --canon <canon> --out design --product <product>

# 3. Developer — реализация только с --approve
node plugins/developer/tools/accept-work-package.mjs \
  --arch-handoff design/<WP-ID>/architect-developer.handoff.json \
  --design-dir design/<WP-ID>
node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/<WP-ID>/architect-developer.handoff.json \
  --design-dir design/<WP-ID> --product <product> --approve

# 4. Quality
node apps/quality-service/bin/praxis-quality.mjs review-path \
  --path <product> --handoff design/<WP-ID>/dev/quality-handoff.json \
  --project demo
```

В упакованном BA есть `bin/praxis-ba.cjs`. В workspace: `plugins/ba/canon-graph/bin/praxis-ba.mjs`.

Ещё гейты: `npm run accept:handoff-chain`, `npm run pipeline -w @praxis/e2e`.

## Quality HTTP (опционально)

```bash
export PRAXIS_QUALITY_ALLOWED_ROOT="$(pwd)"
export PORT=8787
npm run start -w @praxis/quality-service
curl -s http://127.0.0.1:8787/health
```

```bash
docker compose up --build quality-service
```

## Этот сайт документации

```bash
npm run dev -w @praxis/marketplace-site
npm run build -w @praxis/marketplace-site
```

Английский — локаль по умолчанию, русский — `/ru/`.
