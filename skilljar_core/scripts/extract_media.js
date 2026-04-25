() => {
    const SELECTORS = ['.lesson-content','.sj-lesson-content','main','article'];
    let root = document.body;
    for (const sel of SELECTORS) {
        const el = document.querySelector(sel);
        if (el) { root = el; break; }
    }

    const iframes = Array.from(root.querySelectorAll('iframe'))
        .map(f => f.src).filter(Boolean);
    const videos = Array.from(root.querySelectorAll('video'))
        .map(v => v.currentSrc || v.src).filter(Boolean);
    const sources = Array.from(root.querySelectorAll('video source'))
        .map(s => s.src).filter(Boolean);
    const images = Array.from(root.querySelectorAll('img'))
        .map(img => ({
            src: img.currentSrc || img.src,
            alt: img.alt || '',
            w: img.naturalWidth,
            h: img.naturalHeight,
        }))
        .filter(i => i.src && !/skilljar.*\.svg$/.test(i.src));

    const html = document.documentElement.outerHTML;
    const re = /https?:\/\/[^"'\s<>]*?(?:youtube\.com|youtu\.be|wistia\.(?:com|net)|vimeo\.com)[^"'\s<>]*/g;
    const matches = Array.from(new Set(html.match(re) || []));

    return { url: location.href, iframes, videos, sources, images, matches };
}
