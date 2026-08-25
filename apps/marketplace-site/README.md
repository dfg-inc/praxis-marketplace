# @praxis/marketplace-site

VitePress site for Praxis plugins, method, catalog, and changelog.

## Scripts

```bash
npm run dev -w @praxis/marketplace-site
npm run build -w @praxis/marketplace-site
npm run preview -w @praxis/marketplace-site
```

## Domain / TLS (WBS 7.5 — ops checklist)

External subdomain cutover is **ops-owned**. Checklist:

- [ ] Sub-brand DNS delegation to hosting
- [ ] TLS certificate issued and auto-renew configured
- [ ] Redirect from corporate docs section to sub-brand
- [ ] Only released catalog versions mirrored publicly
- [ ] Apache-2.0 notice visible for role plugins

Do not treat local `vitepress preview` as production hosting.
