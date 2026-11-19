import test from 'node:test';
import assert from 'node:assert/strict';
import { answer, answerText, checkQuestions, read, start, undo, withChecks, worstCase } from './pairwise.js';

// A judge who prefers items by a hidden score; equal scores are "about the same".
const judge = scores => (state) => {
  let questions = 0;
  for (let q = read(state).question; q; q = read(state).question) {
    state = answer(state, scores[q.a] === scores[q.b] ? '=' : scores[q.a] > scores[q.b] ? q.a : q.b);
    questions++;
  }
  return { state, questions };
};

test('sorts by judgement, best first, within the worst case', () => {
  const ids = ['d', 'a', 'j', 'c', 'h', 'b', 'i', 'e', 'g', 'f'];
  const scores = Object.fromEntries(ids.map(id => [id, -id.charCodeAt(0)]));
  const { state, questions } = judge(scores)(start(ids));
  assert.deepEqual(read(state).order, [...ids].sort());
  assert.ok(questions <= worstCase(10));
  assert.equal(worstCase(10), 25);
  assert.equal(read(state).used.length, questions);
});

test('records ties and keeps tied items together', () => {
  const { state } = judge({ a: 3, b: 2, c: 2, d: 1 })(start(['b', 'd', 'c', 'a']));
  const { order, ties } = read(state);
  assert.equal(order[0], 'a'); assert.equal(order[3], 'd');
  assert.deepEqual(ties.map(t => [...t].sort()), [['b', 'c']]);
});

test('undo drops one answer and asks that question again', () => {
  let state = start(['a', 'b', 'c']);
  const first = read(state).question;
  state = answer(state, first.a);
  const second = read(state).question;
  state = undo(answer(state, second.b));
  assert.deepEqual(read(state).question, second);
});

test('counts down the questions that remain', () => {
  let state = start(['a', 'b', 'c', 'd']);
  assert.equal(read(state).remaining, worstCase(4));
  state = answer(state, 'a');
  assert.ok(read(state).remaining < worstCase(4));
});

test('earlier answers seed a run and are not asked again', () => {
  const seeded = start(['a', 'b', 'c'], [{ a: 'b', b: 'a', result: '>' }]);
  const q = read(seeded).question;
  assert.notDeepEqual([q.a, q.b].sort(), ['a', 'b']);
  assert.deepEqual(read(seeded).order, ['b', 'a']);
});

test('reads answers as text', () => {
  assert.equal(answerText({ a: 'x', b: 'y', result: '>' }, id => id.toUpperCase()), 'X > Y');
  assert.equal(answerText({ a: 'x', b: 'y', result: '=' }), 'x = y');
});

test('check questions re-ask neighbours, and a reversal becomes a tie', () => {
  const { state } = judge({ a: 4, b: 3, c: 2, d: 1 })(start(['c', 'a', 'd', 'b']));
  assert.deepEqual(checkQuestions(state, 2), [{ a: 'a', b: 'b' }, { a: 'b', b: 'c' }]);
  assert.deepEqual(checkQuestions(state, 1, (_a, _b, position) => position), [{ a: 'c', b: 'd' }]);
  const checked = withChecks(state, [{ a: 'a', b: 'b', preferred: 'b' }, { a: 'b', b: 'c', preferred: 'b' }]);
  assert.deepEqual(checked.order, ['a', 'b', 'c', 'd']);
  assert.deepEqual(checked.ties, [['a', 'b']]);
});

test('"about the same" chains into one tie group, whatever order the answers come in', () => {
  // Five criteria tied at the top, one below, as in a real run: A = B, B = C and C = D must make one group.
  const scores = { AL2: 2, AL3: 2, AL4: 2, AL5: 2, AL10: 2, EFFORT: 1 };
  const ids = Object.keys(scores);
  const perms = xs => xs.length < 2 ? [xs] : xs.flatMap((x, i) => perms([...xs.slice(0, i), ...xs.slice(i + 1)]).map(p => [x, ...p]));
  for (const p of perms(ids)) {
    const { state } = judge(scores)(start(p));
    const { order, ties, groups } = read(state);
    assert.equal(order.at(-1), 'EFFORT', p.join(','));
    assert.equal(groups.length, 2, p.join(','));
    assert.deepEqual([...groups[0]].sort(), ['AL10', 'AL2', 'AL3', 'AL4', 'AL5']);
    // Every neighbour inside the group is recorded as tied, so the chain is unbroken.
    for (let k = 0; k + 1 < 5; k++) assert.ok(ties.some(t => t.includes(order[k]) && t.includes(order[k + 1])), p.join(','));
  }
});
