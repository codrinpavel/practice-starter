import md from '../filters/md.js';

export default async function (content) {
  return `
    <div class="prose md:columns-5 md:mr-1 flex flex-col">
      ${md(content.trim())}
    </div>
  `;
}
