/**
 * 輕量版 chroma 匯出
 * Lightweight chroma.js export
 *
 * 包含基本的色彩轉換功能
 * Includes basic color conversion functionality
 */

import chroma from './chroma';

export * from './types';
export { chroma }

/**
 * I/O - 色彩轉換
 * I/O - Color conversion
 */
import './io/css';
import './io/hex';
import './io/hsl';
import './io/lab';
import './io/rgb';

/**
 * 運算子 - 修改現有色彩
 * Operators - modify existing Colors
 */
import './ops/alpha';
import './ops/darken';
import './ops/get';
import './ops/mix';
import './ops/set';

/**
 * 插值器 - 色彩插值計算
 * Interpolators - color interpolation
 */
import './interpolator/lrgb';

/**
 * 生成器 - 建立新色彩
 * Generators - create new colors
 */
import mix from './generator/mix';

/**
 * 其他工具方法
 * Other utility methods
 */
import valid from './utils/valid';

chroma.mix = chroma.interpolate = mix;

/**
 * 其他工具方法
 * Other utility methods
 */
chroma.valid = valid;

export default chroma;
