/**
 * Chroma.js 主模組匯出
 * Chroma.js main module exports
 *
 * 完整版 chroma-js 函式庫，包含所有色彩轉換、處理和生成功能
 * Full version chroma-js library with all color conversion, processing and generation features
 */

// io --> convert colors

import chroma from './chroma';

/**
 * 匯出類型定義
 * Export type definitions
 */
export * from './types';
/**
 * 匯出 chroma 函式
 * Export chroma function
 */
export { chroma }

import './colors/w3cx11';
import colorbrewer from './colors/colorbrewer';

/**
 * 色彩空間 IO 模組
 * Color space IO modules
 *
 * 色彩空間轉換模組 - 可根據需求 comment out 以構建較小的函式庫
 * Color space conversion modules - feel free to comment out anything to rollup a smaller chroma.js built
 */
import './io/cmyk';
import './io/css';
import './io/gl';
import './io/hcg';
import './io/hex';
import './io/hsi';
import './io/hsl';
import './io/hsv';
import './io/lab';
import './io/lch';
import './io/named';
import './io/num';
import './io/rgb';
import './io/temp';

/**
 * 色彩運算子模組
 * Color operator modules
 *
 * 用於修改現有顏色的各種操作
 * Operators to modify existing colors
 */
import './ops/alpha';
import './ops/clipped';
import './ops/darken';
import './ops/get';
import './ops/luminance';
import './ops/mix';
import './ops/premultiply';
import './ops/saturate';
import './ops/set';
import './ops/rand';
import './ops/contrast';

/**
 * 色彩插值器模組
 * Color interpolator modules
 *
 * 用於色彩空間之間的插值計算
 * Interpolation calculators between color spaces
 */
import './interpolator/rgb';
import './interpolator/lrgb';
import './interpolator/lab';
import './interpolator/lch';
import './interpolator/num';
import './interpolator/hcg';
import './interpolator/hsi';
import './interpolator/hsl';
import './interpolator/hsv';

/**
 * 色彩生成器模組
 * Color generator modules
 *
 * 用於建立新顏色的各種生成器
 * Various generators to create new colors
 */
import average from './generator/average';
import bezier from './generator/bezier';
import blend from './generator/blend';
import cubehelix from './generator/cubehelix';
import mix from './generator/mix';
import './generator/random';
import scale from './generator/scale';

/**
 * 工具方法模組
 * Utility method modules
 *
 * 各類色彩分析、比較和驗證工具
 * Various color analysis, comparison and validation tools
 */
import { analyze, limits } from './utils/analyze';
import contrast from './utils/contrast';
import deltaE from './utils/delta-e';
import distance from './utils/distance';
import valid from './utils/valid';
import scales from './utils/scales';



chroma.average = average;
chroma.bezier = bezier;
chroma.blend = blend;
chroma.cubehelix = cubehelix;
chroma.mix = chroma.interpolate = mix;

/**
 * 註冊色彩比例尺函式
 * Register color scale function
 */
chroma.scale = scale;

/**
 * 註冊工具方法
 * Register utility methods
 */
chroma.analyze = analyze;
chroma.contrast = contrast;
chroma.deltaE = deltaE;
chroma.distance = distance;
chroma.limits = limits;
chroma.valid = valid;

/**
 * 註冊預設比例尺集合
 * Register default scale collection
 */
chroma.scales = scales;



export default chroma;
