# Alternatives Analysis Specification (Storytelling)

> A decision-matrix-driven story decision record: the story choice is the output of a weighted comparison of viable alternatives, not an assertion made up front.
>
> **Method:** A weighted decision matrix scored with the **Weighted Sum Model (WSM)**, also known as Simple Additive Weighting (SAW), a standard **multi-criteria decision analysis (MCDA)** technique, with weights set by the director through ordinal pairwise ranking, paired with explicit sensitivity and robustness analysis (dominance check, winning-margin and critical-weight analysis, score flip points, and Monte Carlo simulation), plus **viability gates** that veto options without hiding them.
>
> **Scope:** This specification is contextualized to **storytelling and storycrafting**: stories, scripts, cutscenes, characters and lore, and any authored sequence an audience lives through (including interactive and live sequences). A [general-purpose variant](https://alternatives.jonashw.dev/general.md) and a [software variant](https://alternatives.jonashw.dev/software.md) are maintained separately.
>
> **Status:** Version 2, 2026-11-20. Version 1 was adopted for use 2026-11-12. Version 2 adds settings of use, decisions made of parts, earlier and per-screen But / Therefore passes, two voices, departures from reality, and a standard look-and-realism part. Proven on one story so far. To be tested and refined across many.

## The Trio

This variant is one of three principles that work together. Each one covers what the others can't.

| Principle | Role | Source |
|---|---|---|
| **Yes, and** | How collaborators generate options: accept the material on the table and build on it. Never overwrite the source author's words. | Improv theatre |
| **But / Therefore** | How beats connect: each beat is caused by the one before it, as a consequence ("therefore") or a complication ("but"), never just "and then". | Trey Parker and Matt Stone (NYU, 2011), after Aristotle's *Poetics* and E. M. Forster |
| **Alternatives Analysis** | How we choose between candidate beats, and the method that keeps the other two honest. | This specification |

## Required Content

Each story AA document must include:

1. A clearly defined story question and its background: what is fixed canon, what is open, and whose source material it touches.
2. The **settings of use**: where the story will be watched, and by whom (see Settings of Use).
3. Detailed exploration of at least two viable options, including at least one deliberately **wild option** (see Option Rules), with comparative analysis.
4. Explicit identification of trade-offs, including fidelity to the source, tone, audience safety, effort to see it working, and reversibility once other scenes build on it.
5. A **But / Therefore pass** on the first draft, and again on the chosen beats at the close (see But / Therefore).
6. A list of **departures from reality**, when the story shows real things (see Departures from Reality).
7. A final decision with clear justification.
8. A log of every **vetoed** option and the gate that stopped it.

---

## When to Perform an Alternatives Analysis

Apply these tests to a proposed story decision. If **any** test is true, an AA is warranted before committing.

### Trigger Tests

| # | Test | Ask yourself… |
|---|------|---------------|
| 1 | **Leverage** | Does it open, or close, an enormous number of future opportunities in one stroke? Count both kinds: good things that become possible, and openings for mistakes, contradictions or catastrophe. |
| 2 | **One-way door (canon lock)** | Once later scenes, episodes or spin-offs build on it, would it be hard to undo? |
| 3 | **Source fidelity** | Does it touch the source author's own words, characters or established lore? |
| 4 | **Theme or arc** | Does it change what the story is *about*, or where a character's arc goes? |
| 5 | **Audience exposure** | Will it reach an audience it could mislead or hurt, such as children or a live audience? |

**Two-way doors.** A two-way door is a decision you can walk through, and walk back through if you don't like what's on the other side. It's an opportunity to explore freely, without permanent commitment. If a decision is a two-way door and low leverage, don't run an AA: try it. (Jon credits a colleague with connecting the two-way-door idea to this method. The one-way and two-way door phrasing is widely associated with Jeff Bezos's 2015 Amazon shareholder letter.)

### Short-Circuit Rules

- **Two-way door, low leverage:** no AA. Prototype it, look at it, keep or revert. Record a one-line rationale. **Say this exit out loud**, even inside a larger AA: when a part of the decision is a two-way door, write "two-way door: prototype it" against that part and move on, rather than scoring it. It is the fastest path the spec offers, and it is easy to forget once a matrix is open.
- **Existing AA or canon already covers it:** reference the prior document instead of duplicating.
- **Line-level choices** (a single joke, a word, a caption): no AA. Use the lighter tools below.

### Confidence Calibration

- Any single test clearly **yes** → perform the AA.
- **Maybe** on two or more tests → treat as warranted. A **mini AA** (three to four criteria, no Monte Carlo) is acceptable when no test is clearly yes.
- All tests clearly **no** → no AA. Record the rationale.

### Lighter Tools (when an AA is not appropriate)

| Tool | Use it for |
|---|---|
| **Prototype and look** | Two-way doors. Build both quickly and compare them on screen. |
| **This or that** | A fast pairwise taste call between two options. |
| **Yes, and riff** | Generating options before any judgment. |
| **But / Therefore pass** | Checking a sequence of beats for loose joints. |
| **Morphological box** (Fritz Zwicky) | Exploring every combination of a few dimensions, such as agency × empowerment for two characters. |
| **Playtest / table read** | Hearing how a real audience (a test reader, a small audience) reacts. |

## Decisions Made of Parts

A script is usually one overall decision made of smaller ones: how the cuts relate to each other, the spine, a cut for a particular setting, what the viewer can do after the story ends. Record it as **one parent AA with a mini AA per part**.

### The parent AA

The parent owns everything the parts share:

- the story question for the whole piece, and its background,
- the **settings of use**,
- the **gates**,
- the **criteria ranking** (the director's weights), which every part uses unless it has its own (see below),
- the list of parts, and the **roll-up** of their winners.

### The parts

Each part is a mini AA (three to four criteria, no Monte Carlo unless the margin is close) with its own question, options, scores and winner. A part that is a two-way door is not scored at all: write "two-way door: prototype it" against it in the parent's list. Standard parts to consider:

| Part | Question it answers |
|---|---|
| **How the cuts relate** | One cut for every setting, or separate cuts that share material? |
| **The spine** | Which beats, in which order, carry the story? |
| **A cut per setting** | What changes for a setting with its own needs, such as big screen with no hands? |
| **After the story** | What can the viewer do once it ends: replay, explore, play? |
| **Visual style and level of realism** | See Standard Part: Visual Style and Level of Realism. |

### How gates pass down

1. Every gate and setting of use in the parent binds **every** part. A part never drops or loosens an inherited gate.
2. A part may **add** a gate of its own. It applies to that part only, and is listed in the parent's gate table with the part named.
3. A part may rank its own criteria when its priorities really differ from the parent's. Record that it did, and why.

### How part winners roll up

The parent's record holds one row per part:

| Part | Winner | Margin | Hinge | Status |
|---|---|---|---|---|
| *The spine* | *The plain option name* | *Close or clear* | *What the choice depends on* | *Chosen, tie for the director, or two-way door* |

Then, in the parent:

1. **Fit check.** Do the part winners work together? Name any pair that clashes (for example, a spine that needs a tap and a cut for a setting with nobody to tap).
2. **On a clash,** reopen the part with the smaller margin, under the other part's winner as a new constraint, and score it again.
3. **Whole-piece But / Therefore pass** on the assembled script (per entry point and per screen when it is non-linear).
4. The parent has a decision matrix of its own **only** when there are whole-piece alternatives to compare (for example, two complete assemblies). Otherwise its decision is the roll-up table.

The [Criteria Ranker](https://alternatives.jonashw.dev/toolkit/criteria-ranker.html?example=parts) can hold a parent and its parts on one page: one ranking, the shared gates shown once, a column for the director's delight score, and the roll-up table.

---

## AA Template Structure

### Metadata

| Field | Description |
|-------|-------------|
| **Summary** | The story question in one line |
| **Created** | Date of creation |
| **Status** | `DRAFT` · `READY FOR REVIEW` · `FINAL` |
| **Source author** | Whose material this touches (their words are never changed without their say) |
| **Scorer bias** | Who proposed which options, and any leaning declared *before* scoring |
| **Parent / parts** | For a part: its parent AA. For a parent: the list of its parts (see Decisions Made of Parts) |

### Background

What is fixed canon, what is open, and why the question matters (the leverage and the door type).

### Settings of Use

List every setting where the story will be watched, and who is watching. The same script can succeed in one setting and fail in another, so options are judged against these settings, not against an ideal viewer.

| Setting | Who is there | Can anyone interact? | Notes |
|---|---|---|---|
| *Adult alone* | *One adult* | *Yes* | *e.g. on a phone, sound may be off* |
| *Kid with a grown-up* | *Child and adult together* | *Yes, the adult may read or tap* | |
| *Kid alone* | *One child* | *Yes, the child only* | *Reading level, safety* |
| *Big screen, no hands* | *A room, possibly a crowd* | *No: it runs unattended* | *Seen from a distance, may loop* |

Standard settings to consider: **adult alone**, **kid with a grown-up**, **kid alone**, and **big screen with no hands** (a wall, a TV or a projector running on its own). Add others as needed (a live reading, a classroom).

Each setting can bring its own gates. The standard one is **Works unattended**: when any setting has nobody to tap, every beat must play, advance and read without input. A beat that waits for a tap fails this gate.

### Decision

A decision summary, in the story's own terms (name the options in plain words, not letters).

### Proposal

A detailed description of the chosen beats, including any new scenes and how they connect (the But / Therefore chain).

### Consequences

#### Effort Estimate

Effort replaces cost. Measure it as **time to a proof of concept**, meaning how quickly the director can *see* the idea working, plus the effort to finish it.

| Effort (first visible sketch, finished scene) | Option 1 | Option 2 | Option 3 |
|---|---|---|---|
| **Time to a proof of concept** | | | |
| **Effort to finish** | | | |
| **Assets reused** | | | |

#### Positive Impacts

- Opportunities this opens: later episodes, spin-offs, jokes, themes.

#### Negative Impacts

- Opportunities this closes, and openings for mistakes or contradictions.

### Analysis

#### Viability Gates

Gates are must-haves. Apply them **before** scoring. An option that fails a gate is **vetoed**: it is not scored, but it **must** be logged with the reason.

| Option | Gate failed | Why (explained clearly) |
|---|---|---|
| *Vetoed option* | *e.g. Source words* | *It rewrites the author's line X* |

Suggested gates (adapt per story):

1. **Source words.** Doesn't change the source author's words. Adding is welcome ("yes, and").
2. **Audience safety.** Nothing cruel, harmful or misleading on the surface for the intended audience. Darker readings are fine underneath, for older viewers.
3. **Ownership.** No copying of others' owned characters. Homage and credited influence are welcome.
4. **Works unattended.** Required when any setting of use has nobody to interact (see Settings of Use). Every beat plays, advances and reads with no input.

**Zero-veto mode (alternative).** Instead of screening options out, a gate can sit in the matrix as a row with no weight, scored **0** (fails) or **1** (passes). Any 0 sets that option's total to 0:

$$V_j = G_j \sum_{i=1}^{n} W_i S_{ij}, \qquad G_j = \prod_{g} \mathbb{1}[\text{gate } g \text{ passed}]$$

The vetoed option stays visible in the matrix, which is the log. Robustness analysis runs on the options that passed. Use either mode, but record which one you used.

#### Option Rules

1. **At least one wild option.** Include one option that is deliberately bold or strange. The matrix tends to reward safe choices, and this rule pushes back.
2. **Generate before judging.** Collect options with "yes, and" before anyone scores.
3. **Plain names.** Name options for what they are ("the borrowed map"), not by letter.
4. **Label authorship.** Mark which options come from the source and which were added, and by whom.

#### Option 1

- **Pros**:
- **Cons**:

#### Option 2

- **Pros**:
- **Cons**:

#### Decision Matrix

Every story AA with two or more viable options must include a **transposed decision matrix**: evaluation criteria as rows, options as columns. It follows multi-criteria decision analysis (MCDA) conventions such as the weighted sum model and Kepner-Tregoe decision analysis, and renders cleanly in Markdown.

##### Schema

| Evaluation Criteria | Weight | Option A | Option B | Option C |
|---|---|---|---|---|
| *Criterion 1* | $W_1$ | $S_{11}$ | $S_{12}$ | $S_{13}$ |
| *Criterion 2* | $W_2$ | $S_{21}$ | $S_{22}$ | $S_{23}$ |
| … | … | … | … | … |
| **Total Weighted Score** | $\sum W_i$ | $V_1$ | $V_2$ | $V_3$ |

Where:

$$V_j = \sum_{i=1}^{n} (W_i \times S_{ij})$$

##### Row Categories

Organize criteria into layers:

1. **Source Fit**: fidelity to the source ("yes, and": adding is welcome, changing words is not) and fit with established lore.
2. **Meaning**: theme, character arc, agency and empowerment, the story's dualities.
3. **Audience Experience**: **delight** (surprise, joy, the "oh!"), humour and tone, clarity for the intended audience.
4. **Production Fit**: time to a proof of concept, effort to finish, assets reused.
5. **Future**: room for later episodes and spin-offs, and homage without copying.

> When selecting criteria, make sure the non-obvious obligations are rows rather than afterthoughts: continuity with other scenes, audience safety beyond the gates, and how the choice reads to someone who hasn't seen the rest.

##### Starter Criteria (adapt per story)

| Criterion | Suggested weight | 1 means | 3 means | 5 means |
|---|---|---|---|---|
| True to source | 0.15 | It contradicts the source | It changes some of the source's words | It keeps the words; additions welcome |
| Lore fit | 0.20 | It breaks established facts | It keeps them, adds nothing | It keeps them and deepens them |
| Theme | 0.15 | Unrelated to the theme | Touches it later | Puts it in play from the start |
| Delight | 0.15 | Predictable | Pleasant | A genuine "oh!" moment |
| Humour and tone | 0.10 | It forces the wrong tone | It allows some jokes | It's rich in the right register |
| Time to a proof of concept | 0.05 | Several new pieces before it's visible | One new piece | Visible with what exists |
| Later episodes | 0.15 | It closes the arc | It leaves one thread open | It opens a running arc |
| Homage, not copy | 0.05 | It reads as someone else's character | A familiar trope with a twist | Original, with credited influences |

**Who scores what.** The director (the source author) scores **delight**, because it's a gut call. Anyone may score the rest, but the scorer bias is declared in the metadata.

##### Rules

1. **Normalize weights.** All weights must sum to 1.0 (or 100). Gate rows carry no weight.
2. **Standardize scoring.** Use a uniform integer scale (1–5) across all weighted cells. Gates are 0 or 1.
3. **Anchor scores.** Define what each score level means for each criterion. Rewrite an anchor when the director clarifies what a criterion means (for example, "yes, and" for true to source), and log the change.
4. **Include a summary row.** The final row must show the total weighted score ($V_j$) for each option.
5. **Negative criteria.** For criteria where lower is better (effort, risk), invert the scale so that a higher score still means "more desirable", or document the inversion explicitly.
6. **Score history.** When a score changes after discussion, keep the old value and the reason. A story AA is a conversation, and its turns are part of the record.

##### Weight Elicitation

The director sets the weights, not the analyst. Use the [Weight Elicitation](https://alternatives.jonashw.dev/general.md) method from the general variant: the director answers "Which matters more to you?" one pair at a time (one of the two, or "about the same"), the criteria are sorted by binary insertion, and the order becomes weights by rank-order centroid (steep) or rank-sum (gentle). The director's ranking and the full list of answers are the weights of record. A reusable page for this is the [Criteria Ranker](https://alternatives.jonashw.dev/toolkit/criteria-ranker.html).

##### Robustness

A weighted score is only as trustworthy as its weights, which are the most subjective input in the model. **Every AA with two or more viable options must test how sensitive the result is to them.** In storytelling the scores are judgments too, so the robustness tests are also the remedy for false precision. Report the following:

1. **Dominance check.** If one option scores at least as high as every other option on *every* criterion, it wins under any weights. When this holds, declare the dominant option and note that weighting is moot.

2. **Winning margin.** Report the gap between the top two options, both absolute and normalized to the scoring scale:
$$\Delta = V_{(1)} - V_{(2)}, \qquad \bar{\Delta} = \frac{\Delta}{S_{\max} - S_{\min}}$$
A margin is **close** when $\bar{\Delta} < 0.05$. **In a story AA, a close margin is a tie: it is the director's call.** Before deciding, try to **combine** the tied options into a hybrid that keeps the strongest parts of each (as in Stuart Pugh's concept-selection method), then score the hybrid.

3. **Critical-weight (flip-point) analysis.** For each criterion $k$, compute the smallest change $\delta_k$ to its weight that would reverse the top two options, holding scores fixed and renormalizing the remaining weights proportionally:
$$\delta_k = \frac{\Delta}{\dfrac{\Delta - W_k d_k}{1 - W_k} - d_k}, \qquad d_k = S_{k,(1)} - S_{k,(2)}$$
The criterion with the smallest feasible $|\delta_k|$ is the **most critical criterion**. Report what it means in story terms (for example, "the storm scene wins only because it is cheaper to show").

4. **Score flip points.** Because story scores are judgments, also report the smallest change to a single score, or a pair of scores, that would flip the result, and name who made those calls.

5. **Monte Carlo simulation.** Required when the margin is close; recommended otherwise.
   - **Weights:** draw from a Dirichlet distribution centred on the base weights (or ±20% relative, renormalized).
   - **Scores:** in a second run, also perturb every score by −1, 0 or +1, kept within the scale.
   - Run at least 1,000 trials (10,000 when the margin is close). Fix and record the random seed.
   - Report each option's win probability for both runs.

6. **Order-consistent simulation.** Once the director has ranked the criteria, sample at least 10,000 random weight vectors that keep that order (sort uniform draws, normalize), and report win probabilities. Also swap each pair of neighbours in the ranking and report any swap that changes the winner.

7. **Name the hinge.** State in one sentence what the choice actually depends on (a weight, a score, or neither), and put that question to the director.

### But / Therefore

Write the beats as a chain with the joining word between each one: *therefore*, *but* or *and then*. Remove each beat in turn. If nothing after it breaks, the beat is loose: fix it, or keep it on purpose with a reason. Idle loops in interactive pieces, slice-of-life moments and kishōtenketsu turns are legitimate reasons.

Run the pass **twice**:

1. **First draft.** Run it on the very first draft, before any option is scored or built. A missing "therefore" is cheapest to find before anything is drawn, and it often shows that an option needs a beat nobody has written yet.
2. **Close.** Run it again on the chosen beats once the decision is made.

#### Non-linear stories

A hub with a screen per subject, a game mode or several ways in has no single chain. Write one chain **per entry point** (each way a viewer can arrive, through to where they leave) and one chain **per screen** (the beats inside that screen). Every screen needs its own "therefore": the reason the viewer is there and what follows from it. One chain for the whole piece hides the screens that have none.

### Departures from Reality

When a story shows real things (animals, places, science, history), list every place it departs from reality on purpose. Departures are welcome; hidden ones are not.

| Departure | Why it is there | How the viewer is told |
|---|---|---|
| *A joke zoom far past real scale* | *The surprise of the reveal* | *A plain caption gives the true scale seconds later* |
| *False colour* | *To tell two things apart* | *A "colours added" label* |
| *A "super powers" mode* | *Play* | *The mode's name and a switch back to "real"* |

A departure with no "how the viewer is told" either gets one or is a mistake.

### Two Voices

A common and useful pattern: a **shout voice** overstates for the laugh or the surprise, and a **plain voice** corrects it seconds later with the true version. The overstatement is the joke; the correction is what the viewer keeps.

Every shout claim that is not literally true is listed with its correction:

| Shout claim | Correction | Where the correction appears |
|---|---|---|
| *An overstated claim, shouted* | *The true statement* | *The same screen, a few seconds later, in the plain voice* |

A fact gate judges the pair, not the shout line alone: a listed shout claim with its correction shown in the same setting passes. A shout claim with no listed correction fails. In settings where the viewer may leave before the correction (a looping wall, a skippable screen), the correction must appear before they can leave.

### Standard Part: Visual Style and Level of Realism

Any story with pictures carries a decision about how it looks and how real it looks (flat cartoon, stylized, painted, photoreal, diagrammatic). Treat it as a standard decision part. Its default is to **ask the director**: the analyst lays out the options and does not pick one.

Score its options **in the real view**, not on a close-up mock-up:

| Real-view check | Ask |
|---|---|
| **Distance** | How far is the viewer from the screen in each setting of use? Does the style still read from there? |
| **Scale** | How big does it appear on the target screen, and how small are the smallest details? |
| **Motion** | Does the style hold up moving at real speed, not only as a still? |
| **Target device** | Does it look right, and run smoothly, on the actual phone, tablet, TV or projector? |

The quickest way to score these is usually to prototype two or three styles and look at them on the target device, from the real distance.

### Diagrams

Include diagrams or other visuals where they clarify the story or distinguish options. At minimum:

- **Context diagram:** the decision in the story world. Which characters, scenes, episodes and spin-offs it touches, and where canon is fixed.
- **Per-option sketch:** for each viable option, a beat strip or flow showing how the sequence differs, or a character sketch where the choice is visual.

A simple table or hand sketch is acceptable. Where a reproducible format is preferred, use a code-first, text-based one (e.g., Mermaid). Agent-harness visualization features (interactive widgets, canvases) are equally acceptable where they aid understanding.

---

## Lineage

- **Aristotle**, *Poetics* (c. 335 BCE): plots whose episodes follow one another "without probable or necessary sequence" are the worst kind.
- **E. M. Forster**, *Aspects of the Novel* (1927): "The king died and then the queen died" is a story. "...and then the queen died of grief" is a plot.
- **Kenn Adams**, the Story Spine (improv, c. 1991): "Because of that… because of that… until finally…". It reached Pixar through improv teacher Rebecca Stockley.
- **Pixar:** Emma Coats's "22 rules" (2011–12), including rule 19 on coincidences. Ed Catmull's *Creativity, Inc.* (2014) describes the Braintrust: candid notes that are never binding, with the director making the call. That is this spec's "tie means the director decides".
- **Trey Parker and Matt Stone** (NYU, mtvU *Stand In*, 2011): replace "and then" with "therefore" or "but".
- **Stuart Pugh:** the concept-selection matrix, which compares options and then combines their strengths into hybrids.
- **Fritz Zwicky:** morphological analysis, a box of combinations for generating options.
- **Two-way doors:** Jeff Bezos (2015 Amazon shareholder letter). A colleague of Jon's connected the idea to this method.

## First worked example

Two characters' origins (2026-11-12). Both questions came down to a director's call between strong options. The best outcome was a hybrid the director proposed after reading the scores.
