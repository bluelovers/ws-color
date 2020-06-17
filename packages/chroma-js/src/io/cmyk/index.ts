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
		cmyk(): IColorSpaces["cmyk"];
	}
}

declare module '../../chroma'
{
	interface chroma
	{
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
