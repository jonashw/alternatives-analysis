// Copies the page's modules into criteria-ranker.html, so the published page is one file that works anywhere
// (a Claude artifact, the toolkit site, or a file opened from disk) while the rules stay in one tested place.
// Two modules: pairwise.js (the question engine, as `Pairwise`) and custom.js (pasted and linked criteria sets, as `Custom`).
// Run after editing either:  node toolkit/inline.mjs
// The tests in pairwise.test.mjs and custom.test.mjs fail if the page's copy differs from the module.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const here = file => fileURLToPath(new URL(file, import.meta.url));
export const MODULES = [{ file: 'pairwise.js', name: 'Pairwise' }, { file: 'custom.js', name: 'Custom' }];
const marks = file => ['// BEGIN ' + file, '// END ' + file];

/** A module as a classic script: the same source with `export` dropped, wrapped as `const Name = {...}`. */
export const inlined = (source, file = 'pairwise.js', name = 'Pairwise') => {
  const [BEGIN, END] = marks(file);
  const names = [...source.matchAll(/^export const (\w+)/gm)].map(m => m[1]);
  const body = source.replace(/^export const /gm, 'const ').trimEnd();
  return `${BEGIN} (copied by toolkit/inline.mjs: edit ${file}, then run node toolkit/inline.mjs)\n` +
    `const ${name} = (() => {\n${body}\nreturn { ${names.join(', ')} };\n})();\n${END}`;
};

/** Put a module into a page that has its BEGIN and END marker lines. */
export const withEngine = (page, source, file = 'pairwise.js', name = 'Pairwise') => {
  const [BEGIN, END] = marks(file);
  const a = page.indexOf(BEGIN), b = page.indexOf(END);
  if (a < 0 || b < a) throw new Error('The page has no "' + BEGIN + '" ... "' + END + '" block');
  return page.slice(0, a) + inlined(source, file, name) + page.slice(b + END.length);
};

/** The block a page currently holds for a module. */
export const engineIn = (page, file = 'pairwise.js') => {
  const [BEGIN, END] = marks(file);
  const a = page.indexOf(BEGIN), b = page.indexOf(END);
  return a < 0 || b < a ? null : page.slice(a, b + END.length);
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pagePath = here('./criteria-ranker.html');
  let page = readFileSync(pagePath, 'utf8');
  for (const m of MODULES) page = withEngine(page, readFileSync(here('./' + m.file), 'utf8'), m.file, m.name);
  writeFileSync(pagePath, page);
  console.log('Copied ' + MODULES.map(m => m.file).join(' and ') + ' into criteria-ranker.html');
}
