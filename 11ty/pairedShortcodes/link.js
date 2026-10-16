/**
 * Paired Shortcode: {% link %}
 *
 * @param {string} body       - Link text
 * @param {string} url        - URL to transform
 * @param {string} [classes=] - additional CSS classes
 *
 * Usage: {% link "http://link-url.com", "css classes" %}link text{% endlink %}
 */

export default async function (body, url, classes) {
  let urlFilter = this.ctx._filters.url;
  let isExternal = url.startsWith("http");
  let classAttr = classes ? `class="${classes}"` : '';
  let anchor;

  if (isExternal) {
    anchor = `<a
      href="${url}"
      ${classAttr}
      target="_blank"
      rel="noopener noreferrer">${body}<span class="visually-hidden">opens in a new window</span></a>`;
  } else {
    anchor = `<a href="${urlFilter(url, "")}" ${classAttr}>${body}</a>`;
  }

  // Remove all newlines and whitespaces from the external link
  let trimmed = anchor.replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, ' ').trim();
  return trimmed;
};
