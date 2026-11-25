---
date: 2026-11-25
repo: jonashw/alternatives-analysis
kind: correction
area: decisions
---
Situation: Career's proof-of-concept redo of an existing AA rewrote it in place, with no Supersedes link, no What Changed section, and no account of which ids changed. Several requirements split (one into two, a gate floor plus a want, one into three gates), and the spec had no numbering rule for that.
Jon said (feedback from another project): "Should a split use suffixes, each citing the parent? Does the parent id then count as dropped?" Asked to choose between suffixes and dotted ids: "Suffixes".
Observed: the spec gained split and merge numbering, a rule that What Changed accounts for every old id, and a handoff rule for redos done by another project or agent.
Inferred (my reading): Jon wants id lineage to be traceable without reading both documents side by side, and wants the owning project to stay in charge of its own records.
