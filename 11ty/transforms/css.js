/**
 * Transform: CSS
 * 
 * 1. Concatenate CSS files
 * 2. PurgeCSS @link https://github.com/FullHuman/purgecss
 * 3. Append BASEPATH to all /assets/ references
 * 4. Inline results in the <head> section of the document
 */

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

import { PurgeCSS } from 'purgecss';
import Config from '../config.js';

export default async function (content) {
  if (
    process.env.ELEVENTY_ENV == 'production' &&
    this.page.outputPath &&
    this.page.outputPath.endsWith('.html')
  ) {
    // 1.
    const cssPath = 'dist/assets/min';

    const directories = (await readdir(cssPath, { withFileTypes: true }))
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .sort();

    const css = (
      await Promise.all(
        directories.map(directory =>
          readFile(join(cssPath, directory, 'index.css'), 'utf8')
        )
      )
    ).join('\n');

    // 2.
    const [purgeCSSResult] = await new PurgeCSS().purge({
      content: [{ raw: content }],
      css: [{ raw: css }],
      variables: true,
      keyframes: true,
      defaultExtractor: content =>
        content.match(/[A-Za-z0-9_:/\-]+/g) || [],
      dynamicAttributes: ['hidden'],
      rejected: true,
      safelist: {
        greedy: [
          /^js-/,
          /^has-/,
        ]
      }
    });

    // 3.
    const results = purgeCSSResult.css.replaceAll(
      '/assets/',
      Config.BASEPATH + '/assets/'
    );

    // 4.
    return content.replace(
      '<!--INLINE CSS-->',
      '<style>' + results + '</style>'
    );
  }

  return content;
}