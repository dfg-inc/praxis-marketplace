# praxis-architect

Architecture role: intake BA work packages, record decisions, produce a Developer-ready design package.

**License:** Apache-2.0  
**Version:** see [catalog](/catalog/)

## What it does

- Accepts `ba.architect.handoff` only when vision and readiness checks pass.
- Writes ADR, context slice, design package, and machine `change-spec.json`.
- Emits `architect.developer.handoff` for Developer.

## Executable tool

```bash
node plugins/architect/tools/build-architecture-package.mjs \
  --ba-handoff <path> --canon <canon> --out <design> --product <repo>
```

## Skills

Council/grill, design-package, context-slice, record-decision, error-cost gate, and related skills live under `plugins/architect/skills/`.
