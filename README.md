# praxis-marketplace

Marketplace site. Catalog pins Runtime MCPB + four independent role ZIPs from their **GitLab Releases** (Generic Package Registry), not Praxis-mono archives and not ephemeral CI job artifacts.

**Production URL (GitLab Pages, unique domain):** https://praxis-marketplace-833761.pages.jetru.by

**Docs portal:** https://praxis-docs-e263c2.pages.jetru.by

Access: project is **private**; sign into `gl.jetru.by` before opening Pages. VitePress `base` is `/` because unique domain is enabled.

## Local development

```bash
export PRAXIS_DOCS_USER=/path/to/praxis-docs/docs/user
npm ci
npm run verify
```

## CI

`build_marketplace` fetches private `praxis-docs` with `CI_JOB_TOKEN`, syncs Markdown, builds VitePress, runs acceptance. Push to `master` then deploys via the GitLab `pages` job.

**Required GitLab setting:** on `praxis-docs` → Job token permissions → allow inbound from `praxis-marketplace`.

Optional CI variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `PRAXIS_DOCS_PROJECT_PATH` | Docs project path | `engineering/ai-tooling/praxis-docs` |
| `PRAXIS_DOCS_REF` | Git ref to sync | `master` |

Do **not** store PATs in the repository. Do not log token values.
