export function menuControl({
  //Класс для меню (бургер и каталог)
  toggleClass = 'open',
  //Класс для фиксируемого элемента(хедера)
  fixedClass = 'fixed',
  mobileMenuId = null,
  desktopMenuId = null,
  mobileMenuSelector = null,
  desktopMenuSelector = null,
  fixedElemSelector = null,

  //Нужная ширина экрана чтобы убирать/добавлять фиксируемый класс для хедера
  //str or num
  displayWidth = null,
  //Опция ширины --> 'max-width' или 'min-width'
  widthOption = 'min-width',
  headerSearchTriggerSelector = null,
  headerSearchControlSelector = null,
  headerSearchSelector = null,

  debounceFunc = null,
}) {
  const mobileBtn = document.getElementById(mobileMenuId);
  const desktopBtn = document.getElementById(desktopMenuId);

  const mobileMenu = document.querySelector(mobileMenuSelector);
  const desktopMenu = document.querySelector(desktopMenuSelector);

  const fixedElem = document.querySelector(fixedElemSelector);

  /* Оборачиваем функцию removeFixedClass в Debounce-функцию*/
  let debounceRemoveFixedClass = debounceFunc(removeFixedClass, 250, false);

  function removeFixedClass() {
    /* Если разрешение больше заданного(нужного нам) и элемент(хедер) содержит класс 'fixed', то удаляем класс 'fixed'*/
    if (this.mq && fixedElem.classList.contains(fixedClass)) {
      fixedElem.classList.remove(fixedClass);
      /* Если разрешение меньше заданного и мобильное меню открыто, то добавляем класс 'fixed'*/
    } else if (!this.mq && mobileMenu.classList.contains(toggleClass)) {
      if (!fixedElem.classList.contains(fixedClass)) {
        fixedElem.classList.add(fixedClass);
      }
    }
  }

  /* Смотрим за разрешением, на нужном брейкпоинте удаляем заданный класс у элемента.
  В данном случае класс fixed у хедера */
  /*Resize handler */
  let fixedElementState = {
    /* callback */
    // handleEvent: removeFixedClass,
    handleEvent: debounceRemoveFixedClass,
    /* передаем нужный breakpoint */
    displayWidth: displayWidth,
    widthOption: widthOption,
    /* Функция для проверки совпадения заданного breakpoint'а */
    getMedia: getMediaQuery,

    /* Геттер для сокращения записи при проверке условий */
    get mq() {
      return this.getMedia(this.displayWidth, this.widthOption);
    },
  };

  /* Смотрим за состоянием элемента(зафиксированного в данном случае) и выполняем действия наж ним */
  window.addEventListener('resize', fixedElementState);

  let buttons = [mobileBtn, desktopBtn];

  let [mobile, desktop] = buttons;

  //todo разобраться с переменной, не напутал ли я с условиями
  let needFix = false;

  buttons.forEach((button) => {
    if (!button) return;
    button.addEventListener('click', () => {
      if (button === mobile) {
        mobileMenuToggle();
      } else if (button === desktop) {
        desktopMenuToggle();
      }
    });
  });

  function mobileMenuToggle() {
    mobileBtn.classList.toggle(toggleClass);

    if (!mobileMenu.classList.contains(toggleClass)) {
      needFix = true;
    }

    mobileMenu.classList.toggle(toggleClass);
    if (needFix) {
      fixedElem.classList.add(fixedClass);
      needFix = false;
    } else {
      fixedElem.classList.remove(fixedClass);
    }
  }

  function desktopMenuToggle() {
    desktopBtn.classList.toggle(toggleClass);

    if (!needFix) {
      fixedElem.classList.remove(fixedClass);
    }
    desktopMenu.classList.toggle(toggleClass);
  }

  /* Bool. Узнаем media-query */
  function getMediaQuery(dWidth, widthOption) {
    const width = Number(dWidth);

    if (!width) {
      throw new TypeError(
        'displayWidth must be a Number or String type and must contain numerical content'
      );
    }

    if (widthOption !== 'max-width' && widthOption !== 'min-width') {
      throw new SyntaxError('Width option: use "min-width" or "max-width" only');
    }
    const mediaQuery = window.matchMedia(`(${widthOption}: ${dWidth + 'px'})`);
    return mediaQuery.matches;
  }

  let searchElemsSelectors = [
    headerSearchTriggerSelector,
    headerSearchControlSelector,
    headerSearchSelector,
  ];

  let searchVars = [];

  searchElemsSelectors.forEach((selector) => {
    let variable = document.querySelector(selector);

    searchVars.push(variable);
  });

  const [headerSearchTrigger, headerControl, headerSearch] = searchVars;

  function showSearchPanel() {
    let contains = this.el.classList.contains('header__search--show');

    if (!contains) {
      showSearch(this.el);

      this.trigger.removeEventListener('click', this);

      this.el.addEventListener('click', searchPanelClickHandler);
    }
  }
  function showSearch(el) {
    el.classList.add('header__search--show');
  }

  function hideSearchPanel(e) {
    if (e.target.contains(this.control)) {
      hideSearch(this.el);

      this.el.removeEventListener('click', this);

      this.trigger.addEventListener('click', searchTriggerClickHandler);
    }
  }
  function hideSearch(el) {
    el.classList.remove('header__search--show');
  }

  let searchTriggerClickHandler = {
    el: headerSearch,
    trigger: headerSearchTrigger,
    control: headerControl,
    handleEvent: showSearchPanel,
  };

  let searchPanelClickHandler = {
    el: headerSearch,
    trigger: headerSearchTrigger,
    control: headerControl,
    handleEvent: hideSearchPanel,
  };

  /* Смотрим за состоянием элемента(зафиксированного в данном случае) и выполняем действия наж ним */
  headerSearchTrigger.addEventListener('click', searchTriggerClickHandler);
  // { once: true }
}

/* Тоглит класс для открытия и закрытия дропдаун-меню (в хедере)*/
// toggleClass: 'open',
// mobileMenuId: 'menu',
// desktopMenuId: 'catalog',
// mobileMenuSelector: '.header__dropdown-menu',
// desktopMenuSelector: '.catalog-dropdown',
