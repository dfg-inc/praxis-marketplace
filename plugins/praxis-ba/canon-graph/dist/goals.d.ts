import type { Graph } from './graph.js';
export type GoalsCheckResult = {
    /** FR/NFR/BR ids (non-retired) with empty/absent `goal_ids`. */
    requirementsWithoutGoals: string[];
    /** Goal ids (non-retired) that no requirement cites. */
    goalsWithoutRequirements: string[];
};
/** Lists requirements without goals and goals with zero linked requirements. */
export declare function checkGoals(graph: Graph): GoalsCheckResult;
