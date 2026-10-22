import type { Verdict } from './types.js';
export type MigrateResult = {
    written: string[];
};
/**
 * Reads a v1 canon under `v1Dir` (laid out like today's `product/`) and
 * emits the v2 md canon under `outDir` (design spec §5), including a
 * reshaped `vision.md` when one exists (its hand-authored body carried over
 * verbatim — see the file header), and seeding `outDir/.ba/counters.yaml`
 * from v1's `_counters` and `outDir/.ba/config.yaml` with the standard
 * canon-path-scoping roots (see `MIGRATED_CANON_ROOTS` above). Pure w.r.t.
 * the clock — every date is transcribed from a v1 JSON date field, never
 * `Date.now()`. Returns every path written (pages + the counters/config
 * ledgers).
 */
export declare function migrate(v1Dir: string, outDir: string): MigrateResult;
/**
 * Independently reconstructs both sides on every call — the v1 JSON parsed
 * fresh from `v1Dir`, the md canon via `writer.ts`'s `loadGraph(outDir)` —
 * and compares. Never trusts anything `migrate` may have cached; a hand-edit
 * to `outDir` after `migrate` ran (e.g. a reworded FR statement) is caught
 * exactly the same way a from-scratch parity run would catch it.
 */
export declare function verifyParity(v1Dir: string, outDir: string): Verdict;
