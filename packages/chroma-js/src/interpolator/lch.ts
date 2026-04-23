import '../io/lch';
import interpolate_hsx from './_hsx';

/**
 * LCH 插值 - 在 LAB 極座標表示法中進行插值
 * LCH interpolation - interpolates in LAB polar coordinate representation
 *
 * 說明：使用 HSL 類似的极座標系統（L: 明度, C: 飽和度, H: 色相）
 * Explanation: Uses polar coordinate system similar to HSL (L: Lightness, C: Chroma, H: Hue)
 *
 * 為什麼 LCH 比 LAB 更好：
 * - 將色相（H）與飽和度（C）、明度（L）分開處理
 * - 可避免色相環跨過 0/360 度時產生不自然的過渡
 * - 更適合需要保持色彩鮮豔度的漸層
 *
 * HCL 是 LCH 的別名，兩者功能相同
 * HCL is alias for LCH, same functionality
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 *
 * @example
 * ```typescript
 * // 在 LCH 色彩空間中插值紅色到藍色
 * const interpolate = chroma.scale(['red', 'blue']).mode('lch');
 * interpolate(0);    // red
 * interpolate(0.5);   // 中間色（保持鮮豔度）
 * interpolate(1);     // blue
 *
 * // LCH 避免色相環問題
 * const scale = chroma.scale(['#ff0000', '#00ff00']).mode('lch');
 * scale(0.5); // 正確的黃綠色，不會經過灰階
 * ```
 */
const lch = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'lch');
}

declare module './index'
{
	interface IInterpolator
	{
		lch(col1: Color, col2: Color, f?: number): Color
		hcl(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.lch = lch;
interpolator.hcl = lch;

export default lch;
