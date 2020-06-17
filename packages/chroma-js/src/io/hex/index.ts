import chroma from '../../chroma';
import Color from '../../Color';

import input, { setupInputAutodetect, setupInputFormat } from '../input';

import rgb2hex from './rgb2hex';

import hex2rgb from './hex2rgb';
import { IRgb2HexMode } from './rgb2hex';
import num2rgb from '../num/num2rgb';

declare module '../../Color'
{
	interface Color
	{
		hex(mode?: IRgb2HexMode): string;
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		hex(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		hex: typeof hex2rgb
	}
}

Color.prototype.hex = function (mode?: IRgb2HexMode)
{
	return rgb2hex(this._rgb, mode);
};

chroma.hex = (...args) => new Color(...args, 'hex');

//input.format.hex = hex2rgb;

setupInputFormat('hex', hex2rgb);

setupInputAutodetect({
	p: 4,
	test: (h, ...rest) =>
	{
		if (!rest.length && typeof h === 'string' && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0)
		{
			return 'hex';
		}
	},
})
