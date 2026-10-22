export declare const ONBOARD_CONTEXT_FILES: readonly [{
    readonly rel: "shared/data-model.md";
    readonly template: "data-model.md";
    readonly marker: RegExp;
}, {
    readonly rel: "shared/integrations.md";
    readonly template: "integrations.md";
    readonly marker: RegExp;
}, {
    readonly rel: "shared/rbac.md";
    readonly template: "rbac.md";
    readonly marker: RegExp;
}, {
    readonly rel: "shared/nfr.md";
    readonly template: "nfr-catalog.md";
    readonly marker: RegExp;
}, {
    readonly rel: "glossary.md";
    readonly template: "glossary.md";
    readonly marker: RegExp;
}, {
    readonly rel: "as-is.md";
    readonly template: "as-is.md";
    readonly marker: RegExp;
}, {
    readonly rel: "project.md";
    readonly template: "project.md";
    readonly marker: RegExp;
}];
export type OnboardCheck = {
    present: string[];
    missing: string[];
    headingGaps: string[];
    protected: string[];
};
export declare function checkOnboardContext(projectRoot: string): OnboardCheck;
/** Copy missing layer templates. Never overwrite existing files (including
 * confirmed vision / baselined requirements under --canon). */
export declare function initOnboardContext(opts: {
    projectRoot: string;
    templatesDir: string;
    canonDir?: string;
}): {
    created: string[];
    skipped: string[];
    protected: string[];
};
export declare function knownCanonMeanings(canonDir: string): string[];
