import type { Graph } from './graph.js';
/** Statuses at which an artefact is considered committed / frozen. */
export declare const COMMITTED_STATUSES: Set<string>;
export type SemanticFinding = {
    /** Stable check id for validate aggregation. */
    check: 'needs-clarification-committed' | 'nfr-catalogue-refs' | 'taxonomy-tags' | 'child-status-vs-epic' | 'markdown-links-resolve-semantic';
    severity: 'error' | 'warning';
    message: string;
};
export type SemanticLintResult = {
    findings: SemanticFinding[];
    errors: SemanticFinding[];
    warnings: SemanticFinding[];
    taxonomyPath: string | null;
    nfrCataloguePath: string | null;
};
/**
 * Run semantic checks 1–5 against the live graph corpus.
 */
export declare function runSemanticLint(repo: string, graph: Graph): SemanticLintResult;
/** Aggregate semantic findings into validate check rows. */
export declare function semanticLintToChecks(result: SemanticLintResult): Array<{
    name: string;
    ok: boolean;
    reason: string;
    severity?: 'advisory';
}>;
