#!/usr/bin/env bash
# Renders docs/*.md to _site/ as HTML pages, alongside the raw Markdown.
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf _site && mkdir -p _site
cp CNAME llms.txt build/style.css _site/
for src in docs/*.md; do
  name=$(basename "$src" .md)
  cp "$src" "_site/$name.md"
  if [ "$name" = index ]; then out=_site/index.html; else mkdir -p "_site/$name"; out="_site/$name/index.html"; fi
  title=$(head -1 "$src" | sed 's/^# //')
  pandoc "$src" -f gfm+tex_math_dollars -t html5 --mathjax \
    --lua-filter build/links.lua --template build/template.html \
    -M pagetitle="$title" -V source="/$name.md" -o "$out"
done
