# How roles work together

New to Praxis? Start with **[Getting started](/guide/start)** (clone, packages, Claude Code). What to type per role: **[Working in a session](/guide/sessions)**.

Praxis splits delivery into four roles. Each role owns a different artifact set. They do **not** share an internal API. They exchange **versioned JSON handoffs** plus markdown packages on disk.

```
BA (canon)  --ba.architect.handoff-->  Architect
Architect   --architect.developer.handoff + change-spec.json-->  Developer
Developer   --developer.quality.handoff-->  Quality service
```

| Role | Package | What it owns | What it emits |
|------|---------|--------------|---------------|
| BA | `@praxis/ba` | Requirements canon (markdown + git) | `wp/<WP>/handoffs/ba-architect.handoff.json` |
| Architect | `@praxis/architect` | Decisions, design package, change-spec | `design/<WP>/architect-developer.handoff.json` |
| Developer | `@praxis/developer` | Plan, code changes, verification | `design/<WP>/dev/quality-handoff.json` |
| Quality | `@praxis/quality-service` | Reviews, audits, metrics (SQLite) | Persisted review records |

## Who talks to whom

1. **BA** confirms vision and a work-package plan, then emits a BA→Architect handoff. Architect never reads the whole canon by convention — it consumes the handoff plus the WP path named in it.
2. **Architect** accepts only if `visionConfirmed` is true and readiness checks pass. It writes a design folder and a machine `change-spec.json`, then emits Architect→Developer.
3. **Developer** accepts the design package, requires a **human/CLI approve** gate, applies the change-spec, runs final-arbiter (build/test/lint), then emits Developer→Quality.
4. **Quality** reviews a path or an MR **context**. It validates the Developer handoff schema and verification readiness. It does not invent acceptance criteria — it uses `acceptanceChecks` from the handoff when present.

Roles never import each other. Shared types live in `@praxis/contracts`. Shared project settings live in `@praxis/project-config` (`.project`). Shared norms live in `@praxis/knowledge`.

## Session vs CLI

In **Claude Code**, skills under `plugins/<role>/skills/` drive the interview and file authorship. Irreversible steps still go through CLI gates (`praxis-ba wp approve-plan`, Architect emit, Developer `--approve`).

In **CI / e2e**, the same CLIs run without the chat UI. That is the proven machine path (`npm run accept:handoff-chain`, `npm run smoke`).

## What this pipeline does not include

- Live Jira writes
- Live GitLab/GitHub merge-request creation (Developer can **preview** an MR payload)
- Public marketplace publish / DNS / TLS
