() => {
    const SKIP = new Set(['SCRIPT','STYLE','NOSCRIPT','HEAD','NAV','FOOTER']);
    const BLOCK = new Set([
        'P','DIV','H1','H2','H3','H4','H5','H6','LI','TR',
        'BLOCKQUOTE','SECTION','ARTICLE',
    ]);
    const lines = [];

    function walk(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            const t = node.textContent.trim();
            if (t) lines.push(t);
            return;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (SKIP.has(node.tagName)) return;
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden') return;

        if (BLOCK.has(node.tagName) && lines.length && lines[lines.length - 1] !== '') {
            lines.push('');
        }
        for (const child of node.childNodes) walk(child);
        if (BLOCK.has(node.tagName)) lines.push('');
    }

    const SELECTORS = ['.lesson-content','.sj-lesson-content','main','article'];
    let root = null;
    for (const sel of SELECTORS) {
        root = document.querySelector(sel);
        if (root) break;
    }
    walk(root || document.body);

    const out = [];
    let blank = false;
    for (const line of lines) {
        if (line === '') {
            if (!blank) out.push('');
            blank = true;
        } else {
            out.push(line);
            blank = false;
        }
    }
    return out.join('\n');
}
