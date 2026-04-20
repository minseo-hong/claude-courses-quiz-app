"""
Usage:
  .venv/bin/python fetch_all_lessons.py [start_url]

Reads the sidebar from start_url, fetches every lesson page,
converts each to Markdown, and saves to ./markdown/.
"""

import json, asyncio, re, sys
from pathlib import Path
from playwright.async_api import async_playwright

COOKIES_FILE = Path(__file__).parent / "cookies.json"
OUTPUT_DIR   = Path(__file__).parent / "markdown"
START_URL    = sys.argv[1] if len(sys.argv) > 1 else "https://anthropic.skilljar.com/claude-101/383389"

MD_CONVERT_JS = """() => {
    const BLOCK = new Set(['P','DIV','SECTION','ARTICLE','BLOCKQUOTE','LI','DT','DD','TR','THEAD','TBODY']);
    const SKIP  = new Set(['SCRIPT','STYLE','NOSCRIPT','NAV','HEADER','FOOTER','BUTTON',
                           'FORM','ASIDE', 'IFRAME']);

    function toMd(node, ctx) {
        if (node.nodeType === Node.TEXT_NODE) {
            const t = node.textContent.replace(/\\n/g, ' ').replace(/\\s+/g, ' ');
            return t;
        }
        if (node.nodeType !== Node.ELEMENT_NODE) return '';

        const tag = node.tagName;
        if (SKIP.has(tag)) return '';

        const style = window.getComputedStyle(node);
        if (style.display === 'none' || style.visibility === 'hidden') return '';

        const inner = () => Array.from(node.childNodes).map(c => toMd(c, ctx)).join('');

        // Headings
        if (tag === 'H1') return '\\n# ' + inner().trim() + '\\n';
        if (tag === 'H2') return '\\n## ' + inner().trim() + '\\n';
        if (tag === 'H3') return '\\n### ' + inner().trim() + '\\n';
        if (tag === 'H4') return '\\n#### ' + inner().trim() + '\\n';
        if (tag === 'H5') return '\\n##### ' + inner().trim() + '\\n';
        if (tag === 'H6') return '\\n###### ' + inner().trim() + '\\n';

        // Inline formatting
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
        if (tag === 'PRE') return '\\n```\\n' + node.textContent + '\\n```\\n';

        // Links
        if (tag === 'A') {
            const href = node.href || '';
            const text = inner().trim();
            if (!text) return '';
            if (!href || href === '#' || href === window.location.href) return text;
            return '[' + text + '](' + href + ')';
        }

        // Lists
        if (tag === 'UL') {
            return '\\n' + Array.from(node.children).map(li => {
                return '- ' + toMd(li, ctx).trim();
            }).join('\\n') + '\\n';
        }
        if (tag === 'OL') {
            return '\\n' + Array.from(node.children).map((li, i) => {
                return (i+1) + '. ' + toMd(li, ctx).trim();
            }).join('\\n') + '\\n';
        }
        if (tag === 'LI') return inner();

        // Table
        if (tag === 'TABLE') {
            const rows = Array.from(node.querySelectorAll('tr'));
            if (!rows.length) return '';
            const lines = rows.map((row, ri) => {
                const cells = Array.from(row.querySelectorAll('th,td'))
                    .map(c => c.textContent.replace(/\\s+/g, ' ').trim());
                const line = '| ' + cells.join(' | ') + ' |';
                if (ri === 0) {
                    const sep = '| ' + cells.map(() => '---').join(' | ') + ' |';
                    return line + '\\n' + sep;
                }
                return line;
            });
            return '\\n' + lines.join('\\n') + '\\n';
        }

        // Block elements — wrap with newlines
        if (BLOCK.has(tag)) return '\\n' + inner() + '\\n';

        // HR
        if (tag === 'HR') return '\\n---\\n';

        return inner();
    }

    // Find main lesson content container
    const SELECTORS = ['.lesson-content','.sj-lesson-content','main','article'];
    let root = null;
    for (const sel of SELECTORS) {
        root = document.querySelector(sel);
        if (root) break;
    }

    const raw = toMd(root || document.body, {});

    // Collapse 3+ blank lines into 2
    return raw.replace(/\\n{3,}/g, '\\n\\n').trim();
}"""


def slugify(title):
    s = title.lower()
    s = re.sub(r"[:'\"?!,./\\\\]", '', s)
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


async def get_sidebar(page):
    return await page.evaluate("""() => {
        const results = [];
        const seen = new Set();
        function walk(node) {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            if (['SCRIPT','STYLE'].includes(node.tagName)) return;
            if (node.tagName === 'A') {
                const href = node.href || '';
                const text = node.textContent.trim().replace(/\\s+/g, ' ');
                if (href.match(/skilljar\\.com\\/claude-101\\/\\d+$/) && text && !seen.has(href)) {
                    seen.add(href);
                    results.push({ title: text, href });
                }
                return;
            }
            for (const child of node.childNodes) walk(child);
        }
        walk(document.body);
        return results;
    }""")


async def main():
    cookies = json.loads(COOKIES_FILE.read_text())
    OUTPUT_DIR.mkdir(exist_ok=True)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            )
        )
        await context.add_cookies(cookies)
        page = await context.new_page()

        # Load first page to get sidebar
        print(f"[→] Loading sidebar from {START_URL}", flush=True)
        await page.goto(START_URL, wait_until="load", timeout=60000)
        await page.wait_for_timeout(3000)
        lessons = await get_sidebar(page)
        print(f"[✓] Found {len(lessons)} lessons", flush=True)

        for i, lesson in enumerate(lessons, 1):
            num  = str(i).zfill(2)
            slug = slugify(lesson['title'])
            filename = f"{num}-{slug}.md"
            out_path = OUTPUT_DIR / filename

            print(f"[{num}] Fetching: {lesson['title']} ...", end=' ', flush=True)
            try:
                await page.goto(lesson['href'], wait_until="load", timeout=60000)
                await page.wait_for_timeout(2000)
                md = await page.evaluate(MD_CONVERT_JS)

                # Prepend frontmatter
                content = f"# {lesson['title']}\n\n{md}\n"
                out_path.write_text(content, encoding='utf-8')
                print(f"→ {filename}", flush=True)
            except Exception as e:
                print(f"ERROR: {e}", flush=True)

        await browser.close()

    print(f"\n[✓] Done. Files saved to {OUTPUT_DIR}/")


asyncio.run(main())
