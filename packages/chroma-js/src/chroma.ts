import Color from './Color';
import { IChromaConstructor } from './types/internal';
import colors from './colors/index';

/**
 * Chroma.js 主物件
 * Chroma.js main object
 *
 * 一個用於各類型色彩轉換和色彩比例的小型庫
 * A tiny library for all kinds of color conversions and color scales
 *
 * @see https://github.com/gka/chroma.js
 */
export interface chroma extends IChromaConstructor
{
	(...args): Color,
	Color: typeof Color;
	version: string;
	chroma: chroma,
	default: chroma,
}

// @ts-ignore
export const chroma: chroma = (...args) =>
{
	return new chroma.Color(...args);
};

/**
 * 預設色彩調色板
 * Default color palette
 */
chroma.colors = colors;

/**
 * 已定義的 Color 類別
 * Defined Color class
 */
chroma.Color = Color;

/**
 * 版本號 - 由建置系統自動替換
 * Version - automatically replaced by build system
 */
chroma.version = '@@version'

/**
 * 模組擴展 - 允許鏈式呼叫
 * Module extension - allows chaining
 */
chroma.chroma = chroma;
chroma.default = chroma;

Object.defineProperty(chroma, "__esModule", { value: true });

export default chroma;
