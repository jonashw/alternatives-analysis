# AA toolkit

Tools that go with the Alternatives Analysis spec (see "Weight Elicitation" in the spec).

## Supported use (read before copying a ranker)

These steps avoid the mistakes that are known to break a ranker or lose a record.

1. **Start from the current page.** Copy `https://alternatives.jonashw.dev/toolkit/criteria-ranker.html` (this repo's `main`), not an older copy from another project. To bring an older copy up to date, use `upgrade.mjs` (below).
2. **Publish the one file, as it is.** The page already contains the question engine, between `// BEGIN pairwise.js` and `// END pairwise.js` (and `custom.js` the same way). Don't remove those blocks, and don't replace it with a `<script src="pairwise.js">`: a page published without the engine loads but asks no questions.
3. **Change only what belongs to the decision:** the `DATA` block, the `<title>` and, if you want your own wording, the `<header>`. Everything else is shared and tested.
4. **Never edit the engine block by hand.** Change `pairwise.js`, run `node toolkit/inline.mjs`, then run the tests. The tests fail if the page's copy and `pairwise.js` differ.
5. **Keep `DATA.key` for the life of a decision.** Saved answers are stored in the viewer's browser under that key. A new decision gets a new key, so it doesn't pick up another decision's answers.
6. **Upgrade in place.** Run `node toolkit/upgrade.mjs old.html > new.html` and publish the result at the **same address** (for a Claude artifact, update the same artifact). A new address starts with empty browser storage.
7. **Don't change the copied text's format.** The lines `Set by N pairwise answers: ...` and `Checked at the end: ...` are read back when a run is pasted in to reopen or review. Treat that text, pasted verbatim, as the record.
8. **Keep the touch-screen rules:** hover only inside `@media (hover: hover)`, an `:active` style, and a blur after each click, so a tapped answer never looks chosen on the next question.
9. **Just trying it? Don't make a copy.** Hand the hosted page a criteria set by link or paste (next section). Make a copy only for a decision you want to keep at its own address.

## Try it with your own criteria (no copy needed)

The hosted page, `https://alternatives.jonashw.dev/toolkit/criteria-ranker.html`, takes a criteria set two ways:

- **A link an agent prepares.** Put the set after the `#`, as base64url of the JSON: `criteria-ranker.html#data=<base64url>`. The person taps the link and sees the ranker with those criteria. This is the main path for agents.
- **The paste box.** "Try it with your own criteria" on the page takes the JSON, or a whole share link. Once loaded, **Copy share link** gives the link for that set.

**Designed for privacy.** The part of a link after `#` is never sent to the server, so the criteria don't reach the site or its logs. Answers are saved only in the viewer's browser (localStorage). Nothing is uploaded. This means the server can't see the set. It does not make the set secret: anyone with the link, the browser's history and the app the link was sent through can read it.

### The format

The same shape as the page's `DATA` block, as JSON. The full rules are in [`criteria.schema.json`](criteria.schema.json) (JSON Schema 2020-12), so an agent can check its output before handing out a link. There are three shapes:

1. **A plain list:** `title` and `criteria` (each `id` and `name`). The person ranks the items, and the page shows no weights or winner. Optional wording: `question`, `more`, `noun`.
   ```json
   {"title":"Which chore first?","noun":"chores","question":"Which would you rather get done first?",
    "criteria":[{"id":"DISH","name":"Dishes"},{"id":"LAUN","name":"Laundry"},{"id":"YARD","name":"Yard"}]}
   ```
2. **One decision:** add `alternatives` (each starting with a short code, such as `"A City hotel"`) and give every criterion `scores`: one per alternative, in order, 0 to 5 (1 poor, 5 excellent). `draftWeights` is optional (percent by criterion id), and so is `note` on a criterion.
   ```json
   {"title":"Rank what matters for our next team offsite",
    "alternatives":["A City hotel","B Cabin in the hills","C Our own office"],
    "criteria":[{"id":"COST","name":"R1 Fits the budget, travel included","scores":[2,3,5]},
                {"id":"FOCUS","name":"R2 Few distractions, so we finish the planning","scores":[3,5,1]},
                {"id":"TRAVEL","name":"R3 Everyone can get there in under two hours","scores":[4,2,5]}],
    "draftWeights":{"COST":40,"FOCUS":40,"TRAVEL":20}}
   ```
   Must-haves go in `gates`, not in `criteria`: each gate has `id`, `name` and `pass`, one `1` (pass) or `0` (fail) per alternative, for example `"gates":[{"id":"LEGAL","name":"R4 Meets the venue rules for groups","pass":[1,1,0]}]`. An alternative that fails a gate is shown as vetoed and left out of the scoring. Sort the requirements into gates and wants first (see the spec's "Requirements: Gates and Wants").
3. **A parent with parts:** `criteria` without scores, optional `gates`, and `parts` (see "Parent and parts" below and `PARTS_EXAMPLE` in the page).

Rules: `id` is 1 to 16 letters, digits, `-` or `_`, starting with a letter or digit, used once. Write each `name` as one plain sentence, requirement number first, saying what good looks like. Write it in the voice of whoever measures value ("I can…", or "The org can…" when the owner decides for others). When two criteria are linked, open each with the situation it covers ("When saving works…", "When a site blocks saving…") so only one quality varies per question (see the spec's "Hold the situation constant"). Limits: 40 criteria, 12 alternatives, 12 parts, 300 characters per text, 40,000 characters in all. The page leaves out any other field, with a note.

### Making the link (for agents)

Base64url of the UTF-8 JSON, without `=` padding, after `#data=`:

```python
import base64, json
data = {"title": "Which chore first?", "criteria": [{"id": "DISH", "name": "Dishes"}, {"id": "LAUN", "name": "Laundry"}]}
code = base64.urlsafe_b64encode(json.dumps(data, separators=(",", ":")).encode()).decode().rstrip("=")
print("https://alternatives.jonashw.dev/toolkit/criteria-ranker.html#data=" + code)
```

```js
const code = Buffer.from(JSON.stringify(data), "utf8").toString("base64url");   // Node
console.log("https://alternatives.jonashw.dev/toolkit/criteria-ranker.html#data=" + code);
```

Without a way to run code, give the person the JSON to paste into the box instead. Don't hand-write base64. The page also reads JSON written out after `#data=` (percent-encoded), but chat apps often break such links at spaces and quotes.

When the person is done, **Copy ranking** gives the usual record, plus a last line `Criteria set: <link>`, so the run can be reopened with its criteria.

### Pitfalls (each is handled; know them anyway)

- **Query string instead of `#`.** `?data=` would send the criteria to the server and its logs. The page reads only `#data=`.
- **Long links.** Keep a link under about 2,000 characters. Some chat apps and text messages cut longer ones, and a cut link loads the example with an error. **Copy share link** warns when a link is longer than that. For a big set, send the JSON to paste.
- **Words from a stranger.** The page shows every pasted string as plain text, never as HTML, and a banner says the criteria came from a link or paste, not from this site. The words can still say anything, so treat a set from someone you don't know like any other message from them.
- **Saved answers.** Each set saves under its own key: its `key` (if given) plus a hash of its ids in order. A link can never overwrite another set's answers, or answers on a copy at another address. Rewording a name while keeping the ids keeps the answers, and the page offers **Review my answers**. Changing the ids starts fresh. Answers live in one browser on one device, and clearing site data loses them. The copied text is the record.
- **Copies ignore links.** Only the hosted page (whose `DATA.key` starts with `example-`) shows the box and reads `#data=`. A ranker copied for a real decision never swaps its criteria for a link's.
- **No reaching other answers.** Fields such as `oldKey`, which would import answers saved under another key, are left out of a pasted set.

## Files

- `criteria-ranker.html`: the decision owner sets the weights on one page. One file, nothing to install: it works as a Claude artifact, on this site, or opened from disk. Two modes:
  - **Pairwise questions:** "Which matters more to you?", one pair at a time, sorted by binary insertion. Answers are one of the two or "About the same", which joins the whole tie group (the question names everyone in it). One fixed bar above the choices: stop, back, About the same, forward. Hotkeys on a keyboard: 1, 2, =, left arrow, right arrow or Enter, Esc. The start order is shuffled with a fixed seed.
  - **Check questions:** after the last answer, up to three neighbouring pairs near the top are asked again. A reversal or "about the same" turns the pair into a tie. Stop skips them.
  - **Big ties:** after the checks, any group of more than three criteria called "about the same" gets one more question that lists the whole group: "If you could only keep one of these, which?" (hotkeys 1 to 9). The one kept moves just above the rest, which stay tied. **Can't pick one** (=) keeps the tie. **These are must-haves, not trade-offs** lets the owner tick which ones become gates: they leave the ranking, and each option passes where its score is 3 or more, with a switch per option in the gates panel to change it. A segmented control on the finished screen, **Break up big ties**, sets **Until three are left** (default: asks the rest again while more than three are tied) or **Once per group**. Every big group is asked, top first; Stop skips the rest. The answers go into the copied record as `Big ties (until three are left): NOTE over MEDIA+TAP+...; gates TAP+PRIV of ...; none of ...`, and a pasted record reopens or reviews them.
  - **Big-tie check:** when more than three criteria tie at the top, the result shows the lead of the top two with equal weights next to the lead with the owner's weights, and how much of the gap between them comes from criteria inside the tie. When it is more than half, it says the scores decide the result more than the ranking does.
  - **Back, review and saved runs:** the finished screen has a back arrow (reopens the last question) and **Review answers**, which replays the run showing each earlier answer: forward keeps it, a different pick changes it. The order, answers, ties and checks are saved together, an unfinished run offers **Carry on** after a reload, and a pasted copy of a finished run can be reopened or reviewed.
  - **Drag:** drag handles plus up and down arrows, for phones. Dragging after the questions clears the ties and the answer record.
  - Live: each criterion's weight (steep = rank-order centroid, gentle = rank-sum; tied neighbours share the mean), the winner and runner-up, a 2,000-trial ±20% weight check, a 2,000-trial check with random weights that keep the owner's order (ties stay ties), and whether the analyst's draft weights picked the same winner. One decision can carry `gates` too (see the format above).
  - Returns the ranking, the winner, the pairwise answers and the check answers as text for the owner to paste back. That text is the record.
  - **Parent and parts:** one page can hold a parent decision and its parts (see "Decisions Made of Parts" in the Storytelling variant). The parent's ranking sets the weights for every part; each part uses only the criteria it has scores for, with weights renormalized over those. Shared gates are listed once; an option that fails one is shown as vetoed and left out of the scoring. A part may add gates of its own (`ownGates`, `ownGateResults`). A criterion marked `director: true` (for example, delight) is scored by the director with one tap on a 1 to 5 row, and those scores go into the copied record. A part marked `twoWay: true` is not scored: it shows "two-way door: prototype it". A roll-up table lists each part's winner, score, margin and status. Open the page with `?example=parts` to see an example.
  - **A list only:** leave out `alternatives` (and `parts`) to rank plain items, such as which site hurts most when it's down. The page hides the weights, the result and the scores, and the copied text is the order with its ties and answers. Optional wording: `question` (the question on each pair), `more` (as in "Last time you said: X hurts more") and `noun` (plural, for the intro). `oldKey` names the storage key of an older hand-built page that saved `{ answers }`; those answers carry over once, replayed in the DATA order.
  - **To reuse:** copy the file, replace the `DATA` block and publish it. One decision: `key`, `title`, `alternatives`, `criteria` with `id`, `name`, `scores` per alternative, optional `note`, and `draftWeights`. Parent and parts: `key`, `title`, `criteria` (no scores), `draftWeights`, `gates` (`id`, `name`), and `parts`, each with `id`, `name`, `alternatives`, `scores` by criterion id, and `gates` by gate id (1 pass, 0 fail). See `PARTS_EXAMPLE` in the page. Write each criterion as a short code plus one plain sentence, requirement number first, saying what good looks like (see the spec's Weight Elicitation). For example:
    ```js
    {id:"BACK", name:"R2 Results reach the right thread in the owning project, with no paste from you", scores:[5,3,1]},
    ```
    The copied record lists answers by the code (`BACK > ONCE`), so keep codes short and stable.
  - **Rewording later:** keep `DATA.key` when you reword criteria, so saved answers carry over. The page stores each criterion's wording with the answers; if any wording has changed, it lists those criteria above the questions and offers **Review my answers** (one by one, earlier answer marked, reworded criteria flagged) or **Keep my answers**. Records saved before this check have no wording on file and are not flagged.
  - **To upgrade a ranker already in use:** `node toolkit/upgrade.mjs old-ranker.html > new-ranker.html`. It keeps the old page's title, header (heading and intro), `DATA` and scores note and takes everything else from the current page. Saved answers carry over in the viewer's browser because `DATA.key` stays the same. Publish the result at the same address.
- `custom.js`: reads, checks and links pasted criteria sets (`read`, `check`, `fromFragment`, `toLink`, `storageKey`, `LIMITS`, `SAMPLE`). Pure; copied into the page like `pairwise.js`. Tests: `node --test toolkit/custom.test.mjs`.
- `criteria.schema.json`: the JSON Schema for a pasted or linked criteria set.
- `pairwise.js`: the question rules on their own, for ranking anything by "which of these two?". ES module, no page, no weights. `start`, `read` (next question with its tie group, order best first, groups, ties, answers used, worst-case questions left), `answer`, `undo`, `shuffle`, `worstCase`, `checkQuestions` and `withChecks`, the big-tie helpers `groupsOf`, `tiesOf`, `keepQuestion`, `withKeeps`, `bigTies`, `keepText` and `parseKeeps`, plus sessions for back, forward and review: `session(ids, { prior })`, `sessionAnswer`, `back`, `forward`, `earlier`, and `parseAnswers` for copied text. Answers are `{a, b, result}` with `'>'` or `'='`.
- `inline.mjs`: copies `pairwise.js` and `custom.js` into `criteria-ranker.html`. Edit either, then run `node toolkit/inline.mjs`. A test fails if the page's copy has drifted.
- `pairwise.test.mjs` and `custom.test.mjs`: `node --test toolkit/pairwise.test.mjs toolkit/custom.test.mjs`. The site deploy runs them first.

Known gap: a part cannot yet rank its own criteria on the page (the spec allows it; run a separate page for that part).
