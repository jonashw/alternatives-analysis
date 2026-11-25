---
date: 2026-11-25
repo: jonashw/alternatives-analysis
kind: spec-gap
area: decisions
---
Situation: House and Home handed Career two linked AAs (the calendar feed hub, and what the feed should contain) to redo to the current spec. Neither numbered its requirements or criteria, and the second deferred its choice "until a leak incident", calling that condition a "gate".
Jon said, on seeing them listed as separate AAs: "3 is separate from 2? I'm confused. Maybe we should view privacy and security as must-haves for 2?"
Jon said, to merging them, numbering old items for the first time, and a spec rule for deferred decisions: "Yes to all"
Observed: "Keep ids stable" assumed the old AA had ids; Supersedes allowed only one old AA; the spec had no status or field for a deferred decision, so the word "gate" was borrowed for its trigger.
Inferred (my reading): Jon reads two AAs about one system as one decision, and a deferral that sits apart from its parent decision hides a must-have. He wants the record to say plainly what would force a choice.
