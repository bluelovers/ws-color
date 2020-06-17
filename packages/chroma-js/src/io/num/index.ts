import chroma from '../../chroma';
import Color from '../../Color';
import input from '../input';

import rgb2num from './rgb2num';

import num2rgb from './num2rgb';
import { IRgb2HexMode } from '../hex/rgb2hex';
import hex2rgb from '../hex/hex2rgb';

declare module '../../Color'
{
	interface Color
	{
		num(): number;
	}
}

declare module '../../chroma'
{
	interface chroma
	{
		num(...args): Color
	}
}

declare module '../input'
{
	interface IColorInputObjectFormat
	{
		num: typeof num2rgb
	}
}

Color.prototype.num = function ()
{
	return rgb2num(this._rgb);
};

chroma.num = (...args) => new Color(...args, 'num');

input.format.num = num2rgb;

input.autodetect.push({
	p: 5,
	test: (...args) =>
	{
		if (args.length === 1 && typeof args[0] === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF)
		{
			return 'num';
		}
	},
});

