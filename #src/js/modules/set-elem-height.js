export class setHeight {
  constructor(options = {}) {
    const {
      containerSelector = false,
      containerElement = false,
      mediaQuery = {},
      debounce = {},
    } = options;

    //Опционально: либо селектор, либо элемент
    //Селектор контейнера
    this.containerSelector = containerSelector;
    // console.log(this.containerSelector);

    //Элемент контейнера
    this.containerElement = containerElement;
    // console.log(this.containerElement);

    /* Параметры медиа запроса */
    //ФУнкция для медиа-запроса
    this.getMediaFunc = mediaQuery.getMediaFunc;
    //Ширина экрана
    this.displayWidth = mediaQuery.displayWidth;
    //min-height или max-height
    this.displayOption = mediaQuery.displayOption;

    //Вкл. или выкл. дебаунс (бул)
    this.debounceEnable = debounce.enable;
    //Дебаунс-функция
    this.debounceFunc = debounce.debounceFunc;

    this.init();
  }

  init() {
    // if (!this.mediaQueryMatches) return;

    if (!this.containerSelector && !this.containerElement) return;

    //Производим все действия после формирования документа
    //domloaded нужно вынести или продумать, с ним проблемы
    // document.addEventListener('DOMContentLoaded', () => {
    // console.log(this.containerElement);
    //Инициализирую контейнер
    if (this.containerSelector) {
      this.container = document.querySelector(this.containerSelector);
    } else if (this.containerElement) {
      this.container = this.containerElement;
    }

    if (!this.container) return;

    //Включаем слежение за изменениями в ДОМ, чтобы последний элемент был актуальным при добавлении новых
    this.addMutationObserver(this.container);

    if (this.mediaQueryMatches) {
      //Выставляем высоту последнему элементу
      this.setHeightLastElem(this.container);
    }

    let debouncedSetHeightLastElem = this.debounceFunc(
      //привязываем this и прокидываем параметр(контейнер)
      this.setHeightLastElem.bind(this, this.container),
      250,
      false
    );

    window.addEventListener('resize', () => {
      if (!this.mediaQueryMatches) {
        this.clearHeight(this.container);
      } else {
        //Выставляем высоту последнему элементу
        // this.setHeightLastElem(this.container);

        //Если дебаунс выключен, то работаем без него
        if (!this.debounceEnable) {
          this.setHeightLastElem(this.container);
          //Если дебаунс функция не передана или некорректна, то выкатываем ошибку
        } else if (!this.debounceFunc) {
          throw new TypeError(`debounce function incorrect or not passed,
            debounceFunc: ${this.debounceFunc}`);
          //если дебаунс передан и корректен работаем с ним
        } else {
          //можно без анонимной вызвать(вынес, чтобы вынести слушатель, тк он в любом случае навешиваться будет)
          debouncedSetHeightLastElem();
        }
      }
    });
  }

  get mediaQueryMatches() {
    //return bool
    return this.getMediaFunc(this.displayWidth, this.displayOption);
  }

  //Выставляем высоту последнему элементу(карточке товара)
  setHeightLastElem(container) {
    if (!container) return;

    let lastChild = container.lastElementChild;

    //При каждом вызове фун-и сбрасываем уже выставленную высоту
    lastChild.style.height = '';

    let calculatedHeight = lastChild.offsetHeight;

    lastChild.style.height = calculatedHeight + 'px';
  }

  clearHeight(container) {
    for (let child of container.children) {
      child.style.height = '';
    }
  }

  /* Следит за изменением DOM (за добавлением нод) */
  addMutationObserver(container) {
    let observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        /* Смотрим за добавлением узлов в контейнер */
        for (let node of mutation.addedNodes) {
          // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
          if (!(node instanceof HTMLElement)) continue;
          // /* Добавляем высоту последнему добавленному элементу */
          this.clearHeight(container);

          this.setHeightLastElem(container);
        }
      }
    });
    observer.observe(container, {
      childList: true, // наблюдать за непосредственными детьми
    });
  }
}

/* Как работает: */
// const setLastElemHeight = new setHeight({
//?селектор контейнера
//   containerSelector: '.catalog__products-container',
//   mediaQuery: {
//     getMediaFunc: getMediaQuery,
//     displayWidth: '1024',
//     displayOption: 'min-width',
//   },
//   debounce: {
//     enable: true,
//     debounceFunc: debounce,
//   },
// });
