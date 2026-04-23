'use strict';

var toFixedNumber = require('@lazy-num/to-fixed-number');

function _handleOptions(opts) {
  var _opts$randFn;
  return {
    randFn: (_opts$randFn = opts === null || opts === void 0 ? void 0 : opts.randFn) !== null && _opts$randFn !== void 0 ? _opts$randFn : Math.random
  };
}
function _randAlpha(opts) {
  return toFixedNumber.toFixedNumber(_handleOptions(opts).randFn(), 3);
}
function _randValue(base, opts) {
  return _handleOptions(opts).randFn() * base;
}
/**
 * 隨機生成 RGB 顏色陣列
 * Randomly generate RGB color array
 *
 * 產生隨機的 RGB 陣列（[r, g, b]），每個值在 0-255 之間。
 * Generates a random RGB array ([r, g, b]) with values between 0-255.
 *
 * @typeParam T - 輸出陣列類型 / Output array type
 * @param _rgba - 可選的初始陣列 / Optional initial array
 * @param opts - 選項配置 / Options configuration
 * @returns 隨機 RGB 陣列 / Random RGB array
 *
 * @example
 * ```typescript
 * // 基本使用 / Basic usage
 * const rgb = _rgbRand();
 * console.log(rgb); // e.g., [123, 45, 67]
 *
 * // 指定初始值 / With initial values
 * const rgb2 = _rgbRand([255, 200], { randFn: () => 0.5 });
 * ```
 */
function _rgbRand(_rgba, opts) {
  var _rgba2;
  // @ts-ignore
  _rgba = ((_rgba2 = _rgba) === null || _rgba2 === void 0 ? void 0 : _rgba2.slice()) || [];
  for (let i = 0; i < 3; i++) {
    var _rgba$i;
    // @ts-ignore
    _rgba[i] = Math.round(_randValue((_rgba$i = _rgba[i]) !== null && _rgba$i !== void 0 ? _rgba$i : 255, opts));
  }
  return _rgba;
}
/**
 * 隨機生成 RGB 物件
 * Randomly generate RGB object
 *
 * 產生隨機的 RGB 物件（{ r, g, b }），每個值在 0-255 之間。
 * Generates a random RGB object ({ r, g, b }) with values between 0-255.
 *
 * @typeParam T - 輸出物件類型 / Output object type
 * @param _rgba - 可選的初始物件 / Optional initial object
 * @param opts - 選項配置 / Options configuration
 * @returns 隨機 RGB 物件 / Random RGB object
 *
 * @example
 * ```typescript
 * // 基本使用 / Basic usage
 * const rgb = _rgbObjectRand();
 * console.log(rgb); // e.g., { r: 123, g: 45, b: 67 }
 *
 * // 指定初始值 / With initial values
 * const rgb2 = _rgbObjectRand({ r: 255 }, { randFn: () => 0.5 });
 * ```
 */
function _rgbObjectRand(_rgba, opts) {
  let {
    r,
    g,
    b,
    a
  } = _rgba !== null && _rgba !== void 0 ? _rgba : {};
  r = Math.round(_randValue(r !== null && r !== void 0 ? r : 255, opts));
  g = Math.round(_randValue(g !== null && g !== void 0 ? g : 255, opts));
  b = Math.round(_randValue(b !== null && b !== void 0 ? b : 255, opts));
  return {
    r,
    g,
    b,
    a
  };
}
/**
 * RGB 物件轉陣列
 * Convert RGB object to array
 *
 * 將 RGB 物件轉換為 RGB 陣列格式。
 * Converts RGB object to array format.
 *
 * @typeParam T - 輸入物件類型 / Input object type
 * @param _rgba - RGB 物件 / RGB object
 * @returns RGB 陣列 / RGB array
 *
 * @example
 * ```typescript
 * // 物件轉陣列 / Object to array
 * const arr = _rgbObjectToArray({ r: 255, g: 128, b: 0 });
 * console.log(arr); // [255, 128, 0]
 * ```
 */
function _rgbObjectToArray(_rgba) {
  const {
    r,
    g,
    b,
    a
  } = _rgba;
  return [r, g, b, a];
}
// @ts-ignore
{
  Object.defineProperty(_rgbRand, "__esModule", {
    value: true
  });
  Object.defineProperty(_rgbRand, '_rgbRand', {
    value: _rgbRand
  });
  Object.defineProperty(_rgbRand, 'default', {
    value: _rgbRand
  });
  Object.defineProperty(_rgbRand, '_randAlpha', {
    value: _randAlpha
  });
  Object.defineProperty(_rgbRand, '_randValue', {
    value: _randValue
  });
  Object.defineProperty(_rgbRand, '_rgbObjectRand', {
    value: _rgbObjectRand
  });
  Object.defineProperty(_rgbRand, '_rgbObjectToArray', {
    value: _rgbObjectToArray
  });
  Object.defineProperty(_rgbRand, '_handleOptions', {
    value: _handleOptions
  });
}

// @ts-ignore
module.exports = _rgbRand;
//# sourceMappingURL=index.cjs.development.cjs.map
