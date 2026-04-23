'use strict';

var loopColors = require('loop-colors');
var colord = require('colord');
var randUtil = require('@lazy-color/rand-util');

/**
 * Colord 隨機循環顏色生成器
 * Colord Random Loop Color Generator
 *
 * 基於 loop-colors 模組，结合 Colord 庫與隨機顏色工具，
 * 提供具有去重功能的隨機顏色循環生成器。
 *
 * Based on loop-colors module, combined with Colord library and random color utilities,
 * provides a random color loop generator with deduplication functionality.
 *
 * @module colord-rand-loop
 */
/**
 * 建立預設生成器
 * Create default generator
 *
 * 創建一個具有去重機制的 Colord 顏色生成器：
 * - 驗證輸入顏色的有效性
 * - 維持已生成顏色的快取集合
 * - 自動迴避重複顏色（最多重試 5 次後清除快取）
 *
 * Creates a Colord color generator with deduplication mechanism:
 * - Validates input color validity
 * - Maintains cache set of generated colors
 * - Automatically avoids duplicate colors (clears cache after max 5 retries)
 *
 * @param options - 生成器選項 / Generator options
 * @param options.cache - 顏色快取集合 / Color cache set
 * @param options.randFn - 自定義隨機函式 / Custom random function
 * @param options... - 傳遞至隨機顏色工具的其他選項 / Other options passed to random color utility
 * @returns 顏色生成器函式 / Color generator function
 */
function createDefaultGenerator({
  cache,
  ...opts
}) {
  cache !== null && cache !== void 0 ? cache : cache = new Set();
  return (colors, position) => {
    let cc = colord.colord(colors[position]);
    if (!cc.isValid()) {
      cc = typeof opts.randFn === 'function' ? colord.colord(randUtil._rgbObjectRand(null, opts)) : colord.random();
    }
    const _rgba = cc.toRgb();
    let e = 0;
    let result = cc;
    while (cache.has(result.toRgbString())) {
      if (e > 5) {
        cache.clear();
        e = 0;
      }
      result = colord.colord(randUtil._rgbObjectRand(_rgba, opts));
      e++;
    }
    cache.add(result.toRgbString());
    return result;
  };
}
/**
 * 建立 Colord 隨機循環
 * Create Colord random loop
 *
 * 創建一個配置完成的 Colord 顏色循環生成器工廠。
 * Creates a configured Colord color loop generator factory.
 *
 * @param options - 循環選項 / Loop options
 * @returns 配置完成的 Generator 函式 / Configured Generator function
 */
function createColordRandLoop(options) {
  var _opts$generator;
  let {
    colors,
    cache,
    ...opts
  } = {
    ...options
  };
  colors !== null && colors !== void 0 ? colors : colors = loopColors.cssColors();
  cache !== null && cache !== void 0 ? cache : cache = new Set();
  (_opts$generator = opts.generator) !== null && _opts$generator !== void 0 ? _opts$generator : opts.generator = createDefaultGenerator({
    cache
  });
  return loopColors.loopColors(colors, opts);
}
/**
 * Colord 隨機循環顏色生成器
 * Colord random loop color generator
 *
 * 便捷函式，直接從指定索引開始生成隨機顏色。
 * Convenience function to generate random colors starting from specified index.
 *
 * @param startIndex - 起始索引（可選）/ Starting index (optional)
 * @param options - 循環選項（可選）/ Loop options (optional)
 * @returns 可迭代的 Generator / Iterable Generator
 *
 * @example
 * ```typescript
 * const gen = colordRandLoop(0, { cache: new Set() });
 * const color = gen().next().value; // Colord instance
 * ```
 */
function colordRandLoop(startIndex, options) {
  return createColordRandLoop(options)(startIndex);
}
// @ts-ignore
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
