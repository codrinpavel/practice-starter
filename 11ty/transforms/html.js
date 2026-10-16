/**
 * Transform: HTML
 * Minify
 * 
 * @link https://www.11ty.dev/docs/config/#transforms
 */

import htmlmin from 'html-minifier';

export default async function (content) {
  if (
    process.env.ELEVENTY_ENV == 'production' &&
    this.page.outputPath &&
    this.page.outputPath.endsWith(".html")
  ) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true
    });

    return minified;
  }

  return content;
};
