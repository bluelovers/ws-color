import unpack from '../../utils/unpack';
import { IColorSpaces } from '../../types';

/** 取用 Math.floor 作為快速引用 / Quick reference to Math.floor */
const { floor } = Math;

/**
 * 將 HSV 色彩轉換為 RGB 色彩
 * Convert HSV color to RGB color
 *
 * @returns [r, g, b, a] 陣列 / Array where r,g,b are 0-255, a is 0-1
 */
const hsv2rgb = (...args): IColorSpaces["rgba"] =>
{
	/** 解包參數取得 hsv 值 / Unpack arguments to get hsv values */
	args = unpack(args, 'hsv');
	let [h, s, v] = args;
	let r, g, b;
	/** 將明度轉換至 0-255 範圍 / Convert value to 0-255 range */
	v *= 255;

	/**
	 * 當飽和度為 0 時（灰階色彩），RGB 直接等於明度值
	 * When saturation is 0 (grayscale), RGB equals value
	 */
	if (s === 0)
	{
		r = g = b = v;
	}
	else
	{
		/** 將色相正規化至 0-360 範圍 / Normalize hue to 0-360 range */
		if (h === 360) h = 0;
		if (h > 360) h -= 360;
		if (h < 0) h += 360;
		/** 將色相轉換為小時（0-6）/ Convert hue to hours (0-6) */
		h /= 60;

		/**
		 * 計算 RGB 分量的中間值
		 * Calculate intermediate RGB component values
		 */
		const i = floor(h);
		const f = h - i;
		const p = v * (1 - s);
		const q = v * (1 - s * f);
		const t = v * (1 - s * (1 - f));

		/** 根據色相的整數部分選擇 RGB 組合 / Select RGB combination based on integer part of hue */
		switch (i)
		{
			case 0:
				[r, g, b] = [v, t, p];
				break
			case 1:
				[r, g, b] = [q, v, p];
				break
			case 2:
				[r, g, b] = [p, v, t];
				break
			case 3:
				[r, g, b] = [p, q, v];
				break
			case 4:
				[r, g, b] = [t, p, v];
				break
			case 5:
				[r, g, b] = [v, p, q];
				break
		}
	}

	/** 回傳 RGB 若有 alpha 參數則包含 / Return RGB with alpha if argument provided */
	return [r, g, b, args.length > 3 ? args[3] : 1];
}

export default hsv2rgb;

