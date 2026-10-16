/**
 * Shortcode: {% produrl %}
 * 
 * Usage: {% produrl %}
 * Returns PRODURL (e.g. example.com)
 */

import Config from '../config.js';

export default async function () {
  return Config.PRODURL;
}