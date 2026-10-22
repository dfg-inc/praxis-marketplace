# Praxis Marketplace — local release-candidate check (not published)

## Requirements

- Claude Code `>=2.1.278`
- Node `>=20`
- Local RC built with clean Git trees: `node tools/scripts/build-release-candidate.mjs`

## Isolated install (does not touch `~/.claude`)

```bash
cd /path/to/praxis-marketplace
export CLAUDE_CONFIG_DIR=$(mktemp -d /tmp/praxis-beta.XXXXXX)
export PRAXIS_CLAUDE_CONFIG_DIR="$CLAUDE_CONFIG_DIR"
bash tools/scripts/install-claude-code.sh
# or full clean copy:
# bash tools/scripts/clean-checkout-install.sh
```

Expected: runtime + four role plugins (and the `praxis` bundle) install; Runtime MCP reports **52** tools. The same is checked automatically by `npm run accept:marketplace-install` in praxis-runtime.

## Diagnostics

```bash
claude --version
claude plugin validate "$PWD"   # or release-candidate/
claude plugin details praxis-runtime@praxis
```

If MCP fails to start, check `server/praxis-mcp.cjs` under `$CLAUDE_CONFIG_DIR/plugins/cache` and stderr for `[praxis-mcp] ready`.

## After a Core change

Rebuild Core contracts, re-vendor Runtime if it vendors Core, then rebuild the RC. Do not reuse stale RC binaries from an older commit (`dirtySources` must be empty).

## Feedback template

- Host OS / Claude Code version:
- Install PASS/FAIL:
- Tool count observed:
- Skill that failed (name + prompt):
- Approval mode shown by praxis_doctor (client-ui / no-dialog / trusted-client):
- Logs attached (no secrets):

## Not in this beta package

- SimpleOne as an installable product
- Production Jira/SimpleOne writes
- Published Marketplace registry packages
