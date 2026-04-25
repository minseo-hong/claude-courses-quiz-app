"""Title → URL-safe slug conversion."""

from __future__ import annotations

import re

_PUNCT_RE = re.compile(r"[:'\"?!,./\\]")
_NON_ALNUM_RE = re.compile(r"[^a-z0-9]+")


def slugify(title: str) -> str:
    s = _PUNCT_RE.sub("", title.lower())
    s = _NON_ALNUM_RE.sub("-", s)
    return s.strip("-")
