export class Accordeon {
  constructor(options = {}) {
    const {
      blockSelector = null,
      triggerSelector = null,
      toggleClass = null,
      addClassOnInit = false,
      toggleStyle = 'displayChange',
    } = options;

    this.blockSelector = blockSelector;
    this.triggerSelector = triggerSelector;
    this.toggleClass = toggleClass;
    this.addClassOnInit = addClassOnInit;
    this.toggleStyle = toggleStyle;

    this.init();
  }
  init() {
    this.accordeon = document.querySelector(this.blockSelector);
    if (!this.accordeon) return;
    this.accordeon.addEventListener('click', (e) => this.toggle(e, this.toggleStyle));

    if (this.addClassOnInit) {
      this.addClass(this.toggleClass);
    }
  }

  //Добавляет указанный класс каждому блоку (елементу, который откр./закр.)
  addClass(className) {
    let triggers = document.querySelectorAll(this.triggerSelector);

    if (!triggers) {
      //нужно прокинуть ошибку
      console.log('triggers: error');
      return;
    }
    triggers.forEach((trigger) => {
      trigger.classList.add(className);
    });
  }

  setInlineHeight(elem) {
    let el = elem;

    if (!el) {
      //нужно прокинуть ошибку
      console.log('setInlineHeight: error');
      return;
    }

    el.style.height = el.scrollHeight + 'px';

    //*Либо проставляет высоту всем сразу
    // const elements = document.querySelectorAll(`.${el.className}`);

    // elements.forEach((element) => {
    //   element.style.height = element.scrollHeight + 'px';
    // });
  }

  getStyles(el, prop) {
    // if (!el || !prop) return;
    return getComputedStyle(el).getPropertyValue(prop);
  }

  toggleDisplay(el) {
    if (el.style.display === 'none') {
      el.style.display === 'block';
    } else if (el.style.display !== 'none') {
      el.style.display === 'block';
    }
  }
  toggleHeight(el) {
    if (!el) return;
    //при первом скрытии, если нет инлайновой высоты (хайт === ''), то блок не анимируется транзишеном
    //поэтому сперва выставляю высоту, а потом уже все норм, естессно при самых простых случаях
    //в сложных нужна другая проверка, по типа флага мб.
    let cssHeight = this.getStyles(el, 'height');

    if (el.style.height === '' && cssHeight !== '0px') {
      this.setInlineHeight(el);
      setTimeout(() => {
        el.style.height = '0px';
      }, 100);
    } else if (el.style.height === '0px' || cssHeight === '0px') {
      el.style.height = el.scrollHeight + 'px';
    } else if (el.style.height !== '0px') {
      el.style.height = '0px';
    }
  }

  toggle(e, toggleStyle) {
    let openingPart = e.target.closest(this.triggerSelector);

    if (!openingPart) return;

    if (!this.accordeon.contains(openingPart)) return;

    openingPart.classList.toggle(this.toggleClass);

    let panel = openingPart.nextElementSibling;

    if (toggleStyle === 'displayChange') {
      this.toggleDisplay(panel);
    } else if (toggleStyle === 'maxHeight') {
      this.toggleHeight(panel);
    }
  }
}

// const acoordeon = new Accordeon({
//   blockSelector: '.accordeon(Селектор аккордеона)',
//   triggerSelector: '.item-accordeon__top(Верхний(который будет открываться)) блок аккордеона',
//   toggleClass: 'hidden', --> Класс, который будет переключаться
//   addClassOnInit: true, --> Добавляет 'toggleClass' при инициализации (по ум. 'false')
// })

//Можно не выставлять высоту открываемой (нижней) части
