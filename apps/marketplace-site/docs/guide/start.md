# Getting started

> **Install from Claude:** Customize → Plugins → Add → Add marketplace → `dfg-inc/praxis-marketplace` → **Praxis** → Add. Praxis Runtime and the four roles install automatically (Claude Code, Desktop Code, Cowork). Claude Desktop **Chat** additionally needs `praxis-runtime.mcpb` from the Runtime release below.

**Ordinary users install Praxis in Claude Desktop.** You do not clone product source repos, run Make/npm, or export `PRAXIS_JIRA_*` for day-to-day work.

Canonical installation, credentials, role guides, the full tutorial, and the Prompt Library are the same Markdown files used by the VitePress documentation portal. Marketplace copies them at build time into [Desktop docs](/user-guide/).

1. [Install Praxis Runtime + role ZIPs](/user-guide/getting-started/installation)
2. [Jira credentials](/user-guide/getting-started/credentials)
3. [Independent role plugins](/user-guide/plugins/overview)
4. [Prompt library](/user-guide/reference/prompts)
5. [Full BA → Quality tutorial](/user-guide/workflows/full-e2e)
6. [Troubleshooting](/user-guide/reference/troubleshooting)

Download installable files from each product’s **GitHub Releases**:

| Product | Releases | Asset |
|---------|----------|-------|
| Runtime | [praxis-runtime](https://github.com/dfg-inc/praxis-runtime/releases) | `praxis-runtime.mcpb` |
| BA | [praxis-ba](https://github.com/dfg-inc/praxis-ba/releases) | `praxis-ba.zip` |
| Architect | [praxis-architect](https://github.com/dfg-inc/praxis-architect/releases) | `praxis-architect.zip` |
| Developer | [praxis-developer](https://github.com/dfg-inc/praxis-developer/releases) | `praxis-developer.zip` |
| Quality | [praxis-quality](https://github.com/dfg-inc/praxis-quality/releases) | `praxis-quality.zip` |

Do not use ephemeral CI job artifacts for ordinary installation. Stale alpha.29 hosted-plugin and custom MCP client instructions are **not** the product install path.

---

## Advanced: product source (developers / CI)

There is a second path if you **cloned a product repository** to hack on it:

| Path | Who it is for | What “success” looks like |
|------|----------------|---------------------------|
| **A — product git clone** | You develop that product | that repo’s `npm run verify` passes |
| **B — Claude Code on a product** | Plugin developers | Skills via `plugins/` directories |

You do **not** `npm install -g praxis-ba`. Core libraries ship as tracked `vendor/*.tgz` (optional GitLab npm Package Registry later).

Jira tokens still do not belong in `.project`. CLI/CI may use `PRAXIS_JIRA_*`. Desktop users should not.

Role plugins remain independently enableable. Quality HTTP worker ships inside Runtime MCPB.
