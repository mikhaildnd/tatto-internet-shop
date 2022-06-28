import { setHeight } from './modules/set-elem-height.js';
import { TabManager } from './modules/tabs-manager.js';

import Swiper, { Navigation, Pagination, Grid, EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/lazy';

import { debounce } from './modules/debounce.js';
import { getMediaQuery } from './modules/get-media-query.js';

/* Hero-slider */
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

/* Categories slider */
const categoriesListSlider = new Swiper('.product-offers__nav', {
  slidesPerView: 'auto',
});

/* Feedback slider */
const feedbackSlider = new Swiper('.feedback__slider', {
  modules: [EffectCreative, Navigation, Pagination],
  effect: 'creative',
  autoHeight: true,
  creativeEffect: {
    limitProgress: 2,
    shadowPerProgress: true,
    perspective: true,
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
  loop: true,
  loopAdditionalSlides: 1,
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

/* Brands slider */
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

/* Main tabs */
const mainTabs = new TabManager('offers-tab', {
  tabListSelector: '.product-offers__nav',
  tabBtnSelector: '.product-offers__nav-button',
  tabPanelSelector: '.product-offers__catalog-category',

  tabActiveClass: 'active',
  panelActiveClass: 'show',

  isChanged: (tabs) => {
    tabs.tabsPanels.forEach((panel) => {
      if (panel.classList.contains(tabs.panelActiveClass)) {
        let setLastElHeight = new setHeight({
          containerElement: panel.firstElementChild,
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
      }
    });
  },
});

/* Set hight last catalog element for correct work */
const setLastElemHeightCatalog = new setHeight({
  containerSelector: '.product-offers__catalog-list',
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
