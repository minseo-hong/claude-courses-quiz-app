"""``markdown`` — print a single lesson body converted to Markdown."""

from __future__ import annotations

import argparse
import sys

from ..browser import open_page
from ..config import LESSON_SETTLE_MS
from ..extractors import LessonExtractor
from .base import Command


class MarkdownCommand(Command):
    name = "markdown"
    help = "Print Markdown of a lesson"

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        parser.add_argument("url", help="Lesson URL on anthropic.skilljar.com")

    async def run(self, args: argparse.Namespace) -> None:
        async with open_page(goto=args.url, settle_ms=LESSON_SETTLE_MS) as page:
            md = await LessonExtractor(page).extract_markdown()
        sys.stdout.write(md + "\n")
