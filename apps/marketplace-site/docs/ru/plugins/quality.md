# Quality

Ревью, аудиты и метрики для работы, которая уже прошла верификацию Developer.

Две части:

| Что | Путь | Как запускать |
|-----|------|----------------|
| Плагин Claude **praxis-quality** | `plugins/quality` | `make qa WP=PRX-12 REPO=…` |
| HTTP/CLI **quality-service** | `apps/quality-service` | `docker compose up quality-service` или `praxis-quality.mjs` |

**Лицензия:** UNLICENSED (внутренний контур). Не Apache-плагин публичного каталога ([каталог](/catalog/)).

Готовые фразы: **[работа в сессии](/ru/guide/sessions)**.

## Сессия QA (Claude)

```bash
make quality-up
make qa WP=PRX-12 REPO=/path/to/product
```

```
/session-start
WP PRX-12. Проверь локально (/verify-work-package).
Исходники продукта не меняй.
```

Команды install/build/test/coverage/start — только из `.project` → `quality:`. Тестовые записи на диск — `PRAXIS_QA_ALLOW_TEST_WRITES=1` и ваш список файлов.

### Скиллы плагина

| Скилл | Когда | Что получается |
|-------|-------|----------------|
| `session-start` | Старт | `.project`, knowledge, роль `qa` / стадия `quality`. Дальше ждёт ключ WP |
| `verify-work-package` | WP claimed / ready-for-qa | Локальный прогон + отчёт `.praxis-jira/quality/<WP>.md` |

Не выдумывать данные Jira. Canonical tickets only.

Машинный отчёт без чата: `make quality-report WP=PRX-12` (после verify).

## Сервис ревью (HTTP/CLI)

Quality-service принимает `developer.quality.handoff` (и опционально `quality.mr.context`):

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

## Скилл сервиса

Локально у приложения (не публичный плагин): `apps/quality-service/skills/propose-rule-from-findings`.
