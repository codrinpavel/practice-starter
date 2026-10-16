import md from '../filters/md.js';

export default async function (content, headline) {
  const markdown = content.trim();

  const indentation = markdown
    .split('\n')
    .filter(line => line.trim())
    .reduce((min, line) => {
      const spaces = line.match(/^[ \t]*/)[0].length;
      return Math.min(min, spaces);
    }, Infinity);

  const dedented = markdown
    .split('\n')
    .map(line => line.slice(indentation))
    .join('\n');

  return `
<details data-reveal="fade-in">
<summary>${headline}</summary>
<div class="details__body">
<div class="details__content prose">
${md(dedented)}
</div>
</div>
</details>
  `.trim();
}