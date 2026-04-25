"""``sidebar`` — print the H3-grouped sidebar structure as JSON."""

from __future__ import annotations

import argparse
import json
import sys

from ..browser import open_page
from ..config import DEFAULT_START_URL
from ..extractors import LessonExtractor
from .base import Command


class SidebarCommand(Command):
    name = "sidebar"
    help = "Print sidebar structure (H3-grouped lessons) as JSON"

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        parser.add_argument("--start-url", default=DEFAULT_START_URL)

    async def run(self, args: argparse.Namespace) -> None:
        async with open_page(goto=args.start_url) as page:
            structure = await LessonExtractor(page).extract_sidebar_structure()
        json.dump(structure, sys.stdout, ensure_ascii=False, indent=2)
        sys.stdout.write("\n")
