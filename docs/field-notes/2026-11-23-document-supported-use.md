---
date: 2026-11-23
repo: jonashw/alternatives-analysis
kind: preference
area: agents
---
Situation: Claude listed a minor risk (a ranker published without its second file) and then called it fully mitigated by inlining the engine.
Jon said: "Could it still be recorded/documented for future agents/users to see, if needed? Would like to encourage *supported* use of the tooling to avoid mis-steps, especially when we have useful knowledge to do so ahead of time."
Observed: Added "Supported use" to toolkit/README.md (start from main, publish the one file, change only DATA/title/header, never hand-edit the engine, keep DATA.key, upgrade in place, keep the copy format, keep the touch rules) and pointed llms.txt at it.
Inferred (my reading): a mitigated risk still deserves a written guardrail when it's known ahead of time; Jon wants agents steered to the supported path, not left to rediscover it.
