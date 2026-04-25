"""Domain-level wrappers around ``page.evaluate``.

Each command in this CLI is, fundamentally, "navigate to a URL and run one
of our JS scripts". ``LessonExtractor`` collapses that pattern into a typed
facade so commands stay readable: ``await extractor.extract_markdown()``
beats ``await page.evaluate(scripts.load("convert_markdown"))``.
"""

from __future__ import annotations

from typing import Any

from playwright.async_api import Page

from . import scripts
from .config import LESSON_SETTLE_MS, NAVIGATION_TIMEOUT_MS


class LessonExtractor:
    """Run lesson-page extractions against a single Playwright ``Page``.

    The extractor does not own the browser lifecycle — callers should
    obtain a ``Page`` from :func:`skilljar_core.browser.open_page` and
    inject it here.
    """

    def __init__(self, page: Page) -> None:
        self._page = page

    # ------------------------------------------------------------------
    # Navigation

    async def visit(self, url: str, settle_ms: int = LESSON_SETTLE_MS) -> None:
        await self._page.goto(url, wait_until="load", timeout=NAVIGATION_TIMEOUT_MS)
        await self._page.wait_for_timeout(settle_ms)

    # ------------------------------------------------------------------
    # Extractions — one method per JS script in scripts/

    async def extract_markdown(self) -> str:
        return await self._evaluate("convert_markdown")

    async def list_sidebar_lessons(self) -> list[dict[str, Any]]:
        return await self._evaluate("list_sidebar")

    async def extract_sidebar_structure(self) -> list[dict[str, Any]]:
        return await self._evaluate("extract_sidebar")

    # ------------------------------------------------------------------

    async def _evaluate(self, script_name: str) -> Any:
        return await self._page.evaluate(scripts.load(script_name))
