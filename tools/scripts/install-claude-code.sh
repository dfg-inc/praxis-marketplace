#!/usr/bin/env bash
# Isolated Claude Code install check. Does not read or write ~/.claude.
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
config=${PRAXIS_CLAUDE_CONFIG_DIR:-$(mktemp -d "${TMPDIR:-/tmp}/praxis-claude.XXXXXX")}
export CLAUDE_CONFIG_DIR="$config"
manifest="$root/.claude-plugin/marketplace.json"
status=PASS

say() { printf '%s\n' "$1"; }

if ! command -v node >/dev/null 2>&1; then
  say "FAIL node is not installed"
  exit 1
fi
if ! command -v claude >/dev/null 2>&1; then
  say "BLOCKED claude is not on PATH"
  exit 2
fi

version=$(claude --version 2>/dev/null || true)
say "claude: ${version:-unknown}"
node -e '
const fs = require("fs");
const doc = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
const names = new Set(["praxis-runtime", "praxis-ba", "praxis-architect", "praxis-developer", "praxis-quality"]);
if (doc.name !== "praxis" || !Array.isArray(doc.plugins)) process.exit(1);
const got = new Set(doc.plugins.map((plugin) => plugin.name));
for (const name of names) if (!got.has(name)) process.exit(1);
for (const plugin of doc.plugins) {
  if (plugin.name === "praxis-core" || /simpleone/i.test(plugin.name)) process.exit(1);
  if (!plugin.source || !plugin.description) process.exit(1);
}
' "$manifest" || status=FAIL

# Refuse sibling-escaping symlinks
if find "$root/plugins" -maxdepth 1 -type l 2>/dev/null | grep -q .; then
  say "FAIL marketplace plugins still use symlinks; run node tools/scripts/stage-portable-plugins.mjs"
  exit 1
fi

if [ "$status" = PASS ]; then
  say "PASS marketplace manifest"
else
  say "FAIL marketplace manifest"
  exit 1
fi

if claude plugin validate "$root" >/tmp/praxis-marketplace-validate.log 2>&1; then
  say "PASS claude plugin validate"
else
  say "FAIL claude plugin validate"
  exit 1
fi

if claude plugin marketplace add "$root" --scope user >/tmp/praxis-marketplace-add.log 2>&1; then
  say "PASS marketplace add in $CLAUDE_CONFIG_DIR"
else
  say "BLOCKED marketplace add"
  say "config dir: $CLAUDE_CONFIG_DIR"
  exit 2
fi

for name in praxis-runtime praxis-ba praxis-architect praxis-developer praxis-quality; do
  if claude plugin install "${name}@praxis" --scope user >/tmp/praxis-install-${name}.log 2>&1; then
    say "PASS install ${name}"
  else
    say "FAIL install ${name}"
    status=FAIL
  fi
done
if [ "$status" != PASS ]; then
  exit 1
fi

say "config dir: $CLAUDE_CONFIG_DIR"
say "PASS isolated install check"
