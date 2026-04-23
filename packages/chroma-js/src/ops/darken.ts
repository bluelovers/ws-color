import '../io/lab';
import Color from '../Color';
import LAB_CONSTANTS from '../io/lab/lab-constants';

declare module '../Color'
{
	interface Color
	{
		/**
		 * 使顏色變暗 - 減少 LAB 明度分量
		 * Darken color - decrease LAB lightness component
		 *
		 * @param amount - 變暗量，預設值為 1 / Amount to darken, default is 1
		 * @returns 變暗後的顏色 / Darkened color
		 *
		 * @example
		 * ```typescript
		 * // 將紅色變暗
		 * chroma('red').darken();        // 變暗一級
		 * chroma('red').darken(2);       // 變暗兩級
		 * chroma('red').darken(0.5);     // 變暗半級
		 *
		 * // brighter 是 darken 的反向操作
		 * chroma('red').brighten();    // 變亮一級
		 * ```
		 */
		darken(amount?: number | -1): Color;

		/**
		 * 使顏色變亮 - 增加 LAB 明度分量
		 * Brighten color - increase LAB lightness component
		 *
		 * @param amount - 變亮量，預設值為 1 / Amount to brighten, default is 1
		 * @returns 變亮後的顏色 / Brightened color
		 *
		 * @example
		 * ```typescript
		 * // 將深藍色變亮
		 * chroma('navy').brighten();    // 變亮一級
		 * chroma('navy').brighten(2);   // 變亮兩級
		 * ```
		 */
		brighten(amount?: number | 1): Color;

		/**
		 * 使顏色變暗（別名）
		 * Alias for darken
		 */
		darker(amount?: number | -1): Color;

		/**
		 * 使顏色變亮（別名）
		 * Alias for brighten
		 */
		brighter(amount?: number | 1): Color;
	}
}

Color.prototype.darken = function (amount = 1)
{
	const me = this;
	const lab = me.lab();
	lab[0] -= LAB_CONSTANTS.Kn * amount;
	return new Color(lab, 'lab').alpha(me.alpha(), true);
}

Color.prototype.brighten = function (amount = 1)
{
	return this.darken(-amount);
}

Color.prototype.darker = Color.prototype.darken;
Color.prototype.brighter = Color.prototype.brighten;
