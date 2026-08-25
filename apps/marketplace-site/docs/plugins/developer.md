# praxis-developer

Developer role: accept architecture packages, plan with approval, implement, verify, and hand off to Quality.

**License:** Apache-2.0  
**Version:** see [catalog](/catalog/)

## What it does

- Accepts `architect.developer.handoff` and researchs the product tree.
- Writes a plan, requires an approval gate (`--approve` in CLI / human gate in session).
- Applies change-spec, runs final-arbiter (build/test/lint), repair loop on failure.
- Emits `developer.quality.handoff` with verification flags.

## Executable tools

```bash
node plugins/developer/tools/run-work-package.mjs \
  --arch-handoff <path> --design-dir <dir> --product <repo> --approve

node plugins/developer/tools/final-arbiter.mjs --cwd <repo>
```

## Skills

accept-work-package, research-codebase, create-plan, validate-plan, implement-plan, final-arbiter, repair-loop, mr-intention, and supporting agents under `plugins/developer/`.
