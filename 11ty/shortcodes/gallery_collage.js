export default function (
  imageLeft,
  imageRight = null,
  direction = "normal",
  positionLeft = "object-left",
  positionRight = ""
) {
  const isReverse = direction === "reverse";

  const isVideo = (src) =>
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(src);

  const media = (src, className) => {
    if (isVideo(src)) {
      return `
        <video
          class="${className}"
          width="854"
          height="480"
          src="${src}"
          muted
          playsinline
          loop
          autoplay
          aria-hidden="true"
        >
          <track
            kind="captions"
            src=""
            srclang="en"
            label="Muted"
            default
          >
        </video>
      `;
    }

    return `
      <img
        class="${className}"
        src="${src}"
        alt=""
        loading="lazy"
        decoding="async"
      >
    `;
  };

  const leftColumns = imageRight
    ? isReverse
      ? "md:columns-8"
      : "md:columns-4"
    : "md:columns-12";

  const rightColumns = isReverse
    ? "md:columns-4"
    : "md:columns-8";

  return `
    <div class="mt-8xl collage">
      <div class="columns">
        <div class="${leftColumns}">
          <figure class="h-100% parallax overflow-clip radius-md" data-reveal="media">
            ${media(
              imageLeft,
              `${positionLeft} h-100% ${imageRight ? "" : "aspect-21-9"}`
            )}
          </figure>
        </div>

        ${imageRight ? `
          <div class="${rightColumns}">
            <figure class="h-100% overflow-clip radius-md" data-reveal="media">
              ${media(
                imageRight,
                `${positionRight} h-100%`
              )}
            </figure>
          </div>
        ` : ""}
      </div>
    </div>
  `;
}