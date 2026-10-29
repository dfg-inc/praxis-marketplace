export type SurfaceKind = 'backend' | 'frontend';
export type SurfaceOperation = {
    kind: SurfaceKind;
    label: string;
    file: string;
    line: number;
    fingerprint: string;
};
export type SurfaceWarning = {
    path: string;
    message: string;
};
export type SurfaceReport = {
    operations: SurfaceOperation[];
    warnings: SurfaceWarning[];
    newOrChanged: SurfaceOperation[];
};
export type SurfaceState = {
    accepted: {
        fingerprint: string;
    }[];
};
export declare function loadSurfaceState(path: string): SurfaceState;
export declare function saveSurfaceState(path: string, state: SurfaceState): void;
export declare function formatSurfaceReport(report: SurfaceReport, incremental: boolean): string;
export declare function scanCodeSurface(opts: {
    root: string;
    anchors?: string[];
    statePath?: string;
    incremental?: boolean;
    accept?: boolean;
    knownMeanings?: string[];
}): SurfaceReport;
