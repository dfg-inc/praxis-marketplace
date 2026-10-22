import type { z } from 'zod';
import { type ParsedScope } from './scopelinks.js';
import type { visionSchema, frSchema, nfrSchema, brSchema, crSchema, wpSchema, bugSchema, epicSchema, goalSchema, CrImpact } from './schema.js';
import type { ParsedPage } from './parse.js';
import type { NodeType } from './types.js';
export type FrontmatterFor<T extends NodeType> = T extends 'vision' ? z.infer<typeof visionSchema> : T extends 'fr' ? z.infer<typeof frSchema> : T extends 'nfr' ? z.infer<typeof nfrSchema> : T extends 'br' ? z.infer<typeof brSchema> : T extends 'cr' ? z.infer<typeof crSchema> : T extends 'wp' ? z.infer<typeof wpSchema> : T extends 'bug' ? z.infer<typeof bugSchema> : T extends 'epic' ? z.infer<typeof epicSchema> : T extends 'goal' ? z.infer<typeof goalSchema> : never;
export type GraphNode<T extends NodeType> = {
    frontmatter: FrontmatterFor<T>;
    body: string;
};
export type DanglingRef = {
    from: string;
    to: string;
};
export type Closure = {
    frs: string[];
    nfrs: string[];
    brs: string[];
};
export type Graph = {
    readonly epics: readonly GraphNode<'epic'>[];
    readonly frs: readonly GraphNode<'fr'>[];
    readonly nfrs: readonly GraphNode<'nfr'>[];
    readonly brs: readonly GraphNode<'br'>[];
    readonly crs: readonly GraphNode<'cr'>[];
    readonly wps: readonly GraphNode<'wp'>[];
    readonly bugs: readonly GraphNode<'bug'>[];
    readonly goals: readonly GraphNode<'goal'>[];
    /** Every id that points AT `id` via a typed ref, reverse-walked (never stored), naturally sorted. */
    backlinks(id: string): string[];
    /** FR ids with an empty `traces_to`, naturally sorted. */
    orphans(): string[];
    /** Every typed-ref edge whose target id doesn't resolve to a real node, sorted by (from, to). */
    danglingRefs(): DanglingRef[];
    /** A WP's delivered-set closure: its Scope `### Delivers` FR ids + those FRs'
     * `enforces`/`references_nfr` + its own Scope `### Constraints` NFR/BR ids. */
    closure(wpId: string): Closure;
    /** A CR's spawned-set, derived by reverse-walking every FR/NFR's `traces_to` — never a stored field. */
    crSpawned(crId: string): string[];
    /** Whether a FR's `traces_to` resolves to at least one CR that actually exists in this graph. */
    frReachesCr(frId: string): boolean;
    /** The CANON-RELATIVE path (e.g. `cr/CR-015.md`) a node's id was loaded from,
     * when `buildGraph`'s caller supplied a `paths` map — `undefined` otherwise
     * (including for any id `paths` didn't cover). */
    pathOf(id: string): string | undefined;
    /** The memoized parse of a WP's body `## Scope` section (scopelinks.ts's
     * `parseScope`) — an empty `ParsedScope` carrying an error is returned for
     * an unknown `wpId`, never a throw. */
    wpScope(wpId: string): ParsedScope;
    /** A WP's Scope `### Delivers` FR ids, natural-sorted — replaces every old
     * `wp.frontmatter.fr_ids` read (v3, Task 4). */
    wpDelivers(wpId: string): string[];
    /** A CR's typed impact set (schema.ts's `CrImpact`, Task 1) — `cr.frontmatter.impacts ?? []`. */
    crImpacts(crId: string): CrImpact[];
    /** Whether `reqId` (a FR/NFR/BR) both exists in this graph, is `baselined`,
     * AND its own `## History` records an entry citing `crId` (history.ts's
     * `historyCrRefs`, depth-relaxed so a demoted/nested citation from an
     * earlier bump still counts — finding #3/#6) — mirrors `reconcile.ts`'s
     * OWN `amends`-impact delivered rule (`crImpactsDelivered`) exactly, so
     * this query and that predicate never drift apart (finding #24). */
    crAmendRealized(crId: string, reqId: string): boolean;
    /** Requirement ids (FR/NFR/BR) that declare `goalId` in `goal_ids` — reverse-
     * walked, never stored on the goal page (WBS 1.11). */
    goalRequirements(goalId: string): string[];
};
export declare function buildGraph(pages: ParsedPage[], paths?: ReadonlyMap<ParsedPage, string>): Graph;
