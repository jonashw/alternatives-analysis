---
date: 2026-11-22
repo: jonashw/alternatives-analysis
kind: correction
area: ui-ux
---
Situation: Jon used the Criteria Ranker on his Android phone. After tapping one pairwise answer, that button still looked highlighted on the next question.
Jon said: "the button stays in its active state for the next question, which is a bit confusing."
Observed: the :hover rules stick after a tap on touch screens, and the tapped button keeps focus. Jon had already tested a fix in another project: wrap :hover in @media (hover: hover), add an :active style, blur the button after each click.
Inferred (my reading): any interactive toolkit page should treat hover as pointer-only and must never let a past answer look like the current choice.
