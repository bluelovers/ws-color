import chroma from '../../chroma';
import Color from '../../Color';
import input, { setupInputAutodetect, setupInputFormat } from '../input';

import rgb2num from './rgb2num';

import num2rgb from './num2rgb';
import { IRgb2HexMode } from '../hex/rgb2hex';
import hex2rgb from '../hex/hex2rgb';

declare module '../../Color'
{
	interface Color
	{
		/**
		 * Returns the numeric representation of the hexadecimal RGB color.
		 *
		 * @example
		 * chroma('#000000').num() === 0
		 * chroma('#0000ff').num() === 255
		 * chroma('#00ff00').num() === 65280
		 * chroma('#ff0000').num() === 16711680
		 */
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

//input.format.num = num2rgb;

setupInputFormat('num', num2rgb);

setupInputAutodetect({
	p: 5,
	test: (...args) =>
	{
		if (args.length === 1 && typeof args[0] === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF)
		{
			return 'num';
		}
	},
});

