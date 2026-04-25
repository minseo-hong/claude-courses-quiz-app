() => {
    const LESSON_URL_RE = /skilljar\.com\/[a-z0-9-]+\/\d+$/;
    const root =
        document.querySelector('.lessons-wrapper') ||
        document.querySelector('[id^="curriculum-list"]') ||
        document;
    const seen = new Set();
    const out = [];
    for (const a of root.querySelectorAll('a')) {
        const href = a.href || '';
        if (LESSON_URL_RE.test(href) && !seen.has(href)) {
            seen.add(href);
            out.push({
                title: a.textContent.trim().replace(/\s+/g, ' '),
                href,
            });
        }
    }
    return out;
}
