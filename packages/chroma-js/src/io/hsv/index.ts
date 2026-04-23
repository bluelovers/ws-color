import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';

import rgb2hsv from './rgb2hsv';

import hsv2rgb from './hsv2rgb';
import { IColorSpaces } from '../../types';

/** 擴充 Color 類型定義 / Extend Color type definition */
declare module '../../Color'
{
	interface Color
	{
		/**
		 * 回傳包含色相 (hue)、飽和度 (saturation)、明度 (value) 的陣列
		 * Returns an array with the `hue`, `saturation`, and `value` components
		 *
		 * Hue 為色彩角度（度，0..360），飽和度和明度為 0..1
		 * 注意：無色相色彩（黑、白、灰）色相元件會是 NaN
		 * Hue is the color angle in degree (`0..360`), saturation and value are within `0..1`
		 * Note that for hue-less colors (black, white, and grays), the hue component will be NaN
		 *
		 * @example
		 * chroma('orange').hsv() === [38.82,1,1]
		 * chroma('white').hsv() === [NaN,0,1]
		 */
		hsv(): IColorSpaces["hsv"]
	}
}

/**
 * 將 Color.prototype.hsv 設為 rgb2hsv 函式
 * Set Color.prototype.hsv to rgb2hsv function
 */
Color.prototype.hsv = function ()
{
	return rgb2hsv(this._rgb);
};

/** 註冊 chroma.hsv 為色彩工廠函式 / Register chroma.hsv as color factory function */
/**
 * 從 HSV 值建立色彩
 * Create a color from HSV (Hue, Saturation, Value) values
 *
 * @example
 * ```typescript
 * chroma.hsv(38.82, 1, 1); // orange
 * chroma.hsv(0, 1, 1); // red
 * ```
 */
chroma.hsv = (...args) => new Color(...args, 'hsv');

/** 設定 hsv 為正式輸入格式 / Set hsv as formal input format */
input.format.hsv = hsv2rgb;

/**
 * 設定自動偵測 hsv 色彩的條件
 * Set conditions for auto-detecting hsv colors
 */
setupInputAutodetect({
	p: 2,
	/** 自動偵測邏輯：檢查是否為有效的 hsv 陣列
	 * Auto-detection logic: check for valid hsv array
	 */
	test: (...args) =>
	{
		args = unpack(args, 'hsv');
		/** 檢查是否為三元素陣列 / Check for 3-element array */
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hsv';
		}
	},
});
