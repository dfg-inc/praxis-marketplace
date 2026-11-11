# Praxis

The complete Praxis set. Adding this plugin installs, as dependencies: `praxis-runtime` (the MCP server), `praxis-ba`, `praxis-architect`, `praxis-developer`, `praxis-quality`.

Install from the Claude UI: Customize → Plugins → Add → Add marketplace → `dfg-inc/praxis-marketplace` → Praxis → Add.
Developers: `claude plugin marketplace add dfg-inc/praxis-marketplace` then `claude plugin install praxis@praxis`.

Claude Desktop Chat uses the separate `praxis-runtime.mcpb` extension instead. In Claude Desktop (Chat, Cowork and the Code tab) protected actions such as commits, pushes and Jira writes are previewed but not executed: apply them from the Claude Code CLI, whose approval dialog Praxis uses. See the Praxis docs on Desktop approvals.
