# Quality

Ревью, аудиты и метрики для работы, которая уже прошла верификацию Developer.

**Лицензия:** UNLICENSED (внутренний контур) · **Пакет:** `@praxis/quality-service` · **Путь:** `apps/quality-service`  
Это **не** Apache-плагин Claude и не позиция публичного каталога ([каталог](/catalog/)).

## Как работает

Quality принимает `developer.quality.handoff` (и опционально `quality.mr.context`):

1. Валидирует handoff через `@praxis/contracts`
2. Требует, чтобы обязательные verification-проверки были `passed`
3. Делает path-review (discovery, acceptance, опциональный повтор npm test) или review по контексту MR
4. Пишет SQLite (`reviews`, `audits`, `rollback_events`, `return_events`, `task_completions`)

HTTP path-review требует `PRAXIS_QUALITY_ALLOWED_ROOT`; запрошенный путь должен оставаться внутри этого корня.

## Запуск

```bash
node apps/quality-service/bin/praxis-quality.mjs review-path \
  --path <product-repo> \
  --handoff design/<WP>/dev/quality-handoff.json \
  --project demo

node apps/quality-service/bin/praxis-quality.mjs review-mr --context mr-context.json
node apps/quality-service/bin/praxis-quality.mjs review-mr-preview \
  --provider gitlab --project group/repo --mr 12
node apps/quality-service/bin/praxis-quality.mjs metrics --project demo

export PRAXIS_QUALITY_ALLOWED_ROOT="$(pwd)"
export PRAXIS_QUALITY_DB=.praxis-quality/quality.sqlite
export PORT=8787
npm run start -w @praxis/quality-service
curl -s http://127.0.0.1:8787/health
```

| Метод | Путь | Назначение |
|-------|------|------------|
| `GET` | `/health` | Liveness |
| `GET` | `/metrics?project=` | Метрики |
| `POST` | `/reviews/path` | Path-review + persist |
| `GET` | `/reviews/:id` | Сохранённое ревью |

Тело `POST /reviews/path`: `{ "projectId", "path", "handoff" }`. Ошибки контракта → 4xx. Завершённое падающее ревью → **200** с `verdict: "fail"`.

## Docker

```bash
docker compose up --build quality-service
```

Хост `${PRAXIS_QUALITY_HOST_ROOT:-.}` → `/work`, `PRAXIS_QUALITY_ALLOWED_ROOT=/work`, БД на томе `quality-data`, порт **8787**.

Если daemon недоступен — Node CLI/HTTP. Статическая проверка compose/Dockerfile: `npm run verify:docker`.

## Скилл

Локально у приложения (не публичный плагин): `apps/quality-service/skills/propose-rule-from-findings`.
