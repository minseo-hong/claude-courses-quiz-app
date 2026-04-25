() => {
    const seen = new Set();
    const out = [];
    for (const a of document.querySelectorAll('a')) {
        const href = a.href || '';
        if (/skilljar\.com\/claude-101\/\d+$/.test(href) && !seen.has(href)) {
            seen.add(href);
            out.push({
                title: a.textContent.trim().replace(/\s+/g, ' '),
                href,
            });
        }
    }
    return out;
}
