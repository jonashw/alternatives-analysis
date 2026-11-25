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

/**
 * A fixed-seed shuffle, so the starting order doesn't follow the analyst's draft but is the same
 * every time (a pasted answer list then replays through the same questions).
 */
export const shuffle = (ids, seed = 7) => {
  const r = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  const a = [...ids];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

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
        // group: everyone the other item was called "about the same" as, so the question can name them all.
        return { question: { a: item, b: other, group: groups[mid].slice() }, ...snapshot(), used, remaining, done: false };
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

// ---- Sessions: back, forward and review on top of a run ----
// A session is { state, ahead, prior }. `ahead` holds answers stepped back over (newest first);
// `prior` holds an earlier run's answers under review. Neither is applied by itself: each question
// shows the earlier answer for its pair, and the person keeps it (forward) or picks another.

/** Start a session. `prior`: earlier answers to review one by one. */
export const session = (ids, { prior = [] } = {}) => ({ state: start(ids), ahead: [], prior: [...prior] });

const samePair = (x, a, b) => keyOf(x.a, x.b) === keyOf(a, b);

/** The earlier answer for a pair, as the preferred id or "=", from the first list that has one. */
export const earlierFor = (lists, a, b) => {
  for (const list of lists) {
    const found = [...list].reverse().find(x => samePair(x, a, b));
    if (found) return found.result === '=' ? '=' : found.a;
  }
  return undefined;
};

/** The earlier answer to the current question, or undefined: a step taken back first, then the run under review. */
export const earlier = s => {
  const { question } = read(s.state);
  return question ? earlierFor([s.ahead, s.prior], question.a, question.b) : undefined;
};

/** Answer the current question. A stepped-over answer for the same pair is used up. */
export const sessionAnswer = (s, preferred) => {
  const { question } = read(s.state);
  if (!question) return s;
  return { ...s, state: answer(s.state, preferred), ahead: s.ahead.filter(x => !samePair(x, question.a, question.b)) };
};

/** Step back one question; the answer taken back waits in `ahead`, so forward can redo it. */
export const back = s => {
  const last = s.state.answers.at(-1);
  return last ? { ...s, state: undo(s.state), ahead: [last, ...s.ahead] } : s;
};

/** Keep the earlier answer to the current question (if there is one) and move on. */
export const forward = s => {
  const was = earlier(s);
  return was === undefined ? s : sessionAnswer(s, was);
};

/** Read answers back from text such as "R2 > R4, R10 = R2". Returns null if any part doesn't read. */
export const parseAnswers = text => {
  const parts = text.split(',').map(x => x.trim()).filter(Boolean);
  const out = parts.map(x => { const m = /^(\S+)\s*([>=])\s*(\S+)$/.exec(x); return m && { a: m[1], b: m[3], result: m[2] }; });
  return out.some(x => !x) ? null : out;
};

/** A check answer ({ a, b, preferred }, a placed higher) as a plain answer: "A > B", "B > A" or "A = B". */
export const checkAnswer = c => c.preferred === '=' ? { a: c.a, b: c.b, result: '=' }
  : { a: c.preferred, b: c.preferred === c.a ? c.b : c.a, result: '>' };

/**
 * Answers a tie group overrides. Ties chain: "A = B" and "B = C" put A, B and C in one group, even where an
 * earlier answer said "A > C". Given the answers (questions, then checks; the latest per pair counts) and the
 * tie groups, returns the "X > Y" answers whose two items now share a group, so the screen can say what was set aside.
 */
export const overridden = (answers, checks, groups) => {
  const g = {};
  groups.forEach((grp, i) => grp.forEach(id => { g[id] = i; }));
  const latest = new Map();
  for (const a of answers) latest.set(keyOf(a.a, a.b), a);
  for (const c of checks) latest.set(keyOf(c.a, c.b), checkAnswer(c));
  return [...latest.values()].filter(a => a.result === '>' && g[a.a] !== undefined && g[a.a] === g[a.b]);
};

// ---- Big ties: "If you could only keep one of these, which?" ----
// After the questions and checks, a tie group with more than `limit` members (three by default) gets one more
// question that names the whole group. A keep answer is { from: [the group], keep: id }: that item moves just above
// the rest, which stay tied. { from, keep: '=' } means "I can't pick one": the group stays a tie and is not asked
// again. { from, gates: [ids] } means those members are must-haves, not trade-offs: they leave the ranking (the
// caller turns them into pass or fail gates) and the rest stay tied. With repeat on, the rest is asked again while
// it still has more than `limit` members; with repeat off, each group is asked once.

const sameSet = (x, y) => x.length === y.length && x.every(id => y.includes(id));

/** Tie groups from an order and tie pairs: neighbours joined by a chain of ties share a group. Best first. */
export const groupsOf = (order, ties) => {
  const parent = {};
  const find = x => parent[x] === undefined || parent[x] === x ? x : (parent[x] = find(parent[x]));
  for (const [a, b] of ties) { const ra = find(a), rb = find(b); if (ra !== rb) parent[ra] = rb; }
  const groups = [];
  order.forEach((id, i) => { if (i > 0 && find(order[i - 1]) === find(id)) groups[groups.length - 1].push(id); else groups.push([id]); });
  return groups;
};

/** Tie pairs for a list of groups: each member tied to the next (a group of three gives two pairs). */
export const tiesOf = groups => groups.flatMap(g => g.slice(1).map((id, k) => [g[k], id]));

/**
 * Apply keep answers to tie groups, in order. Returns { groups, gated, used }: the new groups best first, the ids
 * turned into gates, and the answers that applied (an answer whose group no longer exists is left out).
 */
export const withKeeps = (groups, keeps) => {
  let gs = groups.map(g => ({ ids: g.slice(), asked: false, settled: false }));
  const gated = [], used = [];
  for (const k of keeps) {
    const i = gs.findIndex(g => sameSet(g.ids, k.from));
    if (i < 0) continue;
    if (k.gates) {
      const out = k.gates.filter(id => gs[i].ids.includes(id));
      if (!out.length) continue;
      gated.push(...out);
      const rest = gs[i].ids.filter(id => !out.includes(id));
      gs.splice(i, 1, ...(rest.length ? [{ ids: rest, asked: true, settled: false }] : []));
    } else if (k.keep === '=') { gs[i] = { ...gs[i], asked: true, settled: true }; }
    else if (gs[i].ids.includes(k.keep)) {
      gs.splice(i, 1, { ids: [k.keep], asked: true, settled: true }, { ids: gs[i].ids.filter(id => id !== k.keep), asked: true, settled: false });
    } else continue;
    used.push(k);
  }
  return { groups: gs.map(g => g.ids), gated, used, state: gs };
};

/** The next keep question, { from: [the group, in order] }, or null. Groups are asked best first. */
export const keepQuestion = (groups, keeps, { limit = 3, repeat = true } = {}) => {
  const { state } = withKeeps(groups, keeps);
  const g = state.find(x => x.ids.length > limit && !x.settled && (repeat || !x.asked));
  return g ? { from: g.ids.slice() } : null;
};

/** The groups with more than `limit` members. */
export const bigTies = (groups, limit = 3) => groups.filter(g => g.length > limit);

/** A keep answer as text: "MEDIA over CLAUDE+NOTE+TAP", "none of A+B+C+D", "gates TAP+PRIV of TAP+PRIV+A+B". */
export const keepText = k => k.gates ? 'gates ' + k.gates.join('+') + ' of ' + k.from.join('+')
  : k.keep === '=' ? 'none of ' + k.from.join('+')
  : k.keep + ' over ' + k.from.filter(id => id !== k.keep).join('+');

/** Read keep answers back from text joined by "; ". Returns null if any part doesn't read. */
export const parseKeeps = text => {
  const parts = text.split(';').map(x => x.trim()).filter(Boolean);
  const ids = s => s.split('+').map(x => x.trim()).filter(Boolean);
  const out = parts.map(x => {
    let m = /^gates\s+(\S+)\s+of\s+(\S+)$/.exec(x); if (m) return { from: ids(m[2]), gates: ids(m[1]) };
    m = /^none of\s+(\S+)$/.exec(x); if (m) return { from: ids(m[1]), keep: '=' };
    m = /^(\S+)\s+over\s+(\S+)$/.exec(x); if (m) return { from: [m[1], ...ids(m[2])], keep: m[1] };
    return null;
  });
  return out.some(x => !x) ? null : out;
};
