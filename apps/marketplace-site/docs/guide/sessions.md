# Working in a session

For someone who opened Claude Desktop / Cowork (or Claude Code) and must run a role **without a Praxis maintainer**: which skills exist, what to type, how to claim a Work Package.

Ordinary install is Desktop extensions from GitLab Releases ([Getting started](/guide/start), [Catalog](/catalog/)). The working directory is the **product** repository, not Praxis-mono.

## How to invoke skills

A skill is a named plugin playbook. Two equivalent ways:

1. Slash command: `/session-start`, `/claim-work-package`, `/prepare-wp`
2. Plain language: “Start a BA session”, “Claim WP PRX-12”

Put the **issue key and repo path** in the first message. Do not wait for the agent to guess the epic.

Irreversible steps stay silent until you answer: vision confirm, CR confirm, plan approve, stealing another WP claim, implementation `--approve`, live Jira writes. Answer yes/no explicitly.

## Two kinds of Work Package

| Kind | Example | Who creates it | How you “take” it |
|------|---------|----------------|-------------------|
| **Jira WP** | `PRX-12` | Architect (`jira-plan-epic`) | Developer: `/claim-work-package` |
| **Canon WP** | `WP-20260825-001`, folder `canon/wp/…` | BA (`prepare-wp`) | No claim. Architect reads the handoff after `approve-plan` |

GDS on Jira uses keys like `PRX-12`. Canon folders `WP-…` are requirements, not claimable tickets.

## Daily loop (Jira)

**Desktop / Cowork users:** open the product repo in Claude and run the role Skill — no Make targets required.

**Maintainers (optional product-source tooling):** from a product checkout with plugins installed:

```bash
# Example maintainer helpers (not the ordinary Desktop install path)
# Install plugins into the product repo (once per version)
make install-test VERSION=0.1.0-alpha.44 TEST_REPO=/path/to/product

# Each target opens Claude Code in REPO
make ba         EPIC=PRX-1  REPO=/path/to/product
make architect  EPIC=PRX-1  REPO=/path/to/product
make developer  WP=PRX-12   REPO=/path/to/product
make qa         WP=PRX-12   REPO=/path/to/product
```

Order: BA closes the Epic → Architect cuts Work Packages → Developer **claims** → implement → QA verify.

Machine-only: `make ba-preview`, `make architect-preview`, `make developer-status`, `make quality-report`.

---

## BA

Full catalog: [BA plugin](/plugins/ba).

### What to type

After `make ba EPIC=PRX-1 REPO=/path/to/product` (or with `praxis-ba` enabled):

```
Start a BA session (/session-start).
Epic PRX-1. Repo is the current directory.
Analyze the epic (/jira-analyze-epic): Stories with AC, proposal, Jira preview.
Do not write to Jira until I confirm.
```

New product, no Jira:

```
/session-start
Lay out the BA layer (/ba-scaffold), then we confirm vision (/confirm-vision).
Then CR: /capture-cr → /grill-cr → /shape-requirement → /prepare-wp.
```

Client request:

```
Capture a CR in the client's words (/capture-cr):
“We want Excel export of last month's report.”
Then grill and slice. Do not confirm until I say yes.
```

### Typical order

`session-start` → `jira-analyze-epic` **or** `capture-cr` → `grill-cr` / `ba-plan-slice` → human confirm → `shape-requirement` → `prepare-wp` → human approve (`approve-plan`) → Architect handoff.

Do not call Jira `create-story` yourself: it duplicates Stories without `praxis.artifactId`.

---

## Architect

Full catalog: [Architect plugin](/plugins/architect).

### What to type

```
Start an Architect session (/session-start).
Epic PRX-1.
Read the BA handoff only if readyForArchitecture=true.
Run intake (/intake-audit). Canonical stories only; skip superseded.
Plan the epic in Jira (/jira-plan-epic): design, Work Packages.
Jira writes only after I confirm.
```

Canon, no Jira:

```
/session-start
Intake wp/WP-001/handoffs/ba-architect.handoff.json
Then: context-map → divergence-points → record-decision → design-package → context-slice.
Emit the developer handoff when every feature is readyForDev.
```

Architect does **not** claim WPs and does **not** edit product code.

---

## Developer — claiming a WP

Full catalog: [Developer plugin](/plugins/developer).

**Claiming** a WP writes Jira: assignee, In Progress, `praxis.claim`. The agent will not override someone else's active claim.

### Start

```bash
make developer WP=PRX-12 REPO=/path/to/product
```

In chat:

```
Start a Developer session (/session-start).
Work Package PRX-12.
1. Re-read WP members in Jira; drop superseded.
2. Claim it (/claim-work-package).
3. Accept the design package (/accept-work-package).
4. Research and plan. Do not implement until I approve the plan.
```

If `make developer` already injected `WP`:

```
Claim this WP. Then accept and plan. Code only after my approve.
```

### If claim fails

| Message | What to do |
|---------|------------|
| `claim denied: … held by …` | Another person holds it. Do not force-release. Owner or explicit `--confirm` on release |
| no canonical members | Architect: WP is empty/superseded-only. Return to Architect |
| plugin missing from `node_modules/@praxis/developer` | `make install-test VERSION=… TEST_REPO=…` |

The same Jira account can resume: a second `/claim-work-package` returns the existing claim.

### After claim

`accept-work-package` → `research-codebase` / `load-stack-rules` → `classify-scale` → `create-plan` → **you** approve (`validate-plan`) → `implement-plan` → `final-arbiter` → `mr-intention` (Quality handoff).

Tiny bounded fix: `/caveman` — only when scale is bounded.

Do not implement until the plan is `approved` and you said so / CLI `--approve`.

---

## Quality (QA)

Claude plugin: [Quality](/plugins/quality). Separate from the HTTP review service.

```bash
make quality-up
make qa WP=PRX-12 REPO=/path/to/product
```

In chat:

```
Start a QA session (/session-start).
WP PRX-12 is claimed / ready-for-qa.
Verify locally (/verify-work-package): build/test/coverage from .project.
Do not change product source.
```

Commands come only from `.project` → `quality:`. Test-file writes only if `PRAXIS_QA_ALLOW_TEST_WRITES=1` and you approved the file list.

---

## Done when

| Role | Success look like |
|------|-------------------|
| BA | Stories/proposal agreed; BA→Architect handoff exists (Jira property or `wp/…/handoffs/ba-architect.handoff.json`) |
| Architect | Jira WPs exist **or** `design/<WP>/architect-developer.handoff.json` |
| Developer | `praxis.claim` is yours; plan approved; arbiter green; `design/<WP>/dev/quality-handoff.json` |
| QA | Report `.praxis-jira/quality/<WP>.md` or a quality-service review row |

Roles do not share a chat. The next person reads **git + Jira**, not your session.
