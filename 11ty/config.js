/**
 * Configuration variables for the 11ty build
 *
 * @var {string}  PRODURL
 * @var {string}  BASEPATH
 * @var {boolean} ISPROD
 */

let PRODURL = "";
let BASEPATH = "";
const USER = "none";
const PASS = "none";
const ISPROD = process.env.ELEVENTY_ENV === "production";

/**
 * Target-specific configuration
 */

PRODURL = "https://anthcodrin.com";
BASEPATH = "";

/**
 * Environment and local development overrides
 */

PRODURL = ISPROD ? (process.env.PRODURL ?? PRODURL) : "";
BASEPATH = ISPROD ? (process.env.BASEPATH ?? BASEPATH) : "";

export default { ISPROD, BASEPATH, PRODURL, USER, PASS };