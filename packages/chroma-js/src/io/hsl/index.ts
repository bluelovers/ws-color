import unpack from '../../utils/unpack';

import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';

import rgb2hsl from './rgb2hsl';

import hsl2rgb from './hsl2rgb';
import { IColorSpaces } from '../../types';

/** 擴充 Color 類型定義 / Extend Color type definition */
declare module '../../Color'
{
	interface Color
	{
		/**
		 * 回傳包含色相 (hue)、飽和度 (saturation)、亮度 (lightness) 的陣列
		 * Returns an array with the `hue`, `saturation`, and `lightness` component
		 *
		 * Hue 為色彩角度（度，0..360），飽和度和亮度為 0..1
		 * 注意：無色相色彩（黑、白、灰）色相元件會是 NaN
		 * Hue is the color angle in degree (`0..360`), saturation and lightness are within `0..1`
		 * Note that for hue-less colors (black, white, and grays), the hue component will be NaN
		 *
		 * @example
		 * chroma('orange').hsl() === [38.82,1,0.5,1]
		 * chroma('white').hsl() === [NaN,0,1,1]
		 */
		hsl(): IColorSpaces["hsl"]
	}
}

/**
 * 將 Color.prototype.hsl 設為 rgb2hsl 函式
 * Set Color.prototype.hsl to rgb2hsl function
 */
Color.prototype.hsl = function ()
{
	return rgb2hsl(this._rgb);
};

/** 註冊 chroma.hsl 為色彩工廠函式 / Register chroma.hsl as color factory function */
/**
 * 從 HSL 值建立色彩
 * Create a color from HSL (Hue, Saturation, Lightness) values
 *
 * @example
 * ```typescript
 * chroma.hsl(38.82, 1, 0.5); // orange
 * chroma.hsl(0, 1, 0.5); // red
 * ```
 */
chroma.hsl = (...args) => new Color(...args, 'hsl');

/** 設定 hsl 為正式輸入格式 / Set hsl as formal input format */
input.format.hsl = hsl2rgb;

/**
 * 設定自動偵測 hsl 色彩的條件
 * Set conditions for auto-detecting hsl colors
 */
setupInputAutodetect({
	p: 2,
	/** 自動偵測邏輯：檢查是否為有效的 hsl 陣列
	 * Auto-detection logic: check for valid hsl array
	 */
	test: (...args) =>
	{
		args = unpack(args, 'hsl');
		/** 檢查是否為三元素陣列 / Check for 3-element array */
		if (Array.isArray(args) && args.length === 3)
		{
			return 'hsl';
		}
	},
});
