# Praxis 0.1.0-alpha.48 — release notes

Release candidate prepared locally; **not yet published** (tags, GitHub Releases and the marketplace repository are created only after the owner confirms).

## Install in one step

Claude → **Customize → Plugins → Add → Add marketplace** → `dfg-inc/praxis-marketplace` → **Praxis** → **Add**.
Adding **Praxis** installs Praxis Runtime, BA, Architect, Developer and Quality. A single role can be added alone and brings the Runtime with it. Developers can use `claude plugin marketplace add dfg-inc/praxis-marketplace` and `claude plugin install praxis@praxis` instead.

## What is new

- **Marketplace-first distribution.** New bundle plugin `praxis` (`dependencies` on the five components). Role plugins declare their dependency on `praxis-runtime` in the marketplace entries, so a single role installs the Runtime automatically and exactly one MCP server runs.
- **Simpler approvals, no extra components.** One flow: Action → Preview → Approval → Execute → Result. No service, broker, system account, installer package or hardware key.
  - **Approval Required (default):** the client's own dialog shows the exact action; Approve runs exactly it; Reject/Cancel run nothing. A client without a dialog gets `APPROVAL_CLIENT_UI_REQUIRED` immediately with the preview; nothing runs.
  - **Trusted Client (explicit opt-in, new):** the owner trusts a client (for example Claude Desktop with "Always allow") to run protected actions without per-action confirmation. Results and the journal are labelled `trusted-client`; it is never reported as the user's confirmation. Previews, stale-plan checks and the journal stay. It does **not** cover acts only a person may perform (confirming a Story or architecture decision, approving a service): those still need an approval dialog or the CLI.
  - `host-permission` remains an advanced opt-in; `APPROVAL_TIMED_OUT` reports a dialog nobody answered.
- **Both MCP protocol eras** (2025-11-25 and 2026-07-28) handle approvals.
- **Diagnostics.** `praxis_doctor` → `approval.client` (what your client declared), `approval.diagnosticsLog` and a local log `~/.praxis/diagnostics/mcp.jsonl` (calls, durations, result codes; no arguments or secrets). The decision journal is stored outside the repository (`~/.praxis/decisions/`).
- Local-first workflows (project init, BA, Architect, Developer, Quality) need no Jira.

## Fixes

- A protected call from a client without an approval dialog no longer waits: it is answered at once. (A real Claude Desktop Chat test showed that Desktop's own tool-permission prompt can hold such a call before it reaches Praxis; the diagnostics log shows whether a call arrived.)
- Stale previews are refused with `APPROVAL_FINGERPRINT_MISMATCH` before anything runs.
- Approvals show the exact action (the file to be written, the commit, the Quality apply plan).
- The workflow acceptance suite was updated to the current approval model.

- Marketplace builds now carry BA's generated `canon-graph/dist` (a `.gitignore` rule had silently dropped it) and a self-contained `bin/praxis-ba.cjs`, the CLI that the BA skills (`ba-lint`, `approve-plan`, ...) call. A check (`check:outputs`) keeps outputs tracked and runnable.

## Changes to the install flow

- Marketplace (GitHub) replaces manual role ZIP uploads for Claude Code, Desktop Code and Cowork. Role ZIPs and the `.mcpb` remain available for Claude Desktop **Chat**.
- No `.pkg`, launchd service, `sudo`, system accounts or WebAuthn at any point.

## Client compatibility

| Client | Skills (marketplace) | Local Runtime | Approval |
|---|---|---|---|
| Claude Code CLI | yes (verified: clean install, dependencies, update) | yes, from `praxis-runtime` plugin (verified) | dialog (verified with a scripted client and with Claude Code 2.1.304 in an earlier run); Trusted Client via environment variable (packed Runtime verified; live Claude Code session not verified) |
| Desktop Code, Cowork | yes | yes, same plugin (not separately verified) | not verified |
| Desktop Chat | may be available | **separate `.mcpb`** (a plugin's local server is not a Chat tool) | no dialog declared (observed); refused by default, Trusted Client by explicit setting |
| Web Chat | skills only | none | n/a |

## Known limitations

- **UI NOT YET VERIFIED:** the Claude Customize → Plugins flow was not driven through the real interface; CLI results are not a UI pass. See the UI acceptance scenario in the release report.
- This repository distributes the plugins only. The website and documentation are on the praxis-website repository (praxis.dfuture.co).
- Trusted Client / "Always allow" is a standing permission, not proof that a person confirmed each action.
- Real Claude Desktop Chat behaviour of the new build is not verified (Desktop's own tool-permission prompt is outside Praxis).
- Plugin MCP server environment inheritance for `PRAXIS_APPROVAL_MODE` in a live Claude Code session is not verified.

## Upgrading from earlier alphas

- **Plugins:** `claude plugin marketplace update praxis`, then `claude plugin update <name>@praxis` (verified from 0.1.0-alpha.47). Restart; call `praxis_doctor` and check `build.version`.
- **Desktop Chat:** install the new `praxis-runtime.mcpb` over the old one, restart Desktop, start a new Chat, compare `build.bundleSha256`.
- If you began installing a native approval service, broker or installer package from an unreleased build, follow `docs/cleanup-native-approval-service.md` in praxis-core; nothing is removed automatically.
