/* Bool. Узнаем media-query */
export function getMediaQuery(dWidth, widthOption) {
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
