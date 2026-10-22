# Installing Praxis from this marketplace

Primary path (no terminal): Claude → **Customize → Plugins → Add → Add marketplace** → `dfg-inc/praxis-marketplace` → **Praxis** → **Add**.

Developer path:

```bash
claude plugin marketplace add dfg-inc/praxis-marketplace
```

```bash
claude plugin install praxis@praxis
```

Single role (the Runtime is installed as its dependency): `claude plugin install praxis-ba@praxis` (or `praxis-architect`, `praxis-developer`, `praxis-quality`).

| Host | What you get |
| --- | --- |
| Claude Code CLI, Claude Code in VS Code | Skills and the local Runtime (`praxis-runtime` plugin) |
| Claude Desktop Code, Cowork | Same plugins (not separately verified) |
| Claude Desktop Chat | Skills may appear, but the local Runtime does **not** come from a plugin: install `praxis-runtime.mcpb` (Settings → Extensions) |
| Claude Web Chat | Skills only |

Verified with Claude Code 2.1.304 in a clean config directory and a git clone of this marketplace: `praxis` installs five dependencies, one role installs only `praxis-runtime`, exactly one MCP server runs, and 0.1.0-alpha.47 updates in place to alpha.48 (`npm run accept:marketplace-install` in praxis-runtime). The Claude UI flow itself is not yet verified.

## Portable staging (maintainers)

Plugin directories under `plugins/` are real copies of the role repositories' plugin folders, not symlinks:

```bash
node tools/scripts/stage-portable-plugins.mjs
```

Praxis Core is not a plugin. `praxis-runtime` exposes the MCP tools via `.mcp.json` → `server/praxis-mcp.cjs --role runtime`; it has no skills by design.

## Approvals

Protected writes are approved in the client's dialog (default). A client without one is refused with `APPROVAL_CLIENT_UI_REQUIRED`. Owners can opt in to **Trusted Client** explicitly (`PRAXIS_APPROVAL_MODE=trusted-client`, or the Approval mode extension setting). See the Praxis docs, "Approval Required and Trusted Client".
