import Color from '../Color';

/**
 * RGB 線性插值 - 最基礎的顏色插值方法
 * Linear RGB interpolation - most basic color interpolation method
 *
 * 說明：直接對 RGB 三通道進行線性插值，計算快速但容易產生顏色飽和度下降的問題
 * Explanation: Direct linear interpolation on RGB channels, fast but prone to desaturation
 *
 * 為什麼不太適合做顏色插值：
 * - RGB 是設備依賴的顏色空間，非均勻感知
 * - 直接線性混合會使顏色變灰、失去飽和度
 * - 適合簡單場景或需要絕對性能的場合
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
const rgb = (col1, col2, f) =>
{
	const xyz0 = col1._rgb;
	const xyz1 = col2._rgb;
	return new Color(
		xyz0[0] + f * (xyz1[0] - xyz0[0]),
		xyz0[1] + f * (xyz1[1] - xyz0[1]),
		xyz0[2] + f * (xyz1[2] - xyz0[2]),
		'rgb',
	)
}

declare module './index'
{
	interface IInterpolator
	{
		rgb(col1: Color, col2: Color, f?: number): Color
	}
}

// register interpolator
import interpolator from './index';
interpolator.rgb = rgb;

export default rgb;
