# Plugins

Praxis ships **Claude Code role plugins** plus a separate Quality service.

| Component | Package | License | Docs |
|-----------|---------|---------|------|
| praxis-ba | `@praxis/ba` | Apache-2.0 | [BA](/plugins/ba) |
| praxis-architect | `@praxis/architect` | Apache-2.0 | [Architect](/plugins/architect) |
| praxis-developer | `@praxis/developer` | Apache-2.0 | [Developer](/plugins/developer) |
| praxis-quality | `@praxis/quality-service` | UNLICENSED | [Quality](/plugins/quality) |

Company-only **Jira** (`@praxis/jira`, UNLICENSED) is not a public role plugin and is not required for the BA→Architect→Developer→Quality chain.

## Install (Claude Code)

Step-by-step (clone, `npm install`, local plugin folders, first chat): **[Getting started](/guide/start)**.

Role plugins (**praxis-ba**, **praxis-architect**, **praxis-developer**) are **Apache-2.0** and are the GitHub / open-source lineup. Company infra (**Quality**, **Jira**) stays UNLICENSED and is not in that lineup.

Packages are **not** on the public npm registry yet. Install is `npm install` in a git clone ([Getting started](/guide/start)). Point Claude Code at `plugins/ba`, `plugins/architect`, `plugins/developer`.

Pipeline: [how roles work together](/guide/). Machine CLI: [Run and verify](/guide/run).
