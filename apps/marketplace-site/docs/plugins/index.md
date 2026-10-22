# Plugins

Install from the marketplace (see the note above), or for Claude Desktop Chat install **Praxis Runtime** once and then only the role ZIP you need. Ordinary install is Claude Desktop / Cowork from GitHub Releases — see [Getting started](/guide/start) and the [Catalog](/catalog/).

| Component | Package | License | Docs | Releases |
|-----------|---------|---------|------|----------|
| praxis-ba | `@praxis/ba` | Apache-2.0 | [BA](/plugins/ba) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-ba/releases/tag/v0.1.0-alpha.48) |
| praxis-architect | `@praxis/architect` | Apache-2.0 | [Architect](/plugins/architect) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-architect/releases/tag/v0.1.0-alpha.48) |
| praxis-developer | `@praxis/developer` | Apache-2.0 | [Developer](/plugins/developer) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-developer/releases/tag/v0.1.0-alpha.48) |
| praxis-quality | `@praxis/quality` | UNLICENSED | [Quality](/plugins/quality) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-quality/releases/tag/v0.1.0-alpha.48) |

Runtime: [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-runtime/releases/tag/v0.1.0-alpha.48) (`praxis-runtime.mcpb`).

Company-only **Jira** (`@praxis/jira`, UNLICENSED) is not a public role plugin.

## Install (Claude Desktop)

1. Download Runtime MCPB + role ZIPs from the Release links above (or the [Catalog](/catalog/)).
2. Follow [Desktop installation](/user-guide/getting-started/installation).
3. Sessions and skills: [Working in a session](/guide/sessions).

Do **not** clone Praxis-mono, do not use temporary CI job artifacts, and do not `npm install -g` role packages from the public npm registry.

## Advanced (product source / CI)

If you develop a **product repository**, use that repo’s own `npm run verify` and optional Claude Code directory plugins. That path is for maintainers — not ordinary Desktop users. See [Run and verify](/guide/run).
