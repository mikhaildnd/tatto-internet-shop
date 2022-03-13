export class setHeight {
  constructor(options = {}) {
    const { containerSelector = null, mediaQuery = {}, debounce = {} } = options;

    //Селектор контейнера
    this.containerSelector = containerSelector;

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

    if (!this.containerSelector) return;

    //Производим все действия после формирования документа
    document.addEventListener('DOMContentLoaded', () => {
      //Инициализирую контейнер
      this.container = document.querySelector(this.containerSelector);

      if (!this.container) return;

      //Сразу выставляем высоту последнему элементу
      this.setHeightLastElem(this.container);

      //Включаем слежения за изменениями в ДОМ, чтобы последний элемент был актуальным при добавлении новых
      this.trackAdditionElems(this.container);

      //Если дебаунс выключен, то работаем без него
      if (!this.debounceEnable) {
        window.addEventListener('resize', () => {
          this.setHeightLastElem(this.container);
        });
        //Если дебаунс функция не передана или некорректна, то выкатываем ошибку
      } else if (!this.debounceFunc) {
        throw new TypeError(`debounce function incorrect or not passed,
        debounceFunc: ${this.debounceFunc}`);
        //если дебаунс передан и корректен работаем с ним
      } else {
        let debouncedSetHeightLastElem = this.debounceFunc(
          //привязываем this и прокидываем параметр(контейнер)
          this.setHeightLastElem.bind(this, this.container),
          250,
          false
        );

        window.addEventListener('resize', () => {
          //можно без анонимной вызвать(вынес, чтобы вынести слушатель, тк он в любом случае навешиваться будет)
          debouncedSetHeightLastElem();
        });
      }
    });

    // let mq = this.getMediaFunc(this.displayWidth, this.displayOption);
    // alert(mq);
  }

  get mediaQueryMatches() {
    return this.getMediaFunc(this.displayWidth, this.displayOption);
  }

  //Выставляем высоту последнему элементу(карточке товара)
  setHeightLastElem(container) {
    if (!container) return;

    let lastChild = container.lastElementChild;

    //При каждом вызове фун-и сбрасываем уже выставленную высоту
    lastChild.style.height = '';

    let calculatedHeight = this.getElemHeight(lastChild);

    lastChild.style.height = calculatedHeight + 'px';
  }

  //Вычисляем высоту елемента
  getElemHeight(el) {
    return el.offsetHeight;
  }

  /* Следит за изменением DOM (за добавлением нод) */
  trackAdditionElems(container) {
    let observer = new MutationObserver((mutations) => {
      for (let mutation of mutations) {
        /* Смотрим за добавлением узлов в контейнер */
        for (let node of mutation.addedNodes) {
          // отслеживаем только узлы-элементы, другие (текстовые) пропускаем
          if (!(node instanceof HTMLElement)) continue;
          // /* Добавляем высоту последнему добавленному элементу */
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
