import { z } from 'zod';
import { type CrImpact } from './schema.js';
import type { Verdict } from './types.js';
export type BackfillEntry = {
    impacts: CrImpact[];
};
export type BackfillMap = Record<string, BackfillEntry>;
export declare const backfillEntrySchema: z.ZodObject<{
    impacts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        amends: z.ZodEffects<z.ZodString, string, string>;
    }, "strict", z.ZodTypeAny, {
        amends: string;
    }, {
        amends: string;
    }>, z.ZodObject<{
        spawns: z.ZodEnum<["fr", "nfr", "br"]>;
        epic: z.ZodString;
        realized: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    }, "strict", z.ZodTypeAny, {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    }, {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    impacts: ({
        amends: string;
    } | {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    })[];
}, {
    impacts: ({
        amends: string;
    } | {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    })[];
}>;
export declare const backfillMapSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    impacts: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        amends: z.ZodEffects<z.ZodString, string, string>;
    }, "strict", z.ZodTypeAny, {
        amends: string;
    }, {
        amends: string;
    }>, z.ZodObject<{
        spawns: z.ZodEnum<["fr", "nfr", "br"]>;
        epic: z.ZodString;
        realized: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    }, "strict", z.ZodTypeAny, {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    }, {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    impacts: ({
        amends: string;
    } | {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    })[];
}, {
    impacts: ({
        amends: string;
    } | {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    })[];
}>>;
export type MigrateV3Result = {
    written: string[];
    moved: Array<{
        from: string;
        to: string;
    }>;
    advisories: string[];
};
/** Structural validation for a snapshot read back off disk (`cli.ts`'s
 * `migrate-v3 --verify`, per this package's "never silently coerce a
 * machine-written artifact" convention — same posture as `ids.ts`'s
 * `readCounters`/`writer.ts`'s `pendingMarkerSchema`). Kept intentionally
 * loose on `versions`/`statuses`/`planFiles` (plain string-keyed records) —
 * their VALUES are cross-checked against live canon by `verifyParityV3`
 * itself, not by this shape check. */
export declare const paritySnapshotSchema: z.ZodObject<{
    ids: z.ZodArray<z.ZodString, "many">;
    statuses: z.ZodRecord<z.ZodString, z.ZodString>;
    versions: z.ZodRecord<z.ZodString, z.ZodNumber>;
    rtmEdges: z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        from: string;
        to: string;
    }, {
        from: string;
        to: string;
    }>, "many">;
    planFiles: z.ZodRecord<z.ZodString, z.ZodString>;
    counters: z.ZodObject<{
        product: z.ZodObject<{
            epic: z.ZodNumber;
            cr: z.ZodNumber;
            wp: z.ZodNumber;
            bug: z.ZodNumber;
            baselineSeq: z.ZodRecord<z.ZodString, z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            cr: number;
            wp: number;
            bug: number;
            epic: number;
            baselineSeq: Record<string, number>;
        }, {
            cr: number;
            wp: number;
            bug: number;
            epic: number;
            baselineSeq: Record<string, number>;
        }>;
        epics: z.ZodRecord<z.ZodString, z.ZodObject<{
            fr: z.ZodNumber;
            nfr: z.ZodNumber;
            br: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            fr: number;
            nfr: number;
            br: number;
        }, {
            fr: number;
            nfr: number;
            br: number;
        }>>;
        retired: z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
    }, "strip", z.ZodTypeAny, {
        retired: string[];
        product: {
            cr: number;
            wp: number;
            bug: number;
            epic: number;
            baselineSeq: Record<string, number>;
        };
        epics: Record<string, {
            fr: number;
            nfr: number;
            br: number;
        }>;
    }, {
        retired: string[];
        product: {
            cr: number;
            wp: number;
            bug: number;
            epic: number;
            baselineSeq: Record<string, number>;
        };
        epics: Record<string, {
            fr: number;
            nfr: number;
            br: number;
        }>;
    }>;
}, "strip", z.ZodTypeAny, {
    ids: string[];
    statuses: Record<string, string>;
    versions: Record<string, number>;
    rtmEdges: {
        from: string;
        to: string;
    }[];
    planFiles: Record<string, string>;
    counters: {
        retired: string[];
        product: {
            cr: number;
            wp: number;
            bug: number;
            epic: number;
            baselineSeq: Record<string, number>;
        };
        epics: Record<string, {
            fr: number;
            nfr: number;
            br: number;
        }>;
    };
}, {
    ids: string[];
    statuses: Record<string, string>;
    versions: Record<string, number>;
    rtmEdges: {
        from: string;
        to: string;
    }[];
    planFiles: Record<string, string>;
    counters: {
        retired: string[];
        product: {
            cr: number;
            wp: number;
            bug: number;
            epic: number;
            baselineSeq: Record<string, number>;
        };
        epics: Record<string, {
            fr: number;
            nfr: number;
            br: number;
        }>;
    };
}>;
export type ParitySnapshot = z.infer<typeof paritySnapshotSchema>;
/**
 * Transforms a v2 canon under `canonDir` (folder epics already in place; flat
 * `wp/<id>.md` pages; free-text CR `entry_point`) into v3 shape, in place.
 * Every step is individually idempotent (see each helper's own doc comment);
 * a second call with the same arguments produces an EMPTY `written`/`moved`
 * (the ONE exception, the pre-migration snapshot, is durable-once-written by
 * design — see the file header) — `advisories` may legitimately repeat (a
 * still-unresolved gap, e.g. a confirmed CR the backfill map still doesn't
 * cover, is reported again every run until it's actually fixed, which is not
 * a written-side effect).
 *
 * `date` (YYYYMMDD) feeds ONLY the final reconcile step — see this file's
 * header for why this parameter exists beyond the task-9 brief's original
 * 3-argument interface line. Never read from the clock inside this module.
 */
export declare function migrateV3(canonDir: string, repoRoot: string, backfill: BackfillMap, date: string): MigrateV3Result;
/**
 * Captures everything the six `verifyParityV3` checks need, tolerant of
 * either a legacy or already-migrated shape for WP/CR pages (see the
 * per-branch comments below) — intended to be called BEFORE `migrateV3`'s
 * own transform steps run (that's how `migrateV3` itself uses it, per the
 * file header), but has no dependency on that timing to behave correctly.
 */
export declare function snapshotForParity(canonDir: string, repoRoot: string): ParitySnapshot;
/**
 * Compares a pre-migration `snapshot` (see `snapshotForParity`) against the
 * CURRENT (post-migration) canon under `canonDir`, as six named `Check`s:
 *   - `same-id-set` — every id preserved (a WP's PATH moving folder-form is
 *     explicitly not an id change, so this never even looks at paths).
 *   - `statuses-preserved` — exception: a CR going `confirmed` -> `resolved`
 *     (the reconcile step's own legitimate effect on a newly-backfilled CR).
 *   - `versions-untouched` — no FR/NFR/BR `version` ever changes.
 *   - `rtm-superset` — every pre-migration FR->CR / FR->WP edge still exists
 *     post-migration (a WP's Delivers set is preserved; an FR's traces_to is
 *     never touched by this migration at all).
 *   - `plan-content-identical` — a migrated plan file's bytes at its new
 *     `wp/<id>/plan.md` location sha256-match its pre-migration content.
 *   - `counters-monotonic` — no ledger counter (nor any per-epic/baseline-seq
 *     sub-counter) ever goes backwards.
 * `repoRoot` is accepted (matching the task-9 brief's pinned 3-arg
 * interface) but unused by any of the six checks above — once migration has
 * completed, every plan file this parity check cares about already lives
 * under `canonDir` (a plan whose move never happened, because its source was
 * missing pre-migration, was never recorded into `snapshot.planFiles` either
 * — see `snapshotForParity`'s own comment — so there is no "check the OLD
 * location" fallback that would ever legitimately apply here).
 */
export declare function verifyParityV3(snapshot: ParitySnapshot, canonDir: string, repoRoot: string): Verdict;
