# Praxis 0.1.0-alpha.49.3 — release notes

Published on 2026-11-12 as an **alpha pre-release** (tag `v0.1.0-alpha.49.3`), a security patch on top of 0.1.0-alpha.49.2. The Runtime `.mcpb` and the four role ZIPs are attached, with their SHA-256 (below), to the GitHub Releases `v0.1.0-alpha.49.3` of `dfg-inc/praxis-runtime`, `-ba`, `-architect`, `-developer` and `-quality`.

**Update now.** In every earlier version, an acceptance written into a Work Item file counted as if you had made it, and a repository's Claude Code settings could send your Jira, GitHub or GitLab token to a host of their choosing. See the security advisory below.

## Updating from 0.1.0-alpha.49.2

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

If you installed a single role, update that role and `praxis-runtime`, then restart the client. **Claude Desktop Chat** uses the extension: install `praxis-runtime.mcpb` from the `v0.1.0-alpha.49.3` Release of `dfg-inc/praxis-runtime`, then restart Desktop.

**After updating, accept again what you had accepted.** Your Work Items are read unchanged, but acceptances recorded before this release have no record outside the repository, so they show as `unverified` and do not open gates. This applies to accepted criteria, phase acceptances, confirmed stories and decisions, approved services, agreed contracts, waivers and a work item's classic mode. Praxis cannot tell them apart from acceptances written into the file. Open the review (`praxis_review_render`) and accept them again; the client's dialog shows exactly what you accept. Work that needs no acceptance continues as before.

Decision journals written by earlier versions are adopted under the new name the first time they are used (the old file is left as it was).

## What changes for you

**An acceptance counts only when Praxis recorded it.** When the client's dialog approves an acceptance, the Runtime also records it in a **decision ledger** outside the repository (`~/.praxis/ledger/`), bound to the exact content and to an action id the Work Item file stores. Each time a Work Item is read, every claim in the file is compared with the ledger. Only `accepted` counts for gates, readiness, verdicts and guidance. `unverified` (no record) and `invalid` (the ledger contradicts the file: content changed, copied from another item, or a later rejection or revocation) do not. Status and inspect show each one. See `docs/acceptance-integrity.md`.

- Branches and worktrees of one clone share the ledger. A revision on one branch does not invalidate another branch's acceptances; a rejection or an approved rewording takes that content back on every branch.
- A work item's classic mode switches the stage gates off, so it is a decision too. An older item that is classic by default follows the guided gates until you choose classic again in the review.

**Every protected result says what the approval was.** `data.authorization` carries `channel`, `decidedBy`, `personVerified: false` and `independentlyVerified: false`. A Jira write adds `independentlyApproved: false` and why.

**Credentials.**
- Praxis replaces the values of the credentials it holds with `[REDACTED:<NAME>]` in every result, error, diagnostic and log it writes.
- Tests, Quality checks and Git hooks that Praxis starts no longer receive credentials in their environment. This is hygiene, not a boundary: a program running as you can still read the Runtime's environment.
- A token is not used when a repository file (`.env`, `.claude/settings*.json`, an `.mcp.json` server's `env`) sets where or how it is sent: `CREDENTIAL_SOURCE_UNTRUSTED`.
- `praxis_doctor` → `credentialExposure` names the credential variables the Runtime inherited, never their values. A token in your login-session environment reaches every app and agent shell you start.

**Security state is kept where the repository cannot move it.** The decision journal and ledger live under your account's home as the operating system records it; neither `HOME` nor `PRAXIS_STATE_HOME` moves them in a shipped Runtime, and a location inside the repository is refused.

## Security advisory: Work Item acceptances could be forged, and a repository could redirect a credential

| | |
| --- | --- |
| Affected | Every earlier release, up to and including 0.1.0-alpha.49.2 (the `praxis-runtime` plugin and the Claude Desktop extension) |
| Fixed in | 0.1.0-alpha.49.3, for the repository and for an agent that can write only its workspace (see below) |
| Severity | High |
| Attack vector | Local. It needs repository content you open (a cloned or shared repository, a merged pull request, or files an agent writes). |

**What was wrong.**
1. Praxis trusted the acceptance fields of `.praxis/workflow/items/*.json`. Anyone who could write the repository could mark criteria accepted, stories and decisions confirmed, services approved or contracts agreed, and Praxis opened the following gates and reported the feature ready. Praxis's own approval records in the same file did not prevent it.
2. A repository's Claude Code settings could set the Jira base URL (or the GitHub or GitLab API URL) for the Runtime while the token came from your environment, so a request carrying your token went to a host the repository chose.

Both were reproduced on 2026-11-12 against the released 0.1.0-alpha.49.2 in throwaway repositories, and are refused by this release (`tools/scripts/r1r2-regression.mjs` in `praxis-runtime` runs the same checks against any build).

**What this release does not protect against.** Approvals still happen on your computer, through a client you run, and the decision ledger is a file of your account. A program running with your permissions (an agent with an unsandboxed shell, such as the Claude Desktop Code tab today, code from a repository you trusted, a script you ran) can start its own client and answer the dialog, write the ledger, read your credentials, or skip Praxis and run `git` or Jira itself. Nothing in this release changes that, and Praxis never reports an approval as verified by a person. An agent that can write only its workspace (a sandbox that keeps `~/.praxis` read-only) cannot forge acceptances. Independently authenticated approval needs an authority outside your account; this release does not provide one. See `docs/approval-threat-model.md`.

**Recommended in any case:**
- protect the branches that matter with rules no agent's credentials can change, and require review by another person;
- give agent sessions least-privilege tokens, and keep long-lived tokens out of your login-session environment and global shell profile;
- review `.praxis/` changes in pull requests like code.

## Archives (SHA-256)

```
50115175b15d87908e3cb0e5487b0fad16e00ca99697642019608f2fd1293778  praxis-runtime.mcpb
d446e050ace87fc109ea944324ff6f22f460aa6436575d0ba72badbd2bfdde11  praxis-ba.zip
347f7d0ca09eb207fd622f7b33368a283bc5f3d5edd33510c5738bf1cd0ecfc0  praxis-architect.zip
01d5b7603513d65d51c9b399e79df0a50b12019d1c72192f312837d71a362b3f  praxis-developer.zip
1384615390476a40d9896ed8602f83ba9a8088be8211a9146ba81dccb3fa767f  praxis-quality.zip
```
