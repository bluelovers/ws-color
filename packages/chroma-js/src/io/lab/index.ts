import unpack from '../../utils/unpack';


import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect } from '../input';
import { IColorSpaces } from '../../types';

import rgb2lab from './rgb2lab';

import lab2rgb from './lab2rgb';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * 回傳包含 L、a、b 元件的陣列
		 * Returns an array with the **L**, **a**, and **b** components.
		 *
		 * L 代表亮度 (0-100)，a 和 b 代表色度通道
		 * L represents lightness (0-100), a and b represent chromaticity channels
		 *
		 * @example
		 * ```typescript
		 * chroma('orange').lab() === [74.94, 23.93, 78.95]
		 * ```
		 */
		lab(): IColorSpaces["lab"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		/**
		 * 從 LAB 值建立色彩
		 * Create a color from LAB (L, A, B) values
		 *
		 * @param L 亮度 (0-100) / Lightness (0-100)
		 * @param a a 色度通道 / a chromaticity channel
		 * @param b b 色度通道 / b chromaticity channel
		 * @returns 色彩物件 / the color object
		 *
		 * @example
		 * ```typescript
		 * chroma.lab(74.94, 23.93, 78.95); // orange
		 * ```
		 */
		lab(...args): Color;
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		lab: typeof lab2rgb
	}
}

Color.prototype.lab = function ()
{
	return rgb2lab(this._rgb);
};

chroma.lab = (...args) => new Color(...args, 'lab');

input.format.lab = lab2rgb;

setupInputAutodetect({
	p: 2,
	test(...args)
	{
		args = unpack(args, 'lab');
		if (Array.isArray(args) && args.length === 3)
		{
			return 'lab';
		}
	},
});
