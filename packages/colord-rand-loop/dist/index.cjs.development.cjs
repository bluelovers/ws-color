'use strict';

var loopColors = require('loop-colors');
var colord = require('colord');
var randUtil = require('@lazy-color/rand-util');

function createDefaultGenerator({
  cache
}) {
  var _cache;
  (_cache = cache) !== null && _cache !== void 0 ? _cache : cache = new Set();
  return (colors, position) => {
    let cc = colord.colord(colors[position]);
    if (!cc.isValid()) {
      cc = colord.random();
    }
    const _rgba = cc.toRgb();
    let e = 0;
    let result = cc;
    while (cache.has(result.toRgbString())) {
      if (e > 5) {
        cache.clear();
        e = 0;
      }
      result = colord.colord(randUtil._rgbObjectRand(_rgba));
      e++;
    }
    cache.add(result.toRgbString());
    return result;
  };
}
function createColordRandLoop(options) {
  var _colors, _cache2, _opts$generator;
  let {
    colors,
    cache,
    ...opts
  } = {
    ...options
  };
  (_colors = colors) !== null && _colors !== void 0 ? _colors : colors = loopColors.cssColors();
  (_cache2 = cache) !== null && _cache2 !== void 0 ? _cache2 : cache = new Set();
  (_opts$generator = opts.generator) !== null && _opts$generator !== void 0 ? _opts$generator : opts.generator = createDefaultGenerator({
    cache
  });
  return loopColors.loopColors(colors, opts);
}
function colordRandLoop(startIndex, options) {
  return createColordRandLoop(options)(startIndex);
}
{
  Object.defineProperty(colordRandLoop, "__esModule", {
    value: true
  });
  Object.defineProperty(colordRandLoop, 'colordRandLoop', {
    value: colordRandLoop
  });
  Object.defineProperty(colordRandLoop, 'default', {
    value: colordRandLoop
  });
  Object.defineProperty(colordRandLoop, 'createDefaultGenerator', {
    value: createDefaultGenerator
  });
  Object.defineProperty(colordRandLoop, 'createColordRandLoop', {
    value: createColordRandLoop
  });
}

// @ts-ignore
module.exports = colordRandLoop;
//# sourceMappingURL=index.cjs.development.cjs.map
