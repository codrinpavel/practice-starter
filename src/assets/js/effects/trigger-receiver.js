/**
 * Sets is-active on hover & focus/focus-visible
 */

document.querySelectorAll("[data-trigger]").forEach((trigger) => {
  const activate = () => {
    const id = trigger.dataset.trigger;

    document.querySelectorAll("[data-receiver]").forEach((el) => {
      el.classList.toggle("is-active", el.dataset.receiver === id);
    });
  };

  trigger.addEventListener("mouseenter", activate);

  trigger.addEventListener("focus", () => {
    if (trigger.matches(":focus-visible")) {
      activate();
    }
  });
});