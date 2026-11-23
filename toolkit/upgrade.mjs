// Moves a ranker already in use onto the current criteria-ranker.html, keeping what belongs to its decision:
// the <title>, the <header> (heading and intro), the DATA block and the note under the scores table.
// Saved answers in the viewer's browser carry over, because the page keeps the same DATA.key.
// Usage:  node toolkit/upgrade.mjs old-ranker.html > new-ranker.html
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const parts = {
  title: /<title>[\s\S]*?<\/title>/,
  header: /<header>[\s\S]*?<\/header>/,
  data: /const DATA = \{[\s\S]*?\n\};/,
  scoresNote: /<p class="small" style="margin-top:8px">[\s\S]*?<\/p>/,
};

/** The new page with the old page's decision-specific parts. Throws if the old page lacks title, header or DATA. */
export const upgrade = (oldPage, template) => {
  let page = template;
  for (const [name, re] of Object.entries(parts)) {
    const found = re.exec(oldPage);
    if (!found) { if (name === 'scoresNote') continue; throw new Error('No ' + name + ' found in the old page'); }
    page = page.replace(re, () => found[0]);
  }
  return page;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const template = readFileSync(new URL('./criteria-ranker.html', import.meta.url), 'utf8');
  process.stdout.write(upgrade(readFileSync(process.argv[2], 'utf8'), template));
}
