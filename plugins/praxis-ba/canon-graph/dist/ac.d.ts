export declare const SECTION_HEADING: RegExp;
export declare const NEXT_HEADING: RegExp;
export type Ac = {
    acId: number;
    text: string;
};
export type AcBlockResult = {
    acs: Ac[];
    warnings: string[];
    error?: string;
};
export declare function parseAcBlock(body: string): AcBlockResult;
/** True when an AC line is verifiable in Gherkin form: given/when/then
 * (English) or Дано/Когда/Тогда (Russian). Case-insensitive; whole-word
 * for English tokens, substring for Russian. WBS 1.12. */
export declare function isVerifiableAc(text: string): boolean;
/** Returns the AC ids whose text is not Gherkin-verifiable, or an empty
 * list when every AC passes (or there are no ACs). */
export declare function unverifiableAcIds(acs: readonly Ac[]): number[];
