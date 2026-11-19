---
date: 2026-11-19
repo: jonashw/alternatives-analysis
kind: correction
area: decisions
---
Situation: In the Criteria Ranker, "about the same" answers shared weight only between neighbours, so a tied criterion pushed out of place by the insertion sort lost its share.
Jon said: "Expected: answers joined by \"=\" form one tie group, whatever order the sort leaves them in, and every member gets the group's mean weight."
Observed: An answer of "about the same" now joins the whole tie group; the sort compares against groups, so members stay together and share the group's mean weight.
Inferred (my reading): Jon reads "about the same" as an equivalence (transitive), not a local adjacency hint.
