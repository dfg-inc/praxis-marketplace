import { type Graph } from './graph.js';
import { type VerifyEvidence } from './gates.js';
import { type CrImpact } from './schema.js';
import type { Status, Verdict } from './types.js';
/** Exported (unlike its sibling path helpers) because `reconcile.ts` needs it
 * to write a CR's `resolved` transition — `accept`'s own `import()` of
 * `reconcile.js` is dynamic specifically so `reconcile.ts` can statically
 * import THIS file without a circular top-level dependency (see this file's
 * header and `reconcile.ts`'s own header for the full rationale). */
export declare function crPath(repo: string, id: string): string;
/** Exported (like `crPath`) — `cli.ts` imports this rather than keeping its
 * own private copy (Task 5's WP-path seam). v3: folder-per-item, matching
 * `epics/E{n}-slug/index.md`'s shape — `wp/<id>/index.md`, not a flat
 * `wp/<id>.md` file. */
export declare function wpPath(repo: string, id: string): string;
/** Kebab-cases an epic title for its directory slug (`E{n}-slug/`, §6.8).
 * Never throws on pathological input (all-punctuation title, etc.) — falls
 * back to the literal `epic` slug rather than minting a directory with an
 * empty/malformed name segment. */
export declare function slugify(title: string): string;
/** Exported for `reconcile.ts` — see `crPath`'s doc comment for why that
 * module needs a direct, non-circular import of writer.ts's own primitives
 * rather than re-implementing them. */
export declare function atomicWrite(path: string, content: string): void;
export type AddRequirementInput = {
    epic: string;
    type: 'fr';
    body: string;
    refs?: {
        tracesTo?: string[];
        enforces?: string[];
        referencesNfr?: string[];
        related?: string[];
    };
} | {
    epic: string;
    type: 'nfr';
    body: string;
    refs?: {
        tracesTo?: string[];
        verifiedBy?: string[];
        related?: string[];
    };
} | {
    epic: string;
    type: 'br';
    body: string;
    refs?: {
        kind?: 'structural' | 'operative';
        enforcement?: 'advisory' | 'hard';
    };
};
export type AddRequirementResult = {
    id: string;
    path: string;
};
/** Mints an FR/NFR/BR under `epic` (via `ids.ts`'s per-epic counter), writes
 * `status: draft`, `version: 1`. A malformed `epic` id is rejected before
 * minting; an `epic` that mints fine but has no directory on disk yet burns
 * the id and throws on write — the same "gaps allowed, reuse forbidden"
 * failure mode `ids.ts` documents for any post-mint write failure. */
export declare function addRequirement(repo: string, input: AddRequirementInput): Promise<AddRequirementResult>;
export type EditRequirementInput = {
    id: string;
    body: string;
    cr?: string;
    activate?: boolean;
    /** Required (throws if omitted) only when a `cr`-driven edit actually bumps
     * (`shouldBump` true) — v3 (Task 5): that's ANY `cr` edit that changes
     * content, active or baselined alike, not just a baselined one. It feeds
     * the `## History` entry's `{date}` segment. Never read from the clock
     * (determinism, file header); not in the brief's terse interface line but
     * required by its own "dates are injected params" constraint. */
    date?: string;
};
export type EditRequirementResult = {
    id: string;
    path: string;
    bumped: boolean;
};
/** In-place edit of an FR/NFR/BR body.
 *
 * **v3 (Task 5): the CR-driven version bump is UNIVERSAL, not baselined-only**
 * — `--cr` is now legal against BOTH an `active` item and a `baselined` one
 * (previously only the latter). Passing `cr` always means "this edit is a
 * CR-driven amendment": it requires the CR to be `confirmed`
 * (`assertConfirmedCr`), it requires the edit to actually change content
 * (`shouldBump` — a no-op `--cr` edit is rejected outright, since a CR-driven
 * edit that changes nothing can't be a real amendment), and on a genuine
 * change it archives the PRIOR body verbatim into `## History`
 * (`archiveIntoHistory`), increments `version`, and — for an FR/NFR — appends
 * `cr` to `traces_to` (deduped, so re-amending the same item against the same
 * CR twice doesn't duplicate the ref). The `## History` heading always cites
 * the CR id (`formatHistoryHeading(oldVersion, date, cr)`), never the item's
 * `baseline:` field — which itself stays completely untouched by a bump (a
 * supersede/split, out of this function's scope, is the only thing that ever
 * changes `baseline:`). `cr` is illegal against a `draft` item outright (draft
 * authoring is free-form; a CR-driven edit there would fabricate an
 * amendment that never happened), and mandatory (throws if omitted) against a
 * `baselined` item (the v2 rule, unchanged). A non-CR edit of an `active` or
 * `draft` item remains completely free-form, exactly as before: rewritten in
 * place with no version bump, ever. `batched`/`superseded`/`retired` sources
 * and an `activate` on anything but `draft` are rejected outright (illegal
 * transitions, per the task's global constraint).
 *
 * **Reconcile trigger (gap fix, post-Task-6):** an `{amends: id}` impact is
 * REALIZED the instant the CR-cited bump lands on a page that is ALREADY
 * `baselined` — so once the write above succeeds, if this edit actually
 * bumped (`bumped === true`) AND the item's status AT ENTRY was `baselined`
 * AND a `cr` was given, this function fires `reconcileCrs(repo, [cr],
 * bumpDate)` itself (dynamic `import('./reconcile.js')`, the exact pattern
 * `accept` uses — see that function's own doc comment for why the import is
 * dynamic). Without this, a CR whose ONLY impact is an amend of an
 * already-baselined item would never auto-resolve: nothing about a bare
 * `editRequirement` bump on a baselined page routes through `accept`, which
 * was previously reconcile's one and only caller. A bump on an `active`
 * item deliberately does NOT fire reconcile here — an amend isn't
 * "delivered" yet while its target is still active (`reconcileCrs`'s own
 * predicate requires `baselined`); that item's eventual `accept` is what
 * reconciles the CR later, same as any other batched item. */
export declare function editRequirement(repo: string, input: EditRequirementInput): Promise<EditRequirementResult>;
export type RetireRequirementResult = {
    id: string;
    path: string;
};
/** Soft-retire: `status: retired` (terminal). Delegates to `setStatus` so
 * the legal-transition matrix lives in exactly one place. */
export declare function retireRequirement(repo: string, id: string): Promise<RetireRequirementResult>;
export type AddEpicResult = {
    id: string;
};
/** Mints `E#` and writes `epics/E#-slug/index.md` from a minimal template
 * (`status: active`, empty body — the brief's interface takes only a
 * `title`, no body/description param). */
export declare function addEpic(repo: string, title: string): Promise<AddEpicResult>;
export type SetStatusResult = {
    id: string;
    path: string;
};
/** Generic validated status transition for an FR/NFR/BR (the unified §7
 * enum) — the one place `LEGAL_TRANSITIONS` is enforced against live canon.
 * Body is untouched; only `status` changes. */
export declare function setStatus(repo: string, id: string, status: Status): Promise<SetStatusResult>;
export type SetVisionConfirmedResult = {
    path: string;
};
/** Sets `product/vision.md` `status: confirmed`, `confirmed_at: date`,
 * `confirmed_by: by`. `date` is a 3rd, explicit param beyond the brief's
 * `(repo, by)` line, for the same determinism reason as `editRequirement`'s
 * `date` — `confirmed_at` cannot be stamped without SOME date, and this
 * module never reads the clock. Rejects re-confirming an already-confirmed
 * vision (no legal transition back to `draft` exists, so `confirmed` is
 * terminal here too). */
export declare function setVisionConfirmed(repo: string, by: string, date: string): Promise<SetVisionConfirmedResult>;
/** Builds a `Graph` from every parseable `.md` page under `repo`'s canon
 * roots (`fs.ts`'s `walkCanonFiles` — scoped to `<repo>/.ba/config.yaml`'s
 * `canon_roots` when present, else the whole repo minus `.ba/`+
 * `baselines/`, the original pre-scoping default). A page whose `type`
 * doesn't resolve to a known `NodeType`, or that fails `parsePage`'s schema
 * validation, is silently skipped — the same tolerance `graph.ts`'s own
 * `nodeTypeOf` already has for an unrecognized/malformed frontmatter shape.
 * Validating the WHOLE corpus end-to-end is `validate`'s job (Task 12), not
 * this loader's — `accept`/`reconcileCrs` only need the ids relevant to a
 * given WP/CR to resolve correctly, and a malformed unrelated page simply
 * won't resolve (surfacing as "not found" wherever it's looked up, same as
 * any other missing id).
 *
 * v3 (Task 4): also builds the `paths` map `buildGraph`'s second argument
 * takes — each page's CANON-RELATIVE path (`relative(repo, file)`, separators
 * normalized to `/` so a Windows-run CLI still produces the POSIX-style paths
 * a WP's `## Scope` links use), keyed by the exact `ParsedPage` object pushed
 * into `pages` — so `graph.pathOf(id)` resolves for every page this loader
 * reads. */
export declare function loadGraph(repo: string): Graph;
export type ConfirmCrInput = {
    crId: string;
    entry: 'vision' | 'requirement';
    impacts?: CrImpact[];
};
export type ConfirmCrResult = {
    id: string;
    path: string;
};
/** The CR entry-point human gate (design spec §7's "confirm CR entry-point"):
 * flips a `captured` CR to `confirmed`, stamping `entry_point`,
 * `entry_point_confirmed: true`, and (for `entry: 'requirement'`) its typed
 * `impacts` set (schema.ts's `CrImpact`, Task 1).
 *
 * Requires the CR to be `captured` (the one legal source state — confirming
 * an already-`confirmed`/`resolved` CR, or one that doesn't exist, throws).
 * `entry: 'requirement'` requires a NON-EMPTY `impacts` array, each entry
 * resolving against a FRESH `loadGraph(repo)` read: an `amends` impact's id
 * must already exist as a FR/NFR/BR; a `spawns` impact's `epic` must already
 * exist. `entry: 'vision'` is the inverse — `impacts` must be absent or
 * empty (a vision-level CR amends/spawns nothing yet; that's what
 * `entry: 'requirement'` is for). Neither branch inspects `realized` — a
 * spawn's realized id is stamped later, by `realizeCrSpawn`, once the actual
 * page has been minted. */
export declare function confirmCr(repo: string, input: ConfirmCrInput): Promise<ConfirmCrResult>;
export type RealizeCrSpawnInput = {
    crId: string;
    epic: string;
    type: 'fr' | 'nfr' | 'br';
    newId: string;
};
export type RealizeCrSpawnResult = {
    id: string;
    path: string;
};
/** Stamps `realized: newId` on a CR's FIRST un-realized `{spawns: type, epic}`
 * impact entry — the follow-up to `confirmCr`'s `entry: 'requirement'`
 * spawns, run once the actual FR/NFR/BR page for that spawn has been minted
 * (`addRequirement`) elsewhere. "First" matters when a CR spawns more than
 * one item of the same `{type, epic}` shape: each `realizeCrSpawn` call
 * claims the next still-un-realized one, in the impact array's own order —
 * never re-stamps an already-`realized` entry.
 *
 * Throws if no impact entry matches `{spawns: type, epic}` with `realized`
 * still unset. Otherwise validates `newId` against a fresh `loadGraph(repo)`:
 * the page must exist as the right node type, and — for `fr`/`nfr` (a `br`
 * has no `traces_to` field to check) — its `traces_to` must already include
 * `crId`, proving the amendment actually landed before the CR's own record of
 * it is stamped.
 *
 * Three additional write-time guards (findings #4/#5/#8) close gaps a
 * one-shot migration backfill (which bypasses this function entirely) could
 * otherwise leave uncaught:
 *   - #4: `newId` may not ALREADY be the `realized` value of some OTHER
 *     impact entry on this same CR — the same real page can't double-count
 *     as two distinct declared spawns.
 *   - #5: `newId`'s own id-shape (`FR_ID`/`NFR_ID`/`BR_ID`) must match `type`
 *     (equivalently, the impact's own `spawns` field, since `idx` above only
 *     ever matches an entry where `impact.spawns === type`).
 *   - #8: `newId`'s own epic (`epicOfRequirementId`) must match the impact's
 *     declared `epic` argument — a same-shape id minted under the WRONG epic
 *     must never be stamped as this spawn's realization. */
export declare function realizeCrSpawn(repo: string, input: RealizeCrSpawnInput): Promise<RealizeCrSpawnResult>;
/** `<repo>/.ba/cache/pending-<wpId>.json` — the marker path for one WP's
 * in-flight accept. Exported (like `crPath`/`atomicWrite`/`loadGraph`) so
 * `validate` (Task 12) can locate an orphaned marker as a partial-state
 * signal, and so tests can assert marker presence/absence directly. */
export declare function pendingMarkerPath(repo: string, wpId: string): string;
/** TEST-ONLY crash-window seam. Set only by the crash-resume tests to make a
 * real `accept` throw immediately AFTER a named phase, leaving the exact
 * partial on-disk state a crash at that point would — so a *subsequent* real
 * `accept` can be asserted to resume correctly. Never set in production; the
 * documented interface is the 5-argument form. */
export type AcceptOptions = {
    crashAfter?: 'marker' | 'firstItemLive' | 'items' | 'manifest';
};
/**
 * The sole baseline writer, made crash-safe by a durable **write-ahead
 * pending marker** (`<repo>/.ba/cache/pending-<wpId>.json`, §8a): resume is
 * PROVEN from that marker, never INFERRED from directory/filename shape.
 *
 * **Transaction order:**
 * 0. If a pending marker for THIS `wpId` exists → **resume**: reuse its
 *    `baselineId` as the stable `targetId` (so no fresh/duplicate baseline is
 *    minted) and do NOT re-gate (the marker proves the gate passed at start).
 *    Otherwise: if the WP is already `accepted` (and there's no marker) it's a
 *    completed-transaction no-op; else run `acceptGate` (VERIFY-FAIL ⇒ return,
 *    write nothing), allocate the baseline id, and write the marker.
 * 1. Flip each delivered item's live page → `baselined` + `baseline:target`.
 * 2. Write each delivered item's frozen baseline page.
 * 3. Write `manifest.yaml`.
 * 4. `reconcileCrs` the affected CRs.
 * 5. Set the WP `accepted`.
 * 6. **Delete the pending marker** — the true "transaction complete" marker
 *    (a committed baseline has NO marker).
 *
 * **The delivered set is recomputed from CURRENT status on every (re)invocation
 * — never trusted from the marker's frozen list.** The authoritative filter is
 *   `dedup( closure(wp) ∩ { id : status(id)==='batched'
 *                                OR (status(id)==='baselined' AND baseline(id)===targetId) } )`
 * (`closure.frs` is NOT deduped by graph.ts, so the `Set` here collapses a WP
 * whose `fr_ids` repeats an id). On a FRESH run `targetId` is brand-new so the
 * `baselined@targetId` disjunct matches nothing and the filter is exactly
 * `closure ∩ {batched}`. On RESUME that disjunct re-includes items the crashed
 * run already stamped (their frozen pages are re-written — no dropped item),
 * still-`batched` items are stamped, and an item that was legally changed
 * out-of-band during the crash-to-resume window (e.g. `retired`) is in NEITHER
 * branch and is correctly EXCLUDED — never resurrected back to `baselined`.
 * The marker's own `deliveredIds` is kept only as informational intent; the
 * manifest's `items` reflect what was actually delivered THIS run.
 *
 * **Every step is idempotent on resume:** an item already at `baseline:target`
 * skips its live-write (so `## History` — `editRequirement`'s concern, not
 * accept's — is never a factor and no page is needlessly rewritten); frozen
 * pages + manifest are re-derived; `reconcileCrs`/`setWpAccepted` are each
 * idempotent; the marker delete is best-effort. A fully-completed accept re-run
 * is a no-op via BOTH the already-`accepted` fast-path AND the absence of any
 * marker.
 *
 * This closes the crash windows: (Critical) a crash AFTER the manifest write
 * but before reconcile/setWpAccepted still has its marker, and all items are
 * `baselined@targetId` so the recompute re-includes them → resume runs
 * reconcile (unsticking the CR) + setWpAccepted + marker-delete; no fresh empty
 * baseline. (Major) a crash between an item's live-write and its frozen-write:
 * the recompute picks up both the already-stamped and the still-`batched`
 * members → every frozen page is (re)written, nothing dropped. (Major) hijack
 * is impossible: only a marker keyed to (and self-asserting) the CURRENT `wpId`
 * is ever resumed, so a committed baseline (no marker) or another WP's crash
 * (its own marker) is never adopted. And a legal out-of-band status change
 * during the crash window is never overwritten.
 *
 * **Version rule for a first-time baseline:** every delivered item is being
 * baselined for the FIRST time — `LEGAL_TRANSITIONS` only reaches `batched`
 * from `draft`/`active`, never from `baselined`, so no item with prior
 * accepted history can re-enter a delivered set. With no prior body to diff
 * and no new body supplied here, `shouldBump`/`## History` don't apply:
 * `version` is left as-is (normally `1`) and only `status`/`baseline`
 * change. `shouldBump`/`## History` remain exclusively `editRequirement`'s
 * concern (Task 10), for a later edit to an already-`baselined` item.
 *
 * `accepted_by` = `evidence.producedBy` (the only identity in the pinned
 * interface); `verify_evidence_ref` = the conventional
 * `.ba/cache/verify-<wp-id>.json` (§6.9).
 */
export declare function accept(repo: string, wpId: string, evidence: VerifyEvidence, date: string, headCommit: string, options?: AcceptOptions): Promise<Verdict>;
