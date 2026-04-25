"""Argparse wiring and the synchronous ``main`` entry point."""

from __future__ import annotations

import argparse
import asyncio

from .commands import ALL_COMMANDS


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="skilljar",
        description="Skilljar Claude 101 helper CLI",
    )
    subparsers = parser.add_subparsers(dest="cmd", required=True)
    for command in ALL_COMMANDS:
        command.register(subparsers)
    return parser


def main() -> None:
    args = build_parser().parse_args()
    asyncio.run(args.func(args))
