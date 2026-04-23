import unpack from '../../utils/unpack';
import { IColorSpaces } from '../../types';

/** 取用 Math.round 作為快速引用 / Quick reference to Math.round */
const { round } = Math;

/**
 * 將 HSL 色彩轉換為 RGB 色彩
 * Convert HSL color to RGB color
 *
 * @returns [r, g, b, a] 陣列 / Array where r,g,b are 0-255, a is 0-1
 */
const hsl2rgb = (...args): IColorSpaces["rgba"] =>
{
	/** 解包參數取得 hsl 值 / Unpack arguments to get hsl values */
	args = unpack(args, 'hsl');
	const [h, s, l] = args;
	let r, g, b;

	/**
	 * 當飽和度為 0 時（灰階色彩）， RGB 直接等於亮度乘以 255
	 * When saturation is 0 (grayscale), RGB equals lightness * 255
	 */
	if (s === 0)
	{
		r = g = b = l * 255;
	}
	else
	{
		/**
		 * 使用 HSL 到 RGB 的轉換演算法（根據 CSS 色彩模組規範）
		 * 使用 HSL 到 RGB 的標準公式計算各分量
		 * HSL to RGB conversion algorithm (based on CSS Color Module specification)
		 */
		const t3 = [0, 0, 0];
		const c = [0, 0, 0];
		/** 計算亮度相關的中間值 / Calculate lightness-related intermediate values */
		const t2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const t1 = 2 * l - t2;
		/** 將色相正規化至 0-1 範圍 / Normalize hue to 0-1 range */
		const h_ = h / 360;
		t3[0] = h_ + 1 / 3;
		t3[1] = h_;
		t3[2] = h_ - 1 / 3;

		/** 對每個 RGB 分量進行計算 / Calculate each RGB component */
		for (let i = 0; i < 3; i++)
		{
			/** 將色相關中間值正規化至 0-1 範圍 / Normalize hue intermediate values to 0-1 range */
			if (t3[i] < 0) t3[i] += 1;
			if (t3[i] > 1) t3[i] -= 1;

			/** 根據色相值選擇不同的計算公式 / Select different calculation formulas based on hue value */
			if (6 * t3[i] < 1)
			{
				/** 區間 1：低色相值 / Range 1: low hue values */
				c[i] = t1 + (t2 - t1) * 6 * t3[i];
			}
			else if (2 * t3[i] < 1)
			{
				/** 區間 2：中色相值 / Range 2: medium hue values */
				c[i] = t2;
			}
			else if (3 * t3[i] < 2)
			{
				/** 區間 3：高色相值 / Range 3: high hue values */
				c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6;
			}
			else
			{
				/** 區間 4：超出範圍 / Range 4: out of range */
				c[i] = t1;
			}
		}
		/** 將計算結果轉換為 0-255 範圍 / Convert calculated results to 0-255 range */
		[r, g, b] = [round(c[0] * 255), round(c[1] * 255), round(c[2] * 255)];
	}

	/** 若有第四個參數（alpha），則保留 / Keep alpha channel if fourth argument exists */
	if (args.length > 3)
	{
		return [r, g, b, args[3]];
	}
	return [r, g, b, 1];
}

export default hsl2rgb;
