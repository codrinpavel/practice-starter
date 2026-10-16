document.querySelectorAll(".sensitive-image").forEach((image) => {
  image.addEventListener("click", () => {
    image.classList.add("is-revealed");
  });
});