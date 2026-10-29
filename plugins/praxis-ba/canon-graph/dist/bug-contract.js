// WBS 1.2 — capture-bug contract. Separate Repro / Expected / Actual sections
// and a resolvable FR/NFR/BR in `affects`. Does not change bugSchema shape.
import { BR_ID, FR_ID, NFR_ID } from './schema.js';
const HEADING = /^(?:\*\*)?(repro|reproduction|воспроизведение|expected|ожидаем(?:ое|ый)?|actual|фактическ(?:ое|ий)?)\s*:?(?:\*\*)?\s*(.*)$/i;
export function isCanonRequirementId(id) {
    return FR_ID.test(id) || NFR_ID.test(id) || BR_ID.test(id);
}
export function parseBugBody(body) {
    const sections = { repro: '', expected: '', actual: '' };
    const parts = {
        repro: [],
        expected: [],
        actual: [],
    };
    let current = '';
    for (const raw of body.split(/\r?\n/)) {
        const line = raw.trim();
        const m = HEADING.exec(line.replace(/^#+\s+/, ''));
        if (m) {
            const key = (m[1] ?? '').toLowerCase();
            const sectionKey = key.startsWith('repro') || key.startsWith('воспроиз')
                ? 'repro'
                : key.startsWith('expect') || key.startsWith('ожида')
                    ? 'expected'
                    : 'actual';
            current = sectionKey;
            const rest = (m[2] ?? '').replace(/\*+/g, '').trim();
            if (rest)
                parts[sectionKey].push(rest);
            continue;
        }
        if (current !== '' && line && !line.startsWith('<!--'))
            parts[current].push(line);
    }
    const repro = parts.repro.join('\n').trim();
    const expected = parts.expected.join('\n').trim();
    const actual = parts.actual.join('\n').trim();
    if (!repro)
        return { error: 'bug body missing Repro steps' };
    if (!expected)
        return { error: 'bug body missing Expected behavior' };
    if (!actual)
        return { error: 'bug body missing Actual behavior' };
    if (expected === actual) {
        return { error: 'Expected and Actual must be distinct' };
    }
    return { repro, expected, actual };
}
export function existingRequirementIds(graph) {
    return new Set([
        ...graph.frs.map((n) => n.frontmatter.id),
        ...graph.nfrs.map((n) => n.frontmatter.id),
        ...graph.brs.map((n) => n.frontmatter.id),
    ]);
}
export function unresolvedAffects(affects, graph) {
    const known = existingRequirementIds(graph);
    const bad = [];
    for (const id of affects) {
        if (!isCanonRequirementId(id) || !known.has(id))
            bad.push(id);
    }
    return bad;
}
export function assertBugCapture(input) {
    if (input.affects.length === 0) {
        throw new Error('bug capture: --affects <FR|NFR|BR id> is required');
    }
    const unknown = unresolvedAffects(input.affects, input.graph);
    if (unknown.length) {
        throw new Error(`bug capture: unknown requirement id(s): ${unknown.join(', ')} (must be an existing FR/NFR/BR)`);
    }
    const parsed = parseBugBody(input.body);
    if ('error' in parsed)
        throw new Error(`bug capture: ${parsed.error}`);
    return parsed;
}
