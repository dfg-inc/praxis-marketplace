import { z } from 'zod';
import type { Graph } from './graph.js';
export declare const BaRuleFrontmatterSchema: z.ZodObject<{
    id: z.ZodString;
    roles: z.ZodArray<z.ZodString, "many">;
    stages: z.ZodArray<z.ZodString, "many">;
    severity: z.ZodDefault<z.ZodEnum<["mandatory", "advisory"]>>;
    overridable: z.ZodDefault<z.ZodBoolean>;
    title: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    severity: "advisory" | "mandatory";
    roles: string[];
    stages: string[];
    overridable: boolean;
    title?: string | undefined;
}, {
    id: string;
    roles: string[];
    stages: string[];
    title?: string | undefined;
    severity?: "advisory" | "mandatory" | undefined;
    overridable?: boolean | undefined;
}>;
export type BaRuleFrontmatter = z.infer<typeof BaRuleFrontmatterSchema>;
export type BaRule = {
    path: string;
    frontmatter: BaRuleFrontmatter;
    body: string;
};
export type RuleViolation = {
    ruleId: string;
    severity: 'mandatory' | 'advisory';
    targetId: string;
    message: string;
};
/** Load every `*.md` rule under `rulesDir`. Invalid frontmatter is skipped
 * with no throw — callers can inspect `errors` if supplied. */
export declare function loadBaRules(rulesDir: string, errors?: string[]): BaRule[];
/** Run the checks named by loaded rule ids against a graph. Unknown rule
 * ids are ignored (data may describe checks not yet wired). At least
 * `ba-ac-gherkin` is implemented here. */
export declare function evaluateBaRules(rules: readonly BaRule[], graph: Graph): RuleViolation[];
