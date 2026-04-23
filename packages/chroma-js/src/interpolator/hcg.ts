import '../io/hcg';
import interpolate_hsx from './_hsx';

/**
 * HCG 插值 - 在 HCG 色彩空間中進行插值
 * HCG color space interpolation - interpolates in HCG color space
 *
 * 說明：HCG (Hue, Chroma, Gamma) 是一種設計用的色彩表示法
 * Explanation: HCG (Hue, Chroma, Gamma) is a design-oriented color representation
 *
 * 為什麼使用 HCG：
 * - Gamma 值範圍為 0-1，代表 RGB 中最大通道的比例
 * - Chroma 代表最大與最小 RGB 通道的差異
 * - 適合網頁設計、可視化和 UI 配色
 *
 * HCG 的特性：
 * - 與 HSV/HSL 的概念类似但在定義上有些微差異
 * - 計算方式與 _hsx 通用函式相同
 * - 適合需要 Gamma 控制而非 Value 的場景
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
const hcg = (col1, col2, f) =>
{
	return interpolate_hsx(col1, col2, f, 'hcg');
}

declare module './index'
{
	interface IInterpolator
	{
		hcg(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
import Color from '../Color';
interpolator.hcg = hcg;

export default hcg;
