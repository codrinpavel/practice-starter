import lenis from "../effects/lenis";

const legalProse = document.querySelector(".legal__prose");
const legalMenu = document.querySelector(".legal__menu > ul");

if (legalProse && legalMenu) {
  const slugify = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const getHeaderHeight = () => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue("--header-height");

    return parseFloat(value) || 0;
  };

  const headings = [...legalProse.querySelectorAll("h2")];
  const links = [];

  headings.forEach((heading) => {
    const title = heading.textContent.trim();
    const id = slugify(title);

    heading.id = id;

    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = `#${id}`;
    link.textContent = title;

    li.appendChild(link);
    legalMenu.appendChild(li);

    links.push(link);
  });

  const setActive = (heading) => {
    links.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.hash === `#${heading.id}`
      );
    });
  };

  const updateActiveHeading = () => {
    if (!headings.length) return;

    const headerHeight = getHeaderHeight();

    let current = headings[0];
    let smallestDistance = Infinity;

    headings.forEach((heading) => {
      const top = heading.getBoundingClientRect().top;
      const distance = Math.abs(top - headerHeight);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        current = heading;
      }
    });

    setActive(current);
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const id = link.hash.slice(1);
      const target = document.getElementById(id);

      if (!target) return;

      setActive(target);

      lenis.scrollTo(target, {
        offset: -getHeaderHeight(),
      });
    });
  });

  updateActiveHeading();

  lenis.on("scroll", updateActiveHeading);
}