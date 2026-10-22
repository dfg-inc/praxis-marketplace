// Deterministic Phase 1 code-surface scanner (WBS 1.3.2 / 1.3.3).
// Literal operations + source anchors only — no business interpretation.
// Node/Express-style backends and DOM/React-style frontend handlers.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'coverage', '.ba']);
const BACKEND_CALL = /\b(?:app|router|fastify|server)\.(get|post|put|patch|delete|head|options)\s*\(\s*(['"`])([^'"`]+)\2/gi;
const ROUTE_CHAIN = /\.route\s*\(\s*(['"`])([^'"`]+)\1\s*\)\s*\.\s*(get|post|put|patch|delete)/gi;
const FRONT_HANDLER = /\bon(Click|Submit|Change|Input)\s*(?:=|:\s*)\s*(?:\{\s*)?([A-Za-z_$][\w$]*)?/g;
const ADD_LISTENER = /addEventListener\s*\(\s*(['"`])(click|submit|change|input)\1\s*,\s*([A-Za-z_$][\w$]*)?/gi;
function posixRel(root, file) {
    return relative(root, file).split(sep).join('/');
}
function fingerprint(kind, label, file, snippet) {
    const h = createHash('sha256').update(snippet.trim()).digest('hex').slice(0, 12);
    return `${kind}|${label}|${file}|${h}`;
}
function isCommentLine(line) {
    const t = line.trim();
    return t.startsWith('//') || t.startsWith('*') || t.startsWith('/*') || t.startsWith('#');
}
function walkFiles(root) {
    if (!existsSync(root))
        return [];
    const out = [];
    const stack = [root];
    while (stack.length) {
        const cur = stack.pop();
        let entries;
        try {
            entries = readdirSync(cur);
        }
        catch {
            continue;
        }
        for (const name of entries) {
            if (SKIP_DIRS.has(name))
                continue;
            const p = join(cur, name);
            let st;
            try {
                st = statSync(p);
            }
            catch {
                continue;
            }
            if (st.isDirectory())
                stack.push(p);
            else if (/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(name))
                out.push(p);
        }
    }
    return out.sort();
}
function scanFile(root, file) {
    const rel = posixRel(root, file);
    let text;
    try {
        text = readFileSync(file, 'utf8');
    }
    catch {
        return [];
    }
    const ops = [];
    const seen = new Set();
    const lines = text.split(/\r?\n/);
    const push = (kind, label, line, snippet) => {
        const fp = fingerprint(kind, label, rel, snippet);
        if (seen.has(fp))
            return;
        seen.add(fp);
        ops.push({ kind, label, file: rel, line, fingerprint: fp });
    };
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line === undefined || isCommentLine(line))
            continue;
        const lineNo = i + 1;
        BACKEND_CALL.lastIndex = 0;
        let m;
        while ((m = BACKEND_CALL.exec(line))) {
            const method = m[1];
            const path = m[3];
            if (!method || !path)
                continue;
            push('backend', `${method.toUpperCase()} ${path}`, lineNo, line);
        }
        ROUTE_CHAIN.lastIndex = 0;
        while ((m = ROUTE_CHAIN.exec(line))) {
            const path = m[2];
            const method = m[3];
            if (!method || !path)
                continue;
            push('backend', `${method.toUpperCase()} ${path}`, lineNo, line);
        }
        FRONT_HANDLER.lastIndex = 0;
        while ((m = FRONT_HANDLER.exec(line))) {
            const evt = m[1];
            if (!evt)
                continue;
            const name = m[2] ? ` ${m[2]}` : '';
            push('frontend', `on${evt}${name}`.trim(), lineNo, line);
        }
        ADD_LISTENER.lastIndex = 0;
        while ((m = ADD_LISTENER.exec(line))) {
            const evt = m[2];
            if (!evt)
                continue;
            const name = m[3] ? ` ${m[3]}` : '';
            push('frontend', `on${evt[0]?.toUpperCase() ?? ''}${evt.slice(1)}${name}`.trim(), lineNo, line);
        }
    }
    return ops;
}
export function loadSurfaceState(path) {
    if (!existsSync(path))
        return { accepted: [] };
    try {
        const raw = JSON.parse(readFileSync(path, 'utf8'));
        return { accepted: Array.isArray(raw.accepted) ? raw.accepted : [] };
    }
    catch {
        return { accepted: [] };
    }
}
export function saveSurfaceState(path, state) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, JSON.stringify(state, null, 2) + '\n');
}
export function formatSurfaceReport(report, incremental) {
    const ops = incremental ? report.newOrChanged : report.operations;
    const backend = ops.filter((o) => o.kind === 'backend');
    const frontend = ops.filter((o) => o.kind === 'frontend');
    const lines = ['### Backend'];
    if (backend.length === 0)
        lines.push('(none)');
    for (const o of backend)
        lines.push(`${o.label} -> ${o.file}:${o.line}`);
    lines.push('', '### Frontend');
    if (frontend.length === 0)
        lines.push('(none)');
    for (const o of frontend)
        lines.push(`${o.label} -> ${o.file}:${o.line}`);
    lines.push('', '### Не найдено / нечитаемо');
    if (report.warnings.length === 0)
        lines.push('(none)');
    for (const w of report.warnings)
        lines.push(`⚠️ ${w.message}`);
    return `${lines.join('\n')}\n`;
}
export function scanCodeSurface(opts) {
    const root = opts.root;
    const warnings = [];
    const files = [];
    if (opts.anchors?.length) {
        for (const a of opts.anchors) {
            const p = a.startsWith('/') ? a : join(root, a);
            if (!existsSync(p)) {
                warnings.push({ path: a, message: `якорь ${a} не найден` });
                continue;
            }
            const st = statSync(p);
            if (st.isDirectory())
                files.push(...walkFiles(p));
            else
                files.push(p);
        }
    }
    else {
        files.push(...walkFiles(root));
    }
    const operations = [];
    const seen = new Set();
    for (const file of files) {
        for (const op of scanFile(root, file)) {
            if (seen.has(op.fingerprint))
                continue;
            seen.add(op.fingerprint);
            operations.push(op);
        }
    }
    operations.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.label.localeCompare(b.label));
    const state = opts.statePath ? loadSurfaceState(opts.statePath) : { accepted: [] };
    const accepted = new Set(state.accepted.map((x) => x.fingerprint));
    const meanings = (opts.knownMeanings ?? []).map((s) => s.toLowerCase());
    const newOrChanged = operations.filter((op) => {
        if (accepted.has(op.fingerprint))
            return false;
        if (meanings.length) {
            if (meanings.some((m) => m.includes(op.label.toLowerCase()) || m.includes(`${op.file}:${op.line}`))) {
                return false;
            }
        }
        return true;
    });
    if (opts.accept && opts.statePath) {
        const next = new Map(state.accepted.map((a) => [a.fingerprint, a]));
        for (const op of operations)
            next.set(op.fingerprint, { fingerprint: op.fingerprint });
        saveSurfaceState(opts.statePath, { accepted: [...next.values()] });
    }
    return { operations, warnings, newOrChanged };
}
