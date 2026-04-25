"""
Usage:
  .venv/bin/python fetch_lesson_videos.py [lesson_index] [start_url]

Loads the Claude 101 sidebar from start_url, navigates to the Nth lesson
(1-indexed; default 1), and prints every iframe/video source plus any
content images and YouTube/Wistia/Vimeo URLs found on the page.

Useful for discovering embedded video URLs and lesson-specific images
that the plain-text fetcher discards.
"""

import json
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

COOKIES_FILE = Path(__file__).parent / "cookies.json"
DEFAULT_START = "https://anthropic.skilljar.com/claude-101/383389"


async def main() -> None:
    cookies = json.loads(COOKIES_FILE.read_text())
    lesson_index = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    start_url = sys.argv[2] if len(sys.argv) > 2 else DEFAULT_START

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

        print(f"[→] Loading sidebar from: {start_url}", file=sys.stderr)
        await page.goto(start_url, wait_until="load", timeout=60_000)
        await page.wait_for_timeout(3000)

        lessons = await page.evaluate("""() => {
            const seen = new Set();
            const out = [];
            for (const a of document.querySelectorAll('a')) {
                const href = a.href || '';
                if (/skilljar\\.com\\/claude-101\\/\\d+$/.test(href) && !seen.has(href)) {
                    seen.add(href);
                    out.push({ title: a.textContent.trim().replace(/\\s+/g, ' '), href });
                }
            }
            return out;
        }""")

        if lesson_index < 1 or lesson_index > len(lessons):
            print(
                f"[!] lesson_index {lesson_index} out of range (found {len(lessons)} lessons)",
                file=sys.stderr,
            )
            await browser.close()
            sys.exit(1)

        target = lessons[lesson_index - 1]
        print(f"[→] Lesson {lesson_index}: {target['title']}", file=sys.stderr)
        print(f"[→] Navigating: {target['href']}", file=sys.stderr)
        await page.goto(target["href"], wait_until="load", timeout=60_000)
        await page.wait_for_timeout(5000)

        result = await page.evaluate("""() => {
            const root = document.querySelector('.lesson-content, .sj-lesson-content, main, article') || document.body;
            const iframes = Array.from(root.querySelectorAll('iframe')).map(f => f.src).filter(Boolean);
            const videos = Array.from(root.querySelectorAll('video')).map(v => v.currentSrc || v.src).filter(Boolean);
            const sources = Array.from(root.querySelectorAll('video source')).map(s => s.src).filter(Boolean);
            const images = Array.from(root.querySelectorAll('img'))
                .map(img => ({
                    src: img.currentSrc || img.src,
                    alt: img.alt || '',
                    w: img.naturalWidth,
                    h: img.naturalHeight,
                }))
                .filter(i => i.src && !/skilljar.*\\.svg$/.test(i.src));
            const html = document.documentElement.outerHTML;
            const re = /https?:\\/\\/[^\"'\\s<>]*?(?:youtube\\.com|youtu\\.be|wistia\\.(?:com|net)|vimeo\\.com)[^\"'\\s<>]*/g;
            const matches = Array.from(new Set(html.match(re) || []));
            return { url: location.href, iframes, videos, sources, images, matches };
        }""")

        print("URL:", result["url"])
        print("iframes:")
        for f in result["iframes"]:
            print("  -", f)
        print("videos:", result["videos"])
        print("sources:", result["sources"])
        print("images:")
        for img in result["images"]:
            print(f"  - {img['src']} ({img['w']}x{img['h']}) alt={img['alt']!r}")
        print("matches:")
        for m in result["matches"]:
            print("  -", m)

        await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
