import type { NodeType } from './types.js';
/**
 * Canonicalizes one page string: `parsePage` then `emitPage`, nothing else.
 * Idempotent — a second pass over already-canonical text is a no-op,
 * because `emitPage`'s own output re-parses to the identical frontmatter +
 * body it was built from. The body is passed through exactly as `parsePage`
 * hands it back: opaque, verbatim, never reflowed or re-parsed.
 *
 * Throws if `raw` fails to parse/validate under `type` (a `parsePage`
 * `{error}`) — surfacing that error rather than emitting garbage, per the
 * task brief's own guardrail.
 */
export declare function formatText(raw: string, type: NodeType): string;
export type FormatFileResult = {
    changed: boolean;
};
/**
 * Reads `path`, infers its node type from frontmatter alone, canonicalizes
 * via `formatText`, and atomic-writes back ONLY if the canonical bytes
 * differ from what's on disk — `changed` reflects exactly that comparison.
 *
 * `repo` is accepted (mirroring both the task's pinned `(repo, path)`
 * interface and every writer.ts mutator's `(repo, ...)` convention) but is
 * NOT used to resolve `path`: `path` is expected already-resolved (absolute,
 * or relative to the process's cwd) — exactly what this CLI's other
 * path-taking flags (`--body-file`/`--plan`/`--evidence`) already expect,
 * and exactly what `cli.ts`'s `--repo` canon walker already hands back.
 * Re-joining `path` against `repo` here would double-prefix a walked path
 * whenever `--repo` itself was given as a relative directory.
 */
export declare function formatFile(repo: string, path: string): FormatFileResult;
