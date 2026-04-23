import chroma from '../../chroma';
import Color from '../../Color';

import input, { setupInputAutodetect, setupInputFormat } from '../input';

import rgb2hex from './rgb2hex';

import hex2rgb from './hex2rgb';
import { IRgb2HexMode } from './rgb2hex';
import num2rgb from '../num/num2rgb';

/** 擴充 Color 類型定義 / Extend Color type definition */
declare module '../../Color'
{
	interface Color
	{
		/**
		 * 取得色彩的十六進位字串表示
		 * Get color as hexadecimal string
		 *
		 * @param mode `auto` - 字串僅在 alpha < 1 時包含透明度通道
		 *             `rgb`  - 字串不包含 alpha 通道
		 *             `rgba` - 字串包含 alpha 通道
		 *
		 * @example
		 * chroma('orange').hex() === '#ffa500'
		 * chroma('orange').alpha(0.5).hex() === '#ffa50080'
		 * chroma('orange').alpha(0.5).hex('rgb') === '#ffa500'
		 */
		hex(mode?: IRgb2HexMode): string;
	}
}

/** 擴充 chroma 函式庫 / Extend chroma library */
declare module '../../chroma'
{
	interface chroma
	{
		/**
		 * 從十六進位字串（或 CSS 支援的字串表示）建立色彩
		 * Create a color from a hex or string representation (as supported in CSS)
		 *
		 * This is an alias of chroma.css().
		 *
		 * @param color 要轉換的色彩字串 / The string to convert to a color
		 * @returns 色彩物件 / the color object
		 *
		 * @example
		 * ```typescript
		 * chroma('#ffa500'); // orange color
		 * chroma('#f00'); // red color (short form)
		 * ```
		 */
		hex(color: string): Color;
		hex(...args): Color
	}
}

/** 擴充輸入格式類型 / Extend input format types */
declare module '../input'
{
	interface IColorInputObjectFormat
	{
		hex: typeof hex2rgb
	}
}

/**
 * 將 Color.prototype.hex 設為 rgb2hex 函式
 * Set Color.prototype.hex to rgb2hex function
 */
Color.prototype.hex = function (mode?: IRgb2HexMode)
{
	return rgb2hex(this._rgb, mode);
};

/** 註冊 chroma.hex 為色彩工廠函式 / Register chroma.hex as color factory function */
chroma.hex = (...args) => new Color(...args, 'hex');

//input.format.hex = hex2rgb;

/** 設定 hex 為正式輸入格式 / Set hex as formal input format */
setupInputFormat('hex', hex2rgb);

/**
 * 設定自動偵測 hex 色彩的條件
 * Set conditions for auto-detecting hex colors
 */
setupInputAutodetect({
	p: 4,
	/** 自動偵測邏輯：檢查是否為有效 hex 字串長度
	 * Auto-detection logic: check for valid hex string length
	 */
	test: (h, ...rest) =>
	{
		/**
		 * 檢查是否為有效長度的十六進位色彩字串
		 * 有效長度：3, 4, 5, 6, 7, 8, 9（不含 #）
		 * Check for valid hex color string length
		 */
		if (!rest.length && typeof h === 'string' && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0)
		{
			return 'hex';
		}
	},
})
