import { type Ac } from './ac.js';
import type { NodeType } from './types.js';
export type ParsedPage = {
    frontmatter: unknown;
    body: string;
    acs: Ac[];
};
export type ParseFailure = {
    error: string;
};
export type ParseResult = ParsedPage | ParseFailure;
export declare function parsePage(raw: string, type: NodeType): ParseResult;
export declare function parseFile(path: string, type: NodeType): ParseResult;
/** Peeks a page's `type` discriminant via gray-matter's DEFAULT engine (NOT
 * this module's own eemeli-`yaml`-wrapped one, see the file header) — safe
 * here because every `type` value this package ever writes (`fr`/`nfr`/
 * `br`/`cr`/`wp`/`bug`/`epic`/`vision`) is a plain lowercase word, never one
 * of the YAML-1.1 "Norway problem" tokens that motivate the custom engine
 * for the REST of a page's frontmatter. This is a peek only — the real,
 * schema-validated read still happens via `parsePage`/`parseFile` once
 * `type` is known. Every corpus-walking consumer (`validate`'s
 * `walkCorpus`, `loadGraph`, `fmt`'s type inference) shares this single
 * definition — it was triplicated across cli.ts/writer.ts/fmt.ts before the
 * canon-path-scoping consolidation. */
export declare function peekType(raw: string): string | undefined;
