import unpack from '../../utils/unpack';
import { IColorSpaces } from '../../types';

/** 取用 Math.min 和 Math.max 作為快速引用 / Quick reference to Math.min and Math.max */
const { min, max } = Math;

/*
 * supported arguments:
 * - rgb2hsv(r,g,b)
 * - rgb2hsv([r,g,b])
 * - rgb2hsv({r,g,b})
 */

/**
 * 將 RGB 色彩轉換為 HSV 色彩
 * Convert RGB color to HSV color
 *
 * @returns [h, s, v] 陣列，其中 h 為 0-360 度，s 和 v 為 0-1
 * / Array where h is 0-360 degrees, s and v are 0-1
 */
const rgb2hsl = (...args): IColorSpaces["hsv"] =>
{
	/** 解包參數取得 rgb 值 / Unpack arguments to get rgb values */
	args = unpack(args, 'rgb');
	let [r, g, b] = args;

	/** 找出 RGB 的最小值和最大值 / Find min and max RGB values */
	const min_ = min(r, g, b);
	const max_ = max(r, g, b);
	/** 計算差值 / Calculate delta */
	const delta = max_ - min_;
	let h, s, v;

	/** 計算明度（最大值除以 255）/ Calculate value (max value divided by 255) */
	v = max_ / 255.0;

	/**
	 * 當最大值為 0 時（黑色），飽和度為 0，色相為 NaN
	 * When max is 0 (black), saturation is 0, hue is NaN
	 */
	if (max_ === 0)
	{
		h = Number.NaN;
		s = 0;
	}
	else
	{
		/** 計算飽和度 / Calculate saturation */
		s = delta / max_;
		/** 根據最大分量確定色相角度 / Determine hue angle based on max component */
		if (r === max_) h = (g - b) / delta;
		if (g === max_) h = 2 + (b - r) / delta;
		if (b === max_) h = 4 + (r - g) / delta;
		/** 將色相轉換為 0-360 度範圍 / Convert hue to 0-360 degree range */
		h *= 60;
		if (h < 0) h += 360;
	}
	return [h, s, v]
}

export default rgb2hsl;
