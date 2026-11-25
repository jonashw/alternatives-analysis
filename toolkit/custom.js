// Criteria sets brought in by paste or by link, so anyone can try the hosted ranker without making a copy.
// A link carries the set after the #, as base64url of the JSON:  criteria-ranker.html#data=eyJ0aXRsZSI6...
// The part after # stays in the browser: it is never sent to the server, so it never reaches its logs.
// Pure: no DOM, no storage. The page shows every string from a set as text, never as HTML.
// The format is documented in toolkit/README.md ("Try it with your own criteria") and criteria.schema.json.

export const LIMITS = { criteria: 40, alternatives: 12, parts: 12, gates: 12, text: 300, json: 40000, link: 2000 };

// Ids go into answer text such as "COST > EASE", so they hold no spaces, commas, ">" or "=".
// A name that Object already has (constructor, toString) would clash with the page's lookup tables.
const ID = /^[A-Za-z0-9][A-Za-z0-9_-]{0,15}$/;
const KEY = /^[A-Za-z0-9][A-Za-z0-9_-]{0,39}$/;
const okId = id => typeof id === 'string' && ID.test(id) && !(id in Object.prototype);

/** UTF-8 text as base64url (no padding), and back. */
export const toBase64url = text => {
  let s = ''; for (const b of new TextEncoder().encode(text)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
export const fromBase64url = code => {
  const s = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
  return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(s, ch => ch.charCodeAt(0)));
};

/** A share link for a checked set: base is the page address without its #. */
export const toLink = (data, base) => base.split('#')[0] + '#data=' + toBase64url(JSON.stringify(data));

/** The JSON text in a fragment ("#data=..."), or null if it has none. Takes base64url, or JSON written out (percent-encoded or not). */
export const fragmentText = hash => {
  const part = String(hash || '').replace(/^#/, '').split('&').find(x => x.startsWith('data='));
  if (part === undefined) return null;
  const v = part.slice(5);
  if (/^(\{|%7B)/i.test(v)) return decodeURIComponent(v);
  return fromBase64url(decodeURIComponent(v).trim());
};

/**
 * Read a criteria set from pasted text: JSON, or a whole share link.
 * Returns { data, errors, warnings }: data is a clean copy holding only the fields the page uses, or null when errors is not empty.
 */
export const read = text => {
  let raw = String(text || '').trim();
  try {
    const at = raw.indexOf('#data=');
    if (!raw.startsWith('{') && at >= 0) raw = fragmentText(raw.slice(at));
  } catch (e) { return fail('The link\'s data part could not be decoded. Copy the whole link again.'); }
  if (!raw) return fail('Paste a criteria set as JSON, or a share link.');
  if (raw.length > LIMITS.json) return fail('The set is ' + raw.length + ' characters long; the limit is ' + LIMITS.json + '.');
  let json;
  try { json = JSON.parse(raw); } catch (e) { return fail('This isn\'t valid JSON: ' + e.message); }
  return check(json);
};

/** Read the set in a page's fragment. Returns null when the fragment carries none. */
export const fromFragment = hash => {
  let text;
  try { text = fragmentText(hash); } catch (e) { return fail('The link\'s data part could not be decoded. It may have been cut short.'); }
  return text === null ? null : read(text);
};

const fail = msg => ({ data: null, errors: [msg], warnings: [] });

/** Check a parsed set and copy out what the page uses. */
export const check = json => {
  const errors = [], warnings = [], err = m => errors.push(m);
  if (!json || typeof json !== 'object' || Array.isArray(json)) return fail('The set must be one JSON object, starting with {.');
  const text = (v, where, need) => {
    if (v === undefined || v === null) { if (need) err(where + ' is missing.'); return undefined; }
    if (typeof v !== 'string' || !v.trim()) { err(where + ' must be text.'); return undefined; }
    if (v.length > LIMITS.text) err(where + ' is ' + v.length + ' characters; the limit is ' + LIMITS.text + '.');
    return v.trim();
  };
  const known = ['title', 'key', 'question', 'more', 'noun', 'criteria', 'alternatives', 'draftWeights', 'gates', 'parts'];
  Object.keys(json).filter(k => !known.includes(k)).forEach(k => warnings.push('Left out "' + k + '": the page doesn\'t use it from a pasted set.'));

  const out = {};
  out.title = text(json.title, 'title', true);
  if (json.key !== undefined) { if (typeof json.key === 'string' && KEY.test(json.key)) out.key = json.key; else err('key must be 1 to 40 letters, digits, "-" or "_".'); }
  for (const k of ['question', 'more', 'noun']) { const v = text(json[k], k); if (v !== undefined) out[k] = v; }

  const crit = json.criteria;
  if (!Array.isArray(crit) || crit.length < 2) { err('criteria must be a list of at least 2.'); return { data: null, errors, warnings }; }
  if (crit.length > LIMITS.criteria) err('There are ' + crit.length + ' criteria; the limit is ' + LIMITS.criteria + '.');
  const ids = new Set();
  out.criteria = crit.slice(0, LIMITS.criteria).map((c, i) => {
    const where = 'criteria[' + i + ']';
    if (!c || typeof c !== 'object') { err(where + ' must be an object with id and name.'); return {}; }
    if (!okId(c.id)) err(where + '.id must be 1 to 16 letters, digits, "-" or "_", starting with a letter or digit (got ' + JSON.stringify(c.id) + ').');
    else if (ids.has(c.id)) err('The id ' + c.id + ' is used twice.');
    ids.add(c.id);
    const o = { id: c.id, name: text(c.name, where + '.name', true) };
    const note = text(c.note, where + '.note'); if (note !== undefined) o.note = note;
    if (c.director === true) o.director = true;
    if (c.scores !== undefined) o.scores = c.scores;
    return o;
  });

  const scoreList = (v, n, where) => {
    if (!Array.isArray(v) || v.length !== n || !v.every(x => typeof x === 'number' && x >= 0 && x <= 5)) {
      err(where + ' must be ' + n + ' numbers from 0 to 5, one per option in order.'); return undefined; }
    return v.slice();
  };
  const passList = (v, n, where) => {
    if (!Array.isArray(v) || v.length !== n || !v.every(x => x === 0 || x === 1)) { err(where + ' must be ' + n + ' values, 1 (pass) or 0 (fail), one per option.'); return undefined; }
    return v.slice();
  };
  const optionList = (v, where) => {
    if (!Array.isArray(v) || v.length < 2) { err(where + ' must be a list of at least 2 options.'); return []; }
    if (v.length > LIMITS.alternatives) err(where + ' has ' + v.length + ' options; the limit is ' + LIMITS.alternatives + '.');
    return v.map((a, j) => text(a, where + '[' + j + ']', true) || '');
  };
  const gateList = (v, where) => {
    if (!Array.isArray(v)) { err(where + ' must be a list of { id, name }.'); return []; }
    if (v.length > LIMITS.gates) err(where + ' has ' + v.length + ' gates; the limit is ' + LIMITS.gates + '.');
    return v.map((g, i) => { if (!g || !okId(g.id)) err(where + '[' + i + '].id must be a short code like the criteria ids.');
      return { id: g && g.id, name: text(g && g.name, where + '[' + i + '].name', true) }; });
  };

  if (json.alternatives !== undefined && json.parts !== undefined) err('Use alternatives (one decision) or parts (a parent with parts), not both.');
  if (json.alternatives !== undefined) {
    out.alternatives = optionList(json.alternatives, 'alternatives');
    out.criteria.forEach((c, i) => {
      if (c.director) { delete c.scores; return; }
      c.scores = scoreList(c.scores, out.alternatives.length, 'criteria[' + i + '].scores (' + c.id + ')');
    });
    // One decision: each gate carries its own results, one 1 (pass) or 0 (fail) per alternative.
    if (json.gates !== undefined) out.gates = gateList(json.gates, 'gates').map((g, i) =>
      ({ ...g, pass: passList(json.gates[i] && json.gates[i].pass, out.alternatives.length, 'gates[' + i + '].pass (' + g.id + ')') }));
  } else if (json.parts !== undefined) {
    out.criteria.forEach(c => delete c.scores);
    if (json.gates !== undefined) out.gates = gateList(json.gates, 'gates');
    const gateIds = (out.gates || []).map(g => g.id);
    if (!Array.isArray(json.parts) || !json.parts.length) err('parts must be a list of at least 1.');
    else {
      if (json.parts.length > LIMITS.parts) err('There are ' + json.parts.length + ' parts; the limit is ' + LIMITS.parts + '.');
      const partIds = new Set();
      out.parts = json.parts.map((p, i) => {
        const where = 'parts[' + i + ']';
        if (!p || typeof p !== 'object') { err(where + ' must be an object.'); return {}; }
        if (!okId(p.id) || partIds.has(p.id)) err(where + '.id must be a short code, used once.');
        partIds.add(p.id);
        const o = { id: p.id, name: text(p.name, where + '.name', true) };
        const note = text(p.note, where + '.note'); if (note !== undefined) o.note = note;
        if (p.twoWay === true) { o.twoWay = true; return o; }
        o.alternatives = optionList(p.alternatives, where + '.alternatives');
        const n = o.alternatives.length;
        o.scores = {};
        Object.entries(p.scores && typeof p.scores === 'object' ? p.scores : {}).forEach(([id, v]) => {
          if (!ids.has(id)) err(where + '.scores names ' + JSON.stringify(id) + ', which is not a criterion id.');
          else o.scores[id] = scoreList(v, n, where + '.scores.' + id);
        });
        o.gates = {};
        Object.entries(p.gates && typeof p.gates === 'object' ? p.gates : {}).forEach(([id, v]) => {
          if (!gateIds.includes(id)) err(where + '.gates names ' + JSON.stringify(id) + ', which is not a gate id.');
          else o.gates[id] = passList(v, n, where + '.gates.' + id);
        });
        if (p.ownGates !== undefined) {
          o.ownGates = gateList(p.ownGates, where + '.ownGates'); o.ownGateResults = {};
          o.ownGates.forEach(g => { o.ownGateResults[g.id] = passList((p.ownGateResults || {})[g.id], n, where + '.ownGateResults.' + g.id); });
        }
        return o;
      });
    }
  } else {
    if (out.criteria.some(c => c.scores !== undefined)) warnings.push('Left out the scores: with no alternatives, the page ranks the criteria as a plain list.');
    out.criteria.forEach(c => delete c.scores);
  }
  if (json.gates !== undefined && json.parts === undefined && json.alternatives === undefined) warnings.push('Left out "gates": they only apply when there are options to pass or fail.');

  if (json.draftWeights !== undefined && (out.alternatives || out.parts)) {
    const dw = json.draftWeights;
    if (!dw || typeof dw !== 'object' || Array.isArray(dw)) err('draftWeights must be an object such as {"COST": 30, "EASE": 70}.');
    else { out.draftWeights = {};
      Object.entries(dw).forEach(([id, v]) => { if (!ids.has(id)) err('draftWeights names ' + JSON.stringify(id) + ', which is not a criterion id.');
        else if (typeof v !== 'number' || !(v >= 0)) err('draftWeights.' + id + ' must be a number, 0 or more.'); else out.draftWeights[id] = v; }); }
  }
  return errors.length ? { data: null, errors, warnings } : { data: out, errors, warnings };
};

/**
 * Where a pasted set's answers are saved in the browser. It joins the set's key (if any) with a hash of its ids in order,
 * so a link can never land on another set's answers, and rewording a criterion (same ids) keeps the answers and is flagged.
 */
export const storageKey = data => {
  let h = 0x811c9dc5;
  for (const ch of data.criteria.map(c => c.id).join(',')) { h ^= ch.charCodeAt(0); h = Math.imul(h, 0x01000193) >>> 0; }
  return 'custom-' + (data.key ? data.key + '-' : '') + h.toString(16).padStart(8, '0');
};

/** A small set to start from, for the paste box. */
export const SAMPLE = {
  title: 'Rank what matters for our next team offsite',
  alternatives: ['A City hotel', 'B Cabin in the hills', 'C Our own office'],
  criteria: [
    { id: 'COST', name: 'R1 Fits the budget, travel included', scores: [2, 3, 5] },
    { id: 'FOCUS', name: 'R2 Few distractions, so we finish the planning', scores: [3, 5, 1] },
    { id: 'TRAVEL', name: 'R3 Everyone can get there in under two hours', scores: [4, 2, 5] },
    { id: 'FUN', name: 'R4 Something people look forward to', scores: [4, 5, 1] }
  ],
  draftWeights: { COST: 30, FOCUS: 30, TRAVEL: 20, FUN: 20 }
};
