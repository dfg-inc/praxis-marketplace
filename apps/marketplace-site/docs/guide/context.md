# Shared context

Every role session starts from the **product repository root**, not from a chat-only memory.

## `.project`

Optional YAML/JSON at the repo root: `.project`, `.project.yaml`, or `.project.yml`. Template: `.project.example`.

```yaml
stack:
  - node
requirementsFormat: user-story-gherkin
requiredArtifacts: []
environments:
  - local
knowledge:
  path: packages/knowledge/dataset
  ref: main
  # product: demo
  # service: api
jira:
  # baseUrl: https://jira.example.com
  # projectKey: SMOKE
```

Parsed by `@praxis/project-config`. If the file is missing, work continues on defaults and the session lists unset parameters. Do not put secrets here — Jira tokens stay in the environment (`PRAXIS_JIRA_TOKEN`).

| Field | Used for |
|-------|----------|
| `stack` | Developer stack-rule loading |
| `requirementsFormat` | BA shaping (e.g. user story + Gherkin) |
| `requiredArtifacts` | Session reminder of expected files |
| `environments` | Named environments (parameter, not a runtime switch) |
| `knowledge.*` | Slice of company/product/service rules |
| `jira.*` | Optional URL/key overrides only |

## Knowledge corpus

Layout under `packages/knowledge/dataset/`:

`company | product/<id> | service/<id> / {rules,precedents}`

Session bootstrap loads the slice that matches **role ∩ stage**. If `knowledge.path` is unset, knowledge is **skipped** — plugins must not invent a path.

## Session start

Each Apache role plugin has `skills/session-start` and a bootstrap script:

```bash
node plugins/ba/tools/session-bootstrap.mjs .
node plugins/architect/tools/session-bootstrap.mjs .
node plugins/developer/tools/session-bootstrap.mjs .
```

`@praxis/plugin-sdk.bootstrapSession()` prints `.project` values, applicable norms, and a **version check**. Outdated-but-compatible plugins warn and continue; a canon **major** mismatch hard-stops.

Default stages: BA `research`, Architect `plan`, Developer `implement`.

## What is *not* shared automatically

- Chat history between roles
- Quality SQLite DB (local to the Quality process / Docker volume)
- Architect `design.root` mentioned in some skills — **not** a `.project` schema field today; design output path is a CLI `--out` / convention under `design/<WP-ID>/`
