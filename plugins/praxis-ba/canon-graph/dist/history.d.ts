export declare const HISTORY_HEADING_LINE: RegExp;
export declare const ENTRY_HEADING: RegExp;
/** Marks the MACHINE-MANAGED `## History` section — the one `archiveIntoHistory`
 * itself splices into — so a coincidentally-identical PROSE `## History`
 * heading an author writes as part of their own requirement content (this
 * exact product ships a feature literally called "History", the /history
 * Journal screen — finding #2) is never mistaken for the archive anchor.
 * Every page this module itself creates carries the sentinel; a page
 * migrated pre-sentinel (every v3-migrated page — `locateHistorySection`'s
 * "legacy machine shape" branch) is upgraded with it in place the next time
 * it's touched. */
export declare const SENTINEL = "<!-- praxis-ba:history -->";
export declare function formatHistoryHeading(version: number, date: string, ref: string): string;
export declare function parseHistoryHeadings(body: string): Array<{
    version: number;
    date: string;
    ref: string;
}>;
/** A citation, once written, is a historical fact — demotion (`demoteHeadings`,
 * below) is presentation only. Unlike `parseHistoryHeadings` (which stays
 * strict to the live, un-demoted `### vN` shape — structural consumers keep
 * that exact regex, see `ENTRY_HEADING`'s own comment), this scans the
 * located History section at ANY demoted depth: `demoteHeadings` only ever
 * pushes an entry heading from level 3 to level 5 once, then leaves it there
 * (it never matches an already-4-or-5-hash line again) — `#{3,6}` covers
 * that with margin — so a citation from an earlier bump is never lost just
 * because a LATER, unrelated bump landed on the same page (finding #3/#6). */
export declare function historyCrRefs(body: string): string[];
/** Demotes `##`→`####` and `###`→`#####` (top-of-line only). Applied exactly
 * once, to a PRIOR body about to be embedded under a `### v{N}` entry, so the
 * archive never re-introduces `##`/`###`-level anchors (spec §2.3). */
export declare function demoteHeadings(text: string): string;
/** Prepends a new `### v{N} — {date} — {ref}` entry (embedding
 * `demoteHeadings(priorBody)`, so the archived content's own `##`/`###`
 * headings never collide with the live document's heading levels) into
 * `body`'s machine-managed `## History` section (`locateHistorySection`),
 * creating that section (sentineled, at the end of `body`) if none exists
 * yet. Append-AT-TOP: this new entry always lands immediately after the
 * heading, ahead of whatever was already there — see writer.ts's header for
 * why. A section found via the legacy (un-sentineled) shape is upgraded
 * in-place with the sentinel as part of this same write (finding #2). */
export declare function archiveIntoHistory(body: string, heading: string, priorBody: string): string;
