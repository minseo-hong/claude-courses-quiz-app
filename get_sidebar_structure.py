import json, asyncio, sys
from pathlib import Path
from playwright.async_api import async_playwright

COOKIES_FILE = Path(__file__).parent / "cookies.json"

async def main():
    cookies = json.loads(COOKIES_FILE.read_text())
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context()
        await context.add_cookies(cookies)
        page = await context.new_page()
        url = sys.argv[1] if len(sys.argv) > 1 else "https://anthropic.skilljar.com/claude-101/383393"
        await page.goto(url, wait_until="load", timeout=60000)
        await page.wait_for_timeout(3000)

        structure = await page.evaluate("""() => {
            const sections = [];
            let current = null;

            function walk(node) {
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                if (['SCRIPT','STYLE','NOSCRIPT'].includes(node.tagName)) return;
                const style = window.getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden') return;

                // Section header
                if (node.tagName === 'H3') {
                    const text = node.textContent.trim();
                    if (text) {
                        current = { section: text, lessons: [] };
                        sections.push(current);
                        return; // don't recurse into H3 children
                    }
                }

                // Lesson link
                if (node.tagName === 'A') {
                    const href = node.href || '';
                    const text = node.textContent.trim().replace(/\\s+/g, ' ');
                    if (href.match(/skilljar\\.com\\/claude-101\\/\\d+$/) && text && current) {
                        // avoid duplicates within same section
                        if (!current.lessons.find(l => l.href === href)) {
                            current.lessons.push({ title: text, href });
                        }
                    }
                    return;
                }

                for (const child of node.childNodes) walk(child);
            }

            walk(document.body);
            return sections;
        }""")

        print(json.dumps(structure, ensure_ascii=False, indent=2))
        await browser.close()

asyncio.run(main())
