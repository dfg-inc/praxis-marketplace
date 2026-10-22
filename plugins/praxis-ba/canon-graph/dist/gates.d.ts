import type { z } from 'zod';
import type { Graph } from './graph.js';
import { verifyEvidenceSchema } from './schema.js';
import type { Verdict } from './types.js';
export type VerifyEvidence = z.infer<typeof verifyEvidenceSchema>;
/** File-relative Scope href from a WP page to a target page (POSIX). */
export declare function expectedScopeHref(wpRelPath: string, targetRelPath: string): string;
/** `wp-scope-links`: every ref across all four Scope buckets must (a) carry
 * no `parseScope` grammar error, (b) resolve to a real node in the graph,
 * (c) declare a **file-relative** `path` matching {@link expectedScopeHref}
 * from the WP index, and (d) — when a `#anchor` is present — name a heading
 * that actually exists on the target page.
 *
 * `linkRoot` is retained for call-site compatibility but unused for path
 * matching — repo-root `link_root/...` hrefs break under `wp/<id>/`. */
export declare function scopeLinkIssues(graph: Graph, wpId: string, _linkRoot?: string): string[];
/** `wp-scope-version-current`: a version-stamped Scope link (`[id vN](...)`)
 * must match the target's CURRENT `frontmatter.version`. CR refs never carry
 * a version stamp (crSchema has no `version` field at all) — `parseScope`
 * accepts the `vN` grammar structurally regardless of bucket, so a version
 * on a CR ref is flagged here, not at parse time. */
export declare function scopeVersionIssues(graph: Graph, wpId: string): string[];
export declare function definitionOfReady(graph: Graph, wpId: string, visionConfirmed: boolean, opts: {
    linkRoot: string;
}): Verdict;
export declare function acceptGate(graph: Graph, wpId: string, visionConfirmed: boolean, evidence: VerifyEvidence, headCommit: string): Verdict;
