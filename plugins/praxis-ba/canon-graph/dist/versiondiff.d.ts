import type { NodeType } from './types.js';
export type PageBody = {
    frontmatter: unknown;
    body: string;
};
export declare function shouldBump(type: NodeType, oldPage: PageBody, newPage: PageBody): boolean;
