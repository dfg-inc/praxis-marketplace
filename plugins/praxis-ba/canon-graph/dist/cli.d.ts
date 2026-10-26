import type { Check } from './types.js';
export type CliJson = {
    id?: string;
    path?: string;
    /** Machine handoff path when a verb emits one (e.g. ba.architect.handoff). */
    handoffPath?: string;
    verdict: 'VERIFY-OK' | 'VERIFY-FAIL';
    checks: Check[];
    surface?: unknown;
    warnings?: unknown;
    /** `init` only: repo-relative paths created (or, with --dry-run, that would be created), and left untouched. */
    created?: string[];
    skipped?: string[];
    dryRun?: boolean;
    next?: string[];
};
export type CliResult = {
    code: number;
    json: CliJson;
};
/** Thin dispatch: parse flags with `node:util`'s `parseArgs`, switch on
 * `cmd(+sub)`, delegate to one library function per verb, map the result to
 * `{code, json}`. `opts.repo` lets tests skip threading `--repo` through
 * every `argv` array; real CLI use always supplies `--repo` in `argv`
 * itself. Never throws — every path returns a `CliResult`. */
export declare function runCli(argv: readonly string[], opts?: {
    repo?: string;
}): Promise<CliResult>;
