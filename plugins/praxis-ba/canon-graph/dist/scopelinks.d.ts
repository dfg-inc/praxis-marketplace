export type ScopeRef = {
    id: string;
    version?: number;
    label?: string;
    path: string;
    anchor?: string;
};
export type ParsedScope = {
    crs: ScopeRef[];
    frs: ScopeRef[];
    nfrs: ScopeRef[];
    brs: ScopeRef[];
    errors: string[];
};
export declare function parseScope(body: string): ParsedScope;
export declare function slugifyHeading(text: string): string;
export declare function pageAnchors(body: string): Set<string>;
