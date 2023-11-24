'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function cssColors() {
  return ['#906', '#66F', '#800', '#C60', '#EAEA00', '#006', '#360'];
}
function cliColors() {
  return ["cyan", "magenta", "blue", "yellow", "green", "red"];
}
function loopColors(colors, options) {
  var _options, _options$generator;
  (_options = options) !== null && _options !== void 0 ? _options : options = {};
  colors = colors.slice();
  let idx = 0;
  const len = colors.length;
  // @ts-ignore
  let getIndex = (index, length) => idx++ % len;
  if (options.rand) {
    const rand = options.rand === true ? Math.random : options.rand;
    const _ = getIndex;
    getIndex = (index, length) => {
      idx = Math.floor(length * rand(index, length));
      return _(idx, length);
    };
  }
  let limit = options.limit | 0;
  limit = limit > 0 ? limit : Infinity;
  // @ts-ignore
  const generator = (_options$generator = options.generator) !== null && _options$generator !== void 0 ? _options$generator : (colors, position) => colors[position];
  return function* (startIndex) {
    if (typeof startIndex !== 'undefined') {
      startIndex |= 0;
      idx = startIndex >= 0 ? startIndex : idx;
    } else {
      idx = 0;
    }
    do {
      yield generator(colors, getIndex(idx, len), idx, len);
    } while (--limit > 0);
    return;
  };
}

exports.cliColors = cliColors;
exports.cssColors = cssColors;
exports.default = loopColors;
exports.loopColors = loopColors;
//# sourceMappingURL=index.cjs.development.cjs.map
