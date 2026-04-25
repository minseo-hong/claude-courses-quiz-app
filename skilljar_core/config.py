"""Static configuration for the Skilljar CLI.

Centralizing constants here keeps the rest of the package free of magic values
and makes it trivial to change a path or timeout without grepping the code.
"""

from __future__ import annotations

from pathlib import Path

# ---------------------------------------------------------------------------
# Filesystem layout
PACKAGE_DIR = Path(__file__).resolve().parent
REPO_DIR = PACKAGE_DIR.parent
SCRIPTS_DIR = PACKAGE_DIR / "scripts"

COOKIES_FILE = REPO_DIR / "cookies.json"
MARKDOWN_DIR = REPO_DIR / "markdown"

# ---------------------------------------------------------------------------
# Skilljar / Playwright defaults
DEFAULT_START_URL = "https://anthropic.skilljar.com/claude-101/383389"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)
NAVIGATION_TIMEOUT_MS = 60_000
DEFAULT_SETTLE_MS = 3_000
LESSON_SETTLE_MS = 2_000
MEDIA_SETTLE_MS = 5_000
