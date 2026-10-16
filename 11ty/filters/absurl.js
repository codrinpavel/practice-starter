/**
 * Filter: absurl
 * Transform a url filter into an absolute filter
 * Useful for canonical links, favicons etc.
 * 
 * Usage: <a href="{{ '/test/' | url | absurl }}">Results in an absolute URL</a>
 */

import Config from '../config.js';

export default function (href) {
  return Config.ISPROD ? new URL(href, Config.PRODURL).toString() : href;
}
