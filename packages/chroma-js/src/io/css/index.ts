import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';


import rgb2css from './rgb2css';
import css2rgb from './css2rgb';
import { IRgb2HexMode } from '../hex/rgb2hex';
import hex2rgb from '../hex/hex2rgb';
import { IRgb2CssMode } from './rgb2css';

declare module '../../Color'
{

	interface Color
	{
		/**
		 * 回傳 RGB() 或 HSL() 字串表示，可作為 CSS 色彩定義
		 * Returns a RGB() or HSL() string representation that can be used as CSS-color definition
		 *
		 * @param mode 輸出模式，預設為 'rgb' / Output mode, defaults to 'rgb'
		 * @returns CSS 色彩字串 / CSS color string
		 *
		 * @example
		 * ```typescript
		 * chroma('orange').css() === 'rgb(255, 165, 0)'
		 * chroma('orange').css('hsl') === 'hsl(38.82, 100%, 50%)'
		 * ```
		 */
		css(mode?: IRgb2CssMode): string;
	}

}

declare module '../../chroma'
{
	interface chroma
	{
		/**
		 * 從 CSS 色彩字串建立色彩
		 * Create a color from a CSS color string
		 *
		 * @param color CSS 色彩字串 / CSS color string
		 * @returns 色彩物件 / the color object
		 *
		 * @example
		 * ```typescript
		 * chroma.css('orange');
		 * chroma.css('rgb(255, 165, 0)');
		 * chroma.css('hsl(38.82, 100%, 50%)');
		 * ```
		 */
		css(col: string): Color;
		css(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		css: typeof css2rgb
	}
}

Color.prototype.css = function (mode)
{
	return rgb2css(this._rgb, mode);
};

chroma.css = (...args) => new Color(...args, 'css');

input.format.css = css2rgb;

setupInputAutodetect({
	p: 5,
	test: (h, ...rest) =>
	{
		if (!rest.length && typeof h === 'string' && css2rgb.test(h))
		{
			return 'css';
		}
	},
})


