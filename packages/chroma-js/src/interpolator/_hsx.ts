import Color from '../Color';
import { IColorSpaces } from '../types';
import { IInterpolatorMode, IInterpolator } from './index';

/**
 * 通用 HSX 插值引擎 - 處理所有 HSL/HSV/HCG/HSI/LCH 色彩空間的插值
 * Common HSX interpolation engine - handles all HSL/HSV/HCG/HSI/LCH color space interpolation
 *
 * 說明：這是所有 HSV 類型色彩空間插值的核心函式
 * Explanation: This is the core function for all HSV-type color space interpolation
 *
 * 為什麼需要統一的插值函式：
 * - 這些色彩空間皆由 (Hue, Saturation, LightValue) 三個維度組成
 * - 色相需要特殊處理（環形 0-360 度）
 * - 飽和度和明度可用類似方式插值
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @param m - 插值模式 ('hsl'|'hsv'|'hcg'|'hsi'|'lch'|'hcl') / Interpolation mode
 * @returns 插值後的顏色 / Interpolated color
 *
 * @example
 * ```typescript
 * // 使用 HSL 模式插值
 * const scale = chroma.scale(['red', 'green']).mode('hsl');
 * scale(0.5).css(); // hsl(60, 100%, 50%) = yellow
 *
 * // 使用 HSV 模式插值
 * const scale2 = chroma.scale(['red', 'cyan']).mode('hsv');
 *
 * // 使用 LCH 模式插值（推薦，保持色彩鮮豔）
 * const scale3 = chroma.scale(['#ff0000', '#0000ff']).mode('lch');
 * ```
 */
export default (col1: Color, col2: Color, f: number, m: IInterpolatorMode) =>
{
	let xyz0, xyz1;

	/**
	 * 根據模式選擇顏色表達方式
	 * Select color representation based on mode
	 */
	if (m === 'hsl')
	{
		xyz0 = col1.hsl();
		xyz1 = col2.hsl();
	}
	else if (m === 'hsv')
	{
		xyz0 = col1.hsv();
		xyz1 = col2.hsv();
	}
	else if (m === 'hcg')
	{
		xyz0 = col1.hcg();
		xyz1 = col2.hcg();
	}
	else if (m === 'hsi')
	{
		xyz0 = col1.hsi();
		xyz1 = col2.hsi();
	}
	else if (m === 'lch' || m === 'hcl')
	{
		m = 'hcl';
		xyz0 = col1.hcl();
		xyz1 = col2.hcl();
	}

	let hue0, hue1, sat0, sat1, lbv0, lbv1;

	/**
	 * 判斷是否為色相開頭的色彩空間
	 * Determine if the color space starts with hue
	 *
	 * HSV、HSL、Hsi、Hcg、LCH 皆以色相(Hue)為首維度
	 * All use hue as the first dimension
	 */
	if ((m as string).substr(0, 1) === 'h')
	{
		[hue0, sat0, lbv0] = xyz0;
		[hue1, sat1, lbv1] = xyz1;
	}

	let sat, hue, lbv, dh;

	if (!isNaN(hue0) && !isNaN(hue1))
	{
		/**
		 * 雙色皆有色相 - 計算最短色相路徑
		 * Both colors have hue - calculate shortest hue path
		 *
		 * 色相是環形的（0-360 度），需要找最短路徑
		 * Hue is circular (0-360 degrees), need to find shortest path
		 *
		 * 為什麼需要特殊處理：
		 * - 直接相減可能產生 300+ 度的差異（如 350 到 10 度）
		 * - 應選擇繞經 0 度的較短路徑
		 */
		if (hue1 > hue0 && hue1 - hue0 > 180)
		{
			/**
			 * 情況：hue1 > hue0 且差值 > 180
			 * Example: 10 -> 350, should go through 0 (355+5 = 360, not 340)
			 */
			dh = hue1 - (hue0 + 360);
		}
		else if (hue1 < hue0 && hue0 - hue1 > 180)
		{
			/**
			 * 情況：hue0 > hue1 且差值 > 180
			 * Example: 350 -> 10, should go through 0
			 */
			dh = hue1 + 360 - hue0;
		}
		else
		{
			/**
			 * 情況：差值 <= 180，直接相減
			 * Direct subtraction when difference <= 180
			 */
			dh = hue1 - hue0;
		}
		hue = hue0 + f * dh;
	}
	else if (!isNaN(hue0))
	{
		/**
		 * 只有起始色有 色相 - 繼承起始色的色相
		 * Only start color has hue - inherit start color's hue
		 *
		 * 為什麼這樣處理：
		 * 當結束色沒有色相時（灰階），繼承起始色的色相
		 * 但當結束色是純黑或純白時，可能需要調整飽和度
		 */
		hue = hue0;
		if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') sat = sat0;
	}
	else if (!isNaN(hue1))
	{
		/**
		 * 只有結束色有 色相 - 繼承結束色的色相
		 * Only end color has hue - inherit end color's hue
		 */
		hue = hue1;
		if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') sat = sat1;
	}
	else
	{
		/**
		 * 兩色皆無 色相（兩者皆灰階）- 設為 NaN
		 * Both colors have no hue (both grayscale) - set to NaN
		 */
		hue = Number.NaN;
	}

	/**
	 * 對飽和度和亮度進行線性插值
	 * Linear interpolation for saturation and brightness
	 *
	 * 為什麼使用這種方式：
	 * 若前面沒有特殊處理飽和度（即 sat 仍未定義）
	 * 则進行標準的線性插值
	 */
	if (sat === undefined) sat = sat0 + f * (sat1 - sat0);
	lbv = lbv0 + f * (lbv1 - lbv0)
	return new Color([hue, sat, lbv], m);
}