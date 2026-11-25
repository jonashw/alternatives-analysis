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
9. The story's requirements sorted into **gates** (must-haves) and **wants** (trade-offs) with the director, before any scoring. Only wants become weighted criteria. Each requirement is recorded in the requirements table with how it is tested, its source, and the gate or criterion it became.

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

The [Criteria Ranker](https://alternatives.jonashw.dev/toolkit/criteria-ranker.html?example=parts) can hold a parent and its parts on one page: one ranking, the shared gates shown once, a row of 1 to 5 the director taps for each option's delight score, and the roll-up table.

---

## Revisiting a Decision

When a decision is revisited, write a **new AA that supersedes the old one**. Never rewrite the old AA: it is the record of what was known and decided at the time.

1. **Link both ways.** The new AA's **Supersedes** field links the old one. Once the new AA is `FINAL`, change only two things on the old one: its **Status** becomes `SUPERSEDED`, and its **Superseded by** field links the new AA. Leave the rest of the old AA untouched.
2. **Say what changed.** Right after the Background, add a **What Changed** section. Cover what is new in the situation, which requirements, gates, criteria and alternatives were added, dropped or reworded, and the old result in one line.
3. **Keep ids stable.** A requirement, criterion or alternative that means the same thing keeps its old id. A reworded one keeps its id and is listed under What Changed. A new one gets a new id, and a dropped id is never reused.
   - **Split:** a requirement that splits keeps its id as a stem with letter suffixes, so R2 becomes R2a and R2b. This also covers a requirement that becomes a gate floor plus a want (R4a the gate, R4b the want). Each part names its parent in the Source column, for example "split from R2 in [old AA]". The parent counts as split, not dropped: What Changed lists "R2 split into R2a, R2b", and the bare id is never reused.
   - **Merge:** requirements that merge keep the lowest of their ids. The merged requirement's Source lists the ids folded into it, and What Changed lists "R5 and R8 merged into R5".
   - **Report every id.** What Changed sorts every old id into kept, reworded, split, merged or dropped, and lists the new ids.
4. **Cite the old AA.** In the requirements table, a requirement that carries over names the old AA as its Source.
5. **Rank again.** Changed criteria need fresh weights, so the decision owner ranks again in a new ranker. Give the new Criteria Ranker its own `DATA.key`, and leave the old ranker and its answers as they are.
6. **Keep the chain.** If the old AA itself superseded another, don't repeat that history. The links already lead back through it.
7. **Hand off as a new AA.** When one project or agent redoes an AA that another project owns, its handoff asks for a new superseding AA, never an edit to the old one, and never an "earlier pass" note folded into it. Only the project that owns the old AA changes its Status and Superseded by fields, and only once the new AA is `FINAL`.
8. **Old AA without ids.** If the old AA never numbered its requirements, criteria or alternatives, the new AA numbers them for the first time. What Changed names each old item by its wording (in quotes), gives the id it now has, and sorts it into kept, reworded, split, merged or dropped as usual. From then on those ids follow the rules above.
9. **Superseding more than one AA.** When two AAs turn out to be one decision, one new AA can supersede both. List each in Supersedes, account for every item of each in What Changed, and cite each as Source for what it carries over. Each old AA gets the same Status and Superseded by change, made by the project that owns it.

---

## AA Template Structure

### Metadata

| Field | Description |
|-------|-------------|
| **Summary** | The story question in one line |
| **Created** | Date of creation |
| **Status** | `DRAFT` · `READY FOR REVIEW` · `DEFERRED` · `FINAL` · `SUPERSEDED` |
| **Supersedes** | The earlier AA or AAs this one replaces, linked, with their dates (see Revisiting a Decision). Leave blank for a first AA |
| **Superseded by** | Set only once a newer AA is final, linked. The only other field changed on a superseded AA is its Status |
| **Decision trigger** | Only for a `DEFERRED` AA: the event that forces the decision, how that event is noticed (by whom or by what, and how it reaches the decision owner), and how soon after it the decision is made. Not called a gate: a gate is a must-have (see Requirements: Gates and Wants) |
| **Check back** | Only for a `DEFERRED` AA: a date to re-read the trigger even if it has not fired |
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

**A deferred decision.** When the right choice depends on something that has not happened yet, set Status to `DEFERRED`. Name the Decision trigger and a Check back date, say what stays in place until then (the default), and write here what the trigger will settle. When the trigger fires or the check-back date comes, finish the AA to `FINAL`. A deferral needs a trigger someone or something will notice: if nobody would see the event happen, build or name the alert first, or decide now.

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

#### Requirements: Gates and Wants

Confirm the requirements with the director before naming any criteria. A criterion can only be as clear as the requirement behind it, so write the requirements with care first. The rules below are a short subset of requirements-engineering practice (ISO/IEC/IEEE 29148, the INCOSE Guide for Writing Requirements, EARS; see Sources).

##### Eliciting

- **Start from real moments.** Ask "Tell me about the last time this went wrong" or "...went well" before asking what the director wants. A requirement drawn from a real loss is sharper than one imagined (the critical-incident technique).
- **Know who measures value.** Name whose value each requirement serves: the director themselves, or the organization or users they stand in for. Write it in that voice (see Write in the voice of whoever measures value under Weight Elicitation).

##### Writing each requirement

- **One requirement per statement.** If it has an "and" joining two needs, split it.
- **Open with the situation** when it only applies in one: "When a site blocks saving, I can still get it in". This is the event-driven form of EARS and of job stories ("When ___, I want to ___, so I can ___").
- **No vague words.** "Little", "easy", "fast", "simple" and "user-friendly" mean different things to different readers. Give a number or define the level: "It costs me under $5 a month", not "It costs me little".
- **The need, not a solution.** "My captures can leave with me if I switch", not "Has an export button".
- **Same term, same thing.** Use one word for each thing throughout, and define any term a newcomer would not know.

##### Sorting into gates and wants

- **Gate (must-have).** An option that falls short is out, however well it does elsewhere. Gates are pass or fail and carry no weight.
- **Want (trade-off).** The director would give up some of it to get more of another. Only wants become criteria in the matrix.

To sort one, ask: "If an option did everything else well but fell short on this, would you still consider it?" "No" makes it a gate. "Yes, but I'd mind" makes it a want. A requirement can be both: a floor that is a gate ("nothing frightening for the youngest viewers") and more above the floor that is a want ("the gentler, the better"). Write the floor as the gate and the rest as the criterion.

##### The requirements table (required)

Record every requirement in one table. It is the record of what was asked for, and it traces each gate and criterion back to a need:

| # | Requirement | Gate or want | Why (the director's words) | How we tell | Source | Becomes |
|---|---|---|---|---|---|---|
| *R1* | *When the youngest viewers watch, nothing frightens them* | *Gate* | *"If it scares a five-year-old, it's out"* | *Passes if a read-through with the director flags no frightening moment* | *Director, first meeting* | *Gate GENTLE* |
| *R2* | *When the scene is watched, the joke lands without explaining it* | *Want* | *"I want them to laugh, not be told why"* | *5 laughs on first watch; 3 a smile; 1 needs explaining* | *Director, first meeting* | *Criterion LAND* |

- **How we tell** (the fit criterion). For a gate: the pass test, concrete enough that two people would agree on the result. For a want: the score anchors, what 1, 3 and 5 look like (see Anchor scores).
- **Source.** Who said it, and when or where.
- **Becomes.** The gate or criterion id it turned into. Every gate and every matrix row names its requirement number, so any line of the result can be followed back through its scores to the requirement and the director's words, and every requirement can be followed forward to where it counted.

##### Quality review (before scoring)

Check each requirement: is it **necessary** (someone would miss it), **unambiguous** (one reading), **singular** (one need), **verifiable** (the How we tell column is filled in), and **consistent** (no conflict with another)? Then check the set: is it **complete** (nothing the director would add after the result), and is it **free of overlap** (see Check for overlap before the owner ranks)? Fix what fails before any option is scored.

##### Read back, then baseline

Read the requirements back to the director in plain words, and get a yes before scoring. That table is the baseline. If a requirement changes afterwards, log the change (what, when, why) in the table, and re-ask any ranking answers given to the old words.

**Signs a requirement was sorted wrong:** the director calls more than three criteria "about the same" at the top of the ranking (see Big ties under Weight Elicitation), or most options score at the floor on one criterion. Sort it again with the director and re-run the gates.

#### Viability Gates

Gates are must-haves (see Requirements: Gates and Wants). Apply them **before** scoring. An option that fails a gate is **vetoed**: it is not scored, but it **must** be logged with the reason.

| Option | Gate failed | Why (explained clearly) |
|---|---|---|
| *Vetoed option* | *e.g. Source words* | *It rewrites the author's line X* |

Suggested gates (adapt per story):

1. **Source words.** Doesn't change the source author's words. Adding is welcome ("yes, and").
2. **Audience safety.** Nothing cruel, harmful or misleading on the surface for the intended audience. Darker readings are fine underneath, for older viewers.
3. **Ownership.** No copying of others' owned characters. Homage and credited influence are welcome.
4. **True to the facts.** For stories that show real things (science, nature, history). Every claim is true, or is a listed departure from reality, or is a shout claim whose correction is listed and shown (see Two Voices).
5. **Works unattended.** Required when any setting of use has nobody to interact (see Settings of Use). Every beat plays, advances and reads with no input.

**Zero-veto mode (alternative).** Instead of screening options out, a gate can sit in the matrix as a row with no weight, scored **0** (fails) or **1** (passes). Any 0 sets that option's total to 0:

$$V_j = G_j \sum_{i=1}^{n} W_i S_{ij}, \qquad G_j = \prod_{g} \mathbb{1}[\text{gate } g \text{ passed}]$$

The vetoed option stays visible in the matrix, which is the log. Robustness analysis runs on the options that passed. Use either mode, but record which one you used.

**A gate made from a scored criterion** (for example, one the director named a must-have during the ranking) passes where the option scores 3 or more on the 1 to 5 scale, unless the director says otherwise. Record every case the director switched.

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

Write each criterion as one plain sentence about what good looks like for the director, starting with its requirement number, and keep a short code beside it: the director ranks the sentence. Write it in the director's voice ("I…"), or in the audience's when the director decides for them. When two criteria are linked, open each with the situation it covers ("When the scene is read aloud…", "When the scene is watched…"), so only one quality varies in each comparison, and check for overlapping pairs before the director ranks. See "Write each criterion as one plain sentence about what good looks like", "Write in the voice of whoever measures value", "Hold the situation constant" and "Check for overlap before the owner ranks" in the [general variant](https://alternatives.jonashw.dev/general.md).

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

The director sets the weights, not the analyst. Use the [Weight Elicitation](https://alternatives.jonashw.dev/general.md) method from the general variant: the director answers "Which matters more to you?" one pair at a time (one of the two, or "about the same"), the criteria are sorted by binary insertion, and the order becomes weights by rank-order centroid (steep) or rank-sum (gentle). When more than three criteria end up "about the same", the same method asks the big-tie question ("If you could only keep one of these, which?"), and criteria the director calls must-haves there become gates. The director's ranking and the full list of answers are the weights of record. A reusable page for this is the [Criteria Ranker](https://alternatives.jonashw.dev/toolkit/criteria-ranker.html).

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

7. **Big-tie check.** Required when more than three criteria tie at the top. Tied criteria share one weight, so on those rows only the scores separate the options, and an order-consistent simulation looks more certain than it is. Report the lead of the top two under equal weights next to the lead under the director's weights, and the share of the gap between them that comes from criteria inside the tie $T$:
$$\text{share}_T = \frac{\sum_{k \in T} |W_k d_k|}{\sum_k |W_k d_k|}, \qquad d_k = S_{k,(1)} - S_{k,(2)}$$
When more than half the gap comes from the tie, say that the scores decide the result more than the ranking does, and offer the big-tie question (see Weight Elicitation).

8. **Name the hinge.** State in one sentence what the choice actually depends on (a weight, a score, or neither), and put that question to the director.

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

The **True to the facts** gate judges the pair, not the shout line alone: a listed shout claim with its correction shown in the same setting passes. A shout claim with no listed correction fails. In settings where the viewer may leave before the correction (a looping wall, a skippable screen), the correction must appear before they can leave.

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
- **Decision analysis and requirements engineering:** the sources listed under Sources in the [general variant](https://alternatives.jonashw.dev/general.md).

## First worked example

Two characters' origins (2026-11-12). Both questions came down to a director's call between strong options. The best outcome was a hybrid the director proposed after reading the scores.
