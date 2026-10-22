---
name: getting-started
description: First steps with Praxis: check the install, create a project, and start with the right role. Use when the user asks how to start with Praxis or whether Praxis is working.
---

# Getting started with Praxis

1. Call `praxis_doctor` with the repository path. Report `build.version`, `approval.mode` and any `errors`. If the tool is missing, the Runtime is not connected in this client: in Claude Code, Claude Desktop Code and Cowork it comes from the `praxis-runtime` plugin (a dependency of `praxis`); in Claude Desktop Chat it comes from the separate `praxis-runtime.mcpb`.
2. If the repository has no `.project`, call `praxis_project_init_preview` and show the user the file. Applying it is a protected action: the user approves it (or the owner has enabled Trusted Client).
3. Start with a role skill: `praxis-ba:local-workflow` for a business request, then `praxis-architect:local-workflow`, `praxis-developer:local-workflow`, `praxis-quality:local-workflow`.

Jira is optional. Everything above works locally without it.
