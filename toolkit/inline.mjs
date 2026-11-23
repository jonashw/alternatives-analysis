// Copies pairwise.js into criteria-ranker.html, so the published page is one file that works anywhere
// (a Claude artifact, the toolkit site, or a file opened from disk) while the rules stay in one tested place.
// Run after editing pairwise.js:  node toolkit/inline.mjs
// The test in pairwise.test.mjs fails if the page's copy differs from pairwise.js.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = file => fileURLToPath(new URL(file, import.meta.url));
const BEGIN = '// BEGIN pairwise.js', END = '// END pairwise.js';

/** The engine as a classic script: the same source with `export` dropped, wrapped as `const Pairwise = {...}`. */
export const inlined = source => {
  const names = [...source.matchAll(/^export const (\w+)/gm)].map(m => m[1]);
  const body = source.replace(/^export const /gm, 'const ').trimEnd();
  return `${BEGIN} (copied by toolkit/inline.mjs: edit pairwise.js, then run node toolkit/inline.mjs)\n` +
    `const Pairwise = (() => {\n${body}\nreturn { ${names.join(', ')} };\n})();\n${END}`;
};

/** Put the engine into a page that has the BEGIN and END marker lines. */
export const withEngine = (page, source) => {
  const a = page.indexOf(BEGIN), b = page.indexOf(END);
  if (a < 0 || b < a) throw new Error('The page has no "' + BEGIN + '" ... "' + END + '" block');
  return page.slice(0, a) + inlined(source) + page.slice(b + END.length);
};

/** The engine block currently in a page. */
export const engineIn = page => {
  const a = page.indexOf(BEGIN), b = page.indexOf(END);
  return a < 0 || b < a ? null : page.slice(a, b + END.length);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pagePath = here('./criteria-ranker.html');
  writeFileSync(pagePath, withEngine(readFileSync(pagePath, 'utf8'), readFileSync(here('./pairwise.js'), 'utf8')));
  console.log('Copied pairwise.js into criteria-ranker.html');
}
