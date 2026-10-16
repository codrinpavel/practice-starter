import Config from './11ty/config.js';
import fs from 'node:fs';
import { eleventyImageOnRequestDuringServePlugin } from "@11ty/eleventy-img";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function (eleventyConfig) {
  console.log({ Config });

  eleventyConfig.setLiquidOptions({
    root: ["./src/includes", "./src", "./"],
  });

  eleventyConfig.addPlugin(eleventyImageOnRequestDuringServePlugin);
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    formats: ["webp"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
      },
      pictureAttributes: {}
    },
    urlPath: "/assets/img/",
  });


  /**
   * 11ty Server Options
   * @link https://www.11ty.dev/docs/dev-server/
   * 
   * we're watching the Rollup compiled css/js files,
   * so there's no need to also watch the scss/js sources.
   */

  eleventyConfig.setServerOptions({
    liveReload: true,
    domDiff: false,
    showAllHosts: true,
    watch: [
      "dist/assets/min/**/*.css",
      "dist/assets/min/*.js",
    ],
  });

  eleventyConfig.watchIgnores.add('./src/assets/sass/**/*.scss');
  eleventyConfig.watchIgnores.add('./src/assets/js/**/*.js');

  /**
   * Watch custom Eleventy extensions
   */

  eleventyConfig.addWatchTarget("./11ty/", {
    resetConfig: true,
  });


  /**
   * Static Passthroughs
   * @link https://www.11ty.dev/docs/copy/
   * 
   * 1) Copy favicon files to the root directory
   * 2) Copy all other static assets, except for favicons and processed files.
   */

  eleventyConfig.addPassthroughCopy({ "./src/assets/favicon/": "./assets/img/" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/**/*.gif": "./assets/img/" });
  eleventyConfig.addPassthroughCopy({ "./src/assets/img/uploads/": "./assets/img/uploads/" });
  eleventyConfig.addPassthroughCopy('./src/assets/', {
    filter: ['*/**', '!favicon/**', '!sass/**', '!js/**', '!img/**', '!svg/**']
  });


  /**
   * Attach 11ty provided Universal Filters to globalData for use in required modules
   * @link https://www.11ty.dev/docs/filters/#eleventy-provided-universal-filters
   */

  eleventyConfig.addGlobalData('_filters', {
    url: eleventyConfig.getFilter('url'),
    slugify: eleventyConfig.getFilter('slugify'),
    md: eleventyConfig.getFilter('md')
  });


  /**
   * Ignores
   * @link https://www.11ty.dev/docs/ignores/#configuration-api-added-in-v1.0.0
   */

  if (Config.ISPROD) {
    // Ignore the sample file at build time
    eleventyConfig.ignores.add('./src/pages/sample.md');
  }


  /**
   * Filters
   * @link https://www.11ty.dev/docs/filters/
   */

  const filters = fs.readdirSync('./11ty/filters/');
  for (const f of filters) {
    const filter = await import(`./11ty/filters/${f}`);
    eleventyConfig.addFilter(f.replace('.js', ''), filter.default);
  }


  /**
   * Transforms
   * @link https://www.11ty.dev/docs/config/#transforms
   */

  const transforms = fs.readdirSync('./11ty/transforms/');
  for (const f of transforms) {
    const transform = await import(`./11ty/transforms/${f}`);
    eleventyConfig.addTransform(f.replace('.js', ''), transform.default);
  }


  /**
   * Shortcodes
   * @link https://www.11ty.dev/docs/shortcodes/
   */

  const shortcodes = fs.readdirSync('./11ty/shortcodes/');
  for (const f of shortcodes) {
    const shortcode = await import(`./11ty/shortcodes/${f}`);
    eleventyConfig.addAsyncShortcode(f.replace('.js', ''), shortcode.default);
  }


  /**
   * PairedShortcodes
   * @link https://www.11ty.dev/docs/shortcodes/#paired-shortcodes
   */

  const pairedShortcodes = fs.readdirSync('./11ty/pairedShortcodes/');
  for (const f of pairedShortcodes) {
    const pairedShortcode = await import(`./11ty/pairedShortcodes/${f}`);
    eleventyConfig.addPairedShortcode(f.replace('.js', ''), pairedShortcode.default);
  }


  /**
   * Project Config
   * @link https://www.11ty.dev/docs/config/#configuration-options
   */
  eleventyConfig.setQuietMode(true);

  return {
    pathPrefix: Config.BASEPATH,

    dir: {
      input: 'src',
      output: 'dist',
      data: 'data',
      includes: 'includes',
      layouts: 'includes/layouts',
    },
  };
};
