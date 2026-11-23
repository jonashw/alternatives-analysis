# Alternatives Analysis Specification (Storytelling)

> A decision-matrix-driven story decision record: the story choice is the output of a weighted comparison of viable alternatives, not an assertion made up front.
>
> **Method:** A weighted decision matrix scored with the **Weighted Sum Model (WSM)**, also known as Simple Additive Weighting (SAW), a standard **multi-criteria decision analysis (MCDA)** technique, with weights set by the director through ordinal pairwise ranking, paired with explicit sensitivity and robustness analysis (dominance check, winning-margin and critical-weight analysis, score flip points, and Monte Carlo simulation), plus **viability gates** that veto options without hiding them.
>
> **Scope:** This specification is contextualized to **storytelling and storycrafting**: stories, scripts, cutscenes, characters and lore, and any authored sequence an audience lives through (including interactive and live sequences). A [general-purpose variant](https://alternatives.jonashw.dev/general.md) and a [software variant](https://alternatives.jonashw.dev/software.md) are maintained separately.
>
> **Status:** Version 1, adopted for use 2026-11-12. Proven on one story so far. To be tested and refined across many.

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
2. Detailed exploration of at least two viable options, including at least one deliberately **wild option** (see Option Rules), with comparative analysis.
3. Explicit identification of trade-offs, including fidelity to the source, tone, audience safety, effort to see it working, and reversibility once other scenes build on it.
4. A final decision with clear justification, and the chosen beats run through a **But / Therefore pass**.
5. A log of every **vetoed** option and the gate that stopped it.

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

- **Two-way door, low leverage:** no AA. Prototype it, look at it, keep or revert. Record a one-line rationale.
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

### Background

What is fixed canon, what is open, and why the question matters (the leverage and the door type).

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

Name each criterion by why it matters, not by the feature: the director ranks the name. See "Name the reason, not just the feature" in the [general variant](https://alternatives.jonashw.dev/general.md).

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

### Closing Pass: But / Therefore

After choosing, write the chosen beats as a chain with the joining word between each one: *therefore*, *but* or *and then*. Remove each beat in turn. If nothing after it breaks, the beat is loose: fix it, or keep it on purpose with a reason. Idle loops in interactive pieces, slice-of-life moments and kishōtenketsu turns are legitimate reasons.

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
