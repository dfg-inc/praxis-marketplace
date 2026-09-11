# Roles

| Role | Component | Focus | Stage (session bootstrap) |
|------|-----------|-------|---------------------------|
| BA | [praxis-ba](/plugins/ba) | Requirements canon, work packages | `research` |
| Architect | [praxis-architect](/plugins/architect) | Decisions, design packages, NFR budgets | `plan` |
| Developer | [praxis-developer](/plugins/developer) | Plan, implement, verify, MR intention | `implement` |
| Quality | [quality-service](/plugins/quality) | Reviews, audits, metrics | after Developer verification |

Jira is company infra (UNLICENSED), not a public role plugin.

Human gates sit on irreversible choices: vision confirm, WP plan approve, architecture council/decisions, Developer `--approve`, Quality does not replace those gates.
