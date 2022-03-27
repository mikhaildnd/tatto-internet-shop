import { setHeight } from './modules/set-elem-height.js';

import Swiper, { Navigation, Pagination, Thumbs, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/lazy';
// import 'swiper/css/thumbs';

import { debounce } from './modules/debounce.js';
import { getMediaQuery } from './modules/get-media-query.js';

//!!!реагируют на порядок
const productThumbSlider = new Swiper('.product__thumbs-slider-inner', {
  modules: [Lazy],
  slidesPerView: 'auto',
  freeMode: true,
  watchSlidesProgress: true,
  spaceBetween: 10,
  preloadImages: false,
  lazy: true,
  watchSlidesProgress: true,
  breakpoints: {
    480: {
      direction: 'vertical',
    },
    576: {
      direction: 'horizontal',
    },
    768: {
      direction: 'vertical',
    },
  },
});

const productImageSlider = new Swiper('.product__slider', {
  modules: [Thumbs, Lazy],
  slidesPerView: 1,
  spaceBetween: 50,
  preloadImages: false,
  lazy: true,
  thumbs: {
    swiper: productThumbSlider,
  },
});
//========================================================================================================================================================
/* Product page sliders */
const relatedProductsSlider = new Swiper(
  '.related-products__slider--related .related-products__slider-inner',
  {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: '.related-products__slider--related .swiper-button-next',
      prevEl: '.related-products__slider--related .swiper-button-prev',
    },
    pagination: {
      el: '.related-products__slider--related .slider-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerGroup: 3,
      },
      1256: {
        slidesPerGroup: 4,
      },
    },
    on: {
      init: (obj) => {
        const setHightLastElem = new setHeight({
          containerElement: obj.wrapperEl,
          mediaQuery: {
            getMediaFunc: getMediaQuery,
            displayWidth: '1024',
            displayOption: 'min-width',
          },
          debounce: {
            enable: true,
            debounceFunc: debounce,
          },
        });
      },
    },
  }
);

const similarProductsSlider = new Swiper(
  '.related-products__slider--similar .related-products__slider-inner',
  {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: '.related-products__slider--similar .swiper-button-next',
      prevEl: '.related-products__slider--similar .swiper-button-prev',
    },
    pagination: {
      el: '.related-products__slider--similar .slider-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerGroup: 3,
      },
      1256: {
        slidesPerGroup: 4,
      },
    },
    on: {
      init: (obj) => {
        const setHightLastElem = new setHeight({
          containerElement: obj.wrapperEl,
          mediaQuery: {
            getMediaFunc: getMediaQuery,
            displayWidth: '1024',
            displayOption: 'min-width',
          },
          debounce: {
            enable: true,
            debounceFunc: debounce,
          },
        });
      },
    },
  }
);
