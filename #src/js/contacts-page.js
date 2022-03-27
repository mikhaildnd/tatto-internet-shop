function initMap() {
  let map = new ymaps.Map('map', {
    center: [59.86553945158819, 30.316873526088017],
    zoom: 16,
  });

  map.behaviors.disable('scrollZoom'); // — это отключает зум колёсиком мышки, всё ок.
  // map.behaviors.disable('multiTouch'); // — это отключает зум щипком, не очень нужно.
  map.behaviors.disable('drag'); // — это отключает прокрутку карты, но есть одно "но": сама страница также не прокручивается.
}

ymaps.ready(initMap);
