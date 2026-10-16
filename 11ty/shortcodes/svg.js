/**
 * Shortcode: {% svg %}
 * @link https://github.com/brob/eleventy-plugin-svg-contents
 * 
 * @param {string} fileurl      - svg path and filename
 * @param {string} [className=] - additional classes
 * 
 * Usage: {% svg "folder/filename.svg", 'custom-classname' %}
 * Output: SVG file contents + extra classname if argument is provided
 */

import * as SvgModule from 'eleventy-plugin-svg-contents/src/getSvgContents.js';

export default async function (fileurl, className, extractTag = 'svg') {
  const Svg = SvgModule.default || SvgModule;
  const getSVGContents = new Svg(
    `/src/assets/svg/${fileurl}`,
    className,
    extractTag
  );

  return getSVGContents.getSvg();
}
