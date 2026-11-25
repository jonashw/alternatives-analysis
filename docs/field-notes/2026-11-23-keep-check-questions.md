---
date: 2026-11-23
repo: jonashw/alternatives-analysis
kind: correction
area: decisions
---
Situation: Claude suggested dropping the spec's end-of-run check questions because the new Review answers mode covered "most of the same need".
Jon said: "Wouldn't they generate a higher-quality result, potentially? Why would we drop them?" (typos fixed)
Observed: Review only catches what the owner notices; check questions actively re-ask neighbours near the top, which binary insertion often placed without comparing directly. Built into the ranker, three by default, skippable.
Inferred (my reading): Jon weighs result quality over saving a few questions, and expects a cut to a method step to be justified on quality, not convenience.
