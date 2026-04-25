"""Command pattern base class.

Each subcommand is a small class with two responsibilities:

1. **Register** itself on the argparse subparser tree (``add_arguments``)
2. **Run** the work it represents (``run``)

Co-locating those two pieces means adding a new subcommand is a single new
file under ``commands/`` plus one line in ``commands/__init__.py`` — argparse
wiring no longer drifts away from the implementation.
"""

from __future__ import annotations

import argparse
from abc import ABC, abstractmethod


class Command(ABC):
    """Abstract base for a CLI subcommand."""

    #: Subcommand name shown in ``--help`` and used at the CLI.
    name: str

    #: One-line help text shown in the parent parser's help.
    help: str

    def register(self, subparsers: argparse._SubParsersAction) -> None:
        parser = subparsers.add_parser(self.name, help=self.help)
        self.add_arguments(parser)
        parser.set_defaults(func=self.run)

    def add_arguments(self, parser: argparse.ArgumentParser) -> None:
        """Hook for subclasses to declare their arguments."""

    @abstractmethod
    async def run(self, args: argparse.Namespace) -> None:
        """Execute the command. Always async (Playwright is async)."""
