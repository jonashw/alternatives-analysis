// Pairwise judging: put items in order by asking a person "which of these two?".
// Binary insertion sort with the person's judgement as the comparison. Pure: no DOM, no storage.
//
// The state is plain data: { ids, answers }. Everything else is read from it by replaying the
// answers, so undo is "drop the last answer", and earlier answers (from another session, or
// either/or questions asked before) can be passed in to seed a run: a pair that already has an
// answer is never asked again.
//
// An answer is { a, b, result } where result is ">" (a over b) or "=" (about the same).
// As text: "A > B", "A = B". What the order means (importance, preference, closeness to a
// reference) and what to do with it (weights, a next step) is the caller's business.

/** Start a run. `answers` may hold earlier answers to reuse. */
export const start = (ids, answers = []) => ({ ids: [...ids], answers: [...answers] });

const keyOf = (a, b) => JSON.stringify(a < b ? [a, b] : [b, a]);

const lookup = answers => {
  const known = new Map();
  // Later answers win, so answering a pair again replaces the earlier answer.
  for (const given of answers) known.set(keyOf(given.a, given.b), given);
  return (a, b) => {
    const given = known.get(keyOf(a, b));
    if (!given) return undefined;
    return given.result === '=' ? '=' : given.a === a ? '>' : '<';
  };
};

const worstFor = (span) => Math.ceil(Math.log2(span + 1));

/**
 * Where the run stands.
 * - question: the next pair to ask, { a, b }, or null when the order is complete
 * - order: the items placed so far, best first
 * - groups: the order as tie groups, best first; members of a group are "about the same"
 * - ties: neighbouring pairs inside each group (a group of three gives two pairs)
 * - used: the answers that decided the order, in the order they were needed (the record)
 * - remaining: the most questions still to come
 */
export const read = ({ ids, answers }) => {
  const known = lookup(answers);
  // Tie groups, best first. "About the same" joins the item to a whole group, so a group
  // always stays together and every member shares its place, whatever order answers came in.
  const groups = [];
  const used = [];
  const snapshot = () => {
    const order = groups.flat();
    const ties = groups.flatMap(g => g.slice(1).map((id, k) => [g[k], id]));
    return { order, ties, groups: groups.map(g => g.slice()) };
  };
  for (let i = 0; i < ids.length; i++) {
    const item = ids[i];
    if (groups.length === 0) { groups.push([item]); continue; }
    let lo = 0, hi = groups.length, placed = false;
    while (lo < hi) {
      const mid = (lo + hi) >> 1, other = groups[mid][0];
      const result = known(item, other);
      if (result === undefined) {
        let remaining = worstFor(hi - lo);
        for (let n = groups.length + 1, k = i + 1; k < ids.length; k++, n++) remaining += worstFor(n);
        return { question: { a: item, b: other }, ...snapshot(), used, remaining, done: false };
      }
      used.push(result === '<' ? { a: other, b: item, result: '>' } : { a: item, b: other, result });
      if (result === '>') hi = mid;
      else if (result === '<') lo = mid + 1;
      else { groups[mid].push(item); placed = true; break; }
    }
    if (!placed) groups.splice(lo, 0, [item]);
  }
  return { question: null, ...snapshot(), used, remaining: 0, done: true };
};

/** Answer the current question: `preferred` is the id the person chose, or "=" for about the same. */
export const answer = (state, preferred) => {
  const { question } = read(state);
  if (!question) return state;
  const { a, b } = question;
  if (preferred !== '=' && preferred !== a && preferred !== b) throw new Error('Answer with one of the two items, or "="');
  const given = preferred === '=' ? { a, b, result: '=' } : preferred === a ? { a, b, result: '>' } : { a: b, b: a, result: '>' };
  return { ...state, answers: [...state.answers, given] };
};

/** Take back the last answer. */
export const undo = state => ({ ...state, answers: state.answers.slice(0, -1) });

/** The most questions a run over `count` items can need. */
export const worstCase = count => { let total = 0; for (let n = 1; n < count; n++) total += worstFor(n); return total; };

/** An answer as text: "A > B" or "A = B". */
export const answerText = (given, name = id => id) => `${name(given.a)} ${given.result} ${name(given.b)}`;

/**
 * Check questions for a finished run. One insertion run never asks a pair whose answer is implied,
 * so it cannot contradict itself; these re-ask up to `count` neighbouring pairs to see whether the
 * person still agrees. `importance(a, b, position)` says where a reversal would matter most
 * (default: nearest the top). Tied neighbours are not asked.
 */
export const checkQuestions = (state, count = 3, importance = (_a, _b, position) => -position) => {
  const { order, ties, done } = read(state);
  if (!done) return [];
  const tied = (a, b) => ties.some(t => keyOf(t[0], t[1]) === keyOf(a, b));
  return order.slice(0, -1)
    .map((a, position) => ({ a, b: order[position + 1], position }))
    .filter(pair => !tied(pair.a, pair.b))
    .sort((x, y) => importance(y.a, y.b, y.position) - importance(x.a, x.b, x.position))
    .slice(0, count)
    .map(({ a, b }) => ({ a, b }));
};

/**
 * Apply the answers to check questions. A reversal (the person now prefers the lower one) or
 * "about the same" turns that pair into a tie; the order itself does not move.
 * `checks` is a list of { a, b, preferred } with a the higher-placed item.
 */
export const withChecks = (state, checks) => {
  const result = read(state);
  const reversed = checks.filter(c => c.preferred !== c.a).map(c => [c.a, c.b]);
  return { ...result, ties: [...result.ties, ...reversed], reversals: reversed };
};
