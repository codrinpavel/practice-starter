import md from '../filters/md.js';

export default async function (content) {
  return `
    <section class="gallery">
      ${md(content.trim())}
    </section>
  `;
}
