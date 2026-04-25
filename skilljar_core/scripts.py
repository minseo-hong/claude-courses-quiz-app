"""Loader for the JavaScript snippets that run inside the page.

Keeping the JS in real ``.js`` files (instead of inline Python strings) gives
us editor syntax highlighting, lint support, and a clear separation between
"what runs in Python" and "what runs in the browser". The loader is cached
because every CLI invocation reads the same handful of scripts.
"""

from __future__ import annotations

from functools import lru_cache

from .config import SCRIPTS_DIR


@lru_cache(maxsize=None)
def load(name: str) -> str:
    """Return the contents of ``scripts/{name}.js`` as a string.

    The file content is expected to be a single JS expression (typically an
    arrow function) ready to be passed to ``page.evaluate()``.
    """
    path = SCRIPTS_DIR / f"{name}.js"
    if not path.exists():
        raise FileNotFoundError(f"JS script not found: {path}")
    return path.read_text(encoding="utf-8")
