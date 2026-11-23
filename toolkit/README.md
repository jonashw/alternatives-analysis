# AA toolkit

Tools that go with the Alternatives Analysis spec (see "Weight Elicitation" in the spec).

## Supported use (read before copying a ranker)

These steps avoid the mistakes that are known to break a ranker or lose a record.

1. **Start from the current page.** Copy `https://alternatives.jonashw.dev/toolkit/criteria-ranker.html` (this repo's `main`), not an older copy from another project. To bring an older copy up to date, use `upgrade.mjs` (below).
2. **Publish the one file, as it is.** The page already contains the question engine, between `// BEGIN pairwise.js` and `// END pairwise.js`. Don't remove that block, and don't replace it with a `<script src="pairwise.js">`: a page published without the engine loads but asks no questions.
3. **Change only what belongs to the decision:** the `DATA` block, the `<title>` and, if you want your own wording, the `<header>`. Everything else is shared and tested.
4. **Never edit the engine block by hand.** Change `pairwise.js`, run `node toolkit/inline.mjs`, then run the tests. The tests fail if the page's copy and `pairwise.js` differ.
5. **Keep `DATA.key` for the life of a decision.** Saved answers are stored in the viewer's browser under that key. A new decision gets a new key, so it doesn't pick up another decision's answers.
6. **Upgrade in place.** Run `node toolkit/upgrade.mjs old.html > new.html` and publish the result at the **same address** (for a Claude artifact, update the same artifact). A new address starts with empty browser storage.
7. **Don't change the copied text's format.** The lines `Set by N pairwise answers: ...` and `Checked at the end: ...` are read back when a run is pasted in to reopen or review. Treat that text, pasted verbatim, as the record.
8. **Keep the touch-screen rules:** hover only inside `@media (hover: hover)`, an `:active` style, and a blur after each click, so a tapped answer never looks chosen on the next question.

## Files

- `criteria-ranker.html`: the decision owner sets the weights on one page. One file, nothing to install: it works as a Claude artifact, on this site, or opened from disk. Two modes:
  - **Pairwise questions:** "Which matters more to you?", one pair at a time, sorted by binary insertion. Answers are one of the two or "About the same", which joins the whole tie group (the question names everyone in it). One fixed bar above the choices: stop, back, About the same, forward. Hotkeys on a keyboard: 1, 2, =, left arrow, right arrow or Enter, Esc. The start order is shuffled with a fixed seed.
  - **Check questions:** after the last answer, up to three neighbouring pairs near the top are asked again. A reversal or "about the same" turns the pair into a tie. Stop skips them.
  - **Back, review and saved runs:** the finished screen has a back arrow (reopens the last question) and **Review answers**, which replays the run showing each earlier answer: forward keeps it, a different pick changes it. The order, answers, ties and checks are saved together, an unfinished run offers **Carry on** after a reload, and a pasted copy of a finished run can be reopened or reviewed.
  - **Drag:** drag handles plus up and down arrows, for phones. Dragging after the questions clears the ties and the answer record.
  - Live: each criterion's weight (steep = rank-order centroid, gentle = rank-sum; tied neighbours share the mean), the winner and runner-up, a 2,000-trial ±20% weight check, and whether the analyst's draft weights picked the same winner.
  - Returns the ranking, the winner, the pairwise answers and the check answers as text for the owner to paste back. That text is the record.
  - **Parent and parts:** one page can hold a parent decision and its parts (see "Decisions Made of Parts" in the Storytelling variant). The parent's ranking sets the weights for every part; each part uses only the criteria it has scores for, with weights renormalized over those. Shared gates are listed once; an option that fails one is shown as vetoed and left out of the scoring. A part may add gates of its own (`ownGates`, `ownGateResults`). A criterion marked `director: true` (for example, delight) is scored by the director with one tap on a 1 to 5 row, and those scores go into the copied record. A part marked `twoWay: true` is not scored: it shows "two-way door: prototype it". A roll-up table lists each part's winner, score, margin and status. Open the page with `?example=parts` to see an example.
  - **A list only:** leave out `alternatives` (and `parts`) to rank plain items, such as which site hurts most when it's down. The page hides the weights, the result and the scores, and the copied text is the order with its ties and answers. Optional wording: `question` (the question on each pair), `more` (as in "Last time you said: X hurts more") and `noun` (plural, for the intro). `oldKey` names the storage key of an older hand-built page that saved `{ answers }`; those answers carry over once, replayed in the DATA order.
  - **To reuse:** copy the file, replace the `DATA` block and publish it. One decision: `key`, `title`, `alternatives`, `criteria` with `id`, `name`, `scores` per alternative, optional `note`, and `draftWeights`. Parent and parts: `key`, `title`, `criteria` (no scores), `draftWeights`, `gates` (`id`, `name`), and `parts`, each with `id`, `name`, `alternatives`, `scores` by criterion id, and `gates` by gate id (1 pass, 0 fail). See `PARTS_EXAMPLE` in the page. Name each criterion by why it matters (see "Name the reason, not just the feature" in the spec).
  - **To upgrade a ranker already in use:** `node toolkit/upgrade.mjs old-ranker.html > new-ranker.html`. It keeps the old page's title, header (heading and intro), `DATA` and scores note and takes everything else from the current page. Saved answers carry over in the viewer's browser because `DATA.key` stays the same. Publish the result at the same address.
- `pairwise.js`: the question rules on their own, for ranking anything by "which of these two?". ES module, no page, no weights. `start`, `read` (next question with its tie group, order best first, groups, ties, answers used, worst-case questions left), `answer`, `undo`, `shuffle`, `worstCase`, `checkQuestions` and `withChecks`, plus sessions for back, forward and review: `session(ids, { prior })`, `sessionAnswer`, `back`, `forward`, `earlier`, and `parseAnswers` for copied text. Answers are `{a, b, result}` with `'>'` or `'='`.
- `inline.mjs`: copies `pairwise.js` into `criteria-ranker.html`. Edit `pairwise.js`, then run `node toolkit/inline.mjs`. A test fails if the page's copy has drifted.
- `pairwise.test.mjs`: `node --test toolkit/pairwise.test.mjs`. The site deploy runs it first.

Known gap: a part cannot yet rank its own criteria on the page (the spec allows it; run a separate page for that part).
