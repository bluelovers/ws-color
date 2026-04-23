import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';
import unpack from '../../utils/unpack';
import rgb2cmyk from './rgb2cmyk';
import { IColorSpaces } from '../../types';
import cmyk2rgb from './cmyk2rgb';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * 回傳包含青、洋紅、黃、黑元件的陣列
		 * Returns an array with the cyan, magenta, yellow, and key (black) components
		 *
		 * 每個元件值為 0-1 的正規化值
		 * Each component is a normalized value between 0 and 1
		 *
		 * @example
		 * ```typescript
		 * chroma('orange').cmyk() === [0, 0.353, 1, 0]
		 * ```
		 */
		cmyk(): IColorSpaces["cmyk"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		/**
		 * 從 CMYK 值建立色彩
		 * Create a color from CMYK (Cyan, Magenta, Yellow, Key/Black) values
		 *
		 * @param c 青 (0-1) / Cyan (0-1)
		 * @param m 洋紅 (0-1) / Magenta (0-1)
		 * @param y 黃 (0-1) / Yellow (0-1)
		 * @param k 黑 (0-1) / Key/Black (0-1)
		 * @returns 色彩物件 / the color object
		 *
		 * @example
		 * ```typescript
		 * chroma.cmyk(0, 0.353, 1, 0); // orange
		 * ```
		 */
		cmyk(c: number, m: number, y: number, k: number): Color;
		cmyk(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		cmyk: typeof cmyk2rgb
	}
}

Color.prototype.cmyk = function ()
{
	return rgb2cmyk(this._rgb);
};

chroma.cmyk = (...args) => new Color(...args, 'cmyk');

input.format.cmyk = cmyk2rgb;

setupInputAutodetect({
	p: 2,
	test: (...args) =>
	{
		args = unpack(args, 'cmyk');
		if (Array.isArray(args) && args.length === 4)
		{
			return 'cmyk';
		}
	},
});
