export type BaArchitectHandoff = {
    contract: 'ba.architect.handoff';
    version: string;
    workPackageId: string;
    workPackagePath: string;
    requirementIds: string[];
    visionConfirmed: boolean;
    readinessChecks: Array<{
        id: string;
        passed: boolean;
        detail?: string;
    }>;
};
export type EmitBaArchitectHandoffResult = {
    path: string;
    handoff: BaArchitectHandoff;
};
/**
 * Build and write ba.architect.handoff for a plan-approved / ready / accepted WP.
 */
export declare function emitBaArchitectHandoff(repo: string, wpId: string, outPath?: string): EmitBaArchitectHandoffResult;
