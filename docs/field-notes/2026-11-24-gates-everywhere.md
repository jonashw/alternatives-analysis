---
date: 2026-11-24
repo: jonashw/alternatives-analysis
kind: approval
area: decisions
---
Situation: Viability gates existed only in the Storytelling variant. Claude proposed adding them to Software only.
Jon said: "I think we've already seen that gates are widely applicable, considering that they already apply to storytelling as much as software. So I think we should go ahead and add them in the general case." (typos fixed)
Jon said, on catching gates earlier: "Maybe we need to really reconsider the difference between requirements and evaluation criteria there." (typos fixed)
Jon said: "Yes, I think the requirements for sorting should go into the same PR. Let's not delay." (typos fixed)
Observed: All three variants now sort requirements into gates (must-haves, pass or fail) and wants (trade-offs) before scoring; only wants become criteria. The ranker's must-haves path is the safety net. A gate made from a scored criterion passes at 3 or more unless the owner switches it (Jon: "Yes, as described").
Inferred (my reading): Seven tied criteria came from carrying requirements into the matrix one for one; Jon wants the method to catch that at the requirements step, not at the ranking.
