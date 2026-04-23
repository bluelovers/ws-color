import { IColorSpaces } from '../../types';
import unpack from '../../utils/unpack';
import { TWOPI } from '../../utils';

/** 取用 Math.min, Math.sqrt, Math.acos 作為快速引用 / Quick reference to Math.min, sqrt, acos */
const { min, sqrt, acos } = Math;

/**
 * 將 RGB 色彩轉換為 HSI 色彩
 * Convert RGB color to HSI color
 *
 * 參考來源 / Reference:
 * http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
 *
 * @returns [h, s, i] 陣列，其中 h 為 0-360 度，s 和 i 為 0-1
 * / Array where h is 0-360 degrees, s and i are 0-1
 */
const rgb2hsi = (...args): IColorSpaces["hsi"] =>
{
	let [r, g, b] = unpack(args, 'rgb');

	/** 將 RGB 值正規化至 0-1 範圍 / Normalize RGB values to 0-1 range */
	r /= 255;
	g /= 255;
	b /= 255;

	let h;
	/** 找出 RGB 的最小值 / Find min RGB value */
	const min_ = min(r, g, b);
	/** 計算強度（平均亮度）/ Calculate intensity (average brightness) */
	const i = (r + g + b) / 3;
	/** 根據強度計算飽和度 / Calculate saturation based on intensity */
	const s = i > 0 ? 1 - min_ / i : 0;

	/**
	 * 當飽和度為 0 時（灰階色彩），色相為 NaN
	 * When saturation is 0 (grayscale), hue is NaN
	 */
	if (s === 0)
	{
		h = NaN;
	}
	else
	{
		/** 計算色相角 / Calculate hue angle */
		h = ((r - g) + (r - b)) / 2;
		h /= sqrt((r - g) * (r - g) + (r - b) * (g - b));
		h = acos(h);
		/** 根據藍色和綠色的相對關係調整色相 / Adjust hue based on relative relationship between blue and green */
		if (b > g)
		{
			h = TWOPI - h;
		}
		/** 將色相正規化至 0-1 範圍 / Normalize hue to 0-1 range */
		h /= TWOPI;
	}
	return [h * 360, s, i];
}

export default rgb2hsi;

