import { Accordeon } from './modules/toggle-accordeon.js';
import { setHeight } from './modules/set-elem-height.js';
import { getMediaQuery } from './modules/get-media-query.js';
import { debounce } from './modules/debounce.js';

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

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
      to: function (value) {
        return parseInt(value);
      },
      from: function (value) {
        return Number(parseInt(value));
      },
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

const acсordeon = new Accordeon({
  blockSelector: '.catalog__filter',
  triggerSelector: '.group-filter__top',
  toggleClass: 'hidden',
  addClassOnInit: false,
  toggleStyle: 'maxHeight',
});

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

const setLastElemHeight = new setHeight({
  containerSelector: '.catalog__products-container',
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
