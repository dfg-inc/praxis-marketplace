# praxis-developer

Роль разработчика: принять архитектурный пакет, утвердить план, реализовать, проверить, отдать Quality.

**Лицензия:** Apache-2.0 · **Пакет:** `@praxis/developer` · **Путь:** `plugins/developer`  
**Версия:** см. [каталог](/catalog/)  
**Установка:** [с чего начать](/ru/guide/start) — на публичном npm пакета нет.

## Как работает

1. `accept-work-package` — валидация `architect.developer.handoff` и каталога design. Неполный пакет → `status: returned`.
2. `research-codebase` / `create-plan` / `validate-plan` — план не исполняется до approve.
3. **Гейт:** CLI `--approve` или человеческий гейт скилла. Без него `run-work-package` не реализует.
4. Применение `change-spec.json` (edit/create), `final-arbiter` (build/test/lint), `repair-loop` при ошибке (с лимитом).
5. Эмит `developer.quality.handoff` только после readiness (`assertDeveloperReadyForQuality`).

Опционально: `mr-intention` и `mr-preview-remote` (preview payload GitLab/GitHub, без живого create без отдельного разрешения).

## Как реализовано

| Часть | Где |
|-------|-----|
| Скиллы | `plugins/developer/skills/` |
| Accept | `plugins/developer/tools/accept-work-package.mjs` |
| Реализация | `plugins/developer/tools/run-work-package.mjs` |
| Arbiter | `plugins/developer/tools/final-arbiter.mjs` |
| Governance / MR preview | `plugins/developer/tools/developer-governance.mjs` |
| Bootstrap | `plugins/developer/tools/session-bootstrap.mjs` |

**Скиллы:** `session-start`, `accept-work-package`, `research-codebase`, `load-stack-rules`, `classify-scale`, `create-plan`, `validate-plan`, `present-design-options`, `implement-plan`, `tdd`, `caveman`, `final-arbiter`, `repair-loop`, `plan-status`, `plan-archive`, `mr-intention`, `request-architecture-deviation`.

## Примеры CLI

```bash
node plugins/developer/tools/accept-work-package.mjs \
  --arch-handoff design/WP-001/architect-developer.handoff.json \
  --design-dir design/WP-001

node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff design/WP-001/architect-developer.handoff.json \
  --design-dir design/WP-001 --product <product-repo> --approve \
  --max-repairs 2

node plugins/developer/tools/final-arbiter.mjs --cwd <product-repo>

node plugins/developer/tools/developer-governance.mjs mr-preview-remote \
  --provider gitlab --project group/repo
```

Выход: `design/<WP>/dev/quality-handoff.json`. Дальше: [Quality](/ru/plugins/quality).
