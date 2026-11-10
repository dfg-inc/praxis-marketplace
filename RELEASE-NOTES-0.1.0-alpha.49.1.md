# Praxis 0.1.0-alpha.49.1 — release notes

Published on 2026-11-10 as an **alpha pre-release** (tag `v0.1.0-alpha.49.1`), a patch on top of 0.1.0-alpha.49. The Runtime `.mcpb` and the four role ZIPs are attached, with their SHA-256, to the GitHub Releases `v0.1.0-alpha.49.1` of `dfg-inc/praxis-runtime`, `-ba`, `-architect`, `-developer` and `-quality`.

## Install in one step

Claude → **Customize → Plugins → Add → Add marketplace** → `dfg-inc/praxis-marketplace` → **Praxis** → **Add**. Adding **Praxis** installs Praxis Runtime, BA, Architect, Developer and Quality. A single role can be added alone and brings the Runtime with it.

Developers can use the terminal instead:

```bash
claude plugin marketplace add dfg-inc/praxis-marketplace
```

```bash
claude plugin install praxis@praxis
```

## Updating from alpha.49

Update the marketplace, then every installed Praxis plugin. `claude plugin update praxis@praxis` updates only the `praxis` plugin itself, not the Runtime and roles it installed, so update those too:

```bash
claude plugin marketplace update praxis
claude plugin update praxis@praxis
claude plugin update praxis-runtime@praxis
claude plugin update praxis-ba@praxis
claude plugin update praxis-architect@praxis
claude plugin update praxis-developer@praxis
claude plugin update praxis-quality@praxis
```

If you installed a single role, update that role and `praxis-runtime`. Then restart the client. Verified with Claude Code CLI 2.1.314 against the published marketplace: alpha.49 to alpha.49.1 in place for all six plugins.

**Claude Desktop Chat** uses the extension, not a plugin: install `praxis-runtime.mcpb` from the `v0.1.0-alpha.49.1` Release of `dfg-inc/praxis-runtime`, then restart Desktop.

Work items written by alpha.49 are read unchanged. Accepted prototypes keep their acceptance.

## What is new: interfaces that are not tables

This release contains the prototype improvements only.

**Chat feeds as a chat: `conversation`.** A prototype can show a chat, a message feed or a journal as messages:
- outgoing messages on the right, incoming on the left;
- authors and avatars, times, day separators, grouping by author;
- attachments (photos and documents), and voice notes with a mock player (no audio);
- a scrolling feed for desktop and phone.

Filters, search, tabs, the record card, scenarios, Inspect and Review work as they do on a table.

**Patterns no element represents: `custom`.** Boards, calendars and map-like layouts can be written as HTML, CSS and script. They run in a sandboxed frame with its own content security policy:
- no network;
- no access to the review page, its token or its controls;
- no navigation, popups, forms or full screen.

What a reviewer can point at is declared with links to the requirements and criteria. The review page says, next to the part, that Praxis does not check its behaviour.

**Only what was asked changes.** When a user asks to turn one part of a screen into a chat, the BA changes that element and keeps the header, tabs, filters, forms and other controls as they are. A regression test proves it on an anonymized journal fixture.

**BA never shows a requested pattern as a table.** It no longer encodes the look of the pattern as a data column. When an interface cannot be shown, BA says so before the review and records it in the prototype's limitations. An unknown element kind is refused with that advice.

**Offline review copies.** They now carry the same content security policy as the served page.

**Release tooling.** It accepts a patch prerelease number, `0.1.0-alpha.49.1`.

## Known limitations

- **Custom parts are isolated, not made safe:**
  - A part can draw anything inside its own box, including something that looks like an Accept button; it cannot act on the page.
  - A part that takes the keyboard focus while the person is not typing keeps it until they click elsewhere. It cannot send what it receives anywhere.
  - Praxis does not check a custom part's behaviour or look, and scenarios cannot look inside it.
  - Tested in Chrome only.
- **In the conversation element:**
  - comments are per element, not per message;
  - photos are placeholders;
  - voice playback is a mock.
- **Unchanged from alpha.49:**
  - The Claude Desktop (Code and Chat) approval dialogs are NOT VERIFIED on this build.
  - Linux, Windows and live Jira are NOT VERIFIED.
  - Quality runs project code without an OS sandbox, for trusted projects only.

## Checksums (SHA-256)

| File | Release | SHA-256 | Bytes |
|---|---|---|---|
| `praxis-runtime.mcpb` | `dfg-inc/praxis-runtime` `v0.1.0-alpha.49.1` | `c84431dfc5a69444e5f88933f928f5ec9e18d0ac29d4b5c671af5c5a5eddae9c` | 1157225 |
| `praxis-ba.zip` | `dfg-inc/praxis-ba` `v0.1.0-alpha.49.1` | `090fbb08b4b24b80f3ef76c4ba9895fdd74a4f45eaee4abc7a1ff81e672117c2` | 75967 |
| `praxis-architect.zip` | `dfg-inc/praxis-architect` `v0.1.0-alpha.49.1` | `635c2937df635865f8342dd6a3caad894fbf74247ce47ec213c089bbfa2fe50a` | 40149 |
| `praxis-developer.zip` | `dfg-inc/praxis-developer` `v0.1.0-alpha.49.1` | `a95b0d13c914cc524bf1f1d72878a7642b0d57fd03f44dda3c3f2ec53d093b39` | 49058 |
| `praxis-quality.zip` | `dfg-inc/praxis-quality` `v0.1.0-alpha.49.1` | `779fc38a41afe31598112b130c10b02d09da53314ab2b174427834c4a8f9e889` | 42302 |

Each Release also carries a `release-meta.json` with the source commit, the SHA-256 and the vendored Core baseline (`c327b89c06418ae5b68a4c4576081b4762d9e2b9`).
