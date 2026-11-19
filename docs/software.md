# Alternatives Analysis Specification

> A decision-matrix-driven ADR: the decision is the output of a weighted comparison of viable alternatives, not an assertion made up front.
>
> **Method:** A weighted decision matrix scored with the **Weighted Sum Model (WSM)**, also known as Simple Additive Weighting (SAW), a standard **multi-criteria decision analysis (MCDA)** technique, with weights set by the decision owner through ordinal pairwise ranking, paired with explicit sensitivity and robustness analysis (dominance check, winning-margin and critical-weight analysis, Monte Carlo weight simulation, and rank-order, swap and score-flip tests).
>
> **Scope:** This specification is contextualized to **software** architecture and engineering decisions. A [general-purpose variant](https://alternatives.jonashw.dev/general.md) for non-software decisions and a [storytelling variant](https://alternatives.jonashw.dev/storytelling.md) for story decisions are maintained separately.

## Required Content

Each AA document must include:

1. Clearly defined problem statement and background context.
2. Detailed exploration of at least two viable solutions, including comparative analysis.
3. Explicit identification of trade-offs, including considerations like cost, scalability, maintainability, and reversibility.
4. Final decision with clear justification.

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

## AA Template Structure

### Metadata

| Field | Description |
|-------|-------------|
| **Summary** | Summary of AA |
| **Created** | Date of creation |
| **Status** | `DRAFT` · `READY FOR REVIEW` · `FINAL` |

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

> When selecting criteria, ensure operational and non-functional obligations (observability, security, data migration, test strategy, day-2 ops) are represented as criteria rows rather than overlooked.

##### Rules

1. **Normalize weights.** All weights must sum to 1.0 (or 100).
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
   - **Fewest questions.** Binary insertion never asks a pair whose answer is already implied. Seven criteria take at most 14 questions, ten at most 22 to 25 (bubble sort can need 45).
   - **No leading.** Shuffle the starting order with a fixed seed, so the analyst's draft order does not steer the owner.
   - **Undo.** Let the owner take back the last answer at any time.
   - **Consistency.** One insertion run cannot contradict itself, because it never asks an implied pair. To test consistency, optionally re-ask a few neighbouring pairs at the end, nearest the top first; a reversal or "about the same" turns that pair into a tie.
   - **Seeding.** Either/or answers the owner already gave in discussion may seed the sort.
4. **Or drag.** As an alternative, the owner drags a list into order. Where the owner has done both and the orders differ, the owner picks which one is the record.
5. **Convert the order to weights.** Record which conversion was used. For $n$ criteria ranked $i = 1 \dots n$:
   - **Steep** (rank-order centroid): $W_i = \frac{1}{n}\sum_{k=i}^{n}\frac{1}{k}$
   - **Gentle** (rank-sum): $W_i = \frac{2(n + 1 - i)}{n(n + 1)}$
   - **Ties.** Tied neighbours share the mean of the weights for the ranks they span.
6. **Keep the record.** Record the owner's ranking, the conversion, and the full list of pairwise answers (for example `A > B, C = D`) verbatim. The answers justify the ranking later. Keep the draft weights in the document for comparison.
7. **Use a live tool.** Give the owner a page that asks the questions (and allows dragging), shows the weights and the winning alternative live, and returns the ranking and answers as text to paste back. A reusable one is the [Criteria Ranker](https://alternatives.jonashw.dev/toolkit/criteria-ranker.html).

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

6. **Adjacent-swap test.** Swap each pair of neighbours in the owner's ranking, one at a time, and report any swap that changes the winner.

7. **Single-score flip test.** Weights are not the only subjective input. Move each score by one point, one at a time, and list every change that flips the winner.

8. **Score-and-weight simulation.** Jitter the least certain scores by one point together with the weights, and report win probabilities.

9. **Name the hinge.** State in one sentence what the decision actually depends on (a weight, a score, or neither), and put that question to the owner directly. Say which inputs are measured and which are estimates.

### Diagrams

Include diagrams where they clarify context or distinguish alternatives. At minimum:

- **Context diagram** — the system or decision in its surrounding environment: actors, external systems, and the boundaries the decision touches.
- **Per-alternative sketch** — for each viable alternative, a diagram showing how the components, data, or control flow differ from the others.

Prefer a code-first, text-based format (e.g., Mermaid) so diagrams render in Markdown and can be generated and revised by both humans and automated agents. Agent-harness-specific visualization features (e.g., interactive widgets or canvases, such as those in Gemini or Claude) are equally acceptable where they aid understanding.