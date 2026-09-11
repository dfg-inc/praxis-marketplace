# Changelog

## 0.1.0-alpha.20

- Bilingual VitePress docs (English default, Russian under `/ru/`): role pipeline, shared context, handoffs, BA / Architect / Developer / Quality
- Phase 1 readiness gate and remaining deterministic local gaps (see monorepo release notes)

## 0.1.0-alpha.19

- Standalone BA / Developer export (`npm run export:standalone`)
- Quality governance, Developer/Architect packed acceptance
- Catalog versions aligned with the monorepo release

## 0.1.0 — Phase 1 pre-rollout

- **praxis-ba** — canon-graph engine, handoff emit, rename complete
- **praxis-architect** — `build-architecture-package` (requires `--change-spec`)
- **praxis-developer** — `run-work-package` + final-arbiter + repair
- **praxis-quality** — `review-path`, metrics, fingerprint groups (local)
- Catalog + VitePress marketplace site production build
- Local release mirror: `npm run release:mirror` → `dist/release-mirror/`
- Realistic smoke: `samples/mini-counter` via `npm run smoke`

Domain/TLS and public mirror sync remain EXTERNAL.
