() => {
    const BLOCK = new Set(['P','DIV','SECTION','ARTICLE','BLOCKQUOTE','LI','DT','DD','TR','THEAD','TBODY']);
    // IFRAME and IMG are handled inline below — do NOT skip them.
    const SKIP  = new Set([
        'SCRIPT','STYLE','NOSCRIPT','NAV','HEADER','FOOTER',
        'BUTTON','FORM','ASIDE',
    ]);

    // Decorative chrome that shouldn't appear in the lesson body.
    const IMG_SKIP_RE = /(cc\.sj-cdn\.net\/instructor\/.*(header-logo|footer-logo))|(gravatar\.com\/avatar)/i;

    function youtubeId(src) {
        if (!src) return null;
        // https://www.youtube.com/embed/VIDEO_ID(?...)?
        let m = src.match(/youtube(?:-nocookie)?\.com\/embed\/([A-Za-z0-9_-]{6,})/);
        if (m) return m[1];
        // https://youtu.be/VIDEO_ID
        m = src.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/);
        if (m) return m[1];
        // https://www.youtube.com/watch?v=VIDEO_ID
        m = src.match(/youtube\.com\/watch\?[^\s"']*[?&]v=([A-Za-z0-9_-]{6,})/);
        if (m) return m[1];
        return null;
    }

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

        if (tag === 'IMG') {
            const src = node.currentSrc || node.src || '';
            if (!src || IMG_SKIP_RE.test(src)) return '';
            const alt = (node.alt || '').replace(/[\[\]]/g, '').trim();
            return '\n![' + alt + '](' + src + ')\n';
        }

        if (tag === 'IFRAME') {
            const id = youtubeId(node.src || '');
            if (id) return '\n<!-- youtube: ' + id + ' -->\n';
            // Non-YouTube iframes: surface the src as a plain link so it isn't lost.
            const src = node.src || '';
            return src ? '\n[embed](' + src + ')\n' : '';
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

    // Lesson body root. `#lesson-main-content` is the Skilljar standard
    // wrapper that holds every `sjwc-lesson-content-item` block — including
    // the separate Video item that sits ABOVE the text body on Claude Code
    // 101. Older selectors are kept as fallbacks.
    const SELECTORS = [
        '#lesson-main-content','#lesson-main',
        '.lesson-content','.sj-lesson-content','main','article',
    ];
    let root = null;
    for (const sel of SELECTORS) {
        root = document.querySelector(sel);
        if (root) break;
    }

    const raw = toMd(root || document.body, {});
    return raw.replace(/\n{3,}/g, '\n\n').trim();
}
