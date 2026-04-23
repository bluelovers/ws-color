'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * CSS 預設顏色列表
 * Default CSS color palette
 *
 * 包含 7 種基本顏色的十六進位色碼。
 * Contains 7 basic color hex codes.
 *
 * @returns 只讀顏色陣列 / Readonly color array
 */
function cssColors() {
  return ['#906', '#66F', '#800', '#C60', '#EAEA00', '#006', '#360'];
}
/**
 * CLI 終端機顏色列表
 * CLI terminal color list
 *
 * @returns 終端機顏色名稱陣列 / Array of terminal color names
 */
function cliColors() {
  return ["cyan", "magenta", "blue", "yellow", "green", "red"];
}
/**
 * 建立循環顏色生成器
 * Create loop colors generator
 *
 * 創建一個可迭代的顏色生成器，支援：
 * - 順序或隨機循環遍歷顏色
 * - 自定義生成器處理邏輯
 * - 可設定生成上限次數
 *
 * Creates an iterable color generator supporting:
 * - Sequential or random circular traversal
 * - Custom generator processing logic
 * - Configurable generation limit
 *
 * @typeParam T - 輸入顏色類型 / Input color type
 * @typeParam R - 輸出類型 / Output type
 * @param colors - 顏色陣列 / Color array
 * @param options - 選項配置 / Options configuration
 * @returns  Generator 函式，回傳可迭代物件 / Generator function returning iterable
 *
 * @example
 * ```typescript
 * // 基本順序循環 / Basic sequential loop
 * const gen = loopColors(['#FF0000', '#00FF00', '#0000FF']);
 * console.log(gen().next().value); // '#FF0000'
 *
 * // 隨機循環 / Random loop
 * const randGen = loopColors(['#FF0000', '#00FF00'], { rand: true });
 *
 * // 自定義生成器 / Custom generator
 * const upperGen = loopColors(['red', 'blue'], {
 *   generator: (colors, pos) => colors[pos].toUpperCase()
 * });
 * ```
 */
function loopColors(colors, options) {
  var _options$generator;
  options !== null && options !== void 0 ? options : options = {};
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
