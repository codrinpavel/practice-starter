/**
 * Paired Shortcode: {% video %}
 * 
 * @param {string} [body=]    - video figcaption
 * @param {string} url        - video url
 * @param {string} [title=""] - video title
 * @param {string} [ar=56.25] - aspect ratio
 * 
 * Aspect ratio is calculated as: y/x*100
 * e.g. for 16/9 aspect ratio, the formula would be: 9/16*100 = 56.25
 * 
 * Usage: {% video "https://player.vimeo.com/video/344405649?h=de4703cbd3", "Ideas On Purpose Homepage Video", 56.25 %}A caption{% endvideo %}
 */

export default async function (body, url, title = "", ar = 56.25) {
  let figcaption = body ? `<figcaption>${body}</figcaption>` : '';

  return `<figure class="media">
  <div class="video" style="padding-top:${ar}%">
    <iframe 
      title="${title}"
      src="${url}" 
      width="560" 
      height="315" 
      frameborder="0" 
      allow="accelerometer; autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen></iframe>
  </div>
  ${figcaption}
</figure>`;
};
