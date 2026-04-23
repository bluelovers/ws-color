import Color from '../Color';
import interpolator from './index';
const { sqrt, pow } = Math;

declare module './index'
{
	interface IInterpolator
	{
		lrgb(col1: Color, col2: Color, f?: number): Color
	}
}

/**
 * 線性 RGB 插值（感知均勻）- 使用平方根減輕 gamma 校正影響
 * Linear RGB interpolation (perceptually uniform) - uses square root to reduce gamma correction effects
 *
 * 說明：對 RGB 每個通道使用 sqrt 加權，模擬感知均勻的顏色空間效果
 * Explanation: Uses sqrt weighting on each RGB channel to simulate perceptually uniform color space
 *
 * 為什麼能達到更好的效果：
 * - 標準 RGB 經過 gamma 校正，直接線性插值會使中間色偏暗
 * - 使用 sqrt 加權可還原 gamma 校正的影響，達到更自然的過渡
 * - 這是一種簡化的感知均勻插值方法
 *
 * 數學原理：
 * result = sqrt(a^2 * (1-f) + b^2 * f)
 * 相當於在線性 RGB 空間中進行插值
 *
 * @param col1 - 起始顏色 / Start color
 * @param col2 - 結束顏色 / End color
 * @param f - 插值因子，範圍 0-1 / Interpolation factor, range 0-1
 * @returns 插值後的顏色 / Interpolated color
 */
export const lrgb = (col1: Color, col2: Color, f: number) =>
{
	const [x1, y1, z1] = col1._rgb;
	const [x2, y2, z2] = col2._rgb;
	return new Color(
		sqrt(pow(x1, 2) * (1 - f) + pow(x2, 2) * f),
		sqrt(pow(y1, 2) * (1 - f) + pow(y2, 2) * f),
		sqrt(pow(z1, 2) * (1 - f) + pow(z2, 2) * f),
		'rgb',
	)
}

// register interpolator
interpolator.lrgb = lrgb;

export default lrgb;
