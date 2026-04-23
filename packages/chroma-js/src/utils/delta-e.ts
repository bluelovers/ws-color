/**
 * Delta E 色差計算（CMC 公式）
 * Delta E color difference calculation (CMC formula)
 *
 * 計算兩個顏色之間的視覺色差
 * Computes the visual color difference between two colors
 */
import Color from '../Color';

/**
 * 使用 CMC (Colour Measurement Committee) 公式計算色差
 * Calculate color difference using CMC (Colour Measurement Committee) formula
 *
 * 此公式由英國染色學會於 1984 年開發，是比 CIE76 更精確的人眼感知色差計算
 * 此實現基於 Bruce Lindbloom 的演算法
 * The implementation is adapted from Bruce Lindbloom.
 * {@link https://web.archive.org/web/20160306044036/http://www.brucelindbloom.com/javascript/ColorDiff.js}
 *
 * @param a - 第一個顏色 / First color
 * @param b - 第二個顏色 / Second color
 * @param L - 明度權重因子（預設 1）/ Lightness weighting factor (default: 1)
 * @param C - 色度權重因子（預設 1）/ Chroma weighting factor (default: 1)
 * @returns 色差值（Delta E）/ Color difference value (Delta E)
 * @see https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_.281984.29
 *
 * @example
 * ```typescript
 * // 計算兩個相似顏色的色差
 * // Calculate color difference between two similar colors
 * chroma.deltaE('red', '#ff0000'); // ~0 (near identical)
 *
 * // 計算差異較大的顏色
 * // Calculate colors with greater difference
 * const delta = chroma.deltaE('red', 'blue');
 * // delta < 1: 難以察覺 / Imperceptible
 * // delta 1-2: 細微差異 / Slight difference
 * // delta 2-5: 可察覺差異 / Noticeable difference
 * // delta > 5: 明顯差異 / Obvious difference
 *
 * // 自訂權重因子（L=2 表示更重視明度差異）
 * // Custom weighting factors (L=2 means more emphasis on lightness)
 * chroma.deltaE('lightgray', 'darkgray', 2, 1);
 * ```
 *
 * @see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
 */
function deltaE(a: string | Color, b: string | Color, L = 1, C = 1)
{
	/**
	 * Delta E (CMC) 公式
	 * 參考：http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
	 */
	a = new Color(a);
	b = new Color(b);
	const [L1, a1, b1] = Array.from(a.lab());
	const [L2, a2, b2] = Array.from(b.lab());
	const c1 = Math.sqrt((a1 * a1) + (b1 * b1));
	const c2 = Math.sqrt((a2 * a2) + (b2 * b2));

	/**
	 * 計算明度相關的標準差異係數
	 * Calculate lightness-dependent standard deviation coefficients
	 */
	const sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
	const sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;

	/**
	 * 計算色相角度（弧度轉角度）
	 * Calculate hue angle (radian to degree)
	 */
	let h1 = c1 < 0.000001 ? 0.0 : (Math.atan2(b1, a1) * 180.0) / Math.PI;
	while (h1 < 0)
	{ h1 += 360; }
	while (h1 >= 360)
	{ h1 -= 360; }

	/**
	 * 根據色相角度計算色相相關的標準差異
	 * Calculate hue-dependent standard deviation based on hue angle
	 */
	const t = (h1 >= 164.0) && (h1 <= 345.0)
		? (0.56 + Math.abs(0.2 * Math.cos((Math.PI * (h1 + 168.0)) / 180.0)))
		: (0.36 + Math.abs(0.4 * Math.cos((Math.PI * (h1 + 35.0)) / 180.0)));

	/**
	 * 計算色相Factor，用於調整色相差異
	 * Calculate hue factor for adjusting hue difference
	 */
	const c4 = c1 * c1 * c1 * c1;
	const f = Math.sqrt(c4 / (c4 + 1900.0));
	const sh = sc * (((f * t) + 1.0) - f);

	/**
	 * 計算各通道的差值
	 * Calculate differences for each channel
	 */
	const delL = L1 - L2;
	const delC = c1 - c2;
	const delA = a1 - a2;
	const delB = b1 - b2;

	/**
	 * 計算色相差異的平方
	 * Calculate squared hue difference
	 */
	const dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);

	/**
	 * 計算最終的 Delta E 值
	 * Calculate final Delta E value
	 */
	const v1 = delL / (L * sl);
	const v2 = delC / (C * sc);
	const v3 = sh;
	return Math.sqrt((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
};

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Computes color difference {@link https://en.wikipedia.org/wiki/Color_difference#CMC_l:c_.281984.29} as
		 * developed by the Colour Measurement Committee of the Society of Dyers and Colourists (CMC) in 1984.
		 * The implementation is adapted from Bruce Lindbloom.
		 * {@link https://web.archive.org/web/20160306044036/http://www.brucelindbloom.com/javascript/ColorDiff.js}
		 * The parameters L (default 1) and C (default 1) are weighting factors for lightness and chromacity.
		 */
		deltaE: typeof deltaE
	}
}

export default deltaE
