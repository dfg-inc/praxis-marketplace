// ---- the read path: gray-matter (leading-fence-pair anchored detection) +
// the eemeli `yaml` engine (no js-yaml Norway-problem) → zod-validated
// frontmatter + an opaque body string (design spec §parse, §9).
//
// The body is NEVER re-serialized through a markdown AST: it is kept as the
// exact substring gray-matter finds after the closing frontmatter fence, so a
// `---` horizontal rule inside the body does not get mistaken for a second
// fence (gray-matter anchors fence detection to the leading `---` pair only).
import { readFileSync } from 'node:fs';
import matter from 'gray-matter';
import { parse as yamlParse } from 'yaml';
import { parseAcBlock } from './ac.js';
import { validateFrontmatter } from './schema.js';
// gray-matter's `engines` option accepts a bare parse function; wrapping the
// eemeli `yaml` parse this way is the whole of the "custom engine" config —
// fence anchoring itself is gray-matter's own behavior, not the yaml engine's.
const yamlEngine = {
    parse: (input) => yamlParse(input),
};
export function parsePage(raw, type) {
    const { data, content } = matter(raw, { engines: { yaml: yamlEngine } });
    // Widen gray-matter's `any`-typed `data` to `unknown` before it touches any
    // of our own logic — schema.ts's `validateFrontmatter` is the only place
    // that inspects its shape.
    const frontmatterInput = data;
    const validation = validateFrontmatter(type, frontmatterInput);
    if (!validation.ok)
        return { error: validation.issues.join('; ') };
    const body = content;
    const acs = type === 'fr' ? parseAcBlock(body).acs : [];
    return { frontmatter: validation.data, body, acs };
}
export function parseFile(path, type) {
    let raw;
    try {
        raw = readFileSync(path, 'utf8');
    }
    catch (err) {
        return { error: err instanceof Error ? err.message : String(err) };
    }
    return parsePage(raw, type);
}
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
export function peekType(raw) {
    const { data } = matter(raw);
    if (typeof data !== 'object' || data === null)
        return undefined;
    const type = data.type;
    return typeof type === 'string' ? type : undefined;
}
