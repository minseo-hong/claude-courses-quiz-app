"""``markdown-all`` — dump every sidebar lesson as a Markdown file."""

from __future__ import annotations

import argparse
import sys

from ..browser import open_page
from ..config import DEFAULT_START_URL, MARKDOWN_DIR
from ..extractors import LessonExtractor
from ..slug import slugify
from .base import Command


class MarkdownAllCommand(Command):
    name = "markdown-all"
    help = "Save every lesson as Markdown into the markdown/ directory"

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        parser.add_argument("--start-url", default=DEFAULT_START_URL)

    async def run(self, args: argparse.Namespace) -> None:
        MARKDOWN_DIR.mkdir(exist_ok=True)
        async with open_page(goto=args.start_url) as page:
            extractor = LessonExtractor(page)
            lessons = await extractor.list_sidebar_lessons()
            print(f"[✓] Found {len(lessons)} lessons", file=sys.stderr)

            for index, lesson in enumerate(lessons, start=1):
                await self._dump_one(extractor, index, lesson)

        print(f"\n[✓] Done. Files saved to {MARKDOWN_DIR}/", file=sys.stderr)

    @staticmethod
    async def _dump_one(
        extractor: LessonExtractor, index: int, lesson: dict
    ) -> None:
        num = str(index).zfill(2)
        slug = slugify(lesson["title"])
        out_path = MARKDOWN_DIR / f"{num}-{slug}.md"
        print(f"[{num}] {lesson['title']} ...", end=" ", flush=True)
        try:
            await extractor.visit(lesson["href"])
            md = await extractor.extract_markdown()
            out_path.write_text(
                f"# {lesson['title']}\n\n{md}\n", encoding="utf-8"
            )
            print(f"→ {out_path.name}")
        except Exception as e:  # noqa: BLE001 — best-effort batch run
            print(f"ERROR: {e}")
