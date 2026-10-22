import type { Graph } from './graph.js';
export type BugBodySections = {
    repro: string;
    expected: string;
    actual: string;
};
export declare function isCanonRequirementId(id: string): boolean;
export declare function parseBugBody(body: string): BugBodySections | {
    error: string;
};
export declare function existingRequirementIds(graph: Graph): Set<string>;
export declare function unresolvedAffects(affects: readonly string[], graph: Graph): string[];
export declare function assertBugCapture(input: {
    body: string;
    affects: readonly string[];
    graph: Graph;
}): BugBodySections;
