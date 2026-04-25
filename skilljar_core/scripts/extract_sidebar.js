() => {
    const LESSON_URL_RE = /skilljar\.com\/[a-z0-9-]+\/\d+$/;
    const sections = [];
    let current = null;

    function walk(node) {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        if (['SCRIPT','STYLE','NOSCRIPT'].includes(node.tagName)) return;
        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden') return;

        if (node.tagName === 'H3') {
            const text = node.textContent.trim();
            if (text) {
                current = { section: text, lessons: [] };
                sections.push(current);
                return;
            }
        }

        if (node.tagName === 'A') {
            const href = node.href || '';
            const text = node.textContent.trim().replace(/\s+/g, ' ');
            if (LESSON_URL_RE.test(href) && text && current) {
                if (!current.lessons.find(l => l.href === href)) {
                    current.lessons.push({ title: text, href });
                }
            }
            return;
        }

        for (const child of node.childNodes) walk(child);
    }

    // Scope to the sidebar/curriculum container so unrelated body H3s
    // (e.g. "Video", "What is Claude Code?") aren't mistaken for sections.
    const root =
        document.querySelector('.lessons-wrapper') ||
        document.querySelector('[id^="curriculum-list"]') ||
        document.body;
    walk(root);
    return sections;
}
