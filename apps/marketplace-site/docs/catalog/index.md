# Catalog

Installable Praxis products for Claude Desktop / Cowork. Download from each product’s **GitLab Release** (Generic Package Registry). Do **not** use temporary CI job artifacts or Praxis-mono archives.

Current channel version: **v0.1.0-alpha.44** (products version independently after this wave).

| Product | Version | Asset | Compatibility | Releases |
|---------|---------|-------|---------------|----------|
| **Runtime** | 0.1.0-alpha.44 | `praxis-runtime.mcpb` | required by every role | [v0.1.0-alpha.44](https://gl.jetru.by/engineering/ai-tooling/praxis-runtime/-/releases/v0.1.0-alpha.44) · [all](https://gl.jetru.by/engineering/ai-tooling/praxis-runtime/-/releases) |
| **praxis-ba** | 0.1.0-alpha.44 | `praxis-ba.zip` | Runtime MCPB | [v0.1.0-alpha.44](https://gl.jetru.by/engineering/ai-tooling/praxis-ba/-/releases/v0.1.0-alpha.44) · [all](https://gl.jetru.by/engineering/ai-tooling/praxis-ba/-/releases) |
| **praxis-architect** | 0.1.0-alpha.44 | `praxis-architect.zip` | Runtime MCPB | [v0.1.0-alpha.44](https://gl.jetru.by/engineering/ai-tooling/praxis-architect/-/releases/v0.1.0-alpha.44) · [all](https://gl.jetru.by/engineering/ai-tooling/praxis-architect/-/releases) |
| **praxis-developer** | 0.1.0-alpha.44 | `praxis-developer.zip` | Runtime MCPB | [v0.1.0-alpha.44](https://gl.jetru.by/engineering/ai-tooling/praxis-developer/-/releases/v0.1.0-alpha.44) · [all](https://gl.jetru.by/engineering/ai-tooling/praxis-developer/-/releases) |
| **praxis-quality** | 0.1.0-alpha.44 | `praxis-quality.zip` | Runtime MCPB (Quality HTTP worker is inside Runtime) | [v0.1.0-alpha.44](https://gl.jetru.by/engineering/ai-tooling/praxis-quality/-/releases/v0.1.0-alpha.44) · [all](https://gl.jetru.by/engineering/ai-tooling/praxis-quality/-/releases) |

## How to choose

1. Install **Runtime** once (`praxis-runtime.mcpb`).
2. Install only the role ZIP you need (**praxis-ba**, **praxis-architect**, **praxis-developer**, and/or **praxis-quality**).
3. Open the [Docs portal](https://praxis-docs-e263c2.pages.jetru.by/) for installation, credentials, update, and workflows.
4. Each Release includes `release-meta.json` (version, source SHA, SHA-256, Core vendor compatibility).

Repositories are private: sign into `gl.jetru.by` before downloading.

## Licenses

| Plugin | License |
|--------|---------|
| praxis-ba | Apache-2.0 |
| praxis-architect | Apache-2.0 |
| praxis-developer | Apache-2.0 |
| praxis-quality | UNLICENSED (company) |

Role pipeline documentation: [English guide](/guide/) · [Русский гайд](/ru/guide/).
Canonical Desktop install: [Installation](/user-guide/getting-started/installation) · [Update](/user-guide/getting-started/update).
