export type OnePagerOk = {
    ok: true;
    markdown: string;
    sourcePath: string;
    outPath: string;
};
export type OnePagerFail = {
    ok: false;
    error: string;
};
export type OnePagerResult = OnePagerOk | OnePagerFail;
/** Raw Acceptance Criteria section body, preserving source AC text. */
export declare function extractAcceptanceCriteriaSource(body: string): string;
/** Build the one-pager markdown without writing. Does not touch the FR file. */
export declare function buildOnePager(repo: string, id: string): OnePagerResult;
export declare function writeOnePager(repo: string, id: string, outPath?: string): OnePagerResult;
