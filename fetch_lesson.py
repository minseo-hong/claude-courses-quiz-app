#!/usr/bin/env python3
"""
Usage:
  .venv/bin/python fetch_lesson.py <URL>

Reads cookies from cookies.json, launches a headless Chromium,
injects the session cookies, navigates to the lesson URL,
waits for JS rendering to complete, and prints the lesson text.
"""

import sys
import json
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

COOKIES_FILE = Path(__file__).parent / "cookies.json"
# Selector for the main lesson content area on Skilljar
CONTENT_SELECTOR = ".lesson-content, .sj-lesson-content, main, article, .course-content"
# Tags whose text content should be skipped
SKIP_TAGS = {"script", "style", "noscript", "head"}


def extract_text(element_handle):
    """Recursively extract visible text from a Playwright element."""
    # We'll do this via JS evaluation instead
    pass


async def fetch(url: str) -> str:
    cookies = json.loads(COOKIES_FILE.read_text())

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

        print(f"[→] Navigating to {url}", file=sys.stderr)
        await page.goto(url, wait_until="load", timeout=60_000)

        # Give JS time to render after load
        await page.wait_for_timeout(3000)

        # Wait for main content to appear
        try:
            await page.wait_for_selector(CONTENT_SELECTOR, timeout=15_000)
            print("[✓] Content selector found", file=sys.stderr)
        except Exception:
            print("[!] Content selector not found, proceeding with full page", file=sys.stderr)

        # Extract clean text via JS — strips hidden elements and collapses whitespace
        text = await page.evaluate("""() => {
            const skip = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'HEAD', 'NAV', 'FOOTER']);
            const lines = [];

            function walk(node) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const t = node.textContent.trim();
                    if (t) lines.push(t);
                    return;
                }
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                if (skip.has(node.tagName)) return;

                const style = window.getComputedStyle(node);
                if (style.display === 'none' || style.visibility === 'hidden') return;

                // Add a blank separator before block-level elements
                const block = ['P','DIV','H1','H2','H3','H4','H5','H6','LI','TR','BLOCKQUOTE','SECTION','ARTICLE'];
                if (block.includes(node.tagName) && lines.length && lines[lines.length - 1] !== '') {
                    lines.push('');
                }

                for (const child of node.childNodes) walk(child);

                if (block.includes(node.tagName)) lines.push('');
            }

            // Try to narrow to lesson content first
            const selectors = ['.lesson-content', '.sj-lesson-content', 'main', 'article'];
            let root = null;
            for (const sel of selectors) {
                root = document.querySelector(sel);
                if (root) break;
            }
            walk(root || document.body);

            // Collapse consecutive blank lines
            const result = [];
            let blank = false;
            for (const line of lines) {
                if (line === '') {
                    if (!blank) result.push('');
                    blank = true;
                } else {
                    result.push(line);
                    blank = false;
                }
            }
            return result.join('\\n');
        }""")

        await browser.close()
        return text


def main():
    if len(sys.argv) < 2:
        print("Usage: .venv/bin/python fetch_lesson.py <URL>", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]
    text = asyncio.run(fetch(url))
    print(text)


if __name__ == "__main__":
    main()
