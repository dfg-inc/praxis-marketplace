# Praxis 0.1.0-alpha.49.2 — release notes

Published on 2026-11-11 as an **alpha pre-release** (tag `v0.1.0-alpha.49.2`). It is a security patch on top of 0.1.0-alpha.49.1. The Runtime `.mcpb` and the four role ZIPs are attached, with their SHA-256 (below), to the GitHub Releases `v0.1.0-alpha.49.2` of `dfg-inc/praxis-runtime`, `-ba`, `-architect`, `-developer` and `-quality`.

**Update now.** In 0.1.0-alpha.48 to 0.1.0-alpha.49.1, a repository's Claude Code settings could approve Praxis's protected actions by themselves. See the security advisory below.

## Updating from 0.1.0-alpha.49.1

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

If you installed a single role, update that role and `praxis-runtime`, then restart the client.

**Claude Desktop Chat** uses the extension: install `praxis-runtime.mcpb` from the `v0.1.0-alpha.49.2` Release of `dfg-inc/praxis-runtime`, then restart Desktop. The extension has no approval settings any more, and values you entered earlier are ignored.

Work items and decision journals written by 0.1.0-alpha.49.1 are read unchanged. Earlier approval records keep their labels.

## What changes for you

**Protected actions are approved only in the client's own dialog.** This covers commits, pushes, merge requests, Jira writes, writing `.project`, confirming Stories and decisions, and recording review decisions. Nothing else counts: not the agent's `confirmation=YES`, not a page in your browser, not a setting. A dialog answer is recorded as what it is, a client response (`personVerified: false`). It is never recorded as proof that a person approved.

**In Claude Desktop, protected actions are not executed.** Chat and Cowork show no approval dialog. The Code tab answers its dialog by itself, and Desktop starts it with settings Praxis cannot check. In all three, Praxis shows the exact preview, says it was not applied, and says nobody rejected it. Requirements, reviews, prototypes, plans, stories, architecture, implementation records, Quality checks and Git and Jira previews all work as before. Apply protected actions from the **Claude Code CLI** in a terminal, in the same repository, where the dialog is shown. See `docs/desktop-approvals.md`.

**Review pages: Save is now "Send for approval".** It records nothing by itself. Claude then applies the review, and your client's dialog shows exactly the decisions and remarks being recorded. A page that is out of date says so at once.

**Praxis refuses a dialog it cannot rely on.** Protected actions are refused when it sees any of these:
- an `Elicitation` hook that would answer the dialog, in any settings scope, plugin, marketplace, or agent, skill or command definition;
- a client started with settings, plugins or agents on its command line;
- a client whose environment points it at more configuration or loads code into it;
- a repository whose own Claude Code settings do more than plain preferences, such as any hook, any `env` entry, a status line command, plugins or marketplaces, or helper commands.

`praxis_doctor` names the file, flag or variable it found. If an ordinary setup of yours is refused, move hooks and `env` from the repository's settings into your user settings.

**Removed:**
- Trusted Client and host-permission modes, and the `planText` argument (still accepted, ignored);
- the Desktop extension's *Approval mode* setting;
- the approval page of the unreleased Desktop candidate.

**Doctor:**
- `approval.mode` is `client-ui` or `no-dialog`;
- `approval.trust` says how protected actions can be approved here, and that independently authenticated human approval is not available;
- `approval.dialogAutomation` lists what it found;
- `approval.ignoredEnvironment` lists retired or test settings it ignored.

**Other fixes:**
- The Quality service refuses requests from web pages (a browser `Origin`, or a non-loopback `Host`).
- `praxis_approval_plan` refuses a plan request for one repository that names another.

## Security advisory: a repository could approve Praxis's protected actions by itself

| | |
| --- | --- |
| Affected | Praxis Runtime 0.1.0-alpha.48, 0.1.0-alpha.49, 0.1.0-alpha.49.1 (the `praxis-runtime` plugin and the Claude Desktop extension) |
| Fixed in | 0.1.0-alpha.49.2 |
| Severity | High |
| Attack vector | Local. It needs repository content that Claude Code opens (a cloned or shared repository, or one an agent writes), or an agent with a shell on your account. |

**What was wrong.**
1. The Runtime read `PRAXIS_APPROVAL_MODE` (Trusted Client, host-permission) from its environment. Claude Code applies the `env` block of a repository's `.claude/settings.json` to the MCP servers it starts, so a repository could switch on Trusted Client, and protected actions then ran on the agent's own `confirmation=YES`. In Claude Desktop, the extension's *Approval mode* setting did the same, and it lives in a file of your account. This affects 0.1.0-alpha.48 to alpha.49.1.
2. Claude Code can answer an MCP elicitation dialog through an `Elicitation` hook, including one from the repository's own settings, and Praxis took that answer as yours. This affects 0.1.0-alpha.48 to alpha.49.1, with Claude Code clients.
3. A test variable, which a repository's settings could set, made the Runtime write the review page's secret link into the repository. An agent could then read it and save review decisions, which Praxis recorded as your acceptance. This affects 0.1.0-alpha.49 and alpha.49.1.

Each was reproduced on 2026-11-11 against the released 0.1.0-alpha.49.1, using the real Claude Code CLI 2.1.314 and throwaway repositories. In this release, each is refused.

**What this release does not protect against.** Approvals happen on your computer, through a client you run. So a program that runs as you can get past them. That includes an agent with a shell, code from a repository you trusted in Claude Code, and a script you ran. Such a program can:
- start its own client and answer the dialog;
- load code into your client through its environment;
- type into the dialog;
- edit Praxis's files;
- skip Praxis and run `git` or Jira itself.

Praxis's check of the client's configuration is a best-effort list. Four rounds of independent review each found sources it had missed, and those are now refused, but there may be more. Independently authenticated human approval needs an authority outside your account, and this release does not provide one. The details are in `docs/approval-threat-model.md` (R1 to R6). Open repositories in Claude Code only after you have checked them, as its workspace trust prompt asks.

**If you cannot update yet:**
- leave the Desktop extension's *Approval mode* empty;
- check a repository's `.claude/settings.json` and `.claude/settings.local.json` for `PRAXIS_*` variables and `Elicitation` hooks before you trust it in Claude Code.

**To find decisions an affected version may have recorded without you,** use `praxis_workflow_inspect` (`view: approvals`) and `praxis_approval_journal`. Look for `trusted-client`, `host-prompt` and `review-page` records.

## Archives (SHA-256)

```
bb87dcc80571e717e3d45c450382a5dbba5b91518710d06a4b2c97ff1437c44e  praxis-runtime.mcpb
604e576587ec23f9bdd5082d284ce4e81696ab44753bb4b567bded4239878a34  praxis-ba.zip
044e0cb458aa9b079b024928e2f718aa4f70cfa915aed57a9f7a3d8b246c8021  praxis-architect.zip
7d6a3e43747fd8de8e089543d208920e340df39c544ca1ed8dc9f465962f9715  praxis-developer.zip
e3cceed1f94337fc8abd000fffcb1a05e3703dfa96a758a9e42bf4a0286d310e  praxis-quality.zip
```
