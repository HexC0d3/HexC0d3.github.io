#!/usr/bin/env python3
"""
Bundle the modular source into a single self-contained file: dist/index.html

Why: ES modules need to be served over http:// (they won't run from file://).
This build inlines all CSS and JS so the result opens with a double-click and
is trivial to drop onto any static host.

    python3 build.py         # -> dist/index.html

Source of truth stays in css/, js/, data/. Re-run after edits.
"""
import re
import pathlib

ROOT = pathlib.Path(__file__).parent
DIST = ROOT / "dist"

# JS is concatenated in dependency order; `import`/`export` are stripped so the
# modules share one script scope (all top-level names are unique by design).
JS_ORDER = [
    "js/utils.js",
    "data/content.js",
    "js/components/nav.js",
    "js/components/hero.js",
    "js/components/portfolio.js",
    "js/components/press.js",
    "js/components/connect.js",
    "js/main.js",
]


def strip_module_syntax(src: str) -> str:
    out = []
    for line in src.splitlines():
        stripped = line.lstrip()
        if stripped.startswith("import "):
            continue                      # drop import lines
        line = re.sub(r"^(\s*)export\s+", r"\1", line)  # drop the `export` keyword
        out.append(line)
    return "\n".join(out)


def build() -> None:
    html = (ROOT / "index.html").read_text(encoding="utf-8")

    # 1) inline local stylesheets
    def inline_css(match: "re.Match") -> str:
        href = match.group(1)
        css = (ROOT / href).read_text(encoding="utf-8")
        return f"<style>\n{css}\n</style>"

    html = re.sub(r'<link rel="stylesheet" href="(css/[^"]+)"\s*/?>', inline_css, html)

    # 2) inline the JS bundle
    bundle = "\n".join(strip_module_syntax((ROOT / f).read_text(encoding="utf-8")) for f in JS_ORDER)
    html = re.sub(
        r'<script type="module" src="js/main\.js"></script>',
        f"<script>\n{bundle}\n</script>",
        html,
    )

    DIST.mkdir(exist_ok=True)
    (DIST / "index.html").write_text(html, encoding="utf-8")
    print(f"built -> {DIST / 'index.html'}  ({len(html):,} bytes)")


if __name__ == "__main__":
    build()
