# Praxis Marketplace

The Claude plugin marketplace for Praxis (GitHub: `https://github.com/dfg-inc/praxis-marketplace`, marketplace name `praxis`).

## Install from Claude UI

1. **Customize → Plugins**
2. **Add → Add marketplace**
3. Enter `dfg-inc/praxis-marketplace`
4. Choose **Praxis** → **Add**

**Praxis** installs its dependencies: Praxis Runtime (the local MCP server), BA, Architect, Developer and Quality. To install one role, add that role's plugin alone; it brings the Runtime with it.

Developers can use the terminal instead:

```bash
claude plugin marketplace add dfg-inc/praxis-marketplace
```

```bash
claude plugin install praxis@praxis
```

## Plugins

| Plugin | What it is |
|---|---|
| `praxis` | The complete set: dependencies on the five plugins below, plus a getting-started skill |
| `praxis-runtime` | Local MCP server (`praxis_*` tools); installed automatically with any role |
| `praxis-ba` | Requirements and User Stories |
| `praxis-architect` | Architecture and decisions |
| `praxis-developer` | Implementation and Git delivery |
| `praxis-quality` | Verification and fixes |

## Which client gets what

| Client | Skills | Local Runtime |
|---|---|---|
| Claude Code CLI, Desktop Code, Cowork | yes | yes (the `praxis-runtime` plugin) |
| Claude Desktop Chat | may be available | **no** from a plugin: install `praxis-runtime.mcpb` (Settings → Extensions) |
| Claude Web Chat | skills only | none |

A plugin's local MCP server does not automatically become a tool in ordinary Chat. There is no remote Praxis service.

## Approvals

Protected actions (writes, Git, Jira, confirming a Story) use **Approval Required** by default: the client's dialog shows the exact action, and a client without a dialog is refused with `APPROVAL_CLIENT_UI_REQUIRED`. **Trusted Client** is an explicit opt-in for owners who run a client with "Always allow"; results are labelled `trusted-client`. See the Praxis docs.

## Release

Notes: [RELEASE-NOTES-0.1.0-alpha.48.md](RELEASE-NOTES-0.1.0-alpha.48.md). Install and release procedures: `docs/claude-code-install.md`, `docs/BETA-SETUP.md`.

## Maintainers

`plugins/` holds real copies of each role's plugin directory (no symlinks), staged from the sibling repositories:

```bash
node tools/scripts/stage-portable-plugins.mjs
node tools/scripts/build-release-candidate.mjs
node tools/scripts/verify-release-candidate.mjs
```

The marketplace site (`apps/`) is built by `npm run verify` and deployed by the repository's CI; its Markdown comes from `praxis-docs`. Never store tokens in this repository.
