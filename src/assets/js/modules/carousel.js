import Splide from '@splidejs/splide';

document.querySelectorAll('.carousel').forEach((slider) => {
  const hasMultipleImages = slider.querySelectorAll('.splide__slide').length > 1;

  new Splide(slider, {
    type: hasMultipleImages ? 'loop' : 'slide',
    perPage: 1,
    perMove: 1,
    type  : 'fade',
    rewind: true,
    arrows: false,
    pagination: false,
    autoplay: hasMultipleImages,
    pauseOnHover: false,
    pauseOnFocus: false,
    lazyLoad: 'nearby',
  }).mount();
});
