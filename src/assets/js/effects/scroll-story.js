import lenis from "./lenis.js";

const story = document.querySelector(".scroll-story");

if (story) {
  const copies = [...story.querySelectorAll(".scroll-story__copy")];

  const updateActiveCopy = () => {
    const rect = story.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;

    const progress = Math.min(
      1,
      Math.max(0, -rect.top / scrollable)
    );

    let activeIndex = 0;

    if (progress >= 0.75) {
      activeIndex = 2;
    } else if (progress >= 0.25) {
      activeIndex = 1;
    }

    copies.forEach((copy, index) => {
      copy.classList.toggle("is-active", index === activeIndex);
    });
  };

  updateActiveCopy();

  lenis.on("scroll", updateActiveCopy);
  window.addEventListener("resize", updateActiveCopy);
}