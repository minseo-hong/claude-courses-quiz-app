"""``media`` — print iframe/video/image URLs for the Nth sidebar lesson."""

from __future__ import annotations

import argparse
import sys

from ..browser import open_page
from ..config import DEFAULT_START_URL, MEDIA_SETTLE_MS
from ..extractors import LessonExtractor
from .base import Command


class MediaCommand(Command):
    name = "media"
    help = "Print iframe/video/image URLs for the Nth sidebar lesson"

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        parser.add_argument(
            "lesson_index",
            type=int,
            help="1-based index of the lesson in the sidebar order",
        )
        parser.add_argument("--start-url", default=DEFAULT_START_URL)

    async def run(self, args: argparse.Namespace) -> None:
        async with open_page(goto=args.start_url) as page:
            extractor = LessonExtractor(page)
            lessons = await extractor.list_sidebar_lessons()
            target = self._pick_lesson(lessons, args.lesson_index)

            print(
                f"[→] Lesson {args.lesson_index}: {target['title']}",
                file=sys.stderr,
            )
            await extractor.visit(target["href"], settle_ms=MEDIA_SETTLE_MS)
            result = await extractor.extract_media()

        self._print_report(result)

    @staticmethod
    def _pick_lesson(lessons: list[dict], index: int) -> dict:
        if not 1 <= index <= len(lessons):
            sys.exit(
                f"[!] lesson_index {index} out of range "
                f"(found {len(lessons)} lessons)"
            )
        return lessons[index - 1]

    @staticmethod
    def _print_report(result: dict) -> None:
        print("URL:", result["url"])
        print("iframes:")
        for src in result["iframes"]:
            print("  -", src)
        print("videos:", result["videos"])
        print("sources:", result["sources"])
        print("images:")
        for img in result["images"]:
            print(f"  - {img['src']} ({img['w']}x{img['h']}) alt={img['alt']!r}")
        print("matches:")
        for match in result["matches"]:
            print("  -", match)
