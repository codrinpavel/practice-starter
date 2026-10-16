/**
 * Markdown filter to process markdown contents
 * @link https://11ty.rocks/eleventyjs/content/#markdown-filter
 * 
 * wrap images in figure, not p
 */

import markdownIt from 'markdown-it';

const md = new markdownIt({
  html: true,
});

function isImageOnlyParagraph(tokens, idx) {
  const inline = tokens[idx + 1];

  return (
    inline?.type === 'inline' &&
    inline.children?.length === 1 &&
    inline.children[0].type === 'image'
  );
}

md.renderer.rules.paragraph_open = (tokens, idx) => {
  if (isImageOnlyParagraph(tokens, idx)) {
    return '<figure>';
  }

  return '<p>';
};

md.renderer.rules.paragraph_close = (tokens, idx) => {
  const inline = tokens[idx - 1];

  if (
    inline?.type === 'inline' &&
    inline.children?.length === 1 &&
    inline.children[0].type === 'image'
  ) {
    return '</figure>';
  }

  return '</p>';
};

export default function (content) {
  return md.render(content);
}