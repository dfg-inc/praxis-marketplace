# Praxis Marketplace

The Claude plugin marketplace for Praxis. This repository only distributes the installable plugins: `.claude-plugin/marketplace.json` and `plugins/`. The Praxis website and documentation live in the `praxis-website` repository (praxis.dfuture.co).

## Install

In Claude: **Customize → Plugins → Add → Add marketplace** → `dfg-inc/praxis-marketplace` → **Praxis** → **Add**.

**Praxis** installs its dependencies automatically: Praxis Runtime (the local MCP server) and the BA, Architect, Developer and Quality roles. To install one role, add that role alone; it brings the Runtime.

Terminal alternative for developers:

```bash
claude plugin marketplace add dfg-inc/praxis-marketplace
```

```bash
claude plugin install praxis@praxis
```

## Plugins

| Plugin | What it is |
|---|---|
| `praxis` | The complete set: dependencies on the five plugins below plus a getting-started skill |
| `praxis-runtime` | Local MCP server (`praxis_*` tools); installed with any role |
| `praxis-ba` | Requirements and User Stories (includes the self-contained `bin/praxis-ba.cjs` validator CLI) |
| `praxis-architect` | Architecture and decisions |
| `praxis-developer` | Implementation and Git delivery |
| `praxis-quality` | Verification and fixes |

## Which client gets what

| Client | Skills | Local Runtime |
|---|---|---|
| Claude Code CLI, Desktop Code, Cowork | yes | yes (the `praxis-runtime` plugin) |
| Claude Desktop Chat | may be available | **not** from a plugin: install `praxis-runtime.mcpb` from the praxis-runtime GitHub Release |
| Claude Web Chat | skills only | none |

A plugin's local MCP server is not automatically a tool in ordinary Chat. There is no remote Praxis service.

Release notes: [RELEASE-NOTES-0.1.0-alpha.49.md](RELEASE-NOTES-0.1.0-alpha.49.md).

## Maintainers

`plugins/` holds real, installable builds (no symlinks, no links to source repositories): the role plugins are staged from the sibling product repositories together with their generated outputs (BA `canon-graph/dist` and the bundled `bin/praxis-ba.cjs`, `tools/session-bootstrap.cjs` of every role, the Runtime bundle).

```bash
npm ci
npm run stage              # copy and bundle from the sibling repositories (needs them built)
npm run verify             # manifest consistency, generated outputs, release-candidate tests
```

- `check:marketplace`: manifest, versions, dependencies, a single MCP server, no secrets or developer paths.
- `check:outputs`: every file under `plugins/` is tracked, the BA CLI and every `session-bootstrap.cjs` run with no `node_modules`, the Runtime bundle starts, and every `${CLAUDE_PLUGIN_ROOT}/…` path in a skill resolves.
- The clean-install, dependency and update acceptance (`accept:marketplace-install`) lives in the praxis-runtime repository because it drives the Runtime over MCP.

Never store tokens in this repository.

## License

Apache License 2.0 (SPDX: `Apache-2.0`). See [LICENSE](LICENSE) and [NOTICE](NOTICE). Plugins that bundle third-party code carry a `THIRD-PARTY-NOTICES.md` with those licences.
