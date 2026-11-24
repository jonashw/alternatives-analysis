// Tests for custom.js: pasted and linked criteria sets.  node --test toolkit/custom.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { read, check, fromFragment, fragmentText, toLink, toBase64url, fromBase64url, storageKey, SAMPLE, LIMITS } from './custom.js';

const list = { title: 'Which site hurts most when down', criteria: [{ id: 'A', name: 'Site A' }, { id: 'B', name: 'Site B' }] };

test('the sample set is valid and round-trips through a link', () => {
  const got = check(SAMPLE);
  assert.deepEqual(got.errors, []);
  const link = toLink(got.data, 'https://alternatives.jonashw.dev/toolkit/criteria-ranker.html#old');
  assert.ok(link.startsWith('https://alternatives.jonashw.dev/toolkit/criteria-ranker.html#data='));
  assert.ok(!/[+/=]/.test(link.split('#data=')[1]), 'base64url, no padding');
  assert.deepEqual(fromFragment('#' + link.split('#')[1]).data, got.data);
});

test('base64url keeps non-English text', () => {
  const t = 'Café, 東京, emoji 🎉';
  assert.equal(fromBase64url(toBase64url(t)), t);
});

test('a link may carry JSON written out, percent-encoded or not', () => {
  const json = JSON.stringify(list);
  assert.deepEqual(fromFragment('#data=' + encodeURIComponent(json)).data, check(list).data);
  assert.equal(fragmentText('#data=' + json), json);
  assert.equal(fromFragment('#other=1'), null);
  assert.equal(fromFragment(''), null);
});

test('a pasted share link reads like the JSON', () => {
  const link = toLink(check(list).data, 'https://example.test/r.html');
  assert.deepEqual(read(link).data, check(list).data);
});

test('a cut-off link gives a plain error, not a crash', () => {
  const link = toLink(check(SAMPLE).data, 'https://example.test/r.html');
  const cut = fromFragment('#' + link.split('#')[1].slice(0, 60));
  assert.equal(cut.data, null);
  assert.ok(cut.errors.length);
});

test('a list needs only a title and criteria; scores there are left out with a note', () => {
  const got = check({ ...list, criteria: list.criteria.map(c => ({ ...c, scores: [1, 2] })) });
  assert.deepEqual(got.errors, []);
  assert.ok(got.data.criteria.every(c => !('scores' in c)));
  assert.equal(got.warnings.length, 1);
});

test('ids that would break answer text or the page are refused', () => {
  for (const id of ['A B', 'A,B', 'A>B', 'A=B', '', '__proto__', 'constructor', 'toString', 'x'.repeat(17), 7]) {
    const got = check({ title: 't', criteria: [{ id, name: 'one' }, { id: 'B', name: 'two' }] });
    assert.equal(got.data, null, JSON.stringify(id));
  }
  assert.equal(check({ title: 't', criteria: [{ id: 'A', name: 'x' }, { id: 'A', name: 'y' }] }).data, null);
});

test('only known fields are kept, so a set cannot reach other saved answers', () => {
  const got = check({ ...list, oldKey: 'rank-order-something-else', html: '<b>x</b>' });
  assert.ok(got.data && !('oldKey' in got.data) && !('html' in got.data));
  assert.equal(got.warnings.length, 2);
});

test('text stays text: markup is kept as typed for the page to show as text', () => {
  const got = check({ title: '<img src=x onerror=alert(1)>', criteria: [{ id: 'A', name: '<script>x</script>' }, { id: 'B', name: 'b' }] });
  assert.equal(got.data.criteria[0].name, '<script>x</script>');
});

test('scores must match the options, 0 to 5', () => {
  const base = { title: 't', alternatives: ['A one', 'B two'], criteria: [{ id: 'X', name: 'x', scores: [1, 2] }, { id: 'Y', name: 'y', scores: [3, 4] }] };
  assert.deepEqual(check(base).errors, []);
  assert.equal(check({ ...base, criteria: [{ id: 'X', name: 'x', scores: [1] }, base.criteria[1]] }).data, null);
  assert.equal(check({ ...base, criteria: [{ id: 'X', name: 'x', scores: [1, 9] }, base.criteria[1]] }).data, null);
  assert.equal(check({ ...base, criteria: [{ id: 'X', name: 'x', scores: [1, '2'] }, base.criteria[1]] }).data, null);
  assert.deepEqual(check({ ...base, criteria: [{ id: 'X', name: 'x', director: true }, base.criteria[1]] }).errors, []);
  assert.equal(check({ ...base, draftWeights: { NOPE: 10 } }).data, null);
});

test('limits hold', () => {
  const many = n => Array.from({ length: n }, (_, i) => ({ id: 'C' + i, name: 'criterion ' + i }));
  assert.ok(check({ title: 't', criteria: many(LIMITS.criteria) }).data);
  assert.equal(check({ title: 't', criteria: many(LIMITS.criteria + 1) }).data, null);
  assert.equal(check({ title: 'x'.repeat(LIMITS.text + 1), criteria: many(2) }).data, null);
  assert.equal(read('x'.repeat(LIMITS.json + 1)).data, null);
  assert.equal(read('not json').data, null);
  assert.equal(read('[1,2]').data, null);
});

test('a parent with parts is checked too', () => {
  const parts = { title: 'p', criteria: [{ id: 'L', name: 'lore' }, { id: 'D', name: 'delight', director: true }],
    gates: [{ id: 'SAFE', name: 'safe' }],
    parts: [{ id: 'P1', name: 'one', alternatives: ['x', 'y'], scores: { L: [4, 3] }, gates: { SAFE: [1, 0] } }, { id: 'P2', name: 'two', twoWay: true }] };
  assert.deepEqual(check(parts).errors, []);
  assert.equal(check({ ...parts, parts: [{ ...parts.parts[0], scores: { NOPE: [1, 1] } }] }).data, null);
  assert.equal(check({ ...parts, alternatives: ['a', 'b'] }).data, null);
});

test('saved answers are keyed to the set: same ids share, other ids do not', () => {
  const a = check(list).data;
  const reworded = check({ ...list, criteria: [{ id: 'A', name: 'Site A, reworded' }, list.criteria[1]] }).data;
  const other = check({ ...list, criteria: [{ id: 'A', name: 'Site A' }, { id: 'C', name: 'Site C' }] }).data;
  assert.equal(storageKey(a), storageKey(reworded));
  assert.notEqual(storageKey(a), storageKey(other));
  assert.ok(storageKey(a).startsWith('custom-'));
  assert.ok(storageKey({ ...a, key: 'mine' }).startsWith('custom-mine-'));
});

test("the ranker page's copy of custom.js matches custom.js", async () => {
  const { readFileSync } = await import('node:fs');
  const { engineIn, inlined } = await import('./inline.mjs');
  const page = readFileSync(new URL('./criteria-ranker.html', import.meta.url), 'utf8');
  const source = readFileSync(new URL('./custom.js', import.meta.url), 'utf8');
  assert.equal(engineIn(page, 'custom.js'), inlined(source, 'custom.js', 'Custom'), 'Run: node toolkit/inline.mjs');
});

test('the JSON Schema accepts the sample and names the same limits', async () => {
  const { readFileSync } = await import('node:fs');
  const schema = JSON.parse(readFileSync(new URL('./criteria.schema.json', import.meta.url), 'utf8'));
  assert.equal(schema.properties.criteria.maxItems, LIMITS.criteria);
  assert.equal(schema.$defs.text.maxLength, LIMITS.text);
  for (const k of Object.keys(SAMPLE)) assert.ok(k in schema.properties, k);
});
