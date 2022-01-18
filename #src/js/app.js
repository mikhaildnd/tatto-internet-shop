// import { webpSupportTest } from './modules/webp-support-test.js';
// import { HeaderScroll } from './modules/header-scroll.js';
// import { scrollWidthCalc } from './modules/calc-scroll-width.js';
// import { test } from './modules/test.js';
// import { Scroll } from './modules/scroll.js';
// import { PaginationMove } from './modules/pagination-move.js';
// import { Accordeon } from './modules/toggle-accordeon.js';
// import { toggleClass } from './modules/helpers.js';

// import Swiper, { Pagination, Navigation, Mousewheel, Parallax } from 'swiper';
import Swiper, { Navigation, Pagination, Thumbs, Grid, EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
// import 'swiper/css/navigation';
// import 'swiper/css/bundle';

// webpSupportTest();

//==Инициализация слайдеров пачкой
function initSwiperSliders(selector, options = {}) {
  const sliders = document.querySelectorAll(selector);
  const {
    modules = null,
    slidesPerView = 1,
    slidesPerGroup = 1,
    pagination = false,
    autoplay = false,
    breakpoints = false,
    spaceBetween = 0,
    grid = null,
    loop = false,
    centeredSlides = false,
  } = options;

  sliders.forEach((el) => {
    if (el.classList.contains('swiper')) {
      const newSlider = new Swiper(el, {
        modules: modules,
        slidesPerView: slidesPerView,
        slidesPerGroup: slidesPerGroup,
        pagination: pagination,
        autoplay: autoplay,
        breakpoints: breakpoints,
        spaceBetween: spaceBetween,
        grid: grid,
        loop: loop,
        centeredSlides: centeredSlides,
      });
      // newSlider.on('slideChange', () => {
      //   console.log('hey bro');
      // });
    }
  });
}

// initSwiperSliders('.products__list', {
//   modules: [Grid],
//   slidesPerView: 4,
//   slidesPerGroup: 4,
//   spaceBetween: 20,
//   grid: {
//     rows: 2,
//     fill: 'row',
//   },
//   // loop: true,
//   // centeredSlides: true,
//   // breakpoints: {
//   //   480: {
//   //     slidesPerView: 1.5,
//   //   },
//   // },
// });

// //*Слайдер внутри карточки товара
// initSwiperSliders('.gallery-card__slider', {
//   modules: [Pagination],
//   slidesPerView: 1,
//   pagination: {
//     el: '.gallery-card__pagination',
//     clickable: true,
//   },
//   // autoplay: {
//   //   delay: 3000,
//   // },
// });
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

const productsListSlider = new Swiper('.product-offers__products', {
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
    // progressMultipler: 2,
    perspective: false,
    prev: {
      translate: ['-100%', 0, 0],

      // translate: (string | number)[];
      // Array with rotate X, Y and Z values (in deg)
      // rotate?: number[];
      opacity: 0.7,
      scale: 0.85,
      // shadow: true,
      // Transform origin, e.g. `left bottom`
      // origin?: string;
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
  // autoHeight: true,
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
  // autoplay: {
  //   delay: 2500,
  // },
  // direction: 'vertical',
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
    // el: '.swiper-pagination',
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
const catalog = document.querySelector('.catalog');
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
