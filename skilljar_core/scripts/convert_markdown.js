() => {
    const BLOCK = new Set(['P','DIV','SECTION','ARTICLE','BLOCKQUOTE','LI','DT','DD','TR','THEAD','TBODY']);
    const SKIP  = new Set([
        'SCRIPT','STYLE','NOSCRIPT','NAV','HEADER','FOOTER',
        'BUTTON','FORM','ASIDE','IFRAME',
    ]);

    function toMd(node, ctx) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ');
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return '';

        const tag = node.tagName;
        if (SKIP.has(tag)) return '';

        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden') return '';

        const inner = () => Array.from(node.childNodes).map(c => toMd(c, ctx)).join('');

        if (tag === 'H1') return '\n# '   + inner().trim() + '\n';
        if (tag === 'H2') return '\n## '  + inner().trim() + '\n';
        if (tag === 'H3') return '\n### ' + inner().trim() + '\n';
        if (tag === 'H4') return '\n#### '+ inner().trim() + '\n';
        if (tag === 'H5') return '\n##### '+ inner().trim() + '\n';
        if (tag === 'H6') return '\n###### '+ inner().trim() + '\n';

        if (tag === 'STRONG' || tag === 'B') {
            const t = inner().trim();
            return t ? '**' + t + '**' : '';
        }
        if (tag === 'EM' || tag === 'I') {
            const t = inner().trim();
            return t ? '*' + t + '*' : '';
        }
        if (tag === 'CODE') {
            const t = inner();
            return t ? '`' + t + '`' : '';
        }
        if (tag === 'PRE') return '\n```\n' + node.textContent + '\n```\n';

        if (tag === 'A') {
            const href = node.href || '';
            const text = inner().trim();
            if (!text) return '';
            if (!href || href === '#' || href === window.location.href) return text;
            return '[' + text + '](' + href + ')';
        }

        if (tag === 'UL') {
            return '\n' + Array.from(node.children)
                .map(li => '- ' + toMd(li, ctx).trim())
                .join('\n') + '\n';
        }
        if (tag === 'OL') {
            return '\n' + Array.from(node.children)
                .map((li, i) => (i + 1) + '. ' + toMd(li, ctx).trim())
                .join('\n') + '\n';
        }
        if (tag === 'LI') return inner();

        if (tag === 'TABLE') {
            const rows = Array.from(node.querySelectorAll('tr'));
            if (!rows.length) return '';
            const lines = rows.map((row, ri) => {
                const cells = Array.from(row.querySelectorAll('th,td'))
                    .map(c => c.textContent.replace(/\s+/g, ' ').trim());
                const line = '| ' + cells.join(' | ') + ' |';
                if (ri === 0) {
                    const sep = '| ' + cells.map(() => '---').join(' | ') + ' |';
                    return line + '\n' + sep;
                }
                return line;
            });
            return '\n' + lines.join('\n') + '\n';
        }

        if (BLOCK.has(tag)) return '\n' + inner() + '\n';
        if (tag === 'HR') return '\n---\n';

        return inner();
    }

    const SELECTORS = ['.lesson-content','.sj-lesson-content','main','article'];
    let root = null;
    for (const sel of SELECTORS) {
        root = document.querySelector(sel);
        if (root) break;
    }

    const raw = toMd(root || document.body, {});
    return raw.replace(/\n{3,}/g, '\n\n').trim();
}
