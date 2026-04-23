import unpack from '../../utils/unpack';
import { IColorSpaces } from '../../types';

/*
 * supported arguments:
 * - rgb2hsl(r,g,b)
 * - rgb2hsl(r,g,b,a)
 * - rgb2hsl([r,g,b])
 * - rgb2hsl([r,g,b,a])
 * - rgb2hsl({r,g,b,a})
 */

/**
 * 將 RGB 色彩轉換為 HSL 色彩
 * Convert RGB color to HSL color
 *
 * @returns [h, s, l, a] 陣列，其中 h 為 0-360 度，s 和 l 為 0-1，a 為 0-1
 * / Array where h is 0-360 degrees, s and l are 0-1, a is 0-1
 */
const rgb2hsl = (...args): IColorSpaces["hsl"] =>
{
	/** 解包參數取得 rgba 值 / Unpack arguments to get rgba values */
	args = unpack(args, 'rgba');
	let [r, g, b] = args;

	/** 將 RGB 值正規化至 0-1 範圍 / Normalize RGB values to 0-1 range */
	r /= 255;
	g /= 255;
	b /= 255;

	/** 找出 RGB 的最小值和最大值 / Find min and max RGB values */
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);

	/** 計算亮度（平均值）/ Calculate lightness (average value) */
	const l = (max + min) / 2;
	let s, h;

	/**
	 * 當最大值等於最小值時（灰階色彩），飽和度為 0，色相為 NaN
	 * When max equals min (grayscale), saturation is 0, hue is NaN
	 */
	if (max === min)
	{
		s = 0;
		h = Number.NaN;
	}
	else
	{
		/**
		 * 根據亮度選擇不同的飽和度計算公式
		 * Select different saturation calculation formula based on lightness
		 */
		s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
	}

	/**
	 * 根據最大分量確定色相角度
	 * Determine hue angle based on max component
	 */
	if (r == max)
	{
		h = (g - b) / (max - min);
	}
	else if (g == max)
	{
		h = 2 + (b - r) / (max - min);
	}
	else if (b == max)
	{
		h = 4 + (r - g) / (max - min);
	}

	/** 將色相轉換為 0-360 度範圍 / Convert hue to 0-360 degree range */
	h *= 60;
	if (h < 0) h += 360;

	/** 若有 alpha 參數則回傳 / Return with alpha if provided */
	if (args.length > 3 && args[3] !== undefined)
	{
		return [h, s, l, args[3]];
	}
	return [h, s, l];
}

export default rgb2hsl;
