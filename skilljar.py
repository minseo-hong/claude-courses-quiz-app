"""Entry point for the Skilljar Claude 101 helper CLI.

Usage:
    .venv/bin/python skilljar.py text <lesson_url>
    .venv/bin/python skilljar.py markdown <lesson_url>
    .venv/bin/python skilljar.py markdown-all [--start-url URL]
    .venv/bin/python skilljar.py sidebar [--start-url URL]
    .venv/bin/python skilljar.py media <lesson_index> [--start-url URL]

Implementation lives in the :mod:`skilljar_core` package — this file is a
thin shim so the documented ``python skilljar.py`` invocation keeps working.
Requires ``cookies.json`` next to this file with an authenticated Skilljar
session. See CLAUDE.md for the cookie capture flow.
"""

from skilljar_core.cli import main

if __name__ == "__main__":
    main()
