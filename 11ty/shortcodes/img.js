/**
 * Shortcode: {% img %}
 * @link https://www.11ty.dev/docs/plugins/image/
 *
 * @param {string} src
 * @param {string} [alt=""]
 * @param {string} [css_classes=""]
 * @param {string} [loading="lazy"]
 * @param {string|null} [strategy]
 */

import Image from "@11ty/eleventy-img";
import Config from "../config.js";

export default async function (
  src,
  alt = "",
  css_classes = "",
  loading = "lazy",
  strategy = null
) {
  const isGif = src.toLowerCase().endsWith(".gif");
  const sourceUrl = `${Config.BASEPATH}/assets/img/${src}`;

  if (isGif) {
    if (strategy === "url") {
      return sourceUrl;
    }

    if (strategy === "preload") {
      return `<link
        rel="preload"
        as="image"
        fetchpriority="high"
        type="image/gif"
        href="${sourceUrl}"
      >`;
    }

    if (strategy === "prefetch") {
      return `<link
        rel="prefetch"
        as="image"
        type="image/gif"
        href="${sourceUrl}"
      >`;
    }

    return `<img
      src="${sourceUrl}"
      class="${`image ${css_classes}`.trim()}"
      alt="${alt}"
      loading="${loading}"
      fetchpriority="${loading === "eager" ? "high" : "auto"}"
      decoding="async"
    >`;
  }

  const metadata = await Image(`./src/assets/img/${src}`, {
    transformOnRequest: process.env.ELEVENTY_ENV === "dev",
    widths: [1024, 1920],
    formats: ["avif"],
    urlPath: `${Config.BASEPATH}/assets/img`,
    outputDir: ".cache/img",
  });

  const avif = metadata.avif;
  const sizes = "100vw";

  if (strategy === "url") {
    return avif.at(-1).url;
  }

  if (strategy === "preload") {
    const srcset = avif.map((img) => `${img.url} ${img.width}w`).join(", ");

    return `<link
      rel="preload"
      as="image"
      fetchpriority="high"
      type="image/avif"
      imagesizes="${sizes}"
      href="${avif[0].url}"
      imagesrcset="${srcset}"
    >`;
  }

  if (strategy === "prefetch") {
    return `<link rel="prefetch" as="image" type="image/avif" href="${avif[0].url}">`;
  }

  return Image.generateHTML(metadata, {
    class: `image ${css_classes}`.trim(),
    alt,
    loading,
    fetchpriority: loading === "eager" ? "high" : "auto",
    decoding: "async",
    sizes,
  });
}