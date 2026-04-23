//import { last, clip_rgb, type } from './utils';

import clip_rgb from './utils/clip_rgb';
import last from './utils/last';
import type from './utils/type';

import _input, { IColorInputObjectFormat } from './io/input';
import { IRgb2HexMode } from './io/hex/rgb2hex';
import { IColorSpaces, IRGB, IInterpolationMode } from './types';
import colors from './colors';
import autodetect, { assertAutodetectReturn } from './utils/autodetect';

/**
 * 顏色類別 - 支援多種顏色空間轉換的核心類別
 * Color class - Core class supporting multiple color space conversions
 *
 * 用于表示和管理顏色，支持 RGB、HSL、HSI 等多種顏色空間的轉換操作
 * Used to represent and manage colors, supporting conversions between RGB, HSL, HSI and other color spaces
 */
export class Color
{
	/** RGB 顏色陣列 / RGB color array [r, g, b, a] */
	_rgb: IRGB

	//hex?(mode?: IRgb2HexMode): string

	/**
	 * 從字串或數字建立顏色物件
	 * Create a color object from string or number
	 *
	 * @param color - CSS 支援的字串顏色表示或數值 (0-16777215)
	 *                   / CSS-supported string color or number (0-16777215)
	 */
	constructor(color: string | number);

	/**
	 * 使用指定的顏色空間建立顏色物件
	 * Create a color object in the specified color space
	 *
	 * @param a - 第一個顏色分量（取決於顏色空間）/ First color component (depends on color space)
	 * @param b - 第二個顏色分量 / Second color component
	 * @param c - 第三個顏色分量 / Third color component
	 * @param colorSpace - 顏色空間 / Color space (default: "rgb")
	 */
	constructor(a: number, b: number, c: number, colorSpace?: keyof IColorSpaces);

	/**
	 * 使用 RGBA 四分量建立顏色物件
	 * Create a color object with RGBA four components
	 *
	 * @param a - 紅色分量 / Red component
	 * @param b - 綠色分量 / Green component
	 * @param c - 藍色分量 / Blue component
	 * @param d - Alpha 通明度分量 / Alpha transparency component
	 * @param colorSpace - 顏色空間 / Color space (default: "rgb")
	 */
	constructor(a: number, b: number, c: number, d: number, colorSpace?: keyof IColorSpaces);

	/**
	 * 使用數值陣列建立顏色物件
	 * Create a color object using an array of values
	 *
	 * @param values - 數值陣列 (例如 [r, g, b, a?]) / Array of values (e.g. [r, g, b, a?])
	 * @param colorSpace - 顏色空間 / Color space (default: "rgb")
	 */
	constructor(values: number[], colorSpace?: keyof IColorSpaces);

	/**
	 * 建構函式主邏輯
	 * Constructor main logic
	 *
	 * 處理多種輸入格式並轉換為內部 RGB 表示
	 * Handle multiple input formats and convert to internal RGB representation
	 */
	constructor(...args)
	constructor(...args)
	{
		const me = this;

		/**
		 * 無參數時建立空顏色
		 * Create empty color when no arguments
		 */
		if (args.length === 0)
		{
			this._rgb = colors._empty.slice() as any;

			return this;
		}

		/**
		 * 檢查是否已傳入 Color 實例（第 1 種情況：物件建構式相同）
		 * Check if Color instance is passed (case 1: same constructor)
		 */
		if (type(args[0]) === 'object' &&
			args[0].constructor &&
			args[0].constructor === this.constructor)
		{
			// the argument is already a Color instance
			return args[0];
		}

		/**
		 * 檢查是否已傳入 Color 實例（第 2 種情況：instanceof）
		 * Check if Color instance is passed (case 2: instanceof)
		 */
		if (args[0] instanceof Color)
		{
			return args[0].clone();
		}

		/**
		 * 使用自動偵測功能轉換輸入
		 * Convert input using autodetect feature
		 */
		let ret = autodetect(args);

		assertAutodetectReturn(ret);

		me._rgb = ret._rgb
	}

	get [0]()
	{
		return this._rgb[0]
	}

	get [1]()
	{
		return this._rgb[1]
	}

	get [2]()
	{
		return this._rgb[2]
	}

	get [3]()
	{
		return this._rgb[3]
	}

	get length()
	{
		return this._rgb.length
	}

	* [Symbol.iterator]()
	{
		for (let i = 0; i < this._rgb.length; i++)
		{
			yield this._rgb[i]
		}
	}

	get _rgba()
	{
		return this._rgb;
	}

	set _rgba(value)
	{
		this._rgb = value;
	}

	toString(): string
	{
		// @ts-ignore
		if (typeof this.hex === 'function') return this.hex();
		return `[${this._rgb.join(',')}]`;
	}

	clone()
	{
		return new Color(this._rgb.slice())
	}

}

export default Color;
