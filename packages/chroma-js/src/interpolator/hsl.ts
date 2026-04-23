import '../io/hsl';
import interpolate_hsx from './_hsx';

/**
 * HSL 插值 - 在 HSL 色彩空間中進行插值
 * HSL color space interpolation - interpolates in HSL color space
 *
 * 說明：HSL (Hue, Saturation, Lightness) 是最常用的色彩空間插值方法
 * Explanation: HSL (Hue, Saturation, Lightness) is the most common color space interpolation
 *
 * 為什麼推薦使用 HSL：
 * - 將色相(H)、飽和度(S)、明度(L) 分開處理
 * - 可避免色相環跨過 0/360 度時產生不自然的過渡
 * - 在 Web 和 UI 設計中是最常用的插值方法
 *
 * 色相處理邏輯：
 * - 若兩色都有色相，計算最短路徑（考慮色相環 0-360 度）
 * - 若只有一色有色相，保持該色相，並根據另一色的明度調整飽和度
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
const hsl = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hsl');
}

declare module './index'
{
	interface IInterpolator
	{
		hsl(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hsl = hsl;

export default hsl;
