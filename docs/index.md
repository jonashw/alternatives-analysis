# Alternatives Analysis Specification

A decision-matrix-driven decision record: the decision is the output of a weighted comparison of viable alternatives, not an assertion made up front.

The specification comes in three variants. Pick the one that fits the decision:

- **[Software](https://alternatives.jonashw.dev/software.md)** (primary): contextualized to software architecture and engineering decisions.
- **[General](https://alternatives.jonashw.dev/general.md)**: domain-general, for decisions in any field.
- **[Storytelling](https://alternatives.jonashw.dev/storytelling.md)**: for story decisions: scripts, cutscenes, characters and lore. Adds a required wild option, the director's call on close margins, settings of use, and decisions made of parts.

### What differs between the variants

All three share the method: requirements sorted into gates and wants, viability gates, a weighted matrix, the owner's pairwise ranking (with the big-tie question) and the robustness tests. They differ in words, examples and a few extras.

| | General | Software | Storytelling |
|---|---|---|---|
| Who sets the weights | Decision owner | Decision owner | Director |
| When to do one | Novelty, reach, one-way door, commitment, disruption | New technology, cross-team reach, data change, one-way door, structural change | Story-specific tests, plus lighter tools when an AA is too much |
| Row categories | Objective fit, resources, outcomes, operations | Functional fit, business constraints, quality attributes, operations | Source fit, meaning, audience experience, production fit, future |
| Suggested gates | Legal and policy, budget, deadline, safety | Security and compliance, required integration, budget, deadline, supportable | Source words, audience safety, ownership, true to the facts, works unattended |
| Extras | None | Context diagram and per-alternative sketch | Parts and roll-up, settings of use, wild option, But / Therefore, two voices, departures from reality, director's delight score |

Each page is also served as raw Markdown at the `.md` URL linked above, for agents and tools that consume the source directly.

## The method is open; the judgment isn't

This specification is public on purpose. Anyone can copy a decision matrix. The hard part is the judgment that goes into it: which alternatives are worth comparing, which criteria really decide the outcome, what weights a team will stand behind, and scores that hold up when someone pushes back. The spec makes that judgment visible and open to challenge. It doesn't replace it.

That judgment is the work, and it's what I bring to the teams I work with.

[Jon Ash Wilson](https://jonashw.dev), software architect
