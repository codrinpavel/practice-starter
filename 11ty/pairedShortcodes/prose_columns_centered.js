import md from '../filters/md.js';

export default async function (content, classes = false) {
  return `
    <section class="${classes ? classes : ''}">
      <div class="wrapper">
        <div class="columns md:columns-10 lg:columns-7 justify-center">
          <div class="prose">
            ${md(content.trim())}
          </div>
        </div>
      </div>
    </section>
  `;
}
