/**
 * WCAG 對比度計算工具
 * WCAG contrast ratio calculator
 *
 * 根據 WCAG 2.0 指南計算兩個顏色之間的對比度
 * Calculates contrast ratio between two colors according to WCAG 2.0 guidelines
 */
import Color from '../Color';
import '../ops/luminance';

/**
 * 計算兩個顏色之間的 WCAG 對比度比率
 * Compute WCAG contrast ratio between two colors
 *
 * 此實現基於 WCAG 2.0 的對比度公式
 * 公式：(L1 + 0.05) / (L2 + 0.05)，其中 L 是相對亮度
 * This implementation is based on WCAG 2.0 contrast formula
 * Formula: (L1 + 0.05) / (L2 + 0.05) where L is relative luminance
 * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 *
 * @param a - 第一個顏色 / First color
 * @param b - 第二個顏色 / Second color
 * @returns 對比度比率 / Contrast ratio
 *
 * @example
 * ```typescript
 * // 計算黑白對比度
 * // Calculate contrast between black and white
 * chroma.contrast('black', 'white'); // 21
 *
 * // 計算文字與背景的對比度（可用於 WCAG 合規性檢測）
 * // Calculate contrast between text and background (for WCAG compliance)
 * const textColor = '#333333';
 * const bgColor = '#ffffff';
 * const ratio = chroma.contrast(textColor, bgColor);
 * // ratio >= 4.5: WCAG AA 小文字標準 / WCAG AA normal text
 * // ratio >= 3: WCAG AA 大文字標準 / WCAG AA large text
 *
 * // 計算相同顏色的對比度（應為 1）
 * // Calculate contrast of same color (should be 1)
 * chroma.contrast('#ff0000', '#ff0000'); // 1
 * ```
 */
function contrast(a: string | Color, b: string | Color)
{
	/**
	 * WCAG 對比度比率計算
	 * 明度較高的顏色作為分子，明度較低的顏色作為分母
	 */
	a = new Color(a);
	b = new Color(b);
	const l1 = a.luminance();
	const l2 = b.luminance();
	return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}

declare module '../chroma'
{
	interface chroma
	{
		/**
		 * Computes the WCAG contrast ratio between two colors.
		 * A minimum contrast of 4.5:1 is recommended {@link https://www.w3.org/TR/WCAG20-TECHS/G18.html}
		 * to ensure that text is still readable against a background color.
		 */
		contrast: typeof contrast
	}
}

export default contrast
