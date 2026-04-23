import { IColorSpaces } from '../../types';
import unpack from '../../utils/unpack';
import { TWOPI, PITHIRD } from '../../utils';
import limit from '../../utils/limit';

/** 取用 Math.cos 作為快速引用 / Quick reference to Math.cos */
const { cos } = Math;

/*
 * hue [0..360]
 * saturation [0..1]
 * intensity [0..1]
 */

/**
 * 將 HSI 色彩轉換為 RGB 色彩
 * Convert HSI color to RGB color
 *
 * 參考來源 / Reference:
 * http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
 *
 * @returns [r, g, b, a] 陣列 / Array where r,g,b are 0-255, a is 0-1
 */
const hsi2rgb = (...args): IColorSpaces["rgba"] =>
{
	args = unpack(args, 'hsi');
	let [h, s, i] = args;
	let r, g, b;

	/** 處理 NaN 值 / Handle NaN values */
	if (isNaN(h)) h = 0;
	if (isNaN(s)) s = 0;

	/** 將色相正規化至 0-1 範圍 / Normalize hue to 0-1 range */
	if (h > 360) h -= 360;
	if (h < 0) h += 360;
	h /= 360;

	/**
	 * 根據色相區間計算 RGB 分量
	 * 演算法使用餘弦函數計算色相對應的 RGB 權重
	 * Calculate RGB components based on hue range
	 * Algorithm uses cosine function to calculate RGB weights corresponding to hue
	 */
	if (h < 1 / 3)
	{
		b = (1 - s) / 3;
		r = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3;
		g = 1 - (b + r);
	}
	else if (h < 2 / 3)
	{
		h -= 1 / 3
		r = (1 - s) / 3
		g = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3
		b = 1 - (r + g)
	}
	else
	{
		h -= 2 / 3
		g = (1 - s) / 3
		b = (1 + s * cos(TWOPI * h) / cos(PITHIRD - TWOPI * h)) / 3
		r = 1 - (g + b)
	}

	/** 將計算結果乘以強度並限制在 0-255 範圍 / Multiply results by intensity and clamp to 0-255 */
	r = limit(i * r * 3);
	g = limit(i * g * 3);
	b = limit(i * b * 3);

	/** 回傳 RGB 若有 alpha 參數則包含 / Return RGB with alpha if argument provided */
	return [r * 255, g * 255, b * 255, args.length > 3 ? args[3] : 1];
}

export default hsi2rgb;
