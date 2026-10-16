import Splide from '@splidejs/splide';

document.querySelectorAll('.gallery-slider').forEach((slider) => {
  const splide = new Splide(slider, {
    type: 'loop',
    perPage: 3,
    gap: '1rem',
    pagination: false,
    breakpoints: {
      767: {
        perPage: 2
      }
    }
  });

  const updateArrows = () => {
    const slideCount = splide.length;
    const perPage = splide.options.perPage;
    const arrows = slider.querySelector('.splide__arrows');

    if (arrows) {
      arrows.hidden = slideCount <= perPage;
    }
  };

  splide.on('mounted resized updated', updateArrows);

  splide.mount();
});
