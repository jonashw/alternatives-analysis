# AA toolkit

Tools that go with the Alternatives Analysis spec (see "Weight Elicitation" in the spec).

- `criteria-ranker.html`: the decision owner sets the weights on one page. Two modes:
  - **Pairwise questions:** "Which matters more to you?", one pair at a time, sorted by binary insertion. Answers are one of the two or "About the same" (a tie). "Back one question" undoes one answer. The start order is shuffled with a fixed seed.
  - **Drag:** drag handles plus up and down arrows, for phones. Dragging after the questions clears the ties and the answer record.
  - Live: each criterion's weight (steep = rank-order centroid, gentle = rank-sum; tied neighbours share the mean), the winner and runner-up, a 2,000-trial ±20% weight check, and whether the analyst's draft weights picked the same winner.
  - Returns the ranking, the winner and the full pairwise answer list as text for the owner to paste back. That text is the record.
  - **To reuse:** copy the file, replace the `DATA` block (`key`, `alternatives`, `criteria` with `id`, `name`, `scores` per alternative, optional `note`, and `draftWeights`), change the `<title>` and `<h1>`, and publish it.
- `pairwise.js`: the question engine on its own, for ranking anything by "which of these two?". ES module, no page, no weights. `start(ids, answers)`, `read(state)` (next question, order best first, ties, answers used, worst-case questions left), `answer(state, preferredId or '=')`, `undo`, `worstCase(count)`, `checkQuestions(state, count, importance)` and `withChecks` (re-ask a few earlier pairs to catch drift). Answers are `{a, b, result}` with `'>'` or `'='`; state is replayed from the answers, so earlier answers can seed a run.
- `pairwise.test.mjs`: `node --test toolkit/pairwise.test.mjs`.

Known gaps: the ranker page still carries its own inline copy of the engine instead of importing `pairwise.js`, does not offer the end-of-run check questions, and cannot be seeded from earlier answers.
