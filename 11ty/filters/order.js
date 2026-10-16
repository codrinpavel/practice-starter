/**
 * Filter: order
 * Orders a collection by frontmatter `order` key
 */

export default function (values) {
  return values ? values.slice().sort((a, b) => a.data.order - b.data.order) : [];
}
