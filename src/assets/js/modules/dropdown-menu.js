const buttons = document.querySelectorAll(".submenu-button");

let activeButton = null;

function getSubmenu(button) {
  return button.nextElementSibling;
}

function getItem(button) {
  return button.parentElement;
}

function closeSubmenu(button) {
  if (!button) return;

  const submenu = getSubmenu(button);
  const item = getItem(button);

  submenu.inert = true;
  submenu.setAttribute("aria-hidden", "true");
  button.setAttribute("aria-expanded", "false");
  item.classList.remove("is-active");

  if (activeButton === button) {
    activeButton = null;
  }
}

function openSubmenu(button) {
  if (activeButton && activeButton !== button) {
    closeSubmenu(activeButton);
  }

  const submenu = getSubmenu(button);
  const item = getItem(button);

  submenu.inert = false;
  submenu.setAttribute("aria-hidden", "false");
  button.setAttribute("aria-expanded", "true");
  item.classList.add("is-active");

  activeButton = button;
}

function toggleSubmenu(button) {
  if (activeButton === button) {
    closeSubmenu(button);
  } else {
    openSubmenu(button);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleSubmenu(button);
  });
});

document.addEventListener("click", (event) => {
  if (!activeButton) return;

  const item = getItem(activeButton);

  if (!item.contains(event.target)) {
    closeSubmenu(activeButton);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !activeButton) return;

  const button = activeButton;

  closeSubmenu(button);
  button.focus();
});