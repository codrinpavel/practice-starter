function splitAnimatedWords(element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        return node.nodeValue.trim()
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }
  );

  const textNodes = [];
  let wordIndex = 0;

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(node => {
    const fragment = document.createDocumentFragment();
    const parts = node.nodeValue.split(/(\s+)/);

    parts.forEach(part => {
      if (!part) return;

      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }

      const outer = document.createElement("span");
      const inner = document.createElement("span");

      outer.className = "inline-block overflow-y-clip";

      inner.className = "inline-block";
      inner.dataset.reveal = "words";
      inner.dataset.stagger = "50";
      inner.style.setProperty("--i", wordIndex);

      wordIndex++;

      const match = part.match(/^(.*?)([,.;:!?…%)\]}»”’]+)$/);

      if (match) {
        const [, word, punctuation] = match;

        if (word) {
          inner.append(document.createTextNode(word));
        }

        const punctuationElement = document.createElement("span");
        punctuationElement.className = "punctuation";
        punctuationElement.textContent = punctuation;

        inner.append(punctuationElement);
      } else {
        inner.textContent = part;
      }

      outer.append(inner);
      fragment.append(outer);
    });

    node.replaceWith(fragment);
  });

  element.classList.add("word-split--finished");
}

document
  .querySelectorAll(".word-split")
  .forEach(splitAnimatedWords);