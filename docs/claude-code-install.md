# Claude Code installation

This marketplace is for Claude Code. Classic Claude Desktop uses the Runtime MCPB bundle instead.

| Host | What to install |
| --- | --- |
| Claude Code CLI | Add this marketplace; install `praxis-runtime`, `praxis-ba`, `praxis-architect`, `praxis-developer`, `praxis-quality`. |
| Claude Code in VS Code | Same plugins in the VS Code Claude Code session. |
| Claude Desktop local Claude Code | Same plugins inside that local session. |
| Classic Claude Desktop | Runtime MCPB from `praxis-runtime/claude-extensions/`, not this marketplace manifest. |
| Linux | Claude Code CLI may exist without Desktop. |

## Portable staging

Plugin directories under `plugins/` must be real copies (not symlinks to sibling repos):

```bash
node tools/scripts/stage-portable-plugins.mjs
export CLAUDE_CONFIG_DIR="$(mktemp -d)"
bash tools/scripts/install-claude-code.sh
# or full clean-checkout proof:
bash tools/scripts/clean-checkout-install.sh
```

Praxis Core is not a plugin. SimpleOne is not advertised.

`praxis-runtime` exposes MCP tools via `.mcp.json` → `server/praxis-mcp.cjs --role runtime` (zero skills is intentional).

Default `PRAXIS_SECURITY_MODE` is secure. Protected writes require the isolated broker/executor.
