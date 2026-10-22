// ---- graph.ts: the typed RTM graph (design spec §4.1 `graph`) — backlinks,
// orphans, dangling refs, WP closure, FR→CR reachability, and the derived
// CR-spawned-set, all computed from a page corpus's *forward* typed refs.
//
// Q4 invariant this whole module rests on: backlinks/spawned-sets are never
// read from a stored field — they are reverse-walked from the forward refs
// every page already declares (`traces_to`, `enforces`, `references_nfr` on
// FR; `traces_to` on NFR; a WP's `## Scope` body links, Task 3/4). Pure — no
// IO; callers parse pages (parse.ts) and pass the result in.
//
// v3 (Task 4): a WP's FR/NFR/BR scope no longer lives in frontmatter
// (`fr_ids`/`extra_brs`/`extra_nfrs`, retired by schema.ts's wpSchema
// slim-down) — it lives in the page BODY's machine-readable `## Scope`
// section, parsed once per WP via scopelinks.ts's `parseScope` and exposed
// both as the raw `wpScope`/`wpDelivers` queries and folded into `closure`
// exactly as the old frontmatter fields were. `crImpacts`/`crAmendRealized`
// are new CR-side queries: a CR's typed `impacts` set (schema.ts's
// `CrImpact`, Task 1) and whether a given impact has actually been
// "realized" — the target requirement exists AND its own `## History`
// records this CR (history.ts's `historyCrRefs`, Task 2).
//
// Scope note: `related` (FR/NFR), `verified_by` (NFR) and `affects` (BUG) are
// deliberately excluded from the edge set this module resolves — schema.ts
// (Task 2) leaves them as untyped `z.array(z.string())`, not constrained to
// any single id-namespace by regex, so they are informational free-form
// mentions rather than a strict dependency edge a "dangling ref" check could
// meaningfully validate. Only the FR/NFR typed-ref fields plus a WP's Scope
// links make up the "typed refs" this graph resolves.
import { naturalCompare } from './serialize.js';
import { parseScope } from './scopelinks.js';
import { historyCrRefs } from './history.js';
const NODE_TYPES = new Set([
    'vision',
    'fr',
    'nfr',
    'br',
    'cr',
    'wp',
    'bug',
    'epic',
    'goal',
]);
// Recovers the NodeType discriminant from an already-validated (but
// statically `unknown`) frontmatter value — every schema in schema.ts
// requires a `type: z.literal(...)` field, so this is always present on a
// page that passed `parsePage`. Anything else (malformed input, or `vision`
// pages which carry no `id`) is simply not part of the id-indexed graph.
function nodeTypeOf(fm) {
    if (typeof fm !== 'object' || fm === null || !('type' in fm))
        return undefined;
    const t = fm.type;
    return typeof t === 'string' && NODE_TYPES.has(t) ? t : undefined;
}
function idOf(fm) {
    if (typeof fm !== 'object' || fm === null || !('id' in fm))
        return undefined;
    const id = fm.id;
    return typeof id === 'string' ? id : undefined;
}
export function buildGraph(pages, paths) {
    const epics = [];
    const frs = [];
    const nfrs = [];
    const brs = [];
    const crs = [];
    const wps = [];
    const bugs = [];
    const goals = [];
    // Task 4: id -> its CANON-RELATIVE path, populated only when the caller
    // supplies `paths` (`writer.ts`'s `loadGraph` always does; a hand-built
    // test corpus may omit it entirely, in which case `pathOf` resolves
    // nothing for anyone — no silent partial population from a mixed corpus).
    const pathIndex = new Map();
    for (const page of pages) {
        const type = nodeTypeOf(page.frontmatter);
        switch (type) {
            case 'epic':
                epics.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'fr':
                frs.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'nfr':
                nfrs.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'br':
                brs.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'cr':
                crs.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'wp':
                wps.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'bug':
                bugs.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            case 'goal':
                goals.push({ frontmatter: page.frontmatter, body: page.body });
                break;
            default:
                // 'vision' (no id) or an unrecognized/malformed frontmatter shape:
                // not part of the id-indexed graph.
                break;
        }
        if (type !== undefined && paths) {
            const path = paths.get(page);
            const id = idOf(page.frontmatter);
            if (path !== undefined && id !== undefined)
                pathIndex.set(id, path);
        }
    }
    // ---- id existence index (every id-bearing node type) ----
    const idIndex = new Set();
    for (const n of epics)
        idIndex.add(n.frontmatter.id);
    for (const n of frs)
        idIndex.add(n.frontmatter.id);
    for (const n of nfrs)
        idIndex.add(n.frontmatter.id);
    for (const n of brs)
        idIndex.add(n.frontmatter.id);
    for (const n of crs)
        idIndex.add(n.frontmatter.id);
    for (const n of wps)
        idIndex.add(n.frontmatter.id);
    for (const n of bugs)
        idIndex.add(n.frontmatter.id);
    for (const n of goals)
        idIndex.add(n.frontmatter.id);
    // ---- forward edges: the core typed-ref graph (see file header for the
    // scope note on why `related`/`verified_by`/`affects` are excluded) ----
    const edges = [];
    for (const fr of frs) {
        for (const to of fr.frontmatter.traces_to)
            edges.push({ from: fr.frontmatter.id, to });
        for (const to of fr.frontmatter.enforces)
            edges.push({ from: fr.frontmatter.id, to });
        for (const to of fr.frontmatter.references_nfr)
            edges.push({ from: fr.frontmatter.id, to });
        for (const to of fr.frontmatter.goal_ids ?? [])
            edges.push({ from: fr.frontmatter.id, to });
    }
    for (const nfr of nfrs) {
        for (const to of nfr.frontmatter.traces_to)
            edges.push({ from: nfr.frontmatter.id, to });
        for (const to of nfr.frontmatter.goal_ids ?? [])
            edges.push({ from: nfr.frontmatter.id, to });
    }
    for (const br of brs) {
        for (const to of br.frontmatter.goal_ids ?? [])
            edges.push({ from: br.frontmatter.id, to });
    }
    // v3 (Task 4): a WP's forward edges come from its body's `## Scope` links
    // (all four buckets), NOT frontmatter — `fr_ids`/`extra_brs`/`extra_nfrs`
    // no longer exist on wpSchema at all. Parsed once here and memoized.
    const scopeByWp = new Map();
    for (const wp of wps) {
        const scope = parseScope(wp.body);
        scopeByWp.set(wp.frontmatter.id, scope);
        for (const ref of [...scope.crs, ...scope.frs, ...scope.nfrs, ...scope.brs]) {
            edges.push({ from: wp.frontmatter.id, to: ref.id });
        }
    }
    // ---- reverse index — DERIVED from the forward edges above, never a
    // stored field (Q4). This is the whole of `backlinks`'s implementation. ----
    const reverse = new Map();
    for (const { from, to } of edges) {
        const existing = reverse.get(to);
        if (existing)
            existing.push(from);
        else
            reverse.set(to, [from]);
    }
    const frById = new Map(frs.map((fr) => [fr.frontmatter.id, fr]));
    const nfrById = new Map(nfrs.map((nfr) => [nfr.frontmatter.id, nfr]));
    const brById = new Map(brs.map((br) => [br.frontmatter.id, br]));
    const crById = new Map(crs.map((cr) => [cr.frontmatter.id, cr]));
    const wpById = new Map(wps.map((wp) => [wp.frontmatter.id, wp]));
    function wpScope(wpId) {
        return scopeByWp.get(wpId) ?? { crs: [], frs: [], nfrs: [], brs: [], errors: [`wpScope: unknown WP id '${wpId}'`] };
    }
    return {
        epics,
        frs,
        nfrs,
        brs,
        crs,
        wps,
        bugs,
        goals,
        backlinks(id) {
            const sources = reverse.get(id) ?? [];
            return [...new Set(sources)].sort(naturalCompare);
        },
        orphans() {
            return frs
                .filter((fr) => fr.frontmatter.traces_to.length === 0)
                .map((fr) => fr.frontmatter.id)
                .sort(naturalCompare);
        },
        danglingRefs() {
            return edges
                .filter(({ to }) => {
                if (idIndex.has(to))
                    return false;
                // Project-catalogue NFR ids are not graph nodes.
                if (/^[A-Z][A-Z0-9]{1,9}-NFR-\d{3}$/.test(to) && !/^E\d+-NFR\d+$/.test(to)) {
                    return false;
                }
                return true;
            })
                .sort((a, b) => naturalCompare(a.from, b.from) || naturalCompare(a.to, b.to));
        },
        closure(wpId) {
            const wp = wpById.get(wpId);
            if (!wp)
                return { frs: [], nfrs: [], brs: [] };
            const scope = scopeByWp.get(wpId); // populated 1:1 with `wps` above
            const nfrSet = new Set(scope.nfrs.map((r) => r.id));
            const brSet = new Set(scope.brs.map((r) => r.id));
            const frIds = scope.frs.map((r) => r.id);
            for (const frId of frIds) {
                const fr = frById.get(frId);
                if (!fr)
                    continue; // a dangling Delivers ref: no enforces/references_nfr to fold in
                for (const br of fr.frontmatter.enforces)
                    brSet.add(br);
                for (const nfr of fr.frontmatter.references_nfr) {
                    // Only canon NFR nodes participate in closure status checks.
                    if (/^E\d+-NFR\d+$/.test(nfr))
                        nfrSet.add(nfr);
                }
            }
            return {
                // Deliberately NOT deduped (matches the pre-v3 `fr_ids` behavior) —
                // writer.ts's `accept()` relies on collapsing duplicates itself via
                // its own `Set`, not on this method doing so.
                frs: [...frIds].sort(naturalCompare),
                nfrs: [...nfrSet].sort(naturalCompare),
                brs: [...brSet].sort(naturalCompare),
            };
        },
        crSpawned(crId) {
            const ids = [];
            for (const fr of frs)
                if (fr.frontmatter.traces_to.includes(crId))
                    ids.push(fr.frontmatter.id);
            for (const nfr of nfrs)
                if (nfr.frontmatter.traces_to.includes(crId))
                    ids.push(nfr.frontmatter.id);
            return [...new Set(ids)].sort(naturalCompare);
        },
        frReachesCr(frId) {
            const fr = frById.get(frId);
            if (!fr)
                return false;
            return fr.frontmatter.traces_to.some((cr) => idIndex.has(cr));
        },
        pathOf(id) {
            return pathIndex.get(id);
        },
        wpScope,
        wpDelivers(wpId) {
            return wpScope(wpId).frs.map((r) => r.id).sort(naturalCompare);
        },
        crImpacts(crId) {
            return crById.get(crId)?.frontmatter.impacts ?? [];
        },
        crAmendRealized(crId, reqId) {
            const target = frById.get(reqId) ?? nfrById.get(reqId) ?? brById.get(reqId);
            if (!target || target.frontmatter.status !== 'baselined')
                return false;
            return historyCrRefs(target.body).includes(crId);
        },
        goalRequirements(goalId) {
            const ids = [];
            for (const fr of frs)
                if ((fr.frontmatter.goal_ids ?? []).includes(goalId))
                    ids.push(fr.frontmatter.id);
            for (const nfr of nfrs)
                if ((nfr.frontmatter.goal_ids ?? []).includes(goalId))
                    ids.push(nfr.frontmatter.id);
            for (const br of brs)
                if ((br.frontmatter.goal_ids ?? []).includes(goalId))
                    ids.push(br.frontmatter.id);
            return [...new Set(ids)].sort(naturalCompare);
        },
    };
}
