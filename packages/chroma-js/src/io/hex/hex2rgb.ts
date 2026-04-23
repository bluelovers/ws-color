import { IColorSpaces } from '../../types';

/**
 * 匹配標準六位元或三位元十六進位色彩碼
 * 例如：#FF0000, #F00, ffa500
 * Matches standard 6-digit or 3-digit hex color codes
 */
export const RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

/**
 * 匹配八位元或四位元十六進位色彩碼（包含透明度）
 * 例如：#FF0000FF, #F00F
 * Matches 8-digit or 4-digit hex color codes (with alpha)
 */
export const RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

/**
 * 將十六進位色彩字串轉換為 RGB + Alpha 陣列
 * Convert hex color string to RGB + Alpha array
 *
 * @param hex - 十六進位色彩字串（可含或不含 # 前綴）/ Hex color string (with or without # prefix)
 * @returns [r, g, b, a] 陣列，其中 r,g,b 為 0-255，a 為 0-1 / Array where r,g,b are 0-255, a is 0-1
 */
const hex2rgb = (hex: string): IColorSpaces["rgba"] =>
{
	/**
	 * 檢查是否符合標準六位元或三位元格式
	 * Check if matches standard 6-digit or 3-digit format
	 */
	if (hex.match(RE_HEX))
	{
		/** 移除可選的 # 前綴 / Remove optional leading # */
		if (hex.length === 4 || hex.length === 7)
		{
			hex = hex.substr(1);
		}
		/** 將三位元簡寫展開為六位元完整格式，如 #F00 → #FF0000
		 * Expand short notation to full six-digit format (e.g., #F00 → #FF0000)
		 */
		if (hex.length === 3)
		{
			hex = hex.split('') as any;

			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		/**
		 * 使用位元運算子解析十六進位數值
		 * 使用位元右移取得紅、綠、藍分量
		 * Use bitwise operations to parse hex value
		 * Use bitwise right shift to extract red, green, blue components
		 */
		const u = parseInt(hex, 16);
		const r = u >> 16;
		const g = u >> 8 & 0xFF;
		const b = u & 0xFF;
		return [r, g, b, 1];
	}

	/**
	 * 匹配 RGBA 十六進位格式（含透明度），例如 #FF000077
	 * Match rgba hex format with alpha (e.g., #FF000077)
	 */
	if (hex.match(RE_HEXA))
	{
		/** 移除可選的 # 前綴 / Remove optional leading # */
		if (hex.length === 5 || hex.length === 9)
		{
			hex = hex.substr(1);
		}
		/** 將四位元簡寫展開為八位元完整格式
		 * Expand short notation to full eight-digit format
		 */
		if (hex.length === 4)
		{
			hex = hex.split('') as any;
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
		}
		/**
		 * 解析含透明度的十六進位數值
		 * Parse hex value with alpha channel
		 */
		const u = parseInt(hex, 16);
		const r = u >> 24 & 0xFF;
		const g = u >> 16 & 0xFF;
		const b = u >> 8 & 0xFF;
		/** 將透明度正規化至 0-1 範圍 / Normalize alpha to 0-1 range */
		const a = Math.round((u & 0xFF) / 0xFF * 100) / 100;
		return [r, g, b, a];
	}

	/** 若既不符合標準格式也不符合 RGBA 格式，則拋出錯誤
	 * Throw error if neither standard nor RGBA format matches
	 */
	throw new Error(`unknown hex color: ${hex}`);
}

export default hex2rgb;
