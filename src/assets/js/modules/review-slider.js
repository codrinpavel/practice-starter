import Splide from '@splidejs/splide';

document.querySelectorAll('.reviews-slider__carousel').forEach((slider) => {
  new Splide(slider, {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: 'var(--size-ml)',
    pagination: false,
    mediaQuery: 'min',
    breakpoints: {
      768: { perPage: 2, perMove: 2 },
      1024: { perPage: 3, perMove: 3 },
    },
    i18n: {
      prev: 'Reseñas anteriores',
      next: 'Reseñas siguientes',
      slideLabel: '%s de %s',
    },
  }).mount();
});

document.querySelectorAll('.review-slider').forEach((slider) => {
  const slideCount = slider.querySelectorAll('.splide__slide').length;
  const arrows = slider.querySelector('.splide__arrows');

  if (slideCount < 2) {
    arrows.hidden = true;
    return;
  }

  new Splide(slider, {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    pagination: false,
    autoHeight: true,
    i18n: {
      prev: 'Reseña anterior',
      next: 'Reseña siguiente',
      slideLabel: '%s de %s',
    },
  }).mount();
});
