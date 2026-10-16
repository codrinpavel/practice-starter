/**
 * Reveal animations
 *
 * [data-reveal], [data-inview]: Reveals on scroll. Adds `is-inview` and `--transition-delay`.
 * [data-delay="200"]: Delay before this element reveals. Default: 0ms.
 * [data-stagger="50"] Time added before the next element reveals. Default: 125ms.
 * [data-reveal-batch] Batch container. Once it starts, all child reveal elements animate, even if they are not in the viewport.
 * [data-reveal-batch-max="1000"] Maximum time following elements wait for this batch. Default: 1000ms.
 */


const SELECTOR = "[data-reveal],[data-inview]";
const BATCH_SELECTOR = "[data-reveal-batch]";
const START_DELAY_MS = 1;
const INVIEW_CLASS = "is-inview";

const DEFAULT_STAGGER_MS = 125;
const DEFAULT_BATCH_MAX_WAIT_MS = 1000;

let observer;
let elementOrder = new Map();

let queued = new Set();
let revealFrame = 0;

function initReveals() {
  if (observer) {
    observer.disconnect();
  }

  const elements = Array.from(document.querySelectorAll(SELECTOR));
  const batches = Array.from(document.querySelectorAll(BATCH_SELECTOR));

  elementOrder = new Map(elements.map((el, index) => [el, index]));

  if (revealFrame) {
    cancelAnimationFrame(revealFrame);
    revealFrame = 0;
  }

  queued.clear();

  if (!("IntersectionObserver" in window)) {
    reveal(elements);
    return;
  }

  observer = new IntersectionObserver(handleIntersect, {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
  });

  /*
    Children inside [data-reveal-batch] are not observed individually.

    The batch container is the trigger.
    Once the batch enters, all reveal elements inside it are scheduled,
    including children below the viewport.
  */
  const batchChildren = new Set();

  for (const batch of batches) {
    for (const el of getBatchRevealElements(batch)) {
      batchChildren.add(el);
    }
  }

  const targets = [
    ...elements.filter(el => !batchChildren.has(el)),
    ...batches,
  ];

  for (const el of targets) {
    observer.observe(el);
  }
}

function handleIntersect(entries) {
  const entering = entries
    .filter(entry => entry.isIntersecting)
    .map(entry => entry.target);

  if (!entering.length) return;

  queueReveal(entering);
}

function queueReveal(elements) {
  for (const el of expandBatchElements(elements)) {
    queued.add(el);
  }

  if (revealFrame) return;

  revealFrame = requestAnimationFrame(() => {
    revealFrame = 0;

    const elements = Array.from(queued);
    queued.clear();

    reveal(elements);
  });
}

function reveal(elements) {
  elements = elements.filter(el => {
    return !el.classList.contains(INVIEW_CLASS);
  });

  if (!elements.length) return;

  elements.sort((a, b) => {
    return elementOrder.get(a) - elementOrder.get(b);
  });

  /*
    Local timeline.

    Normal elements advance the timeline normally.

    Batch elements have their own internal timeline, but only advance
    the outer timeline by up to DEFAULT_BATCH_MAX_WAIT_MS.

    So a long paragraph/list can keep animating internally,
    while the next block does not wait for the entire batch duration.
  */
  let delay = 0;
  let index = 0;

  while (index < elements.length) {
    const el = elements[index];
    const batch = el.closest(BATCH_SELECTOR);

    if (!batch) {
      delay = revealOne(el, delay);
      index += 1;
      continue;
    }

    const batchElements = [];

    while (
      index < elements.length &&
      elements[index].closest(BATCH_SELECTOR) === batch
    ) {
      batchElements.push(elements[index]);
      index += 1;
    }

    const batchStartDelay = delay;
    let batchDelay = batchStartDelay;

    for (const batchEl of batchElements) {
      batchDelay = revealOne(batchEl, batchDelay);
    }

    const batchDuration = batchDelay - batchStartDelay;
    const batchMaxWait = toNumber(
      batch.dataset.revealBatchMax,
      DEFAULT_BATCH_MAX_WAIT_MS
    );

    delay = batchStartDelay + Math.min(batchDuration, batchMaxWait);

    if (observer) {
      observer.unobserve(batch);
    }
  }
}

function revealOne(el, delay) {
  const extraDelay = toNumber(el.dataset.delay, 0);
  const stagger = toNumber(el.dataset.stagger, DEFAULT_STAGGER_MS);

  delay += extraDelay;

  el.style.setProperty(
    "--transition-delay",
    `${Math.round(delay)}ms`
  );

  el.classList.add(INVIEW_CLASS);
  delay += stagger;

  if (observer) observer.unobserve(el);
  return delay;
}

function expandBatchElements(elements) {
  const expanded = [];
  const seenBatches = new Set();

  for (const el of elements) {
    const batch = el.matches(BATCH_SELECTOR)
      ? el
      : el.closest(BATCH_SELECTOR);

    if (!batch) {
      expanded.push(el);
      continue;
    }

    if (seenBatches.has(batch)) continue;

    seenBatches.add(batch);
    expanded.push(...getBatchRevealElements(batch));
  }

  return expanded.filter(el => {
    return (
      el.matches(SELECTOR) &&
      !el.classList.contains(INVIEW_CLASS)
    );
  });
}

function getBatchRevealElements(batch) {
  const elements = [];

  if (batch.matches(SELECTOR)) {
    elements.push(batch);
  }

  elements.push(...batch.querySelectorAll(SELECTOR));

  return elements.filter(el => {
    return el.closest(BATCH_SELECTOR) === batch;
  });
}

function toNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

let initTimer = 0;

function startReveals() {
  clearTimeout(initTimer);

  initTimer = setTimeout(() => {
    initReveals();
  }, START_DELAY_MS);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startReveals, { once: true });
} else {
  startReveals();
}

window.addEventListener("pageshow", event => {
  if (event.persisted) {
    startReveals();
  }
});

window.initReveals = initReveals;
window.startReveals = startReveals;