# Catalog

> **Install from Claude:** Customize → Plugins → Add → Add marketplace → `dfg-inc/praxis-marketplace` → **Praxis** → Add. Praxis Runtime and the four roles install automatically (Claude Code, Desktop Code, Cowork). Claude Desktop **Chat** additionally needs `praxis-runtime.mcpb` from the Runtime release below.

Installable Praxis products for Claude Desktop / Cowork. Download from each product’s **GitHub Release**. Do **not** use temporary CI job artifacts or Praxis-mono archives.

Current channel version: **v0.1.0-alpha.48** (products version independently after this wave).

| Product | Version | Asset | Compatibility | Releases |
|---------|---------|-------|---------------|----------|
| **Runtime** | 0.1.0-alpha.48 | `praxis-runtime.mcpb` | required by every role | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-runtime/releases/tag/v0.1.0-alpha.48) · [all](https://github.com/dfg-inc/praxis-runtime/releases) |
| **praxis-ba** | 0.1.0-alpha.48 | `praxis-ba.zip` | Runtime MCPB | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-ba/releases/tag/v0.1.0-alpha.48) · [all](https://github.com/dfg-inc/praxis-ba/releases) |
| **praxis-architect** | 0.1.0-alpha.48 | `praxis-architect.zip` | Runtime MCPB | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-architect/releases/tag/v0.1.0-alpha.48) · [all](https://github.com/dfg-inc/praxis-architect/releases) |
| **praxis-developer** | 0.1.0-alpha.48 | `praxis-developer.zip` | Runtime MCPB | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-developer/releases/tag/v0.1.0-alpha.48) · [all](https://github.com/dfg-inc/praxis-developer/releases) |
| **praxis-quality** | 0.1.0-alpha.48 | `praxis-quality.zip` | Runtime MCPB (Quality HTTP worker is inside Runtime) | [v0.1.0-alpha.48](https://github.com/dfg-inc/praxis-quality/releases/tag/v0.1.0-alpha.48) · [all](https://github.com/dfg-inc/praxis-quality/releases) |

## How to choose

1. Install **Runtime** once (`praxis-runtime.mcpb`).
2. Install only the role ZIP you need (**praxis-ba**, **praxis-architect**, **praxis-developer**, and/or **praxis-quality**).
3. Open the [Docs portal](https://github.com/dfg-inc/praxis-docs/) for installation, credentials, update, and workflows.
4. Each Release includes `release-meta.json` (version, source SHA, SHA-256, Core vendor compatibility).

## Licenses

| Plugin | License |
|--------|---------|
| praxis-ba | Apache-2.0 |
| praxis-architect | Apache-2.0 |
| praxis-developer | Apache-2.0 |
| praxis-quality | UNLICENSED (company) |

Role pipeline documentation: [English guide](/guide/) · [Русский гайд](/ru/guide/).
Canonical Desktop install: [Installation](/user-guide/getting-started/installation) · [Update](/user-guide/getting-started/update).
