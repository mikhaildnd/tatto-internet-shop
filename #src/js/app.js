// import { webpSupportTest } from './modules/webp-support-test.js';
// import { HeaderScroll } from './modules/header-scroll.js';
// import { scrollWidthCalc } from './modules/calc-scroll-width.js';
// import { test } from './modules/test.js';
// import { Scroll } from './modules/scroll.js';
// import { PaginationMove } from './modules/pagination-move.js';
// import { Accordeon } from './modules/toggle-accordeon.js';
// import { toggleClass } from './modules/helpers.js';

// import Swiper, { Pagination, Navigation, Mousewheel, Parallax } from 'swiper';
// import 'swiper/css';
// !import 'swiper/css/pagination';

// webpSupportTest();

// const catalogBtnMobile = document.querySelector('.header-nav__item--arrow button');
// const catalogListMobile = document.querySelector('.header-nav__sub-list');

// catalogBtnMobile.addEventListener('click', () => {
//   if (!catalogListMobile.classList.contains('open')) {
//     catalogBtnMobile.style.marginBottom = '30px';
//     catalogListMobile.classList.add('open');
//     catalogListMobile.style.height = catalogListMobile.scrollHeight + 'px';
//   } else {
//     catalogListMobile.classList.remove('open');
//     catalogBtnMobile.style.marginBottom = '0';
//     catalogListMobile.style.height = '0';
//   }
// });

// catalogListMobile.addEventListener('focusin', () => {
//   if (!catalogListMobile.classList.contains('open')) {
//     catalogListMobile.classList.add('open');
//     catalogBtnMobile.style.marginBottom = '30px';
//     catalogListMobile.style.height = catalogListMobile.scrollHeight + 'px';
//   }
// });

const catalog = document.querySelector('.catalog');

const ddButton = document.querySelector('.header__dropdown-button');
const ddMenu = document.querySelector('.header__dropdown-menu');

ddButton.addEventListener('click', () => {
  ddButton.classList.toggle('open');
  ddMenu.classList.toggle('open');

  // let displayStyle = getDisplayStyle(ddMenu);

  // if ((ddMenu.style.display || displayStyle) != 'none') {
  //   ddMenu.classList.toggle('open');
  // } else {
  //   ddMenu.classList.remove('open');
  // }
});

function getDisplayStyle(elem) {
  let styles = getComputedStyle(elem).display;

  return styles;
}
