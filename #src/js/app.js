// import { webpSupportTest } from './modules/webp-support-test.js';
// import { HeaderScroll } from './modules/header-scroll.js';
// import { scrollWidthCalc } from './modules/calc-scroll-width.js';
// import { test } from './modules/test.js';
// import { Scroll } from './modules/scroll.js';
// import { PaginationMove } from './modules/pagination-move.js';
// import { toggleClass } from './modules/helpers.js';

import { Accordeon } from './modules/toggle-accordeon.js';

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

import Swiper, { Navigation, Pagination, Thumbs, Grid, EffectCreative, Lazy } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/lazy';
// import 'swiper/css/thumbs';

// webpSupportTest();

const acoordeon = new Accordeon({
  blockSelector: '.catalog__filter',
  triggerSelector: '.group-filter__top',
  toggleClass: 'hidden',
  addClassOnInit: false,
  toggleStyle: 'maxHeight',
});

//noUislider=========================================================================================================================================
const stepsSlider = document.querySelector('.group-filter__track');
const input0 = document.querySelector('.js-input-left');
const input1 = document.querySelector('.js-input-right');
const inputs = [input0, input1];

if (stepsSlider) {
  noUiSlider.create(stepsSlider, {
    start: [0, 200000],
    connect: true,
    step: 1000,
    range: {
      'min': 0,
      'max': 200000,
    },
    format: {
      // 'to' the formatted value. Receives a number.
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return Number(parseInt(value));
      },
      // to: function (value) {
      //     return value + ',-';
      // },
      // 'from' the formatted value.
      // Receives a string, should return a number.
      // from: function (value) {
      //     return Number(value.replace(',-', ''));
      // }
    },
  });

  stepsSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
  });
  input0.addEventListener('change', function () {
    stepsSlider.noUiSlider.set([this.value, null]);
  });
  input1.addEventListener('change', function () {
    stepsSlider.noUiSlider.set([null, this.value]);
  });
}
//========================================================================================================================================================

//==Инициализация слайдеров пачкой
function initSwiperSliders(selector, options = {}) {
  const sliders = document.querySelectorAll(selector);

  sliders.forEach((el) => {
    if (el.classList.contains('swiper')) {
      const newSlider = new Swiper(el, options);
    }
  });
}

// //*Слайдер внутри карточки товара
initSwiperSliders('.gallery-card__slider', {
  modules: [Pagination, Lazy],
  slidesPerView: 1,
  preloadImages: false,
  lazy: true,
  pagination: {
    el: '.gallery-card__pagination',
    clickable: true,
  },
});
//========================================================================================================================================================
const categoriesListSlider = new Swiper('.product-offers__categories', {
  slidesPerView: 1.5,
  freeMode: true,
  watchSlidesProgress: true,
  spaceBetween: 10,
  breakpoints: {
    480: {
      slidesPerView: 2.3,
    },
    576: {
      slidesPerView: 3.5,
    },
    768: {
      slidesPerView: 4,
    },
  },
});

const productsListSlider = new Swiper('.main-page .product-offers__products', {
  modules: [Thumbs],
  slidesPerView: 1,
  spaceBetween: 150,
  autoHeight: true,
  thumbs: {
    swiper: categoriesListSlider,
  },
});

const feedbackSlider = new Swiper('.feedback__slider', {
  modules: [EffectCreative, Navigation, Pagination],
  effect: 'creative',
  creativeEffect: {
    limitProgress: 5,
    perspective: false,
    prev: {
      translate: ['-100%', 0, 0],
      opacity: 0.7,
      scale: 0.85,
    },
    next: {
      opacity: 0.7,
      scale: 0.85,
      translate: ['100%', 0, 0],
    },
  },
  slidesPerView: 1,
  initialSlide: 1,
  grabCursor: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.feedback__slider .slider-pagination',
    clickable: true,
  },
});

const heroSlider = new Swiper('.hero__slider', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.slider-pagination',
    clickable: true,
  },
});

const brandsSlider = new Swiper('.brands__slider .swiper', {
  modules: [Navigation, Pagination, Grid],
  slidesPerView: 3,
  spaceBetween: 15,
  grid: {
    rows: 2,
  },
  breakpoints: {
    768: {
      spaceBetween: 20,
    },
    980: {
      slidesPerView: 4,
    },
    1256: {
      slidesPerView: 5,
    },
  },
  navigation: {
    nextEl: '.brands__slider .swiper-button-next',
    prevEl: '.brands__slider .swiper-button-prev',
  },
  pagination: {
    el: '.brands__slider .slider-pagination',
    clickable: true,
  },
});

const catalogBtnMobile = document.querySelector('.header-nav__item--arrow button');
const catalogListMobile = document.querySelector('.header-nav__sub-list');

catalogBtnMobile.addEventListener('click', () => {
  if (!catalogListMobile.classList.contains('open')) {
    catalogBtnMobile.style.marginBottom = '30px';
    catalogListMobile.classList.add('open');
    catalogListMobile.style.height = catalogListMobile.scrollHeight + 'px';
  } else {
    catalogListMobile.classList.remove('open');
    catalogBtnMobile.style.marginBottom = '0';
    catalogListMobile.style.height = '0';
  }
});

catalogListMobile.addEventListener('focusin', () => {
  if (!catalogListMobile.classList.contains('open')) {
    catalogListMobile.classList.add('open');
    catalogBtnMobile.style.marginBottom = '30px';
    catalogListMobile.style.height = catalogListMobile.scrollHeight + 'px';
  }
});

const ddButtons = document.querySelectorAll('.header__dropdown-button');
const catalog = document.querySelector('.catalog-dropdown');
const ddMenu = document.querySelector('.header__dropdown-menu');

const displayWidth = '1024px';

function getMediaQuery(dWidth, widthOption = 'min-width') {
  const mediaQuery = window.matchMedia(`(${widthOption}: ${dWidth})`);

  return mediaQuery;
}

ddButtons.forEach((el) => {
  el.addEventListener('click', () => {
    let mq = getMediaQuery(displayWidth);

    if (!mq.matches) {
      ddMenu.classList.toggle('open');
      if (mq.matches) {
        ddMenu.classList.remove('open');
        ddButtons.forEach((el) => {
          el.classList.remove('open');
        });
      }
    } else if (mq.matches) {
      catalog.classList.toggle('open');
      if (!mq.matches) {
        catalog.classList.remove('open');
        ddButtons.forEach((el) => {
          el.classList.remove('open');
        });
      }
    }

    el.classList.toggle('open');
  });
});
//========================================================================================================================================================
const filterTrigger = document.querySelector('.products-panel__filter-trigger');
const catalogFilter = document.querySelector('.catalog__filter');
const filterClose = document.querySelector('.filter__close-icon');

if (filterTrigger) {
  filterTrigger.addEventListener('click', () => {
    catalogFilter.classList.add('open');
  });
}
if (filterClose) {
  filterClose.addEventListener('click', () => {
    catalogFilter.classList.remove('open');
  });
}
//========================================================================================================================================================
//!!!реагируют на порядок
const productThumbSlider = new Swiper('.product-page .product__thumbs-slider-inner', {
  modules: [Lazy],
  slidesPerView: 'auto',
  freeMode: true,
  watchSlidesProgress: true,
  spaceBetween: 10,
  preloadImages: false,
  lazy: true,
  watchSlidesProgress: true,
  // height: 410,
  breakpoints: {
    768: {
      // slidesPerView: 'auto',
      direction: 'vertical',
    },
  },
});

const productImageSlider = new Swiper('.product-page .product__slider', {
  modules: [Thumbs, Lazy],
  slidesPerView: 1,
  spaceBetween: 50,
  preloadImages: false,
  lazy: true,
  // autoHeight: true,
  // navigation: {
  //   nextEl: '.swiper-button-next',
  //   prevEl: '.swiper-button-prev',
  // },
  thumbs: {
    swiper: productThumbSlider,
  },
});
//========================================================================================================================================================
const relatedProductsSlider = new Swiper(
  '.related-products__slider--related .related-products__slider-inner',
  {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    // slidesPerGroupAuto: true,
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
  }
);

const similarProductsSlider = new Swiper(
  '.related-products__slider--similar .related-products__slider-inner',
  {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    // slidesPerGroupAuto: true,
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
  }
);
