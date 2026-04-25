"""``text`` — print the visible body text of a single lesson page."""

from __future__ import annotations

import argparse
import sys

from ..browser import open_page
from ..extractors import LessonExtractor
from .base import Command


class TextCommand(Command):
    name = "text"
    help = "Print plain text of a lesson"

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        parser.add_argument("url", help="Lesson URL on anthropic.skilljar.com")

    async def run(self, args: argparse.Namespace) -> None:
        async with open_page(goto=args.url) as page:
            text = await LessonExtractor(page).extract_text()
        sys.stdout.write(text)
