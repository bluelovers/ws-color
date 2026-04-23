import '../io/lab';

import Color from '../Color';

declare module './index'
{
	interface IInterpolator
	{
		lab(col1: Color, col2: Color, f?: number): Color
	}
}

/**
 * LAB 色彩空間插值 - 在感知均勻的 LAB 色彩空間中進行插值
 * LAB color space interpolation - interpolates in perceptually uniform LAB color space
 *
 * 說明：將顏色轉換至 CIE LAB 色彩空間後進行線性插值
 * Explanation: Converts colors to CIE LAB color space before linear interpolation
 *
 * 為什麼使用 LAB 色彩空間：
 * - LAB 是感知均勻的色彩空間，人眼對顏色差異的感知與數值成正比
 * - 在 LAB 空間中插值可獲得更自然的顏色過渡
 * - 適合需要視覺一致性的漸層效果
 *
 * 數學原理：
 * - 首先將 RGB 轉換為 XYZ，再轉換為 LAB（L* a* b*）
 * - 然後在 L*、a*、b* 三個維度上分別進行線性插值
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 *
 * @example
 * ```typescript
 * // 在 LAB 色彩空間中插值紅色到藍色
 * const interpolate = chroma.scale(['red', 'blue']).mode('lab');
 * interpolate(0);    // red (#ff0000)
 * interpolate(0.5);   // 中間色 (~#8000b1)
 * interpolate(1);     // blue (#0000ff)
 * ```
 */
const lab = (col1: Color, col2: Color, f?: number) =>
{
	const xyz0 = col1.lab();
	const xyz1 = col2.lab();
	return new Color(
		xyz0[0] + f * (xyz1[0] - xyz0[0]),
		xyz0[1] + f * (xyz1[1] - xyz0[1]),
		xyz0[2] + f * (xyz1[2] - xyz0[2]),
		'lab',
	)
}

// register interpolator
import interpolator from './index';
interpolator.lab = lab;

export default lab;
