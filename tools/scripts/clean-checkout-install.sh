#!/usr/bin/env bash
# Fresh checkout portability test: copy only praxis-marketplace contents.
# Does not modify ~/.claude when CLAUDE_CONFIG_DIR is set.
set -eu
src=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
stage=$(mktemp -d "${TMPDIR:-/tmp}/praxis-marketplace-clean.XXXXXX")
config=${PRAXIS_CLAUDE_CONFIG_DIR:-$(mktemp -d "${TMPDIR:-/tmp}/praxis-claude.XXXXXX")}
export CLAUDE_CONFIG_DIR="$config"

rsync -a --exclude node_modules --exclude .git "$src/" "$stage/"
# Fail if any plugin path is still a symlink escaping the stage
if find "$stage/plugins" -maxdepth 1 -type l | grep -q .; then
  echo "FAIL plugins still contain symlinks"
  exit 1
fi
python3 - <<PY
from pathlib import Path
root = Path("$stage")
for child in (root / "plugins").iterdir():
    if child.is_symlink():
        raise SystemExit(f"symlink {child}")
    target = child.resolve()
    if not str(target).startswith(str(root.resolve())):
        raise SystemExit(f"escape {child} -> {target}")
print("PASS no external symlink targets")
PY

claude plugin validate "$stage"
claude plugin marketplace add "$stage" --scope user
for name in praxis-runtime praxis-ba praxis-architect praxis-developer praxis-quality; do
  claude plugin install "${name}@praxis" --scope user
  echo "PASS install $name"
done

# Runtime MCP must exist in the installed cache and start
mcp=$(find "$CLAUDE_CONFIG_DIR/plugins/cache" -name praxis-mcp.cjs | head -1)
if [ -z "$mcp" ]; then
  echo "FAIL praxis-mcp.cjs not installed"
  exit 1
fi
node - <<'NODE' "$mcp"
import { spawn } from "node:child_process";
const bin = process.argv[2];
const child = spawn("node", [bin, "--role", "runtime"], { stdio: ["pipe", "pipe", "pipe"] });
let out = "", err = "";
child.stdout.on("data", (d) => (out += d));
child.stderr.on("data", (d) => (err += d));
child.stdin.write(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "t", version: "0" } },
}) + "\n");
setTimeout(() => {
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: 2, method: "tools/list", params: {} }) + "\n");
}, 200);
setTimeout(() => {
  child.kill("SIGTERM");
  if (!err.includes("[praxis-mcp] ready")) {
    console.error(err);
    process.exit(1);
  }
  const count = (out.match(/"name":"praxis_/g) || []).length;
  if (count < 10) {
    console.error("too few tools", count, out.slice(0, 300));
    process.exit(1);
  }
  console.log(`PASS runtime mcp tools=${count}`);
}, 900);
NODE

# Skills discovery
claude plugin details praxis-ba@praxis | head -20
claude plugin details praxis-runtime@praxis | head -20

echo "stage=$stage"
echo "config=$CLAUDE_CONFIG_DIR"
echo "PASS clean-checkout install"
