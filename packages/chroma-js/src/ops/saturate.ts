import '../io/lch';
import Color from '../Color';
import LAB_CONSTANTS from '../io/lab/lab-constants';

declare module '../Color'
{
	interface Color
	{
		/**
		 * 增加顏色飽和度 - 操作 LCH 色彩空間的 Chroma 分量
		 * Increase color saturation - manipulate LCH chroma component
		 *
		 * @param amount - 飽和度增量，預設值為 1 / Saturation increment, default is 1
		 * @returns 增加飽和度後的顏色 / Color with increased saturation
		 *
		 * @example
		 * ```typescript
		 * // 增加飽和度
		 * chroma('pastelblue').saturate();     // 增加飽和度一級
		 * chroma('pastelblue').saturate(2);   // 增加飽和度兩級
		 * chroma('pastelblue').saturate(0.5);  // 增加飽和度半級
		 *
		 * // desaturate 是 saturate 的反向操作
		 * chroma('neongreen').desaturate();   // 降低飽和度
		 * ```
		 */
		saturate(amount: number): Color;

		/**
		 * 減少顏色飽和度 - 操作 LCH 色彩空間的 Chroma 分量
		 * Decrease color saturation - manipulate LCH chroma component
		 *
		 * @param amount - 飽和度遞減量，預設值為 1 / Saturation decrement, default is 1
		 * @returns 降低飽和度後的顏色 / Color with decreased saturation
		 *
		 * @example
		 * ```typescript
		 * // 將鮮豔顏色變為灰階
		 * chroma('red').desaturate();
		 * chroma('red').desaturate(10);  // 接近灰階
		 * ```
		 */
		desaturate(amount: number): Color;
	}
}

Color.prototype.saturate = function (amount = 1)
{
	const me = this;
	const lch = me.lch();
	lch[1] += LAB_CONSTANTS.Kn * amount;
	if (lch[1] < 0) lch[1] = 0;
	return new Color(lch, 'lch').alpha(me.alpha(), true);
}

Color.prototype.desaturate = function (amount = 1)
{
	return this.saturate(-amount);
}

