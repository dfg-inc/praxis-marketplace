/**
 * If `raw` starts with a YAML frontmatter fence pair, return only the body
 * after the closing fence. Otherwise return `raw` unchanged.
 * Used by `req edit --body-file` so agents that pass a full page do not
 * create a second frontmatter block on write.
 */
export declare function stripLeadingFrontmatter(raw: string): string;
/** True when body still contains a leading `---` fence (duplicate FM smell). */
export declare function bodyHasLeadingFrontmatterFence(body: string): boolean;
/** Strip every leading YAML fence until the body is clean (heal stacked dups). */
export declare function stripAllLeadingFrontmatter(raw: string): string;
export declare function isCatalogNfrId(id: string): boolean;
export declare function isCanonNfrId(id: string): boolean;
/** Extract canon + catalogue NFR ids mentioned in free text (rationale etc.). */
export declare function extractNfrMentions(text: string): {
    canon: string[];
    catalog: string[];
};
/**
 * Merge NFR mentions from body into `references_nfr` (deduped, sorted).
 * Both canon `E#-NFR#` and catalogue `KEY-NFR-NNN` ids are kept.
 */
export declare function mergeReferencesNfr(existing: readonly string[] | undefined, body: string): string[];
