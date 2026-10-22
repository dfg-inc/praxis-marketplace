import type { z } from 'zod';
import { configSchema } from './schema.js';
type CanonConfig = z.infer<typeof configSchema>;
/**
 * Default BA/project surface when `.ba/config.yaml` is absent.
 * Prefer an explicit allowlist over walking the whole tree (which would
 * ingest VitePress prose and installed dependency Markdown).
 */
export declare const DEFAULT_CANON_ROOTS: readonly string[];
/** Directory basenames never traversed, even when listed under a root. */
export declare const EXCLUDED_DIR_NAMES: Set<string>;
/** Reads + zod-validates the optional `<repo>/.ba/config.yaml`. Returns
 * `undefined` when the file is absent (ENOENT) — the ordinary,
 * backward-compatible case. A PRESENT-but-malformed config throws with the
 * joined zod issues, never silently coerced — same posture as `ids.ts`'s
 * `readCounters`. */
export declare function readCanonConfig(repo: string): CanonConfig | undefined;
/**
 * The ONE canon-file discovery function every consumer routes through:
 * `validate`'s corpus walk and `fmt`'s whole-repo enumeration (both
 * cli.ts), and `loadGraph` (writer.ts) — which the VitePress data loaders
 * (`product/.vitepress/loaders/*.data.ts`) call transitively via
 * `@praxis-ba/canon-graph`.
 *
 * When `<repo>/.ba/config.yaml` exists, scans ONLY its `canon_roots`.
 * Absent config: scans {@link DEFAULT_CANON_ROOTS} (explicit project
 * surface) — never a whole-tree walk into `node_modules/` or prose trees.
 */
export declare function walkCanonFiles(repo: string): string[];
export {};
