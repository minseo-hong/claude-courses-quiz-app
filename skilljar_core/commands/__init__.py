"""Command registry.

``ALL_COMMANDS`` is the single source of truth for what subcommands exist.
``cli.py`` iterates this list to build the argparse tree, so adding a new
subcommand is a two-step task: write a new module here, then append its
class instance below.
"""

from __future__ import annotations

from .base import Command
from .markdown import MarkdownCommand
from .markdown_all import MarkdownAllCommand
from .media import MediaCommand
from .sidebar import SidebarCommand
from .text import TextCommand

ALL_COMMANDS: list[Command] = [
    TextCommand(),
    MarkdownCommand(),
    MarkdownAllCommand(),
    SidebarCommand(),
    MediaCommand(),
]

__all__ = ["ALL_COMMANDS", "Command"]
