/**
 * 色彩歐氏距離計算
 * Color Euclidean distance calculation
 *
 * 計算兩個顏色在指定色彩空間中的歐氏距離
 * Computes the Euclidean distance between two colors in a given color space
 */
import Color from '../Color';
import { IInterpolationMode } from '../types';

/**
 * 簡單歐氏距離計算
 * Simple Euclidean distance calculation
 *
 * 在 LAB 色彩空間（預設）中計算兩個顏色之間的歐氏距離
 * 此為 CIE76 Delta E 公式，是最基本的色差計算方式
 * Computes the Euclidean distance between two colors in a given color space (default is 'lab').
 * This is the CIE76 Delta E formula, the most basic color difference calculation.
 * {@link https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions}
 *
 * @param a - 第一個顏色（字串或 Color 物件）/ First color (string or Color object)
 * @param b - 第二個顏色（字串或 Color 物件）/ Second color (string or Color object)
 * @param mode - 色彩空間模式（預設 'lab'）/ Color space mode (default: 'lab')
 * @returns 歐氏距離 / Euclidean distance
 *
 * @example
 * ```typescript
 * // 計算紅色和藍色之間的 LAB 距離
 * // Calculate LAB distance between red and blue
 * chroma.distance('red', 'blue'); // ~68.99
 *
 * // 在 RGB 色彩空間中計算距離
 * // Calculate distance in RGB color space
 * chroma.distance('red', 'blue', 'rgb'); // ~85.57
 *
 * // 使用 Color 物件計算
 * // Calculate using Color objects
 * const c1 = chroma('hotpink');
 * const c2 = chroma('forestgreen');
 * chroma.distance(c1, c2); // numeric distance
 * ```
 */
function distance(a: string | Color, b: string | Color, mode: IInterpolationMode = 'lab')
{
	/**
	 * Delta E (CIE 1976) 公式
	 * 參考：https://www.brucelindbloom.com/index.html?Equations.html
	 */
	a = new Color(a);
	b = new Color(b);
	const l1 = a.get(mode);
	const l2 = b.get(mode);
	let sum_sq = 0;
	/**
	 * 計算各通道差值的平方和
	 * Calculate sum of squared differences for each channel
	 */
	for (let i in l1)
	{
		const d = (l1[i] || 0) - (l2[i] || 0);
		sum_sq += d * d;
	}
	return Math.sqrt(sum_sq);
};

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Computes the eucledian distance between two colors in a given color space (default is 'lab').
		 * {@link https://en.wikipedia.org/wiki/Euclidean_distance#Three_dimensions}
		 */
		distance: typeof distance
	}
}

export default distance
