import chroma from '../../chroma';
import Color from '../../Color';

import input from '../input';

import rgb2hex from './rgb2hex';

import type from '../../utils/type';

import hex2rgb from './hex2rgb';
import { IRgb2HexMode } from './rgb2hex';

declare module '../../Color'
{
	interface Color
	{
		hex?(mode?: IRgb2HexMode): string;
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

input.format.hex = hex2rgb;
input.autodetect.push({
	p: 4,
	test: (h, ...rest) =>
	{
		if (!rest.length && typeof h === 'string' && [3, 4, 5, 6, 7, 8, 9].indexOf(h.length) >= 0)
		{
			return 'hex';
		}
	},
})
