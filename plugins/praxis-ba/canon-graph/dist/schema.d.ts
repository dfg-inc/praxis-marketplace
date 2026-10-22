import { z } from 'zod';
import type { NodeType, Status } from './types.js';
export declare const EPIC_ID: RegExp;
export declare const FR_ID: RegExp;
export declare const NFR_ID: RegExp;
/** Project catalogue NFR ids (e.g. PXT-NFR-001 in shared/nfr.md). */
export declare const CATALOG_NFR_ID: RegExp;
export declare const BR_ID: RegExp;
export declare const CR_ID: RegExp;
export declare const WP_ID: RegExp;
export declare const BUG_ID: RegExp;
export declare const GOAL_ID: RegExp;
export declare const BASELINE_ID: RegExp;
export declare const statusSchema: z.ZodType<Status>;
export declare const visionSchema: z.ZodObject<{
    type: z.ZodLiteral<"vision">;
    status: z.ZodEnum<["draft", "confirmed"]>;
    confirmed_at: z.ZodOptional<z.ZodString>;
    confirmed_by: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "confirmed";
    type: "vision";
    confirmed_at?: string | undefined;
    confirmed_by?: string | undefined;
}, {
    status: "draft" | "confirmed";
    type: "vision";
    confirmed_at?: string | undefined;
    confirmed_by?: string | undefined;
}>;
export declare const frSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"fr">;
    epic: z.ZodString;
    status: z.ZodType<Status, z.ZodTypeDef, Status>;
    version: z.ZodNumber;
    traces_to: z.ZodArray<z.ZodString, "many">;
    enforces: z.ZodArray<z.ZodString, "many">;
    references_nfr: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">;
    related: z.ZodArray<z.ZodString, "many">;
    goal_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    baseline: z.ZodOptional<z.ZodString>;
    supersedes: z.ZodOptional<z.ZodString>;
    superseded_by: z.ZodOptional<z.ZodString>;
    provenance: z.ZodOptional<z.ZodLiteral<"migrated">>;
}, "strip", z.ZodTypeAny, {
    epic: string;
    status: Status;
    type: "fr";
    id: string;
    version: number;
    traces_to: string[];
    enforces: string[];
    references_nfr: string[];
    related: string[];
    goal_ids?: string[] | undefined;
    baseline?: string | undefined;
    supersedes?: string | undefined;
    superseded_by?: string | undefined;
    provenance?: "migrated" | undefined;
}, {
    epic: string;
    status: Status;
    type: "fr";
    id: string;
    version: number;
    traces_to: string[];
    enforces: string[];
    references_nfr: string[];
    related: string[];
    goal_ids?: string[] | undefined;
    baseline?: string | undefined;
    supersedes?: string | undefined;
    superseded_by?: string | undefined;
    provenance?: "migrated" | undefined;
}>;
export declare const nfrSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"nfr">;
    epic: z.ZodString;
    status: z.ZodType<Status, z.ZodTypeDef, Status>;
    version: z.ZodNumber;
    traces_to: z.ZodArray<z.ZodString, "many">;
    verified_by: z.ZodArray<z.ZodString, "many">;
    related: z.ZodArray<z.ZodString, "many">;
    goal_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    baseline: z.ZodOptional<z.ZodString>;
    supersedes: z.ZodOptional<z.ZodString>;
    superseded_by: z.ZodOptional<z.ZodString>;
    provenance: z.ZodOptional<z.ZodLiteral<"migrated">>;
}, "strip", z.ZodTypeAny, {
    epic: string;
    status: Status;
    type: "nfr";
    id: string;
    version: number;
    traces_to: string[];
    related: string[];
    verified_by: string[];
    goal_ids?: string[] | undefined;
    baseline?: string | undefined;
    supersedes?: string | undefined;
    superseded_by?: string | undefined;
    provenance?: "migrated" | undefined;
}, {
    epic: string;
    status: Status;
    type: "nfr";
    id: string;
    version: number;
    traces_to: string[];
    related: string[];
    verified_by: string[];
    goal_ids?: string[] | undefined;
    baseline?: string | undefined;
    supersedes?: string | undefined;
    superseded_by?: string | undefined;
    provenance?: "migrated" | undefined;
}>;
export declare const brSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"br">;
    epic: z.ZodString;
    kind: z.ZodEnum<["structural", "operative"]>;
    enforcement: z.ZodEnum<["advisory", "hard"]>;
    status: z.ZodType<Status, z.ZodTypeDef, Status>;
    version: z.ZodNumber;
    goal_ids: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    baseline: z.ZodOptional<z.ZodString>;
    supersedes: z.ZodOptional<z.ZodString>;
    superseded_by: z.ZodOptional<z.ZodString>;
    provenance: z.ZodOptional<z.ZodLiteral<"migrated">>;
}, "strip", z.ZodTypeAny, {
    epic: string;
    status: Status;
    type: "br";
    id: string;
    version: number;
    kind: "structural" | "operative";
    enforcement: "advisory" | "hard";
    goal_ids?: string[] | undefined;
    baseline?: string | undefined;
    supersedes?: string | undefined;
    superseded_by?: string | undefined;
    provenance?: "migrated" | undefined;
}, {
    epic: string;
    status: Status;
    type: "br";
    id: string;
    version: number;
    kind: "structural" | "operative";
    enforcement: "advisory" | "hard";
    goal_ids?: string[] | undefined;
    baseline?: string | undefined;
    supersedes?: string | undefined;
    superseded_by?: string | undefined;
    provenance?: "migrated" | undefined;
}>;
export declare const goalSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"goal">;
    title: z.ZodString;
    status: z.ZodEnum<["draft", "active", "achieved", "retired"]>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "active" | "retired" | "achieved";
    type: "goal";
    id: string;
    title: string;
}, {
    status: "draft" | "active" | "retired" | "achieved";
    type: "goal";
    id: string;
    title: string;
}>;
export declare const crImpactSchema: z.ZodUnion<[z.ZodObject<{
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
}>]>;
export type CrImpact = z.infer<typeof crImpactSchema>;
export declare const crSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"cr">;
    status: z.ZodEnum<["captured", "confirmed", "resolved"]>;
    entry_point: z.ZodOptional<z.ZodEnum<["vision", "requirement"]>>;
    entry_point_confirmed: z.ZodOptional<z.ZodBoolean>;
    impacts: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
    }>]>, "many">>;
    provenance: z.ZodOptional<z.ZodLiteral<"backfilled">>;
    spawned_from_bug: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "confirmed" | "captured" | "resolved";
    type: "cr";
    id: string;
    provenance?: "backfilled" | undefined;
    entry_point?: "vision" | "requirement" | undefined;
    entry_point_confirmed?: boolean | undefined;
    impacts?: ({
        amends: string;
    } | {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    })[] | undefined;
    spawned_from_bug?: string | undefined;
}, {
    status: "confirmed" | "captured" | "resolved";
    type: "cr";
    id: string;
    provenance?: "backfilled" | undefined;
    entry_point?: "vision" | "requirement" | undefined;
    entry_point_confirmed?: boolean | undefined;
    impacts?: ({
        amends: string;
    } | {
        epic: string;
        spawns: "fr" | "nfr" | "br";
        realized?: string | undefined;
    })[] | undefined;
    spawned_from_bug?: string | undefined;
}>;
export declare const wpSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"wp">;
    role: z.ZodEnum<["developer", "qa"]>;
    status: z.ZodEnum<["draft", "ready", "plan-approved", "accepted", "abandoned"]>;
    plan: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    status: "draft" | "ready" | "plan-approved" | "accepted" | "abandoned";
    type: "wp";
    id: string;
    role: "developer" | "qa";
    plan?: string | undefined;
}, {
    status: "draft" | "ready" | "plan-approved" | "accepted" | "abandoned";
    type: "wp";
    id: string;
    role: "developer" | "qa";
    plan?: string | undefined;
}>;
export declare const bugSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"bug">;
    status: z.ZodEnum<["open", "fixed", "wontfix", "duplicate"]>;
    severity: z.ZodString;
    affects: z.ZodArray<z.ZodString, "many">;
    reported: z.ZodString;
    reporter: z.ZodString;
    spawned_cr: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "open" | "fixed" | "wontfix" | "duplicate";
    type: "bug";
    id: string;
    severity: string;
    affects: string[];
    reported: string;
    reporter: string;
    spawned_cr?: string | undefined;
}, {
    status: "open" | "fixed" | "wontfix" | "duplicate";
    type: "bug";
    id: string;
    severity: string;
    affects: string[];
    reported: string;
    reporter: string;
    spawned_cr?: string | undefined;
}>;
export declare const epicSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<"epic">;
    title: z.ZodString;
    status: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: string;
    type: "epic";
    id: string;
    title: string;
}, {
    status: string;
    type: "epic";
    id: string;
    title: string;
}>;
export declare const schemas: Record<NodeType, z.ZodTypeAny>;
export declare const countersSchema: z.ZodObject<{
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
export declare const configSchema: z.ZodObject<{
    canon_roots: z.ZodArray<z.ZodString, "many">;
    link_root: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    canon_roots: string[];
    link_root?: string | undefined;
}, {
    canon_roots: string[];
    link_root?: string | undefined;
}>;
export declare const baselineManifestSchema: z.ZodObject<{
    id: z.ZodString;
    date: z.ZodString;
    wp_ids: z.ZodArray<z.ZodString, "many">;
    triggered_by: z.ZodString;
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodEffects<z.ZodString, string, string>;
        version: z.ZodNumber;
        content_hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        version: number;
        content_hash: string;
    }, {
        id: string;
        version: number;
        content_hash: string;
    }>, "many">;
    accepted_by: z.ZodString;
    verify_evidence_ref: z.ZodString;
}, "strip", z.ZodTypeAny, {
    date: string;
    id: string;
    wp_ids: string[];
    triggered_by: string;
    items: {
        id: string;
        version: number;
        content_hash: string;
    }[];
    accepted_by: string;
    verify_evidence_ref: string;
}, {
    date: string;
    id: string;
    wp_ids: string[];
    triggered_by: string;
    items: {
        id: string;
        version: number;
        content_hash: string;
    }[];
    accepted_by: string;
    verify_evidence_ref: string;
}>;
export declare const pendingMarkerSchema: z.ZodObject<{
    wpId: z.ZodString;
    baselineId: z.ZodString;
    deliveredIds: z.ZodArray<z.ZodEffects<z.ZodString, string, string>, "many">;
    date: z.ZodString;
    headCommit: z.ZodString;
    verifyEvidenceRef: z.ZodString;
}, "strip", z.ZodTypeAny, {
    date: string;
    wpId: string;
    baselineId: string;
    deliveredIds: string[];
    headCommit: string;
    verifyEvidenceRef: string;
}, {
    date: string;
    wpId: string;
    baselineId: string;
    deliveredIds: string[];
    headCommit: string;
    verifyEvidenceRef: string;
}>;
export declare const verifyEvidenceSchema: z.ZodObject<{
    wpId: z.ZodString;
    commit: z.ZodString;
    testRunHashes: z.ZodArray<z.ZodString, "many">;
    suites: z.ZodArray<z.ZodString, "many">;
    producedAt: z.ZodString;
    producedBy: z.ZodString;
    toolVersion: z.ZodString;
}, "strip", z.ZodTypeAny, {
    wpId: string;
    commit: string;
    testRunHashes: string[];
    suites: string[];
    producedAt: string;
    producedBy: string;
    toolVersion: string;
}, {
    wpId: string;
    commit: string;
    testRunHashes: string[];
    suites: string[];
    producedAt: string;
    producedBy: string;
    toolVersion: string;
}>;
export declare function validateFrontmatter(type: NodeType, fm: unknown): {
    ok: true;
    data: unknown;
} | {
    ok: false;
    issues: string[];
};
