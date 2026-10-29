# Praxis 0.1.0-alpha.49 — release notes

Published on 2026-10-29 as an **alpha pre-release** (tag `v0.1.0-alpha.49`). The Runtime `.mcpb` and the four role ZIPs are attached, with their SHA-256, to the GitHub Releases `v0.1.0-alpha.49` of `dfg-inc/praxis-runtime`, `-ba`, `-architect`, `-developer` and `-quality`.

## Install in one step

Claude → **Customize → Plugins → Add → Add marketplace** → `dfg-inc/praxis-marketplace` → **Praxis** → **Add**.
Adding **Praxis** installs Praxis Runtime, BA, Architect, Developer and Quality. A single role can be added alone and brings the Runtime with it. Developers can use `claude plugin marketplace add dfg-inc/praxis-marketplace` and `claude plugin install praxis@praxis` instead.

## License

Praxis is licensed under the **Apache License 2.0** (`Apache-2.0`), copyright 2026 dfuture-co. Every repository and every distributed plugin and archive carries `LICENSE` and `NOTICE`; builds that bundle third-party code carry `THIRD-PARTY-NOTICES.md` with those licences unchanged.

## What is new

- **Guided workflow with explicit stages.** Requirements Review, Prototype, Story Plan and Stories Review are separate gates. Review pages are HTML with a decision per item and a Save that writes back through the Runtime. Staleness is detected per item.
- **Interactive prototype.** Preview, Inspect and Review in one page; mock data, states, navigation, filters.
- **Quality evidence with provenance.** A criterion is PASS only with a current, independently executed result (`executed` or `browser`); agent statements are shown as attested, never as PASS. Browser checks run in a Praxis-owned Chromium driver; results are bound to the built bundle and go stale when it changes.
- **Approval audit.** `approvals[]` records each verified approval (action, subject revision and fingerprint, channel, trust level). Decisions recorded before alpha.49 stay "unverified provenance" and are never upgraded.
- **Operator setup for browser checks:** `node tools/scripts/setup-quality-browser.mjs` in praxis-runtime installs a pinned Playwright and finds Chrome. Without it, a browser check is BLOCKED with the reason, never PASS.
- Work items written by alpha.48 are read as they are; the first write migrates them and keeps `<id>.json.v1.0.0.bak`.

## Known limitations

- A real person's Approve in the client dialog on this build was observed in Claude Code only; **Claude Desktop (Code and Chat) dialogs for this build are NOT VERIFIED.**
- `independent-human` means the client returned Approve to its own dialog; the person is not identified.
- Quality runs project code (adapters, checks) as the same OS user with **no OS sandbox**; run it only on trusted projects. See the Quality runner security model in the release documents.
- Verified on macOS arm64 (Node 24, Chrome 156). Linux and Windows are NOT VERIFIED. Live Jira is NOT VERIFIED for this build.

## Upgrading from alpha.48

`claude plugin marketplace update praxis`, then `claude plugin update <name>@praxis`; restart; call `praxis_doctor` and check `build.version`. Desktop Chat: install the new `praxis-runtime.mcpb` over the old one and restart. Rollback: see RELEASE-CHECKLIST in the release documents.
