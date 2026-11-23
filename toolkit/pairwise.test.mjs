import test from 'node:test';
import assert from 'node:assert/strict';
import { answer, answerText, back, checkAnswer, checkQuestions, earlier, forward, parseAnswers, read, session, sessionAnswer, shuffle, start, undo, withChecks, worstCase } from './pairwise.js';

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

// A judge for sessions, so review and back/forward can be checked against a plain run.
const finish = (s, pick) => { for (let q = read(s.state).question; q; q = read(s.state).question) s = sessionAnswer(s, pick(q)); return s; };
const byScore = scores => q => scores[q.a] === scores[q.b] ? '=' : scores[q.a] > scores[q.b] ? q.a : q.b;
const twelve = Object.fromEntries(Array.from({ length: 12 }, (_, i) => ['R' + (i + 1), [9, 3, 7, 5, 8, 8, 2, 8, 1, 4, 6, 9][i]]));

test('the question names the whole group it is asked against', () => {
  // b = c first, then a is compared with that group.
  let state = start(['b', 'c', 'a']);
  state = answer(state, '=');
  const { question } = read(state);
  assert.equal(question.a, 'a');
  assert.deepEqual(question.group, ['b', 'c']);
});

test('a tie answered early is never split by later insertions (the 2026-11-23 report)', () => {
  // R8 = R5, R6 = R5 and R9 = R1 must end up in two groups, each kept together.
  const scores = { ...twelve, R5: 8, R6: 8, R8: 8, R1: 9, R9: 9, R12: 7 };
  const s = finish(session(shuffle(Object.keys(scores))), byScore(scores));
  const { groups } = read(s.state);
  const groupOf = id => groups.findIndex(g => g.includes(id));
  assert.equal(groupOf('R8'), groupOf('R5')); assert.equal(groupOf('R6'), groupOf('R5'));
  assert.equal(groupOf('R9'), groupOf('R1'));
});

test('ties shorten the run', () => {
  const ids = shuffle(Object.keys(twelve));
  const all = Object.fromEntries(ids.map(id => [id, 1]));
  const tied = finish(session(ids), byScore(all));
  assert.equal(read(tied.state).used.length, 11);
  assert.ok(read(finish(session(ids), byScore(twelve)).state).used.length > 11);
});

test('back then forward redoes the answer stepped over', () => {
  let s = session(shuffle(Object.keys(twelve)));
  for (let k = 0; k < 5; k++) s = sessionAnswer(s, byScore(twelve)(read(s.state).question));
  const before = read(s.state);
  s = back(back(s));
  assert.equal(s.ahead.length, 2);
  assert.ok(earlier(s) !== undefined);
  s = forward(forward(s));
  assert.deepEqual(read(s.state).question, before.question);
  assert.equal(s.ahead.length, 0);
  assert.equal(forward(s), s, 'nothing ahead: forward does nothing');
});

test('reviewing and keeping every earlier answer reproduces the same ranking', () => {
  const ids = shuffle(Object.keys(twelve));
  const first = finish(session(ids), byScore(twelve));
  let s = session(ids, { prior: read(first.state).used });
  while (read(s.state).question) { assert.ok(earlier(s) !== undefined); s = forward(s); }
  assert.deepEqual(read(s.state).groups, read(first.state).groups);
  assert.deepEqual(read(s.state).used, read(first.state).used);
});

test('changing one answer in review leads to questions with no earlier answer', () => {
  const ids = shuffle(Object.keys(twelve));
  const first = finish(session(ids), byScore(twelve));
  let s = session(ids, { prior: read(first.state).used });
  const q = read(s.state).question;
  s = sessionAnswer(s, earlier(s) === q.a ? q.b : q.a);   // flip the first answer
  let fresh = 0;
  while (read(s.state).question) { if (earlier(s) === undefined) fresh++; s = sessionAnswer(s, byScore(twelve)(read(s.state).question)); }
  assert.ok(fresh > 0);
});

test('reads answer text back, including the copied line', () => {
  assert.deepEqual(parseAnswers('R2 > R4, R10 = R2'), [{ a: 'R2', b: 'R4', result: '>' }, { a: 'R10', b: 'R2', result: '=' }]);
  assert.equal(parseAnswers('R2 > R4, nonsense'), null);
  const ids = shuffle(Object.keys(twelve));
  const done = finish(session(ids), byScore(twelve));
  const text = read(done.state).used.map(x => answerText(x)).join(', ');
  const replay = start(ids, parseAnswers(text));
  assert.deepEqual(read(replay).order, read(done.state).order);
});

test('check answers read as plain answers', () => {
  assert.deepEqual(checkAnswer({ a: 'x', b: 'y', preferred: 'x' }), { a: 'x', b: 'y', result: '>' });
  assert.deepEqual(checkAnswer({ a: 'x', b: 'y', preferred: 'y' }), { a: 'y', b: 'x', result: '>' });
  assert.deepEqual(checkAnswer({ a: 'x', b: 'y', preferred: '=' }), { a: 'x', b: 'y', result: '=' });
});

test("the ranker page's copy of the engine matches pairwise.js", async () => {
  const { readFileSync } = await import('node:fs');
  const { engineIn, inlined } = await import('./inline.mjs');
  const page = readFileSync(new URL('./criteria-ranker.html', import.meta.url), 'utf8');
  const source = readFileSync(new URL('./pairwise.js', import.meta.url), 'utf8');
  assert.equal(engineIn(page), inlined(source), 'Run: node toolkit/inline.mjs');
});

test('upgrading a ranker keeps its decision and takes the new page', async () => {
  const { readFileSync } = await import('node:fs');
  const { upgrade } = await import('./upgrade.mjs');
  const template = readFileSync(new URL('./criteria-ranker.html', import.meta.url), 'utf8');
  const old = '<title>Old Ranker</title><header><h1>Old decision</h1></header>\n<script>\nconst DATA = {\n  key: "old-one",\n  criteria: []\n};\n</script>' +
    '<p class="small" style="margin-top:8px">Old note.</p>';
  const page = upgrade(old, template);
  for (const kept of ['<title>Old Ranker</title>', '<h1 id="title">Old decision</h1>', 'key: "old-one"', 'Old note.']) assert.ok(page.includes(kept), kept);
  assert.ok(page.includes('// BEGIN pairwise.js'));
  assert.ok(!page.includes('example-chat-tool'));
  assert.throws(() => upgrade('<title>x</title>', template));
});
