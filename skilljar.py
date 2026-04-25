"""Entry point for the Skilljar Claude Academy helper CLI.

The CLI is course-agnostic — pass ``--start-url`` to target the first lesson
of any course (Claude 101, Claude Code 101, …). Lesson body extraction
inlines YouTube embeds (as ``<!-- youtube: VIDEO_ID -->`` markers) and body
images (as ``![alt](url)``) so the markdown is ready to use as a translation
seed.

Usage:
    .venv/bin/python skilljar.py markdown <lesson_url>
    .venv/bin/python skilljar.py sidebar [--start-url URL]

Implementation lives in the :mod:`skilljar_core` package — this file is a
thin shim so the documented ``python skilljar.py`` invocation keeps working.
Requires ``cookies.json`` next to this file with an authenticated Skilljar
session. See CLAUDE.md for the cookie capture flow.
"""

from skilljar_core.cli import main

if __name__ == "__main__":
    main()
