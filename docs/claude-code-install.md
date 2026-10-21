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

Protected writes (Git, Jira, confirming a Story) are approved by you: Praxis shows the exact action in the client's approval dialog and runs it only if you approve. A client without that dialog is reported by `praxis_doctor` (`approval.mode: no-dialog`) and protected actions are not executed there.
