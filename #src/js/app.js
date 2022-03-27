import { menuControl } from './modules/menu-control.js';
import { debounce } from './modules/debounce.js';
import { TabManager } from './modules/tabs-manager.js';

const headerCatalogTabs = new TabManager('menu-tab', {
  tabListSelector: '.catalog-dropdown__tabs',
  tabBtnSelector: '.catalog-dropdown__button',
  tabPanelSelector: '.catalog-dropdown__item',

  tabActiveClass: 'active',
  panelActiveClass: 'show',
});
//========================================================================================================================================================
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
//========================================================================================================================================================
/* Тоглит класс для открытия и закрытия дропдаун-меню (в хедере)*/
menuControl({
  toggleClass: 'open',
  fixedClass: 'header--js-fixed',
  mobileMenuId: 'menu',
  desktopMenuId: 'catalog',
  mobileMenuSelector: '.header__dropdown-menu',
  desktopMenuSelector: '.catalog-dropdown',
  fixedElemSelector: '.header',
  displayWidth: 1024,

  headerSearchTriggerSelector: '.header__search-trigger',
  headerSearchControlSelector: '.search__control',
  headerSearchSelector: '.header__search',

  //передаю дбнс-функцию
  debounceFunc: debounce,
});
