export default async function (content, classes = false) {
  return `
    <section class="${classes ? classes : ''}">
      <div class="wrapper wrapper--narrow">
        <div class="columns justify-between">
          ${content}
        </div>
      </div>
    </section>
  `;
}
