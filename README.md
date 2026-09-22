# praxis-marketplace

Public Marketplace site. Catalog pins Runtime MCPB + four independent role ZIPs from their GitLab product repos (not Praxis-mono archives).

## Local development

```bash
export PRAXIS_DOCS_USER=/path/to/praxis-docs/docs/user
npm ci
npm run verify
```

## CI

`build_marketplace` fetches private `praxis-docs` with `CI_JOB_TOKEN`, syncs Markdown, builds VitePress, runs acceptance.

**Required GitLab setting:** on `praxis-docs` → Job token permissions → allow inbound from `praxis-marketplace`.

Optional CI variables:

| Variable | Purpose | Default |
|----------|---------|---------|
| `PRAXIS_DOCS_PROJECT_PATH` | Docs project path | `engineering/ai-tooling/praxis-docs` |
| `PRAXIS_DOCS_REF` | Git ref to sync | `master` |

Do **not** store PATs in the repository. Do not log token values.

## Release

Static site artifact (`public/`). No production deploy in default CI.
