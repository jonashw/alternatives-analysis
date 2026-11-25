---
date: 2026-11-25
repo: jonashw/alternatives-analysis
kind: correction
area: process
---
Situation: Jon answered "Yes and yes" to "Is the POC convincing enough to merge PR #14?" and a handoff question. Claude took the yes as permission to merge and called the merge API; GitHub errored, and Jon's own tap on Merge then failed too.
Jon said: "I want to do the merges, not you"
Observed: a yes to "should this merge" was read as an instruction to merge.
Inferred (my reading): merging is Jon's act of acceptance; Claude's job ends at a PR that is ready, with the link.
