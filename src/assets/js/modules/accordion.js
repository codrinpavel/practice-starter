const items = [...document.querySelectorAll("details")];

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

const duration = 400;
const easing = "ease";

const states = new Map();

items.forEach((item) => {
  states.set(item, {
    targetOpen: item.open,
    animation: null,
  });

  item.classList.toggle("is-open", item.open);
});

const setOpen = (item, open) => {
  const body = item.querySelector(".details__body");
  const state = states.get(item);

  if (state.targetOpen === open && state.animation) {
    return;
  }

  if (
    state.targetOpen === open &&
    !state.animation &&
    item.open === open
  ) {
    return;
  }

  state.targetOpen = open;

  let startHeight;

  if (state.animation) {
    startHeight = body.getBoundingClientRect().height;

    state.animation.cancel();
    state.animation = null;

    body.style.height = `${startHeight}px`;
  } else if (item.open) {
    startHeight = body.getBoundingClientRect().height;
  } else {
    startHeight = 0;
  }

  if (reducedMotion.matches) {
    item.open = open;
    item.classList.toggle("is-open", open);
    body.style.height = "";
    return;
  }

  if (!open) {
    item.classList.remove("is-open");
  }

  if (!item.open) {
    body.style.height = "0px";
    item.open = true;
  }

  const fullHeight = body.scrollHeight;
  const endHeight = open ? fullHeight : 0;

  body.style.height = `${startHeight}px`;

  body.offsetHeight;

  if (open) {
    item.classList.add("is-open");
  }

  if (Math.abs(endHeight - startHeight) < 1) {
    state.animation = null;

    if (open) {
      item.open = true;
      body.style.height = "";
    } else {
      item.open = false;
      body.style.height = "";
    }

    return;
  }

  const animation = body.animate(
    [
      { height: `${startHeight}px` },
      { height: `${endHeight}px` },
    ],
    {
      duration,
      easing,
    }
  );

  state.animation = animation;

  animation.onfinish = () => {
    if (state.animation !== animation) {
      return;
    }

    state.animation = null;

    if (state.targetOpen) {
      item.open = true;
      item.classList.add("is-open");
      body.style.height = "";
    } else {
      item.classList.remove("is-open");
      item.open = false;
      body.style.height = "";
    }
  };
};

const getSiblingDetails = (item) => {
  return [...item.parentElement.children].filter(
    (sibling) =>
      sibling !== item &&
      sibling.matches("details")
  );
};

items.forEach((item) => {
  const summary = item.querySelector("summary");

  summary.addEventListener("click", (event) => {
    event.preventDefault();

    const state = states.get(item);
    const shouldOpen = !state.targetOpen;

    if (shouldOpen) {
      getSiblingDetails(item).forEach((otherItem) => {
        setOpen(otherItem, false);
      });
    }

    setOpen(item, shouldOpen);
  });
});