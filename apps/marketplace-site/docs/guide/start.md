# Getting started

**Ordinary users install Praxis in Claude Desktop.** You do not clone this monorepo, run Make/npm, or export `PRAXIS_JIRA_*` for day-to-day work.

Canonical installation, credentials, role guides, the full tutorial, and the Prompt Library are the same Markdown files used by the VitePress documentation portal. Marketplace copies them at build time into [Desktop docs](/user-guide/).

1. [Install Praxis Runtime + role ZIPs](/user-guide/getting-started/installation)
2. [Jira credentials](/user-guide/getting-started/credentials)
3. [Independent role plugins](/user-guide/plugins/overview)
4. [Prompt library](/user-guide/reference/prompts)
5. [Full BA → Quality tutorial](/user-guide/workflows/full-e2e)
6. [Troubleshooting](/user-guide/reference/troubleshooting)

Current distribution files (must exist in the release):

- `claude-extensions/praxis-runtime.mcpb`
- `claude-plugins/praxis-ba.zip`
- `claude-plugins/praxis-architect.zip`
- `claude-plugins/praxis-developer.zip`
- `claude-plugins/praxis-quality.zip`

Stale alpha.29 hosted-plugin and custom MCP client instructions are **not** the product install path.

---

## Advanced: this monorepo (developers / CI)

There is a second path if you **cloned Praxis** to hack on it:

| Path | Who it is for | What “success” looks like |
|------|----------------|---------------------------|
| **A — this repository** | You develop Praxis | `npm run smoke` passes; docs sites build |
| **B — Claude Code on a product** | Plugin developers | Skills via `plugins/` directories |

You do **not** `npm install -g praxis-ba`. Until packages are on the public npm registry, package install is `npm install` inside a git clone.

```bash
npm install
npm run build
npm run docs:dev
```

Jira tokens still do not belong in `.project`. CLI/CI may use `PRAXIS_JIRA_*`. Desktop users should not.

Role plugins remain independently enableable. Quality HTTP (`apps/quality-service`) is company infra.
