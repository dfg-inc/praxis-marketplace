import type { Graph, GraphNode } from './graph.js';
import type { CrImpact } from './schema.js';
export type RequirementNode = GraphNode<'fr'> | GraphNode<'nfr'> | GraphNode<'br'>;
/** Builds the `nodeOf` lookup this module's predicate needs from a `Graph`'s
 * (or graph-shaped) fr/nfr/br node lists — exported (Task 8) so `validate`
 * (cli.ts) can build the SAME index once for its own corpus-wide
 * `cr-impacts-consistent` check rather than re-deriving the fr/nfr/br `Map`s
 * itself. */
export declare function requirementNodeIndex(graph: Pick<Graph, 'frs' | 'nfrs' | 'brs'>): (id: string) => RequirementNode | undefined;
/** The CR resolution predicate itself (file header): every impact of `crId`
 * is provably delivered against `nodeOf` (built by `requirementNodeIndex`
 * above). Exported (Task 8) so `validate`'s `cr-impacts-consistent` check can
 * assert a `resolved` CR actually satisfies this — the SAME rule
 * `reconcileCrs` uses to flip a CR to `resolved` in the first place, not a
 * hand-duplicated copy that could drift from it. Vacuously `true` on an empty
 * `impacts` array — callers that mean "nothing declared, nothing to
 * resolve" (this module's own `reconcileCrs`) check `impacts.length === 0`
 * themselves before calling this, exactly as before.
 *
 * `backfilled` (Task 9b) — pass `cr.frontmatter.provenance === 'backfilled'`
 * — SKIPS the evidentiary half of each rule (the amends branch's
 * History-citation check, the spawn branch's traces_to-inclusion check) that
 * a migration-reconstructed CR can never satisfy by design (file header).
 * The `baselined`-status check is never skipped, for either branch: it's
 * read live off the target, not something the migration would have had to
 * fabricate. */
export declare function crImpactsDelivered(nodeOf: (id: string) => RequirementNode | undefined, crId: string, impacts: readonly CrImpact[], backfilled: boolean): boolean;
/**
 * Resolves each `crId` in `affectedCrIds` whose OWN typed `impacts` set
 * (schema.ts's `CrImpact`) is non-empty and every entry of which is
 * provably delivered (see file header for the full amends/spawns
 * predicate).
 *
 * A CR with an EMPTY (or absent) `impacts` array is left alone — v3's
 * "nothing declared, nothing to resolve" posture (never vacuously true off
 * an empty set). Already-`resolved` CRs and a `crId` that doesn't resolve to
 * a real page are no-ops too (idempotent — safe to call again with the same
 * ids, e.g. from `accept`'s own crash-resume path).
 *
 * `date` (YYYYMMDD) is validated for shape here but not currently persisted
 * anywhere — `schema.ts`'s CR frontmatter has no `resolved_at`-style field
 * today. It's part of the pinned interface (mirroring every other
 * date-taking function in this package's determinism convention: never read
 * the clock) so a future audit-stamp can be added without a signature
 * change.
 */
export declare function reconcileCrs(repo: string, affectedCrIds: readonly string[], date: string): void;
