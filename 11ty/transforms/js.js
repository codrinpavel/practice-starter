/**
 * Transform: JS
 * Inline all javascript (minified with @rollup/plugin-terser)
 */

import { readFileSync } from 'node:fs';

const inlineJs =
  process.env.ELEVENTY_ENV === 'production'
    ? readFileSync('dist/assets/min/main.min.js', 'utf8')
    : null;

export default async function (content) {
  if (
    process.env.ELEVENTY_ENV === 'production' &&
    this.page.outputPath &&
    this.page.outputPath.endsWith(".html")
  ) {
    return content.replace('--INLINE JS--', `<script type="module">${inlineJs}</script>`);
  }

  return content;
}
