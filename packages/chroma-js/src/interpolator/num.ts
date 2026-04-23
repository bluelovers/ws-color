import '../io/num';

import Color from '../Color';

/**
 * 數值插值 - 將顏色視為單一數值進行插值
 * Numeric interpolation - interpolates color as a single numeric value
 *
 * 說明：將顏色轉換為數值表示（例如 HEX）後進行線性插值
 * Explanation: Converts color to numeric representation (e.g., HEX) before interpolation
 *
 * 為什麼使用數值插值：
 * - 保持色相的連續性，避免在中間色產生意外的灰色
 * - 適合需要保持顏色單一性的場景
 * - 缺點：顏色變化路徑可能不符合視覺預期
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
const num = (col1, col2, f) =>
{
	const c1 = col1.num();
	const c2 = col2.num();
	return new Color(c1 + f * (c2 - c1), 'num')
}

declare module './index'
{
	interface IInterpolator
	{
		num(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
interpolator.num = num;

export default num;
