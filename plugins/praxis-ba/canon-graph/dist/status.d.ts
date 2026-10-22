import type { Graph } from './graph.js';
export type MissingKind = 'requirement-without-ac' | 'requirement-unverifiable-ac' | 'requirement-not-linked-to-wp' | 'requirement-without-goal' | 'goal-without-requirements';
export type MissingItem = {
    kind: MissingKind;
    id: string;
    detail: string;
};
/** Structured missing items for the status rollup — not only counts. */
export declare function findMissingItems(graph: Graph): MissingItem[];
