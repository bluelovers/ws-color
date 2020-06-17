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
		 * Just like color.rgb but adds the alpha channel to the returned
		 * array.
		 *
		 * @example
		 * chroma('orange').rgba() === [255,165,0,1]
		 * chroma('hsla(20, 100%, 40%, 0.5)').rgba() === [204,68,0,0.5]
		 */
		cmyk(): IColorSpaces["cmyk"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
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
