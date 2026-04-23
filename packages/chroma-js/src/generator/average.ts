import Color from '../Color';
import clip_rgb from '../utils/clip_rgb';
import { IInterpolationMode, IRGB } from '../types';
import arr2colors from '../utils/arr-to-colors';
import typePredicates from 'ts-type-predicates';

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Similar to {@link mix}, but accepts more than two colors. Simple averaging of R,G,B components and the alpha
		 * channel.
		 * 類似於 {@link mix}，但接受多於兩個色彩。簡單地對 R、G、B 通道和 Alpha 通道進行平均計算。
		 */
		average: typeof average
	}
}

/**
 * Similar to {@link mix}, but accepts more than two colors. Simple averaging of R,G,B components and the alpha
 * channel.
 * 類似於 {@link mix}，但接受多於兩個色彩。簡單地對 R、G、B 通道和 Alpha 通道進行平均計算。
 *
 * @param colors - 色彩陣列 / Array of colors
 * @param mode - 內插模式 (預設 'lrgb') / Interpolation mode (default 'lrgb')
 * @param weights - 權重陣列 (可選) / Weight array (optional)
 * @returns 平均後的色彩 / Averaged color
 * @example
 * ```typescript
 * // 基本使用 - 三個色彩平均
 * const avg = chroma.average(['red', 'green', 'blue']);
 * // returns the average color of red, green, and blue
 *
 * // 使用自訂權重
 * const weighted = chroma.average(['red', 'green', 'blue'], 'lrgb', [3, 1, 1]);
 * // returns weighted average (red has higher weight)
 *
 * // 指定內插模式
 * const labAvg = chroma.average(['#ff0000', '#00ff00', '#0000ff'], 'lab');
 * // averages colors in Lab color space
 * ```
 * @example
 * ```typescript
 * // 多個色彩陣列混合
 * const colors = ['#e74c3c', '#f39c12', '#2ecc71', '#3498db', '#9b59b6'];
 * const mixed = chroma.average(colors);
 * // returns single averaged color
 *
 * // 與其他函式搭配使用
 * const gradientColors = chroma.scale('YlGnBu').colors(10);
 * const midColor = chroma.average(gradientColors.slice(2, 8));
 * // returns averaged color from middle portion of gradient
 * ```
 */
function average(colors: (string | Color)[], mode: IInterpolationMode = 'lrgb', weights?: number[]): Color
{
	const l = colors.length;
	if (!weights) weights = Array.from(new Array(l)).map(() => 1);
	// normalize weights
	const k = l / weights.reduce(function (a, b) { return a + b; });
	weights.forEach((w, i) => { weights[i] *= k })
	// convert colors to Color objects

	colors = arr2colors(colors);

	typePredicates<Color[]>(colors);

	if (mode === 'lrgb')
	{
		return _average_lrgb(colors, weights)
	}

	const first = colors.shift() as Color;
	const xyz = first.get<number[]>(mode);
	const cnt: number[] = [];
	let dx = 0;
	let dy = 0;
	// initial color
	for (let i = 0; i < xyz.length; i++)
	{
		xyz[i] = (xyz[i] || 0) * weights[0];
		cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
		if (mode.charAt(i) === 'h' && !isNaN(xyz[i]))
		{
			const A = xyz[i] / 180 * Math.PI;
			dx += Math.cos(A) * weights[0];
			dy += Math.sin(A) * weights[0];
		}
	}

	let alpha = first.alpha() * weights[0];
	colors.forEach((c, ci) =>
	{
		const xyz2 = c.get<number[]>(mode);
		alpha += c.alpha() * weights[ci + 1];
		for (let i = 0; i < xyz.length; i++)
		{
			if (!isNaN(xyz2[i]))
			{
				cnt[i] += weights[ci + 1];
				if (mode.charAt(i) === 'h')
				{
					const A = xyz2[i] / 180 * Math.PI;
					dx += Math.cos(A) * weights[ci + 1];
					dy += Math.sin(A) * weights[ci + 1];
				}
				else
				{
					xyz[i] += xyz2[i] * weights[ci + 1];
				}
			}
		}
	});

	for (let i = 0; i < xyz.length; i++)
	{
		if (mode.charAt(i) === 'h')
		{
			let A = Math.atan2(dy / cnt[i], dx / cnt[i]) / Math.PI * 180;
			while (A < 0) A += 360;
			while (A >= 360) A -= 360;
			xyz[i] = A;
		}
		else
		{
			xyz[i] = xyz[i] / cnt[i];
		}
	}
	alpha /= l;
	return (new Color(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
};

function _average_lrgb(colors: Color[], weights: number[])
{
	const l = colors.length;
	const xyz: IRGB = [0, 0, 0, 0];
	for (let i = 0; i < colors.length; i++)
	{
		const col = colors[i];
		const f = weights[i] / l;
		const rgb = col._rgb;
		xyz[0] += Math.pow(rgb[0], 2) * f;
		xyz[1] += Math.pow(rgb[1], 2) * f;
		xyz[2] += Math.pow(rgb[2], 2) * f;
		xyz[3] += rgb[3] * f;
	}
	xyz[0] = Math.sqrt(xyz[0]);
	xyz[1] = Math.sqrt(xyz[1]);
	xyz[2] = Math.sqrt(xyz[2]);
	if (xyz[3] > 0.9999999) xyz[3] = 1;
	return new Color(clip_rgb(xyz));
}

export default average
