# Alternatives Analysis Specification

> A decision-matrix-driven ADR: the decision is the output of a weighted comparison of viable alternatives, not an assertion made up front.
>
> **Method:** A weighted decision matrix scored with the **Weighted Sum Model (WSM)**, also known as Simple Additive Weighting (SAW), a standard **multi-criteria decision analysis (MCDA)** technique, with weights set by the decision owner through ordinal pairwise ranking, paired with explicit sensitivity and robustness analysis (dominance check, winning-margin and critical-weight analysis, Monte Carlo weight simulation, and rank-order, big-tie, swap and score-flip tests), plus **viability gates** that veto options without hiding them.
>
> **Scope:** This specification is contextualized to **software** architecture and engineering decisions. A [general-purpose variant](https://alternatives.jonashw.dev/general.md) for non-software decisions and a [storytelling variant](https://alternatives.jonashw.dev/storytelling.md) for story decisions are maintained separately.

## Required Content

Each AA document must include:

1. Clearly defined problem statement and background context.
2. Detailed exploration of at least two viable solutions, including comparative analysis.
3. Explicit identification of trade-offs, including considerations like cost, scalability, maintainability, and reversibility.
4. Final decision with clear justification.
5. Requirements sorted into **gates** (must-haves) and **wants** (trade-offs) with the decision owner, before any scoring. Only wants become weighted criteria. Each requirement is recorded in the requirements table with how it is tested, its source, and the gate or criterion it became.
6. A log of every **vetoed** alternative and the gate that stopped it.

---

## When to Perform an Alternatives Analysis

Apply these tests to a proposed decision. If **any** test is true, an AA is warranted before committing.

### Trigger Tests

| # | Test | Ask yourself… |
|---|------|---------------|
| 1 | **New technology** | Does it introduce a framework, dependency, or service not already in the approved stack? |
| 2 | **Cross-team blast radius** | Does it materially affect more than one team's codebase, interfaces, or operations? |
| 3 | **Data architecture change** | Does it alter the data model, schema, retention/volume, or performance profile? |
| 4 | **One-way door** | Is the decision hard or costly to reverse once implemented? |
| 5 | **Structural refactoring** | Does it replace a core component, change an integration pattern, or add an architectural layer? |

### Short-Circuit Rules

- **Reused approved pattern, no new dependencies:** no AA needed, record that rationale.
- **Existing AA or decision already covers it:** reference the prior document instead of duplicating.

### Confidence Calibration

- Any single test clearly **yes** → perform the AA.
- **Maybe** on two or more tests → treat as warranted.
- All tests clearly **no** → no AA; record the rationale.

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

---

## AA Template Structure

### Metadata

| Field | Description |
|-------|-------------|
| **Summary** | Summary of AA |
| **Created** | Date of creation |
| **Status** | `DRAFT` · `READY FOR REVIEW` · `FINAL` · `SUPERSEDED` |
| **Supersedes** | The earlier AA this one replaces, linked, with its date (see Revisiting a Decision). Leave blank for a first AA |
| **Superseded by** | Set only once a newer AA is final, linked. The only other field changed on a superseded AA is its Status |

### Background

Provide background information for this AA

### Decision

Provide a decision summary.

### Proposal

Write a detailed description of the proposal.

### Consequences

#### Cost Estimate

Provide a high order level cost estimate of the recommended approach.

| Cost and Savings (6 months for development, 5–10 years for infrastructure) | Option 1 | Option 2 | Option 3 |
|---|---|---|---|
| **Total Cost** | | | |
| **Cost Savings** | | | |

#### Positive Impacts

- List positive impacts.

#### Negative Impacts

- List negative impacts.

### Analysis

#### Requirements: Gates and Wants

Confirm the requirements with the decision owner before naming any criteria. A criterion can only be as clear as the requirement behind it, so write the requirements with care first. The rules below are a short subset of requirements-engineering practice (ISO/IEC/IEEE 29148, the INCOSE Guide for Writing Requirements, EARS; see Sources).

##### Eliciting

- **Start from real moments.** Ask "Tell me about the last time this went wrong" or "...went well" before asking what the decision owner wants. A requirement drawn from a real loss is sharper than one imagined (the critical-incident technique).
- **Know who measures value.** Name whose value each requirement serves: the decision owner themselves, or the organization or users they stand in for. Write it in that voice (see Write in the voice of whoever measures value under Weight Elicitation).

##### Writing each requirement

- **One requirement per statement.** If it has an "and" joining two needs, split it.
- **Open with the situation** when it only applies in one: "When a site blocks saving, I can still get it in". This is the event-driven form of EARS and of job stories ("When ___, I want to ___, so I can ___").
- **No vague words.** "Little", "easy", "fast", "simple" and "user-friendly" mean different things to different readers. Give a number or define the level: "It costs me under $5 a month", not "It costs me little".
- **The need, not a solution.** "My captures can leave with me if I switch", not "Has an export button".
- **Same term, same thing.** Use one word for each thing throughout, and define any term a newcomer would not know.

##### Sorting into gates and wants

- **Gate (must-have).** An alternative that falls short is out, however well it does elsewhere. Gates are pass or fail and carry no weight.
- **Want (trade-off).** The decision owner would give up some of it to get more of another. Only wants become criteria in the matrix.

To sort one, ask: "If an alternative did everything else well but fell short on this, would you still consider it?" "No" makes it a gate. "Yes, but I'd mind" makes it a want. A requirement can be both: a floor that is a gate ("captures stay private to me") and more above the floor that is a want ("the fewer services that can see them, the better"). Write the floor as the gate and the rest as the criterion.

##### The requirements table (required)

Record every requirement in one table. It is the record of what was asked for, and it traces each gate and criterion back to a need:

| # | Requirement | Gate or want | Why (the decision owner's words) | How we tell | Source | Becomes |
|---|---|---|---|---|---|---|
| *R1* | *When I share a post, one tap saves it* | *Want* | *"I'd still use it with two taps, but I'd mind"* | *5 one tap; 3 two taps; 1 a form to fill in* | *Owner, kickoff* | *Criterion TAP* |
| *R7* | *My captures stay private to me* | *Gate* | *"If anyone else can read them, it's out"* | *Passes if no third party can read captures and no key is stored on the phone* | *Owner, kickoff* | *Gate PRIV* |

- **How we tell** (the fit criterion). For a gate: the pass test, concrete enough that two people would agree on the result. For a want: the score anchors, what 1, 3 and 5 look like (see Anchor scores).
- **Source.** Who said it, and when or where.
- **Becomes.** The gate or criterion id it turned into. Every gate and every matrix row names its requirement number, so any line of the result can be followed back through its scores to the requirement and the decision owner's words, and every requirement can be followed forward to where it counted.

##### Quality review (before scoring)

Check each requirement: is it **necessary** (someone would miss it), **unambiguous** (one reading), **singular** (one need), **verifiable** (the How we tell column is filled in), and **consistent** (no conflict with another)? Then check the set: is it **complete** (nothing the decision owner would add after the result), and is it **free of overlap** (see Check for overlap before the owner ranks)? Fix what fails before any alternative is scored.

##### Completeness check (software)

Walk a standard list of quality characteristics, such as ISO/IEC 25010 (functional suitability, performance efficiency, compatibility, interaction capability, reliability, security, maintainability, flexibility, safety), plus cost and exit. For each, ask the decision owner whether anything there would rule an alternative out or make one better. This catches the requirements nobody says out loud, such as backups, uptime, or who fixes it at 2 a.m. Where the decision owner keeps a reliability or security standard, list it here as a source.

##### Read back, then baseline

Read the requirements back to the decision owner in plain words, and get a yes before scoring. That table is the baseline. If a requirement changes afterwards, log the change (what, when, why) in the table, and re-ask any ranking answers given to the old words.

**Signs a requirement was sorted wrong:** the decision owner calls more than three criteria "about the same" at the top of the ranking (see Big ties under Weight Elicitation), or most alternatives score at the floor on one criterion. Sort it again with the decision owner and re-run the gates.

#### Viability Gates

Gates are must-haves (see Requirements: Gates and Wants). Apply them **before** scoring. An alternative that fails a gate is **vetoed**: it is not scored, but it **must** be logged with the reason.

| Alternative | Gate failed | Why (explained clearly) |
|---|---|---|
| *Vetoed alternative* | *e.g. Hard budget ceiling* | *Its yearly cost is twice the ceiling* |

Suggested gates (adapt per decision):

1. **Security and compliance.** Meets the required controls, standards and data rules.
2. **Required integration.** Works with the systems it must connect to, as they are.
3. **Hard budget ceiling.** Fits the most that can be spent, counting licences and running costs.
4. **Hard deadline.** Can be in production by a date that cannot move.
5. **Supportable.** Licensing and support terms the organization can accept.

**Zero-veto mode (alternative).** Instead of screening alternatives out, a gate can sit in the matrix as a row with no weight, scored **0** (fails) or **1** (passes). Any 0 sets that alternative's total to 0:

$$V_j = G_j \sum_{i=1}^{n} W_i S_{ij}, \qquad G_j = \prod_{g} \mathbb{1}[\text{gate } g \text{ passed}]$$

The vetoed alternative stays visible in the matrix, which is the log. Robustness analysis runs on the alternatives that passed. Use either mode, but record which one you used.

**A gate made from a scored criterion** (for example, one the owner named a must-have during the ranking) passes where the alternative scores 3 or more on the 1 to 5 scale, unless the owner says otherwise. Record every case the owner switched.

#### Alternative 1

- **Pros**:
- **Cons**:

#### Alternative 2

- **Pros**:
- **Cons**:

#### Decision Matrix

Every AA with two or more alternatives must include a **transposed decision matrix** — evaluation criteria as rows, alternative solutions as columns. This layout allows criteria to be read naturally top-to-bottom while keeping columns narrow for side-by-side comparison. It aligns with SEI ATAM, ISO/IEC/IEEE 42010, and MADR conventions, and renders cleanly in GitHub Markdown.

##### Schema

| Evaluation Criteria | Weight | Alternative A | Alternative B | Alternative C |
|---|---|---|---|---|
| *Criterion 1* | $W_1$ | $S_{11}$ | $S_{12}$ | $S_{13}$ |
| *Criterion 2* | $W_2$ | $S_{21}$ | $S_{22}$ | $S_{23}$ |
| … | … | … | … | … |
| **Total Weighted Score** | $\sum W_i$ | $V_1$ | $V_2$ | $V_3$ |

Where:

$$V_j = \sum_{i=1}^{n} (W_i \times S_{ij})$$

This is the **Weighted Sum Model (WSM)**, also known as **Simple Additive Weighting (SAW)**: each alternative's total is the weighted sum of its criterion scores.

##### Row Categories

Organize criteria into layers:

1. **Functional Fit** — how completely each alternative satisfies the required capabilities and use cases.
2. **Business Constraints** — time-to-market, total cost, team skill alignment, organizational risk.
3. **Quality Attributes** — scalability, maintainability, security, interoperability, performance, reliability.
4. **Operational Fit** — vendor lock-in risk, day-2 operations, observability, CI/CD compatibility.

> **Write each criterion as one plain sentence about what good looks like.** The owner ranks the name, so the name must be clear without asking. Start with the requirement number it traces to, then say, in the owner's terms, what good looks like for them: "R2 Each result reaches the person who owns it, with no one forwarding it by hand", not "Targeted broadcast". Name the reason, not the feature: "Has an export button" invites a ranking of the button; "R5 Your data can leave with you if you switch" ranks the reason. When a feature serves several needs, name them. If the owner has to ask what a criterion means, rewrite it before they rank.
>
> **Write in the voice of whoever measures value.** Phrase each criterion as something the one whose value it measures would say about their own experience: "R4 I can always see what inspired me", "R9 It costs me little each month". When the decision owner is a proxy, such as an employee deciding for an organization or a team deciding for its users, write in that voice instead: "R4 The org can show an auditor where each record came from", "R2 A caseworker can finish an intake without retyping". The owner should see themselves, or the people they stand in for, in every sentence.
>
> **Hold the situation constant.** Two criteria are linked when one only matters through the other, or one can't change without the other: a backup way in matters only when the normal way fails, and a saved screenshot is already a copy of the post. The owner can't judge linked criteria apart, and "picture two options equal on everything else" doesn't help, because no believable option has one without the other. Instead, open each linked criterion with the situation it covers, so that the situations don't overlap: "R3 When saving works, the creator, caption and date come with it on their own" and "R5 When a site blocks saving, I can still get it in by sharing a screenshot". Each comparison then has one quality to judge, and only that quality varies.
>
> **Check for overlap before the owner ranks.** List the pairs whose answers could leak into each other: two criteria that cover the same situation, one that is a fallback for the other, or one that partly delivers the other. For each pair, add situation clauses, merge the two into one criterion, or sort one into a gate (see Requirements: Gates and Wants). Record the pairs checked and what was done.
>
> **What these rules buy.** In one ten-criterion run, the owner gave 23 answers, and the ranking ended in a single ten-way tie that the big-tie questions had to break apart. After four must-haves were sorted into gates, and the remaining six were rewritten in the owner's voice with situation clauses, the same owner needed 12 answers, had no big tie, and reported more confidence, because each question showed what actually varied.
>
> **Keep a short code beside the sentence.** Give each criterion a short id (BACK, COST, ONCE) as well as its sentence. The copied record lists answers by id ("Set by 18 pairwise answers: BACK > ONCE, ..."), which keeps it short and easy to trace back to the matrix.
>
> **Rewording after answers.** If a criterion's wording changes after the owner has answered, the earlier answers were given to different words. Say so and offer a review of those answers rather than reusing them silently. The Criteria Ranker does this on its own.

> When selecting criteria, ensure operational and non-functional obligations (observability, security, data migration, test strategy, day-2 ops) are represented as criteria rows rather than overlooked.

##### Rules

1. **Normalize weights.** All weights must sum to 1.0 (or 100). Gate rows carry no weight.
2. **Standardize scoring.** Use a uniform integer scale (1–5 recommended) across all cells.
3. **Anchor scores.** Define what each score level means for each criterion (e.g., 1 = poor, 5 = excellent). Include the anchor definitions in a footnote or companion table.
4. **Include a summary row.** The final row must show the total weighted score ($V_j$) for each alternative.
5. **Negative criteria.** For criteria where lower is better (cost, risk, complexity), invert the scale so that a higher score still means "more desirable" — or document the inversion explicitly.

##### Weight Elicitation

The decision owner sets the weights, not the analyst. The analyst drafts weights to start the analysis, then hands the ranking to the owner. The owner's ranking becomes the **weights of record**.

1. **Draft, then find what matters.** Score with draft weights and run the critical-weight analysis (see Robustness) first. Weights that cannot change the winner need little of the owner's time.
2. **Rank, don't rate.** The owner orders the criteria from most to least important. Ordering is easier to do honestly than assigning numbers, and it is easier to defend.
3. **Sort by pairwise questions.** Ask the owner one question at a time, "Which matters more to you, A or B?", and sort the criteria from the answers with a **binary insertion sort**, using the owner's judgment as the comparison:
   - **Answers.** The owner picks one of the two, or "about the same", which records a tie. There are no strength levels and no ratio judgments. The method is ordinal; it is not AHP.
   - **Ties are groups.** "About the same" joins the criterion to the whole group it was compared with. Later criteria are placed above or below the group as a whole, so a tie is never split, and the question names every member of the group.
   - **Fewest questions.** Binary insertion never asks a pair whose answer is already implied. Seven criteria take at most 14 questions, ten at most 25 (bubble sort can need 45). Each tie removes questions.
   - **No leading.** Shuffle the starting order with a fixed seed, so the analyst's draft order does not steer the owner.
   - **Back and forward.** Let the owner step back at any time, including from the finished result. Stepping forward again keeps the answers stepped over.
   - **Review.** Let the owner go through a finished run one question at a time. Each question shows the earlier answer; the owner keeps it or picks another. A changed answer can lead to new questions, and those say they are new. Keeping every answer gives the same ranking.
   - **Check questions.** One insertion run cannot contradict itself, because it never asks an implied pair, but it often places neighbours without comparing them directly. At the end, re-ask a few neighbouring pairs (three by default), nearest the top first, where a flip moves the most weight. A reversal or "about the same" turns that pair into a tie. The owner may skip them.
   - **Big ties.** When more than three criteria end up "about the same", the weights cannot separate them, and only the scores decide between the leading options on those rows. Ask about the group as a whole: "If you could only keep one of these, which?" The one kept moves just above the rest, which stay tied. The owner may also answer "I can't pick one", which keeps the tie, or "these are must-haves, not trade-offs", which turns the ones they name into gates (see Requirements: Gates and Wants) and takes them out of the weights. Ties chain: if A is about the same as B, and B as C, all three are one tie, even where the owner earlier put A above C. Before the big-tie question, tell the owner which of their earlier answers the tie sets aside, so the question reads as sorting them out again rather than as ignoring them. Ask every big group, top first, either until three are left or once per group, and record which. The owner may skip.
   - **Keep the run.** Save the answers with the order, so a reload or a paused run loses nothing.
   - **Seeding.** Either/or answers the owner already gave in discussion may seed the sort.
4. **Or drag.** As an alternative, the owner drags a list into order. Where the owner has done both and the orders differ, the owner picks which one is the record.
5. **Convert the order to weights.** Record which conversion was used. For $n$ criteria ranked $i = 1 \dots n$:
   - **Steep** (rank-order centroid): $W_i = \frac{1}{n}\sum_{k=i}^{n}\frac{1}{k}$
   - **Gentle** (rank-sum): $W_i = \frac{2(n + 1 - i)}{n(n + 1)}$
   - **Ties.** Tied neighbours share the mean of the weights for the ranks they span.
6. **Keep the record.** Record the owner's ranking, the conversion, the full list of pairwise answers (for example `A > B, C = D`), the check answers and the big-tie answers verbatim, and the requirements sorted into gates and wants. The answers justify the ranking later. Keep the draft weights in the document for comparison.
7. **Use a live tool.** Give the owner a page that asks the questions (and allows dragging), shows the weights and the winning alternative live, and returns the ranking and answers as text to paste back. The copied text can be pasted back in later to reopen or review the run. A reusable one is the [Criteria Ranker](https://alternatives.jonashw.dev/toolkit/criteria-ranker.html).

##### Robustness

A weighted score is only as trustworthy as its weights, which are the most subjective input in the model. Because weights can never be proven non-arbitrary on their own, **every AA with two or more alternatives must test how sensitive the result is to them.** Report the following:

1. **Dominance check.** If one alternative scores at least as high as every other alternative on *every* criterion, it wins under any weights. When this holds, declare the dominant alternative and note that weighting is moot.

2. **Winning margin.** Report the gap between the top two alternatives, both absolute and normalized to the scoring scale:
$$\Delta = V_{(1)} - V_{(2)}, \qquad \bar{\Delta} = \frac{\Delta}{S_{\max} - S_{\min}}$$
where $V_{(1)}$ is the highest total weighted score, $V_{(2)}$ the runner-up, and $S_{\max}, S_{\min}$ are the bounds of the scoring scale (e.g., 5 and 1). Because weights sum to 1, $\bar{\Delta}$ lies in $[0, 1]$. A margin is **close** when $\bar{\Delta} < 0.05$ (within 5% of the scale).

3. **Critical-weight (flip-point) analysis.** For each criterion $k$, compute the smallest change $\delta_k$ to its weight that would reverse the top two alternatives, holding scores fixed and renormalizing the remaining weights proportionally:
$$\delta_k = \frac{\Delta}{\dfrac{\Delta - W_k d_k}{1 - W_k} - d_k}, \qquad d_k = S_{k,(1)} - S_{k,(2)}$$
The criterion with the smallest feasible $|\delta_k|$ — one that keeps $W_k + \delta_k \in [0, 1]$ — is the **most critical criterion**. If that $|\delta_k|$ is a small fraction of $W_k$, the decision hinges on a contestable weight and must be discussed explicitly.

4. **Monte Carlo weight simulation.** Required when the margin is close ($\bar{\Delta} < 0.05$); recommended otherwise. To summarize overall robustness, perturb the weights and recompute the ranking many times:
   - **Sampling.** Draw each weight from a symmetric band around its base value (e.g., ±20% relative) and renormalize to sum to 1, or sample the full weight vector from a Dirichlet distribution centered on the base weights. Hold scores fixed.
   - **Iterations.** Run at least 1,000 trials (10,000 when the margin is close).
   - **Reproducibility.** Fix and record the random seed so the result can be audited and regenerated.
   - **Report.** For each alternative, the fraction of trials in which it ranks first ("win probability"). Treat a top alternative that wins in a clear majority of trials as robust; otherwise flag the decision as weight-sensitive and justify the final choice on other grounds.

5. **Order-consistent simulation.** Once the owner has ranked the criteria, sample at least 10,000 random weight vectors that keep the owner's rank order (draw uniform values, sort them to match the order, normalize). Report win probabilities. This tests the ranking itself, independent of the conversion formula.

6. **Big-tie check.** Required when more than three criteria tie at the top. Tied criteria share one weight, so on those rows only the scores separate the alternatives, and an order-consistent simulation looks more certain than it is. Report the lead of the top two under equal weights next to the lead under the owner's weights, and the share of the gap between them that comes from criteria inside the tie $T$:
$$\text{share}_T = \frac{\sum_{k \in T} |W_k d_k|}{\sum_k |W_k d_k|}, \qquad d_k = S_{k,(1)} - S_{k,(2)}$$
When more than half the gap comes from the tie, say that the scores decide the result more than the ranking does, and offer the big-tie question (see Weight Elicitation).

7. **Adjacent-swap test.** Swap each pair of neighbours in the owner's ranking, one at a time, and report any swap that changes the winner.

8. **Single-score flip test.** Weights are not the only subjective input. Move each score by one point, one at a time, and list every change that flips the winner.

9. **Score-and-weight simulation.** Jitter the least certain scores by one point together with the weights, and report win probabilities.

10. **Name the hinge.** State in one sentence what the decision actually depends on (a weight, a score, or neither), and put that question to the owner directly. Say which inputs are measured and which are estimates.

### Diagrams

Include diagrams where they clarify context or distinguish alternatives. At minimum:

- **Context diagram** — the system or decision in its surrounding environment: actors, external systems, and the boundaries the decision touches.
- **Per-alternative sketch** — for each viable alternative, a diagram showing how the components, data, or control flow differ from the others.

Prefer a code-first, text-based format (e.g., Mermaid) so diagrams render in Markdown and can be generated and revised by both humans and automated agents. Agent-harness-specific visualization features (e.g., interactive widgets or canvases, such as those in Gemini or Claude) are equally acceptable where they aid understanding.

## Sources

The method draws on established practice. Where this spec and a source differ, the spec says why.

**Decision analysis**
- Belton, V. and Stewart, T. J. (2002). *Multiple Criteria Decision Analysis: An Integrated Approach.* Properties of good criteria, including judgmental independence and non-redundancy (see Check for overlap).
- Department for Communities and Local Government (2009). *Multi-criteria analysis: a manual.* UK Government. Checks for double counting and mutual independence of preferences before weighting.
- Keeney, R. L. (1992). *Value-Focused Thinking.* Fundamental versus means objectives (see Name the reason, not the feature).
- Keeney, R. L. and Gregory, R. S. (2005). "Selecting attributes to measure the achievement of objectives." *Operations Research* 53(1). Attributes that are unambiguous, comprehensive, direct, operational and understandable.
- Keeney, R. L. and Raiffa, H. (1976). *Decisions with Multiple Objectives.* Preferential independence, the condition a weighted sum relies on.
- Edwards, W. and Barron, F. H. (1994). "SMARTS and SMARTER." *Organizational Behavior and Human Decision Processes* 60(3). Rank-order centroid weights (the steep conversion).
- Hammond, J. S., Keeney, R. L. and Raiffa, H. (1999). *Smart Choices.* Even swaps, a way to trade criteria off without weights.

**Decision records**
- Nygard, M. (2011). "Documenting Architecture Decisions." Decision records are immutable; a later decision supersedes an earlier one, and the earlier one's status says so (see Revisiting a Decision).

**Requirements engineering**
- ISO/IEC/IEEE 29148 (2018). *Requirements engineering.* Characteristics of good requirements: necessary, unambiguous, singular, verifiable, consistent, complete.
- INCOSE (2023). *Guide to Writing Requirements.* Writing rules, including rationale on every requirement and no vague terms.
- Mavin, A. et al. (2009). "Easy Approach to Requirements Syntax (EARS)." IEEE International Requirements Engineering Conference. The event-driven form "When ___, the ___ shall ___" (see Hold the situation constant).
- Robertson, S. and Robertson, J. *Mastering the Requirements Process* (Volere template). The fit criterion: every requirement carries a test of whether it is met.
- Klement, A. *When Coffee and Kale Compete* (job stories). "When ___, I want to ___, so I can ___."
- Kano, N. et al. (1984). "Attractive quality and must-be quality." Must-be qualities map to gates, one-dimensional qualities to wants.
- ISO/IEC 25010 (2023). *Product quality model* (see Completeness check, software).
- Flanagan, J. C. (1954). "The critical incident technique." *Psychological Bulletin* 51(4) (see Start from real moments).

**Why full sentences**
- Semantic satiation: a phrase seen over and over can lose its meaning for a while, so criteria are written as full sentences rather than short labels.
