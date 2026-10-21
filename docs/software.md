# Alternatives Analysis Specification

> A decision-matrix-driven ADR: the decision is the output of a weighted comparison of viable alternatives, not an assertion made up front.
>
> **Method:** A weighted decision matrix scored with the **Weighted Sum Model (WSM)**, also known as Simple Additive Weighting (SAW), a standard **multi-criteria decision analysis (MCDA)** technique, paired with explicit sensitivity and robustness analysis (dominance check, winning-margin and critical-weight analysis, and Monte Carlo weight simulation).
>
> **Scope:** This specification is contextualized to **software** architecture and engineering decisions. A [general-purpose variant](https://alternatives.jonashw.dev/general.md) for non-software decisions is maintained separately.

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

### Diagrams

Include diagrams where they clarify context or distinguish alternatives. At minimum:

- **Context diagram** — the system or decision in its surrounding environment: actors, external systems, and the boundaries the decision touches.
- **Per-alternative sketch** — for each viable alternative, a diagram showing how the components, data, or control flow differ from the others.

Prefer a code-first, text-based format (e.g., Mermaid) so diagrams render in Markdown and can be generated and revised by both humans and automated agents. Agent-harness-specific visualization features (e.g., interactive widgets or canvases, such as those in Gemini or Claude) are equally acceptable where they aid understanding.