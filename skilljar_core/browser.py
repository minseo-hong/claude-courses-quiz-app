"""Playwright session management.

The CLI never wants a "raw" browser — it always wants a logged-in Skilljar
page. ``open_page`` is the single seam where cookies are loaded, the user
agent is set, and (optionally) the initial navigation happens. Every command
goes through it.
"""

from __future__ import annotations

import json
import sys
from contextlib import asynccontextmanager
from typing import AsyncIterator

from playwright.async_api import Page, async_playwright

from .config import (
    COOKIES_FILE,
    DEFAULT_SETTLE_MS,
    NAVIGATION_TIMEOUT_MS,
    USER_AGENT,
)


def _load_cookies() -> list[dict]:
    if not COOKIES_FILE.exists():
        sys.exit(
            f"[!] Missing {COOKIES_FILE.name}. "
            "Capture an authenticated Skilljar session first."
        )
    return json.loads(COOKIES_FILE.read_text())


@asynccontextmanager
async def open_page(
    goto: str | None = None,
    settle_ms: int = DEFAULT_SETTLE_MS,
) -> AsyncIterator[Page]:
    """Yield a Playwright ``Page`` with Skilljar cookies preloaded.

    If ``goto`` is provided, the page is navigated there and we wait
    ``settle_ms`` for client-side rendering to settle before yielding.
    """
    cookies = _load_cookies()
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(user_agent=USER_AGENT)
        await context.add_cookies(cookies)
        page = await context.new_page()
        try:
            if goto:
                print(f"[→] Navigating to {goto}", file=sys.stderr)
                await page.goto(goto, wait_until="load", timeout=NAVIGATION_TIMEOUT_MS)
                await page.wait_for_timeout(settle_ms)
            yield page
        finally:
            await browser.close()
