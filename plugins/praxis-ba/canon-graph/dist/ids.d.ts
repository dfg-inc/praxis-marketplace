import type { z } from 'zod';
import { countersSchema, baselineManifestSchema } from './schema.js';
import type { ParsedPage } from './parse.js';
export type Counters = z.infer<typeof countersSchema>;
type BaselineManifest = z.infer<typeof baselineManifestSchema>;
/** Reads + zod-validates `<repo>/.ba/counters.yaml`. Throws with the joined
 * zod issues on a corrupt/hand-tampered ledger — never silently coerces. */
export declare function readCounters(repo: string): Counters;
/** Atomic temp-write + rename (never a partial write) — also the exported
 * seam Task 13's `migrate` uses to seed a fresh ledger from `_counters`, and
 * Task 12's CLI could use to hand-edit it (both callers still go through
 * `countersSchema.parse` here, so a malformed seed fails loudly at write
 * time, not silently at the next `allocateId`). */
export declare function writeCounters(repo: string, counters: Counters): void;
type NonWpScope = {
    kind: 'epic' | 'cr' | 'bug';
} | {
    kind: 'fr' | 'nfr' | 'br';
    epic: string;
};
/** Mints the next id for a WP — `date` (YYYYMMDD) is REQUIRED and forms the
 * informational date segment of `WP-YYYYMMDD-NNN` (NNN is the flat monotonic
 * counter). */
export declare function allocateId(repo: string, scope: {
    kind: 'wp';
}, date: string): Promise<string>;
/** Mints the next id for any non-WP scope. */
export declare function allocateId(repo: string, scope: NonWpScope): Promise<string>;
/** Mints the next baseline id for `date` (YYYYMMDD, caller-supplied — never
 * `Date.now()`) via `counters.product.baselineSeq[date]`: first-of-day omits
 * the suffix (`BL-<date>`), the 2nd+ get `-2`, `-3`, … Same lock + atomic
 * persist as `allocateId` (shares the one `.ba/.lock` — both mutate the same
 * `counters.yaml`, so they must serialize against each other too). */
export declare function allocateBaselineId(repo: string, date: string): Promise<string>;
/** The validate-time corpus max-guard (§10): asserts `counters[scope] ≥`
 * every id ever seen across the live canon (`pages`), every baseline
 * snapshot (`baselines` — both each snapshot's own `BL-…` id and every
 * frozen item id it lists), AND `counters.retired`. This is O(corpus) by
 * design and is NEVER called from `allocateId`/`allocateBaselineId` — it
 * exists solely to catch hand-tampering or a rewound ledger at `validate`
 * time. Read-only: takes no lock (an atomic renameSync'd `counters.yaml` can
 * never be observed torn, so a concurrent `allocateId` elsewhere poses no
 * risk here). */
export declare function maxGuard(repo: string, pages: readonly ParsedPage[], baselines: readonly BaselineManifest[]): {
    ok: boolean;
    violations: string[];
};
export {};
