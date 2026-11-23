---
date: 2026-11-23
repo: jonashw/alternatives-analysis
kind: approval
area: architecture
---
Situation: The ranker page carried its own hand-copied question logic beside the tested pairwise.js. Claude proposed one tested source, copied into the page when it is built, so every published ranker stays a single file.
Jon said: "That sounds like a full mitigation of the copy risk, no?" and "I think the answers to your questions are both yes".
Observed: pairwise.js is the only source; toolkit/inline.mjs copies it into the page and a test fails on drift. Jon noted rankers are used as Claude-hosted pages, not opened from disk.
Inferred (my reading): Jon accepts a small build step when it removes duplication without making reuse any harder.
