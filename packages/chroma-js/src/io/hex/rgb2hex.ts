import { IColorSpaces } from '../../types';

import unpack from '../../utils/unpack';
import last from '../../utils/last';

/** 取用 Math.round 作為快速引用 / Quick reference to Math.round */
const { round } = Math;

/**
 * RGB 轉十六進位色彩的模式
 * 可選：'auto'（根據 alpha 自動判斷）、'rgb'（無 alpha）、'rgba'（含 alpha）、'argb'（alpha 在前）
 * RGB to hex color mode options
 */
export type IRgb2HexMode = keyof IColorSpaces | 'auto' | 'argb';

/**
 * 將 RGB 色彩轉換為十六進位色彩字串
 * Convert RGB color to hex color string
 *
 * @returns 十六進位色彩字串（如 #FF0000）/ Hex color string (e.g., #FF0000)
 */
function rgb2hex(...args)
{
	/** 解包參數取得 rgba 值 / Unpack arguments to get rgba values */
	let [r, g, b, a = 1] = unpack(args, 'rgba');
	/** 取得最後一個參數作為模式，若未指定則預設為 'auto'
	 * Get last argument as mode, default to 'auto' if not specified
	 */
	let mode = last(args) || 'auto';

	/**
	 * 根據 alpha 值自動判斷輸出模式
	 * 當 alpha < 1 時自動使用 rgba 格式
	 * Auto-determine output mode based on alpha value
	 */
	if (mode === 'auto')
	{
		mode = a < 1 ? 'rgba' : 'rgb';
	}
	/** 四捨五入至整數值 / Round to integer values */
	r = round(r);
	g = round(g);
	b = round(b);
	/** 將 RGB 合併為單一數值 / Merge RGB into single value */
	const u = r << 16 | g << 8 | b;
	/** 轉換為六位元十六進位字串 / Convert to 6-digit hex string */
	let str = "000000" + u.toString(16);
	str = str.substr(str.length - 6);
	/** 將 alpha 轉換為兩位元十六進位 / Convert alpha to 2-digit hex */
	let hxa = '0' + round(a * 255).toString(16);
	hxa = hxa.substr(hxa.length - 2);
	/**
	 * 根據模式產生不同的輸出格式
	 * Generate different output formats based on mode
	 */
	switch (mode.toLowerCase())
	{
		/** #RRGGBBAA 格式 / #RRGGBBAA format */
		case 'rgba':
			return `#${str}${hxa}`;
		/** #AARRGGBB 格式（alpha 在前）/ #AARRGGBB format (alpha first) */
		case 'argb':
			return `#${hxa}${str}`;
		/** #RRGGBB 格式（無 alpha）/ #RRGGBB format (no alpha) */
		default:
			return `#${str}`;
	}
}

export default rgb2hex;
