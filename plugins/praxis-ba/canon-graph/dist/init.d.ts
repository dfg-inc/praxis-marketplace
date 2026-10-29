export type InitOptions = {
    /** Compute and report the plan; write nothing. */
    dryRun?: boolean;
    /** Product name; becomes the heading of the draft vision. */
    product?: string;
    /** Title of a first epic, minted through `addEpic` (only when the canon has no epics yet). */
    epic?: string;
};
export type InitResult = {
    repo: string;
    dryRun: boolean;
    /** Repo-relative paths created (or, in a dry run, that would be created). Folders end with `/`. */
    created: string[];
    /** Repo-relative paths that already existed and were left untouched. */
    skipped: string[];
    /** The first epic, when `epic` was given and created (in a dry run: the predicted id). */
    epic?: {
        id: string;
        path: string;
    };
    /** Human-readable notes (e.g. why the epic was not created). */
    notes: string[];
    /** Suggested next steps. */
    next: string[];
};
/** The folders a canon root carries. The engine tolerates their absence; they are created so the layout is visible. */
export declare const CANON_FOLDERS: readonly string[];
/** Longest product name init accepts (it becomes the vision heading). */
export declare const MAX_PRODUCT_LENGTH = 120;
export declare function initCanon(repoInput: string, options?: InitOptions): Promise<InitResult>;
